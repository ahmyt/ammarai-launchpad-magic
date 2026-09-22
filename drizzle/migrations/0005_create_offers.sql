-- Offer & discount campaigns: the offer itself, its claim log, and the
-- security-definer functions the public site talks to. Codes never live in the
-- publicly readable content table.

CREATE TABLE IF NOT EXISTS public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL DEFAULT '',
  headline text NOT NULL,
  discount_label text NOT NULL DEFAULT '',
  terms text NOT NULL DEFAULT '',
  code text NOT NULL,
  use_type text NOT NULL DEFAULT 'multi_use'
    CHECK (use_type IN ('single_use', 'multi_use')),
  max_uses integer CHECK (max_uses IS NULL OR max_uses > 0),
  used_count integer NOT NULL DEFAULT 0 CHECK (used_count >= 0),
  starts_at timestamp with time zone,
  expires_at timestamp with time zone,
  is_active boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.offer_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  offer_id uuid NOT NULL REFERENCES public.offers(id) ON DELETE CASCADE,
  event text NOT NULL CHECK (event IN ('seen', 'copied', 'claimed')),
  source text NOT NULL
    CHECK (source IN ('exit_intent', 'timed', 'sticky', 'inline', 'direct')),
  page text NOT NULL DEFAULT '',
  ip_hash text NOT NULL DEFAULT '',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS offer_events_offer_created_idx
  ON public.offer_events (offer_id, created_at DESC);
CREATE INDEX IF NOT EXISTS offer_events_offer_ip_idx
  ON public.offer_events (offer_id, ip_hash, created_at DESC);

-- Grants in the same migration: the Data API has no default privileges here.
-- Anon gets nothing on either table; public access is only through the
-- security-definer functions below.
GRANT SELECT, INSERT, UPDATE, DELETE ON public.offers TO authenticated;
GRANT ALL ON public.offers TO service_role;
GRANT SELECT ON public.offer_events TO authenticated;
GRANT ALL ON public.offer_events TO service_role;

ALTER TABLE public.offers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.offer_events ENABLE ROW LEVEL SECURITY;

DROP TRIGGER IF EXISTS offers_set_updated_at ON public.offers;
CREATE TRIGGER offers_set_updated_at
  BEFORE UPDATE ON public.offers
  FOR ROW EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Admins manage offers"
  ON public.offers FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read offer events"
  ON public.offer_events FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Public: the one live offer, if any. Never a draft, never an expired one,
-- never one whose uses have run out.
CREATE OR REPLACE FUNCTION public.get_active_offer()
 RETURNS TABLE (
   id uuid, slug text, label text, headline text, discount_label text,
   terms text, code text, use_type text, starts_at timestamptz,
   expires_at timestamptz, remaining integer
 )
 LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT o.id, o.slug, o.label, o.headline, o.discount_label, o.terms, o.code,
         o.use_type, o.starts_at, o.expires_at,
         CASE WHEN o.max_uses IS NULL THEN NULL
              ELSE GREATEST(o.max_uses - o.used_count, 0) END
  FROM public.offers o
  WHERE o.is_active
    AND (o.starts_at IS NULL OR o.starts_at <= now())
    AND (o.expires_at IS NULL OR o.expires_at > now())
    AND o.used_count < CASE WHEN o.use_type = 'single_use' THEN 1
                            ELSE COALESCE(o.max_uses, 2147483647) END
  ORDER BY (o.expires_at IS NULL), o.expires_at NULLS LAST, o.created_at DESC
  LIMIT 1;
$$;

-- Claim a code: one statement path that cannot let two visitors take the last use.
CREATE OR REPLACE FUNCTION public.claim_offer(
  _offer_id uuid, _source text, _page text, _ip_hash text
)
 RETURNS jsonb
 LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _offer public.offers%ROWTYPE;
  _same_ip boolean;
