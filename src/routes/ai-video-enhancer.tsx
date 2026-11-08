import { createFileRoute } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { CatalogFlagshipPage, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { catalogFlagshipHead, toolHeadData } from "@/lib/flagship-head";
import { marketplaceTools } from "@/data/tools-marketplace";

const tool = marketplaceTools.find((t) => t.slug === "ai-video-enhancer")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "video-enhancer",
  planNote: "See pricing for the plans that include it.",
  tutorial: { slug: "how-to-edit-videos-with-the-ai-video-editor", label: "Related tutorial: AI Video Editor" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "Compare plans to find your fit." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Problem": ["low resolution", "soft focus", "noisy low light", "choppy motion"], "Footage": ["phone clip", "old recording", "screen capture"], "Use": ["website hero", "social post", "client delivery"]},
    build: (p) => "Enhance my " + p["Footage"] + " with " + p["Problem"] + " for a " + p["Use"] + ". Compare the result with the original before using it.",
  },
};

export const Route = createFileRoute("/ai-video-enhancer")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-marketplace")).marketplaceTools, "ai-video-enhancer"),
  head: ({ loaderData }) => catalogFlagshipHead(loaderData),
  component: AiVideoEnhancerPage,
});

function AiVideoEnhancerPage() {
  return <CatalogFlagshipPage {...config} icon={<Sparkles className="size-4" />} />;
}
