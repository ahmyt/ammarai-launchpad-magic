# Fix the blog post count on the Studio overview

## What's happening

The blog lists 23 posts: 10 hand-written posts plus 13 visible articles that came from the
automatic sync and the daily writer. The overview card only counts the 10 hand-written ones,
so it shows "10" while the public blog shows 23.

## The fix

Make the "Blog posts" card on the overview count everything that is actually published:

- Total = hand-written posts + visible synced/daily-writer articles (23 today).
- The small line underneath keeps showing how many were edited or added, and adds the number
  of hidden articles so the two numbers reconcile (2 hidden today).
- Other category cards stay exactly as they are.

## Technical notes

- `src/routes/admin.index.tsx` computes each card from `staticItems(kind)` and the `content`
  rows only. For `kind === "post"`, also pull `allSyndicatedArticlesQuery` from
  `src/lib/articles.ts` (admin-only, already used by `/admin/articles`) and add the
  non-hidden articles to the count, excluding any whose slug matches a static post — the same
  de-duplication `src/routes/blog.index.tsx` applies.
- Hidden articles feed the "hidden" figure in the card subtitle.
- No database or schema change needed.
