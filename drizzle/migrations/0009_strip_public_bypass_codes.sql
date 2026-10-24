CREATE OR REPLACE FUNCTION public.strip_public_bypass_codes() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF NEW.kind = 'page' AND NEW.slug = 'settings' THEN NEW.data = NEW.data - 'geoBlockBypassKey'; END IF;
 RETURN NEW;
END; $$;
CREATE TRIGGER strip_public_bypass_codes BEFORE INSERT OR UPDATE ON public.content FOR EACH ROW EXECUTE FUNCTION public.strip_public_bypass_codes();