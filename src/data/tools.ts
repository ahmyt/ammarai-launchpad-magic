import type { Tool, ToolCategory } from "./types";
import { coreToolsA } from "./tools-core-a";
import { coreToolsB } from "./tools-core-b";
import { seoAnalyzerTools } from "./tools-seo-analyzer";
import { chatbotTools } from "./tools-chatbots";
import { writingTools } from "./tools-writing";
import { marketingTools } from "./tools-marketing";
import { commerceSeoTools } from "./tools-commerce-seo";
import { platformTools } from "./tools-platform";
import { agentTools } from "./tools-agents";
import { engagementTools } from "./tools-engagement";
import { visualTools } from "./tools-visual";
import { videoTools } from "./tools-video";
import { chatWorkspaceTools } from "./tools-chat";

export const tools: Tool[] = [
  ...agentTools,
  ...chatWorkspaceTools,
  ...engagementTools,
  ...visualTools,
  ...videoTools,
  ...coreToolsA,
  ...coreToolsB,
  ...seoAnalyzerTools,
  ...platformTools,
  ...chatbotTools,
  ...writingTools,
  ...marketingTools,
  ...commerceSeoTools,
];



export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));

export function getTool(slug: string): Tool | undefined {
  return toolBySlug.get(slug);
}

export const categoryOrder: ToolCategory[] = [
  "AI Agents",
  "AI Sales & CRM",
  "AI Writing",
  "AI Chat",


  "AI Marketing",
  "AI SEO",
  "AI Social Media",
  "AI Business",
  "AI E-commerce",
  "AI Email",
  "AI Image",
  "AI Video",
  "AI Voice",
  "AI Audio",
  "AI Transcription",
  "AI Vision",
  "AI Documents",
  "AI Code",
  "AI Education",
  "AI Productivity",
];

export const usedCategories = categoryOrder.filter((c) => tools.some((t) => t.category === c));

export function toolsByCategory(category: ToolCategory) {
  return tools.filter((t) => t.category === category);
}

export const featuredTools = tools.filter((t) => t.featured).slice(0, 7);
export const popularTools = tools.filter((t) => t.popular).slice(0, 8);
export const recentTools = tools.filter((t) => t.recent).slice(0, 6);

