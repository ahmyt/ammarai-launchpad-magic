import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ArrowRight, Bot, Check, Files, History, Layers3, Search, Sparkles, SwatchBook, WandSparkles } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { toolSummaries as tools, featuredTools, TOOL_COUNT, suggestTools } from "@/data/tools-lite";
import { features } from "@/data/features";
import { homepagePosts, homepageUseCases } from "@/data/homepage-content";
import { SITE, organizationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading, Card } from "@/components/site/primitives";
import { ExternalButton, ButtonLink } from "@/components/site/Button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { TrustLogoStrip } from "@/components/site/TrustLogoStrip";
import { AiModelsStrip } from "@/components/site/AiModelsStrip";
import { CustomerReviews } from "@/components/site/CustomerReviews";
import { SecondaryToolsCarousel } from "@/components/site/SecondaryToolsCarousel";
import { useTheme } from "@/components/site/ThemeProvider";
import { outcomeShortcuts } from "@/data/ecosystem";
import { EcosystemOverview, WorkflowStories } from "@/components/site/HomeEcosystem";
import { FlagshipCarousel } from "@/components/site/FlagshipCarousel";
import { featuredTutorials } from "@/data/tutorials-featured";

const title = "AmmarAI: One AI Platform for Writing, Video, Voice and Code";
const description =
  `AmmarAI is an all-in-one AI platform with ${TOOL_COUNT} tools and agents for writing, chat, images, video, voice, CRM and automation. Start creating free, no card.`;

const workspaceBenefits = [
  { label: "One account", icon: Check },
  { label: "Shared history", icon: History },
  { label: "Brand voice", icon: SwatchBook },
  { label: "Files & templates", icon: Files },
  { label: "Multiple AI models", icon: Layers3 },
  { label: "Assistants & agents", icon: Bot },
];

const howItWorks = [
  {
    step: 1,
    title: "Pick a tool",
    text: "Open the tool that matches the job — writing, chat, image, video, voice, transcription or an agent.",
  },
  {
    step: 2,
    title: "Describe the work",
    text: "Brief it in plain language. Your brand voice, files and history carry over automatically.",
  },
  {
    step: 3,
    title: "Publish or automate",
    text: "Export the result, or hand it to an agent that keeps producing on a schedule while you do something else.",
  },
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
    poster: "/media/ai-video-pro-family-lunch.poster.webp",
    accessibilityLabel: "AI Video Pro sample: grandparents and grandchildren sharing a warm animated family meal at the table",
  },
  {
    title: "A polished product edit",
    label: "AI Video Editor",
    slug: "ai-video-editor",
    src: "/media/demo-video-editor.webm",
    poster: "/media/demo-video-editor.poster.webp",
  },
  {
    title: "Skincare serum creator review",
    label: "AI UGC Generator",
    slug: "ai-ugc-generator",
    src: "/media/ai-ugc-skincare-serum.webm",
    poster: "/media/ai-ugc-skincare-serum.poster.webp",
    accessibilityLabel: "AI UGC Generator sample: a woman presenting and demonstrating an amber-bottle facial serum",
  },
  {
    title: "A talking avatar presentation",
    label: "AI Avatar Video Generator",
    slug: "ai-avatar-generator",
    src: "/media/demo-avatar-video.webm",
    poster: "/media/demo-avatar-video.poster.webp",
  },
];

export const Route = createFileRoute("/")({
  staticData: { sitemap: true },
  loader: ({ context }) => context.queryClient.prefetchQuery(siteContentQuery),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:image", content: `${SITE.url}/media/og-image.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${SITE.url}/media/og-image.png` },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
  }),
  component: Home,
});

