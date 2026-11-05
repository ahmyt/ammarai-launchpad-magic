import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { videoTools } from "@/data/tools-video";

const tool = videoTools.find((t) => t.slug === "ai-video-agent")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "video-agent",
  planNote: "Included from the Starter plan, $9.99/month.",
  tutorial: { slug: "how-to-create-a-video-with-the-video-agent", label: "Read the Video Agent tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $9.99/month on Starter." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Video type": ["product explainer", "welcome message", "course lesson", "social update"], "Length": ["30 seconds", "60 seconds", "90 seconds"], "Look": ["clean studio", "bright office", "brand colours"]},
    build: (p) => "Create a " + p["Length"] + " " + p["Video type"] + " with my avatar and voice, " + p["Look"] + " look. Key points: [1, 2, 3]. Call to action: [what viewers should do]. Show me the storyboard before rendering.",
  },
};

export const Route = createFileRoute("/ai-video-agent")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiVideoAgentPage,
});

function AiVideoAgentPage() {
  return <CatalogFlagshipPage {...config} icon={<Clapperboard className="size-4" />} />;
}
