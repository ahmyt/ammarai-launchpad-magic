# Keep reviewer emails out of the published site

## Short answer to the question

No. When an admin approves a review, the reviewer's email address is **not** published anywhere, so Google cannot crawl it.

What was checked:

- The published reviews have no email field at all — the approval step copies only name, title, text, rating, date, verified flag and source. The email column lives in a separate private table.
- The private table that holds emails allows *submitting only*. No browser, and no crawler, can read rows back from it.
- The homepage HTML that search engines receive contains no review text at all (reviews are added by the browser after load) and the only addresses in it are the three public company ones: `support@`, `teams@`, `partners@`.
- Nothing in the sitemap, feeds or public endpoints exposes review records.

**The one real gap:** if a reviewer types their email address *inside the review text* (for example "email me at john@x.com"), that sentence is published word for word on approval and a crawler can read it. Nothing catches that today. Right now zero published reviews and zero pending submissions contain an email address, so nothing has leaked — this plan makes sure nothing ever can.

## What to build

1. **Automatic removal at approval.** Before a review goes live, any email address inside the reviewer name, review title or review text is replaced with `[email removed]`. This happens in the single server-side approval routine, so it applies to every review no matter who approves it or how.
2. **Existing published reviews cleaned.** The same removal runs once over the reviews already live, so the rule holds even if something was approved before this change.
3. **A quiet note on the review form.** Under the email box, one line: "Your email is never published. Please don't include it in your review." Reviewers who do still get their review approved — just with the address masked.
4. **A heads-up for admins.** In the moderation screen, a pending review that contains an email address shows a small badge: "Contains an email — it will be removed on approval."
5. **Nothing is destroyed for you.** The private copy keeps the reviewer's real email and their original wording, so you can still reply to them.

```text
Reviewer submits            Admin approves              Public site
--------------              --------------              -----------
email  -> private table     approval routine            name/title/text
text   -> pending queue  -> masks any email found  ->   no email present
name   -> pending queue                                  (crawlable, safe)
```

## Technical details

**1. New masking function** (`public.mask_emails(text) returns text`)
- `regexp_replace(_text, '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}', '[email removed]', 'gi')`
- `immutable`, `security invoker`, `search_path` pinned to `public`. Returns input unchanged when there is no match.

**2. Replace `public.admin_moderate_review`** (existing `SECURITY DEFINER` admin-only function — same signature, same admin check)
- In the approved branch, the `INSERT INTO public.customer_reviews (...) VALUES (...)` applies `public.mask_emails()` to `reviewer_name`, `review_title` and `review_text`; the `ON CONFLICT DO UPDATE` clause carries the same three masked values.
- The `UPDATE public.customer_reviews SET status = 'rejected'` branch and the returned review id are unchanged.
- `review_submissions` is still updated only for status, so the reviewer's real email and original text remain available to admins.

**3. One-off backfill in the same migration**
- `UPDATE public.customer_reviews SET reviewer_name = mask_emails(reviewer_name), review_title = mask_emails(review_title), review_text = mask_emails(review_text)` guarded by a `WHERE ... ~* 'email regex'` so rows without a match are untouched. Expected to affect 0 rows today.
- GRANTs, RLS and policies are left exactly as they are — this change adds no new table and no new access path.

**4. Form copy** — in `src/components/site/CustomerReviews.tsx`, a short muted line below the email input. No validation change: submissions still go through even when an email appears in the text.

**5. Admin badge** — in `src/routes/admin.reviews.tsx`, a small pill next to a pending submission whose name, title or text matches the email pattern, using a client-side regex constant shared from `src/lib/reviews.ts`. No query change.

## Verification

- SQL probe: submit a review whose text contains `test@leak-me.com`, approve it through the moderation screen, then confirm the published row reads `[email removed]`, that the pending record still holds the original text, and that a full scan of `customer_reviews` for the email pattern returns 0 rows. Delete the test rows afterwards.
- `bunx tsgo --noEmit` clean; `/tmp/observability/build-errors.log` shows build OK.
- Playwright on the homepage at 1280x1800 and 390x1800: reviews render, no `@` address appears in any review card, no console errors, no horizontal overflow.
- Confirm the three company addresses and all existing structured data are unaffected.

## Notes

- Reviews stay visible to Google exactly as they are today — only the address text changes.
- Live effect requires your next Plesk deployment; the database change itself applies as soon as it runs.
