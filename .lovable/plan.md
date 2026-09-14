# AI agents: fill the two gaps, and make the samples show the whole flow

## What is already there

From the Magic AI audit, the automation side of the platform is mostly built. These pages exist
today with working step-by-step samples:

- AI Agent Builder
- Phone Call Agents
- Social Media Agent
- Blogger Agent
- AI CRM
- Smart Inbox
- Marketing Bot, External Chatbot

## What is missing

Two automation capabilities from the Magic AI list never got a page:

1. **DM & Comment Agent** — auto-replies to Instagram, Facebook and YouTube comments and DMs,
   lead capture, campaign promotion.
2. **AI Deep Research** — multi-source research runs with live web search.

Both get a full page in the same shape as the other agent pages, so each one automatically
appears in the directory, in search, and with FAQs and related links.

## The new animated sample

Right now the agent samples are a tidy list of steps that fade in. They read like a log, not like
a flow. Replacing that with an animated flow that plays out in three acts:

```text
  ACT 1 — the prompt            ACT 2 — the connectors        ACT 3 — the result
  ┌──────────────────┐          ┌────┐ ┌────┐ ┌────┐          ┌──────────────────┐
  │ typing cursor…   │  ─────▶  │Gmail│ │ IG │ │Slack│  ─────▶ │ finished output  │
  └──────────────────┘          └────┘ └────┘ └────┘          └──────────────────┘
                                 each lights up in turn
```

1. The person's instruction types itself into a prompt box.
2. A row of connector tiles appears — Gmail, Instagram, TikTok, WhatsApp, Slack, Telegram,
   Calendar, WordPress, whichever the agent actually uses. Each tile lights up in turn as the
   agent reaches it, with a one-line note of what it did there and a connecting line drawn
   between them.
3. The final result lands in a panel at the end — the posted message, the booked appointment,
   the published article — with a short summary line.

The whole thing loops, respects the pause button that is already on every sample, and falls back
to a plain readable list for anyone who has reduced motion turned on. Connector marks are drawn
as simple monochrome glyphs in the site's own style, not copied brand logos.

Every agent page gets its flow written for what that agent really does: the builder reads Gmail
and posts to Slack, the social agent posts to Instagram and TikTok, the blogger agent publishes
to WordPress, the phone agent rings a number and writes to the calendar and CRM, the DM agent
answers an Instagram comment, deep research reads live sources.

## Technical notes

- Two new entries in `src/data/tools-agents.ts` (`ai-dm-comment-agent`, `ai-deep-research`) in
  the existing `Tool` shape, with keyword entries in `src/data/tool-keywords.ts`.
- `ToolDemoScene` in `src/data/tool-demos.ts` gains an optional `connectors` array
  (`{ id, label, note }`) and each step an optional `connector` id, so a step can light a tile.
  Existing scenes keep working untouched.
- `AnimatedExample.tsx`: the `scene` branch becomes a three-stage flow — prompt, connector rail,
  result panel — driven by the existing `revealed` counter and phase timing, with a small
  inline icon set for the connector glyphs. Reduced-motion path renders the same content
  statically.
- New scene data for all eight agent/CRM pages; styles added alongside the existing
  `.site-demo` rules in `src/styles.css`. No database, API or auth changes.
