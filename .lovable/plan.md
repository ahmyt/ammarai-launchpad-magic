# Align tool pages with the tutorials (tutorials stay untouched)

I compared all 40 tutorials against the 28 tool pages they point to. Everything below is a proposed change to **tool pages only** — no tutorial wording, step, image, name or button is touched.

Findings fall into three groups. Group A are real contradictions. Group B are claims a tool page makes that no tutorial supports. Group C are real capabilities the tutorials show but the tool page never mentions.

## Group A — the workflow described does not match the tutorial (fix these)

1. **AI Video Pro** — the page describes turning a script into a scene-by-scene video with built-in voiceover, burnt-in captions, per-scene regeneration and hook variants. The guide shows a single-clip generator: choose model, write a prompt or upload an image, set duration and size, generate. Rewrite the page around prompt/image-to-clip, and point voice, captions and multi-scene assembly at AI Voiceover, AI Captions and the AI Video Editor.
2. **AI Video Editor** — the page reads as a prompt-driven auto-editor ("describe the cut", colour grading, silence trimming, dialogue cleanup). The guide shows a real project editor: pick an aspect ratio, add library media, arrange/trim/layer on a timeline, then use AI panels for generated video, voiceover and music. Rewrite to the timeline-plus-AI-panels workflow.
3. **AI Product Photoshoot** — the guide attached to this page is Fashion Studio: a dashboard with product selection (library, upload, prompt-to-product), model and style selection, posing, backgrounds, Virtual Try-On, Change Model, Edit Image, My Photoshoots, My Wardrobe, AI video generation, and output settings for count, resolution and ratio. The page currently covers only product-only scenes. Rebuild the page around the Fashion Studio workflow shown.
4. **AI Creative Suite** — the page describes a brand-kit/set generator with saved brand styles and mockups. The guide shows a design canvas: generate a base image, templates and artboards, type/colour/alignment, layers, annotation-based region edits, export and project import/export. Rewrite to the canvas workflow.
5. **AI UGC Creator** — the page starts from a product brief and creator matching. The guide starts from audio and a chosen voice, then actor, then scene. Correct the sequence.
6. **AI URL to Video & Influencer** — the page's "review the generated script" step does not exist in any of its three guides; the real flow is product details → video details → presenter → voice → caption style → choose a rendered preview. Correct that step and add the influencer-from-script path.

## Group B — claims no tutorial supports (propose removing or softening)

- **AI Captions**: speaker detection, subtitle translation, transcript correction, SRT/VTT export. Guide shows upload, template, generate, continue in the video editor.
- **AI Dubbing**: "review the translation" step and translated captions. Guide shows source type, language, speaker count, advanced options, title, generate, history.
- **AI Presentation Maker**: PPTX export and single-slide regeneration. Guide ends at review and download.
- **AI Phone Call Agent**: live calendar booking, human transfer, per-contact transcript logging.
- **AI CRM**: WhatsApp/Telegram access, monthly win-rate and source reports.
- **AI Smart Inbox**: one-click conversion to lead/task/deal, response-time and resolution metrics.
- **AI Agent Builder**: approval gates before sensitive actions.
- **AI Blogger Agent**: an explicit "approve the plan" step.
- **AI Music Pro**: multiple variants per brief, direct hand-off to Sound Studio.
- **AI Image Pro**: brush editing, background removal, frame extension, upscaling, batch export.
- **AI Document Analyzer**: version comparison and multi-document questioning.

## Group C — capabilities the tutorials show that the tool page omits (propose adding)

- **AI Chat Pro**: run one prompt through two models side by side; temporary chat; the Content Manager media library (uploads, stock images, stock video, documents).
- **AI Voiceover & Voice Clone**: voice cloning from your own recording is absent from the page despite being in the product name.
- **Article Wizard**: keyword suggestions and "questions people search" turned into outline sections.
- **External Chatbot Builder**: voice call agent, Booking Assistant with a scheduling embed, Shopping Assistant with store connection and selectable shop details, starter questions, bubble design.
- **AI Smart Inbox**: saved replies, private notes, visited-page history, date filtering, single and bulk conversation export.
- **AI CRM**: Projects board and the activity calendar.
- **AI Phone Call Agent**: outbound single and batch calling with call history.
- **AI Image Pro**: variation count, style presets and model choice.
- **AI Blogger Agent**: content calendar and reports/analytics.

## How the changes are made

Edits are confined to the tool records in `src/data/tools-*.ts` — the `canDo`, `how`, `capabilities`, and where the summary/lede contradicts the guide, those fields too. Names, slugs, URLs, CTAs, related lists and SEO metadata stay as they are, so no link or canonical changes. Typecheck and build after each batch.

## Decision needed

Group A is unambiguous. Tell me whether to apply Group B and Group C as well, or only Group A.

## What the live workspace showed

I signed into the app with the account you gave me. Two things stop it being usable as proof:

- It is a normal user account, so the admin marketplace page redirects straight back to the website.
- It has no active subscription, so opening the tool area lands on the plan page instead of the tools.

Its sidebar lists AI Editor, AI Writer, AI Video, AI Image, AI Article Wizard, AI File Chat, AI Vision, AI ReWriter, AI Chat Image, AI Chat, AI Code, AI YouTube, AI RSS, AI Speech to Text, AI Voiceover, Brand Voice and Integration. Fashion Studio, CRM, Phone Agent, Dubbing, Captions, Music, Presentations, UGC, Agent Builder and Smart Inbox are not shown there — but that is probably plan gating, so I am not treating this list as the capability record.

To use the marketplace as the source of truth I need an account with admin access, ideally with an active plan. Screenshots of the marketplace list work just as well.

## Order of work

1. Apply Group A now — contradictions with the guides, no further evidence needed.
2. Apply Group C now — these come straight from the guides, which are already the agreed record.
3. Hold Group B until the marketplace can be read, then remove or keep each claim on that evidence.
