import { createFileRoute } from "@tanstack/react-router";
import { Film } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { marketplaceTools } from "@/data/tools-marketplace";

const tool = marketplaceTools.find((t) => t.slug === "viral-clips")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "viral-clips",
  planNote: "Included from the Ultimate plan, $129.99/month.",
  tutorial: { slug: "how-to-create-viral-clips", label: "Read the Viral Clips tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $129.99/month on Ultimate." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Source": ["podcast episode", "webinar", "YouTube video", "interview"], "Clip length": ["under 30 seconds", "30–60 seconds"], "Platform": ["TikTok", "Instagram Reels", "YouTube Shorts"]},
    build: (p) => "Cut my " + p["Source"] + " into clips " + p["Clip length"] + " for " + p["Platform"] + ". Prioritise: [moments with a strong hook, a clear tip, a surprising fact]. Add captions.",
  },
};

export const Route = createFileRoute("/viral-clips")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: ViralClipsPage,
});

function ViralClipsPage() {
  return <CatalogFlagshipPage {...config} icon={<Film className="size-4" />} />;
}
