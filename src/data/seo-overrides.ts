// Audit-verified search titles, descriptions and structured data for specific tool pages.
const S = "https://ammarai.com";
const org = { "@type": "Organization", "@id": `${S}/#organization`, name: "AmmarAI", url: `${S}/` };
const site = { "@type": "WebSite", "@id": `${S}/#website`, name: "AmmarAI", url: `${S}/`, publisher: { "@id": `${S}/#organization` } };
const crumbs = (slug: string, name: string) => ({
  "@type": "BreadcrumbList",
  "@id": `${S}/${slug}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${S}/` },
    { "@type": "ListItem", position: 2, name: "AI Tools", item: `${S}/ai-tools` },
    { "@type": "ListItem", position: 3, name, item: `${S}/${slug}` },
  ],
});
const page = (slug: string, name: string, description: string) => ({
  "@type": "WebPage",
  "@id": `${S}/${slug}#webpage`,
  url: `${S}/${slug}`,
  name,
  description,
  isPartOf: { "@id": `${S}/#website` },
  publisher: { "@id": `${S}/#organization` },
  breadcrumb: { "@id": `${S}/${slug}#breadcrumb` },
});

export type SeoOverride = { title: string; description: string; graph: unknown[] };

const dr = {
  title: "AI Deep Research: Live Web Searches & Cited Reports",
  description:
    "Research any topic with AmmarAI Deep Research. Search the live web, compare sources, and get a structured report with verifiable citations. Try it today.",
};
const pe = {
  title: "AI Personas & Skills for Consistent, Reusable AI Workflows",
  description:
    "Create reusable AI personas with custom expertise, tone, knowledge, and skills. Use consistent experts in chat, writing tools, agents, and chatbots.",
};
const ab = {
  title: "AI Agent Builder: Automate Workflows Without Code",
  description:
    "Build no-code AI agents that use your tools, automate recurring tasks, and pause for approval on sensitive actions. Create your AI agent with AmmarAI today.",
};
const personaFeatures = [
  "Custom expertise and role instructions",
  "Consistent tone of voice",
  "Attach knowledge files",
  "Reusable skills",
  "Use in AI Chat",
  "Use in writing tools",
  "Use in AI agents",
  "Use in website chatbots",
  "Share personas across your workspace",
];

export const SEO_OVERRIDES: Record<string, SeoOverride> = {
  "ai-deep-research": {
    ...dr,
    graph: [
      page("ai-deep-research", dr.title, dr.description),
      {
        "@type": "Service",
        "@id": `${S}/ai-deep-research#service`,
        name: "AmmarAI Deep Research",
        serviceType: "AI web research and cited report generation",
        description: dr.description,
        provider: { "@id": `${S}/#organization` },
        url: `${S}/ai-deep-research`,
      },
      {
        "@type": "HowTo",
        "@id": `${S}/ai-deep-research#howto`,
        name: "How to run deep research with AmmarAI",
        step: [
          { "@type": "HowToStep", position: 1, name: "Ask your research question" },
          { "@type": "HowToStep", position: 2, name: "AmmarAI searches and compares live web sources" },
          { "@type": "HowToStep", position: 3, name: "Review the structured report and verify its citations" },
        ],
      },
      crumbs("ai-deep-research", "AI Deep Research"),
      org,
      site,
    ],
  },
  "ai-personas": {
    ...pe,
    graph: [
      page("ai-personas", pe.title, pe.description),
      {
        "@type": "SoftwareApplication",
        "@id": `${S}/ai-personas#feature`,
        name: "AmmarAI Personas & Skills",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        description: pe.description,
        featureList: personaFeatures,
        publisher: { "@id": `${S}/#organization` },
      },
      {
        "@type": "ItemList",
        "@id": `${S}/ai-personas#capabilities`,
        name: "AI persona capabilities",
        itemListElement: personaFeatures.map((name, i) => ({ "@type": "ListItem", position: i + 1, name })),
      },
      org,
      site,
    ],
  },
  "ai-agent-builder": {
    ...ab,
    graph: [
      org,
      site,
      crumbs("ai-agent-builder", "AI Agent Builder"),
      page("ai-agent-builder", ab.title, ab.description),
      {
        "@type": "SoftwareApplication",
        "@id": `${S}/ai-agent-builder#software`,
        name: "AmmarAI AI Agent Builder",
        alternateName: "AI Agent Builder",
        description:
          "Build no-code AI agents that use your tools, run recurring tasks, and report results.",
        operatingSystem: "Web",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "AI workflow automation",
        url: `${S}/ai-agent-builder`,
        publisher: { "@id": `${S}/#organization` },
        featureList: [
          "Describe agent jobs in plain language",
          "Connect web search, documents, email, calendar, spreadsheets, and other tools",
          "Run agents on a schedule, trigger, or on demand",
          "Chain multiple workflow steps",
          "Require approval before sensitive actions",
          "View step-by-step execution logs",
        ],
      },
    ],
  },
};
