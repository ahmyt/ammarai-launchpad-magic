import { createFileRoute } from "@tanstack/react-router";
import { Languages } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { videoTools } from "@/data/tools-video";

const tool = videoTools.find((t) => t.slug === "ai-dubbing")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "dubbing",
  planNote: "Included from the Ultimate plan, $129.99/month.",
  tutorial: { slug: "how-to-dub-a-video", label: "Read the dubbing tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $129.99/month on Ultimate." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Target language": ["Spanish", "Arabic", "French", "Hindi", "German"], "Content": ["product demo", "course lesson", "social video"], "Check": ["names and brand terms", "numbers and prices"]},
    build: (p) => "Dub my " + p["Content"] + " into " + p["Target language"] + ". Before publishing, I will check " + p["Check"] + " with a native speaker. Terms to keep untranslated: [brand, product names].",
  },
};

export const Route = createFileRoute("/ai-dubbing")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiDubbingPage,
});

function AiDubbingPage() {
  return <CatalogFlagshipPage {...config} icon={<Languages className="size-4" />} />;
}
