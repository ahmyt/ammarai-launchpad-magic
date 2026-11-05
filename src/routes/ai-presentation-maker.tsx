import { createFileRoute } from "@tanstack/react-router";
import { Presentation } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { platformTools } from "@/data/tools-platform";

const tool = platformTools.find((t) => t.slug === "ai-presentation-maker")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "presentation",
  planNote: "Included from the Starter plan, $9.99/month.",
  tutorial: { slug: "how-to-create-ai-presentations", label: "Read the presentation tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $9.99/month on Starter." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Deck": ["sales pitch", "training session", "investor update", "class lesson"], "Slides": ["6 slides", "10 slides", "15 slides"], "Tone": ["confident", "calm and clear", "friendly"]},
    build: (p) => "Make a " + p["Slides"] + " " + p["Deck"] + " deck in a " + p["Tone"] + " tone for [audience]. Key points: [1, 2, 3]. Final slide: [next step].",
  },
};

export const Route = createFileRoute("/ai-presentation-maker")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiPresentationMakerPage,
});

function AiPresentationMakerPage() {
  return <CatalogFlagshipPage {...config} icon={<Presentation className="size-4" />} />;
}
