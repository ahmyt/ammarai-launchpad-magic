# Add image-led tutorial steps and fix mobile tables

## Goal
Make every AmmarAI tool tutorial visual and step-by-step, while ensuring all tutorial tables remain readable on phones with clear rows, columns, and borders.

## Changes

### 1. Image-led steps for every tool tutorial
- Extend the tutorial content format so each numbered step can include an instructional image, descriptive alt text, and an optional caption.
- Revisit the public reference demo to capture the verified end-user workflows needed for the tutorials.
- Recreate those captures as clean AmmarAI-branded instructional images; do not reuse source branding, avatars, text, or screenshots directly.
- Show the image directly beneath its matching step, in sequence, so visitors can follow the complete workflow visually.
- Add image-led steps to the six existing tool tutorials and require them for every new tool tutorial.
- Keep Getting Started pages visual where useful, but apply the strict “image steps” requirement to tool tutorials.
- Exclude any screen, setting, or action that is not genuinely available in AmmarAI, plus all administration and setup screens.

### 2. Proper tutorial tables on mobile
- Give tutorial tables their own responsive styling instead of relying on article-only table rules.
- Add visible borders around the table and every header/data cell so rows and columns have clear partitions.
- Keep two-column settings tables within the phone width, allow long text to wrap, and prevent content from pushing the page sideways.
- Place wider tables in a contained horizontal scroller with touch scrolling and a stable minimum width.
- Use semantic table markup and preserve readable headers for accessibility.

### 3. Tutorial content completion
- Continue the verified tool groups already captured: image editing, video, avatars/personas, captions, voiceover, transcription, UGC, agents, Blogger Agent, Marketing Bot, and Creative Suite.
- Keep paywalled or unobserved workflows pending until their real steps can be verified.
- Maintain the existing top and bottom `Try [Tool] in AmmarAI →` actions and real AmmarAI links.

## Technical details
- Add optional step-media fields to the tutorial types and a reusable instructional figure renderer.
- Store optimized instructional images through the project asset flow, with stable dimensions to prevent layout movement.
- Add tutorial-specific figure, caption, table, cell-border, wrapping, and overflow rules using the existing Neo-Swiss design tokens.
- Do not embed the attached screenshot; it is a reference showing the mobile table defect.

## Verification
- Check every existing and newly written tool tutorial for at least one relevant image-led workflow sequence.
- Test tutorial pages at phone, tablet, and desktop widths, including the Article Wizard table shown in the report.
- Confirm no horizontal page overflow, clipped text, missing cell borders, broken images, empty alt text, dead links, or source-product branding.
- Validate tutorial search, contents links, previous/next links, CTAs, metadata, and structured data after the content update.