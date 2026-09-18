import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Bot, Check, Files, History, Layers3, SwatchBook } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { tools, featuredTools, popularTools, recentTools, usedCategories, toolsByCategory } from "@/data/tools";
import { useCases } from "@/data/use-cases";
import { features } from "@/data/features";
import { posts } from "@/data/posts";
import { SITE, organizationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { ExternalButton, ButtonLink } from "@/components/site/Button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { TrustLogoStrip } from "@/components/site/TrustLogoStrip";
import { CustomerReviews } from "@/components/site/CustomerReviews";
import { SecondaryToolsCarousel } from "@/components/site/SecondaryToolsCarousel";

const title = "AmmarAI: One AI Platform for Writing, Video, Voice and Code";
const description =
  "151 AI tools and templates in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.";

const workspaceBenefits = [
  { label: "One account", icon: Check },
  { label: "Shared history", icon: History },
  { label: "Brand voice", icon: SwatchBook },
  { label: "Files & templates", icon: Files },
  { label: "Multiple AI models", icon: Layers3 },
  { label: "Assistants & agents", icon: Bot },
];

const homeFaqs = [
  {
    q: "What is AmmarAI?",
    a: "A single AI workspace covering writing, chat, image and video generation, voice, transcription, vision, document analysis and code, so you are not paying for and switching between six separate services.",
  },
  {
    q: "Is it free to start?",
    a: "Yes. The free plan is permanent and includes every tool with a monthly allowance, which is enough to produce real work before deciding to pay.",
  },
  {
    q: "Who is it for?",
    a: "Marketers, creators, small businesses, agencies, e-commerce teams, students and developers. The use case pages describe each workflow in detail.",
  },
  {
    q: "Does it replace writers and designers?",
    a: "No. It removes the blank page and the repetitive production work. The output still needs a person who knows the subject to verify claims and add the specifics that make it worth reading.",
  },
];

const oldWay = [
  "ChatGPT / Claude / Gemini subscription",
  "Separate image tool",
  "Separate video tool",
  "Separate voice tool",
  "Constant tab switching",
];

const ammarAi = [
  "Writing + Chat",
  "Image generation",
  "Video generation",
  "Voiceover & transcription",
  "Shared brand voice and history",
  "One subscription. One workspace.",
];

const videoLibrary = [
  {
    title: "Grandparents eating at the table",
    label: "AI Video Pro",
    slug: "ai-video-generator",
    src: "/media/ai-video-pro-family-lunch.webm",
    poster: "/media/ai-video-pro-family-lunch.poster.jpg",
    accessibilityLabel: "AI Video Pro sample: grandparents and grandchildren sharing a warm animated family meal at the table",
  },
  {
    title: "A polished product edit",
    label: "AI Video Editor",
    slug: "ai-video-editor",
    src: "/media/demo-video-editor.webm",
    poster: "/media/demo-video-editor.poster.jpg",
  },
  {
    title: "Skincare serum creator review",
    label: "AI UGC Generator",
    slug: "ai-ugc-generator",
    src: "/media/ai-ugc-skincare-serum.webm",
    poster: "/media/ai-ugc-skincare-serum.poster.jpg",
    accessibilityLabel: "AI UGC Generator sample: a woman presenting and demonstrating an amber-bottle facial serum",
  },
  {
    title: "A talking avatar presentation",
    label: "AI Avatar Video Generator",
    slug: "ai-avatar-generator",
    src: "/media/demo-avatar-video.webm",
    poster: "/media/demo-avatar-video.poster.jpg",
  },
];

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.ensureQueryData(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
  }),
  component: Home,
});

