# Differentiate Synced vs Daily-Writer Articles in the CMS

## Goal
On `/admin/articles`, make it immediately obvious whether each article came from the BabyLoveGrowth sync or the daily AI blog writer.

## Current state
- `syndicated_articles.external_id` already distinguishes sources:
  - BabyLoveGrowth: numeric string, e.g. `"12345"`
  - Daily writer: `"daily:{tool-slug}"`
- The admin page (`src/routes/admin.articles.tsx`) fetches articles via `allSyndicatedArticlesQuery` but does not select or render `external_id`.
- `src/lib/articles.ts` defines the `SyndicatedArticle` interface and the column list used by the query.

## Changes

### 1. Expose `external_id` in the article query
- Add `external_id: string | null` to the `SyndicatedArticle` interface in `src/lib/articles.ts`.
- Add `external_id` to the `COLUMNS` string so the admin query returns it.

### 2. Add a source helper
- In `src/lib/articles.ts`, add `articleSource(article)`:
  - Returns `"Daily Writer"` when `external_id` starts with `daily:`.
  - Returns `"BabyLoveGrowth"` otherwise.

### 3. Render source badges on the admin list
- In `src/routes/admin.articles.tsx`, import `articleSource`.
- Next to each article title, show a small badge with the source label.
- Use distinct styling for the two sources (e.g., muted badge for BabyLoveGrowth, accent badge for Daily Writer).

### 4. Add a source filter
- Add a `<select>` filter above the list with options: All, BabyLoveGrowth, Daily Writer.
- Apply it alongside the existing title/slug search.

### 5. Update page copy
- Change the subheading from "Articles pulled in automatically and published on the blog." to something like "Articles pulled from BabyLoveGrowth or written by the daily AI blogger."

## Out of scope
- No database schema changes required; `external_id` already exists.
- No changes to the public blog or article rendering.

## Verification
- Typecheck and build should pass.
- The admin articles list should show a source badge on every row and allow filtering by source.
