# Homepage 404: their latest reply changes the picture — take the investigation back to our side

They are right on one point and I should say so plainly: the 200 I reported came from a
build I made here in the workspace, not from your live server. Against the live site the
homepage is still 404. So the "they must be rewriting it" theory can no longer be assumed.

There is a version of events that fits *all* the evidence, theirs and mine:

1. The deployed copy answers "not found" for the homepage for its own reason.
2. The server then fetches its error page, which goes back through the app as `error_docs`.
3. What we see returned is that second response — which is why the page names `error_docs`.

If that is what is happening, the fault is in the build that is sitting on your server, and
it is ours to fix. Importantly, the copy on your server is built in a different mode from the
copy running here — that server-style build has never been produced or tested in this
workspace, which is exactly where an untested difference could hide.

## Plan

### 1. Reply briefly to the host (no action requested)
Confirm the 200 came from a local build, not their instance; thank them for the live re-test
and the file timestamps; tell them we are now checking the deployed bundle ourselves and will
come back only if we find something on their side. No configuration changes requested for now.

### 2. Produce the server-style build here and test it
Build the site the same way your Plesk deployment does, start it the same way Plesk starts it,
then request the homepage and a few other pages and record the exact responses.

- If the homepage answers "not found" locally too — the bug is reproduced and fixable in code.
- If it answers correctly — then the bundle on your server differs from what this code
  produces, and the fix is a clean rebuild and redeploy rather than a code change. I will say
  so plainly instead of changing code.

### 3. Find the cause
Check, in order, the things that can make only the homepage fail in that build:
- whether the homepage is present in the built output at all, or was dropped during the build;
- whether a pre-generated homepage file is being served instead of the live homepage;
- whether the homepage's content load from the database fails in that build and is reported as
  "not found" rather than as an error;
- whether the catch-all page is swallowing the bare homepage address.

### 4. Fix, prove, redeploy
- Smallest change that makes the homepage answer correctly in the server-style build.
- Re-test: homepage 200, no "Page not found" flash, every other page unaffected, and the
  Lovable preview still behaves identically.
- Give you the exact rebuild-and-restart steps for Plesk, then re-check the live homepage and
  request re-indexing in Search Console once clean.

### 5. Safety net (decide after step 2)
If the root cause turns out to sit on the host after all, add the one-line guard we discussed:
when the app is handed the made-up `error_docs` address, show the homepage instead of an error
screen. I will only propose this again once the build test tells us which side is at fault.

Nothing in this work changes URLs, slugs, sitemap, metadata, content or design.

## Technical details

- Production uses the Nitro `node-server` preset pinned in `vite.config.ts`; the Lovable build
  forces `cloudflare-module`, so the node-server output has never been produced here. Step 2
  attempts it with the Lovable preset override cleared.
- Reproduction: `npm run build`, then `node dist/server/index.mjs`, then `curl -i` against
  `/`, `/about`, `/ai-tools`, `/error_docs`.
- Suspects: absence of the `/` route in the emitted route tree under this preset; a prerendered
  `dist/public/index.html`; Nitro public-asset precedence over SSR for `/`; the `__root` loader
  (`siteContentQuery` → `fetchContentRows`) resolving to a not-found state when Supabase env
  (`VITE_SUPABASE_*`) is missing at build or runtime on the server.
- Their observation of `loadSiteContent()` on every request is expected — that is the `__root`
  loader, not the not-found decision.
- Consistent with an Apache `ErrorDocument` re-entry: our 404 for `/` triggers the error
  document, which re-enters Passenger as `/error_docs`, producing the router state we captured.
