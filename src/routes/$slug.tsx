import { renderInline } from "@/components/cms/RichTextArea";
import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { retiredToolRedirects } from "@/data/retired-tools";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Tool, UseCase } from "@/data/types";
import { siteContentQuery } from "@/lib/content";
import { SITE, softwareApplicationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading, Card, NumberedList, BulletList } from "@/components/site/primitives";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { ExternalButton, ButtonLink, buttonClass } from "@/components/site/Button";
import { RelatedTools, ToolCard } from "@/components/site/ToolCard";
import { AnimatedExample } from "@/components/site/AnimatedExample";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { toolDemoMedia, type ToolDemoMedia } from "@/data/tool-demos";
import { tutorialsByTool } from "@/data/tutorials";
import { flagshipWorkflows, pillarForTool } from "@/data/ecosystem";
import { useCases } from "@/data/use-cases";

/**
 * One sample per example. CMS overrides win: `demoVideoUrl` / `demoVideoCaption`
 * accept a newline- or comma-separated list mapped to examples in order.
 */
function resolveDemoVideos(tool: Tool): (ToolDemoMedia | undefined)[] | undefined {
  if (tool.hideDemoVideo) return undefined;
  const fallback = toolDemoMedia[tool.slug] ?? [];
  const split = (value?: string) =>
    (value ?? "")
      .split(/[\n,]+/)
      .map((v) => v.trim())
      .filter(Boolean);
  const urls = split(tool.demoVideoUrl);
  const captions = split(tool.demoVideoCaption);
  const count = Math.max(fallback.length, urls.length);
  if (count === 0) return undefined;

  const resolved = Array.from({ length: count }, (_, i) => {
    const base = fallback[i];
    const override = urls[i];
    if (!override && !base) return undefined;
    const media: ToolDemoMedia = { ...base };
    const overrideFilename = override?.split("/").pop();
    const fallbackFilename = base?.url?.split("/").pop();
    const overrideDuplicatesBundledAsset = Boolean(
      override?.includes("/media/") &&
        base?.url &&
        overrideFilename &&
        overrideFilename === fallbackFilename,
    );
    if (override && !base?.inputVideo && !overrideDuplicatesBundledAsset) {
      media.url = override;
      media.kind = base?.kind ?? (/\.(mp3|wav|m4a|ogg)$/i.test(override) ? "audio" : /\.(png|jpe?g|webp|avif|gif)$/i.test(override) ? "image" : "video");
    }
    const caption = captions[i] ?? base?.caption;
    if (caption) media.caption = caption;
    else if (media.url) media.caption = `Sample output from the ${tool.name}.`;
    return media;
  });
  return resolved.some(Boolean) ? resolved : undefined;
}



function useToolMap() {
  const { data } = useSuspenseQuery(siteContentQuery);
  return new Map(data.tools.map((t) => [t.slug, t]));
}

export const Route = createFileRoute("/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    const redirectTarget = retiredToolRedirects[params.slug];
    if (redirectTarget) {
      throw redirect({ to: "/$slug", params: { slug: redirectTarget }, statusCode: 301 });
    }
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    const tool = content.tools.find((t) => t.slug === params.slug);
    if (tool) return { kind: "tool" as const, tool };
    const useCase = content.useCases.find((u) => u.slug === params.slug);
    if (useCase) return { kind: "useCase" as const, useCase };
    throw notFound();
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const title =
      loaderData.kind === "tool" ? loaderData.tool.title : loaderData.useCase.title;
    const description =
      loaderData.kind === "tool"
        ? loaderData.tool.description
        : loaderData.useCase.description;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://ammarai.com/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://ammarai.com/${params.slug}` }],
    };
  },
  component: SlugPage,
});

function SlugPage() {
  const data = Route.useLoaderData();
  if (data.kind === "tool") return <ToolPage tool={data.tool} />;
  return <UseCasePage useCase={data.useCase} />;
}

