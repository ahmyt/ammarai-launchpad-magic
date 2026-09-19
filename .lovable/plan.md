# Get the site back up: the app runs fine by hand — restart the app manager cleanly

Good news from your last screenshot: `npm run start` launched `node dist/server/index.mjs` and printed **no error** — the app starts and stays running when launched by hand. So the deployed code is healthy. The failure happens only in the hand-off from Plesk's app manager (Passenger) to the app, which points at a stale or stuck Passenger process rather than broken files.

## Step 1 — Stop the manual run, then force a clean restart

The manual `npm run start` may still be running in the background and can hold the port.

1. On the Node.js **Dashboard** tab, click **Disable Node.js**, wait ten seconds.
2. Click **Enable Node.js** (same button), confirm Node.js version 22.23.2, Application Root `/ammarai.com`, Startup File `dist/server/index.mjs`.
3. Click **Restart App**.
4. Wait one minute, then open https://ammarai.com/ once.

## Step 2 — If it still fails, capture the restart live

1. Open the **Logs** page, keep **all** log types ticked, and press **Start real-time updates**.
2. In another tab, open https://ammarai.com/ once.
3. Send me a screenshot of the new lines that appear — the first request after a restart is when Passenger prints its real boot error (it never reached the Node.js log because the app was never launched through Passenger).

## Step 3 — If no clear line appears, ask the host one question

Send your host this exact message: "Passenger fails to start my Node.js app (Error ID bc90aac5), but `node dist/server/index.mjs` runs cleanly by hand. Please check the Passenger application log for ammarai.com and tell me the startup error."

## Step 4 — Confirm the original problem is gone

Once the site answers again, open https://ammarai.com/ and refresh twice. The "Page not found" flash should be gone, because the homepage is now roughly a tenth of its previous size and no longer trips the firewall's 1 MB response limit.

## Notes

- No code changes are needed; the deployed package is verified healthy (homepage 121,979 bytes; `/error_docs` serves the homepage; genuine unknown addresses still return a real 404).
- Keep `dist-old` until the site is confirmed working, then delete it.
- Still open separately: asking the host to send `/` straight to the app instead of through their error-document handling, and rewriting the AI SEO Analyzer tutorial page around the four documented functions.
