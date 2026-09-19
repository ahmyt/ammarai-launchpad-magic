import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/content";
import { TOOL_COUNT } from "@/data/tools";
import { Container, Section, Card } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

const title = "Platform Features: How AmmarAI Works | AmmarAI";
const description =
  "Multi-model AI, brand voice, templates, bulk generation, uploads, assistants, team workspaces, history and clean exports.";

export const Route = createFileRoute("/features/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/features" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/features" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ammarai.com/#organization",
            url: "https://ammarai.com/",
            name: "AmmarAI",
            description:
              "AmmarAI is an AI workspace with multi-model generation, brand voice controls, templates, assistants, team workspaces, history and clean exports.",
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
            "@type": "WebPage",
            "@id": "https://ammarai.com/features#webpage",
            url: "https://ammarai.com/features",
            name: title,
            headline: "The parts that make a tool library into a workspace",
            description,
            inLanguage: "en",
            isPartOf: { "@id": "https://ammarai.com/#website" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            about: { "@id": "https://ammarai.com/features#software" },
            mainEntity: { "@id": "https://ammarai.com/features#software" },
            breadcrumb: { "@id": "https://ammarai.com/features#breadcrumb" },
          },
          {
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "@id": "https://ammarai.com/features#software",
            url: "https://ammarai.com/",
            name: "AmmarAI",
            applicationCategory: "BusinessApplication",
            applicationSubCategory: "Artificial Intelligence Software",
            operatingSystem: "Web",
            publisher: { "@id": "https://ammarai.com/#organization" },
            description:
              "An AI workspace that brings together multiple AI models, brand voice controls, templates, bulk generation, file uploads, custom assistants, team workspaces, history, versioning and clean exports.",
            featureList: [
              "Multi-model AI",
              "Brand voice settings",
              "Templates library",
              "Bulk generation",
              "File uploads for documents, images and audio",
              "Custom AI assistants",
              "Team workspaces",
              "Generation history and version restoration",
              "Clean exports and integrations",
              "Privacy and data control",
            ],
            offers: {
              "@type": "Offer",
              url: "https://ammarai.com/",
              name: "Start free",
              price: "0",
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://ammarai.com/features#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://ammarai.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Platform Features",
                item: "https://ammarai.com/features",
              },
            ],
          },
        ]),
      },
    ],
  }),
  loader: ({ context }) => context.queryClient.prefetchQuery(siteContentQuery),
  component: FeaturesIndex,
});

function FeaturesIndex() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const features = content.features;
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Features" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Platform</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              The parts that make a tool library into a workspace
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
               {TOOL_COUNT} tools are only useful if they share a voice, remember your work and export
              cleanly. These are the pieces that hold the whole thing together.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.slug} interactive className="p-6">
                <h2 className="text-base font-semibold">
                  <Link
                    to="/features/$slug"
                    params={{ slug: f.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {f.name}
                  </Link>
                </h2>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {f.summary}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">See it on your own work</h2>
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
