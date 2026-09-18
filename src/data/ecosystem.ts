import type { Tool, ToolCategory } from "./types";

export type EcosystemPillar = "Create" | "Think" | "Automate" | "Grow";

export const pillarOrder: EcosystemPillar[] = ["Create", "Think", "Automate", "Grow"];

export const pillarDetails: Record<EcosystemPillar, { description: string; categories: ToolCategory[] }> = {
  Create: {
    description: "Write, design, produce video, build avatars, and create audio from one brief.",
    categories: ["AI Writing", "AI Image", "AI Video", "AI Voice", "AI Audio", "AI Transcription"],
  },
  Think: {
    description: "Research, chat with sources, inspect documents, analyze SEO, solve code, and clarify decisions.",
    categories: ["AI Chat", "AI SEO", "AI Vision", "AI Documents", "AI Code", "AI Education", "AI Career", "AI Legal", "AI Lifestyle", "AI Productivity"],
  },
  Automate: {
    description: "Build agents, phone assistants, CRM follow-ups, and repeatable multi-step workflows with oversight.",
    categories: ["AI Agents", "AI Sales & CRM"],
  },
  Grow: {
    description: "Turn ideas into campaigns, social publishing, sales content, ecommerce assets, and customer communication.",
    categories: ["AI Marketing", "AI Social Media", "AI Business", "AI E-commerce", "AI Email", "AI Templates"],
  },
};

export const categoryPillar = Object.fromEntries(
  pillarOrder.flatMap((pillar) => pillarDetails[pillar].categories.map((category) => [category, pillar])),
) as Record<ToolCategory, EcosystemPillar>;

export function pillarForTool(tool: Tool): EcosystemPillar {
  return categoryPillar[tool.category];
}

export function toolsInPillar(tools: Tool[], pillar: EcosystemPillar): Tool[] {
  return tools.filter((tool) => pillarForTool(tool) === pillar);
}

export type FlagshipWorkflow = {
  slug: string;
  bring: string;
  process: string;
  get: string;
  useCaseSlugs: string[];
};

export const flagshipWorkflows: FlagshipWorkflow[] = [
  {
    slug: "ai-writer",
    bring: "A topic, audience, source notes, and the tone you want to keep.",
    process: "AmmarAI structures the idea, drafts the content, and helps refine each section.",
    get: "A usable article or campaign draft ready for human review and publishing.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-agencies", "ai-for-seo"],
  },
  {
    slug: "ai-chat",
    bring: "A question, document, image, saved skill, or research task.",
    process: "AmmarAI keeps the conversation focused and can use attached sources or current web results.",
    get: "A grounded answer, plan, analysis, or draft you can continue refining in one thread.",
    useCaseSlugs: ["ai-for-developers", "ai-for-productivity", "ai-for-students"],
  },
  {
    slug: "ai-image-generator",
    bring: "A visual brief, product direction, reference image, or campaign concept.",
    process: "AmmarAI turns the direction into images and lets you iterate on composition and style.",
    get: "Original visual options for products, campaigns, posts, and creative production.",
    useCaseSlugs: ["ai-for-ecommerce", "ai-for-content-creators", "ai-for-marketing"],
  },
  {
    slug: "ai-video-generator",
    bring: "A written prompt or image plus the scene, motion, format, and mood you need.",
    process: "AmmarAI generates the motion sequence and gives you a playable result to review.",
    get: "A video concept for product, social, promotional, or storytelling work.",
    useCaseSlugs: ["ai-for-marketing", "ai-for-ecommerce", "ai-for-content-creators"],
  },
  {
    slug: "ai-agent-builder",
    bring: "A repeatable task, the information it needs, connected steps, and approval rules.",
    process: "AmmarAI chains the workflow, runs it on a trigger or schedule, and pauses at approval gates.",
    get: "A reusable agent that handles recurring work while sensitive actions stay supervised.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-agencies", "ai-for-productivity"],
  },
  {
    slug: "ai-phone-agent",
    bring: "A call purpose, knowledge, conversation guidance, and the details to capture.",
    process: "AmmarAI handles the conversation, follows the guidance, and records the outcome.",
    get: "A repeatable phone workflow for reception, qualification, support, or bookings.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-entrepreneurs", "ai-for-agencies"],
  },
  {
    slug: "ai-crm",
    bring: "Contacts, conversations, lead context, and the follow-ups your team needs to track.",
    process: "AmmarAI keeps customer context organized and makes next actions easier to follow.",
    get: "A clearer pipeline of contacts, conversations, and follow-up work in one place.",
    useCaseSlugs: ["ai-for-small-business", "ai-for-agencies", "ai-for-entrepreneurs"],
  },
  {
    slug: "ai-seo-analyzer",
    bring: "A public page URL and the search performance questions you want answered.",
    process: "AmmarAI reviews the page signals and organizes practical findings by priority.",
    get: "An actionable SEO review that shows what to investigate and improve next.",
    useCaseSlugs: ["ai-for-seo", "ai-for-marketing", "ai-for-small-business"],
  },
];

export const outcomeShortcuts = [
  { label: "Write a complete product launch campaign", slug: "ai-writer" },
  { label: "Create a product demo video", slug: "ai-video-generator" },
  { label: "Turn a document into a presentation", slug: "ai-presentation-maker" },
  { label: "Build a customer support AI agent", slug: "ai-agent-builder" },
  { label: "Create an AI phone receptionist", slug: "ai-phone-agent" },
  { label: "Analyze my website SEO", slug: "ai-seo-analyzer" },
  { label: "Create social content for my business", slug: "ai-social-media-agent" },
  { label: "Research a topic and produce a cited report", slug: "ai-deep-research" },
] as const;