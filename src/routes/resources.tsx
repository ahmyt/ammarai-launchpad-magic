import { createFileRoute, Link } from "@tanstack/react-router";
import { posts } from "@/data/posts";
import { featuredTools, popularTools } from "@/data/tools-lite";
import { features } from "@/data/features";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ToolCard } from "@/components/site/ToolCard";

const title = "Resources: Guides, Playbooks and Tool Picks | AmmarAI";
const description =
  "Practical guides to using AI well: writing workflows, video and voice production, SEO, prompting and AmmarAI platform features, gathered in one place.";

const resourceGuides = posts.slice(0, 6);
const resourceTools = [...featuredTools, ...popularTools].slice(0, 6);


export const Route = createFileRoute("/resources")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/resources" },
      { property: "og:image", content: "https://ammarai.com/media/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ammarai.com/media/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/resources" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "@id": "https://ammarai.com/resources#webpage",
            url: "https://ammarai.com/resources",
            name: title,
            headline: "Everything worth reading before you generate anything",
            description,
            inLanguage: "en",
            about: [
              { "@type": "Thing", name: "Artificial intelligence" },
              { "@type": "Thing", name: "AI content creation" },
              { "@type": "Thing", name: "AI writing" },
              { "@type": "Thing", name: "AI video production" },
              { "@type": "Thing", name: "AI voiceovers" },
              { "@type": "Thing", name: "AI SEO" },
            ],
            isPartOf: { "@id": "https://ammarai.com/#website" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            mainEntity: { "@id": "https://ammarai.com/resources#resource-list" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ammarai.com/#organization",
            url: "https://ammarai.com",
            name: "AmmarAI",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://ammarai.com/#website",
            url: "https://ammarai.com",
            name: "AmmarAI",
            inLanguage: "en",
            publisher: { "@id": "https://ammarai.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://ammarai.com/resources#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ammarai.com" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Resources",
                item: "https://ammarai.com/resources",
              },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "@id": "https://ammarai.com/resources#resource-list",
            url: "https://ammarai.com/resources",
            name: "AmmarAI Resources",
            description:
              "Guides and AI tool picks covering prompting, content creation, writing, video, voice production, SEO and AI workflows.",
            itemListOrder: "https://schema.org/ItemListOrderAscending",
            numberOfItems: resourceGuides.length + resourceTools.length,
            itemListElement: [
              ...resourceGuides.map((post, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: post.title,
                description: post.excerpt,
                item: {
                  "@type": "BlogPosting",
                  headline: post.title,
                  description: post.excerpt,
                  articleSection: post.category,
                  inLanguage: "en",
                  url: `https://ammarai.com/blog/${post.slug}`,
                  author: { "@id": "https://ammarai.com/#organization" },
                  publisher: { "@id": "https://ammarai.com/#organization" },
                },
              })),
              ...resourceTools.map((tool, i) => ({
                "@type": "ListItem",
                position: resourceGuides.length + i + 1,
                name: tool.name,
                description: tool.summary,
                item: {
                  "@type": "SoftwareApplication",
                  name: tool.name,
                  url: `https://ammarai.com/${tool.slug}`,
                  operatingSystem: "Web",
                  applicationCategory: "BusinessApplication",
                  applicationSubCategory: "Artificial Intelligence",
                  publisher: { "@id": "https://ammarai.com/#organization" },
                },
              })),
            ],
          },
        ]),
      },
    ],
  }),
  component: Resources,
});

function Resources() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Resources" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Learn</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Everything worth reading before you generate anything
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Guides written for people doing the work, with the limits stated honestly. Start with
              prompting, then pick the workflow closest to your job.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <SectionHeading eyebrow="Guides" title="Read these first" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resourceGuides.map((post) => (
              <Card key={post.slug} interactive className="p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-base font-semibold">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Start here" title="The tools most people open first" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resourceTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Platform" title="How the workspace itself works" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.slice(0, 6).map((f) => (
              <Card key={f.slug} interactive className="p-6">
                <h3 className="text-base font-semibold">
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {f.name}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {f.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
