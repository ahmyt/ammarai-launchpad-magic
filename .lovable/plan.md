# Get the site back up: find why the server refuses to start

The files on the server are correct. The uploaded package is healthy — I ran it here on the same Node version and the homepage serves at about 120 KB, well under the firewall limit that caused the original problem. The startup file on the server (104.5 KB) is exactly the one from that package, the application root and startup path are right, and the environment variables are in place.

So the remaining question is not "which files" but "why won't it launch". The Plesk log screenshots only show the result (500 on every page) and a separate firewall block on the Passenger error page itself — never the reason. We need that one line.

## Step 1 — Show only the Node.js log (fastest answer)

Your latest screenshot shows the log page has a dropdown on the right listing log types. Open it, untick everything except **Node.js**, then press **Refresh**. That view contains the application's own startup output — the real reason it won't launch. Send me a screenshot of those lines.

Everything currently visible is the wrong log: the Apache entries only show the resulting 500s, and the ModSecurity 403 is the firewall blocking the Passenger error page's own link, not our app.

## Step 2 — Run the app by hand

On the **Run Node.js commands** tab, the command box is prefixed by the small dropdown that currently says `npm` — that's why `node dist/server/index.mjs` came back as "Unknown command: node". Change that dropdown from **npm** to **node**, then type only:

```
dist/server/index.mjs
```

and press the play button. It will print the crash message directly. Send me that output.


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
