# Why the daily writer hasn't posted automatically

## What the records show

- The hourly schedule is alive: both jobs fired every hour, including 04:37 and 05:07 today, all reported "succeeded".
- Every recent call to the daily writer came back with `skipped: true`. That is the writer saying "less than 24 hours since the last run".
- The stored "last run" for the daily writer is 11 Sep, 04:56 UTC — the timestamp of the manual trigger we ran that day. So the 24-hour clock has been counting from that manual run, and the next allowed run was 12 Sep 04:56. The next hourly call after that is 05:37 UTC today, which is when it would fire on its own.
- All existing daily posts (9/10 and 9/11) were created during manual triggers, not by the schedule. The hourly call logs only keep a few hours of history, so whether the one eligible automatic attempt on 11 Sep failed cannot be confirmed from the data — that needs a run record we don't currently keep.

Two real problems behind this:

1. **Time drift.** Because the clock restarts from whenever the last run happened, the post time slides later every day, and a manual run pushes the next automatic one a full day away.
2. **No run history.** There is no record of attempts, so a failed automatic run looks identical to one that never happened.

## Plan

1. **Run at a fixed daily time instead of "24 hours since last run".**
   Switch the daily writer's schedule check from an elapsed-hours test to a calendar-day test: if a run has already been recorded for today (UTC), skip; otherwise run. Combined with a single daily cron time (proposed: 05:10 UTC) the post lands at the same time each day, and a manual run only suppresses the rest of that same day.

2. **Keep a run log.**
   Add a small `sync_runs` table (job id, started/finished time, outcome, message) written by both cron endpoints on every attempt, including skips and failures. Surface the last few entries on the Studio articles page under the "last automatic sync" line, so a silent failure is visible.

3. **Record manual runs too.**
   The Studio "Write today's post" button currently doesn't stamp the last-run field, which is why the stored timestamp and the actual posts disagree. Make it record its run like the scheduled one does.

4. **Apply the same calendar-day rule to the article sync** so both jobs behave consistently.

5. **Verify:** wait for the next scheduled time and confirm a new post plus a "succeeded" entry in the run log; if it fails, the log will name the reason (for example a missing key or an OpenAI error on the server).

## Technical notes

- `sync_settings` keeps `interval_hours`; the endpoints will treat `last_run_at` on a same-UTC-day basis rather than an elapsed-millisecond comparison in `src/routes/api/public/cron/daily-blog.ts` and `.../babylovegrowth.ts`.
- New table `public.blog_sync_runs` with grants, RLS (admin read, no client write) and a token-checked `cron_log_run(_id, _token, _status, _message)` security-definer function, matching the existing `cron_*` token pattern so it works from the Plesk deployment without the private key.
- `pg_cron` jobs `ammarai-daily-blog` / `ammarai-sync-articles` re-scheduled to one call per day (`10 5 * * *` and `40 5 * * *`) instead of hourly, cutting 46 wasted calls per day.
- No change to article content, images, table of contents, or the writer prompt.
