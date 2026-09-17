# AmmarAI blog: content audit and strategy map

Prepared 14 September 2026; keyword coverage refreshed 17 September 2026. No existing article was removed.

Sources: `src/data/posts.ts` (10 hand-written guides), the `syndicated_articles` table (19 live rows), and the public tool catalogue for internal-link targets. Original roadmap figures are US Semrush data pulled on 14 Sep 2026; new and updated tool figures were refreshed on 17 Sep 2026. Missing data means unknown, never zero.

---

## Part 1 — Existing article map

### A. Hand-written guides (`src/data/posts.ts`)

| # | Article | Category | Search intent | Current role | Decision | Internal links to add |
|---|---|---|---|---|---|---|
| 1 | How to Use AI for Content Creation (Without Losing Your Voice) | AI Writing | Informational, how-to | Top-of-funnel entry for content teams | Keep, improve | Best AI Content Creation Tools; Best AI Writing Tools; brand-voice feature |
| 2 | How to Write a Blog Post With AI (Step by Step) | AI Writing | Informational, process | Strongest writing-cluster guide | Keep, improve | Best AI Tools for Blog Writing; Jasper Alternatives; AI Writer tool page |
| 3 | How to Create AI Videos: A Realistic Production Guide | AI Video | Informational, how-to (1,900/mo, difficulty 70) | Video-cluster anchor | Keep, improve | Best AI Video Generators (pillar); AI Video Pro; AI Video Editor |
| 4 | How to Generate AI Voiceovers That Don't Sound Robotic | AI Voice | Informational, quality/how-to | Only voice article | Keep, improve | Best AI Voice Generators; AI Dubbing; text-to-speech tool page |
| 5 | How to Rewrite Content With AI Without Making It Worse | AI Writing | Informational, task | Supporting writing article | Keep | Best AI Writing Tools; AI Rewriter templates |
| 6 | How to Use AI for SEO Without Getting Penalized for Thin Content | AI SEO | Informational, risk-aware | SEO-cluster anchor | Keep, improve | Best AI Tools for SEO; AI SEO Analyzer; AI internal-linking article |
| 7 | AI Tools for Small Businesses: Where the Real ROI Is | AI for Business | Commercial-adjacent (880/mo on the "best" variant) | Closest thing to a commercial page today | **Improve** — add criteria, comparison table, "best for" | Best AI Tools for Small Businesses (new pillar), pricing page |
| 8 | AI Tools for Marketers: What to Automate and What to Keep Human | AI Marketing | Commercial-adjacent | Same as above for marketers | **Improve** — same treatment | Best AI Marketing Tools; How Marketers Can Use AmmarAI |
| 9 | AI Productivity Workflows That Actually Save Time | AI Productivity | Informational, workflow | Broad-appeal guide | Keep | AI Workflow Automation Tools; AI agents cluster |
| 10 | How to Write Better AI Prompts: A Practical Framework | AI Guides | Informational, skill | Evergreen, links widely | Keep | AI Personas article; Chat Pro tool page |

### B. Database articles (19 rows)

Daily-writer articles (`daily:*`) — product-led by nature, currently the closest thing to use-case content:

| Article | Category | Intent | Decision | Notes |
|---|---|---|---|---|
| Ad Copy Generator for Video, Audio, and Social | AI Marketing | Tool-led | Keep | Link to Best AI Marketing Tools |
| Realtime Voice Chat: Talk Naturally With AI | AI Voice | Tool-led | Keep | Link to voice cluster |
| AMA Post Generator: Launch Better Q&A Sessions | AI Social Media | Tool-led, thin demand | Keep | Low priority for links |
| Marketing Plan Generator: Build a Practical Strategy | AI Marketing | Tool-led | Keep, improve | Merge candidate with "Marketing Teams: 7-Day Sprint to 90-Day Plan" — see overlap flags |
| AI Dubbing: Localise Videos with AmmarAI | AI Video | Product use-case | Keep | Already the right shape for the 15% bucket |
| AI Personas: Reuse Your Best AI Instructions | AI Productivity | Product use-case | Keep | Link from prompts guide |
| YouTube Shorts Publisher: Package and Schedule | AI Video | Product use-case | Keep | Link to Best AI Tools for YouTube |
| AI Event Planner: Build a Practical Event Plan | AI Productivity | Tool-led, off-core | Keep | No link priority |

BabyLoveGrowth synced articles — mostly B2B informational:

