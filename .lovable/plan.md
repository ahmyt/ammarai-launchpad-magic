# Align tool pages and tutorials

## Goal
Make every existing tutorial consistent with its matching AmmarAI tool or feature page, so names, capabilities, workflows, links, and related recommendations tell the same story.

## Current findings
- The catalogue contains 140 tools, 10 feature pages, and 40 tutorials.
- The tutorials currently point to 27 distinct tools and one feature page; every primary destination and every related tutorial/tool link resolves.
- Ten tutorial CTA labels do not exactly match their destination page names, including AI URL to Video & Influencer, AI Product Photoshoot, AI UGC Creator, AI Chat Pro, AI Phone Call Agent, and External Chatbot Builder.
- Several tools have multiple tutorials, but their tool page currently shows only the first one.

## Work
1. **Build a complete alignment matrix**
   - Compare all 40 tutorials with the full content of their matching tool or feature page.
   - Check product name, CTA destination, description, supported inputs, controls, outputs, workflow steps, limitations, related tools, and terminology.
   - Separate harmless wording differences from genuine capability conflicts.

2. **Reconcile names and functionality**
   - Standardise tutorial names and CTA labels to the canonical catalogue names.
   - Update tool-page copy when a tutorial documents a verified AmmarAI capability that the page omits.
   - Remove or narrow tutorial claims that are not supported by the matching AmmarAI page or established product catalogue.
   - Keep distinct workflows under shared products clearly labelled, such as viral clips and product-video creation within AI URL to Video & Influencer.

3. **Align navigation both ways**
   - Replace the one-tutorial-per-tool lookup with a one-to-many relationship.
   - Show every relevant tutorial on its matching tool page without duplicating unrelated guides.
   - Preserve feature-page destinations such as Team Workspaces and verify related-tool and related-tutorial links after changes.

4. **Quality assurance**
   - Add an automated catalogue consistency check for missing slugs, duplicate slugs, mismatched canonical names, and broken relationships.
   - Review every affected tool and tutorial page on desktop and mobile.
   - Confirm page metadata, headings, CTAs, images, and internal links remain valid, with no internal editorial notes exposed.

## Scope
This aligns the 40 existing tutorials with their corresponding catalogue pages. It does not create tutorials for the other 113 tools that currently have no tutorial.

## Technical details
Likely changes will be limited to the tool/tutorial data files, the tutorial lookup helper, tool-page tutorial rendering, and a focused consistency test. AmmarAI's established product catalogue and verified end-user functionality will be the authority when resolving conflicts.
