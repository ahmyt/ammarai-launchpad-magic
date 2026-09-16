# Tools page reconciled against the Marketplace

I signed in and read the full admin Marketplace: **117 entries**. The public Tools page currently has **140 cards** (41 tools + 99 writer templates). Most of the gap is naming and placement, not missing pages — but ten real tools are genuinely absent.

Scope agreed: platform/admin/billing add-ons excluded, small add-ons listed on their parent tool page, AI models stay on the AI Models page. Every Marketplace entry is treated as live and available — "Not purchased" and "Not installed" are ignored, and no "coming soon" labels are used anywhere. Tutorials: untouched.

## What the audit found

**Missing tools (10) — to be added**

| Tool | Category | What it does (per Marketplace) |
| --- | --- | --- |
| UGC Factory | AI Video | UGC videos with virtual actors, digital twins, voiceover and lip-sync |
| Viral Clips | AI Video | Turns long videos into TikToks, Reels and Shorts |
| AI Video Enhancer | AI Video | Upscales and restores video frame by frame |
| AI Council Mode | AI Chat | Runs several models in parallel and merges them into one answer, with side-by-side comparison |
| AI Social Media Publisher | AI Social Media | Preview, schedule and publish posts, including LinkedIn and X |
| Content Manager | AI Productivity | One library for uploaded images, documents and videos |
| AI ReWriter | AI Writing | Rewrites existing text in a chosen tone and length |
| Brand Voice | AI Writing | Saves a brand's tone so every tool writes in it |
| AI Editor | AI Writing | Long-form document editor with AI assistance |
| AI Image Assistant | AI Image | Guided prompt help and refinement inside image generation |

**Wrong category (6) — real tools currently filed under "AI Templates"**
Article Wizard → AI Writing; Web Page Chat → AI Chat; Chat With Image → AI Vision; Realtime Voice Chat → AI Voice; Generate From RSS Feed → AI Writing; AI Voice Isolator → AI Audio.

**Names to correct (2)**
"AI Fashion Try-On" → **AI Fashion Studio**; "AI Chat Bots" → **AI Chatbot Training** (it is the chatbot training tool, not a second chatbot builder). Slugs and URLs stay the same so nothing breaks.

**Descriptions to correct** where a page states something the Marketplace does not: AI Video Pro, AI Video Editor, AI Product Photoshoot, AI Creative Suite, AI UGC Creator, AI URL to Video, AI Captions, AI Dubbing, AI Presentation Maker, AI Phone Call Agent, AI CRM, AI Smart Inbox, AI Agent Builder, AI Blogger Agent, AI Music Pro, AI Image Pro, AI Document Analyzer.

**Capabilities added to existing pages** (not new cards, per your choice):
AI Chat Pro — Canvas documents, Memory, Folders, Temporary Chat, Highlight to Ask, Smart Highlight, Smart Image Display, Chat with Documents, Chat Share, and the Gmail, Google Calendar, Google Drive, Notion and Outlook connectors.
External Chatbot Builder — Sales Agent, Booking Agent, Voice Chat, Human handover, Feedback, Customer Segmentation, and Instagram, WhatsApp, Telegram and Messenger channels.
AI Agent Builder — Gmail, Outlook, Slack, WhatsApp, CRM, Marketing, Social Media and External Chatbot connectors.
AI Personas & Skills — the Skills library and /skill-creator.

**Duplicates:** none on the site. The Marketplace lists "AI Photoshoot" and "AI Product Photography" separately; both map to the single existing Product Photoshoot page, which is correct.

## Tool count

Adding ten tools takes the catalogue from 140 to **150**. The "140 tools" wording appears across the homepage, Features, AI Tools, pricing and blog copy — all of it gets updated to 150 so the claim stays true.

## Technical notes

- New tool records go into the existing `src/data/tools-*.ts` files using the current `Tool` shape (slug, name, category, summary, lede, canDo, how, capabilities, related). No new components, no styling changes; cards, filters, search and the `$slug.tsx` detail page already handle any tool in the array.
- Category re-assignment is a one-field change per record; `categoryOrder` already contains every target category, so no new filter chips are needed.
- Each new tool gets its own route via the existing dynamic route, plus canonical, og:url and JSON-LD from the current head convention, and is added to the sitemap automatically.
- Icons come from the existing icon set used by sibling tools in the same category.
- Verification: `bunx tsgo --noEmit`, a build check, then a Playwright pass at 1440 and 390 px confirming every new tool page returns 200, appears under the right filter, is findable by search, has one H1, no overflow and no console errors.
- Tutorials, tutorial data, routes and images are not touched — final count of tutorial changes will be 0.
