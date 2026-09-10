GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
INSERT INTO public.user_roles (user_id, role)
SELECT u.id, 'admin'::app_role FROM auth.users u WHERE u.email = 'hm3004923@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;