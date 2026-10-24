CREATE TABLE public.geo_bypass_claims (
  code_hash text PRIMARY KEY,
  device_hash text,
  claimed_at timestamptz,
  expires_at timestamptz
);
GRANT SELECT ON public.geo_bypass_claims TO authenticated;
GRANT ALL ON public.geo_bypass_claims TO service_role;
ALTER TABLE public.geo_bypass_claims ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins read bypass claims" ON public.geo_bypass_claims FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE OR REPLACE FUNCTION public.claim_geo_bypass(_code_hash text, _device_hash text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE accepted boolean;
BEGIN
 IF _code_hash !~ '^[a-f0-9]{64}$' OR _device_hash !~ '^[a-f0-9]{64}$' THEN RETURN false; END IF;
 INSERT INTO public.geo_bypass_claims(code_hash) VALUES (_code_hash) ON CONFLICT DO NOTHING;
 UPDATE public.geo_bypass_claims SET device_hash = _device_hash, claimed_at = now(), expires_at = now() + interval '7 days' WHERE code_hash = _code_hash AND device_hash IS NULL;
 SELECT device_hash = _device_hash AND expires_at > now() INTO accepted FROM public.geo_bypass_claims WHERE code_hash = _code_hash;
 RETURN coalesce(accepted, false);
END; $$;
REVOKE ALL ON FUNCTION public.claim_geo_bypass(text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.claim_geo_bypass(text,text) TO service_role;
CREATE OR REPLACE FUNCTION public.verify_geo_bypass(_code_hash text, _device_hash text) RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
 SELECT EXISTS (SELECT 1 FROM public.geo_bypass_claims WHERE code_hash = _code_hash AND device_hash = _device_hash AND expires_at > now());
$$;
REVOKE ALL ON FUNCTION public.verify_geo_bypass(text,text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.verify_geo_bypass(text,text) TO service_role;
CREATE OR REPLACE FUNCTION public.admin_reset_geo_bypass(_code_hash text) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
 IF NOT public.has_role(auth.uid(), 'admin') THEN RAISE EXCEPTION 'Forbidden'; END IF;
 UPDATE public.geo_bypass_claims SET device_hash = NULL, claimed_at = NULL, expires_at = NULL WHERE code_hash = _code_hash;
 RETURN FOUND;
END; $$;
REVOKE ALL ON FUNCTION public.admin_reset_geo_bypass(text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.admin_reset_geo_bypass(text) TO authenticated;