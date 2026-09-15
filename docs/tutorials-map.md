# Tutorial source-to-AmmarAI matrix (internal)

Last audited: 2026-09-15

## Publication rule

A tutorial is public only when its tool exists in AmmarAI and the reference
documentation contains a corresponding regular-user workflow. AmmarAI is the
functionality source of truth; the reference is used only for workflow scope and
sequence. Administrator, installation, deployment, provider, API-key, billing,
licensing and system-configuration material is excluded.

## Published overlap

| Reference workflow | AmmarAI equivalent | Public guide | Image decision |
|---|---|---|---|
| AI Chat Pro | AI Chat Pro (`/ai-chat`) | `/tutorials/how-to-use-ai-chat-pro` | No qualifying end-user image from the reference page; its images show administrator settings, so none are published. |
| Document Chat in AI Chat Pro | AI Document Analyzer and Chat Pro file workflow (`/ai-document-analyzer`) | `/tutorials/how-to-chat-with-documents` | Five exact, full-resolution reference images are published unchanged. |
| AI Image Pro | AI Image Pro (`/ai-image-generator`) | `/tutorials/how-to-use-ai-image-pro` | Seven regular-user reference screenshots are used with only the compact source logo replaced by the AmmarAI logo. Administrator-setting images are excluded. |
| AI Video Pro | AI Video Pro (`/ai-video-generator`) | `/tutorials/how-to-use-ai-video-pro` | The regular-user creation screenshot is used with only the source logo replaced. The provider-key settings screenshot is excluded. |
| Viral Clips | Long-video clipping in AI URL to Video & Influencer (`/ai-url-to-video`) | `/tutorials/how-to-create-viral-clips` | Three original full-resolution regular-user screenshots are used. The compact source logo is replaced only where it appears; setup screenshots are excluded. |
| AI Influencer | Product-ad and presenter workflows in AI URL to Video & Influencer (`/ai-url-to-video`) | `/tutorials/how-to-create-ai-influencer-videos` | Ten original full-resolution regular-user screenshots are used. The compact source logo is replaced only where it appears; provider/setup screenshots are excluded. |

## Removed from the previous collection

| Previous guide | Reason removed |
|---|---|
| Introduction to AmmarAI | No matching reference tutorial. |
| Getting Started with AmmarAI | No verified matching end-user reference workflow. |
| Navigating the AmmarAI Workspace | No verified matching end-user reference workflow. |
| AI Writer | No matching reference walkthrough was found. |
| AI Article Wizard | Available reference material was setup-oriented rather than a qualifying end-user workflow. |
| AI Vision | No matching reference walkthrough was found. |
| AI Plagiarism Checker | Available reference material was API/setup-oriented rather than a qualifying end-user workflow. |

Their cards, search results, related links, tool-page links, sitemap entries,
`llms.txt` entries and 31 altered/annotated images were removed.

## Image provenance

The five published files are the original highest-resolution image assets from
the reference Document Chat guide. They were downloaded byte-for-byte and were
not cropped, resized, recolored, retouched, rearranged or annotated:

- `document-chat-1.png` — 1810 × 856
- `document-chat-2.png` — 1884 × 872
- `document-chat-3.png` — 1898 × 951
- `document-chat-4.png` — 1894 × 858
- `document-chat-5.png` — 1798 × 853

Some reference captures display the reference interface itself. They remain
unchanged because the requirement explicitly prohibits editing the visual
content. They are presented as reference workflow images, not as fabricated
AmmarAI product screenshots.

The AI Image Pro and AI Video Pro captures preserve the reference screenshot
content, dimensions and annotations. Their only visual change is replacement
of the compact source product logo with the AmmarAI logo, as explicitly
requested. No fields, controls, arrows, crops, colors or results were changed.

The Viral Clips and AI Influencer captures use the original full-resolution
reference assets rather than WordPress's 1024-pixel derivatives. The originals
range from 1398 to 1880 pixels wide. Files without the compact source mark are
byte-for-byte copies; files with that mark retain their native dimensions and
visual content, with only the compact top-left logo replaced by AmmarAI.

