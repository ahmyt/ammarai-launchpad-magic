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

lines.push("## Pricing");
lines.push(
  `- [Free](${BASE_URL}/pricing): $${freePlan.monthlyPrice}/month — ${freePlan.monthlyCredits.toLocaleString("en-US")} plan credits per month, no card required. AI Writer, AI Chat, AI Image, Image Assistant and all prompt templates.`,
);
for (const plan of plans) {
  const highlights = plan.newInPlan.map((item) => item.title).join(", ");
  lines.push(
    `- [${plan.name}](${BASE_URL}/pricing): ${plan.price}${plan.period} — ${plan.features.join("; ")}. Adds: ${highlights}.`,
  );
}
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
    path: "/ai-phone-call-agent",
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
    desc: `Free, ${plans.map((p) => p.name).join(", ")} plans`,
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
