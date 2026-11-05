import { createFileRoute } from "@tanstack/react-router";
import { Share2 } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { agentTools } from "@/data/tools-agents";

const tool = agentTools.find((t) => t.slug === "ai-social-media-agent")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "social-agent",
  planNote: "Included from the Starter plan, $9.99/month.",
  tutorial: { slug: "how-to-run-a-social-media-agent", label: "Read the Social Media Agent tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $9.99/month on Starter." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Platform": ["Instagram", "LinkedIn", "Facebook", "X"], "Cadence": ["3 posts a week", "daily", "weekdays only"], "Voice": ["warm and local", "expert and clear", "playful"]},
    build: (p) => "Plan " + p["Cadence"] + " for " + p["Platform"] + " in a " + p["Voice"] + " voice. Topics: [products, offers, tips]. Avoid: [claims you can't verify]. Show every post for my approval before publishing.",
  },
};

export const Route = createFileRoute("/ai-social-media-agent")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiSocialMediaAgentPage,
});

function AiSocialMediaAgentPage() {
  return <CatalogFlagshipPage {...config} icon={<Share2 className="size-4" />} />;
}
