/**
 * AmmarAI tutorial center content.
 *
 * Rules for anything added here:
 * - Only document end-user workflows that genuinely exist in AmmarAI.
 * - Never include admin/configuration/setup content (API keys, installation,
 *   deployment, provider setup, server settings).
 * - Never name or reference other products used as research sources.
 */

export type TutorialCategory =
  | "Getting Started"
  | "Writing"
  | "Chat & Assistants"
  | "Image"
  | "Video"
  | "Voice & Audio"
  | "Agents & Automation"
  | "SEO & Marketing";

export interface TutorialCallout {
  type: "tip" | "note" | "warning";
  body: string;
}

export interface TutorialStep {
  title: string;
  body: string;
}

export interface TutorialSection {
  heading: string;
  /** Paragraphs rendered as body copy. */
  paragraphs?: string[];
  bullets?: string[];
  steps?: TutorialStep[];
  table?: { head: string[]; rows: string[][] };
  callouts?: TutorialCallout[];
}

export interface Tutorial {
  slug: string;
  category: TutorialCategory;
  /** SEO title (<60 chars target) */
  title: string;
  /** Meta description (<160 chars target) */
  description: string;
  h1: string;
  intro: string[];
  /** Optional "when to use" bullets shown near the top. */
  whenToUse?: string[];
  sections: TutorialSection[];
  /** Slugs of AmmarAI tools this tutorial relates to. */
  relatedTools: string[];
  /** Slugs of other tutorials to link at the bottom. */
  relatedTutorials: string[];
  /** Primary CTA. `to` is a tool slug; unauthenticated visitors land on the
   * tool page which leads into the sign-up flow. */
  cta: { toolName: string; toolSlug: string };
}

export const tutorialCategories: TutorialCategory[] = [
  "Getting Started",
  "Writing",
  "Chat & Assistants",
  "Image",
  "Video",
  "Voice & Audio",
  "Agents & Automation",
  "SEO & Marketing",
];

