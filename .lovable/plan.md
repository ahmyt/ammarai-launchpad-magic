# AmmarAI Homepage — Sophisticated Light Redesign

## Goal
Rebuild the homepage into a distinctive, premium light AI SaaS experience using the selected sophisticated direction and proven patterns from Linear, Vercel, Notion, Jasper, and Anthropic—without copying them or removing AmmarAI’s real content and functionality.

## Design direction
- Use a crisp white and cool-neutral canvas, near-black typography, and a controlled electric-violet accent.
- Replace the current mixed editorial styling with Instrument Sans for confident display typography and Inter for interface/body text.
- Make the experience architectural and product-led: precise borders, layered surfaces, strong contrast, generous whitespace, and purposeful dark moments.
- Avoid generic AI gradients, decorative blobs, excessive rounding, stock imagery, invented metrics, and fake product screens.

## Homepage rebuild
1. Create a commanding brand-first opening with the existing H1, keyword-rich description, free-plan reassurance, and both current actions.
2. Turn the real tool finder into the hero product proof, preserving keyword matching, starter prompts, flagship links, keyboard focus, and no-results handling.
3. Keep the approved company-logo strip immediately after the opening, refining its visual integration.
4. Recompose the eight real flagship tools into a varied, content-aware showcase rather than repetitive equal cards.
5. Give the real video samples stronger cinematic framing without autoplay.
6. Redesign category browsing, popular/recent tools, connected-workspace benefits, and feature links for faster scanning across 138 tools.
7. Preserve the CMS-managed comparison, genuine review system, use cases, guides, FAQ, and final conversion section while giving each a stronger visual rhythm.
8. Refine the homepage navigation and footer treatment without imposing the homepage design on unrelated pages.

## Technical details
- Add homepage-scoped semantic color, surface, shadow, and motion tokens in the global stylesheet.
- Load Instrument Sans in the document head; retain Inter for body and controls.
- Extract focused homepage presentation components if needed while preserving existing data sources, links, dialogs, CMS fields, JSON-LD, canonical URL, metadata, and the single H1.
- Remove obsolete homepage-only styling that is no longer used.
- Keep all existing media local, lazy/preloaded appropriately, and accessible.

## Verification
- Test at phone, tablet, desktop, and wide-desktop sizes.
- Verify navigation, tool search, prompt chips, links, videos, reviews, FAQ, dialogs, and keyboard focus.
- Confirm no clipping, overlaps, missing media, console/runtime errors, or build errors, and ensure reduced-motion behavior remains supported.
