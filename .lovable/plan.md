# AmmarAI full-site Neo-Swiss redesign

## Goal
Extend the current homepage’s bold Neo-Swiss editorial system across the entire AmmarAI website. The homepage remains the visual source of truth; content, URLs, data, authentication, forms, CMS behavior, automations, and public review workflows stay unchanged.

## Design direction
- Use the homepage palette everywhere: near-white paper, near-black ink, warm neutral bands, one disciplined ultramarine accent, crisp hairlines, and restrained hard-offset shadows.
- Use Inter for commanding editorial headlines, Space Grotesk for labels and controls, and Inter for readable body copy.
- Replace rounded legacy surfaces with sharper editorial panels, strong grid alignment, decisive section rules, and compact uppercase labels.
- Keep public pages expressive and spacious; keep Studio pages denser and operational while clearly belonging to the same product.
- Preserve accessible contrast, keyboard focus, reduced-motion behavior, and mobile layouts.

## Implementation
1. **Create one global site shell**
   - Promote the homepage tokens into the shared application shell so headers, footers, error states, public pages, authentication, and Studio use one visual language.
   - Refine the shared header and mobile menu to match the homepage’s sharp editorial navigation.
   - Keep the redesigned footer as the universal closing section.

2. **Upgrade shared building blocks**
   - Redesign sections, headings, cards, buttons, breadcrumbs, tool cards, accordions, inputs, tables, badges, and pagination around the Neo-Swiss system.
   - Add reusable page-opening, content-grid, editorial-list, form-panel, data-panel, and final-call-to-action styles rather than duplicating page-specific CSS.
   - Update animated tool demonstrations without changing their playback or media logic.

3. **Redesign all public page families**
   - Directories: AI Tools, Features, Use Cases, Resources, Blog, and AI Models.
   - Detail pages: every tool, template, use case, feature, and blog article.
   - Conversion and information pages: Pricing, About, FAQ, Contact, authentication, error, and not-found states.
   - Give each family a clear hierarchy and proportion while preserving the same visual DNA.

4. **Redesign the AmmarAI Studio**
   - Rework the Studio shell, navigation, overview metrics, content lists, editors, synced articles, messages, reviews, filters, controls, forms, tables, notices, and pagination.
   - Keep existing permissions and all content-management actions unchanged.
   - Prioritize compact scanning and reliable mobile operation over marketing-page drama.

5. **Responsive and interaction quality**
   - Tune wide desktop, tablet, and the current 411px mobile viewport.
   - Verify mobile navigation, search/filter controls, tool demos, pricing, contact/auth forms, FAQ disclosure, article reading, and Studio workflows.
   - Confirm every content route retains unique metadata and that no console, runtime, or build errors remain.

## Technical approach
- Keep the existing semantic OKLCH tokens and introduce a shared Neo-Swiss scope at the application shell.
- Continue using existing design-system components; presentation changes stay in shared components, route markup classes, and `src/styles.css`.
- Use responsive grid constraints and semantic class hooks instead of hardcoded visual colors in page components.
- Do not change database schema, data fetching, API calls, auth logic, automation, or CMS business logic.
