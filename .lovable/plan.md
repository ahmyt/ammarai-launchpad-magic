# Run the daily blog + article sync on your own server (Plesk)

Both keys now live on Plesk, so the two scheduled jobs should call `ammarai.com`. Two things stop that today:

1. Your server runs an older build, so the two automation addresses don't exist there yet.
2. The automation code writes to the database with a private key that Lovable Cloud never releases — so on Plesk those writes fail.

This plan removes the need for that private key, so everything works on your server with only the public keys.

## How it will work

The scheduler already sends a secret trigger token with each call. Instead of writing to the database with a privileged key, the endpoints will hand that token to the database itself, which checks it and then performs the write. Same protection, no private key on your server.

## Changes

### Database (one migration)

Add token-checked functions, each verifying the caller's token against the existing `sync_cron_tokens` table before doing anything:

- `cron_verify_token(id, token)` — used for endpoint authentication
- `cron_get_settings(id, token)` — reads interval and last run
- `cron_mark_run(id, token)` — stamps the last run time
- `cron_upsert_article(id, token, row)` — saves/updates a blog or synced article
- `cron_store_blog_image(id, token, name, content_type, data)` — saves a generated illustration

New table `blog_images` (name, content type, base64 data) so article pictures no longer need private storage access. Public read, writes only through the token-checked function.

### Code

- New `src/lib/cron-db.server.ts`: builds a public-key Supabase client and wraps the functions above; falls back to the privileged client when it is available (Lovable-hosted), so nothing regresses there.
- `src/routes/api/public/cron/babylovegrowth.ts` and `.../daily-blog.ts`: authenticate and read/write settings through that helper instead of the privileged client.
- `src/lib/babylovegrowth.server.ts` and `src/lib/daily-blog.server.ts`: accept a small writer interface (upsert article, store image) instead of assuming a privileged client. Manual "Sync now" / "Write today's post" in the Studio keep using the signed-in admin path unchanged.
- `src/routes/api/public/blog-image.$file.ts`: serve from the new table first, falling back to private storage for the images already generated.

### Schedules

Already pointing at `https://ammarai.com/api/public/cron/babylovegrowth` and `/daily-blog`, hourly, self-throttled to once per 24 hours. No change needed.

## Your step after I finish

Rebuild and redeploy the site to Plesk, then restart the Node.js app. I'll then trigger both jobs live and confirm an article syncs and a post is written.

## Notes

- The BabyLoveGrowth key was rejected (403) when called from here; on Plesk it uses the key you just added, so the live test will show whether that key is valid.
- Nothing about how articles look or read changes — only which credentials perform the writes.
