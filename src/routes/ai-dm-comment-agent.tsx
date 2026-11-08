import { createFileRoute } from "@tanstack/react-router";
import { MessagesSquare } from "lucide-react";
import { CatalogFlagshipPage, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { catalogFlagshipHead, toolHeadData } from "@/lib/flagship-head";
import { agentTools } from "@/data/tools-agents";

const tool = agentTools.find((t) => t.slug === "ai-dm-comment-agent")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "dm-agent",
  planNote: "See pricing for the plans that include it.",
  tutorial: { slug: "how-to-run-a-social-media-agent", label: "Related tutorial: run a Social Media Agent" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "Compare plans to find your fit." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Channel": ["Instagram DMs", "Facebook comments", "Instagram comments"], "Intent": ["price questions", "opening hours", "booking requests", "complaints"], "Handover": ["send complaints to me", "send orders over $100 to me", "never hand over"]},
    build: (p) => "Reply to " + p["Intent"] + " on " + p["Channel"] + ". Facts to use: [prices, hours, links]. Rule: " + p["Handover"] + ". Keep replies short and friendly; never invent details.",
  },
};

export const Route = createFileRoute("/ai-dm-comment-agent")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-agents")).agentTools, "ai-dm-comment-agent"),
  head: ({ loaderData }) => catalogFlagshipHead(loaderData),
  component: AiDmCommentAgentPage,
});

function AiDmCommentAgentPage() {
  return <CatalogFlagshipPage {...config} icon={<MessagesSquare className="size-4" />} />;
}
