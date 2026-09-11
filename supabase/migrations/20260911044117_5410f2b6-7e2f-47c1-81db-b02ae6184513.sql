CREATE TABLE IF NOT EXISTS public.blog_images (
  name text PRIMARY KEY,
  content_type text NOT NULL DEFAULT 'image/png',
  data text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.blog_images TO anon;
GRANT SELECT ON public.blog_images TO authenticated;
GRANT ALL ON public.blog_images TO service_role;

ALTER TABLE public.blog_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Blog images are publicly readable"
  ON public.blog_images FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE OR REPLACE FUNCTION public.cron_verify_token(_id text, _token text)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.sync_cron_tokens t
    WHERE t.id = _id AND t.token::text = _token
  );
$$;

CREATE OR REPLACE FUNCTION public.cron_get_settings(_id text, _token text)
RETURNS TABLE (interval_hours integer, last_run_at timestamptz)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.cron_verify_token(_id, _token) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  RETURN QUERY
    SELECT s.interval_hours, s.last_run_at
    FROM public.sync_settings s
    WHERE s.id = _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.cron_mark_run(_id text, _token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.cron_verify_token(_id, _token) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  UPDATE public.sync_settings
     SET last_run_at = now(), updated_at = now()
   WHERE id = _id;
END;
$$;

CREATE OR REPLACE FUNCTION public.cron_upsert_article(_id text, _token text, _row jsonb)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.cron_verify_token(_id, _token) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;

  INSERT INTO public.syndicated_articles (
    slug, external_id, title, content_html, content_markdown, meta_description,
    hero_image_url, json_ld, faq_json_ld, language_code, published_at, synced_at, is_hidden
  )
  VALUES (
    _row->>'slug',
    _row->>'external_id',
    _row->>'title',
    _row->>'content_html',
    _row->>'content_markdown',
    _row->>'meta_description',
    _row->>'hero_image_url',
    CASE WHEN _row->'json_ld' = 'null'::jsonb THEN NULL ELSE _row->'json_ld' END,
    CASE WHEN _row->'faq_json_ld' = 'null'::jsonb THEN NULL ELSE _row->'faq_json_ld' END,
    COALESCE(_row->>'language_code', 'en'),
    NULLIF(_row->>'published_at','')::timestamptz,
    COALESCE(NULLIF(_row->>'synced_at','')::timestamptz, now()),
    COALESCE((_row->>'is_hidden')::boolean, false)
  )
  ON CONFLICT (slug) DO UPDATE SET
    external_id = EXCLUDED.external_id,
    title = EXCLUDED.title,
    content_html = EXCLUDED.content_html,
    content_markdown = EXCLUDED.content_markdown,
    meta_description = EXCLUDED.meta_description,
    hero_image_url = EXCLUDED.hero_image_url,
    json_ld = EXCLUDED.json_ld,
    faq_json_ld = EXCLUDED.faq_json_ld,
    language_code = EXCLUDED.language_code,
    published_at = EXCLUDED.published_at,
    synced_at = EXCLUDED.synced_at,
    updated_at = now();
END;
$$;

CREATE OR REPLACE FUNCTION public.cron_store_blog_image(_id text, _token text, _name text, _content_type text, _data text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.cron_verify_token(_id, _token) THEN
    RAISE EXCEPTION 'unauthorized';
  END IF;
  INSERT INTO public.blog_images (name, content_type, data)
  VALUES (_name, COALESCE(_content_type, 'image/png'), _data)
  ON CONFLICT (name) DO UPDATE SET content_type = EXCLUDED.content_type, data = EXCLUDED.data;
END;
$$;

REVOKE ALL ON FUNCTION public.cron_verify_token(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cron_get_settings(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cron_mark_run(text, text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cron_upsert_article(text, text, jsonb) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.cron_store_blog_image(text, text, text, text, text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION public.cron_get_settings(text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cron_mark_run(text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cron_upsert_article(text, text, jsonb) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cron_store_blog_image(text, text, text, text, text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.cron_verify_token(text, text) TO anon, authenticated, service_role;