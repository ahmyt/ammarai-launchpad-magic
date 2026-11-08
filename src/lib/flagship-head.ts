import type { Faq, Tool } from "@/data/types";
import { faqJsonLd } from "@/components/site/Faq";

/**
 * The few tool fields a page's <head> needs. Route loaders pick these from a
 * dynamically imported catalogue file, so full tool records stay out of the
 * startup code every visitor downloads.
 */
export type ToolHeadData = {
  slug: string;
  name: string;
  title: string;
  description: string;
  faqs: Faq[];
};

export function toolHeadData(tools: Tool[], slug: string): ToolHeadData {
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw new Error(`Unknown tool: ${slug}`);
  return { slug: tool.slug, name: tool.name, title: tool.title, description: tool.description, faqs: tool.faqs ?? [] };
}

/** Standard head (meta, canonical, SoftwareApplication + FAQ JSON-LD) for a tool page. */
export function catalogFlagshipHead(
  tool: ToolHeadData | undefined,
  category = "BusinessApplication",
  moreFaqs: Faq[] = [],
) {
  if (!tool) return {};
  const url = `https://ammarai.com/${tool.slug}`;
  return {
    meta: [
      { title: tool.title },
      { name: "description", content: tool.description },
      { property: "og:title", content: tool.title },
      { property: "og:description", content: tool.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.name, applicationCategory: category, operatingSystem: "Web", description: tool.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...tool.faqs, ...moreFaqs])) },
    ],
  };
}
