# AmmarAI Homepage Redesign — Cyber-luxe Dark

## Goal
Redesign the AmmarAI homepage into a bold, premium product experience that feels more confident, polished, and visually distinctive than Jasper.ai, while preserving AmmarAI’s real tools, links, trust logos, reviews, and CMS-managed content.

## Selected visual direction
- Use the approved **Cyber-luxe dark mode** concept as the foundation.
- Build around a near-black neutral canvas, crisp white typography, restrained electric violet, cool cyan, and selective magenta highlights.
- Replace the current editorial serif with **Sora** for display headings and retain **Inter** for body and interface text.
- Keep the design refined and product-led: no invented customers, metrics, capabilities, or generic decorative dashboard mockups.
- Avoid excessive gradients, glowing blobs, nested cards, and visual noise; color and glow will be concentrated around meaningful product states.

## Homepage structure

### 1. Premium navigation
- Refine the existing AmmarAI logo presentation and navigation into a translucent, high-contrast dark header.
- Preserve the current navigation destinations, Login link, and Start Free action.
- Add clear active, keyboard-focus, mobile-menu, and scrolled states.
- Keep the navigation usable across the rest of the site without forcing the full dark homepage treatment onto unrelated pages.

### 2. Product-led first screen
- Replace the current two-column search card layout with a centered, high-impact AmmarAI statement and a wide interactive product showcase.
- Keep the real promise: one workspace for AI Agents, Writer, Chat Pro, Image Pro, Video Pro, avatars, transcription, SEO, documents, and code.
- Preserve the two primary actions: **Start creating free** and **Explore 138 tools**.
- Turn tool discovery into a premium command/search surface with real suggestions and links from the current tool registry.
- Show a polished sequence of real flagship workflows rather than invented functionality.

### 3. Trusted-company strip
- Restyle the approved seven-company logo marquee for the dark surface.
- Preserve accurate alt text, continuous polished scrolling, pause on hover/focus, edge masking, and reduced-motion behavior.
- Integrate it visually into the opening experience instead of presenting it as an isolated white band.

### 4. Flagship tools
- Present the real eight flagship products with stronger hierarchy, distinct visual identities, and concise existing descriptions.
- Keep AI Agent Builder first, followed by AI Writer, Chat Pro, Image Pro, Video Pro, Avatar Video, Transcription, and SEO Analyzer.
- Use a varied premium grid rather than eight identical cards, while keeping every item clearly clickable and readable.

### 5. Full-page visual upgrade
Apply the selected direction consistently to the remaining homepage sections:
- Video library with stronger cinematic media framing and clear tool links.
- Tool categories with improved scanning and less repetitive card treatment.
- Popular and recently added tools with clearer editorial hierarchy.
- Product features, value comparison, use cases, blog, FAQ, and final action section.
- Customer reviews will retain the real review data, rating summary, filters, review browser, and submission flow, with styling adapted to the new direction.

## Interaction and motion
- Use restrained entrance sequences, precise card elevation, luminous focus states, and subtle activity in the tool-discovery showcase.
- Keep animations short and purposeful; no constant background distraction.
- Respect `prefers-reduced-motion` for all new movement.
- Preserve keyboard navigation, visible focus states, accessible dialogs, and readable contrast.

## Responsive behavior
- Design the mobile experience deliberately rather than shrinking the desktop composition.
- Keep the headline, actions, product showcase, logo strip, media, and review controls free of overlap at common phone, tablet, laptop, and wide-desktop sizes.
- Maintain stable heights and aspect ratios for interactive and media regions to prevent layout shifting.

## Technical implementation
- Add the dark homepage color roles, glow treatments, shadows, and surface levels as semantic tokens in the global design system; do not hardcode visual colors in page components.
- Load Sora through the document head and define the display/body font roles centrally.
- Create focused homepage presentation components where needed instead of turning the homepage file into one large block.
- Reuse the existing tool registry, videos, logos, reviews, links, and CMS queries so the redesign does not duplicate or stale business content.
- Keep the homepage metadata, canonical URL, structured data, and single H1 intact.

## Verification
- Check the complete homepage at mobile, tablet, 1440px desktop, and wide desktop sizes.
- Test tool search, tool links, CTAs, video playback, logo marquee, review browsing/submission, FAQ, and mobile navigation.
- Confirm no text clipping, overlaps, broken media, missing focus states, console errors, or build errors.
- Confirm all visible claims and company identities come from the existing AmmarAI content and approved assets.