| Article | Category | Intent | Decision |
|---|---|---|---|
| Cut Your Editing Time in 5 Steps with AI Video Editing | AI Video | Informational | Keep, improve — link to video pillar |
| 6–8 Week AI Market Research Pilot | AI for Business | Informational | Keep |
| Podcasters: Turn Transcripts into 3 Social Clips | AI Audio | Use-case | Keep — link to repurposing cluster |
| Try 3 Quick Trials to Vet AI Proposal Writing | AI for Business | Informational | Keep |
| Skip Copy Paste: AI Email Writing with Ready Prompts | AI Writing | Informational | Keep |
| One Page Tone of Voice Guide | AI Marketing | Informational | Keep — links to brand-voice feature |
| 8-Step AI Workflow Automation Pilot | AI Automation | Informational (880/mo on the commercial variant) | Keep, improve — link to Best AI Workflow Automation Tools |
| Marketing Teams: 7-Day Sprint to 90-Day AI Marketing Plan | AI Marketing | Informational | **Merge candidate** with Marketing Plan Generator |
| Avoid Risky Site Edits: AI Internal Linking for SEO Teams | AI SEO | Informational | Keep |
| Small Business: 5 Social Media Automation Categories | AI Social Media | Informational | Keep, improve |
| Knowledge Base AI: 95% Publish Ready Content | AI Writing | Informational | Keep |

**Overlap flags (do not create duplicates of these):** marketing planning is covered twice — keep the daily-writer version as the tool page and reframe the synced sprint article as the process guide, cross-linked. Small-business AI is covered once (article 7) — the new "Best AI Tools for Small Businesses" must take the comparison intent, not repeat the ROI angle.

---

## Part 2 — Gap analysis

| Cluster | Informational | Commercial | Comparison | Use-case | Verdict |
|---|---|---|---|---|---|
| AI Writing | 5 | 0 | 0 | 0 | Strong base, no commercial capture |
| AI Video | 3 | 0 | 0 | 2 | Pillar missing on the highest-volume term |
| AI Image | 0 | 0 | 0 | 0 | **Empty** — 27,100/mo term untouched |
| AI Voice | 1 | 0 | 0 | 2 | Pillar missing |
| AI Marketing | 4 | 0 | 0 | 1 | Highest CPC cluster, no commercial page |
| AI SEO | 2 | 0 | 0 | 0 | Pillar missing |
| AI Automation | 1 | 0 | 0 | 0 | Near-empty |
| AI Agents | 0 | 0 | 0 | 0 | **Empty** despite AI Agent Builder being a flagship |
| AI Content Creation | 2 | 0 | 0 | 0 | Pillar missing |
| Comparisons / Alternatives | 0 | 0 | **0** | 0 | **Entirely absent — biggest gap** |

---

## Part 3 — Prioritized roadmap

Priority tiers: **P1** ship first, **P2** next, **P3** once the clusters are established.

### Tier P1 — highest commercial return per effort

| Article | Type | Cluster | Target term | Volume | Difficulty | Links to |
|---|---|---|---|---|---|---|
| Best AI Video Generators | Best-of pillar | Video | best ai video generator | 14,800/mo | 61 | AI Video Pro, Text-to-Video, Video Editor, How to Create AI Videos |
| Best AI Image Generators | Best-of pillar | Image | best ai image generator | 27,100/mo | 55 | Image Pro, AI Image Editor, Product Photoshoot |
| Jasper Alternatives | Alternatives | Writing | jasper alternatives | 260/mo | **26** | AI Writer, pricing, Best AI Writing Tools |
| Writesonic Alternatives | Alternatives | Writing | writesonic alternatives | 260/mo | **16** | AI Writer, blog-writing guide |
| Copy.ai Alternatives | Alternatives | Writing | copy.ai alternatives | 170/mo | **16** | AI Writer, templates |
| Rytr Alternatives | Alternatives | Writing | rytr alternatives | 110/mo | **15** | AI Writer, pricing |
| Best AI Writing Tools | Best-of pillar | Writing | best ai writing tools | 1,300/mo | 46 | AI Writer, templates, all four alternatives pages |
| Best AI Marketing Tools | Best-of pillar | Marketing | best ai marketing tools | 1,300/mo ($12.77 CPC) | 40 | AI Marketing Bot, Ad Copy, campaign tools |

The four alternatives pages are the single best ratio on the board: real demand, difficulty 15–26, and buyers already shopping. They ship together so they cross-link as a set.

