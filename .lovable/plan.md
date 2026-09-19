# Pillar links should select the matching filter on /ai-tools

## Goal
Clicking Create / Think / Automate / Grow anywhere (header menu, mobile menu, homepage pillar cards, homepage outcome shortcuts) lands on the AI Tools page with that workflow tab already selected and the tool grid filtered accordingly.

## Changes

1. **`src/routes/ai-tools.tsx`**
   - Add `validateSearch` to the route accepting an optional `pillar` string; keep it optional so existing plain `/ai-tools` links (tutorials page, footer, breadcrumbs) keep working unchanged.
   - Initialize the `pillar` filter state from the URL search value, and sync state when the URL changes (e.g. user clicks a different pillar link while already on the page).
   - When the user clicks a different pillar tab on the page, update the URL search too, so the back button and shared links behave sensibly. No other filter logic changes.

2. **`src/components/site/Header.tsx`**
   - Desktop "Explore {pillar}" links in the AI Tools dropdown: add `search={{ pillar }}`.
   - Mobile menu "{pillar} tools" links: add `search={{ pillar }}`.

3. **`src/components/site/HomeEcosystem.tsx`**
   - "Explore {pillar}" ButtonLink on each pillar card: add `search={{ pillar }}`.

4. **Homepage outcome shortcuts** (`src/routes/index.tsx`) — only if any of them link to `/ai-tools` with an intended pillar; audit and wire the same `search` param. Otherwise leave unchanged.

## What stays the same
- No URL/slug changes, no sitemap changes, no SEO metadata changes (the page keeps one canonical `/ai-tools`; `?pillar=` variants are just client-side filters).
- No tutorial files touched.
- "All" remains the default when no `pillar` param is present.

## Verification
- Click each pillar link from the header dropdown, mobile menu, and homepage cards; confirm the matching tab is active and the grid/filtered count matches that pillar.
- Confirm plain `/ai-tools` (from breadcrumbs/footer/tutorials page) still lands on "All".
- Typecheck/build clean.
