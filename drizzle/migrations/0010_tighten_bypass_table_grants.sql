REVOKE ALL ON public.geo_bypass_config FROM anon;
REVOKE ALL ON public.geo_bypass_claims FROM anon;
REVOKE INSERT, UPDATE, DELETE ON public.geo_bypass_claims FROM authenticated;
REVOKE DELETE ON public.geo_bypass_config FROM authenticated;