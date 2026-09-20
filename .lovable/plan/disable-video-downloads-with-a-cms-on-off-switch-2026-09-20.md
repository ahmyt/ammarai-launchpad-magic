# Disable video downloads, with a CMS on/off switch

## What this is
The "Download" option in your screenshot comes from the browser's built-in video player menu (the ⋮ button on every video). Browsers show it by default; the site can suppress it with the video player's `controlsList="nodownload"` attribute.

## What will change
- Add a new switch in **Site settings** (the CMS settings page): "Allow visitors to download videos".
- Default: **off** — the Download option disappears from the video menu on:
  - the homepage video library cards (`src/routes/index.tsx`), and
  - every tool page's sample videos, including input/source videos (`src/components/site/AnimatedExample.tsx`).
- Turn the switch on in the CMS to restore the browser's Download option everywhere.

## Technical details
- `src/data/types.ts`: add optional `allowVideoDownload?: boolean` to `Page`.
- `src/data/pages.ts`: set `allowVideoDownload: false` on the settings record (default off).
- `src/lib/cms-fields.ts`: add the boolean field to `pageSettingsFields` so it appears in Site settings.
- `src/routes/index.tsx` and `src/components/site/AnimatedExample.tsx`: read the setting and apply `controlsList="nodownload"` to each `<video>` when disabled; omit it when enabled.
- Note: this removes the menu option; it cannot stop a determined user from saving a video file their browser has already loaded — true for any website.

## Unchanged
- No tutorial content, routes, tool data, or video files touched.
- Playback, posters, and all other video controls stay exactly as they are.
- After approval, verify on desktop and mobile (menu no longer shows Download), confirm the CMS toggle works both ways, and check the build stays clean. A new Plesk upload package will be needed for production.
