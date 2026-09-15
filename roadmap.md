# Roadmap

## Blog commercial content strategy (audit delivered)
- [x] Audit all 29 existing articles, content map, gap analysis, prioritized roadmap (docs/blog-content-strategy.md)
- [x] Stored category + content type on articles, /blog filter navigation, Studio taxonomy controls
- [x] Writing cluster: Jasper/Writesonic/Copy.ai/Rytr alternatives + Best AI Writing Tools pillar

- [x] Retrained the daily writer against the Part 7 brief (topic queue, 20-article type rotation, tables, internal links, banned filler, stored category/format)
- [x] Match daily-writer tables of contents to the bordered, numbered editorial article style
- [ ] Verify the next automatic daily-writer post on ammarai.com after the latest Plesk deployment
- [ ] Video and Image pillars, then remaining clusters



## Magic AI feature build (approved plan)
- [x] Phase 1: Agent Builder, Phone Call Agents, AI CRM, Social Media Agent, Blogger Agent + "AI Agents" and "AI Sales & CRM" categories + animated scene samples
- [x] Phase 2: External chatbot rewrite (v3), AI Smart Inbox, AI Marketing Bot + animated scene samples
- [x] Phase 3: Image Pro, AI Image Editor, AI Product Photoshoot, AI Fashion Try-On, AI Creative Suite (image in/out samples)
- [x] Phase 4: Video Pro, Video Editor, Captions, Dubbing, UGC, YouTube publishing, Music Pro
- [x] Phase 5: Chat Pro (multi-model, memory, folders, web search), AI Personas & Skills, AI Command Search, /ai-models page, pricing/plan updates
- [x] Phase 6: 99 missing Custom Templates (Group 8)
- [x] Completed tools use matching media samples; keep this strict requirement for Phases 5–6
- [x] Phase 7: DM & Comment Agent + AI Deep Research pages added to AI Agents; all agent/CRM demos now show a connector rail flow (prompt → connectors → result) with abstract monochrome glyphs



## Done
- Resume Lovable Cloud backend (was paused -> login "failed to fetch"). Healthy.
- Sitemap + robots.txt now use https://ammarai.com (111 URLs, zero lovable.app refs; verified in served output).
- Decoupled self-hosted Google sign-in from the Lovable broker (native OAuth on ammarai.com; managed broker kept for preview).
- Full sweep: no remaining old-host URLs in production output (only intentional preview-host detection logic remains).
- Typecheck passes.

## User action needed
1. Redeploy latest build to Plesk for ammarai.com, then restart the Node.js app.
   Live site still serves the old build (robots.txt + sitemap.xml still show the old Lovable address).
2. After deploy: ask me to re-verify https://ammarai.com/robots.txt and /sitemap.xml.
3. Google sign-in on ammarai.com (one-time): create Google OAuth Client ID with the callback URL from
   Cloud > Auth Settings > Google; paste Client ID + Secret there; add https://ammarai.com/** to Redirect URLs.
   See SELF_HOSTING.md section 4. Email/password login already works.
4. Optional: submit https://ammarai.com/sitemap.xml in Google Search Console after redeploy.

## Follow-ups
- [x] Search: Phase 4 tools (video editor, captions, dubbing, UGC, YouTube publisher) now matched by plain-language searches
- [x] Footer: AI Video Editor added to the Create column
- [ ] Decide whether AI Video Pro and AI Text to Video should be merged or clearly differentiated

## AI Templates reorganization (done)
- [x] Dedicated "AI Templates" category with templateGroup sub-grouping (Blog, Ecommerce, Social, Website, Advertising, Business, Academic, Communications, Lifestyle, Writing) on /ai-tools
- [x] Removed 46 DaVinci-era generator pages (tools-writing/tools-marketing/tools-commerce-seo + ai-article-generator/ai-rewriter); 301 redirects in src/data/retired-tools.ts
- [x] Kept ai-plagiarism-detector as-is; ai-content-detector lives in AI Templates (Writing group)
- [x] Cross-links, search intent map, footer, keyword data updated; no DaVinci persona gallery added

## Homepage alignment (done)
- [x] Feature the actual seven flagship tools and align the section description with them
- [x] Expand the opening description with named flagship tools and supporting capabilities
- [x] Add a curated homepage library of existing Video Pro, Editor, UGC, and Avatar samples

- [x] Diagnose attached bounce: production is still sending through plesk-steve.zap.cloud / 185.223.31.164.

- [x] Automation runs without the private database key (token-checked database functions) so it can run on Plesk.
- [x] Rework daily writer scheduling: fixed 14:00 UTC daily run + run log table (approved plan)
- [x] Make daily run time editable in the Studio (sync_settings.run_time_utc)

## Homepage trust and reviews (approved)
- [x] Add approved-company scrolling logo strip
- [x] Add genuine public review submission and homepage review browser
- [x] Add Studio review moderation, import, and display controls
- [x] Verify access rules, interactions, and responsive layouts