## Excluded reference material

- Chat Pro feature toggles and model/provider settings
- Deep Research, council, skills-management and user-limit administration
- Document Chat enablement and other feature configuration
- Installation, activation, licences, refunds and upgrades
- Payment, SMTP, storage, social-login and third-party provider setup
- API keys, server configuration, cron, troubleshooting and migrations
- User, permission, team-plan and advertising administration

If a future reference page mixes user instructions with setup content, only the
verified regular-user sequence may be documented.

## QA requirements

- All tutorial, CTA, related-tool and previous/next destinations must resolve.
- Every public tutorial gets unique title, description, Open Graph, Twitter,
  canonical, breadcrumb and HowTo metadata where appropriate.
- Every instructional image has meaningful alt text and intrinsic dimensions.
- Desktop and mobile views must have no clipping or page-level overflow; tables
  retain visible cells and partitions.
- Public tutorial copy must not mention the source brand or expose admin/setup
  workflows.
## Batch 4 (verified overlaps)
- Fashion Studio → AmmarAI AI Photoshoot / Virtual Try-On (`/ai-photoshoot`, `/ai-virtual-try-on`) — full end-user workflow retained (dashboard, photoshoot, VTO, change model, edit image, my photoshoots, wardrobe, video generation, photoshoot settings). Admin Settings section and `fsett` image excluded. 24 reference screenshots, original resolution, compact source logo replaced with the AmmarAI logo only.
- Video Dubbing → AmmarAI AI Dubbing (`/ai-dubbing`) — Getting Started, How to Dub a Video, Previously Dubbed Videos retained. Requirements, Activation, Admin Controls and provider/API-key material excluded (`vd2`, `vd3`, `vd4`, `vd5`, `vd10` unused). 5 screenshots.
- UGC Factory → AmmarAI AI UGC Generator (`/ai-ugc-generator`) — Getting Started and How to Create a UGC Video retained. Requirements, Activation, Admin Controls excluded (`ugc2`, `ugc3`, `ugc1-1`, `ugc2-1`, `ugc6` unused). 4 screenshots.
- AI Captions → AmmarAI AI Captions (`/ai-captions`) — Getting Started, video upload, caption-style selection, generation and editor handoff retained. Requirements, Activation, Admin Controls and API-key material excluded; the administrator screenshot `aic1` is not used. Three full-resolution reference screenshots are published with only the source logo and far-right profile avatar replaced by AmmarAI branding.

All published reference-interface screenshots that display a far-right account avatar replace it with the AmmarAI logo. Each replacement must use the exact measured center and footprint of the original avatar; this is mandatory for every future tutorial batch. Native dimensions and all instructional controls remain unchanged.

## Batch 5 (verified overlaps)

- AI Blogger Agent → AmmarAI AI Blogger Agent (`/ai-blogger-agent`) — dashboard, five-step agent creation, post library, calendar, and reports/analytics retained. Provider, administrator, activation, and plan-control material excluded. Sixteen original-resolution workflow captures were reviewed; eleven are used in the guide.
- AI Agent → AmmarAI AI Agent Builder (`/ai-agent-builder`) — plain-language creation, connectors, triggers and actions, agent monitoring, channel messages, and run details retained. Requirements, installation, activation, administrator controls, and plan limits excluded. Six original-resolution screenshots are used.
- AI Music Pro → AmmarAI AI Music Pro (`/ai-music-generator`) — track description, duration, style selection, generation, and review retained. The provider API-key screenshot is excluded. Three original-resolution workflow screenshots are used.

Every Batch 5 source wordmark and far-right profile avatar was measured independently. Replacements preserve each image's native dimensions and occupy the exact original mark center and footprint; no instructional controls or existing red pointers were moved or redrawn.

## Batch 6 (verified overlaps)

- AI Presentation → AmmarAI AI Presentation Maker (`/ai-presentation-maker`) — brief, language, theme (incl. theme gallery), slide count, advanced options/AI images, generation and download retained. Gamma API integration, credits/cost summary and the admin dashboard capture are excluded. Eight original-resolution screenshots are used.
- Realtime Voice Chat → AmmarAI Realtime Voice Chat (`/realtime-voice-chat`) — opening a chat, enabling real-time voice from the message bar and holding the spoken session retained. The provider API-key enable screenshot is excluded. One original-resolution screenshot is used.

