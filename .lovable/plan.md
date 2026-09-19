# Homepage: de-duplicate the "one workspace" message

## Goal
Keep both the flagship carousel and the workspace section, but give each homepage section one unique job so "one workspace" stops appearing five times. No layout removal — this is a copy and structure refinement.

## Current state
- Hero, flagship heading ("Eight flagship tools, one workspace"), workspace section ("Why one workspace"), comparison ("One subscription. One workspace.") and final CTA all repeat the same claim.
- The workspace section (src/routes/index.tsx, "Why one workspace") shows 6 benefit chips + 6 feature cards linking to /features/* — pages already covered by the tools rail above it.
- The new AI models strip overlaps the "Multiple AI models" benefit chip.

## Changes (src/routes/index.tsx only, plus styles if needed)
1. **Workspace section → "How it works" flow.** Replace the "Why one workspace" heading and intro with a 3-step flow: "1. Pick a tool — 2. Describe the work — 3. Publish or automate", each with one sentence. Keeps the section's visual weight but answers "how" instead of re-arguing "why".
2. **Keep the 6 benefit chips**, but retitle the strip intro so it reads as evidence under the steps ("Everything stays connected"), not a repeat pitch.
3. **Trim the feature cards from 6 to 3** (the strongest three), or remove the grid entirely if the steps + chips carry the section — decided during implementation by which looks less empty.
4. **Copy pass on the repeated phrase:** flagship heading becomes "Eight flagship tools" (drop ", one workspace" there); comparison and final CTA keep their versions since that's where the price/commitment argument belongs. "One workspace" then appears exactly twice with purpose (money + closing).

## Not changing
- Flagship carousel, secondary rail, AI models strip, trust strip, all routes, CMS settings, sitemap.
- No tutorial content.

## Verification
- Build OK; Playwright desktop + mobile screenshots of the reworked section; reduced-motion check; confirm phrase "one workspace" appears at most twice in rendered homepage copy.
