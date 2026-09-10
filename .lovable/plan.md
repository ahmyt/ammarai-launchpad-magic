# Group all template-style pages under one "AI Templates" category

## What changes for visitors

Today the tool library mixes two very different things: a handful of flagship
workspaces (Image Pro, Video Pro, Chat Pro, Agents, CRM, Inbox) and a very large
number of single-purpose writing generators (Tweet Generator, Product Description
Generator, Cold Email Generator, and so on). With 184 pages, the category filters
have become crowded and it is hard to tell the big tools apart from the quick
templates.

After this change:

- A new **AI Templates** filter holds every single-purpose generator page.
- The functional categories (AI Agents, AI Chat, AI Image, AI Video, AI Voice,
  AI Audio, AI Transcription, AI Vision, AI Documents, AI Code, AI Sales & CRM,
  AI SEO, AI Productivity) keep only the flagship workspaces.
- Inside the AI Templates view, templates are grouped by topic (Blog, Social,
  Ecommerce, Website, Advertising, Business, Academic, Communications, Career,
  Lifestyle, Legal, Writing) so a list of ~140 items stays browsable.
- Every page keeps its current web address, so nothing already shared or indexed
  breaks.

## Which pages move

Moving into AI Templates:

1. The 99 pages added in the last phase (blog, ecommerce, social, website,
   advertising, business, academic, communications, lifestyle, writer groups).
2. The template-style generators that already existed before the MagicAI work,
   because they are the same kind of page:
   - Writing generators: Blog Generator, Blog Title, Blog Intro, Blog Conclusion,
     Content Rewriter, Paragraph, Summary, Story, Essay, Grammar Checker,
     Text Extender, Tone Changer, Article Generator, Rewriter, Plagiarism Detector
   - Email generators: Email, Cold Email, Follow-Up Email, Subject Line, Newsletter
   - Business generators: Press Release, Company Bio, Business Name
   - Marketing/ads: Ad Generator, Facebook Ad, Google Ads, LinkedIn Ad
   - Social: Instagram Caption, Instagram Hashtag, Social Media Post,
     YouTube Description, YouTube Title, YouTube Tag
   - Scripts: TikTok Script, Video Script
   - Ecommerce: Product Description, Amazon Product Description, Amazon Product
     Title, Product Benefits, Product Features, Product Comparison
   - SEO writing: SEO Content Generator, Meta Description, FAQ Generator,
     SEO Blog Generator, SEO Content Rewriter, Keyword-Based Rewriter

Staying as flagship tools (not templates): AI Writer, AI Chat Pro, AI Personas &
Skills, AI Command Search, AI Chat Bots, External Chatbot Builder, AI Image Pro,
AI Image Editor, AI Photoshoot, AI Virtual Try-On, AI Creative Suite, AI Video Pro,
AI Video Editor, AI Captions, AI Dubbing, AI UGC, AI YouTube Publisher,
AI Avatar Video, AI Image to Video, AI URL to Video, AI Voiceover, Text to Speech,
Speech to Text, Transcription, Sound Studio, AI Music Pro, AI Vision,
AI Document Analyzer, AI Code Generator, AI Presentation Maker, AI SEO Analyzer,
AI Agent Builder, AI Phone Agent, AI CRM, AI Social Media Agent, AI Blogger Agent,
AI Smart Inbox, AI Marketing Bot.

## The persona screenshots

The screenshots show a persona picker (Career Counselor, Chef, Life Coach, Legal
Advisor, Financial Analyst, and so on). Those are chat personalities, not separate
generator pages. Rather than create dozens of thin pages, the persona library gets
presented inside the existing **AI Personas & Skills** page as a browsable gallery
of named personas with role labels, matching what the screenshots show. That page
stays in AI Chat. If any current tool page duplicates a persona role, it moves into
AI Templates with everything else.

## Technical notes

- Add `"AI Templates"` to `ToolCategory` in `src/data/types.ts` and place it in
  `categoryOrder` in `src/data/tools.ts`, after the flagship categories.
- Add an optional `templateGroup?: string` field to `Tool` so template pages can
  carry a topic label (Blog, Social, Ecommerce, …) used for sub-grouping.
- Update `category` to `"AI Templates"` and set `templateGroup` on every tool in
  the ten `tools-templates-*.ts` files plus the legacy generator entries listed
  above in `tools-writing.ts`, `tools-marketing.ts`, `tools-commerce-seo.ts`,
  and the plagiarism entry in `tools-platform.ts`.
- Categories left empty after the move (for example AI Email) drop out of the
  filter bar automatically via `usedCategories`.
- In `src/routes/ai-tools.tsx`, when the AI Templates filter is active, render the
  results grouped by `templateGroup` with a heading per group instead of one flat
  grid; all other filters keep the current flat grid.
- Add template-oriented keywords to the `intentMap` entries so searches like
  "template", "generator", "quick copy" surface the library.
- No slug changes, no redirects, no CMS field changes; `src/data/tool-demos.ts`
  keys stay untouched.
- Expand the persona gallery inside `tools-chat.ts` (`ai-personas`) with the
  persona roles shown in the screenshots.
- Update `roadmap.md` with this reorganisation task.

## Verification

- Typecheck and build pass.
- `/ai-tools` shows an AI Templates filter, grouped sub-sections, and correct counts.
- Spot-check a moved page (for example `/ai-cold-email-generator`) and a flagship
  page (`/ai-image-generator`) still load.