Every Batch 6 source wordmark was measured independently; replacements occupy the exact original mark center and footprint at native image dimensions. No red pointers or controls were moved. None of the published Batch 6 captures contain a far-right profile avatar.

## Batch 7 (verified overlaps)

- Video Editor → AmmarAI AI Video Editor (`/ai-video-editor`) — project creation, aspect ratio, library, timeline editing and the AI, Voice and Music panels retained. Requirements, server requirements, Marketplace activation, plan enablement, provider API keys and Admin Controls excluded. Five original-resolution screenshots are used.
- Creative Suite → AmmarAI AI Creative Suite (`/ai-creative-suite`) — engine choice and generation, predefined templates, canvas type/colour/layer editing, artboards, export/import retained. Four original-resolution screenshots are used.

Each Batch 7 source wordmark was measured independently (Creative Suite icon 30×30 with a 77×19 wordmark; Video Editor sidebar icon 32×32 with wordmark, plus a 35×36 far-right avatar). Replacements occupy the exact original centre and footprint at native image dimensions; no red pointers or controls were moved.

## Batch 8 (verified overlaps)

- URL to Video AD → AmmarAI AI URL to Video & Influencer (`/ai-url-to-video`) — Generate New entry point, product URL analysis and manual product upload, language/duration/aspect ratio, avatar, voice and caption selection, preview selection and render retained. Creatify/Topview provider API keys, Manage AI Tools defaults and all other settings screens excluded. Seven original-resolution screenshots are used.
- Sora video inputs → folded into the existing AmmarAI AI Video Pro guide (`how-to-use-ai-video-pro`) as a "Set the generation inputs" section covering reference image, prompt, model, duration and size. The provider API-key/enablement screenshot is excluded. Five original-resolution screenshots are used.
- Temporary Chat excluded: the reference page covers Marketplace installation and activation only, with no separable end-user workflow.

Batch 8 marks were measured per image: only the AI Influencer capture carries a source mark (icon 36×32 at x9–45/y7–39, wordmark 83×23 at x47–130/y13–36); the replacement occupies that exact centre and footprint at native image dimensions. The remaining captures are wizard/detail crops with no brand mark. No red pointers or controls were moved.

## Batch 9 (verified overlaps)

- Content Manager → AmmarAI shared media library (`how-to-use-the-content-manager`) — upload, stored images, stored videos, documents, stock image and stock video tabs plus the insert actions retained. Storage drivers, provider keys and any admin configuration excluded. Six original-resolution screenshots are used.
- Influencer avatars → already covered by the existing `how-to-create-ai-influencer-videos` guide ("Create a presenter video from a script"); its two screenshots were re-derived from the originals with the measured branding. The FAL provider API-key capture is excluded.
- AI Canvas and Creative Suite annotation excluded: setup-only content, or no verified AmmarAI equivalent.

Batch 9 marks were measured per image. Content Manager captures carry a top-left icon (~12x12) with a ~40x12 wordmark and a far-right profile avatar (~22x22); influencer captures carry only a top-left icon (~30x30) with a ~77x30 wordmark and no avatar. Every replacement occupies the exact measured centre and footprint at native image dimensions, with the background sampled from the true top-bar pixels. No red pointers or controls were moved.

## Batch 10 (verified overlaps)

- CRM → AmmarAI AI CRM (`/ai-crm`) — overview, CRM Assistant, contacts, companies, deals, projects, tasks and calendar retained. CRM enablement, admin controls and settings toggles excluded. Eight original-resolution screenshots are used.
- Phone Call Agent → AmmarAI AI Phone Agent (`/ai-phone-agent`) — agent list, title/greeting/instructions/language/duration/voice configuration, URL/PDF/text training and saved-agent review retained. Marketplace installation, activation, plan configuration, provider setup and phone-number import/provider assignment excluded. Four original-resolution screenshots are used.
- Outbound Calls → AmmarAI AI Phone Agent (`/ai-phone-agent`) — outbound-call workspace, single call, batch call and call-history monitoring retained. Global phone settings, provider configuration and automated follow-up-rule administration excluded. Four original-resolution screenshots are used.

