# Homepage 404 flash — the fix never reached your GitHub repo

## Confirmed

- You checked `src/routes/$slug.tsx` in your repo: no `HOST_ERROR_DOC_SLUG`. That matches the live site, which still returns 404 for the homepage with the old build.
- The fix does exist in this Lovable project (commit "Fixed homepage 404 with guard"), but this project's code is not syncing to your GitHub repository — so every pull and redeploy you do keeps rebuilding the same old code.

Nothing is wrong with your deployment process. The code simply isn't in the repo you deploy from.

## The fix

### Step 1 — Get the code into your GitHub repo

Choose one:

- **Option A (recommended, permanent): connect GitHub sync.** In Lovable, open the Plus (+) menu in the chat input → GitHub → Connect project, authorize, and pick your account. From then on every change here pushes to GitHub automatically, and your pull-and-build flow on Plesk just works.
- **Option B (one-off, manual): I prepare a download.** I give you the updated `src/routes/$slug.tsx` (or a ZIP of the current source); you commit it to your GitHub repo and push.

Before deploying, confirm the repo file contains:

```text
const HOST_ERROR_DOC_SLUG = "error_docs";
```

If that line is absent, the build will behave exactly like the one live now.

### Step 2 — Rebuild and restart on Plesk

1. Pull on the server.
2. `npm ci && npm run build`
3. Restart the Node app.

### Step 3 — Verify

- Refresh `https://ammarai.com/` — no "Page not found" flash.
- I re-check from here and confirm the homepage returns a clean 200.
- Then request indexing of the homepage in Google Search Console, since crawlers have been seeing a 404.

## Still pending with your host

The underlying cause is theirs: the public request for `/` arrives at the app as `error_docs`. The reply to paste into your existing ticket is in your Files as `host-support-request-ammarai-v3.md`. The guard above stops the visible damage; their fix removes the cause.

## Scope

No URLs, slugs, sitemap, metadata, tutorials, or tool content change. The only code involved is the `error_docs` guard already written.
