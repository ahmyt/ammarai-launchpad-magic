# Prepare the Plesk build package

## Status so far
- Production build completed successfully (node-server bundle).
- Smoke test on the built server passed:
  - `/` 200 (124,626 bytes — well under the 1 MB firewall limit)
  - `/about`, `/ai-tools`, `/ai-phone-agent`, `/ai-writer`, `/blog`, `/use-cases` all 200
  - A made-up URL correctly returns a real 404
- Zip assembled in the sandbox at `/tmp/ammarai-plesk-build.zip` (4.2 MB) containing:
  - `dist/` — the complete production build, with `dist/public/media` intentionally excluded so existing server media is never overwritten
  - `new-media/` — the three new AI Phone Agent call recordings (clinic appointment, clinic reminder, outbound follow-up), which must be copied into `dist/public/media/` on the server
  - `DEPLOY-PLESK.txt` — step-by-step upload, restart, env var, and verification instructions

## Remaining step (requires build mode)
1. Copy the zip into Files as `ammarai-plesk-build.zip` so it can be downloaded.

## What this package delivers to ammarai.com
- Audience card row on 17 broad tool pages
- Three genuine call recordings on AI Phone Agent under "Hear it in action"
- Audio samples play to the end without auto-advancing
- All earlier changes since the last Plesk upload

## Deploy notes (already written into DEPLOY-PLESK.txt)
- Keep the existing `dist/public/media` folder on the server; copy the three files from `new-media/` into it
- Restart the Node.js app in Plesk; if a 500 appears, Disable then Enable Node.js and restart once more
