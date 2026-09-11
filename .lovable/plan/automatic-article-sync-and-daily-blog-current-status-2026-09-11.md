# Automatic article sync and daily blog: current status

## What I checked

- The two automatic endpoints exist in the code: one pulls in synced articles, one writes the daily post.
- The settings record that stores "how often to run" and "when it last ran" is **empty** — no row for either job, so neither has ever run automatically.
- The table holding the secret key that lets an outside scheduler trigger those jobs is **empty** — so any scheduled call would be rejected.
- No scheduled job exists in the database.
- All 9 articles currently on the blog were created yesterday (Sep 10) in a short burst — consistent with manual "Sync now" / "Write today's post" clicks, not a schedule.

**Conclusion: nothing is running automatically right now.** Both features only work when you press the buttons in the studio.

## Plan to turn automation on

1. Create the settings rows for both jobs (sync every 24h, daily post every 24h) so the interval and last-run tracking start working.
2. Generate a secret trigger key for each job and store it, then give you the two ready-to-use call commands (URL + key).
3. Set up the schedule so those two URLs are called every hour; the jobs themselves skip unless the chosen interval has elapsed.
   - Option A (recommended): schedule it from the database, pointing at the stable Lovable-hosted URL.
   - Option B: add a scheduled task on your Plesk server pointing at ammarai.com.
4. Verify: after the first scheduled run, the "last automatic sync" line in the studio shows a timestamp.

## Note on the daily post

Writing a post needs your OpenAI key, which lives only on the Plesk server. So the daily writer must be scheduled against **ammarai.com** (Option B), while the article sync can run from either. I will set it up that way unless you prefer otherwise.

## Technical detail

- Tables: `sync_settings` (ids `babylovegrowth`, `daily-blog`), `sync_cron_tokens`.
- Endpoints: `POST /api/public/cron/babylovegrowth`, `POST /api/public/cron/daily-blog`, both authenticated by bearer token compared against `sync_cron_tokens` (timing-safe) or platform cron auth.
- Scheduling via `pg_cron` + `pg_net` for the sync job; a Plesk scheduled `curl` for the daily writer.
