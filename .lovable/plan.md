# Fix the Plesk homepage 404 before routing starts

## Diagnosis

Your screenshots confirm all three deployment steps already happened:

- the fixed `$slug.tsx` source is on Plesk;
- `dist/server/index.mjs` was rebuilt afterwards;
- the app has been restarted several times.

The live response still enters TanStack as `$slug error_docs`. Therefore the route-level guard is too late or is being bypassed during Plesk's internal error-document request. More rebuilds and restarts of the same code will not change that.

## Change

Move the Plesk safety rule to the server entry, before TanStack Router sees the request:

1. In `src/server.ts`, inspect the incoming request URL.
2. When the pathname is exactly `/error_docs` or `/error_docs/`, clone the request with pathname `/` while preserving its method, headers, query string, and request context.
3. Send that rewritten request to the normal TanStack server handler, so the dedicated homepage route renders immediately with HTTP 200.
4. Leave all other paths unchanged, including genuine missing pages.
5. Keep the existing route-level guard as a second safety net unless validation shows it is redundant.

## Why this is different

The existing guard waits for the dynamic page route to load. The new guard runs at the first application entry point, before route matching. Plesk's synthetic `error_docs` address therefore cannot become the 404 route state seen in the live HTML.

## Verification

Build the exact Node/Plesk output and test:

- `/` → homepage, HTTP 200
- `/error_docs` → homepage, HTTP 200
- `/error_docs/` → homepage, HTTP 200
- `/about` → existing page, HTTP 200
- a made-up URL → AmmarAI 404, HTTP 404

Then deploy, rebuild, and restart once. I will verify the public response no longer contains `$slug error_docs` and no longer flashes the 404 page.

## Scope and SEO

- No public URL, slug, sitemap, content, tutorial, CMS, authentication, or backend changes.
- Genuine missing URLs remain 404.
- The homepage keeps its canonical `/` metadata.
- The workaround only handles Plesk's two synthetic error-document paths.
