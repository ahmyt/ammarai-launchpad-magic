INSERT INTO public.sync_settings (id, interval_hours, last_run_at, updated_at)
VALUES ('babylovegrowth', 24, NULL, now()), ('daily-blog', 24, NULL, now())
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.sync_cron_tokens (id, token)
VALUES ('babylovegrowth', gen_random_uuid()), ('daily-blog', gen_random_uuid())
ON CONFLICT (id) DO NOTHING;

SELECT cron.schedule('ammarai-sync-articles', '7 * * * *', $$
  SELECT net.http_post(
    url := 'https://ammarai.com/api/public/cron/babylovegrowth',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'babylovegrowth')),
    body := '{}'::jsonb
  );
$$);

SELECT cron.schedule('ammarai-daily-blog', '37 * * * *', $$
  SELECT net.http_post(
    url := 'https://ammarai.com/api/public/cron/daily-blog',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'daily-blog')),
    body := '{}'::jsonb
  );
$$);