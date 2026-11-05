import { createFileRoute } from "@tanstack/react-router";
import { Telescope } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { agentTools } from "@/data/tools-agents";

const tool = agentTools.find((t) => t.slug === "ai-deep-research")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "deep-research",
  planNote: "Included from the Standard plan, $59.99/month.",
  tutorial: { slug: "how-to-run-a-cited-research-report-with-ai-deep-research", label: "Read the Deep Research tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $59.99/month on Standard." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Question type": ["market overview", "competitor comparison", "trend analysis", "buying guide"], "Scope": ["United States", "worldwide", "my city"], "Output": ["cited report", "executive summary", "pros and cons table"]},
    build: (p) => "Research a " + p["Question type"] + " for " + p["Scope"] + " on [topic]. Deliver a " + p["Output"] + " with sources for every key claim, and flag anything that is uncertain or outdated.",
  },
};

export const Route = createFileRoute("/ai-deep-research")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiDeepResearchPage,
});

function AiDeepResearchPage() {
  return <CatalogFlagshipPage {...config} icon={<Telescope className="size-4" />} />;
}
