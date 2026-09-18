# Fix AI Models tables on mobile

## Goal
Keep each AI Models table readable on phones, with visible header labels and smooth horizontal scrolling.

## Changes
- Replace the clipped table wrapper with a dedicated horizontal scroll container.
- Give the table a stable mobile minimum width so both columns remain readable.
- Correct the header text color so the labels remain visible against the dark header in both themes.
- Preserve the current table content and desktop appearance.

## Verification
- Check the AI Models page at phone and desktop widths.
- Confirm horizontal touch scrolling, visible headers, no page-level overflow, and a clean build.
