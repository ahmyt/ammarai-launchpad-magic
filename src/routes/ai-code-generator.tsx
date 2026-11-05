import { createFileRoute } from "@tanstack/react-router";
import { Code } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { coreToolsB } from "@/data/tools-core-b";

const tool = coreToolsB.find((t) => t.slug === "ai-code-generator")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "code",
  planNote: "Included from the Starter plan, $9.99/month.",
  tutorial: { slug: "how-to-use-ai-chat-pro", label: "Related tutorial: AI Chat Pro" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $9.99/month on Starter." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Language": ["Python", "JavaScript", "TypeScript", "SQL", "PHP"], "Task": ["write a function", "explain this code", "find the bug", "add tests"], "Style": ["commented", "minimal"]},
    build: (p) => "" + p["Task"] + " in " + p["Language"] + ", " + p["Style"] + ". Requirements: [inputs, outputs, edge cases]. Code: [paste here if any]. Explain any assumption you make.",
  },
};

export const Route = createFileRoute("/ai-code-generator")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiCodeGeneratorPage,
});

function AiCodeGeneratorPage() {
  return <CatalogFlagshipPage {...config} icon={<Code className="size-4" />} />;
}
