# Fix: "Recent automatic runs" section never appears

## Diagnosis (confirmed)

- The "Recent automatic runs" box on **Studio → Articles** only renders when there is at least one row in the `blog_sync_runs` table (`runLog.length > 0`).
- The table currently has **0 rows** — nothing has ever been logged, so the collapsible is invisible.
- The logging RPCs (`cron_log_run`, `admin_mark_sync_run`) exist in the database, so the code that calls them is almost certainly not running yet: the live site on Plesk is likely running a build from **before** run-logging was added (the cron routes only log runs in the new code).
- Secondary issue: logging failures inside the cron routes may be silently swallowed, so even after redeploying we can't be sure rows will appear without verification.

## Plan

1. **Always show the section** — remove the `runLog.length > 0` condition in `src/routes/admin.articles.tsx` so the "Recent automatic runs" collapsible is always visible, with a friendly empty state ("No automatic runs recorded yet — runs will appear here after the next scheduled sync at your set time").
2. **Surface logging failures** — in `cron_log_run`/`admin_mark_sync_run` call sites, log warnings to the response/console when a run-log write fails, instead of failing silently, so we can diagnose if rows still don't appear.
3. **Seed the history from known data** — insert a one-time backfill row from `sync_settings.last_run_at` for each job (daily-blog and article sync) so the section shows the last known run immediately instead of staying empty until the next scheduled run.
4. **Verify** — after edits, query `blog_sync_runs` to confirm rows exist, then confirm the collapsible renders with entries on `/admin/articles`.

## What you'll need to do after

- **Redeploy the latest build to Plesk and restart the Node.js app.** Until the new code runs on the live site, the hourly/daily cron calls from the scheduler hit the old build, which never writes run logs. After redeploying, the next scheduled run (14:10 / 14:40 UTC, or your set time) should appear in the history automatically.

## Technical details

- Files touched: `src/routes/admin.articles.tsx` (always render `<details>` + empty state), `src/lib/cron-db.server.ts` and/or cron routes (log failures visibly), one SQL statement to backfill from `sync_settings`.
- No schema changes; `blog_sync_runs`, `cron_log_run`, and `admin_mark_sync_run` already exist.
