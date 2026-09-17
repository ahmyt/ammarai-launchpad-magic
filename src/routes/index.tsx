import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, Search, Sparkles, WandSparkles } from "lucide-react";
import { siteContentQuery } from "@/lib/content";
import { tools, featuredTools, suggestTools } from "@/data/tools";
import { SITE, organizationJsonLd, REGISTER_URL } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { ToolCard } from "@/components/site/ToolCard";
import { ActionButton, ExternalButton, ButtonLink } from "@/components/site/Button";
import { TrustLogoStrip } from "@/components/site/TrustLogoStrip";
import { CustomerReviews } from "@/components/site/CustomerReviews";
import { SecondaryToolsCarousel } from "@/components/site/SecondaryToolsCarousel";

const title = "AmmarAI: One AI Platform for Writing, Video, Voice and Code";
const description =
  "151 AI tools and templates in one workspace: write, chat, generate images and video, create voiceovers, transcribe audio, analyze documents and code.";

const goalPrompts = [
  "Write a blog post about pricing",
  "Create a product description",
  "Make a promotional video",
  "Generate a voiceover",
  "Transcribe an interview",
  "Create an Instagram ad",
  "Build an AI agent",
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

  return (
    <div className="home-premium home-swiss home-swiss-dark home-enterprise overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <section className="studio-hero relative border-b border-border pb-14 pt-8 sm:pb-20 sm:pt-14 lg:pb-24 lg:pt-16">
        <div className="studio-hero-light" aria-hidden="true" />
        <Container size="wide" className="relative z-10">
          <div className="studio-hero-copy">
            <div className="studio-hero-index" aria-hidden="true">AmmarAI / Workspace</div>
            <p className="studio-kicker"><Sparkles className="size-3.5" /> AI workspace for serious creative teams</p>
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
          </div>
        </Container>
      </section>

      <div className="studio-proof" aria-label="Customer proof">
        <TrustLogoStrip />
        <CustomerReviews />
      </div>

      <Section className="studio-section studio-flagships studio-focused-section">
        <Container size="wide">
          <SectionHeading
            eyebrow="Flagship tools"
            title="The core tools for serious creative work"
            intro="Eight focused tools cover agent automation, writing, reasoning, image and video creation, avatars, transcription and SEO."
            scale="large"
            className="studio-heading-wide"
          />
          <div className="studio-card-grid mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} className="studio-featured-card min-h-52 justify-end" />
            ))}
          </div>
          <div className="studio-section-action">
            <ButtonLink to="/ai-tools" variant="outline" size="lg">
              Explore tools <ArrowRight className="size-4" aria-hidden="true" />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section className="studio-section studio-secondary-section studio-focused-section">
        <Container size="wide">
          <SectionHeading
            eyebrow="Specialist tools"
            title="More capability, without the clutter"
            intro="A restrained selection of automation, research, publishing and production tools for workflows beyond the core suite."
            scale="large"
            className="studio-heading-wide"
          />
          <SecondaryToolsCarousel />
        </Container>
      </Section>

      <Section tone="ink" className="studio-final-cta">
        <Container className="text-center">
          <p className="studio-final-kicker">Your complete AI workspace</p>
          <h2 className="mx-auto max-w-4xl text-balance text-5xl leading-[0.95] sm:text-7xl">
            Start with the free plan
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            Every tool, no card required. Upgrade only when your output volume makes the case for
            it.
          </p>
          <div className="mt-9 flex justify-center">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free <ArrowRight className="size-4" aria-hidden="true" />
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </div>
  );
}
