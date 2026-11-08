import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "lucide-react";
import { CatalogFlagshipPage, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { catalogFlagshipHead, toolHeadData } from "@/lib/flagship-head";
import { agentTools } from "@/data/tools-agents";

const tool = agentTools.find((t) => t.slug === "ai-crm")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "crm",
  planNote: "Included from the Standard plan, $59.99/month.",
  tutorial: { slug: "how-to-manage-sales-with-ai-crm", label: "Read the AI CRM tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $59.99/month on Standard." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Goal": ["follow up on new leads", "re-engage cold deals", "prepare for a sales call"], "Pipeline stage": ["new lead", "proposal sent", "negotiation"], "Tone": ["friendly and brief", "professional", "direct"]},
    build: (p) => "Help me " + p["Goal"] + " at the " + p["Pipeline stage"] + " stage. Write the next message in a " + p["Tone"] + " tone, list the next action and when to do it. Contact details: [name, company, last touchpoint].",
  },
};

export const Route = createFileRoute("/ai-crm")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-agents")).agentTools, "ai-crm"),
  head: ({ loaderData }) => catalogFlagshipHead(loaderData),
  component: AiCrmPage,
});

function AiCrmPage() {
  return <CatalogFlagshipPage {...config} icon={<Contact className="size-4" />} />;
}
