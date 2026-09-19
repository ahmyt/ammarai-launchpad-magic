# Their explanation doesn't hold — and we can stop the flash ourselves

Yes, I checked that paragraph against the actual code and the live page.

## What their claim says vs what the app does

They say the homepage is looked up "by slug" in the content table, doesn't find one,
and so answers "not found".

That is not how the site works:

- The homepage has its own dedicated page file. It never looks anything up by address.
- Only unknown single-word addresses go through the catch-all page that checks the
  content table. `/about` and `/pricing` also have their own dedicated files — they are
  not "slugs that exist in the table", so their working state proves nothing about the table.
- The content load they see in the log (`loadSiteContent`) runs once on **every** page,
  homepage included, to fill in text. It is not the thing deciding not-found.

The only way the "not found" screen appears is if the catch-all page is handed an address
that doesn't exist. The page the server sends back names that address, and it is
`error_docs` — not `/`. That is the whole answer: by the time our app is asked to render,
the address is no longer `/`.

## Plan

### 1. Correct the record with the host (one short reply)
Add to the existing follow-up ticket, in their terms:
- the homepage is not slug-driven, so "the slug isn't in your table" cannot apply;
- `/about` and `/pricing` are also not slug-driven — their comparison is invalid;
- the returned page names `error_docs` as the address rendered;
- ask them to check the layer their loopback test skipped (document root / static handling
  of the bare `/` and the error-documents handler), since a direct-to-Passenger test
  bypasses exactly the layer doing the rewrite.

### 2. Stop the flash on our side regardless (recommended)
Even if they never change anything, we can make the app refuse to show "Page not found"
for this: when the catch-all page receives `error_docs`, send the visitor to the homepage
with a permanent redirect instead of rendering a 404.

Effect: the homepage answers correctly, no "Page not found" flash, and search engines
stop seeing a 404 at the domain root. Nothing else changes — no URLs, slugs, sitemap,
metadata, content or design.

Caveat: this is a shield over a host misconfiguration, not a cure. Worth doing because the
homepage is currently served to Google as an error, and the host has already refused once.

### 3. Verify and redeploy
- Confirm locally that `/error_docs` redirects to the homepage and every other address is
  untouched.
- You rebuild and restart on Plesk; then I re-check the live homepage and, once clean,
  we request re-indexing in Search Console.

## Technical details

- `src/routes/index.tsx` is a static file route for `/`; `src/routes/$slug.tsx` is the only
  route that resolves against CMS content and the only one throwing `notFound()`.
  `/about`, `/pricing`, `/ai-tools` are their own file routes.
- `__root` loader calls `siteContentQuery` on every request — that is the Supabase call in
  their log, unrelated to the not-found decision.
- Live proof: root HTML embeds `lastMatchId: "$slug error_docs"`, `isNotFound: true`;
  `/ai-tools` embeds `lastMatchId: "ai-tools ai-tools"`.
- Step 2 = in the `$slug` loader, before content lookup, `throw redirect({ to: "/",
  statusCode: 301 })` when `params.slug === "error_docs"`.
