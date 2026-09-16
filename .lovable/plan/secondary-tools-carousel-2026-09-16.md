# Secondary tools carousel

## Goal
Add a premium homepage showcase for tools outside the eight flagship products, without changing any tool content, URLs, or the flagship section.

## Implementation
- Place the new section directly after the flagship tools grid.
- Build a smoothly auto-playing horizontal carousel from non-flagship tool records only, with no duplicated flagship entries.
- Show clean cards with each tool’s category, name, short existing description, and working link.
- Add previous/next arrow controls, position indicators, pause-on-interaction behavior, and a “View all tools” link.
- Match the current bold Neo-Swiss design, use semantic colors, and keep swipe/keyboard navigation accessible.
- Respect reduced-motion preferences by disabling automatic movement while keeping manual controls available.

## Verification
- Check desktop and the current 411px mobile view for card sizing, clipping, and smooth scrolling.
- Verify arrows, indicators, swipe/scroll, tool links, and “View all tools.”
- Confirm no build, runtime, console, or accessibility errors.
