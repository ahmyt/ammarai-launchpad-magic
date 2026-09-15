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