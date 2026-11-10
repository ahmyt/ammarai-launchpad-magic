import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CompareMatrix, StackSavings } from "@/components/site/CompareTables";

const title = "AmmarAI vs ElevenLabs, Jasper, Simplified & Writesonic";
const description =
  "Compare AmmarAI with ElevenLabs, Jasper, Simplified and Writesonic on price, free plans, video, voice, images, chatbots and phone agents.";
const url = "https://ammarai.com/compare";

export const Route = createFileRoute("/compare")({
  staticData: { sitemap: true },
  head: () => ({
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
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Compare" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Compare</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">One studio instead of five subscriptions</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Most AI tools do one job well. AmmarAI puts writing, images, video, avatars, voice, chatbots and business
              phone agents behind one login and one credit balance.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="py-10">
        <Container>
          <SectionHeading title="Feature by feature" />
          <div className="mt-8"><CompareMatrix /></div>
          <p className="mt-3 text-xs text-muted-foreground">
            Competitor prices and features are approximate and change often; check each vendor's site. Partial means
            limited, add-on or developer-only.
          </p>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading title="What a separate tool stack costs" />
          <div className="mt-8"><StackSavings /></div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <SectionHeading title="When to choose which" />
          <ul className="mt-6 space-y-4 text-sm leading-relaxed">
            <li><strong>Choose ElevenLabs</strong> if you only need studio-grade audio, dubbing or a voice API.</li>
            <li><strong>Choose Jasper or Writesonic</strong> if your team only writes marketing copy.</li>
            <li><strong>Choose AmmarAI</strong> if you need voice, video, images, writing and customer calls without juggling separate bills.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="https://app.ammarai.com" className="rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground">Start free</a>
            <Link to="/pricing" className="rounded-md border border-border px-5 py-3 text-sm font-semibold">See pricing</Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
