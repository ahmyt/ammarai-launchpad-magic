// The daily writer's topic queue, in the priority order set out in
// docs/blog-content-strategy.md (Part 3). The writer works down this list and
// skips anything already published, instead of picking a tool at random.

export type BlogContentType = "guide" | "best-of" | "comparison" | "alternatives" | "tutorial" | "use-case";

export interface BlogTopic {
  /** Stable id, stored as external_id `daily:topic:<id>`. */
  id: string;
  /** Working title; the model may refine it but must keep the keyword. */
  workingTitle: string;
  contentType: BlogContentType;
  category: string;
  primaryKeyword: string;
  /** Monthly search volume for the primary keyword, if known. */
  volume?: number;
  difficulty?: number;
  /** Site paths this article must link to, with natural anchors. */
  links: string[];
  /** Cluster key used to pick a sibling article to link to. */
  cluster: string;
  /** What the article has to cover, in the writer's own words. */
  brief: string;
}

export const BLOG_TOPICS: BlogTopic[] = [
  // ---- Tier P1 (writing cluster already published as hand-written pages) ----
  {
    id: "best-ai-video-generators",
    workingTitle: "Best AI Video Generators",
    contentType: "best-of",
    category: "AI Video",
    primaryKeyword: "best ai video generator",
    volume: 14800,
    difficulty: 61,
    links: ["/ai-video-pro", "/ai-text-to-video", "/ai-video-editor"],
    cluster: "video",
    brief:
      "Category page comparing the leading AI video generators by output quality, length limits, avatars, editing and price. Include an evaluation-criteria section, a comparison table, a 'best for' line per tool and an Our Pick verdict split by user type.",
  },
  {
    id: "best-ai-image-generators",
    workingTitle: "Best AI Image Generators",
    contentType: "best-of",
    category: "AI Image",
    primaryKeyword: "best ai image generator",
    volume: 27100,
    difficulty: 55,
    links: ["/ai-image-pro", "/ai-image-editor", "/ai-product-photoshoot"],
    cluster: "image",
    brief:
      "Category page on AI image generators: photoreal quality, text rendering, editing and commercial licensing. Comparison table near the top, honest notes on where each is weak, and a verdict by use case.",
  },
  {
    id: "best-ai-marketing-tools",
    workingTitle: "Best AI Marketing Tools",
    contentType: "best-of",
    category: "AI Marketing",
    primaryKeyword: "best ai marketing tools",
    volume: 1300,
    difficulty: 40,
    links: ["/ai-marketing-bot", "/ai-ad-copy-generator", "/ai-social-media-agent"],
    cluster: "marketing",
    brief:
      "Category page grouped by marketing job (campaign planning, ad copy, social, email, analytics) with a comparison table and a pick per job rather than one overall winner.",
  },

  // ---- Tier P2 ----
  {
    id: "best-ai-tools-small-business",
    workingTitle: "Best AI Tools for Small Businesses",
    contentType: "best-of",
    category: "AI for Business",
    primaryKeyword: "best ai tools for small business",
    volume: 880,
    difficulty: 52,
    links: ["/ai-writer", "/ai-crm", "/pricing"],
    cluster: "business",
    brief:
      "Practical picks for owner-operated businesses on a tight budget. Organise by task, include real list prices with a check date, and be explicit about what a small team can skip.",
  },
  {
    id: "best-ai-workflow-automation-tools",
    workingTitle: "Best AI Workflow Automation Tools",
    contentType: "best-of",
    category: "AI Automation",
    primaryKeyword: "ai workflow automation tools",
    volume: 880,
    difficulty: 62,
    links: ["/ai-agent-builder", "/ai-smart-inbox", "/ai-crm"],
    cluster: "automation",
    brief:
      "Compare automation platforms and AI agent builders. Explain trigger/action automation versus agentic automation, then a table, then a verdict by team size.",
  },
  {
    id: "best-ai-content-creation-tools",
    workingTitle: "Best AI Content Creation Tools",
    contentType: "best-of",
    category: "AI for Content Creators",
    primaryKeyword: "ai content creation tools",
    volume: 1900,
    difficulty: 55,
    links: ["/ai-writer", "/ai-video-pro", "/ai-image-pro"],
    cluster: "content",
    brief:
      "Cover the whole content pipeline: idea, script, draft, visuals, video, repurposing. Table by stage, and a section on where stitching several point tools costs more than one workspace.",
  },
  {
    id: "best-ai-music-generators",
    workingTitle: "Best AI Music Generators",
    contentType: "best-of",
    category: "AI Audio",
    primaryKeyword: "best ai music generator",
    volume: 2900,
    difficulty: 69,
    links: ["/ai-music-pro", "/ai-voice-generator"],
    cluster: "audio",
    brief:
      "Compare music generators on output length, stems, vocals, and above all commercial licensing terms. Be precise about what each licence actually permits.",
  },
  {
    id: "best-ai-voice-generators",
    workingTitle: "Best AI Voice Generators",
    contentType: "best-of",
    category: "AI Voice",
    primaryKeyword: "best ai voice generator",
    volume: 1900,
    difficulty: 68,
    links: ["/ai-voice-generator", "/ai-dubbing", "/ai-voice-isolator"],
    cluster: "audio",
    brief:
      "Compare text-to-speech quality, language coverage, voice cloning rules and consent requirements. Table plus a 'best for' per voice job.",
  },
  {
    id: "best-ai-tools-for-seo",
    workingTitle: "Best AI Tools for SEO",
    contentType: "best-of",
    category: "AI SEO",
    primaryKeyword: "best ai tools for seo",
    volume: 590,
    difficulty: 55,
    links: ["/ai-seo-analyzer", "/ai-writer", "/blog/ai-seo-guide"],
    cluster: "seo",
    brief:
      "Split by SEO job: research, briefs, drafting, on-page audits, internal linking. Say plainly which jobs AI should not own.",
  },
  {
    id: "best-all-in-one-ai-platforms",
    workingTitle: "Best All-in-One AI Platforms",
    contentType: "best-of",
    category: "AI Tools",
    primaryKeyword: "all in one ai platform",
    volume: 320,
    difficulty: 38,
    links: ["/ai-tools", "/pricing", "/features"],
    cluster: "platform",
    brief:
      "Compare bundled platforms against buying point tools. Include a subscription-stack cost table and be honest that specialists still beat bundles on individual features.",
  },
  {
    id: "chatgpt-alternatives-content",
    workingTitle: "ChatGPT Alternatives for Content Creation",
    contentType: "alternatives",
    category: "AI Alternatives",
    primaryKeyword: "chatgpt alternatives",
    volume: 5400,
    difficulty: 64,
    links: ["/ai-chat-pro", "/ai-writer", "/ai-models"],
    cluster: "writing",
    brief:
      "Written for people who like ChatGPT but need brand voice, templates and multi-format output. Must include a section on where ChatGPT remains stronger.",
  },
  {
    id: "ammarai-vs-jasper",
    workingTitle: "AmmarAI vs Jasper",
    contentType: "comparison",
    category: "AI Comparisons",
    primaryKeyword: "ammarai vs jasper",
    difficulty: 38,
    links: ["/ai-writer", "/pricing", "/blog/jasper-ai-alternatives"],
    cluster: "writing",
    brief:
      "Head-to-head on brand voice, templates, media generation, team features and price. Quote only list prices with a visible check date, and name the cases where Jasper is the better buy.",
  },
  {
    id: "how-to-repurpose-content",
    workingTitle: "How to Repurpose Content With AmmarAI",
    contentType: "use-case",
    category: "AI for Content Creators",
    primaryKeyword: "ai content repurposing",
    volume: 390,
    difficulty: 31,
    links: ["/ai-writer", "/ai-social-media-agent", "/ai-text-to-video"],
    cluster: "content",
    brief:
      "Genuine step-by-step tutorial turning one long article into social posts, a newsletter and a short video, with the exact tools and the order to use them in.",
  },
  {
    id: "ai-agents-business-automation",
    workingTitle: "AI Agents for Business Automation",
    contentType: "use-case",
    category: "AI Agents",
    primaryKeyword: "ai agents for business automation",
    volume: 90,
    difficulty: 1,
    links: ["/ai-agent-builder", "/ai-phone-call-agents", "/ai-crm"],
    cluster: "automation",
    brief:
      "What an AI agent actually automates in a small business, three worked examples, and the setup steps. Be clear about the tasks agents still get wrong.",
  },

  // ---- Tier P3 ----
  {
    id: "best-ai-tools-content-creators",
    workingTitle: "Best AI Tools for Content Creators",
    contentType: "best-of",
    category: "AI for Content Creators",
    primaryKeyword: "best ai tools for content creators",
    volume: 110,
    difficulty: 30,
    links: ["/ai-ugc-generator", "/ai-captions", "/ai-video-editor"],
    cluster: "content",
    brief: "Creator-first picks: shorts, captions, thumbnails, voiceovers, repurposing. Table plus a starter stack.",
  },
  {
    id: "best-ai-tools-agencies",
    workingTitle: "Best AI Tools for Agencies",
    contentType: "best-of",
    category: "AI for Agencies",
    primaryKeyword: "best ai tools for agencies",
    volume: 20,
    difficulty: 0,
    links: ["/ai-writer", "/ai-marketing-bot", "/pricing"],
    cluster: "marketing",
    brief: "Multi-client angle: brand voices, seats, approvals, white-label limits. Honest about per-seat costs.",
  },
  {
    id: "best-ai-tools-youtube",
    workingTitle: "Best AI Tools for YouTube",
    contentType: "best-of",
    category: "AI Video",
    primaryKeyword: "best ai tools for youtube",
    volume: 30,
    difficulty: 43,
    links: ["/ai-youtube-publishing", "/ai-captions", "/ai-video-editor"],
    cluster: "video",
    brief: "Scripting, editing, captions, thumbnails, publishing. Note YouTube's disclosure rules for synthetic media.",
  },
  {
    id: "best-ai-agent-platforms",
    workingTitle: "Best AI Agent Platforms",
    contentType: "best-of",
    category: "AI Agents",
    primaryKeyword: "best ai agent platforms",
    volume: 70,
    difficulty: 40,
    links: ["/ai-agent-builder", "/ai-smart-inbox", "/ai-models"],
    cluster: "automation",
    brief: "Compare agent builders on tools, memory, handoff, monitoring and pricing model.",
  },
  {
    id: "best-ai-tools-social-media",
    workingTitle: "Best AI Tools for Social Media",
    contentType: "best-of",
    category: "AI Marketing",
    primaryKeyword: "best ai tools for social media",
    volume: 140,
    difficulty: 34,
    links: ["/ai-social-media-agent", "/ai-image-pro", "/ai-captions"],
    cluster: "marketing",
    brief: "Planning, writing, visuals, scheduling. Table by platform need, verdict by team size.",
  },
  {
    id: "ai-video-workflow",
    workingTitle: "An AI Video Workflow That Actually Ships",
    contentType: "use-case",
    category: "AI Video",
    primaryKeyword: "ai video workflow",
    volume: 50,
    difficulty: 18,
    links: ["/ai-video-pro", "/ai-video-editor", "/ai-captions"],
    cluster: "video",
    brief: "End-to-end tutorial from brief to published cut, with the review steps that stop bad output going live.",
  },
  {
    id: "ai-brand-voice",
    workingTitle: "How to Set Up an AI Brand Voice",
    contentType: "use-case",
    category: "AI Writing",
    primaryKeyword: "ai brand voice",
    volume: 40,
    difficulty: 24,
    links: ["/ai-writer", "/ai-personas"],
    cluster: "writing",
    brief: "Tutorial: gather source copy, define the voice, test it, and correct drift over time.",
  },
];

