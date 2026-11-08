import { createFileRoute } from "@tanstack/react-router";
import { Newspaper } from "lucide-react";
import { CatalogFlagshipPage, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { catalogFlagshipHead, toolHeadData } from "@/lib/flagship-head";
import { agentTools } from "@/data/tools-agents";

const tool = agentTools.find((t) => t.slug === "ai-blogger-agent")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "blogger-agent",
  planNote: "Included from the Standard plan, $59.99/month.",
  tutorial: { slug: "how-to-use-ai-blogger-agent", label: "Read the Blogger Agent tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $59.99/month on Standard." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Article type": ["how-to guide", "comparison", "listicle", "news roundup"], "Frequency": ["one post a week", "two posts a week", "daily"], "Length": ["about 1,000 words", "about 1,500 words", "about 2,500 words"]},
    build: (p) => "Write a " + p["Article type"] + " of " + p["Length"] + ", " + p["Frequency"] + ", about [topic cluster] for [audience]. Use these keywords naturally: [keywords]. Add internal links to: [pages].",
  },
};

export const Route = createFileRoute("/ai-blogger-agent")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-agents")).agentTools, "ai-blogger-agent"),
  head: ({ loaderData }) => catalogFlagshipHead(loaderData),
  component: AiBloggerAgentPage,
});

function AiBloggerAgentPage() {
  return <CatalogFlagshipPage {...config} icon={<Newspaper className="size-4" />} />;
}