### Tier P2 — cluster completion

| Article | Type | Target term | Volume | Difficulty |
|---|---|---|---|---|
| Best AI Tools for Small Businesses | Best-of | best ai tools for small business | 880/mo | 52 |
| Best AI Workflow Automation Tools | Best-of | ai workflow automation tools | 880/mo ($19.79 CPC) | 62 |
| Best AI Content Creation Tools | Best-of | ai content creation tools | 1,900/mo | 55 |
| Best AI Music Generators | Best-of | best ai music generator | 2,900/mo | 69 |
| Best AI Voice Generators | Best-of | best ai voice generator | 1,900/mo | 68 |
| Best AI Tools for SEO | Best-of | best ai tools for seo | 590/mo ($15.26 CPC) | 55 |
| Best All-in-One AI Platforms | Best-of | all in one ai platform | 320/mo | 38 |
| ChatGPT Alternatives for Content Creation | Alternatives | chatgpt alternatives | 5,400/mo | 64 |
| AmmarAI vs Jasper | Comparison | brand + jasper ai review halo | 590/mo halo | 38 |
| AmmarAI vs Copy.ai / vs Writesonic / vs Rytr | Comparison | low volume, high intent | 10–90/mo | 16–24 |
| How to Repurpose Content With AmmarAI | Use-case | ai content repurposing | 390/mo | 31 |
| AI Agents for Business Automation | Use-case / commercial | ai agents for business automation | 90/mo ($16.08 CPC) | **1** |

### Tier P3 — long tail and authority fill

Best AI Tools for Content Creators (110/mo, 30) · Best AI Tools for Agencies (20/mo, 0) · AI for Agencies guide (110/mo, 24) · Best AI Tools for YouTube (30/mo, 43) · Best AI Agent Platforms (70/mo, 40) · Best AI Tools for Blog Writing (30/mo, 0) · Best AI Tools for Social Media (140/mo, 34) · AI Video Workflow (50/mo, 18) · AI SEO Workflow (20/mo, 0) · AI Brand Voice (40/mo, 24) · the remaining "How to … With AmmarAI" tutorials (social content, marketing videos, voiceovers, full campaign, blog-to-social).

### September 17 tool refresh

The 151-tool catalogue now has complete daily-writer keyword coverage. Six capability-led topics were added without changing the 30/30/25/15 rotation:

| Topic | Intent | Target term | US volume | Difficulty |
|---|---|---|---:|---:|
| Enhance Video Quality With AI | Product tutorial | ai video enhancer | 4,400/mo | 50 |
| Create UGC Videos With AI | Product use-case | ai ugc video generator | 590/mo | 52 |
| AI Blog Automation for WordPress | Automation use-case | ai blog automation | 70/mo | 21 |
| Schedule Social Media Posts With AI | Product tutorial | social media scheduling tool | 1,000/mo | 37 |
| How a Realtime AI Image Generator Works | Informational guide | realtime ai image generator | 170/mo | 38 |
| Keep Brand Voice Consistent With AI | Product tutorial | brand voice ai | 110/mo | 25 |

Keyword records were also added for Viral Clips, AI Council Mode, Content Manager, AI ReWriter, AI Editor and AI Image Assistant. Broad terms were used only when their intent matches the actual tool; unavailable Semrush measurements remain unstated rather than being recorded as zero.

**Skip:** "AI video generator alternatives", "AI writing tool alternatives", "AI marketing automation workflow" — zero measurable demand; the intent is already served by the named-competitor pages. MagicAI and Canva AI have no reliable US data; treat as optional P3 and only if the comparison is honest and substantive.

### Cluster build order

1. **Writing** (4 alternatives + pillar) — fastest wins, feeds every other cluster with links.
2. **Video** (pillar + existing guides + YouTube/marketing tutorials).
3. **Image** (pillar + marketing-images tutorial).
4. **Marketing** (pillar + campaign tutorial + agency angle).
5. **Automation / Agents** (pillar + business-automation use case).
6. **Voice / Audio**, then **SEO**, then **Content Creation** wrap-up.

---

## Part 4 — Content mix tracker

| Bucket | Today (29 articles) | Target | Gap |
|---|---|---|---|
| Informational | 24 (83%) | 30% | Over-weighted — fix by adding, not cutting |
| Commercial / category | 0 (0%) | 30% | ~18 articles needed |
| Comparison / alternatives | 0 (0%) | 25% | ~15 articles needed |
| Product / use-case | 5 (17%) | 15% | roughly on target; grows with the rest |

