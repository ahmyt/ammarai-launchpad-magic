import { createFileRoute } from "@tanstack/react-router";
import { Scissors } from "lucide-react";
import { CatalogFlagshipPage, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { catalogFlagshipHead, toolHeadData } from "@/lib/flagship-head";
import { videoTools } from "@/data/tools-video";

const tool = videoTools.find((t) => t.slug === "ai-video-editor")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "video-editor",
  planNote: "Included from the Standard plan, $59.99/month.",
  tutorial: { slug: "how-to-edit-videos-with-the-ai-video-editor", label: "Read the Video Editor tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $59.99/month on Standard." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Edit": ["trim and tighten", "add captions", "resize for vertical", "add music"], "Destination": ["Instagram Reels", "YouTube", "TikTok", "website"], "Style": ["clean", "energetic", "minimal"]},
    build: (p) => "Edit my clip for " + p["Destination"] + ": " + p["Edit"] + ", " + p["Style"] + " style. Keep: [moments to keep]. Remove: [pauses, mistakes].",
  },
};

export const Route = createFileRoute("/ai-video-editor")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-video")).videoTools, "ai-video-editor"),
  head: ({ loaderData }) => catalogFlagshipHead(loaderData),
  component: AiVideoEditorPage,
});

function AiVideoEditorPage() {
  return <CatalogFlagshipPage {...config} icon={<Scissors className="size-4" />} />;
}
