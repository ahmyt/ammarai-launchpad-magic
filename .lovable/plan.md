# Moving AmmarAI onto the Magic AI platform: what to add

The site today markets 66 tools built around the old platform's capabilities: writing, SEO,
images, video, voice/audio, chat, e-commerce copy, plus the External Chatbot Builder and the
SEO Analyzer.

Magic AI's current release adds a whole layer the site says nothing about: autonomous agents,
a CRM, phone calls, social media publishing, and a much deeper creative suite. Below is what
is genuinely new and worth adding, grouped by priority.

## Tier 1 — big new categories the site completely lacks

These are new revenue stories, not variations of existing pages.

1. **AI Agents** — describe work in plain language, it runs on a schedule or on a trigger,
   chaining actions across email, chat and reports. Also buildable on a drag-and-drop canvas.
2. **AI-Powered CRM** — clients, companies, deals, pipelines, invoices, payments, tasks and
   reports, with AI on top of the CRM data.
3. **Phone Call Agents** — AI answers and makes real phone calls: bookings, reservations,
   support, follow-ups, lead qualification.
4. **Social Media Suite + Social Agents** — publish posts, stories, carousels, YouTube and
   Shorts; automatic DM/comment replies and YouTube comment automation.
5. **AI Deep Research** — long-form, multi-source research with web search.

## Tier 2 — upgrades that deserve their own pages

6. **AI Creative Suite** — real-time canvas editing, AI Designer, on-brand assets, annotation.
7. **AI Image Pro** — style/aspect control, editing, plus the Nano Banana image model.
8. **AI Video Pro + AI Video Editor** — editing, AI Captions, AI Dubbing into other languages.
9. **UGC Creator / UGC Factory** — bulk user-generated-style ad content.
10. **AI Photoshoot** — studio-quality product and fashion photography.
11. **AI Music Pro** — replaces the thin AI Music Generator page.
12. **AI Chat Pro** — folders, smart memory, connectors to outside apps, web search,
    multi-model and Council Mode (several models answering together).
13. **AI Persona v2 / Skills** — reusable personas and skills for the assistant.

## Tier 3 — page updates rather than new pages

14. **External Chatbot Builder** page rewrite: branded homepage, help center, lead capture
    synced to CRM, sales and booking agents, voice chat, Instagram, smart inbox.
15. **Models page or section** — GPT-5, Grok 4 and multi-model choice as a selling point.
16. **Pricing/plans page** — shared credits pool and discount manager.

## What already exists and only needs refreshing

Writing, SEO, ads, e-commerce copy, transcription, text-to-speech, voice cloning,
presentation maker, code, vision and document analysis all map to Magic AI equivalents.
They stay; wording gets aligned to the new platform.

## Suggested build order

Phase 1: AI Agents, CRM, Phone Call Agents, Social Media Suite — four new tool pages plus a
new "AI Agents" and "AI Sales" category in the tool directory.
Phase 2: Creative suite, Image Pro, Video Pro/Editor, UGC, Photoshoot, Music Pro.
Phase 3: Chat Pro, personas/skills, chatbot page rewrite, models and pricing updates.

## Technical notes

New tools are data entries in `src/data/tools-*.ts` using the existing `Tool` shape, so each
one automatically gets its `/{slug}` page, FAQ schema, breadcrumbs and directory listing.
Two new categories need adding to `categoryOrder` in `src/data/tools.ts`, and matching
keyword entries in the discovery search intent map. Related-tool links and homepage featured
tools get updated as pages land. No backend or CMS schema changes are required.

## Before I build

Confirm the phase 1 list, and tell me whether these features are live on your Magic AI plan
(some are premium add-ons) so the site doesn't advertise something the app can't do yet.
