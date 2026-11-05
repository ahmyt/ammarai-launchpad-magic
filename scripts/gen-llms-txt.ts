// Regenerate the static public/llms.txt served directly from disk:
//   bun scripts/gen-llms-txt.ts
import { writeFileSync } from "node:fs";
import { tools } from "../src/data/tools";
import { features } from "../src/data/features";
import { useCases } from "../src/data/use-cases";
import { posts } from "../src/data/posts";
import { tutorials } from "../src/data/tutorials";
import { plans } from "../src/lib/site";
import { freePlan } from "../src/data/free-plan";
import { restaurantOffer } from "../src/data/restaurant-offer";

const BASE_URL = "https://ammarai.com";
const lines: string[] = [];

lines.push("# AmmarAI");
lines.push("");
lines.push(
  "> One AI workspace for everything you create — writing, chat, images, video, voiceovers, transcription, document analysis and code across " +
    tools.length +
    " tools. Brand voice, templates, assistants, bulk generation and team workspaces in one place. Free plan available.",
);
lines.push("");

lines.push("## AI Tools");
for (const tool of tools) lines.push(`- [${tool.name}](${BASE_URL}/${tool.slug}): ${tool.summary}`);
lines.push("");

// Dedicated flagship tool pages (moving video header, walkthrough, examples, FAQs).
// Hand-written notes override the catalogue summary where pricing was verified.
const flagshipNotes: Record<string, string> = {
  "ai-image-generator": "Image studio — prompt, variations, style presets, aspect ratio, model choice and an image library. Included on every plan, including Free.",
  "ai-writer": "Full writing editor with the Article Wizard (keyword suggestions, search questions, section drafting), inline rewrites, tone and length control. Included on every plan, including Free.",
  "ai-agent-builder": "Build scheduled multi-step agent workflows from nine step types (Ask Agent, Send Message, Generate Report, Gmail, Path, Social Media Agent, Marketing Bot, External Chatbot, CRM Agent). AI Agent from Basic ($24.99/mo); unlimited Agent Builder and all connectors on Ultimate ($129.99/mo).",
  "ai-music-generator": "Generate original background tracks from a description, duration and musical style. Included from Basic ($24.99/mo).",
  "ai-smart-inbox": "Build and embed a website chatbot, and read website, WhatsApp and Telegram conversations in one inbox with human handover. Website chatbot from Standard ($59.99/mo).",
  "ai-ugc-generator": "Make creator-style product videos from a script, voice (or your own audio), actor and scene. UGC Factory is included on Ultimate ($129.99/mo).",
  "ai-url-to-video": "Paste a product link or upload assets, pick format, length, presenter, voice and captions, then compare previews. Included from Standard ($59.99/mo).",
};
const flagshipSlugs = [
  "ai-image-generator", "ai-writer", "ai-video-generator", "ai-avatar-generator", "ai-agent-builder",
  "ai-music-generator", "ai-smart-inbox", "ai-ugc-generator", "ai-url-to-video", "ai-voice-generator",
  "realtime-voice-chat", "ai-transcription", "ai-crm", "ai-social-media-agent", "ai-blogger-agent",
  "ai-dm-comment-agent", "ai-chat", "ai-deep-research", "ai-council-mode", "ai-video-agent",
  "ai-video-editor", "ai-dubbing", "viral-clips", "ai-video-enhancer", "ai-presentation-maker",
  "ai-seo-analyzer", "ai-document-analyzer", "ai-code-generator",
];
lines.push("## Featured Tool Pages");
lines.push(
  `- [AI Fashion Studio](${BASE_URL}/ai-fashion-studio): Put garments on AI models without a shoot — photoshoots, virtual try-on, model swaps, image edits and short fashion videos, using plan image and video credits.`,
);
for (const slug of flagshipSlugs) {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`flagship slug missing from catalogue: ${slug}`);
  lines.push(`- [${tool.name}](${BASE_URL}/${slug}): ${flagshipNotes[slug] ?? tool.summary}`);
}
lines.push("");

lines.push("## Platform Features");
for (const feature of features)
  lines.push(`- [${feature.name}](${BASE_URL}/features/${feature.slug}): ${feature.summary}`);
lines.push("");

lines.push("## Tutorials");
for (const tutorial of tutorials)
  lines.push(`- [${tutorial.h1}](${BASE_URL}/tutorials/${tutorial.slug}): ${tutorial.description}`);
lines.push("");

lines.push("## Use Cases");
for (const useCase of useCases) lines.push(`- [${useCase.name}](${BASE_URL}/${useCase.slug}): ${useCase.summary}`);
lines.push("");

