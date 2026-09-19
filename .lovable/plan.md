# Deploying AmmarAI on Plesk

The app is a server-rendered React site. It is not a folder of HTML files you can just upload: a Node.js process renders every page, so Plesk must run that process and send all requests to it. The database and sign-ins stay on Lovable Cloud — nothing to migrate there.

This plan gives the full, verified runbook and refreshes the in-repo guide so the two never drift apart.

```text
Browser ──> Plesk nginx/Apache ──(proxy everything)──> Node app on localhost:PORT
                                                        │
                                                        └──> Lovable Cloud database (HTTPS)
```

## 1. Put the code on the server

Upload the project (Git clone from Lovable, or a ZIP of the source) to the domain, e.g.
`/var/www/vhosts/ammarai.com/app`. Keep it out of `httpdocs` if your host lets you — it avoids the web root serving raw source files. Exclude `node_modules`, `.git`, and `dist` from any ZIP.

## 2. Build it as a Node server

In Plesk → **Websites & Domains → ammarai.com → Node.js**:

- Node.js version: **22** (plain major version — see troubleshooting, never `22.23.2`)
- App root: your app folder
- Application mode: **Production**

Then set environment variables (step 4) **before** the first build, and run from "Run Node.js commands":

```text
npm install
npm run build     # must create dist/server/index.mjs
```

`VITE_*` values are baked into the browser bundle at build time, so changing one later means rebuilding.

## 3. Point Plesk at the built server

Still in the Node.js screen:

- Application startup file: `dist/server/index.mjs`
- Application URL: `/`
- Document root: your app folder
- Save, then **Restart App**

`npm run start` runs the same file (`node dist/server/index.mjs`) — use the direct path so Plesk doesn't need npm at boot.

## 4. Environment variables (Node.js → Custom environment variables)

| Variable | Needed for | Notes |
| --- | --- | --- |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID` | site + admin content | same values as this repo's `.env`; set before build |
| `SUPABASE_URL`, `SUPABASE_PUBLISHABLE_KEY` | server-side data + sign-in | same values again, without the `VITE_` prefix |
| `PORT` | app listening port | only if Plesk doesn't set it itself (e.g. `3000`) |
| `OPENAI_API_KEY` | daily blog writer | required for auto-posting; leave `OPENAI_MODEL` unset |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_FROM` | contact-form email | local delivery: `127.0.0.1` / `25` / `false` / your mailbox |
| `SMTP_PASS` | contact-form email | only for a remote mail host; not needed for loopback port 25 |

Not needed and not available on this plan: `SUPABASE_SERVICE_ROLE_KEY`, `LOVABLE_API_KEY`, `LOVABLE_CRON_SECRET`. The app is built to run without all three.

## 5. Routing — this is the 404 flash you saw

Every request, including `/`, must reach the Node app. Right now Plesk answers `/` itself (its static-file/error-document handling returns a 404 page before the app is consulted), which is why the homepage briefly shows "Page not found" and why Google receives a 404 for your homepage.

Those two switches ("Serve static files directly by nginx", "Custom error documents") are greyed out on your account, so they must be changed by the hosting provider. Send them exactly this:

> For domain ammarai.com, the Node.js app (Passenger) must receive all requests including `/`. Currently `GET /` is answered by nginx/Plesk and returns 404 from `error_docs`, while `/ai-tools` returns 200 from the app. Please disable direct static file serving and custom error-document interception for this domain, and confirm the ProxyPass/Passenger handler covers `/`.

If they can't change it, the fallback is your own nginx template that only proxies to the app — that can be done without Plesk's toggles, but it needs provider/root access.

## 6. Daily blog writer schedule

The app generates a post only when its trigger URL is called, and skips itself if the interval hasn't elapsed. On Plesk, add a server cron entry (Plesk → Websites & Domains → **Scheduled Tasks**, or the server crontab):

```text
0 14 * * * curl -s -X POST -H "Authorization: Bearer <your CMS trigger token>" https://ammarai.com/api/public/cron/daily-blog
```

The token is the one shown in the CMS automation/job settings. Runs, successes and skips are recorded in the CMS run history.

## 7. Google sign-in on your own domain

One-time: copy the callback URL from Lovable Cloud → Authentication → Google, add it in Google Cloud Console as an authorized redirect URI for a Web application OAuth client, paste the resulting Client ID and Secret back into Lovable Cloud, and add `https://ammarai.com/**` to Redirect URLs. Email/password sign-in needs nothing.

## 8. Verify after deploy

- `curl -I https://ammarai.com/` → **200** (a 404 here means step 5 isn't fixed yet)
- Homepage, `/ai-tools`, a tutorial and a blog post all render
- `/sitemap.xml` and `/robots.txt` return valid content
- `/auth` → sign in → `/admin` loads and edits appear on the site
- Contact form: submit, then `https://ammarai.com/api/contact` shows `{"smtp":"ok",...}`
- Daily writer: run the trigger once by hand and confirm a new post plus a run-history entry

## Troubleshooting

**Build fails with `nodenv: node: command not found` / exit 127** — the Node version selected in Plesk isn't installed in nodenv. Switch to plain `22` (or `20`) and re-run, or over SSH: `nodenv versions`, `nodenv global 22`, then `npm install && npm run build`.

**Homepage flashes "Page not found"** — step 5, not a code problem.

**"Something went wrong and the content wasn't generated." on the daily writer** — `OPENAI_API_KEY` missing, or `OPENAI_MODEL` set to something other than a `gpt-5.6-*` model. Unset `OPENAI_MODEL`.

**Contact form says saved but email failed** — SMTP code in the message: `ECONNECTION`/`ETIMEDOUT` wrong host/port or blocked outbound, `EAUTH` mailbox login, `wrong version number` means `SMTP_SECURE` doesn't match the port (`465` → `true`, `587` → `false`).

**Visitor confirmations never arrive but support does** — outbound mail from the server IP is blocked or blacklisted; see the blacklist section of the in-repo guide.

## Repo change

`SELF_HOSTING.md` currently says "Node.js version: 20+", recommends `npm run start` as the startup command, and doesn't cover the error-document/nginx interception, the CMS trigger token for the daily writer on a non-Lovable host, or the "set env before first build" ordering. I'll rewrite those sections so the guide matches the runbook above, and leave everything else (SMTP detail, blacklist recovery, Google OAuth) as-is. No application code, routes, URLs, or database changes.
