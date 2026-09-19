# Homepage 404 flash — the fix IS on GitHub; the server copy is stale

## Confirmed this turn

- Your screenshot shows GitHub sync connected to `ahmyt/ammarai-launchpad-magic`, branch `main`, "In sync".
- I verified the synced branch itself: `src/routes/$slug.tsx` on `main` **does** contain the fix — `const HOST_ERROR_DOC_SLUG = "error_docs";` at line 74.
- The live site still returns the old build (homepage 404, 1,040,426 bytes, route state `$slug error_docs`).

Conclusion: GitHub has the fix. The copy on your Plesk server does not. So the failure is between GitHub and the running app on Plesk — the pull, the branch, the build, or the restart.

## Where you looked

You searched and didn't find `HOST_ERROR_DOC_SLUG`. Two things to check about where you searched:

1. Make sure it's the file `src/routes/$slug.tsx` inside the server checkout (not the built `dist/` output — the name doesn't survive the build; it gets compiled).
2. Check which branch the server checkout is on: if it's not `main`, or the pull failed, the file will be old.

## Steps on the Plesk server (Terminal, in the app directory)

1. `git status` — check the branch name (must be `main`) and look for errors or "diverged" messages.
2. `git pull origin main` — read the output. If it says "Already up to date" but the file lacks the line, the checkout is broken; if it errors (local changes, permissions), that's the cause.
3. `grep -n "HOST_ERROR_DOC_SLUG" src/routes/\$slug.tsx` — must print line 74. If it doesn't, the checkout is not on the synced commit; fix with `git fetch origin && git reset --hard origin/main` (only if you have no local edits there).
4. `npm ci && npm run build` — must finish without errors.
5. Restart the Node app in Plesk (Node.js → Restart App). A rebuilt bundle with no restart keeps serving the old one.

## If the server has no git checkout

If you deploy by uploading files instead of git pull, your upload is the old copy. Download the ZIP from GitHub (Code → Download ZIP on `main`) or tell me and I'll prepare a package, then upload and rebuild.

## Verify after restart

- Hard-refresh `https://ammarai.com/` — no "Page not found" flash.
- Tell me and I'll confirm from here that `/` returns 200 with the homepage.

## Still pending with your host (root cause)

Their server still hands the app `error_docs` instead of `/`. The guard hides the damage; the ticket reply in your Files (`host-support-request-ammarai-v3.md`) asks them to fix the cause.

## Scope

No code changes needed — the fix is already written and on GitHub. This plan is deployment verification only.
