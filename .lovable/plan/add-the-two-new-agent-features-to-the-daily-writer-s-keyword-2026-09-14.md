# Add the two new agent features to the daily writer's keyword-researched topics

## Goal
Make sure the two newest tools — **AI DM & Comment Agent** (`/ai-dm-comment-agent`) and **AI Deep Research** (`/ai-deep-research`) — are picked up by the daily blog writer with their researched keywords, not left to chance.

## Current state
- Both tools already have researched keyword entries in `src/data/tool-keywords.ts` (primary keyword, monthly volume, difficulty, 5 related keywords, 4 questions each).
- The daily writer's fallback ("informational" slots) already reads that file via `getToolKeywords(tool.slug)`, so the new tools *could* be picked — but only after the queued roadmap runs out and in random tool order.
- The curated queue in `src/lib/blog-topics.ts` (which drives ~3 out of every 4 posts and guarantees keyword-led briefs) does **not** contain either tool yet.

## Changes
1. **`src/lib/blog-topics.ts`** — append two queued topics, in priority order at the end of the current list:
   - `ai-dm-comment-agent` — type `guide`, category "AI Agents", primary keyword "ai comment reply agent" (880/mo, difficulty 22), linking to `/ai-dm-comment-agent`, `/smart-inbox`, `/social-media-agent`; brief: practical workflow for automating Instagram/Facebook DMs and YouTube comment replies, lead capture from comments, moderation guardrails.
   - `ai-deep-research` — type `guide`, category "AI Agents", primary keyword "ai deep research" (3600/mo, difficulty 28), linking to `/ai-deep-research`, `/ai-agent-builder`, `/ai-writer`; brief: step-by-step deep-research workflow with live sources and citations, competitor/market research use cases, how to verify cited sources.
2. Both entries follow the existing queue rules: skip-if-published, stable `daily:topic:<id>` external IDs, natural internal links, and the house rules (direct answers, FAQ, no filler) already enforced by the writer prompt.

## Result
The daily writer will schedule both tools as keyword-targeted articles in the normal one-a-day rotation (13:00 UTC), using the researched volumes/difficulty in the prompt. Live publishing requires the usual Plesk redeploy/restart.

## Technical notes
- No database, auth, or API changes.
- Keyword data in `tool-keywords.ts` needs no changes (verified already present at lines 1085 and 1104).
- Verify with `bunx tsgo --noEmit` after the edit.