BEGIN
  IF _source NOT IN ('exit_intent', 'timed', 'sticky', 'inline', 'direct') THEN
    RAISE EXCEPTION 'Invalid source';
  END IF;
  IF _page IS NULL OR length(_page) > 300 THEN
    RAISE EXCEPTION 'Invalid page';
  END IF;
  IF _ip_hash IS NULL OR length(_ip_hash) > 128 THEN
    RAISE EXCEPTION 'Invalid request';
  END IF;

  SELECT * INTO _offer FROM public.offers WHERE id = _offer_id FOR UPDATE;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'missing');
  END IF;
  IF NOT _offer.is_active THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'inactive');
  END IF;
  IF _offer.starts_at IS NOT NULL AND _offer.starts_at > now() THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'not_started');
  END IF;
  IF _offer.expires_at IS NOT NULL AND _offer.expires_at <= now() THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'expired');
  END IF;

  IF _offer.use_type = 'single_use' AND _offer.used_count >= 1 THEN
    SELECT EXISTS (
      SELECT 1 FROM public.offer_events
      WHERE offer_id = _offer.id AND event = 'claimed' AND ip_hash = _ip_hash
    ) INTO _same_ip;
    IF _same_ip THEN
      INSERT INTO public.offer_events (offer_id, event, source, page, ip_hash)
      VALUES (_offer.id, 'claimed', _source, left(_page, 300), _ip_hash);
      RETURN jsonb_build_object('claimed', true, 'replay', true, 'code', _offer.code);
    END IF;
    RETURN jsonb_build_object('claimed', false, 'reason', 'exhausted');
  END IF;

  IF _offer.use_type = 'multi_use'
     AND _offer.max_uses IS NOT NULL
     AND _offer.used_count >= _offer.max_uses THEN
    RETURN jsonb_build_object('claimed', false, 'reason', 'exhausted');
  END IF;

  UPDATE public.offers
     SET used_count = used_count + 1
   WHERE id = _offer.id;

  INSERT INTO public.offer_events (offer_id, event, source, page, ip_hash)
  VALUES (_offer.id, 'claimed', _source, left(_page, 300), _ip_hash);

  RETURN jsonb_build_object(
    'claimed', true,
    'code', _offer.code,
    'used_count', _offer.used_count + 1
  );
END;
$$;

-- Passive impressions only (shown, or code copied without claiming).
CREATE OR REPLACE FUNCTION public.record_offer_event(
  _offer_id uuid, _event text, _source text, _page text, _ip_hash text
)
 RETURNS void
 LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  IF _event NOT IN ('seen', 'copied') THEN
    RAISE EXCEPTION 'Invalid event';
  END IF;
  IF _source NOT IN ('exit_intent', 'timed', 'sticky', 'inline', 'direct') THEN
    RAISE EXCEPTION 'Invalid source';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM public.offers WHERE id = _offer_id) THEN
    RAISE EXCEPTION 'Unknown offer';
  END IF;
  INSERT INTO public.offer_events (offer_id, event, source, page, ip_hash)
  VALUES (
    _offer_id, _event, _source,
    left(coalesce(_page, ''), 300),
    left(coalesce(_ip_hash, ''), 128)
  );
END;
$$;

-- Admin-only roll-up for the studio screen.
CREATE OR REPLACE FUNCTION public.admin_offer_stats(_offer_id uuid)
 RETURNS jsonb
 LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _out jsonb;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Forbidden';
  END IF;
  SELECT jsonb_build_object(
    'seen', count(*) FILTER (WHERE event = 'seen'),
    'copied', count(*) FILTER (WHERE event = 'copied'),
    'claimed', count(*) FILTER (WHERE event = 'claimed'),
    'by_source', coalesce(
      jsonb_object_agg(source, n) FILTER (WHERE source IS NOT NULL), '{}'::jsonb),
    'last_claimed', max(created_at) FILTER (WHERE event = 'claimed')
  ) INTO _out
  FROM (
    SELECT event, source, created_at,
           count(*) OVER (PARTITION BY source) AS n
      FROM public.offer_events
     WHERE offer_id = _offer_id
  ) e;
  RETURN coalesce(_out, '{}'::jsonb);
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_active_offer() TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.claim_offer(uuid, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.record_offer_event(uuid, text, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.admin_offer_stats(uuid) TO authenticated, service_role;
