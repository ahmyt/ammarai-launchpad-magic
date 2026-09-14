# Blog content strategy: audit and content map first

## What you get in this round

No articles are written and nothing existing is changed. The output is one document — a full audit of every article on the blog today plus a prioritized map of what to add — saved as `docs/blog-content-strategy.md` and summarized in chat.

## Current state (verified)

- 10 hand-written guides in `src/data/posts.ts` (content creation, blog writing, AI video, voiceovers, rewriting, AI SEO, small business, marketers, productivity, prompting).
- 19 articles in the database: roughly half synced from BabyLoveGrowth, half written by the daily writer.
- Categories for synced articles are guessed from their wording, not stored — so the blog has no reliable category system yet.
- Zero commercial pages: no "best AI tools" articles, no competitor comparisons, no alternatives pages, no "how to do X with AmmarAI" tutorials.

## The audit document

**Part 1 — Existing article map.** One row per article (29 total) with: title, real category, search intent, current role, a Keep / Improve / Merge decision, and the specific internal links it should gain once commercial pages exist. Nothing is marked for deletion.

**Part 2 — Gap analysis.** Which of the target clusters (AI Writing, Video, Image, Voice, Marketing, Automation, Agents, SEO, Content Creation) have coverage and which are empty, plus overlap flags so no new article competes with an existing one.

**Part 3 — Prioritized roadmap.** Clustered, not a flat list. Each planned article gets: working title, cluster, type (guide / best-of / comparison / alternatives / tutorial), target search intent, real search-demand and difficulty figures pulled from live keyword data, the AmmarAI tool and feature pages it links to, and a priority tier. Sequenced so pillar pages land before their supporting pages.

**Part 4 — Content mix tracker.** Current split vs the 30/30/25/15 target, and the publishing order that closes the gap without touching existing posts.

**Part 5 — Competitor shortlist.** Which comparisons are legitimate (Jasper, Copy.ai, Writesonic, Rytr, MagicAI, Canva AI, ChatGPT for content) and which to skip. Competitor pricing and features get looked up live and date-stamped in each article when written, with an honest "where the competitor is stronger" section required in every one.

**Part 6 — Category and navigation design.** The category set to adopt, how it maps onto existing articles, where categories get stored so both hand-written and automatic articles carry a real one, and the filter row design for `/blog` — all within the existing look, all inside `/blog` (no new top-level sections).

**Part 7 — Daily writer brief.** The rules the automatic writer will follow going forward: the topic queue drawn from the roadmap, the article type rotation that holds the 30/30/25/15 mix, the required structure (answer-first opening, comparison tables, FAQs, pros/cons, "best for"), banned filler phrasing, and the internal-link requirement per article.

## Phases after you approve the map

1. Category system + `/blog` filter navigation.
2. Cluster 1 pillar and supporting articles (which cluster goes first is decided by the roadmap's demand data).
3. Retrain the daily writer against the brief.
4. Remaining clusters, in priority order.

## Technical notes

- Audit work is read-only: existing posts, database rows, tools, features, sitemap and `llms.txt` are inspected, not modified.
- Search demand and difficulty figures come from live keyword and SERP data, not estimates; anything unavailable is marked unknown rather than guessed.
- Categories will need a stored field on articles so the derived-keyword guesswork in `src/lib/articles.ts` stops being the source of truth — proposed in Part 6, implemented only after approval.
