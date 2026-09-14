# Make the "Explore AmmarAI" promo box appear on synced articles

## What's happening

The synced BabyLoveGrowth articles do include a promo block just above "Table of Contents" — a small pitch ending with an "Explore AmmarAI" link. It arrives as plain, unlabelled markup with no styling attached to it, and the site has no matching styling rule for it. So instead of a card it renders as a few loose lines of text that blend into the article and are easy to miss (one of the lines is even empty, adding a blank gap).

Confirmed by inspecting the stored article content for the synced posts and the site's article styles.

## The fix

Recognise this promo block when an article is displayed and turn it into a proper card in the site's editorial style: outlined panel, small uppercase label, headline, one line of description, and the "Explore AmmarAI" link styled as a button. Empty lines inside it are dropped.

Nothing is rewritten in the stored articles — the change happens at display time, so it applies to every existing synced post and every future one automatically.

## Technical notes

- `src/lib/article-html.ts`: add a `brandCta(html)` transform that finds the nested `<div>` block containing the `https://ammarai.com` link with the "Explore AmmarAI" text, extracts its text lines and the link, drops empties, and re-emits it as `<aside class="article-cta">` with a heading, paragraph, and anchor.
- `src/routes/blog.$slug.tsx`: pipe article HTML through the new transform alongside `collapsibleFaqs` and `wrapTables`.
- `src/styles.css`: add `.prose-editorial .article-cta` — 1px border, clamp padding, uppercase Inter eyebrow, accent button link, spacing above the table of contents; mobile-safe wrapping.

## Verification

- Load a synced article with the block (e.g. `/blog/ai-internal-linking`) at 1280 and 411 px: card renders above the contents panel, link works, no horizontal overflow.
- Confirm articles without the block are unchanged.
