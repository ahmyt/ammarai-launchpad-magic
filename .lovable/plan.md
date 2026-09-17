# CMS control for homepage logo color behavior

## What will change
- Add a **Fade scrolling logos until touched** switch to **Studio → Pages → Site settings**.
- Keep the setting enabled by default, so logos scroll in a muted/faded treatment and become fully colorful when hovered, focused, tapped, or touched.
- When the switch is disabled, keep every scrolling logo fully colorful while preserving the existing continuous scroll.
- Preserve the current white logo panels, logo sizing, spacing, alt text, and homepage layout.

## Technical notes
- Add the setting to the shared page content type, bundled Site settings defaults, and the existing CMS settings field list.
- Read the saved Site settings on the homepage and pass the value into the scrolling-logo component.
- Use one reusable stateful logo interaction so touch selection works on mobile; only the touched logo is emphasized until another logo is touched.
- Add scoped CSS for muted and colorful modes, including keyboard focus and reduced-motion compatibility.

## Verification
- Confirm the CMS switch saves and reloads.
- Check enabled and disabled modes on desktop and mobile.
- Confirm scrolling, hover/touch color behavior, alt text, layout, and build health.
- Tutorial files and content remain unchanged.