Every Batch 10 source mark and far-right profile avatar was measured independently. Replacements occupy each original centre and footprint at native image dimensions, including dimmed modal backgrounds; no instructional controls or existing red pointers were moved.

## Batch 11 (verified overlaps)

- External Chatbot → AmmarAI External Chatbot Builder (`/external-chatbot`) — AI Bots list, chatbot creation, configure (title, bubble message, welcome message, instructions, strict-instruction toggle, language, model), interaction type and connect message, suggested prompts, customiser (logo, avatar, colour, launcher size and position, bubble design), training (website, PDF, text, Q&A), preview testing and the embed snippet retained. Model pricing/credit screens, provider keys and workspace setup excluded. Ten original-resolution screenshots are used.
- Social Media Agents → AmmarAI AI Social Media Agent (`/ai-social-media-agent`) — dashboard and counters, post review, latest posts, agent list, the seven-step agent creation flow (start, platforms, brand, audience, content mix, styling, schedule), posts archive, calendar, analytics, connected accounts and the social chat retained. Admin example prompts, plan/limit configuration and API configuration excluded. Eighteen original-resolution screenshots are used.
- AI Bot Replies excluded: the reference is a WhatsApp campaign tool with no matching AmmarAI channel workflow.

Batch 11 source marks were measured per image with OCR bounds and the top-bar background sampled from true pixels. Every wordmark replacement grows left to swallow the adjacent source icon, so the AmmarAI logo occupies the exact original footprint at native image dimensions. Far-right profile avatars were detected and replaced individually. No red pointers or controls were moved.

## Batch 12 (verified overlaps)

- Human Agent for External Chatbot → AmmarAI AI Smart Inbox (`ai-smart-inbox`) with AmmarAI External Chatbot Builder (`external-chatbot`) — interaction-type handover and connect message, live conversation inbox, channel/agent filter, replies, saved replies, private notes, visitor details, tags, visited pages, unread indicator, date-range filter and conversation/list export retained. Ably provider keys, API Integration and all administrator settings excluded. Twelve original-resolution screenshots are used.
- Training Chatbot excluded: the reference workflow runs entirely inside the administrator Templates area.
- AI Model Selector for AI Chat excluded: admin General Settings and plan configuration only.
- Voice Isolator excluded: the reference page is provider API-key setup only.
- AI Music (AIML API) excluded: Marketplace installation and provider API-key setup only.

Batch 12 marks were measured per image with OCR plus a non-background bounding-box scan. Two captures carry the source sidebar mark (icon 60x59/60x59 with a 154px wordmark) and one carries a source bot name in a heading; two list captures carry a source bot name in the thread header. Every replacement occupies the exact measured centre and footprint at native image dimensions, with the background sampled from true adjacent pixels. None of the published Batch 12 captures contain a far-right profile avatar. No red pointers or controls were moved.

## Batch 13 (verified overlaps)

- Multi Model → AmmarAI AI Chat Pro (`/ai-chat`) — opening the model picker, selecting two models, sending one prompt and keeping the preferred answer retained. Marketplace installation and extension activation excluded. Three original-resolution screenshots are used.
- Booking Assistant → AmmarAI External Chatbot (`/external-chatbot`) — enabling the booking assistant, editing the show-conditions, pasting the inline scheduling embed code and testing in the preview retained. Marketplace add-on installation, third-party account creation screens and admin settings excluded. Three original-resolution screenshots are used.
- Shopping Assistant → AmmarAI External Chatbot (`/external-chatbot`) — enabling the assistant, choosing the shop source and selecting which shop features may be used retained. Store API credential captures (Shopify token, WooCommerce consumer key/secret) and marketplace/admin screens excluded. Three original-resolution screenshots are used.
- Voice Call Agent → folded into the existing website chatbot guide as "Let visitors talk to the assistant" (enable switch, first spoken message). Global Voice Call Settings, provider selection and ElevenLabs voice-ID captures excluded. One original-resolution screenshot is used.

