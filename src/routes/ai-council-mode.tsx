import { createFileRoute } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { marketplaceTools } from "@/data/tools-marketplace";

const tool = marketplaceTools.find((t) => t.slug === "ai-council-mode")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "council",
  planNote: "Included from the Standard plan, $59.99/month.",
  tutorial: { slug: "how-to-compare-two-ai-models-in-one-chat", label: "Read the compare-models tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $59.99/month on Standard." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Decision": ["pricing strategy", "product name", "hiring plan", "marketing angle"], "Ask models to": ["argue for and against", "rank options", "find the weak points"], "Finish with": ["one recommendation", "a comparison table"]},
    build: (p) => "Council question on my " + p["Decision"] + ": [options and context]. Ask each model to " + p["Ask models to"] + ", then finish with " + p["Finish with"] + " and note where they disagree.",
  },
};

export const Route = createFileRoute("/ai-council-mode")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiCouncilModePage,
});

function AiCouncilModePage() {
  return <CatalogFlagshipPage {...config} icon={<Users className="size-4" />} />;
}