Reaching the target at the current library size means roughly 45–50 new articles. Publishing order: P1 (8) → P2 (13) → P3 (rest). Existing informational articles continue as the base and only gain links; new informational pieces resume at roughly 1 in 4 once the commercial backlog clears.

---

## Part 5 — Competitor shortlist

**Legitimate comparisons** (real category overlap with AmmarAI):

| Competitor | Overlap | Comparison angle |
|---|---|---|
| Jasper | AI writing + brand voice | All-in-one breadth vs Jasper's marketing-copy depth |
| Copy.ai | AI writing + GTM workflows | Workflow automation vs single-surface generation |
| Writesonic | Writing + SEO | Multi-modal breadth vs SEO-article focus |
| Rytr | Budget writing | Value and scope at a similar price point |
| ChatGPT | General assistant | Purpose-built tools and templates vs a blank chat box |
| MagicAI | All-in-one AI SaaS | Closest direct category match |
| Canva AI | Visual content | Honest: Canva is stronger on design surface |

**Skip:** anything with no product relationship (dev tools, enterprise LLM platforms), and any "AmmarAI vs X" where the only content would be feature bullets.

**Hard rules for every comparison and best-of page:**
- Pricing and feature claims looked up live at writing time and date-stamped visibly ("Pricing checked 14 Sep 2026").
- A required "Where [competitor] is stronger" section — no exceptions.
- No "#1", no invented benchmarks, no fabricated user quotes or statistics.
- Comparison table near the top; FAQs at the bottom; "Which should you choose?" verdict split by user type.
- Competitors listed by real capability, including where they beat AmmarAI.

---

## Part 6 — Category and navigation design

**Category set (18, matching the brief):** AI Tools · AI Writing · AI Video · AI Image · AI Voice · AI Audio · AI Marketing · AI SEO · AI Automation · AI Agents · AI Productivity · AI for Business · AI for Agencies · AI for Content Creators · AI Comparisons · AI Alternatives · AI Tutorials · AI Use Cases.

**Storage change required.** Categories for database articles are currently guessed from wording by `articleCategory()` in `src/lib/articles.ts`, so they drift and can't be filtered reliably. Add a stored `category` column on `syndicated_articles` (plus a `content_type` field: guide / best-of / comparison / alternatives / tutorial / use-case), backfill the 19 existing rows from the map in Part 1, make it editable in the Studio, and keep the keyword guess only as the fallback for rows without a value. Hand-written posts already carry `category`; they gain `content_type` the same way.

**Blog navigation.** A single filter row above the article list on `/blog`, in the existing Neo-Swiss style: All · Guides · Best AI Tools · Comparisons · Alternatives · Tutorials · Use Cases. Six labels, no dropdowns, no sidebar. Topic categories stay as the per-article label that already renders. Category landing pages come later and only for clusters with at least five articles — no thin tag pages.

---

## Part 7 — Daily writer brief

Rules for `src/lib/daily-blog.server.ts` once retraining is approved:

1. **Topic queue** — the writer draws its next topic from this roadmap in priority order instead of picking a tool at random. Topics already published are skipped by slug.
2. **Type rotation** — a repeating 20-article cycle of 6 informational, 6 commercial, 5 comparison/alternatives, 3 use-case, which holds the 30/30/25/15 mix automatically.
3. **Required structure** — H1, a direct answer in the first 60 words, H2/H3 hierarchy, a comparison table wherever two or more options are discussed, pros/cons, a "best for" line per option, FAQs with FAQ schema, and the existing table of contents.
4. **Internal links** — every article must link to at least two AmmarAI tool or feature pages, one existing blog article, and one cluster sibling, using varied natural anchor text (no repeated exact-match anchors).
5. **Banned openings** — "In today's rapidly evolving digital landscape", "AI is revolutionizing", "Whether you're a beginner or an expert", and similar filler. Word count is never a goal.
6. **Honesty constraints** — no invented statistics, customer results, or review quotes; no unverified competitor claims; competitor pricing only with a visible check date.
7. **Type tagging** — the writer sets `category` and `content_type` on every article it creates so the blog filters stay accurate.

---

## Next steps

1. Category storage + `/blog` filter navigation.
2. Writing cluster: four alternatives pages + Best AI Writing Tools pillar.
3. Retrain the daily writer against Part 7.
4. Video and Image pillars, then the remaining clusters in the Part 3 order.