export function Home() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const page = content.pages.find((p) => p.slug === "home");
  const settings = content.pages.find((p) => p.slug === "settings");
  const cmp = {
    eyebrow: page?.comparisonEyebrow || "The math",
    title: page?.comparisonTitle || "Stop paying for five AI tools",
    intro:
      page?.comparisonIntro ||
      "Stack a chat subscription, an image tool, a video tool and a voice tool and you are out $80\u2013120 a month \u2014 and still switching tabs. AmmarAI replaces all of them with one workspace.",
    oldLabel: page?.comparisonOldLabel || "The old way",
    oldItems: page?.comparisonOldItems?.length ? page.comparisonOldItems : oldWay,
    oldTotalLabel: page?.comparisonOldTotalLabel || "Total",
    oldTotal: page?.comparisonOldTotal || "$80\u2013120+/month",
    newLabel: page?.comparisonNewLabel || "AmmarAI",
    newItems: page?.comparisonNewItems?.length ? page.comparisonNewItems : ammarAi,
    newTotalLabel: page?.comparisonNewTotalLabel || "Total",
    newTotal: page?.comparisonNewTotal || "One subscription",
    ctaLabel: page?.comparisonCtaLabel || "Start free \u2014 no card required",
    secondaryLabel: page?.comparisonSecondaryLabel || "Compare plans",
  };
  const categoryPreview = useMemo(
    () =>
      usedCategories.slice(0, 8).map((c) => ({
        category: c,
        count: toolsByCategory(c).length,
        sample: toolsByCategory(c).slice(0, 3),
      })),
    [],
  );

  return (
    <div className="home-premium home-swiss home-editorial overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      <section className="editorial-hero border-b border-border">
        <Container size="wide" className="editorial-hero-layout">
          <div className="editorial-hero-copy">
            <p className="editorial-eyebrow">Workspace</p>
            <h1>Work gets finished here.</h1>
            <p className="editorial-hero-intro">
              Writer, images, and agents share one history—not another prompt box.
              Draft, revise, and run repeat work from the same workspace.
            </p>
            <div className="editorial-hero-actions">
              <ExternalButton href={REGISTER_URL} variant="ink" size="lg">
                Start free <ArrowRight className="size-4" />
              </ExternalButton>
              <ButtonLink to="/ai-tools" variant="outline" size="lg">
                Explore AI tools
              </ButtonLink>
            </div>
            <p className="editorial-hero-note">No card. Whole library on free, with limits.</p>
          </div>

          <div className="writer-frame" aria-label="AI Writer editing example">
            <div className="writer-frame-bar">
              <div>
                <p>AI Writer</p>
                <span>Campaign brief / Draft 03</span>
              </div>
              <span>Saved</span>
            </div>
            <div className="writer-frame-body">
              <aside aria-label="Document outline">
                <span>Outline</span>
                <ol>
                  <li className="is-active">Opening</li>
                  <li>Customer problem</li>
                  <li>Product proof</li>
                  <li>Next step</li>
                </ol>
              </aside>
              <article>
                <p className="writer-document-label">Product launch brief</p>
                <h2>A calmer way to ship the campaign</h2>
                <p>Give the team one place to draft the launch, revise the message, and keep the approved brand tone close.</p>
                <div className="writer-selection">
                  <p>Turn scattered notes into a clear campaign brief the team can review and publish.</p>
                  <div className="writer-popover" aria-label="Rewrite options">
                    <span>Rewrite selection</span>
                    <button type="button">Make more direct</button>
                    <button type="button">Match brand tone</button>
                    <button type="button">Shorten</button>
                  </div>
                </div>
                <p>When the wording is approved, the same workspace carries it into images and scheduled agent work.</p>
              </article>
            </div>
          </div>
        </Container>
      </section>

      <TrustLogoStrip faded={settings?.fadeHomepageLogos !== false} />

      {/* Featured */}
        <Section tone="sand" className="studio-section studio-flagships">
         <Container size="wide">
          <SectionHeading
            eyebrow="Flagship tools"
            title="Eight flagship tools, one workspace"
            intro="AI Agent Builder, AI Writer, Chat Pro, Image Pro, Video Pro, Avatar Video, Transcription and SEO Analyzer form the core of AmmarAI — eight focused tools for creating, understanding and improving your work."
             scale="large"
             className="studio-heading-wide"
          />
          <div className="studio-card-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool, index) => (
              <ToolCard
                key={tool.slug}
                tool={tool}
                {...(index === 0
                  ? { summary: "Build agents that run real workflows on a schedule or trigger. Connect web search, documents, email, calendars and spreadsheets, chain multiple steps, and require approval before sensitive actions." }
                  : {})}
                className={index === 0 || index === 3 ? "studio-featured-card lg:col-span-2 min-h-52 justify-end" : "min-h-52"}
              />
            ))}
          </div>
           <SecondaryToolsCarousel />
        </Container>
      </Section>

      {/* Video library */}
       <Section className="studio-section studio-video-section">
         <Container size="wide">
          <SectionHeading
            eyebrow="Video library"
            title="See what the video tools can make"
            intro="Watch real samples from four different workflows, then open the tool behind each result."
             scale="large"
             className="studio-heading-wide"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
             {videoLibrary.map((item, index) => (
               <Card key={item.slug} className={`studio-video-card overflow-hidden p-0 ${index === 0 ? "studio-video-lead sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}>
                <video
                  controls
                  muted
                  playsInline
                  preload="none"
                   poster={item.poster}
                  src={item.src}
                  aria-label={item.accessibilityLabel ?? `${item.label} sample video`}
                  className="aspect-video w-full bg-ink object-cover"
                />
                <div className="p-5">
                  <p className="eyebrow">{item.label}</p>
                  <h3 className="mt-2 text-xl leading-snug">
                    <Link
                      to="/$slug"
                      params={{ slug: item.slug }}
                      className="text-foreground transition-colors hover:text-accent"
                    >
                      {item.title} <span aria-hidden="true" className="text-accent">→</span>
                    </Link>
                  </h3>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Categories */}
        <Section tone="sand" className="studio-section studio-library-section">
        <Container>
          <SectionHeading
            eyebrow="The library"
            title="Organised by the job, not by the technology"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryPreview.map((group) => (
              <Card key={group.category} className="studio-category-card p-6">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-foreground">{group.category}</h3>
                  <span className="text-xs tabular-nums text-muted-foreground">{group.count}</span>
                </div>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {group.sample.map((t) => (
                    <li key={t.slug}>
                      <Link
                        to="/$slug"
                        params={{ slug: t.slug }}
                        className="text-sm text-muted-foreground transition-colors hover:text-accent"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/ai-tools" variant="outline">
              See all {tools.length} tools
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Popular + recent */}
       <Section className="studio-section studio-ranked-lists studio-section-compact">
        <Container>
           <div className="studio-ranked-shell grid gap-12 lg:grid-cols-2">
             <div className="studio-popular-panel">
              <SectionHeading eyebrow="Popular" title="Used most this month" />
              <ul className="mt-6 border-t border-border">
                {popularTools.slice(0, 6).map((tool) => (
                  <li key={tool.slug} className="border-b border-border py-3.5">
                    <Link
                      to="/$slug"
                      params={{ slug: tool.slug }}
                      className="flex items-baseline justify-between gap-4 text-sm"
                    >
                      <span className="font-semibold text-foreground hover:text-accent">
                        {tool.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{tool.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
             <div className="studio-recent-panel">
              <SectionHeading eyebrow="New" title="Recently added" />
              <div className="mt-6 grid gap-4">
                {recentTools.slice(0, 3).map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
       <Section tone="sand" className="studio-section studio-workspace-section">
        <Container>
          <SectionHeading
            eyebrow="Why one workspace"
            title="What makes 151 tools feel like one product"
            intro="One account and subscription connect your history, brand voice, files, templates, AI models and assistants across every workflow."
             scale="large"
             className="studio-heading-wide"
          />
           <ul className="studio-benefit-strip mt-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-6" aria-label="Connected workspace benefits">
            {workspaceBenefits.map(({ label, icon: Icon }) => (
              <li key={label} className="studio-benefit flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold text-foreground">
                <span className="grid size-8 place-items-center rounded-lg bg-accent/10"><Icon className="size-4 text-accent" aria-hidden="true" /></span>
                {label}
              </li>
            ))}
          </ul>
           <div className="studio-feature-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

      {/* Value comparison */}
       <Section className="studio-section studio-comparison">
         <Container size="wide">
           <SectionHeading eyebrow={cmp.eyebrow} title={cmp.title} intro={cmp.intro} align="center" scale="large" className="studio-comparison-heading" />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* The old way */}
            <div className="studio-comparison-card studio-comparison-old flex flex-col rounded-xl bg-card p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {cmp.oldLabel}
              </p>
              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {cmp.oldItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    <span aria-hidden="true" className="text-muted-foreground/50">
                      —
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-xs text-muted-foreground">{cmp.oldTotalLabel}</p>
                <p className="font-display text-2xl font-semibold tabular-nums text-foreground">
                  {cmp.oldTotal}
                </p>
              </div>
            </div>

            {/* AmmarAI */}
            <div className="studio-comparison-card studio-comparison-winner flex flex-col rounded-xl bg-ink p-7 text-ink-foreground">
              <p className="eyebrow">{cmp.newLabel}</p>
              <ul className="mt-5 flex flex-1 flex-col gap-3">
                {cmp.newItems.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm leading-relaxed">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-ink-foreground/20 pt-4">
                <p className="text-xs opacity-70">{cmp.newTotalLabel}</p>
                <p className="font-display text-2xl font-semibold tabular-nums">{cmp.newTotal}</p>
              </div>
            </div>
          </div>
           <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ExternalButton href={REGISTER_URL} size="lg">
              {cmp.ctaLabel}
            </ExternalButton>
            <ButtonLink to="/pricing" variant="outline" size="lg">
              {cmp.secondaryLabel}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <CustomerReviews />

      {/* Use cases */}
       <Section tone="sand" className="studio-section studio-usecases-section">
        <Container>
          <SectionHeading eyebrow="Use cases" title="Built around how people actually work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.slice(0, 6).map((uc) => (
              <Card key={uc.slug} interactive className="studio-usecase-card p-6">
                <p className="eyebrow">{uc.audience}</p>
                <h3 className="mt-3 text-base font-semibold">
                  <Link
                    to="/$slug"
                    params={{ slug: uc.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {uc.name}
                  </Link>
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {uc.summary}
                </p>
              </Card>
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink to="/use-cases" variant="outline">
              All use cases
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* Blog */}
       <Section className="studio-section studio-journal-section">
        <Container>
          <SectionHeading eyebrow="From the blog" title="Guides worth your time" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.slug} interactive className="studio-journal-card p-6">
                <p className="eyebrow">{post.category}</p>
                <h3 className="mt-3 text-balance text-base font-semibold leading-snug">
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

      {/* FAQ */}
       <Section tone="sand" className="studio-section studio-faq-section">
        <Container size="narrow">
          <FaqAccordion heading="Common questions" items={homeFaqs} />
        </Container>
      </Section>

      {/* CTA */}
       <Section tone="ink" className="studio-final-cta py-20 sm:py-28">
         <Container className="text-center">
           <p className="studio-final-kicker">Your complete AI workspace</p>
           <h2 className="mx-auto max-w-4xl text-balance text-5xl leading-[0.95] sm:text-7xl">
            Start with the free plan
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            Every tool, no card required. Upgrade only when your output volume makes the case for
            it.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
            <ButtonLink to="/pricing" variant="ghost" size="lg" className="studio-final-secondary text-ink-foreground">
              Compare plans
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
}