export const tutorials: Tutorial[] = [
  {
    slug: "introduction-to-ammarai",
    category: "Getting Started",
    title: "Introduction to AmmarAI | AmmarAI Tutorials",
    description:
      "What AmmarAI is, how the workspace is organised, and how 140 AI tools share one subscription, one credit pool and one brand voice.",
    h1: "Introduction to AmmarAI",
    intro: [
      "AmmarAI is a single AI workspace for everything you create: writing, chat, images, video, voice, transcription, document analysis and code. Instead of paying for separate writing, image, video and voice tools, you open one account and every tool shares the same credits, files, personas and brand voice.",
      "This tutorial explains what the platform is, how the pieces fit together, and where to go next.",
    ],
    sections: [
      {
        heading: "What AmmarAI does",
        paragraphs: [
          "AmmarAI brings more than 140 AI tools into one place. Some are full workspaces — like AI Chat Pro, AI Image Pro and AI Video Pro. Others are focused templates that do one job quickly, like a product description generator or a caption writer.",
          "Every tool produces work you can reuse elsewhere: an image made in AI Image Pro can be animated in image-to-video, a script written in AI Writer can become a voiceover, and a video can be transcribed, captioned or repurposed for social posts.",
        ],
      },
      {
        heading: "How the workspace is organised",
        bullets: [
          "Flagship tools — the deep workspaces: AI Agent Builder, AI Writer, AI Chat Pro, AI Image Pro, AI Video Pro, AI Avatar Video Generator, AI Transcription and AI SEO Analyzer.",
          "AI Templates — more than a hundred short, guided generators organised by job: blog, ecommerce, social, advertising, business, academic, lifestyle and more.",
          "AI Agents — tools that run multi-step work on a schedule or trigger, such as the AI Phone Call Agent, AI Social Media Agent and AI Blogger Agent.",
          "Platform features — brand voice, personas and skills, saved prompts, file uploads, bulk generation and team workspaces that apply across every tool.",
        ],
      },
      {
        heading: "One subscription, shared credits",
        paragraphs: [
          "Your plan's allowance works across every tool, so a busy month of video work does not strand an unused writing budget. Higher plans add more credits, more models, longer files, custom assistants and team seats.",
        ],
        callouts: [
          {
            type: "note",
            body: "You can compare plans on the pricing page before you register — every plan includes access to the full tool library.",
          },
        ],
      },
      {
        heading: "Where to go next",
        bullets: [
          "Create your account and run your first generation — see the Getting Started tutorial.",
          "Learn your way around the dashboard — see Navigating AmmarAI.",
          "Browse the full tool directory to find the tool for your task.",
        ],
      },
    ],
    relatedTools: ["ai-writer", "ai-chat", "ai-image-generator"],
    relatedTutorials: ["getting-started-with-ammarai", "navigating-ammarai"],
    cta: { toolName: "AI Writer", toolSlug: "ai-writer" },
  },
  {
    slug: "getting-started-with-ammarai",
    category: "Getting Started",
    title: "Getting Started with AmmarAI | AmmarAI Tutorials",
    description:
      "Create your free AmmarAI account, run your first generation, and understand credits, models and saved work — a step-by-step first-session guide.",
    h1: "Getting Started with AmmarAI",
    intro: [
      "This guide walks you through your first session: creating an account, opening your first tool, running a generation, and understanding how credits and models work.",
      "You can do everything below on the free plan — no card is required.",
    ],
    sections: [
      {
        heading: "Create your account",
        steps: [
          {
            title: "Open the registration page",
            body: "From any AmmarAI page, choose Start Free. You can register with an email address or sign in with Google.",
          },
          {
            title: "Confirm your email",
            body: "If you registered with email, open the confirmation message AmmarAI sends and follow the link to activate the account.",
          },
          {
            title: "Sign in",
            body: "Log in to open your workspace. Your dashboard is where every tool, file and saved generation lives.",
          },
        ],
      },
      {
        heading: "Run your first generation",
        steps: [
          {
            title: "Pick a tool for the job",
            body: "Use the tool library or the discovery search on the site to find a tool by describing your task — for example “product description” or “transcribe an interview”.",
          },
          {
            title: "Describe what you want",
            body: "Every tool starts with a prompt or a short form. The more concrete the brief — audience, tone, length, format — the better the first result.",
          },
          {
            title: "Generate and refine",
            body: "Review the output, then ask for changes instead of starting over: adjust tone, shorten, expand a section, or request variations.",
          },
          {
            title: "Save or export",
            body: "Keep the result in your workspace, copy it out, or export it in a common format depending on the tool.",
          },
        ],
        callouts: [
          {
            type: "tip",
            body: "Start with a flagship workspace like AI Writer or AI Chat Pro for open-ended tasks, and use a template when you want a specific, structured piece of copy fast.",
          },
        ],
      },
      {
        heading: "Understand credits and models",
        bullets: [
          "Each generation uses credits from your monthly allowance; larger jobs (long video, high-resolution images) use more than short text.",
          "Your allowance is shared across all tools — there is one balance to watch, not one per tool.",
          "Higher plans unlock additional models, larger uploads and priority processing.",
        ],
      },
      {
        heading: "Set up your brand voice early",
        paragraphs: [
          "Before producing content at volume, save your brand voice and a persona. AmmarAI then applies them across writing, chat and templates so everything you create sounds consistent without repeating instructions.",
        ],
        callouts: [
          {
            type: "tip",
            body: "Ten minutes setting up brand voice saves re-writing tone instructions on every future generation.",
          },
        ],
      },
    ],
    relatedTools: ["ai-writer", "ai-chat", "ai-personas"],
    relatedTutorials: ["introduction-to-ammarai", "navigating-ammarai"],
    cta: { toolName: "AI Writer", toolSlug: "ai-writer" },
  },
  {
    slug: "navigating-ammarai",
    category: "Getting Started",
    title: "Navigating the AmmarAI Workspace | AmmarAI Tutorials",
    description:
      "A tour of the AmmarAI workspace: finding tools fast, organising work, using personas and skills, and moving output between tools.",
    h1: "Navigating the AmmarAI Workspace",
    intro: [
      "AmmarAI has more than 140 tools, but the workspace stays manageable once you know the four ways to move around: the tool library, search, your saved work, and the shared features that follow you between tools.",
    ],
    whenToUse: [
      "You are new and want a fast orientation before generating anything.",
      "You keep re-typing the same instructions and want personas and skills to remember them.",
      "You produce multi-format campaigns and want to hand work between tools.",
    ],
    sections: [
      {
        heading: "Find the right tool quickly",
        paragraphs: [
          "The AI Tools directory groups every tool by category — writing, chat, image, video, voice, agents and more — and highlights the most-used and recently added tools. When you are not sure which tool fits, describe the task in the discovery search and AmmarAI suggests matching tools.",
        ],
      },
      {
        heading: "Keep work organised",
        bullets: [
          "Saved generations stay in your workspace so you can return, refine or export later.",
          "Folders and saved conversations in AI Chat Pro keep research, drafts and client work separated.",
          "File uploads let you bring documents, images, audio and video into the relevant tools.",
        ],
      },
      {
        heading: "Let the workspace remember your style",
        paragraphs: [
          "Personas, skills and brand voice are workspace-level settings. Define them once and every writing tool, chat session and template picks them up — so a blog post, an ad and an email all sound like the same brand.",
        ],
        callouts: [
          {
            type: "note",
            body: "Personas shape how the assistant behaves and responds; brand voice shapes how finished content reads. Use both together for best results.",
          },
        ],
      },
      {
        heading: "Move output between tools",
        paragraphs: [
          "The workspace is built around hand-offs: draft a script in AI Writer, turn it into a voiceover, add it to a video, generate captions, then repurpose the result as social copy. Because everything shares one workspace, you are not exporting and re-uploading between separate products.",
        ],
        steps: [
          {
            title: "Start with the source",
            body: "Create or upload the raw material — a brief, a document, a recording, a product page.",
          },
          {
            title: "Transform it",
            body: "Use the next tool in the chain: write, generate, edit, transcribe, translate or caption.",
          },
          {
            title: "Publish or hand off",
            body: "Export the finished asset, schedule it through the relevant agent, or move it into a campaign.",
          },
        ],
      },
    ],
    relatedTools: ["ai-chat", "ai-personas", "ai-command-search"],
    relatedTutorials: ["introduction-to-ammarai", "getting-started-with-ammarai"],
    cta: { toolName: "AI Chat Pro", toolSlug: "ai-chat" },
  },
  ...writingTutorials,
];

