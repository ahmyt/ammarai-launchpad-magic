import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Bot, Image, Search, Sparkles, Video, WandSparkles } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { tools, featuredTools, popularTools, recentTools, usedCategories, suggestTools, toolsByCategory } from "@/data/tools";
import { useCases } from "@/data/use-cases";
import { features } from "@/data/features";
import { posts } from "@/data/posts";
import { SITE, organizationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { ExternalButton, ButtonLink } from "@/components/site/Button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { assetUrl } from "@/lib/asset-url";
import { TrustLogoStrip } from "@/components/site/TrustLogoStrip";
import { CustomerReviews } from "@/components/site/CustomerReviews";
import videoProDemo from "@/assets/demo-video-generator.mp4.asset.json";
import videoEditorDemo from "@/assets/demo-video-editor.mp4.asset.json";
import ugcDemo from "@/assets/demo-ugc-creator.mp4.asset.json";
import avatarDemo from "@/assets/demo-avatar-video.mp4.asset.json";

const title = "AmmarAI: One AI Platform for Writing, Video, Voice and Code";
const description =
  "130+ AI tools and templates in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.";

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
    title: "From brief to finished video",
    label: "AI Video Pro",
    slug: "ai-video-generator",
    src: assetUrl(videoProDemo.url),
  },
  {
    title: "A polished product edit",
    label: "AI Video Editor",
    slug: "ai-video-editor",
    src: assetUrl(videoEditorDemo.url),
  },
  {
    title: "Creator-style campaign video",
    label: "AI UGC Generator",
    slug: "ai-ugc-generator",
    src: assetUrl(ugcDemo.url),
  },
  {
    title: "A talking avatar presentation",
    label: "AI Avatar Video Generator",
    slug: "ai-avatar-generator",
    src: assetUrl(avatarDemo.url),
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
  const [query, setQuery] = useState("");
  const suggestions = useMemo(() => suggestTools(query).slice(0, 5), [query]);

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
    <div className="home-luxe overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      {/* Hero */}
      <section className="luxe-hero relative pb-16 pt-24 sm:pb-20 sm:pt-32">
        <Container size="wide" className="relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            <p className="luxe-kicker mx-auto"><Sparkles className="size-3.5" /> {tools.length} tools. One intelligent workspace.</p>
            <h1 className="mt-7 text-balance text-5xl font-bold leading-[0.98] sm:text-7xl lg:text-[5.75rem]">
              Everything you create,<br className="hidden sm:block" /> amplified by <span className="luxe-text">AmmarAI</span>
            </h1>
            <p className="mx-auto mt-7 max-w-3xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Build autonomous AI Agents, write with precision, and turn ideas into remarkable images,
              videos, voice, and campaigns — all in one workspace that remembers how your brand works.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ExternalButton href={REGISTER_URL} size="lg" className="w-full sm:w-auto">
                Start creating free <ArrowRight className="size-4" />
              </ExternalButton>
              <ButtonLink to="/ai-tools" variant="outline" size="lg" className="w-full sm:w-auto">
                Explore {tools.length} tools
              </ButtonLink>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No card required. Upgrade only when you need more.</p>
          </div>

          <div className="luxe-workspace mx-auto mt-14 max-w-6xl rise">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-md bg-accent/15 text-accent"><WandSparkles className="size-4" /></span>
                <div><p className="text-sm font-semibold text-foreground">AmmarAI Workspace</p><p className="text-xs text-muted-foreground">Choose a tool or describe your goal</p></div>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                {[Bot, Image, Video].map((Icon, index) => <span key={index} className="grid size-8 place-items-center rounded-md border border-border text-muted-foreground"><Icon className="size-3.5" /></span>)}
              </div>
            </div>
            <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
              <div className="border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <p className="eyebrow">Flagship workflows</p>
                <div className="mt-5 space-y-2">
                  {featuredTools.slice(0, 5).map((tool, index) => (
                    <Link key={tool.slug} to="/$slug" params={{ slug: tool.slug }} className={`luxe-tool-row ${index === 0 ? "is-active" : ""}`}>
                      <span className="text-xs tabular-nums">0{index + 1}</span><span>{tool.name}</span><ArrowRight className="ml-auto size-3.5" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="p-5 sm:p-7">
                <label htmlFor="home-search" className="sr-only">Describe what you want to make</label>
                <div className="luxe-search flex items-center gap-3 px-4">
                  <Search className="size-4 shrink-0 text-accent" />
                  <input id="home-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you want to create today?" className="h-14 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
                  <span className="hidden rounded border border-border px-2 py-1 text-[10px] text-muted-foreground sm:block">⌘ K</span>
                </div>
                <div className="mt-5 min-h-[12rem]">
                {query.trim() === "" ? (
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Popular starting points</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {[
                        "a blog post about pricing",
                        "product descriptions",
                        "a voiceover for a reel",
                        "transcribe an interview",
                        "an ad for Instagram",
                      ].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setQuery(s)}
                          className="rounded-md border border-border bg-secondary/40 px-3 py-2.5 text-left text-xs font-medium text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : suggestions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Nothing matched. Try plainer words, like “video”, “email” or “photo”.
                  </p>
                ) : (
                  <ul className="grid gap-2">
                    {suggestions.map((tool) => (
                      <li key={tool.slug} className="rounded-md border border-border bg-secondary/30 p-3">
                        <Link
                          to="/$slug"
                          params={{ slug: tool.slug }}
                          className="group flex items-start justify-between gap-3"
                        >
                          <span>
                            <span className="block text-sm font-semibold text-foreground group-hover:text-accent">
                              {tool.name}
                            </span>
                            <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                              {tool.summary}
                            </span>
                          </span>
                          <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <TrustLogoStrip />

      {/* Featured */}
      <Section tone="sand" className="luxe-flagships">
        <Container>
          <SectionHeading
            eyebrow="Flagship tools"
            title="Eight flagship tools, one workspace"
            intro="AI Agent Builder, AI Writer, Chat Pro, Image Pro, Video Pro, Avatar Video, Transcription and SEO Analyzer form the core of AmmarAI — eight focused tools for creating, understanding and improving your work."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool, index) => (
              <ToolCard key={tool.slug} tool={tool} className={index === 0 || index === 3 ? "lg:col-span-2 luxe-featured-card" : ""} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Video library */}
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Video library"
            title="See what the video tools can make"
            intro="Watch real samples from four different workflows, then open the tool behind each result."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {videoLibrary.map((item) => (
              <Card key={item.slug} className="overflow-hidden p-0">
                <video
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  src={item.src}
                  aria-label={`${item.label} sample video`}
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
      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="The library"
            title="Organised by the job, not by the technology"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryPreview.map((group) => (
              <Card key={group.category} className="p-6">
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
      <Section tone="sand">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
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
            <div>
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
      <Section>
        <Container>
          <SectionHeading
            eyebrow="Why one workspace"
            title="What makes 138 tools feel like one product"
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow={cmp.eyebrow} title={cmp.title} intro={cmp.intro} />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {/* The old way */}
            <div className="flex flex-col rounded-xl bg-card p-6 ring-1 ring-border">
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
                <p className="font-display text-2xl font-semibold text-foreground">
                  {cmp.oldTotal}
                </p>
              </div>
            </div>

            {/* AmmarAI */}
            <div className="flex flex-col rounded-xl bg-ink p-6 text-ink-foreground shadow-[0_24px_60px_-40px_rgba(0,0,0,0.55)]">
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
                <p className="font-display text-2xl font-semibold">{cmp.newTotal}</p>
              </div>
            </div>
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
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
      <Section>
        <Container>
          <SectionHeading eyebrow="Use cases" title="Built around how people actually work" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.slice(0, 6).map((uc) => (
              <Card key={uc.slug} interactive className="p-6">
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
      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="From the blog" title="Guides worth your time" />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <Card key={post.slug} interactive className="p-6">
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
      <Section>
        <Container size="narrow">
          <FaqAccordion heading="Common questions" items={homeFaqs} />
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="ink" className="py-20">
        <Container className="text-center">
          <h2 className="text-balance text-4xl leading-tight sm:text-5xl">
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
            <ButtonLink to="/pricing" variant="ghost" size="lg" className="text-ink-foreground">
              Compare plans
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </div>
  );
}
