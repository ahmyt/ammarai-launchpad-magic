# Roadmap

## Magic AI feature build (approved plan)
- [x] Phase 1: Agent Builder, Phone Call Agents, AI CRM, Social Media Agent, Blogger Agent + "AI Agents" and "AI Sales & CRM" categories + animated scene samples
- [x] Phase 2: External chatbot rewrite (v3), AI Smart Inbox, AI Marketing Bot + animated scene samples
- [x] Phase 3: Image Pro, AI Image Editor, AI Product Photoshoot, AI Fashion Try-On, AI Creative Suite (image in/out samples)
- [x] Phase 4: Video Pro, Video Editor, Captions, Dubbing, UGC, YouTube publishing, Music Pro
- [x] Phase 5: Chat Pro (multi-model, memory, folders, web search), AI Personas & Skills, AI Command Search, /ai-models page, pricing/plan updates
- [x] Phase 6: 99 missing Custom Templates (Group 8)
- [x] Completed tools use matching media samples; keep this strict requirement for Phases 5–6


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
