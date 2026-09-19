# Homepage 404 on the live site — diagnose in the app, not the host

The hosting provider tested it from the server side and showed that the request for the
homepage arrives at our application unchanged, and our application is the thing answering
"Page not found". Their reply rules out the host settings we suspected (error documents,
Apache/nginx rewrites, Node version, IP blocking). So the next step is on our side.

An important detail: the copy of the site running here on Lovable and the copy running on
your server are built in two different ways. The homepage works here and fails there, so the
fault almost certainly lives in the server-style build — which has never been run and tested
in this workspace.

## Plan

### 1. Reproduce the failure here
- Produce the same server-style build the Plesk deployment uses.
- Start it locally the same way Plesk starts it.
- Request the homepage and every other page and record which ones answer correctly.

Expected outcome: the homepage answers "not found" locally too. If it does, the bug is
reproducible and fixable without touching the live server.

### 2. Find the cause
Check, in order, the things that can make only the homepage fail in that build:
- whether the homepage is present in the built output at all, or was dropped/overwritten
  during the build;
- whether a pre-generated homepage file is being served in place of the live homepage;
- whether the homepage's content loading fails in the server build (it loads site content
  from the database on every request) and that failure is being reported as "not found"
  rather than as an error;
- whether the catch-all page route is swallowing the homepage address.

### 3. Fix and prove it
- Apply the smallest change that makes the homepage answer correctly in the server-style build.
- Re-run the local server build and confirm: homepage answers 200, no "Page not found" flash,
  all other pages unaffected.
- Confirm the normal Lovable preview still builds and behaves identically.

### 4. Redeploy
- Give you the exact steps to rebuild and restart on Plesk.
- After deployment, re-check the live homepage and, once clean, request re-indexing in
  Search Console.

If step 1 does **not** reproduce — the homepage works fine in the local server build — then the
deployed copy on your server is out of date or built differently, and the fix is a clean
rebuild and redeploy rather than a code change. I will say so plainly instead of changing code.

## Technical details

- Production uses the Nitro `node-server` preset pinned in `vite.config.ts`; Lovable preview
  uses `cloudflare-module`. Only the former is in play on Plesk and it is untested here.
- Reproduction: `vite build` with the Lovable preset override absent, then
  `node dist/server/index.mjs`, then `curl -i` against `/`, `/about`, `/ai-tools`, `/pricing`.
- Suspects to inspect in the build output: presence of the `/` route in the emitted route
  tree, any prerendered `dist/public/index.html`, Nitro public-asset precedence over SSR for
  `/`, and the `__root` loader (`siteContentQuery` → `fetchContentRows`) resolving to a
  not-found state when the Supabase call fails under the Node preset (missing `VITE_*` env at
  build or runtime).
- No URLs, slugs, sitemap entries, metadata or content change as part of this work.
