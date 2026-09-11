SELECT cron.unschedule('ammarai-sync-articles');
SELECT cron.unschedule('ammarai-daily-blog');

SELECT cron.schedule('ammarai-sync-articles', '7 * * * *', $$
  SELECT net.http_post(
    url := 'https://project--383ef3fe-0d06-4f23-b363-8dcb6227b30a-dev.lovable.app/api/public/cron/babylovegrowth',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'babylovegrowth')),
    body := '{}'::jsonb
  );
$$);

SELECT cron.schedule('ammarai-daily-blog', '37 * * * *', $$
  SELECT net.http_post(
    url := 'https://project--383ef3fe-0d06-4f23-b363-8dcb6227b30a-dev.lovable.app/api/public/cron/daily-blog',
    headers := jsonb_build_object('Content-Type','application/json','Authorization','Bearer ' || (SELECT token::text FROM public.sync_cron_tokens WHERE id = 'daily-blog')),
    body := '{}'::jsonb
  );
$$);