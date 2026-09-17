import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/content";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = "AI Use Cases by Role and Industry | AmmarAI Workflows";
const description =
  "See how marketers, creators, small businesses, agencies, students, developers and e-commerce teams use AmmarAI day to day — from hands-on creation to AI agents that schedule and publish for them.";
const url = "https://ammarai.com/use-cases";

export const Route = createFileRoute("/use-cases")({
  staticData: { sitemap: true },
  loader: async ({ context }) => {
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    return { useCases: content.useCases };
  },
  head: ({ loaderData }) => {
    const useCases = loaderData?.useCases ?? [];
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://ammarai.com/#organization",
              name: SITE.name,
              url: "https://ammarai.com/",
              description: SITE.description,
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://ammarai.com/#website",
              name: SITE.name,
              url: "https://ammarai.com/",
              publisher: { "@id": "https://ammarai.com/#organization" },
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "@id": "https://ammarai.com/#software",
              name: SITE.name,
              url: "https://ammarai.com/",
              description:
                "An AI creation platform for producing marketing copy, content, emails, documentation, social media posts, product listings and other everyday written work.",
              operatingSystem: "Web",
              applicationCategory: "BusinessApplication",
              publisher: { "@id": "https://ammarai.com/#organization" },
            },
            {
              "@context": "https://schema.org",
              "@type": "CollectionPage",
              "@id": `${url}#webpage`,
              url,
              name: title,
              headline: "The same platform, used very differently",
              description,
              isPartOf: { "@id": "https://ammarai.com/#website" },
              publisher: { "@id": "https://ammarai.com/#organization" },
              about: { "@id": "https://ammarai.com/#software" },
              mainEntity: { "@id": `${url}#use-cases` },
              breadcrumb: { "@id": `${url}#breadcrumb` },
              potentialAction: {
                "@type": "RegisterAction",
                name: "Start creating free",
                target: REGISTER_URL,
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "ItemList",
              "@id": `${url}#use-cases`,
              name: "AmmarAI Use Cases by Role",
              description:
                "Ways different professionals, teams and creators use AmmarAI in their daily workflows.",
              itemListOrder: "https://schema.org/ItemListOrderAscending",
              numberOfItems: useCases.length,
              itemListElement: useCases.map((uc, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: uc.name,
                description: uc.summary,
                url: `https://ammarai.com/${uc.slug}`,
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "@id": `${url}#breadcrumb`,
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: "https://ammarai.com/",
                },
                { "@type": "ListItem", position: 2, name: "Use Cases", item: url },
              ],
            },
          ]),
        },
      ],
    };
  },
  component: UseCasesIndex,
});

function UseCasesIndex() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const useCases = content.useCases;
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Use Cases" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">By role</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              The same platform, used very differently
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              A solo creator and a twelve-person agency reach for completely different parts of the
              platform — from hands-on creation tools to AI agents that research, schedule, and
              publish on their behalf. These pages describe the actual workflows, not the marketing
              version.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((uc) => (
              <Card key={uc.slug} interactive className="p-6">
                <p className="eyebrow">{uc.audience}</p>
                <h2 className="mt-3 text-base font-semibold">
                  <Link
                    to="/$slug"
                    params={{ slug: uc.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {uc.name}
                  </Link>
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {uc.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Find your workflow</h2>
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