export const tutorialBySlug = new Map(tutorials.map((t) => [t.slug, t]));

export function getTutorial(slug: string): Tutorial | undefined {
  return tutorialBySlug.get(slug);
}

/** Tool slug → tutorial, for "Read the tutorial" links on tool pages. */
export const tutorialByTool = new Map<string, Tutorial>();
for (const tutorial of tutorials) {
  for (const toolSlug of tutorial.relatedTools) {
    if (!tutorialByTool.has(toolSlug)) tutorialByTool.set(toolSlug, tutorial);
  }
}

export function tutorialsByCategory(category: TutorialCategory): Tutorial[] {
  return tutorials.filter((t) => t.category === category);
}

export function searchTutorials(query: string): Tutorial[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const words = q.split(/\s+/).filter(Boolean);
  return tutorials
    .map((t) => {
      const haystack =
        `${t.h1} ${t.title} ${t.description} ${t.category} ${t.intro.join(" ")}`.toLowerCase();
      let score = 0;
      if (haystack.includes(q)) score += 10;
      for (const w of words) if (w.length > 2 && haystack.includes(w)) score += 2;
      return { t, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.t);
}

/** Neighbours within the same category first, then the global list. */
export function adjacentTutorials(slug: string): {
  prev?: Tutorial | undefined;
  next?: Tutorial | undefined;
} {
  const index = tutorials.findIndex((t) => t.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? tutorials[index - 1] : undefined,
    next: index < tutorials.length - 1 ? tutorials[index + 1] : undefined,
  };
}
