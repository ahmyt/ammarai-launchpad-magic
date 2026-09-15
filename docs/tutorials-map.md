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