lines.push("## Blog");
for (const post of posts) lines.push(`- [${post.title}](${BASE_URL}/blog/${post.slug})`);
lines.push("");

lines.push("## Restaurant Phone Ordering");
lines.push(
  `- [AI Restaurant Phone Ordering Agent](${BASE_URL}/restaurant-phone-ordering): Answer restaurant calls, confirm takeout items and pickup date/time, and send confirmed orders to the POS and kitchen. Includes menu training and setup, with a tested AymarPOS flow; other POS connections require compatibility assessment. Separate $${restaurantOffer.monthlyPrice}/month service with unlimited inbound calls and zero per-order commissions. Optional phone payment and SMS are scoped separately. Anchor Fish & Wings is a fictional demo; call ${restaurantOffer.demoPhoneFormatted}.`,
);
lines.push("");

lines.push("## Pricing");
lines.push(
  `- [Free](${BASE_URL}/pricing): $${freePlan.monthlyPrice}/month — ${freePlan.monthlyCredits.toLocaleString("en-US")} plan credits per month, no card required. AI Writer, AI Chat, AI Image, Image Assistant and all prompt templates.`,
);
for (const plan of plans) {
  const highlights = plan.newInPlan.map((item) => item.title).join(", ");
  const distinction = plan.name === "Voice Scale"
    ? " General business phone-agent plan, not the unlimited restaurant phone ordering service."
    : "";
  lines.push(
    `- [${plan.name}](${BASE_URL}/pricing): ${plan.price}${plan.period} — ${plan.features.join("; ")}. Adds: ${highlights}.${distinction}`,
  );
}
lines.push(
  `- [Restaurant Phone Ordering](${BASE_URL}/restaurant-phone-ordering): $${restaurantOffer.monthlyPrice}/month — unlimited inbound calls and zero per-order commissions. Separate from Voice Scale; request setup by email or chat via ${BASE_URL}/contact?topic=restaurant.`,
);
lines.push("");

lines.push("## Demos & Directories");
const hubLinks = [
  {
    label: "Live demos",
    path: "/demo-video",
    desc: "Watch the AmmarAI demo video and try guest AI Chat Pro and AI Image Pro demos, plus website chatbot, voice bot and phone agent demos",
  },
  {
    label: "AI Phone Call Agent demo line",
    path: "/ai-phone-agent",
    desc: "Call +1 (833) 772-9060 to talk to the demo AI phone agent",
  },
  { label: "AI Models", path: "/ai-models", desc: "The AI models available inside AmmarAI" },
  { label: "Tutorials", path: "/tutorials", desc: `All ${tutorials.length} step-by-step guides` },
  { label: "Use Cases", path: "/use-cases", desc: "How teams and creators use AmmarAI" },
  { label: "Features", path: "/features", desc: "Platform features across every tool" },
  { label: "Blog", path: "/blog", desc: "Guides, comparisons and honest alternatives" },
];
for (const link of hubLinks) lines.push(`- [${link.label}](${BASE_URL}${link.path}): ${link.desc}`);
lines.push("");

lines.push("## Company");
const companyLinks = [
  { label: "About", path: "/about", desc: "What AmmarAI is and who it is for" },
  {
    label: "Pricing",
    path: "/pricing",
    desc: `Free, ${plans.map((p) => p.name).join(", ")} plans, plus separate Restaurant Phone Ordering at $${restaurantOffer.monthlyPrice}/month`,
  },
  { label: "AI Tools directory", path: "/ai-tools", desc: `Browse all ${tools.length} tools` },
  { label: "FAQ", path: "/faq", desc: "Common questions about the platform" },
  { label: "Resources", path: "/resources", desc: "Guides and help" },
  { label: "Contact", path: "/contact", desc: "Sales, support and partnerships" },
];
for (const link of companyLinks) lines.push(`- [${link.label}](${BASE_URL}${link.path}): ${link.desc}`);
lines.push("");

lines.push("## Optional");
const legalLinks = [
  { label: "Privacy Policy", path: "/privacy" },
  { label: "Terms of Service", path: "/terms" },
  { label: "Refund Policy", path: "/refund-policy" },
];
for (const link of legalLinks) lines.push(`- [${link.label}](${BASE_URL}${link.path}): Mobile Unlocking LLC, US`);
lines.push("");

writeFileSync(new URL("../public/llms.txt", import.meta.url), lines.join("\n"));
console.log(`wrote public/llms.txt (${lines.length} lines)`);