function Json({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function ToolPage({ tool }: { tool: Tool }) {
  const toolMap = useToolMap();
  const workflow = flagshipWorkflows.find((item) => item.slug === tool.slug);
  const relatedSlugs = tool.related.length >= 4
    ? tool.related
    : [...new Set([
        ...tool.related,
        ...Array.from(toolMap.values())
          .filter((candidate) => candidate.slug !== tool.slug && pillarForTool(candidate) === pillarForTool(tool))
          .map((candidate) => candidate.slug),
      ])].slice(0, 4);
  const relatedUseCases = workflow
    ? workflow.useCaseSlugs.flatMap((slug) => useCases.find((item) => item.slug === slug) ?? [])
    : useCases.filter((item) => item.toolkit.some((entry) => entry.slug === tool.slug)).slice(0, 3);
  return (
    <article>
      <Json data={softwareApplicationJsonLd(tool.name, tool.description, `/${tool.slug}`)} />
      <Json data={faqJsonLd(tool.faqs)} />
      <Json
        data={breadcrumbJsonLd([
          { label: "Home", path: "/" },
          { label: "AI Tools", path: "/ai-tools" },
          { label: tool.name, path: `/${tool.slug}` },
        ])}
      />

      <Section className="pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "AI Tools", to: "/ai-tools" },
              { label: tool.name },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">{pillarForTool(tool)} / {tool.category}</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">{tool.h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {renderInline(tool.lede)}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <ExternalButton href={REGISTER_URL} size="lg">
                {tool.ctaLabel}
              </ExternalButton>
              <ButtonLink to="/pricing" variant="outline" size="lg">
                See pricing
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {workflow ? (
        <Section className="tool-workflow-section">
          <Container>
            <SectionHeading eyebrow="Workflow" title={`From input to outcome with ${tool.name}`} intro="A practical view of what you provide, what AmmarAI handles, and what you leave with." />
            <div className="tool-workflow-grid mt-8">
              {[{ label: "What you provide", body: workflow.bring }, { label: "What AmmarAI does", body: workflow.process }, { label: "What you get", body: workflow.get }].map((item, index) => (
                <Card key={item.label} className="p-6"><span className="ecosystem-number">0{index + 1}</span><h3 className="mt-4 text-base font-semibold text-foreground">{item.label}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p></Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="sand" className="py-14 sm:py-20">
        <Container>
          <SectionHeading title={`What is the ${tool.name}?`} />
          <div className="prose-editorial mt-6 max-w-3xl">
            {tool.what.map((p) => (
              <p key={p.slice(0, 40)}>{renderInline(p)}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title={`What you can do with the ${tool.name}`}
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {tool.canDo.map((item) => (
              <Card key={item} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden="true" className="text-accent">
                  →
                </span>
                <span className="text-foreground">{item}</span>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="How it works" title={`Using the ${tool.name}`} />
          <NumberedList items={tool.how} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Examples" title="What good input and output look like" />
          <AnimatedExample
            examples={tool.examples}
            toolName={tool.name}
            demoVideos={resolveDemoVideos(tool)}
            className="mt-8 max-w-3xl"
          />

          {tool.examples.length > 2 ? (
            <SamplePromptAccordion examples={tool.examples} />
          ) : (
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {tool.examples.map((ex) => (
                <Card key={ex.label} className="p-6">
                  <p className="eyebrow">{ex.label}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Input
                  </p>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-foreground">
                    {ex.input}
                  </p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Output
                  </p>
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {ex.output}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Key features" title="What the tool gives you" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tool.capabilities.map((cap) => (
              <Card key={cap.title} className="p-6">
                <h3 className="text-base font-semibold text-foreground">{cap.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {cap.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Who it is for" title="People who get the most from this" />
          <div className="mt-8 grid gap-x-10 gap-y-6 sm:grid-cols-2">
            {tool.audiences.map((a) => (
              <div key={a.who} className="border-t border-border pt-4">
                <h3 className="text-base font-semibold text-foreground">{a.who}</h3>
                <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {a.why}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Workflows" title="Practical ways teams use it" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {tool.useCases.map((uc) => (
              <Card key={uc.title} className="p-6">
                <h3 className="text-base font-semibold text-foreground">{uc.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {uc.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-12 md:grid-cols-2">
            <div>
              <h2 className="text-2xl sm:text-3xl">Tips that improve results</h2>
              <BulletList items={tool.tips} className="mt-5" />
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl">Mistakes worth avoiding</h2>
              <BulletList items={tool.mistakes} className="mt-5" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="narrow">
          <FaqAccordion heading={`${tool.name} FAQ`} items={tool.faqs} />
        </Container>
      </Section>

      {(() => {
        const toolTutorials = tutorialsByTool.get(tool.slug) ?? [];
        if (toolTutorials.length === 0) return null;
        return (
          <Section>
            <Container size="narrow">
              <div className="flex flex-col gap-6">
                {toolTutorials.map((tutorial) => (
                  <div key={tutorial.slug} className="tool-tutorial-link">
                    <p className="eyebrow">Tutorial</p>
                    <h2 className="mt-2 text-2xl sm:text-3xl">{tutorial.h1}</h2>
                    <p className="mt-3 text-muted-foreground">{tutorial.description}</p>
                    <Link
                      to="/tutorials/$slug"
                      params={{ slug: tutorial.slug }}
                      className={buttonClass("primary", "md", "mt-5")}
                    >
                      Read the tutorial
                    </Link>
                  </div>
                ))}
              </div>
            </Container>
          </Section>
        );
      })()}

      <Section>
        <Container>
          <SectionHeading eyebrow="Related" title="Tools that pair well with this" />
          <div className="mt-8">
            <RelatedTools slugs={relatedSlugs} tools={toolMap} />
          </div>
        </Container>
      </Section>

      {relatedUseCases.length > 0 ? (
        <Section tone="sand">
          <Container>
            <SectionHeading eyebrow="Related workflows" title="See how this tool fits into real work" />
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedUseCases.map((item) => (
                <Card key={item.slug} interactive className="p-6"><p className="eyebrow">{item.audience}</p><h3 className="mt-3 text-base font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}</Link></h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.summary}</p></Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="ink" className="py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Try the {tool.name} free</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline} Start on the free plan and upgrade only when the volume demands it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
            <ButtonLink to="/ai-tools" search={(previous) => ({ ...previous, pillar: undefined })} variant="ghost" size="lg" className="text-ink-foreground">
              Browse all tools
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function UseCasePage({ useCase }: { useCase: UseCase }) {
  const toolMap = useToolMap();
  const toolkit = useCase.toolkit
    .map((t) => ({ tool: toolMap.get(t.slug), why: t.why }))
    .filter((t): t is { tool: Tool; why: string } => Boolean(t.tool));

  return (
    <article>
      <Json data={faqJsonLd(useCase.faqs)} />
      <Json data={{
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": `${SITE.url}/${useCase.slug}#webpage`,
        url: `${SITE.url}/${useCase.slug}`,
        name: useCase.title,
        headline: useCase.h1,
        description: useCase.description,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE.url}/#website` },
        about: useCase.toolkit.map((entry) => ({ "@type": "SoftwareApplication", name: toolMap.get(entry.slug)?.name ?? entry.slug })),
      }} />
      <Json
        data={breadcrumbJsonLd([
          { label: "Home", path: "/" },
          { label: "Use Cases", path: "/use-cases" },
          { label: useCase.name, path: `/${useCase.slug}` },
        ])}
      />

      <Section className="pb-10 pt-10 sm:pb-14 sm:pt-14">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Use Cases", to: "/use-cases" },
              { label: useCase.name },
            ]}
          />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">{useCase.audience}</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">{useCase.h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              {useCase.lede}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} size="lg">
                Start creating free
              </ExternalButton>
              <ButtonLink to="/ai-tools" search={(previous) => ({ ...previous, pillar: undefined })} variant="outline" size="lg">
                Browse the tools
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <div className="prose-editorial max-w-3xl">
            {useCase.intro.map((p) => (
              <p key={p.slice(0, 40)}>{renderInline(p)}</p>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="The problem" title="What usually gets in the way" />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {useCase.challenges.map((c) => (
              <Card key={c.title} className="p-6">
                <h3 className="text-base font-semibold text-foreground">{c.title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Workflows" title="How the work actually gets done" />
          <NumberedList items={useCase.workflows.map((w) => ({ title: w.title, body: w.body }))} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Toolkit" title="The tools this relies on" />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {toolkit.map(({ tool, why }) => (
              <Card key={tool.slug} className="p-6">
                <Link
                  to="/$slug"
                  params={{ slug: tool.slug }}
                  className="text-base font-semibold text-foreground hover:text-accent"
                >
                  {tool.name}
                </Link>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {why}
                </p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Outcomes" title="What changes when this works" />
          <BulletList items={useCase.outcomes} className="mt-6 max-w-3xl" />
        </Container>
      </Section>

      <Section>
        <Container size="narrow">
          <FaqAccordion heading={`${useCase.name} FAQ`} items={useCase.faqs} />
        </Container>
      </Section>

      <Section tone="ink" className="py-16 sm:py-20">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Put this to work today</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            Every tool mentioned here is included. Start free and scale when it earns it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
            <ButtonLink to="/pricing" variant="ghost" size="lg" className="text-ink-foreground">
              See pricing
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </article>
  );
}

export { ToolCard };