/** Frontend-only intent matcher used by the discovery search. No AI backend. */
const intentMap: { keywords: string[]; slugs: string[] }[] = [
  {
    keywords: ["agent", "agents", "automation", "automate", "workflow", "autonomous", "assistant that works"],
    slugs: [
      "ai-agent-builder",
      "ai-social-media-agent",
      "ai-blogger-agent",
      "ai-phone-agent",
      "ai-crm",
    ],
  },
  {
    keywords: ["crm", "pipeline", "deal", "deals", "lead", "leads", "sales", "follow up", "follow-up"],
    slugs: ["ai-crm", "ai-phone-agent", "ai-agent-builder", "ai-email-writer", "ai-chat-bots"],
  },
  {
    keywords: ["phone", "call", "calls", "voice agent", "answering", "receptionist", "booking"],
    slugs: ["ai-phone-agent", "ai-crm", "ai-chat-bots", "ai-voice-generator", "ai-transcription"],
  },

  {
    keywords: ["chatbot", "chat bot", "assistant", "coach", "counselor", "advisor", "expert"],
    slugs: ["ai-chat-bots", "ai-chat", "ai-personas", "ai-writer", "ai-summary-generator"],
  },
  {
    keywords: [
      "chat",
      "chat pro",
      "talk to ai",
      "ask ai",
      "conversation",
      "memory",
      "web search",
      "search the web",
      "switch model",
      "multi model",
      "models",
      "gpt",
      "claude",
      "gemini",
    ],
    slugs: ["ai-chat", "ai-personas", "ai-command-search", "ai-document-analyzer", "ai-writer"],
  },
  {
    keywords: [
      "persona",
      "personas",
      "skill",
      "skills",
      "custom assistant",
      "brand voice",
      "house style",
      "system prompt",
      "reusable prompt",
      "saved prompt",
    ],
    slugs: ["ai-personas", "ai-chat", "ai-chat-bots", "ai-agent-builder", "ai-writer"],
  },
  {
    keywords: [
      "find a tool",
      "which tool",
      "shortcut",
      "command",
      "command bar",
      "quick search",
      "spotlight",
      "search tools",
      "keyboard",
    ],
    slugs: ["ai-command-search", "ai-chat", "ai-personas"],
  },
  {
    keywords: ["social", "ad", "advert", "campaign", "promo"],
    slugs: [
      "facebook-ad-generator",
      "instagram-caption-generator",
      "ai-ad-generator",
      "ai-image-generator",
      "video-script-generator",
    ],
  },
  {
    keywords: ["blog", "article", "post", "write", "essay"],
    slugs: [
      "ai-article-generator",
      "ai-blog-generator",
      "ai-writer",
      "meta-description-generator",
      "ai-blog-title-generator",
    ],
  },
  {
    keywords: [
      "edit video",
      "video edit",
      "video editing",
      "video editor",
      "edit footage",
      "edit my footage",
      "edit clip",
      "trim",
      "recut",
      "re-cut",
      "cut down",
      "timeline",
      "colour grade",
      "color grade",
      "b-roll edit",
      "rough cut",
      "final cut",
    ],
    slugs: ["ai-video-editor", "ai-captions", "ai-video-generator", "ai-dubbing", "ai-image-to-video"],
  },
  {
    keywords: [
      "caption",
      "captions",
      "subtitle",
      "subtitles",
      "subs",
      "srt",
      "vtt",
      "burned in text",
      "on screen text",
      "accessible video",
    ],
    slugs: ["ai-captions", "ai-video-editor", "ai-transcription", "ai-dubbing"],
  },
  {
    keywords: [
      "dub",
      "dubbing",
      "dubbed",
      "translate video",
      "translate my video",
      "another language video",
      "voice clone language",
      "localise video",
      "localize video",
      "lip sync",
    ],
    slugs: ["ai-dubbing", "ai-captions", "ai-voice-generator", "ai-video-editor"],
  },
  {
    keywords: [
      "ugc",
      "ugc ad",
      "creator ad",
      "creator video",
      "influencer video",
      "influencer ad",
      "testimonial video",
      "unboxing",
      "talking head ad",
      "spokesperson",
    ],
    slugs: ["ai-ugc-generator", "ai-avatar-generator", "ai-video-editor", "ai-url-to-video"],
  },
  {
    keywords: [
      "youtube",
      "post to youtube",
      "publish video",
      "upload video",
      "shorts",
      "youtube shorts",
      "schedule video",
      "video seo",
      "thumbnail title description",
    ],
    slugs: ["ai-youtube-publisher", "ai-video-editor", "ai-captions", "youtube-title-generator", "ai-video-generator"],
  },
  {
    keywords: ["video", "reel", "short", "youtube", "tiktok"],
    slugs: [
      "ai-video-generator",
      "ai-video-editor",
      "ai-captions",
      "ai-dubbing",
      "ai-ugc-generator",
      "ai-youtube-publisher",
      "ai-image-to-video",
      "video-script-generator",
      "youtube-title-generator",
    ],
  },

  {
    keywords: ["voice", "voiceover", "narration", "audio", "podcast", "speech"],
    slugs: [
      "ai-voice-generator",
      "ai-text-to-speech",
      "ai-transcription",
      "ai-speech-to-text",
      "video-script-generator",
    ],
  },
  {
    keywords: ["edit photo", "background", "remove object", "retouch", "upscale", "photoshoot", "product photo", "try on", "clothing", "fashion", "mockup", "brand kit", "creative"],
    slugs: [
      "ai-image-editor",
      "ai-photoshoot",
      "ai-virtual-try-on",
      "ai-creative-suite",
      "ai-image-generator",
    ],
  },
  {
    keywords: ["image", "picture", "photo", "visual", "logo", "avatar"],
    slugs: [
      "ai-image-generator",
      "ai-avatar-generator",
      "ai-image-to-video",
      "ai-vision",
      "instagram-caption-generator",
    ],
  },
  {
    keywords: ["product", "shop", "store", "ecommerce", "amazon", "listing"],
    slugs: [
      "ai-product-description-generator",
      "amazon-product-title-generator",
      "product-benefits-generator",
      "product-comparison-generator",
      "ai-image-generator",
    ],
  },
  {
    keywords: ["seo", "keyword", "rank", "search", "meta"],
    slugs: [
      "ai-seo-analyzer",
      "ai-seo-content-generator",
      "meta-description-generator",
      "faq-generator",
      "seo-blog-generator",
      "keyword-based-rewriter",
    ],
  },
  {
    keywords: ["audit", "seo score", "site score", "readability", "difficulty", "search volume", "analyze url", "analyse url"],
    slugs: ["ai-seo-analyzer", "ai-seo-content-generator", "meta-description-generator"],
  },

  {
    keywords: ["email", "newsletter", "outreach", "cold", "subject"],
    slugs: [
      "ai-email-generator",
      "ai-cold-email-generator",
      "ai-email-subject-line-generator",
      "newsletter-generator",
      "ai-follow-up-email-generator",
    ],
  },
  {
    keywords: ["code", "app", "script", "function", "developer", "sql"],
    slugs: ["ai-code-generator", "ai-chat", "ai-document-analyzer", "ai-vision", "ai-writer"],
  },
  {
    keywords: ["document", "pdf", "contract", "report", "summar", "transcript"],
    slugs: [
      "ai-document-analyzer",
      "ai-summary-generator",
      "ai-transcription",
      "ai-vision",
      "ai-chat",
    ],
  },
  {
    keywords: ["plagiarism", "original", "copied", "duplicate", "ai detector", "detect"],
    slugs: ["ai-plagiarism-detector", "ai-content-rewriter", "ai-grammar-checker"],
  },
  {
    keywords: ["present", "slides", "slide", "deck", "powerpoint", "pptx", "keynote"],
    slugs: ["ai-presentation-maker", "ai-writer", "ai-image-generator"],
  },
  {
    keywords: ["music", "song", "track", "background music", "jingle", "sound"],
    slugs: ["ai-music-generator", "sound-studio", "ai-voice-generator"],
  },
  {
    keywords: ["widget", "website bot", "support bot", "customer support", "live chat", "deploy"],
    slugs: ["external-chatbot", "ai-smart-inbox", "ai-chat-bots", "ai-chat"],
  },
  {
    keywords: ["inbox", "dm", "dms", "messages", "comments", "whatsapp", "instagram dm", "triage", "unread"],
    slugs: ["ai-smart-inbox", "external-chatbot", "ai-crm", "ai-social-media-agent"],
  },
  {
    keywords: ["marketing", "strategy", "campaign plan", "launch", "go to market", "offer", "positioning"],
    slugs: ["ai-marketing-bot", "ai-ad-generator", "ai-social-media-agent", "ai-email-generator"],
  },
  {
    keywords: ["url", "product link", "influencer", "clip", "repurpose", "shorts"],
    slugs: ["ai-url-to-video", "ai-avatar-generator", "ai-video-generator"],
  },
];

export function suggestTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = new Map<string, number>();

  for (const entry of intentMap) {
    if (entry.keywords.some((k) => q.includes(k))) {
      entry.slugs.forEach((slug, i) => {
        scored.set(slug, (scored.get(slug) ?? 0) + (10 - i));
      });
    }
  }

  for (const tool of tools) {
    const haystack = `${tool.name} ${tool.summary} ${tool.category}`.toLowerCase();
    if (haystack.includes(q)) scored.set(tool.slug, (scored.get(tool.slug) ?? 0) + 6);
    else if (q.split(/\s+/).some((word) => word.length > 3 && haystack.includes(word))) {
      scored.set(tool.slug, (scored.get(tool.slug) ?? 0) + 2);
    }
  }

  return [...scored.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([slug]) => toolBySlug.get(slug))
    .filter((t): t is Tool => Boolean(t))
    .slice(0, 8);
}
