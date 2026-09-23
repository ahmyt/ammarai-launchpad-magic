# Continue mobile speed improvements

## Goal
Reduce the code and startup work loaded before AmmarAI’s homepage becomes usable, while preserving its content, design, CMS settings, and SEO.

## Changes
- Keep the shared site-content query lightweight: tool summaries, features, and page/settings content only.
- Move full blog posts and use-case records into route-specific content modules so they load only on blog, use-case, tool-detail, sitemap, feed, and studio screens that need them.
- Replace the homepage’s imports of the full blog and use-case libraries with small generated homepage preview datasets.
- Remove the unnecessary named `Home` export that currently prevents optimal route splitting.
- Defer offer-campaign loading until the visitor has reached the configured delay, instead of requesting it immediately after startup.
- Preserve all CMS overrides and existing page content.

## Verification
- Compare the main browser bundle before and after.
- Check the homepage, blog, use cases, tool pages, sitemap, and studio screens.
- Test the homepage at 411px mobile width for layout, console, network, and runtime errors.
- Confirm the preview build is clean.

## Technical details
- Add dedicated query selectors/modules for lightweight shared content and full post/use-case content.
- Generate small homepage preview files from the existing source-of-truth datasets, similar to the current tool and tutorial indexes.
- Keep route loaders responsible for full records needed for metadata and server rendering.
