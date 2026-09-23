## Speed up ammarai.com on phones

I ran Google's mobile speed test (Lighthouse, the same engine PageSpeed uses) on the live homepage.

**Current mobile score: 38 / 100**
- First text appears at 6.0 s (target under 1.8 s)
- Main heading ("…YOU CREATE") finishes appearing at 7.9 s (target under 2.5 s)
- The page freezes for 1.05 s while its code starts up (target under 0.2 s)
- The layout doesn't jump around (score 0, which is perfect)

The server itself is fast (0.28 s). Almost all of the delay happens on the phone: the page waits for Google Fonts, then downloads and runs about 500 KB of code before the heading is shown.

### What I'll fix, most important first

1. **Fonts stop holding up the page.** The page loads three font families (Fraunces, Inter, Space Grotesk, 13 weights in total) from Google before it shows anything. I'll load only the weights the site actually uses and load them in a way that doesn't hold up the first paint. Text will show immediately in a matching fallback font, then switch over. Nothing will look different once the page has loaded.
2. **Less code on the homepage.** The whole 151-tool catalogue (235 KB) is downloaded on the first visit, even though the homepage shows only a few tools. I'll split it so the homepage loads only the tool data it needs, and move the rest into separate files that load only when needed.
3. **Lighter images.**
   - The logo is a 113 KB PNG. It will become a small WebP, about 10 KB.
   - The four video cover images (50–134 KB each) will become WebP, and phones will get smaller versions.
   - Images below the fold will load only when someone scrolls to them.
4. **Less startup work.** Delay the work that doesn't affect the first screen (carousels, offer checks, theme extras) until the page has appeared.

### How I'll check it

- Run the same mobile test on the new build and compare the score with 38.
- Check that the homepage, a tool page and the blog look the same on phone and desktop.
- Keep the homepage well under the 1 MB server limit.

You'll see the real score on ammarai.com after your next GitHub pull and restart. My goal is 75+ on mobile. The exact number will depend on what the test finds after these changes.

### Technical details
- `__root.tsx`: trim the Google Fonts URL to the weights actually used, preload the critical woff2 files, load the stylesheet without blocking rendering (media="print" swap plus a noscript fallback), and keep `display=swap`.
- Split `src/data/tools*.ts` so the homepage uses a small summary module (slug, name, summary, icon). Full records load in `$slug.tsx` and `/ai-tools`.
- Convert `ammarai-logo.png` and the `*.poster.jpg` files to WebP, with `srcset`/`sizes`, `loading="lazy"` and `decoding="async"` below the fold. The hero logo gets `fetchpriority="high"`.
- Start OfferProvider, the carousels and similar parts in an idle callback after hydration.
