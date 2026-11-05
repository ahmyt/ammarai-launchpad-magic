import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { coreToolsA } from "@/data/tools-core-a";

const tool = coreToolsA.find((t) => t.slug === "ai-chat")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "chat-pro",
  planNote: "Included on every plan, including Free.",
  tutorial: { slug: "how-to-use-ai-chat-pro", label: "Read the AI Chat Pro tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "Start free \u2014 no card needed." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Task": ["plan a project", "explain a topic", "draft an email", "analyse a file"], "Format": ["a numbered plan", "a short summary", "a table"], "Depth": ["quick answer", "detailed with reasoning"]},
    build: (p) => "Help me " + p["Task"] + ". Give the answer as " + p["Format"] + ", " + p["Depth"] + ". Context: [who it's for, constraints, deadline]. Ask me one question first if anything is unclear.",
  },
};

export const Route = createFileRoute("/ai-chat")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiChatPage,
});

function AiChatPage() {
  return <CatalogFlagshipPage {...config} icon={<MessageSquare className="size-4" />} />;
}
