# Capture tool workflows from the public demo and write the tool tutorials

The demo sign-in page publishes its own demo account (User / user@user.com), so I can
sign in and walk the tools to see the real screens and steps. That unblocks the part of
the tutorial center that was waiting on captures.

## Important caveat

The demo is the reference platform, not AmmarAI. So the demo is used only as evidence of
*how a workflow runs*, never as the content itself:

- A tutorial is written only if the tool also exists in AmmarAI's own tool list.
- Anything the demo shows that AmmarAI doesn't offer is excluded.
- Where the demo differs from AmmarAI (naming, plans, credits, branding), the AmmarAI
  version wins.
- No sentence, heading order, or screenshot is copied. Everything is rewritten and
  re-labelled for AmmarAI.
- No admin, setup, installation or billing-configuration screens.

## Step 1 - Capture pass

Sign in to the demo with the published demo account and walk each tool that matches an
AmmarAI tool, recording: where it sits in the menu, the fields and options on the form,
the order of actions, the result screen, and any limits shown. Screenshots saved as
working reference only.

## Step 2 - Confirm the overlap list

Update `docs/tutorials-map.md` so every candidate row moves from "pending-capture" to
either "verified" (exists in both, workflow observed) or "excluded" (with the reason).
Expected verified set covers writing, chat and assistants, image, video, voice, agents
and automation, and SEO/marketing tools already listed on the AmmarAI site.

## Step 3 - Write the tutorials

For each verified tool, add an entry to `src/data/tutorials.ts` following the existing
Getting Started pattern: short intro, what it does, when to use it, numbered steps,
options and settings, a practical example, tips, limitations, related tools and
tutorials, and the "Try [Tool] in AmmarAI" action at top and bottom.

## Step 4 - Illustrations

Recreate the key screens as clean AmmarAI-branded instructional images rather than
reusing demo screenshots - AmmarAI logo, AmmarAI labels, no reference-product branding,
descriptive alt text on each.

## Step 5 - QA

Check every tutorial link and CTA resolves, scan the whole tutorial set for any
reference-product naming, confirm search, breadcrumbs, prev/next and sidebar work, and
verify desktop and mobile layouts.

## Technical notes

- Content lives in `src/data/tutorials.ts`; routes `tutorials.tsx`,
  `tutorials.index.tsx`, `tutorials.$slug.tsx` are already in place and need no changes.
- New slugs flow automatically into the sitemap and `llms.txt`.
- Tool pages pick up their tutorial link through `tutorialByTool`.
- Captures are stored under a temporary working folder, not committed.
- The live site needs the usual deploy/restart to show the new pages.

## Scope note

This is a large batch. I'll write the tutorials in category groups (writing and chat
first, then image and video, then voice, agents and SEO) so you can review the first
group's tone and depth before I continue.