None of the Batch 13 captures contain a source wordmark or far-right profile avatar; each was OCR-scanned before publication and no branding replacement was required, so all images keep their native dimensions with no pointers or controls moved.

## Batch 14

| Reference page | AmmarAI tool | Decision | Notes |
| --- | --- | --- | --- |
| temporary-chat | AI Chat Pro (`ai-chat`) | Included — `how-to-use-temporary-chat` | Marketplace install section excluded (setup). Images tc1.png (1268x195), tc2.png (1262x270) carry no source mark — used unchanged. |
| creative-suite-annotation | AI Creative Suite (`ai-creative-suite`) | Included — `how-to-edit-part-of-an-image-with-annotations` | Admin sections (default model, vision model, plan access) excluded. Images 08-05-2026-11-39-20 (1550x808) and 11-47-06 (1593x964): source host in the browser address bar replaced with `app.ammarai.com/creative-suite` at the measured text box (152,18)-(560,30) and (152,4)-(557,16), background sampled from the adjacent bar pixel. 11-25-13, 11-26-33 and 11-28-21 excluded (settings screens). |
| external-chatbot-whatsapp-integration | — | Excluded | Workflow is third-party provider credentials and webhook wiring. |
| external-chatbot-telegram-integration / facebook-messenger / instagram | — | Excluded | Channel token and provider app configuration. |
| ai-fine-tuning | — | Excluded | Provider-side setup only. |

## Batch 15

| Reference page | AmmarAI equivalent | Decision | Notes |
| --- | --- | --- | --- |
| team-members ("For Users" half) | Team Workspaces feature (`/features/team-workspaces`) | Included — `how-to-invite-teammates-to-your-workspace` | Admin half (team pricing plans, seat counts) excluded. Only image is a promo graphic naming the source product; cropped to the genuine invite panel (1080x845 from 1140x1492, crop box 40,405-1120,1250) which contains no source mark — OCR verified clean. CTA uses the new `cta.kind: "feature"` option so it points at the feature page. |
| shared-credit-pool-system | — | Excluded | Entirely admin finance configuration. |
| hubspot-crm-integration, ai-avatar-setup, seo-tools, access-to-rest-api, onboarding-pro, checkout-registration | — | Excluded | Provider API keys, server commands, or owner-side extension configuration. |
| influencer-avatars | already covered | Skipped | Workflow is already in `how-to-create-ai-influencer-videos`. |

## Batch 16

| Reference page | AmmarAI equivalent | Decision | Notes |
| --- | --- | --- | --- |
| wordpress-integration (end-user half) | AI Blogger Agent (`ai-blogger-agent`) | Included — `how-to-publish-a-post-to-wordpress` | Kept: Integrations page, connecting the site, and the Share button on a finished document. Excluded: WordPress plugin installation, JWT/permalink configuration and the Marketplace extension install (owner setup). Images: Screenshot-2024-03-22-at-14.45.19 (1094x838) carries no source mark and is used unchanged; Screenshot-2024-03-22-at-14.48.02 (1334x738) had the sidebar wordmark measured at (17,14)-(99,37), the far-right profile avatar at (1244,11)-(1273,39) and the support bubble avatar at (1263,643)-(1307,687), each replaced with the AmmarAI logo at the exact measured centre and footprint with background sampled from adjacent pixels. The sample document body was off-topic non-English spam copy and was replaced with neutral English placeholder text. Native dimensions preserved; no pointers moved. |
| social-media-suite-setup, social-media-suite-vs-ai-social-media-extension | — | Excluded | Entirely developer-app and provider credential setup (Meta, X, LinkedIn, TikTok, YouTube OAuth apps). |
| ai-voice-bots-elevenlabs-conversational-ai | — | Excluded | Provider API-key setup only. |

Note: `tutorialByTool` now keeps the first tutorial registered for a tool slug, so a second guide sharing a CTA tool does not displace the primary one.
