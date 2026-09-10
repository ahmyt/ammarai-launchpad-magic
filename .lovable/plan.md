# Add an "AI Templates" category and retire the old DaVinci-era pages

## What changes for visitors

The library currently mixes three things: flagship workspaces (Image Pro, Video Pro,
Chat Pro, Agents, CRM, Inbox), the 99 new template pages, and a set of older
single-purpose generator pages carried over from the previous platform.

After this change:

- A new **AI Templates** filter holds the 99 template pages, grouped by topic
  (Blog, Social, Ecommerce, Website, Advertising, Business, Academic,
  Communications, Career, Lifestyle, Legal, Writing) so a long list stays browsable.
- The functional categories keep only the flagship workspaces.
- The older carried-over generator pages are removed from the site.
- No DaVinci-style persona gallery is added; the persona page stays as it is.

## Pages removed

These older generator pages go away entirely:

- Writing: Blog Generator, Blog Title, Blog Intro, Blog Conclusion, Content
  Rewriter, Paragraph, Summary, Story, Essay, Grammar Checker, Text Extender,
  Tone Changer, Article Generator, Rewriter, Plagiarism Detector
- Email: Email, Cold Email, Follow-Up Email, Subject Line, Newsletter
- Business: Press Release, Company Bio, Business Name
- Ads: Ad Generator, Facebook Ad, Google Ads, LinkedIn Ad
- Social: Instagram Caption, Instagram Hashtag, Social Media Post, YouTube
  Description, YouTube Title, YouTube Tag
- Scripts: TikTok Script, Video Script
- Ecommerce: Product Description, Amazon Product Description, Amazon Product
  Title, Product Benefits, Product Features, Product Comparison
- SEO writing: SEO Content Generator, Meta Description, FAQ Generator, SEO Blog
  Generator, SEO Content Rewriter, Keyword-Based Rewriter

Each removed address redirects permanently to the closest surviving template page,
or to the tool library when there is no close match, so existing links and search
results still land somewhere useful instead of an error page.

## Pages that stay

All flagship workspaces stay in their functional categories: AI Writer, AI Chat Pro,
AI Personas & Skills, AI Command Search, AI Chat Bots, External Chatbot Builder,
AI Image Pro, AI Image Editor, AI Photoshoot, AI Virtual Try-On, AI Creative Suite,
AI Video Pro, AI Video Editor, AI Captions, AI Dubbing, AI UGC, AI YouTube Publisher,
AI Avatar Video, AI Image to Video, AI URL to Video, AI Voiceover, Text to Speech,
Speech to Text, Transcription, Sound Studio, AI Music Pro, AI Vision,
AI Document Analyzer, AI Code Generator, AI Presentation Maker, AI SEO Analyzer,
AI Agent Builder, AI Phone Agent, AI CRM, AI Social Media Agent, AI Blogger Agent,
AI Smart Inbox, AI Marketing Bot.

The 99 template pages all move under AI Templates.

## Technical notes

- Add `"AI Templates"` to `ToolCategory` in `src/data/types.ts`; place it in
  `categoryOrder` in `src/data/tools.ts` after the flagship categories.
- Add optional `templateGroup?: string` to `Tool`; set it on every entry in the ten
  `tools-templates-*.ts` files and switch their `category` to `"AI Templates"`.
- Delete the legacy entries from `tools-writing.ts`, `tools-marketing.ts`,
  `tools-commerce-seo.ts`, and the plagiarism entry in `tools-platform.ts`;
  remove the now-empty files from the `tools.ts` imports.
- Sweep every `related: [...]` array, `intentMap` slug list, `src/data/features.ts`,
  `src/data/use-cases.ts`, `src/data/posts.ts`, footer links and CMS overrides for
  references to removed slugs and repoint them at surviving pages. A build-time
  check that every related slug resolves must pass.
- Add a redirect map for removed slugs handled in `src/routes/$slug.tsx`, mirroring
  the existing `ai-text-to-video` 301 pattern; unmapped ones fall back to `/ai-tools`.
- Update `src/lib/sitemap.ts` output and `llms.txt` so removed pages drop out.
- In `src/routes/ai-tools.tsx`, when the AI Templates filter is active, render results
  grouped by `templateGroup` with a heading per group; other filters keep the flat grid.
- Categories left empty (for example AI Email) disappear from the filter bar via
  `usedCategories`; adjust the page's intro copy and tool count wording.
- Update `roadmap.md` with this reorganisation and cleanup task.

## Verification

- Typecheck and build pass, with no dangling related slugs.
- `/ai-tools` shows the AI Templates filter with grouped sub-sections and correct counts.
- A removed address (for example `/ai-cold-email-generator`) redirects rather than 404s.
- A surviving flagship page (`/ai-image-generator`) and a template page still load.
