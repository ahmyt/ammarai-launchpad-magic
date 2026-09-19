import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toolBySlug } from "@/data/tools";
import { ActionButton, ButtonLink } from "@/components/site/Button";

const showcaseSlugs = [
  "ai-social-media-agent",
  "ai-blogger-agent",
  "ai-phone-agent",
  "ai-social-media-publisher",
  "ai-crm",
  "ai-deep-research",
  "ai-video-editor",
  "ai-captions",
  "ugc-factory",
  "viral-clips",
  "ai-dubbing",
  "ai-realtime-image",
  "ai-photoshoot",
  "ai-creative-suite",
  "ai-council-mode",
  "content-manager",
  "ai-document-analyzer",
  "ai-music-generator",
];

const showcaseOutcomes: Record<(typeof showcaseSlugs)[number], string> = {
  "ai-social-media-agent": "A planned, written, and scheduled month of social content that can adapt to performance.",
  "ai-blogger-agent": "A consistent flow of researched, SEO-ready WordPress articles published on your schedule.",
  "ai-phone-agent": "Answered calls, booked appointments, and logged conversations without missed follow-up.",
  "ai-social-media-publisher": "Platform-ready posts previewed, scheduled, and published from one calendar.",
  "ai-crm": "An organized sales pipeline with current contact context, deal updates, and clear next actions.",
  "ai-deep-research": "A structured, cited report compiled from multiple live web sources.",
  "ai-video-editor": "A polished, correctly paced video prepared in the format your channel needs.",
  "ai-captions": "An accessible, social-ready captioned video with editable transcript and subtitle files.",
  "ugc-factory": "A batch of creator-style videos with virtual talent, voiceover, and lip-synced delivery.",
  "viral-clips": "Multiple captioned vertical clips built from the strongest moments in one long video.",
  "ai-dubbing": "A naturally voiced, timing-matched localized video ready for a new language market.",
  "ai-realtime-image": "A refined visual direction you can shape instantly as your prompt changes.",
  "ai-photoshoot": "A coordinated set of commercial product images from one original product photo.",
  "ai-creative-suite": "A consistent set of campaign visuals designed together in one editable workspace.",
  "ai-council-mode": "Side-by-side model perspectives plus one consolidated answer for a better-informed decision.",
  "content-manager": "A searchable media library where every uploaded and generated asset is ready to reuse.",
  "ai-document-analyzer": "Cited answers, concise summaries, and structured data extracted from your documents.",
  "ai-music-generator": "An original music track shaped around the mood, style, and purpose you describe.",
};

export function SecondaryToolsCarousel() {
  const tools = useMemo(
    () => showcaseSlugs.flatMap((slug) => {
      const tool = toolBySlug.get(slug);
      return tool ? [tool] : [];
    }),
    [],
  );
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  const goTo = useCallback((index: number, smooth = true) => {
    const rail = railRef.current;
    if (!rail || tools.length === 0) return;
    const nextIndex = (index + tools.length) % tools.length;
    const card = rail.children.item(nextIndex);
    if (!(card instanceof HTMLElement)) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: card.offsetLeft, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    setActiveIndex(nextIndex);
  }, [tools.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        const visible = entry.intersectionRect.height;
        const reference = Math.min(entry.boundingClientRect.height, window.innerHeight);
        setInView(reference > 0 && visible / reference >= 0.5);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || tools.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => goTo(activeIndex + 1), 5200);
    return () => window.clearInterval(timer);
  }, [activeIndex, goTo, inView, paused, tools.length]);

  const updateActiveCard = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
    if (cards.length === 0) return;
    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(closest.index);
  };

  return (
    <section
      ref={sectionRef}
      aria-label="More AmmarAI tools"
      className="studio-secondary-showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="studio-secondary-topline">
        <p className="studio-label">More ways to create</p>
        <div className="flex items-center gap-2">
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            aria-label="Previous tools"
            onClick={() => goTo(activeIndex - 1)}
            className="studio-carousel-arrow size-10 p-0"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </ActionButton>
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            aria-label="Next tools"
            onClick={() => goTo(activeIndex + 1)}
            className="studio-carousel-arrow size-10 p-0"
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </ActionButton>
        </div>
      </div>

      <div
        ref={railRef}
        className="studio-secondary-rail"
        onScroll={updateActiveCard}
        onPointerDown={() => setPaused(true)}
        onPointerUp={() => setPaused(false)}
        onPointerCancel={() => setPaused(false)}
      >
        {tools.map((tool, index) => (
          <Link
            key={tool.slug}
            to="/$slug"
            params={{ slug: tool.slug }}
            className="studio-secondary-card interactive-card-edge group"
            data-interactive-card="true"
            data-selected={activeIndex === index ? "true" : undefined}
            onPointerDown={(event) => event.currentTarget.focus({ preventScroll: true })}
            aria-label={`Explore ${tool.name}`}
          >
            <div className="flex items-start justify-between gap-5">
              <span className="studio-secondary-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="studio-secondary-category">{tool.category}</span>
            </div>
            <div className="mt-auto pt-12">
              <h3>{tool.name}</h3>
              <p>{tool.summary}</p>
               <div className="studio-secondary-outcome">
                 <strong>Outcome</strong>
                 <span>{showcaseOutcomes[tool.slug]}</span>
               </div>
              <span className="studio-secondary-link">
                Explore tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="studio-secondary-footer">
        <div className="studio-carousel-progress">
          <span className="studio-carousel-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}
          </span>
          <div className="studio-carousel-dots" aria-label="Choose a tool slide">
            {tools.map((tool, index) => (
              <button
                key={tool.slug}
                type="button"
                aria-label={`Show ${tool.name}`}
                aria-current={activeIndex === index ? "true" : undefined}
                onClick={() => goTo(index)}
                className="studio-carousel-dot"
              />
            ))}
          </div>
        </div>
        <ButtonLink to="/ai-tools" variant="onInk" size="lg" className="studio-secondary-all-tools">
          View All Tools <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}