# AmmarAI Tutorial and Documentation Center

## Goal
Create an original, searchable AmmarAI documentation center that covers only end-user features proven to exist in both AmmarAI and the reference documentation. The signed-in AmmarAI workspace—not the reference site—will determine every button name, option, workflow, limitation, and screenshot.

## Confirmed starting point
- The public AmmarAI site currently exposes the tool catalogue and descriptive tool pages, while the working product interface is hosted separately at `app.ammarai.com` behind sign-in.
- This repository does not contain the signed-in product interface, so public marketing copy alone cannot verify detailed user instructions.
- The reference site contains both end-user tutorials and extensive administrator/setup material. All installation, API-key, provider setup, server, deployment, payment, storage, and system-configuration material will be excluded.
- You will provide captures of AmmarAI’s signed-in workflows. A tutorial will not be published until its controls and steps are supported by those captures.

## Phase 1 — Build the verified source-to-AmmarAI map
- Inventory the AmmarAI tool catalogue, current public URLs, retired redirects, and related platform features.
- Inventory relevant end-user reference tutorials without copying their text or page structure.
- Create an internal mapping for every candidate: reference feature, AmmarAI equivalent, AmmarAI URL, evidence supplied, supported options, image needs, tutorial decision, and exclusion reason.
- Use a strict evidence rule:
  - **Include** only when the feature exists in both products and the AmmarAI workflow is shown in supplied captures.
  - **Narrow** when AmmarAI supports only part of the reference workflow.
  - **Exclude** unsupported, unverified, administrator-only, or source-only functionality.
- Start capture verification with the most complex candidates—agents, chatbots, CRM/inbox, social publishing, video editing/dubbing/publishing, avatars, and integrations—before simpler text/image/audio tools.

## Phase 2 — Create the documentation experience
- Add a dedicated `/tutorials` section with:
  - an overview page grouped into Getting Started and verified tool categories;
  - searchable tutorial titles, summaries, categories, and keywords;
  - a desktop sidebar and compact mobile category/navigation control;
  - breadcrumbs and clear empty/no-results states.
- Add an individual `/tutorials/$slug` page with:
  - one H1, concise introduction, what it does, when to use it, numbered workflow, verified settings, examples, tips, and genuine limitations;
  - a sticky table of contents for longer guides;
  - callouts for tips, notes, and warnings;
  - previous/next navigation and related tutorials;
  - a prominent **Try in AmmarAI** link to the corresponding real tool page/workspace destination.
- Match the existing light Neo-Swiss Editorial design, typography, semantic colors, buttons, borders, spacing, header, and footer. Avoid a generic documentation-template appearance.
- Add Tutorials to visible site navigation without creating broken links.

## Phase 3 — Write original AmmarAI tutorials
- Write each guide from scratch in AmmarAI terminology and around the captured AmmarAI interface.
- Use the reference only to understand concepts and possible workflows; do not copy wording, paragraph order, headings, or source-specific framing.
- Keep instructions end-user-only. Exclude administrator configuration, installation, deployment, backend setup, provider/API-key configuration, and system settings—even when the reference mixes them into a user article.
- Prefer concise procedures, useful option tables, realistic examples, and honest limitations over artificial length.
- Link each guide to verified related AmmarAI tools and tutorials only.
- Add an editorial safeguard that blocks source-product names from tutorial content.

## Phase 4 — Produce truthful instructional images
- Use the supplied AmmarAI captures as the visual source of truth.
- Crop, resize, sharpen, redact personal details, and add restrained numbered highlights where helpful.
- Use consistent image dimensions and descriptive alt text.
- Do not reuse source screenshots, preserve source branding/avatars, fabricate controls, or show administrator/setup screens.
- If a needed AmmarAI state is not captured, omit the image or request that specific capture rather than inventing it.

## Phase 5 — SEO and discovery
- Give every tutorial a unique title, meta description, Open Graph title/description, canonical URL, and logical H2/H3 structure.
- Add `BreadcrumbList` and appropriate `HowTo` structured data only where the page genuinely contains a procedural workflow.
- Include all tutorial URLs in the XML sitemap and add a Tutorials section to `llms.txt`.
- Add contextual tutorial links from corresponding AmmarAI tool pages where a verified guide exists.

## Phase 6 — Quality assurance
- Automatically verify that every tutorial’s tool slug and internal link resolves to a real AmmarAI page.
- Scan published tutorial text and image metadata for forbidden source branding and administrator/setup terminology.
- Check search, category navigation, breadcrumbs, table-of-contents jumps, previous/next controls, and Try in AmmarAI links.
- Test representative and longest tutorials on mobile and desktop for overflow, readable tables/images, keyboard navigation, focus states, reduced motion, and accessible labels.
- Confirm each content route has complete, unique metadata and no broken image alt text.

## Technical implementation
- Use TanStack routes matching the project convention: `tutorials.tsx` as the layout, `tutorials.index.tsx` for `/tutorials`, and `tutorials.$slug.tsx` for `/tutorials/$slug`; the parent layout always renders `<Outlet />`.
- Store tutorials in a typed, maintainable content model with categories, sections, steps, callouts, screenshots, tool links, related tutorials, and SEO fields.
- Keep documentation search client-side and lightweight; no database or product-business-logic changes are required.
- Extend the existing sitemap generator for dynamic tutorial slugs and reuse the existing Breadcrumbs, Button, Container, Section, and semantic design tokens.
- Record the multi-stage implementation and capture dependencies in the project roadmap.

## Capture handoff needed during implementation
For each candidate tutorial, provide a short sequence showing: tool entry point, initial screen, every user-facing field/menu, one completed input, processing state if relevant, final output, export/share actions, and any user-visible limit or error. Captures may be screenshots or a screen recording; personal/account data will be removed from published images.

## Completion standard
The collection is complete only for the verified overlap set. Unverified or unsupported candidates remain excluded rather than being filled with assumptions.
