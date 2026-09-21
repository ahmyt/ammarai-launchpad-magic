import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { categoryOrder, suggestTools, TOOL_COUNT } from "@/data/tools";
import { pillarDetails, pillarForTool, pillarOrder, type EcosystemPillar } from "@/data/ecosystem";
import { siteContentQuery } from "@/lib/content";
import { Container, Section } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = `AI Tools Library: ${TOOL_COUNT}+ Tools, Agents & Templates | AmmarAI`;
const description =
  `Browse ${TOOL_COUNT} AI tools and templates for writing, chat, agents, marketing, SEO, images, video, voice and code. Find the right AI tool and start free today.`;

export const Route = createFileRoute("/ai-tools")({
  staticData: { sitemap: true },
  validateSearch: (search: Record<string, unknown>): { pillar?: EcosystemPillar } => {
    const value = search["pillar"];
    return typeof value === "string" && (pillarOrder as string[]).includes(value)
      ? { pillar: value as EcosystemPillar }
      : {};
  },
  loader: ({ context }) => context.queryClient.prefetchQuery(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/ai-tools" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/ai-tools" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://ammarai.com/ai-tools#webpage",
            url: "https://ammarai.com/ai-tools",
            name: title,
            headline: "Every AI tool, one workspace, one subscription",
            description,
            inLanguage: "en",
            about: { "@type": "Thing", name: "AI tools and templates" },
            isPartOf: { "@id": "https://ammarai.com/#website" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            mainEntity: { "@id": "https://ammarai.com/ai-tools#itemlist" },
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://ammarai.com/ai-tools#itemlist",
            name: "AmmarAI AI Tool Library",
            description:
              `A directory of ${TOOL_COUNT} AI tools across writing, chat, image, video, voice, transcription, vision, documents, marketing, SEO, e-commerce, productivity, sales, CRM and code.`,
            itemListOrder: "https://schema.org/ItemListUnordered",
            numberOfItems: TOOL_COUNT,
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ammarai.com/#organization",
            url: "https://ammarai.com/",
            name: "AmmarAI",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://ammarai.com/#website",
            url: "https://ammarai.com/",
            name: "AmmarAI",
            publisher: { "@id": "https://ammarai.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://ammarai.com/ai-tools#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "AmmarAI", item: "https://ammarai.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "AI Tools",
                item: "https://ammarai.com/ai-tools",
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: ToolsDirectory,
});

function ToolsDirectory() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const tools = content.tools;
  const navigate = useNavigate({ from: "/ai-tools" });
  const search = Route.useSearch();
  const pillar: "All" | EcosystemPillar = search["pillar"] ?? "All";
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const selectPillar = (item: "All" | EcosystemPillar) => {
    setCategory("All");
    setQuery("");
    void navigate({
      search: item === "All" ? {} : { pillar: item },
      replace: true,
    });
  };

  const usedCategories = useMemo(
    () => categoryOrder.filter((c) => tools.some((t) => t.category === c)),
    [tools],
  );

  const suggestions = useMemo(() => {
    const bySlug = new Map(tools.map((t) => [t.slug, t]));
    return suggestTools(query)
      .map((t) => bySlug.get(t.slug))
      .filter((t): t is (typeof tools)[number] => Boolean(t));
  }, [query, tools]);

  const filtered = useMemo(() => {
    if (query.trim()) return suggestions;
    const inPillar = pillar === "All" ? tools : tools.filter((tool) => pillarForTool(tool) === pillar);
    return category === "All" ? inPillar : inPillar.filter((t) => t.category === category);
  }, [query, category, pillar, suggestions, tools]);

  const visibleCategories = useMemo(
    () => usedCategories.filter((categoryName) => pillar === "All" || pillarDetails[pillar].categories.includes(categoryName)),
    [pillar, usedCategories],
  );

  // When browsing (not searching), AI Templates render grouped by topic.
  const browsing = !query.trim();
  const regularTools = filtered.filter((t) => t.category !== "AI Templates");
  const templateGroups = useMemo(() => {
    const order: string[] = [];
    const byGroup = new Map<string, typeof tools>();
    for (const t of filtered) {
      if (t.category !== "AI Templates") continue;
      const g = t.templateGroup ?? "More";
      if (!byGroup.has(g)) {
        byGroup.set(g, []);
        order.push(g);
      }
      const group = byGroup.get(g);
      if (group) group.push(t);
    }
    return order.flatMap((g) => {
      const groupedTools = byGroup.get(g);
      return groupedTools ? [{ group: g, tools: groupedTools }] : [];
    });
  }, [filtered, tools]);

  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Tools" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">The library</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Every AI tool, one workspace, one subscription
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {tools.length} tools across writing, chat, image, video, voice, transcription, vision,
              documents, marketing, SEO, e-commerce and code. Describe what you are trying to make
              and the directory will point you at the right one.
            </p>
          </div>

          <div className="mt-8 max-w-xl">
            <label htmlFor="tool-search" className="sr-only">
              Search the tool library
            </label>
            <input
              id="tool-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try: write product descriptions, make a voiceover, edit a photo…"
              className="w-full rounded-md bg-card px-4 py-3.5 text-sm text-foreground ring-1 ring-border placeholder:text-muted-foreground focus:outline-2 focus:outline-offset-2 focus:outline-ring"
            />
          </div>

          <div className="mt-8" aria-label="Filter tools by workflow">
            <p className="eyebrow mb-3">Start with the job</p>
            <div className="flex flex-wrap gap-2">
              {(["All", ...pillarOrder] as const).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => selectPillar(item)}
                  aria-pressed={pillar === item && !query}
                  className={pillar === item && !query ? "rounded-full bg-ink px-4 py-2 text-xs font-semibold text-ink-foreground" : "rounded-full px-4 py-2 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter tools by category">
              <button
                type="button"
                onClick={() => selectPillar("All")}
                aria-pressed={category === "All" && !query}
              className={
                category === "All" && !query
                  ? "rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground"
                  : "rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
              }
            >
              All
            </button>
            {visibleCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setQuery("");
                }}
                aria-pressed={category === c && !query}
                className={
                  category === c && !query
                    ? "rounded-full bg-ink px-3.5 py-1.5 text-xs font-semibold text-ink-foreground"
                    : "rounded-full px-3.5 py-1.5 text-xs font-semibold text-muted-foreground ring-1 ring-border transition-colors hover:text-foreground"
                }
              >
                {c}
              </button>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
            {query ? " matched" : category !== "All" ? ` in ${category}` : pillar !== "All" ? ` for ${pillar}` : ""}
          </p>
          {filtered.length === 0 ? (
            <p className="mt-8 text-sm text-muted-foreground">
              Nothing matched that. Try a plainer description of the job, such as “blog post”,
              “voiceover” or “product photo”.
            </p>
          ) : (
            <>
              {regularTools.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {regularTools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} />
                  ))}
                </div>
              )}
              {browsing &&
                templateGroups.map(({ group, tools: groupTools }) => (
                  <div key={group} className="mt-12">
                    <h2 className="text-xl font-semibold tracking-tight">
                      {category === "AI Templates" ? group : `${group} templates`}
                    </h2>
                    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {groupTools.map((tool) => (
                        <ToolCard key={tool.slug} tool={tool} />
                      ))}
                    </div>
                  </div>
                ))}
              {!browsing && templateGroups.length > 0 && (
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {templateGroups.flatMap((g) =>
                    g.tools.map((tool) => <ToolCard key={tool.slug} tool={tool} />),
                  )}
                </div>
              )}
            </>
          )}
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Every tool is on the free plan</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline}
          </p>
          <div className="mt-8">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
