# Selective Production Homepage Upgrade

## Goal
Improve the existing AmmarAI production homepage with the strongest product-discovery ideas from the Ecosystem Hub while preserving the production identity, content, links, SEO structure, trust signals, and working features.

## What the comparison showed
- The two versions already share most downstream content: trust logos, eight flagship tools, video examples, tool categories, value comparison, reviews, use cases, guides, FAQ, pricing call-to-action, and footer links.
- The clearest Ecosystem Hub advantages are concentrated in the opening area: the connected-workspace framing, the “choose a tool or describe your goal” interaction, stronger flagship shortcuts, and more product-like presentation.
- The production headline and keyword-rich supporting copy are stronger for the requested positioning and SEO, so they should remain the source of truth.

## Implementation

### 1. Restore and strengthen the production opening
- Keep the single H1: **One AI for everything you create**.
- Add the supporting line **138 tools · one intelligent workspace** above it.
- Preserve the production keyword coverage for Writer, Chat, Image, Video, Avatar, Transcription, SEO, Agents, CRM, Voice, Documents, and Code.
- Keep both existing calls to action and free-plan reassurance.
- Use the current AmmarAI logo, typography, color system, and navigation rather than replacing them with the alternate dark design wholesale.

### 2. Upgrade “Find the right tool” without fake AI
- Present two clear paths in one polished workspace panel: browse/select a flagship tool or describe a goal.
- Keep the existing real keyword-based tool matching; do not imply an AI recommendation backend.
- Add useful starter prompts covering writing, product copy, video, voiceover, transcription, Instagram ads, and agents.
- Make results directly link to existing tool pages and provide a clear no-results state.
- Add an optional keyboard focus shortcut only if it works accessibly and does not interfere with typing.

### 3. Make the connected workspace tangible
- Add a concise visual summary of one account, one subscription, shared history, brand voice, files, assistants, templates, models, and creation/automation capabilities.
- Integrate this into existing sections rather than adding a long new block.
- Preserve the “What makes 138 tools feel like one product” and “Stop paying for five AI tools” content and pricing language.

### 4. Improve product presentation within existing sections
- Upgrade the seven priority flagship cards—AI Writer, Chat Pro, Image Pro, Video Pro, Avatar Video, Transcription, and SEO Analyzer—while retaining AI Agent Builder and all eight existing flagship links.
- Use only existing real AmmarAI media and examples; no invented screenshots or placeholder interfaces.
- Keep the real video library, improving hierarchy and scanability without autoplay or heavy animation.
- Keep all tool categories and links while making category browsing easier to scan on mobile and desktop.

### 5. Preserve trust, conversion, and SEO
- Keep “Trusted by growing companies,” approved logos, customer reviews, review counts/ratings from live data, use cases, FAQ, blog/guides, pricing CTA, footer, metadata, canonical URL, JSON-LD, and internal links.
- Do not invent endorsements, reviews, usage figures, or price comparisons.
- Retain crawlable headings and text, one H1, and current destination URLs.

### 6. Polish interactions and mobile behavior
- Use restrained hover/focus treatments and short transitions, honoring reduced-motion preferences.
- Ensure the navigation, opening section, tool finder, logos, flagship cards, videos, reviews, comparison, pricing CTA, and FAQ are intentionally composed at mobile, tablet, desktop, and wide-desktop sizes.
- Lazy-load media where appropriate and avoid new large libraries or assets.

## Technical details
- Focus changes on the homepage route and existing shared presentation components/styles.
- Continue using semantic design tokens and existing AmmarAI components.
- Preserve current queries, forms, authentication, reviews, analytics, and API behavior.
- Verify with the live preview at 411px mobile, tablet, 1280px desktop, and wide desktop; test tool search, links, navigation, video controls, review dialogs, and FAQ interactions.
- Confirm the final build is healthy and that metadata and structured data remain present.
