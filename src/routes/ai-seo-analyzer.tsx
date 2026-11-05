import { createFileRoute } from "@tanstack/react-router";
import { SearchCheck } from "lucide-react";
import { CatalogFlagshipPage, catalogFlagshipHead, type CatalogFlagshipConfig } from "@/components/site/CatalogFlagshipPage";
import { seoAnalyzerTools } from "@/data/tools-seo-analyzer";

const tool = seoAnalyzerTools.find((t) => t.slug === "ai-seo-analyzer")!;
const config: Omit<CatalogFlagshipConfig, "icon"> = {
  tool,
  clip: "seo-analyzer",
  planNote: "Included from the Basic plan, $24.99/month.",
  tutorial: { slug: "how-to-audit-a-page-with-the-ai-seo-analyzer", label: "Read the SEO Analyzer tutorial" },
  pricing: { title: "Try {name}".replace("{name}", tool.name), body: "From $24.99/month on Basic \u2014 try it free for 3 days." },
  brief: {
    title: "Write a brief that gets a usable first result",
    intro: "Pick one option per row, fill the brackets, then paste it into AmmarAI.",
    rows: {"Page": ["homepage", "product page", "blog post", "service page"], "Focus": ["title and description", "headings and content", "speed and technical"], "Priority": ["quick wins first", "biggest impact first"]},
    build: (p) => "Audit my " + p["Page"] + " at [URL] for [main keyword]. Focus on " + p["Focus"] + " and list fixes " + p["Priority"] + ".",
  },
};

export const Route = createFileRoute("/ai-seo-analyzer")({
  staticData: { sitemap: true },
  head: () => catalogFlagshipHead(config),
  component: AiSeoAnalyzerPage,
});

function AiSeoAnalyzerPage() {
  return <CatalogFlagshipPage {...config} icon={<SearchCheck className="size-4" />} />;
}
