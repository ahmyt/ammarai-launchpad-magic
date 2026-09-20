# Extend the input → outcome workflow section to 30 more tools

## Goal
Give the remaining major full-product tools the same "What you provide / What AmmarAI does / What you get" workflow card the ten flagship tools already have. Template-library pages (blog intros, product descriptions, email subject lines, etc.) are excluded — their existing "How it works" steps already cover it and a workflow card there would be thin and repetitive.

## The 30 tools (flagships unchanged)

- **Agents & engagement:** AI Blogger Agent, AI DM & Comment Agent, AI Deep Research, AI Chat Bots, AI Marketing Bot
- **Voice & audio:** AI Voiceover & Voice Clone, AI Text to Speech, AI Speech to Text, Sound Studio, AI Music Pro
- **Image & design:** AI Image to Video, AI Vision, AI Image Editor, AI Product Photoshoot, AI Fashion Studio, AI Creative Suite
- **Video:** AI Video Editor, AI Captions, AI Dubbing, AI UGC Creator, AI YouTube & Shorts Publisher, UGC Factory, Viral Clips, AI Video Enhancer, AI URL to Video & Influencer
- **Writing & platform:** AI Document Analyzer, AI Presentation Maker, AI Plagiarism Detector, AI ReWriter, AI Editor

Smaller feature-level tools (Command Search, Council Mode, Smart Inbox, Brand Voice, Content Manager, Image Assistant, Realtime Image, Social Media Publisher, External Chatbot, Code Generator, Personas) stay as-is; any of them can be added later with one entry.

## How it works

- Add the 30 entries as a new hand-written `toolWorkflows` list next to `flagshipWorkflows` in `src/data/ecosystem.ts` — same shape: bring / process / get / useCaseSlugs.
- The homepage "Workflow stories" section keeps showing only the 10 flagships (unchanged).
- Each entry is written from that tool's existing capabilities, steps and examples — no invented features, consistent with the tutorials as the capability source of truth.
- `src/routes/$slug.tsx` already renders the workflow section when a record matches the slug; one small change: look up both lists, and if a tool's workflow has no matching use-case pages, fall back to the existing automatic "Related workflows" behaviour instead of hiding it.

## Verification

- All 30 tool pages show the new card; the 10 flagship pages are unchanged.
- Template pages show no workflow card.
- Homepage still shows exactly 10 workflow stories.
- "Related workflows" still appears on every tool page that had it before.
- Build passes; the production zip needs the usual Plesk upload + restart to go live.
