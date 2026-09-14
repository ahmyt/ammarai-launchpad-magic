# Match the daily-writer table of contents to the reference

## What will change
- Restyle the generated daily-writer table of contents as a sharp outlined editorial panel.
- Add the compact uppercase heading and leading zero numbers shown in the screenshot.
- Keep long section titles readable on mobile and preserve all existing jump links.
- Limit the change to daily-writer article presentation; article content and publishing logic remain unchanged.

## Verification
- Check a generated article at mobile and desktop widths for wrapping, spacing, and horizontal overflow.
- Confirm every contents link still targets the correct section and the project builds successfully.

## Technical details
- Update the daily-writer HTML output to use an ordered list for semantic numbering.
- Add scoped `.article-toc` styles using the existing AmmarAI design tokens.
