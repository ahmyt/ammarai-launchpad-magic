# Verify and fix the Plesk Node.js configuration for ammarai.com

## What the screenshot shows (current state)

- Node.js Version: **22.23.2** — this specific patch version previously caused `nodenv: node: command not found` (exit 127) build failures, because nodenv only has plain major versions installed.
- Package Manager: **yarn** — fine if you install with "Yarn install", but the repo docs use `npm install` / `npm run build`; mixing them can produce different dependency trees.
- Document Root / Application Root: `/ammarai.com` — Plesk warns it should be a subdirectory (e.g. `public/`); acceptable but not recommended.
- Application Mode: **production** — correct.
- Application URL: `http://ammarai.com` — correct (Plesk handles the proxy to the Node port).
- Application Startup File: `dist/server/index.mjs` — correct, matches the `node-server` build output.

## Changes (all in Plesk, no code changes needed)

1. **Node.js version** — change `22.23.2` to plain **22** (or 20) in Websites & Domains → ammarai.com → Node.js, so nodenv resolves an installed binary. Prevents the exit-127 build failure returning.
2. **Package manager** — keep yarn only if you always use the "Yarn install" button; otherwise switch to npm and run `npm install` then `npm run build` via "Run Node.js commands" to match the documented flow.
3. **Environment variables** (Custom environment variables screen, not shown in screenshot) — confirm all are set: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`, `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY`, `PORT`, `OPENAI_API_KEY`, and the SMTP set (`SMTP_HOST=127.0.0.1`, `SMTP_PORT=25`, `SMTP_SECURE=false`, `SMTP_USER`, `SMTP_FROM`). Then re-run the build and Restart App.
4. **Fix the 404 flash on refresh** (separate screens, the actual cause of the issue you reported):
   - Apache & nginx Settings → turn OFF "Serve static files directly by nginx" so all requests reach the Node app.
   - Hosting Settings / Error Documents → turn OFF "Custom error documents".
   - Restart App afterwards.
5. **Optional hardening** — set Document Root to a `public/` subdirectory as Plesk suggests (requires moving or symlinking; safe to skip).

## Verification

- `npm run build` completes on Plesk with no nodenv error and emits `dist/server/index.mjs`.
- `curl -I https://ammarai.com/` returns **200** (not 404) and refreshing the homepage no longer flashes the 404 page.
- Contact form self-test: `https://ammarai.com/api/contact` returns `{"smtp":"ok",...}`.
- Sign-in at `/auth` and CMS editing at `/admin` still work.
