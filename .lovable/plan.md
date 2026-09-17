# Make homepage carousel autoplay only while it is on screen

## What changes

The homepage "More ways to create" carousel currently advances to the next tool every 5.2 seconds whenever the page is open, even after the visitor has scrolled past it. It will instead advance only while the carousel is actually visible in the window, and pause the moment it is scrolled out of sight.

## How it will behave

- Carousel on screen: auto-advances every 5.2 seconds, exactly as now.
- Scrolled above or below the carousel: auto-advance stops. No slides move.
- Scrolled back to the carousel: auto-advance resumes from the card that is showing.
- Existing pauses stay in place: hovering the carousel, focusing a card, dragging on touch, and the "reduce motion" system setting all still stop auto-advance.
- Manual controls are unaffected at all times — arrows, dots, swiping and "View All Tools" work whether or not autoplay is running.
- Nothing about the cards, copy, ordering, numbering, styling or links changes.

## Technical details

File: `src/components/site/SecondaryToolsCarousel.tsx` (only this file).

- Add an `inView` state backed by an `IntersectionObserver` attached to the showcase `<section>` via a ref, with `threshold: 0.35` so a substantial part of the block must be visible. The observer disconnects on unmount.
- Default `inView` to `true` when `IntersectionObserver` is unavailable, so behaviour degrades to today's autoplay rather than freezing.
- Gate the existing autoplay effect on `inView && !paused` (plus the current reduced-motion and slide-count guards) and add `inView` to its dependency list, so the interval is cleared when the carousel leaves the viewport and recreated when it returns.
- No data, routing, styling or backend changes; no other components touched.

## Verification

- Playwright at 1280x1800 and 411px: note the slide counter, confirm it advances while the carousel is visible; scroll well away and wait 12 seconds to confirm the counter is unchanged; scroll back and confirm it resumes.
- Confirm arrows and dots still move slides while the carousel is off screen.
- Confirm no horizontal overflow and no console errors, then check the build log reports a clean build.