## Cyber-luxe homepage redesign (approved)
- [x] Apply the selected dark premium visual system to the complete homepage
- [x] Upgrade the hero into a product-led tool discovery experience
- [x] Restyle the trust strip, flagship grid, media, reviews, and remaining sections
- [x] Verify interactions, media, accessibility, and responsive layouts

## Selective production homepage upgrade (approved)
- [x] Preserve the production light identity, headline, SEO copy, navigation, and all content sections
- [x] Bring the connected-workspace finder and flagship shortcuts into the production opening
- [x] Strengthen the shared workspace, flagship, video, category, trust, review, and value messaging
- [x] Verify search, navigation, videos, reviews, FAQ, metadata, and responsive layouts

## Premium editorial homepage refinement
- [x] Apply the selected premium light visual direction without changing homepage structure or content
- [x] Verify hero, interactions, and responsive layouts

## Sophisticated light homepage rebuild (approved)
- [x] Rebuild the opening and tool finder around the selected product-led direction
- [x] Recompose every homepage section with the new typography, surfaces, and spacing system
- [x] Refine homepage navigation, trust, videos, reviews, comparison, and conversion areas
- [x] Verify search, media, dialogs, FAQ, accessibility, and responsive layouts

## Premium Bold Light homepage refinement
- [x] Strengthen the existing Command Center with bolder typography, layered depth, and sharper controls
- [x] Refine homepage spacing, surfaces, and mobile hierarchy without changing content or functionality

## Neo-glass precision homepage refinement
- [x] Apply the selected neo-glass visual language without changing homepage content or behavior
- [x] Verify the refined homepage across desktop and mobile

## Major premium homepage upgrade
- [x] Recompose the full homepage with distinct section hierarchies and premium visual rhythm
- [x] Elevate the Command Center, flagship showcase, media, comparison, reviews, and conversion areas
- [x] Verify the complete experience across desktop and mobile

## Neo-Swiss Editorial homepage rebuild
- [x] Replace the current visual system with the selected bold editorial grid
- [x] Recompose the opening, Command Center, and every section with distinct hierarchy
- [x] Verify interactions, media, reviews, and responsive layouts

## Neo-Swiss premium refinement
- [x] Rebalance spacing, hierarchy, and depth while preserving the bold editorial direction
- [x] Refine section rhythm, surface hierarchy, interactions, and mobile composition
- [x] Verify desktop, mobile, search, media, reviews, FAQ, and reduced-motion behavior

## Neo-Swiss craft refinement
- [x] Tune proportions, alignment, and spacing without changing the visual direction
- [x] Refine Command Center, controls, typography, and restrained depth
- [x] Verify desktop, mobile, interactions, and build stability

## Neo-Swiss footer refinement
- [x] Bring the footer into the bold editorial system with stronger hierarchy and mobile balance
- [x] Verify desktop and mobile footer presentation

## Full-site Neo-Swiss redesign
- [x] Promote the homepage visual system into the shared site shell and components
- [x] Redesign public directories, detail pages, articles, forms, pricing, and authentication
- [x] Redesign the Studio shell, navigation, panels, controls, lists, and editors
- [x] Verify representative public and Studio pages across desktop and mobile
- [x] Keep every tool sample visible, with reliable video preview frames and playback controls
- [x] Keep the Studio header, navigation, cards, and footer within the mobile viewport

## Tutorial & documentation center (approved plan)
- [x] Verified source-to-AmmarAI mapping (docs/tutorials-map.md)
- [x] Tutorial infrastructure: /tutorials hub, /tutorials/$slug, search, sidebar, TOC, prev/next, breadcrumbs, CTAs
- [x] SEO: per-tutorial metadata, HowTo/BreadcrumbList schema, sitemap + llms.txt inclusion, Tutorials nav entry
- [x] Previous broad guide set and altered images superseded by the strict 2026-09-15 revision below
- [x] Add bordered, partitioned, mobile-safe tutorial tables
- [x] QA: link validation, branding scan, mobile/desktop checks

## Tutorial & documentation complete revision
- [x] Replace the previous overlap map with a strict reference-page-to-AmmarAI audit
- [x] Remove tutorials, cards, links, metadata, and images without a verified end-user overlap
- [x] Rebuild every retained tutorial to preserve the reference workflow order and coverage using AmmarAI terminology
- [x] Replace altered/annotated captures with exact reference images; exclude admin-only reference images
- [x] Re-audit navigation, search, breadcrumbs, related guides, previous/next links, CTAs, sitemap, and llms.txt
- [x] Validate image fidelity, alt text, metadata, mobile/desktop layouts, links, and forbidden/admin content

## Next verified tutorial tools
- [x] Add AI Image Pro with regular-user reference screenshots and AmmarAI logo replacement only
- [x] Add AI Video Pro with its regular-user reference screenshot and exclude the provider-key settings image
- [x] Add Viral Clips using the original full-resolution reference screenshots and exclude provider/setup screens
- [x] Add AI Influencer product-ad and presenter workflows using original full-resolution reference screenshots
