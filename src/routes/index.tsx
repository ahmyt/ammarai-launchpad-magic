import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Bot, Check, Files, History, Layers3, Search, Sparkles, SwatchBook, WandSparkles } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { tools, featuredTools, popularTools, recentTools, usedCategories, suggestTools, toolsByCategory } from "@/data/tools";
import { useCases } from "@/data/use-cases";
import { features } from "@/data/features";
import { posts } from "@/data/posts";
import { SITE, organizationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { ActionButton, ExternalButton, ButtonLink } from "@/components/site/Button";
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
  "140 AI tools and templates in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.;

const goalPrompts = [
  "Write a blog post about pricing",
  "Create a product description",
  "Make a promotional video",
  "Generate a voiceover",
  "Transcribe an interview",
  "Create an Instagram ad",
  "Build an AI agent",
];

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
  const searchRef = useRef<HTMLInputElement>(null);
  const suggestions = useMemo(() => suggestTools(query).slice(0, 5), [query]);

  useEffect(() => {
    const focusSearch = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

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
    <div className="home-premium home-swiss overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      <section className="studio-hero relative border-b border-border pb-14 pt-8 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <Container size="wide" className="relative z-10">
          <div className="studio-hero-copy">
            <div className="studio-hero-index" aria-hidden="true">A/01</div>
            <p className="studio-kicker"><Sparkles className="size-3.5" /> {tools.length} tools · one intelligent workspace</p>
            <div className="studio-hero-grid">
              <h1>
                <span>One AI for</span>
                <span>everything</span>
                <span className="studio-accent-text">you create</span>
              </h1>
              <div className="studio-hero-aside">
                <p className="text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg">
                  Build autonomous AI Agents, draft with AI Writer, think with Chat Pro, create with Image Pro
                  and Video Pro, build talking avatars, transcribe recordings and audit SEO. Add CRM,
                  voiceovers, document analysis and code tools — all in one connected workspace.
                </p>
                <div className="studio-hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
                  <ExternalButton href={REGISTER_URL} size="lg" className="studio-primary-cta w-full sm:w-auto">
                    Start creating free <ArrowRight className="size-4" />
                  </ExternalButton>
                  <ButtonLink to="/ai-tools" variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore {tools.length} tools
                  </ButtonLink>
                </div>
                <p className="studio-hero-note mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Check className="size-3.5 text-success" /> No card required. Every tool included.</p>
              </div>
            </div>
          </div>

          <div className="studio-command mx-auto mt-10 max-w-7xl overflow-hidden bg-card ring-1 ring-border sm:mt-16">
            <div className="studio-command-header flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="studio-command-icon grid size-10 place-items-center bg-accent text-accent-foreground"><WandSparkles className="size-4" /></span>
                <div className="text-left"><p className="text-sm font-semibold text-foreground">AmmarAI command center</p><p className="text-xs text-muted-foreground">Choose a flagship tool or describe your goal</p></div>
              </div>
              <span className="studio-status"><span className="size-1.5 rounded-full bg-success" /> All tools ready</span>
            </div>
             <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
              <div className="studio-command-sidebar border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <p className="studio-label">Flagship workspace</p>
                <div className="mt-4 grid gap-1 sm:grid-cols-2 lg:grid-cols-1">
                  {featuredTools.slice(0, 6).map((tool, index) => (
                    <Link key={tool.slug} to="/$slug" params={{ slug: tool.slug }} className="studio-tool-row group">
                      <span className="studio-tool-index">0{index + 1}</span><span>{tool.name}</span><ArrowRight className="ml-auto size-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="studio-command-main p-5 sm:p-7 lg:p-8">
                <label htmlFor="home-search" className="sr-only">Describe what you want to make</label>
                <div className="studio-search flex items-center gap-3 border border-input bg-background px-4 focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
                  <Search className="size-4 shrink-0 text-accent" />
                  <input ref={searchRef} id="home-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="What do you want to create?" className="h-16 min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-muted-foreground" />
                  <span className="hidden rounded-md border border-border bg-secondary px-2 py-1 text-[10px] text-muted-foreground sm:block">⌘ K</span>
                </div>
                <div className={`studio-command-results mt-6 ${query.trim() === "" ? "studio-command-results-prompts" : "studio-command-results-active"}`}>
                {query.trim() === "" ? (
                  <div>
                    <p className="studio-label">Popular starting points</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {goalPrompts.map((prompt) => (
                        <ActionButton
                          key={prompt}
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => setQuery(prompt)}
                          className="h-auto justify-start rounded-full py-2 text-left text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                          {prompt}
                        </ActionButton>
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
                      <li key={tool.slug} className="rounded-lg border border-border bg-secondary/40 p-3 transition-colors hover:bg-secondary">
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
            </div>
        </Container>
      </section>

      <TrustLogoStrip />

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
              <ToolCard key={tool.slug} tool={tool} className={index === 0 || index === 3 ? "studio-featured-card lg:col-span-2 min-h-52 justify-end" : "min-h-52"} />
            ))}
          </div>
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
                  poster={item.src.replace(/\.mp4$/, ".poster.jpg")}
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
            title="What makes 140 tools feel like one product"
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
