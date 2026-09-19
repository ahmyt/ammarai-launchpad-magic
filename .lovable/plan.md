# Homepage 404 flash — one step left: rebuild and restart

## Confirmed this turn

- Your Plesk screenshots: Git shows the latest commits (including "Update plan" from 11:30) deploying `main` to /ammarai.com, and the file manager shows `$slug.tsx` updated today at 21.6 KB.
- Our fixed `src/routes/$slug.tsx` here is 22,166 bytes ≈ 21.6 KB — an exact match. **The correct source is on your server.**
- Live check just now: `https://ammarai.com/` still returns 404, size 1,040,426 bytes — the exact same old build, byte for byte.

## What that means

Pulling/deploying in Plesk Git only copies the **source files**. The app actually runs the **built** files in `dist/`, and those are still from the old build. Until the project is rebuilt and the Node app restarted, the site keeps serving the old code — which is exactly what we're seeing.

## The remaining steps (about 5 minutes)

1. In Plesk, open the app's **Terminal** (or Node.js → Run script) in the app directory and run:
   ```text
   npm ci && npm run build
   ```
   Wait for it to finish without errors.
2. Plesk → **Node.js → Restart App** (this is what swaps the running code — a rebuild alone doesn't).
3. Hard-refresh `https://ammarai.com/` — the "Page not found" flash should be gone.

## I'll verify

Tell me when the restart is done and I'll confirm from here that the homepage returns a clean 200 with the homepage content, and that wrong addresses still show a real 404.

## After that

- Send the host the reply saved in your Files (`host-support-request-ammarai-v3.md`) so they fix the root cause — the server still hands the app `error_docs` instead of `/`; the new build hides that, but their fix removes it.
- Request indexing of the homepage in Google Search Console, since crawlers have been served a 404.

## Scope

No code changes — the fix is already on GitHub and on your server. This is build + restart only.
