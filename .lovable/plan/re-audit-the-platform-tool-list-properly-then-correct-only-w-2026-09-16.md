# Re-audit the platform tool list properly, then correct only what's wrong

You're right to push back. My last comparison was based on the short card text captured from the platform's tool list, not on each tool's full description. AI Video Pro is the clearest example: the card text I had did not mention image-to-video, so I reported a conflict that may not exist. Before changing a single word on the site, I'll recapture the source properly.

## Step 1 — Capture the platform's own wording in full

Sign in, open the tool list, and for every entry record: exact name, category, the full description text (opened detail view, not just the card), and any listed capabilities or sub-features. Save the raw capture to a file so every later claim can be traced back to it rather than to memory.

## Step 2 — Compare line by line, with evidence

For each of the 150 public pages, place the platform's captured text next to our page's summary, lede, "what you can do" list and capabilities. Classify each into:

- **Conflict** — our page states something the platform text contradicts.
- **Gap** — the platform states a capability our page omits.
- **Match** — no action.

Nothing gets classified from memory or inference. If the captured text is silent on a point, that is recorded as "not stated", not as "the platform doesn't do it" — tutorials and the platform's own feature list stay authoritative where they disagree with a short marketing blurb.

## Step 3 — Report before changing anything

You get a table: tool, what our page says, what the platform says, and the exact proposed wording change. No edits until you approve that table. I'll explicitly re-check the ten I flagged last time — AI Video Pro, AI Marketing Bot, AI Video to Video, AI Personas, AI Fashion Studio, AI Photoshoot, AI Writer, AI Image Pro, AI Chat Pro, AI Social Media Publisher — and say for each whether the earlier claim held up.

## Step 4 — Apply approved corrections only

Edits stay inside the tool records in `src/data/tools-*.ts` (summary, lede, canDo, how, capabilities). No renames, no slug or URL changes, no design changes, no tutorial changes.

## Technical notes

- Capture with Playwright against the live app using the supplied login; each entry's detail panel opened so the full description is read, not the truncated card. Raw output written to `/tmp/marketplace-audit/entries.json` plus screenshots for anything ambiguous.
- Comparison done programmatically: join captured entries to tool records by normalised name and slug, emit a diff table to `/tmp/marketplace-audit/report.md`.
- Verification after approved edits: `bunx tsgo --noEmit`, build check, Playwright pass at 1440 and 390 px on every edited page (200, single H1, no overflow, no console errors).
- Tutorials, tutorial data, routes and images untouched — tutorial changes will be 0.
