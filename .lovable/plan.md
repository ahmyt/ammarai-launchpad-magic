# Aligning the tool pages with what AmmarAI actually runs

## What the marketplace shows

I signed in and read the full marketplace list (110+ add-ons). Two facts stand out:

- **The Installed tab is empty.** Not a single marketplace add-on is installed on the app today.
- Every add-on is marked either "Not Purchased" or "Free (Not Installed)" — including CRM, Phone Call Agent, AI Agent Builder, UGC Creator, UGC Factory, AI Video Editor, AI Video Pro, AI Captions, AI Dubbing, AI Photoshoot, AI Fashion Studio, AI Image Pro, AI Music Pro, AI Presentation Maker, AI Creative Suite, AI Blogger Agent, Social Media Agent, External Chatbot v3, AI Chat Pro, Deep Research, AI Council Mode, AI Persona, Canvas, Content Manager, SEO Tool.

What the workspace actually offers right now is the core set in the user sidebar: AI Editor, AI Writer, AI Video, AI Image, AI Article Wizard, AI File Chat, AI Vision, AI ReWriter, AI Chat Image, AI Chat, AI Code, AI YouTube, AI RSS, AI Speech to Text, AI Voiceover, Brand Voice, plus Integration and the writer templates.

So the marketplace confirms the **names and real descriptions** of every advertised capability, but it also shows most of them are not switched on yet.

## The decision this forces

The marketing site advertises 140 tools and 40 guides, most of them for add-ons that are not installed. That is a promise-versus-product gap, and it is a business call, not a code call. Three options:

- **A. Treat the marketplace as the roadmap** (recommended default): keep the pages, keep the guides, and correct only wording that contradicts the marketplace description. Nothing is removed. Assumes the add-ons get installed.
- **B. Mark the not-yet-installed ones.** Same as A, plus a small "Coming soon" marker on tools whose add-on is not installed, so visitors are not misled.
- **C. Trim to what runs today.** Show only the core sidebar tools and archive the rest until their add-ons are installed.

## The tool-page fixes, either way

Names, slugs, URLs, CTAs, related lists and SEO metadata stay as they are. Tutorials are never edited. All edits are confined to the tool records in `src/data/tools-*.ts`.

**Group A — contradictions with the guides** (apply now): AI Video Pro, AI Video Editor, AI Product Photoshoot / AI Fashion Studio, AI Creative Suite, AI UGC Creator, AI URL to Video & Influencer. Their described workflow conflicts with the guide; rewrite the `how` steps and any contradicting summary line to match the guide.

**Group B — claims with no guide behind them** (now resolvable): check each against the marketplace description and keep what the marketplace states, reword what it states differently, drop what appears nowhere. Affects AI Captions, AI Dubbing, AI Presentation Maker, AI Phone Call Agent, AI CRM, AI Smart Inbox, AI Agent Builder, AI Blogger Agent, AI Music Pro, AI Image Pro, AI Document Analyzer.

**Group C — real capabilities the pages omit** (apply now, from the guides): AI Chat Pro (two-model comparison, temporary chat, Content Manager library), AI Voiceover & Voice Clone (cloning), Article Wizard (keyword suggestions), External Chatbot Builder (voice call agent, Booking Assistant, Shopping Assistant), AI Smart Inbox (saved replies, private notes, exports), AI CRM (Projects board, activity calendar), AI Phone Call Agent (outbound single and batch calling), AI Image Pro (variation count, style presets, model choice), AI Blogger Agent (calendar, reports).

The marketplace also names several capabilities the site does not mention at all — Skills, AI Council Mode, Deep Research, Canvas, Viral Clips, Influencer Avatars, Memory / Folders / Highlight-to-Ask and the Gmail, Calendar, Drive, Notion and Outlook connectors for AI Chat Pro. I will list these for you rather than adding pages unprompted.

## Technical notes

- Edits limited to `src/data/tools-*.ts` (`summary`, `lede`, `canDo`, `how`, `capabilities`).
- No changes to `src/data/tutorials.ts`, tutorial images, routes, or head metadata.
- Verified with `bunx tsgo --noEmit` and a clean build; spot-check the six Group A pages in the browser.

## What I need from you

Pick A, B or C for the advertised-versus-installed gap. I will apply Groups A, B and C to the tool pages either way.
