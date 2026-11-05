import { createFileRoute } from "@tanstack/react-router";
import { FileSearch } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { coreToolsB } from "@/data/tools-core-b";

const tool = coreToolsB.find((t) => t.slug === "ai-document-analyzer")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "document-analyzer",
  planNote: "Included from the Basic plan, $24.99/month.",
  tutorial: { slug: "how-to-chat-with-documents", label: "Read the chat-with-documents tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $24.99/month on Basic \u2014 try it free for 3 days." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Document": ["contract", "report", "research paper", "invoice batch"], "Ask for": ["key points", "risks and deadlines", "a plain summary", "a comparison table"], "Length": ["one paragraph", "bullet list"]},
    build: (p) => "From the " + p["Document"] + " I upload, give me " + p["Ask for"] + " as a " + p["Length"] + ". Quote the section for every point so I can check it.",
  },
};

export const Route = createFileRoute("/ai-document-analyzer")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiDocumentAnalyzerPage,
});

function AiDocumentAnalyzerPage() {
  return <CatalogFlagshipPage {...config} icon={<FileSearch className="size-4" />} />;
}
