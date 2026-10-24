CREATE TABLE public.geo_bypass_config (id text PRIMARY KEY DEFAULT 'settings', codes text NOT NULL DEFAULT '');
GRANT SELECT, INSERT, UPDATE ON public.geo_bypass_config TO authenticated;
GRANT ALL ON public.geo_bypass_config TO service_role;
ALTER TABLE public.geo_bypass_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage private bypass codes" ON public.geo_bypass_config FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
INSERT INTO public.geo_bypass_config(id,codes) SELECT 'settings', coalesce(data->>'geoBlockBypassKey','') FROM public.content WHERE kind = 'page' AND slug = 'settings' ON CONFLICT DO NOTHING;