# Tutorial source-to-AmmarAI mapping (internal)

This is the working map for the tutorial center. A tutorial is written only
when the feature exists in both the reference documentation and AmmarAI, and
the AmmarAI workflow is evidenced by user-provided captures of
app.ammarai.com. Never copy reference text, structure, or images.

Statuses: `verified` (workflow observed in the live product demo and the tool
exists in AmmarAI; tutorial written), `pending-capture` (workflow not yet
observed — demo plan limits or no capture), `drafted` (getting-started set, no
capture needed), `excluded` (admin/setup/source-only).

Every written tool tutorial now requires a genuine workflow screenshot or
screen-recording frame for each numbered step, with descriptive alt text.
Illustrated interface mockups are not permitted. Crop captures to the relevant
controls and make only necessary branding/privacy adaptations; never invent a
state that was not observed. If a screen is blocked by the demo plan, keep the
tutorial pending or use a genuine screenshot from the public reference docs.
The first six verified tutorials contain 31 real step captures in total.

Capture pass 2026-09-15: signed in to the public product demo with its own
published demo account and walked each tool form to record fields, options and
step order. The 31 initial illustrated step images were replaced with real
captures from the live demo and public reference documentation. Screens behind
the demo's plan paywall remain pending unless a genuine public capture exists.

## Getting Started
| Tutorial | Status |
|---|---|
| Introduction to AmmarAI | drafted |
| Getting Started with AmmarAI | drafted |
| Navigating the AmmarAI Workspace | drafted |

## Verified-overlap candidates (from user's extension list + reference docs)
| Reference feature | AmmarAI equivalent | AmmarAI URL | Status |
|---|---|---|---|
| AI Agent | AI Agent Builder | /ai-agent-builder | pending-capture |
| AI Blogger Agent | AI Blogger Agent | /ai-blogger-agent | pending-capture |
| AI Chat Pro | AI Chat Pro | /ai-chat | verified (how-to-use-ai-chat-pro) |
| AI Image Pro | AI Image Pro | /ai-image-generator | pending-capture |
| AI Captions | AI Captions | /ai-captions | pending-capture |
| AI Music Pro | AI Music Pro | /ai-music-generator | pending-capture |
| AI Presentation | AI Presentation Maker | /ai-presentation-maker | pending-capture |
| AI Influencer | AI UGC Creator | /ai-ugc-generator | pending-capture |
| Content Manager | Content library (workspace) | — | pending-capture |
| Creative Suite | AI Creative Suite | /ai-creative-suite | pending-capture |
| Document Chat | AI Document Analyzer / chat uploads | /ai-document-analyzer | pending-capture |
| External Chatbot | External Chatbot Builder | /external-chatbot | pending-capture |
| Marketing Bot | AI Marketing Bot | /ai-marketing-bot | pending-capture |
| Multi Model | Multi-model switch (chat) | /ai-chat | pending-capture |
| Realtime Voice Chat | Realtime Voice Chat | /ai-chat | pending-capture |
| SEO Tools | AI SEO Analyzer | /ai-seo-analyzer | pending-capture |
| Sora / text-to-video | AI Video Pro | /ai-video-generator | pending-capture |
| Temporary Chat | AI Chat Pro (session) | /ai-chat | pending-capture |
| UGC Factory | AI UGC Creator | /ai-ugc-generator | pending-capture |
| URL to Video Ad | AI URL to Video & Influencer | /ai-url-to-video | pending-capture |
| Video Dubbing | AI Dubbing | /ai-dubbing | pending-capture |
| Video Editor | AI Video Editor | /ai-video-editor | pending-capture |
| Viral Clips | AI URL to Video (clips) | /ai-url-to-video | pending-capture |
| Fashion Studio | AI Fashion Try-On | /ai-virtual-try-on | pending-capture |
| Influencer Avatars | AI Avatar Video Generator | /ai-avatar-generator | pending-capture |
| Product Photography | AI Product Photoshoot | /ai-photoshoot | pending-capture |
| AI Avatar | AI Avatar Video Generator | /ai-avatar-generator | pending-capture |
| AI Persona | AI Personas & Skills | /ai-personas | pending-capture |
| AI Voice Bots | AI Phone Call Agent | /ai-phone-agent | pending-capture |
| AI Bot Replies | AI DM & Comment Agent | /ai-dm-comment-agent | pending-capture |
| Human Agent | External Chatbot Builder | /external-chatbot | pending-capture |
| Booking/messaging channels | AI Phone/Social agents | /ai-phone-agent | pending-capture |
| HubSpot CRM Integration | AI CRM | /ai-crm | pending-capture |
| AI Social Media (posts/scheduling) | AI Social Media Agent | /ai-social-media-agent | pending-capture |
| AI Voice Clone | AI Voiceover & Voice Clone | /ai-voice-generator | pending-capture |
| AI Fine-Tuning | Custom assistants/personas | /ai-personas | pending-capture |
| AI Canvas | AI Writer (Smart Editor) | /ai-writer | pending-capture |
| Voice Isolator | AI Voice Isolator | /ai-voice-generator | pending-capture |

## Excluded (admin/setup/source-only — never document)
Installation, activation, licence/refund administration, payment gateway setup
(Stripe/PayPal/Paystack), SMTP/email templates, storage setup (S3/R2), API-key
and provider integrations (OpenAI/Azure/ElevenLabs/HeyGen/Synthesia/Pebblely/
Pexels/Pixabay/Unsplash/Serper/SearchAPI etc. configuration), social login
setup, Pusher/cron/server config, error-500/503/php.ini fixes, sitemap/menu/
customizer/mega-menu/migration tool, managing user permissions, team plan
administration, AdSense, SEO "setup" pages, Xero/accounting setup, upgrading
licences, OpenAI assistants setup, translating built-in templates (admin),
discount & offers, onboarding builder (admin side).

Rule: where a reference page mixes user workflow with setup, document only the
user workflow as it exists in AmmarAI.


## Written (capture pass 1 — writing, chat & assistants)
| Tutorial | AmmarAI tool | Evidence |
|---|---|---|
| how-to-use-ai-writer | /ai-writer | Template workbook: brief fields, language, max length, creativity, tone, number of results, model, brand, bulk |
| how-to-use-the-ai-article-wizard | /ai-writer | Four-stage wizard: keywords, titles, outline, images + output settings |
| how-to-use-ai-chat-pro | /ai-chat | Chat workspace: model selector, personal instructions, memory, folders, brand voice, export |
| how-to-analyse-documents-with-ai-file-chat | /ai-document-analyzer | File chat: upload, question, rename, delete |
| how-to-use-ai-vision | /ai-vision | Vision chat: image drop (jpg/png/webp), prompt, follow-up |
| how-to-check-content-with-the-plagiarism-checker | /ai-plagiarism-detector | Checker workbook: description, language, max length, generate |

### Still pending after capture pass 1 (demo plan paywall)
AI Image Pro, AI Photoshoot, Virtual Try-on, AI Presentation, AI Music Pro,
CRM Assistant. Image editing, video, avatar/persona, captions, voiceover,
speech-to-text, UGC/influencer, agent workflows, blogger agent, marketing bot
and creative suite were observed and are ready to write.