function Home() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const page = content.pages.find((p) => p.slug === "home");
  const settings = content.pages.find((p) => p.slug === "settings");
  const cmp = {
    eyebrow: page?.comparisonEyebrow || "The math",
    title: page?.comparisonTitle || "Stop paying for five AI tools",
    intro:
      page?.comparisonIntro ||
      "Stack a chat subscription, an image tool, a video tool and a voice tool and you are out $80\u2013120 a month \u2014 and still switching tabs. AmmarAI replaces all of them.",
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
  const { theme } = useTheme();
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

  return (
    <div className={`home-premium home-swiss overflow-hidden ${theme === "dark" ? "home-swiss-dark home-enterprise" : ""}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaqs)) }}
      />

      <section className="studio-hero relative border-b border-border pb-14 pt-8 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="studio-hero-light" aria-hidden="true" />
        <Container size="wide" className="relative z-10">
          <div className="studio-hero-copy">
            <div className="studio-hero-index" aria-hidden="true">AmmarAI / Workspace</div>
            <p className="studio-kicker"><Sparkles className="size-3.5" /> AI workspace for serious creative teams</p>
            <div className="studio-hero-grid">
              <h1>
                <span>One AI platform</span>
                <span>for everything</span>
                <span className="studio-accent-text">you create</span>
              </h1>
              <div className="studio-hero-aside">
                <p className="text-pretty text-base leading-[1.7] text-muted-foreground sm:text-lg">
                  Build autonomous AI Agents, draft with AI Writer, think with Chat Pro, create with Image Pro
                  and Video Pro, build talking avatars, transcribe recordings and plan search-led content. Add CRM,
                  voiceovers, document analysis and code tools — all in one connected workspace.
                </p>
                <div className="studio-hero-actions mt-8 flex flex-col gap-3 sm:flex-row">
                  <ExternalButton href={REGISTER_URL} size="lg" className="studio-primary-cta w-full sm:w-auto">
                    Start creating free <ArrowRight className="size-4" />
                  </ExternalButton>
                  <ButtonLink to="/ai-tools" variant="outline" size="lg" className="w-full sm:w-auto">
                    Explore AI tools
                  </ButtonLink>
                </div>
                <p className="studio-hero-note mt-5 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Check className="size-3.5 text-success" /> No card required. Every tool included.</p>
              </div>
            </div>
          </div>

          <div className="studio-command-stage">
            <div className="studio-command-aura" aria-hidden="true" />
          <div className="studio-command mx-auto max-w-7xl overflow-hidden bg-card ring-1 ring-border">
            <div className="studio-command-header flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-7">
              <div className="flex items-center gap-3">
                <span className="studio-window-controls" aria-hidden="true"><i /><i /><i /></span>
                <span className="studio-command-icon grid size-10 place-items-center bg-accent text-accent-foreground"><WandSparkles className="size-4" /></span>
                <div className="text-left"><p className="text-sm font-semibold text-foreground">AmmarAI workspace</p><p className="text-xs text-muted-foreground">Choose a core tool or describe the work you need done</p></div>
              </div>
              <span className="studio-status"><span className="size-1.5 rounded-full bg-success" /> {tools.length} tools available</span>
            </div>
             <div className="grid lg:grid-cols-[0.62fr_1.38fr]">
              <div className="studio-command-sidebar border-b border-border p-5 sm:p-7 lg:border-b-0 lg:border-r">
                <p className="studio-label">Core tools</p>
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
                    <p className="studio-label">Tell AmmarAI what you want to accomplish</p>
                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                      {outcomeShortcuts.map((shortcut) => (
                        <Link key={shortcut.label} to="/$slug" params={{ slug: shortcut.slug }} className="studio-outcome-shortcut group">
                          <span>{shortcut.label}</span><ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-1" />
                        </Link>
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
          </div>
        </Container>
      </section>

      {settings?.showHomepageTrustLogos !== false ? (
        <TrustLogoStrip faded={settings?.fadeHomepageLogos !== false} />
      ) : null}

      {/* Featured */}
        <Section tone="sand" className="studio-section studio-flagships">
         <Container size="wide">
          <SectionHeading
            eyebrow="Flagship tools"
            title="Ten flagship tools"
            intro="AI Agent Builder, AI Social Media Agent, AI Phone Call Agent, AI CRM, AI Writer, Chat Pro, Image Pro, Video Pro, Avatar Video and Transcription form the core of AmmarAI — ten focused tools for creating, understanding, selling, publishing and automating your work."
             scale="large"
             className="studio-heading-wide"
          />
           <FlagshipCarousel tools={featuredTools} />
           <SecondaryToolsCarousel />
        </Container>
      </Section>

      {settings?.showHomepageAiModels !== false ? <AiModelsStrip /> : null}

      <EcosystemOverview tools={tools} />
      <WorkflowStories tools={tools} />

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
                  controlsList={settings?.allowVideoDownload === true ? undefined : "nodownload"}
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

      {/* Features */}
        <Section tone="sand" className="studio-section studio-workspace-section">
         <Container>
          <SectionHeading
            eyebrow="How it works"
            title="From idea to finished work in three steps"
            intro="Every tool in AmmarAI follows the same simple flow — no setup, no switching between services."
             scale="large"
             className="studio-heading-wide"
          />
           <ol className="studio-steps mt-10 grid gap-5 sm:grid-cols-3" aria-label="How AmmarAI works">
            {howItWorks.map(({ step, title, text }) => (
              <li key={step} className="studio-step rounded-xl border border-border bg-card p-6">
                <span className="grid size-9 place-items-center rounded-lg bg-accent/10 text-sm font-bold text-accent" aria-hidden="true">{step}</span>
                <h3 className="mt-4 text-base font-semibold text-foreground">{title}</h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{text}</p>
              </li>
            ))}
          </ol>
           <p className="mt-12 text-sm font-semibold uppercase tracking-wider text-muted-foreground">Everything stays connected</p>
           <ul className="studio-benefit-strip mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-6" aria-label="Connected workspace benefits">
            {workspaceBenefits.map(({ label, icon: Icon }) => (
              <li key={label} className="studio-benefit flex items-center gap-3 rounded-xl border border-border bg-card p-4 text-sm font-semibold text-foreground">
                <span className="grid size-8 place-items-center rounded-lg bg-accent/10"><Icon className="size-4 text-accent" aria-hidden="true" /></span>
                {label}
              </li>
            ))}
          </ul>
           <div className="studio-feature-grid mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
             {features.slice(0, 3).map((f) => (
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

      <Section className="studio-section studio-tutorials-section">
        <Container>
          <SectionHeading eyebrow="Learn by doing" title="Practical guides for real workflows" intro="Open a focused walkthrough, follow the exact fields and controls, then continue into the matching AmmarAI tool." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredTutorials.map((tutorial) => (
              <Card key={tutorial.slug} interactive className="p-6">
                <p className="eyebrow">{tutorial.category}</p>
                <h3 className="mt-3 text-lg font-semibold"><Link to="/tutorials/$slug" params={{ slug: tutorial.slug }} className="text-foreground hover:text-accent">{tutorial.h1}</Link></h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{tutorial.description}</p>
              </Card>
            ))}
          </div>
          <ButtonLink to="/tutorials" variant="outline" className="mt-8">Browse all tutorials</ButtonLink>
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
            {homepageUseCases.map((uc) => (
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
            {homepagePosts.map((post) => (
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
             Create. Think. Automate. One intelligent workspace.
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
