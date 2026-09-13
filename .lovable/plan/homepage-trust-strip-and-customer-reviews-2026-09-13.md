# Homepage trust strip and customer reviews

## Goal
Add two polished, responsive trust elements to the homepage:

1. A continuously scrolling strip of the seven approved company logos.
2. A genuine customer-review widget backed by Studio moderation, importing, and homepage display controls.

No fabricated or automatically “verified” reviews will be published. The initial widget will use approved imported reviews; public submissions remain pending until reviewed.

## Homepage experience

### Approved-company logo strip
- Place the trust strip immediately below the opening section, where it can reinforce the primary offer before the flagship tools.
- Use the heading **“Trusted by growing companies”**.
- Include all seven supplied logos with meaningful alt text:
  - ATNapps
  - TaxiVA Call 8802
  - eSIMnow
  - ATN Technology
  - MyMobile Unlocking
  - Ethio Game
  - AymarPOS
- Normalize each supplied image for consistent visual height and spacing without stretching or changing the logo artwork.
- Build a seamless, slow marquee with duplicated visual tracks, edge masking, and pause-on-hover/focus behavior.
- Make the duplicate track invisible to screen readers and replace animation with a static, wrapping logo row when reduced motion is requested.
- Store optimized local copies with the site media so the strip also works on the self-hosted Plesk production server.

### Review summary and browser
- Add a compact review summary showing the genuine approved-review average, total count, five-star graphic, verified-review indicator, and rating distribution.
- Make the review count open an accessible review browser rather than navigating away.
- Show approved reviews with reviewer name, title, review text, rating, review date, and a verified badge only when an administrator has genuinely verified the review.
- Include pagination, star filtering, newest/highest ordering, keyboard support, focus management, and a polished mobile presentation.
- Add a **“Write a review”** action that opens a public submission form.
- Show a clear empty state until genuine reviews are imported or approved; never invent a rating or count.

## Genuine review workflow

### Public submissions
- Collect reviewer name, private email, rating, title, review, review date, and consent.
- Validate input, add a hidden anti-bot field, and store submissions as pending.
- Keep submitter emails private and never expose them in public review queries.
- Confirm receipt without publishing immediately.

### Studio management
- Add a **Reviews** area to the existing Studio navigation, restricted to admins.
- Provide pending, approved, and rejected views with search, rating/date filters, pagination, and counts.
- Allow admins to review the private submission details, edit public wording only when necessary, approve/reject, feature/unfeature, set display order, and mark a review verified.
- Require a deliberate admin action for the verified badge; it is never inferred from a star rating or submission alone.
- Allow manual entry for genuine reviews collected elsewhere.

### Import existing reviews
- Add CSV import with a downloadable column template, validation preview, row-level errors, and duplicate protection.
- Support reviewer name, title, review text, rating, review date, source, source URL/reference, approval status, featured status, and verified status.
- Import only the genuine review file supplied by the user; no synthetic seed reviews will be created.

### Homepage controls
- Add Studio controls for:
  - number of review cards shown initially
  - minimum star rating
  - start and end review dates
  - newest, oldest, highest-rated, or manual ordering
  - featured-first behavior
  - which individual reviews are featured
- Save these settings centrally so the public widget and Studio always agree.

## Data and access rules
- Create a private `review_submissions` table for contact details and moderation data.
- Create a public-facing `customer_reviews` table containing only safe display fields.
- Create a single-row `review_settings` table for homepage selection controls.
- Grant anonymous visitors only pending submission access and read access to approved public reviews/settings.
- Grant authenticated admins management access through existing server-validated admin roles; editors and ordinary users cannot moderate or verify reviews.
- Add indexes for approval status, rating, date, featured ordering, and duplicate detection.
- Add timestamps and validation for ratings from 1–5 and valid review dates.

## Technical implementation
- Add focused components for the logo marquee, rating summary, review cards/browser, and submission form; reuse the current editorial tokens, buttons, containers, and modal primitives.
- Load public approved reviews and aggregate totals through safe public queries; never return submission emails.
- Add protected review-management functions using the existing authenticated admin pattern.
- Include genuine aggregate rating structured data only when at least one approved review exists and the displayed totals match the public data.
- Keep the current homepage metadata and single H1 unchanged.

## Verification
- Verify anonymous submission, pending moderation, approval/rejection, verified-state handling, manual entry, CSV preview/import, duplicate rejection, and all homepage filters.
- Verify that only approved reviews affect the displayed average and count.
- Verify anonymous visitors cannot read private emails or manage reviews, while admins can use every Studio control.
- Check the marquee, review widget, modal, and form at mobile and desktop widths, including keyboard use and reduced-motion mode.
- Confirm all seven images load from local production-safe paths, the page has no overlap or text clipping, and the project build is clean.

## Delivery note
The review system and importer can be completed immediately. Populating it depends on receiving the genuine review export/file; until then, the review widget will use an honest empty state rather than fabricated testimonials.
