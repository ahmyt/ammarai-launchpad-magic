# Get the site back up: find why the server refuses to start

The files on the server are correct. The uploaded package is healthy — I ran it here on the same Node version and the homepage serves at about 120 KB, well under the firewall limit that caused the original problem. The startup file on the server (104.5 KB) is exactly the one from that package, the application root and startup path are right, and the environment variables are in place.

So the remaining question is not "which files" but "why won't it launch". The Plesk log screenshots only show the result (500 on every page) and a separate firewall block on the Passenger error page itself — never the reason. We need that one line.

## Step 1 — Run the app by hand (fastest answer)

In the Node.js panel on ammarai.com, open the **Run Node.js commands** tab and run:

```
node dist/server/index.mjs
```

This starts the app in the foreground and prints the real crash message — a missing module, an unreadable path, or a bad environment value. Send me that output. This is the single most useful thing; everything below is a fallback.

## Step 2 — If that tab is unavailable, read the domain error log

Websites & Domains → ammarai.com → Logs → the file selector at the top right → choose the domain's **error_log** (not the access log), then look at the lines written at the moment of the last restart. Passenger prints a block there beginning with "Error ID" followed by the actual message.

## Step 3 — Likely causes, in order, and what each needs

1. **File ownership after extraction.** Files unzipped through File Manager sometimes end up owned by a different user than the one Passenger runs as, so the app cannot read them. Fix: in File Manager, select the `dist` folder → Change Permissions / ownership so it matches the other site files (compare against `dist-old`).
2. **Leftover conflict.** If `dist-old` is still inside the application root and anything was copied back into `dist` by hand, remove stray extra copies so only the extracted `dist` remains (plus `dist/public/media`).
3. **A dependency the server build expects from the site's `node_modules`.** Node.js panel → **NPM install**, then **Restart App**.

## Step 4 — Confirm the original problem is gone

Once the site answers again, open https://ammarai.com/ and refresh twice. The "Page not found" flash should be gone, because the homepage is now roughly a tenth of its previous size and no longer trips the firewall's 1 MB response limit.

## Notes

- No code changes are needed for this; the fix is already in the deployed package and verified locally (homepage 121,979 bytes; `/error_docs` serves the homepage; genuine unknown addresses still return a real 404).
- Keep `dist-old` until the site is confirmed working, then delete it.
- Still open separately: asking the host to send `/` straight to the app instead of through their error-document handling, and rewriting the AI SEO Analyzer tutorial page around the four documented functions.
