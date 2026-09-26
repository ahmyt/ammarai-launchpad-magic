// Regenerate the static public/llms.txt served directly from disk:
//   bun scripts/gen-llms-txt.ts
import { writeFileSync } from "node:fs";
import { tools } from "../src/data/tools";
import { features } from "../src/data/features";
import { useCases } from "../src/data/use-cases";
import { posts } from "../src/data/posts";
import { tutorials } from "../src/data/tutorials";

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

lines.push("## Company");
const companyLinks = [
  { label: "About", path: "/about", desc: "What AmmarAI is and who it is for" },
  { label: "Pricing", path: "/pricing", desc: "Free, Starter, Professional and Ultimate plans" },
  { label: "AI Tools directory", path: "/ai-tools", desc: `Browse all ${tools.length} tools` },
  { label: "FAQ", path: "/faq", desc: "Common questions about the platform" },
  { label: "Resources", path: "/resources", desc: "Guides and help" },
  { label: "Contact", path: "/contact", desc: "Sales, support and partnerships" },
];
for (const link of companyLinks) lines.push(`- [${link.label}](${BASE_URL}${link.path}): ${link.desc}`);
lines.push("");

writeFileSync(new URL("../public/llms.txt", import.meta.url), lines.join("\n"));
console.log(`wrote public/llms.txt (${lines.length} lines)`);
