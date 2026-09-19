# Homepage 404 flash — fix not yet on your GitHub repo

## What I just verified

1. Live site (checked just now): `https://ammarai.com/` still returns **404** with the old build — the response is 1,040,426 bytes and the embedded route state still reads `$slug error_docs`. So the running build still does **not** contain the guard.
2. The fix exists here in the Lovable project: commit `61fc779 "Fixed homepage 404 with guard"` with the `HOST_ERROR_DOC_SLUG` guard in `src/routes/$slug.tsx`.
3. This project's own git remote is Lovable's internal storage — **not your GitHub repository**. Since you pulled from GitHub and the live build is still old, the fix almost certainly never reached your GitHub repo (GitHub two-way sync is a separate workspace setting and may not be enabled or connected for this project).

## The fix (two parts)

### Part 1 — Get the fix onto GitHub

Choose one:

- **Option A (recommended): turn on Lovable GitHub sync.** In Lovable: project Settings → Connect to GitHub, then push. Once connected, this project (including commit 61fc779) syncs to your repo, and your normal "pull from GitHub → build → restart" flow on Plesk will pick it up.
- **Option B (manual, one-off):** I produce a ZIP of the current project source for you; you extract it over your repo (or just copy `src/routes/$slug.tsx`), commit, and push to GitHub yourself.

To confirm the fix is in what you deploy, open `src/routes/$slug.tsx` in your repo and check it contains the line `const HOST_ERROR_DOC_SLUG = "error_docs";` — if it's not there, the build will behave exactly like the one live now.

### Part 2 — Rebuild and restart on Plesk

1. Pull from GitHub on the server (or upload the new package).
2. Run `npm ci && npm run build`.
3. Restart the Node app in Plesk.

## How we'll know it worked

- `https://ammarai.com/` no longer flashes "Page not found" — the homepage shows immediately.
- I re-check from here: `/` should return the homepage, and the embedded route state should no longer mention `error_docs` as a not-found slug.
- Then request indexing for the homepage in Google Search Console (it has been served as a 404 to crawlers).

## Still pending with your host (unchanged)

The root cause stays on their side: the public request for `/` reaches the app as `error_docs`. The reply to paste into your existing ticket is saved as `host-support-request-ammarai-v3.md` in your Files. Even after the guard deploys (homepage shows correctly), ask them to fix the address swap so `/` returns a clean 200.

## What I will not change

No URLs, slugs, sitemap, metadata, tutorials, or tool content — only the already-written `error_docs` guard needs to reach your server.
