# Homepage 404 — the build is new, the running process is not

## What your screenshots prove

- `$slug.tsx` — Sept 19, 05:24 PM (the fix)
- `dist/server/index.mjs` — Sept 19, 05:50 PM (built *after* the fix)

So the build did run with the fix included. Good.

## What the live site still shows (checked 16:02 UTC)

- `/` → 404, 1,040,426 bytes, still rendering the internal address `error_docs`
- `/about` → 200
- a genuinely wrong address → 404 at 1,040,362 bytes

The root response is still the old "page not found" render. A freshly built bundle is sitting on disk, but the process answering requests was started before 05:50 PM and is still running the old code in memory. Passenger keeps the old process alive until it is explicitly told to restart — rebuilding alone never swaps it.

## The one step left

In Plesk: **Websites & Domains → ammarai.com → Node.js → Restart App**.

If that button does nothing, force it from the server terminal in the application root:

```text
mkdir -p tmp
touch tmp/restart.txt
```

Passenger picks up `tmp/restart.txt` on the next request and starts a fresh process from the new build.

## Then

Hard-refresh https://ammarai.com/ and tell me. I will confirm from here that:

- `/` returns 200 with the homepage and no "Page not found" flash
- a genuinely wrong address still returns a proper 404

## If it is still 404 after a confirmed restart

Then the process is running from a different folder than the one you rebuilt. In that case send me the Plesk Node.js screen showing **Document Root**, **Application Root**, and **Application Startup File**, and I will pinpoint the mismatch.

## Afterwards

- Send your host the reply saved in your Files (`host-support-request-ammarai-v3.md`) so they stop handing the app `error_docs` in place of `/`.
- Request indexing of the homepage in Google Search Console, since crawlers have been served a 404.

## Scope

No code changes. The fix is already in the source, on GitHub, and in the built bundle on your server. This is a process restart only.
