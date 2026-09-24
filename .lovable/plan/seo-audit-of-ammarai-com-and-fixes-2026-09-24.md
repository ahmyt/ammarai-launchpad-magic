# SEO audit of ammarai.com and fixes

## What the live scan found

Good (no work needed):
- All pages checked load fast (about 0.25 s) and return 200. Made-up pages return a real 404.
- http and www both redirect permanently to https://ammarai.com.
- robots.txt allows crawling and points to the right sitemap. The sitemap lists 294 pages, all on ammarai.com.
- Each page has one main heading, no images are missing alt text, and nothing is accidentally hidden from Google.
- Home, About, Tools, Pricing, Use cases, tool pages and tutorials all have canonical links and structured data.

Problems, most important first:
1. **Blog has no canonical links.** The blog list and every blog post are missing them, and the blog list has no structured data. That is the whole blog, which is your main source of search traffic.
2. **Feature pages have no canonical links.** For example /features/history-and-versions. Their descriptions are also short (about 108 characters).
3. **Short descriptions on blog posts and tutorials.** Some are 125 to 148 characters, below the 150 to 160 range. They were missed in the last pass, and daily posts keep adding more.
4. **No share image.** Most pages show no picture when shared on social media or in chat apps. Only one blog post has one.
5. **The 404 page uses the homepage title.** Google may read it as a copy of the homepage.
6. **Speed.** The page loads quickly from the server, but Google's phone speed score is about 58, as measured last time. The main code download is still 384 KB.

## Fixes

1. Add canonical links to the blog list, every blog post (including the daily auto-posts) and every feature page. Add structured data to the blog list: a collection page with a list of its posts.
2. Add Article structured data to blog posts that lack it. Include the author, the publish and update dates, and the cover image.
3. Rewrite the short blog, tutorial and feature descriptions so they fall between 150 and 160 characters. Keep tutorial wording faithful to the tutorials, which stay the source of truth. Make the daily writer produce descriptions that fit that range.
4. Use each blog post's cover image as its share image. Add one site-wide branded share image for the other pages.
5. Give the 404 page its own title ("Page not found | AmmarAI") and tell Google not to index it.
6. Optional: keep trimming the main code download to raise the phone speed score.

## Checks

- Re-scan the preview for canonical links, descriptions and structured data on a sample of blog, feature, tutorial and tool pages.
- The build is clean, and the changes go live after your next GitHub pull and app restart. Then I re-scan ammarai.com.

## Technical details

- Canonical and JSON-LD go in head() of blog.index.tsx, blog.$slug.tsx and features.$slug.tsx (absolute https://ammarai.com URLs).
- og:image in each leaf head() uses only absolute https URLs.
- The description length rule goes in the daily blog generator prompt (daily-blog.server.ts).
- The root notFoundComponent sets its own head with robots noindex.