/**
 * A repeating 20-article cycle that holds the 30/30/25/15 content mix:
 * 6 informational, 6 commercial, 5 comparison/alternatives, 3 use-case.
 */
export const TYPE_ROTATION: ("informational" | "best-of" | "versus" | "use-case")[] = [
  "best-of",
  "informational",
  "versus",
  "best-of",
  "informational",
  "use-case",
  "best-of",
  "versus",
  "informational",
  "best-of",
  "use-case",
  "informational",
  "versus",
  "best-of",
  "informational",
  "versus",
  "use-case",
  "best-of",
  "informational",
  "versus",
];

export function bucketOf(topic: BlogTopic): "informational" | "best-of" | "versus" | "use-case" {
  if (topic.contentType === "best-of") return "best-of";
  if (topic.contentType === "comparison" || topic.contentType === "alternatives") return "versus";
  if (topic.contentType === "use-case" || topic.contentType === "tutorial") return "use-case";
  return "informational";
}

/** Openings and phrasing the writer may never use. */
export const BANNED_PHRASES = [
  "In today's rapidly evolving digital landscape",
  "In today's fast-paced world",
  "AI is revolutionizing",
  "AI is transforming the way",
  "Whether you're a beginner or an expert",
  "Look no further",
  "Unlock the power of",
  "game-changer",
  "In conclusion",
];
