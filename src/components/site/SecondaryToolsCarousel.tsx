import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toolBySlug } from "@/data/tools";
import { ActionButton, ButtonLink } from "@/components/site/Button";

const showcaseSlugs = [
  "ai-video-editor",
  "ai-captions",
  "ai-realtime-image",
  "ai-photoshoot",
  "ai-creative-suite",
  "ai-deep-research",
  "ai-document-analyzer",
  "ai-music-generator",
  "ai-phone-agent",
  "ai-crm",
  "ai-social-media-publisher",
  "ai-dubbing",
];

export function SecondaryToolsCarousel() {
  const tools = useMemo(
    () => showcaseSlugs.flatMap((slug) => {
      const tool = toolBySlug.get(slug);
      return tool ? [tool] : [];
    }),
    [],
  );
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

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
    if (paused || tools.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => goTo(activeIndex + 1), 3600);
    return () => window.clearInterval(timer);
  }, [activeIndex, goTo, paused, tools.length]);

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
            className="studio-secondary-card group"
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
              <span className="studio-secondary-link">
                Explore tool <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="studio-secondary-footer">
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
        <ButtonLink to="/ai-tools" variant="ink" size="md">
          View all tools <ArrowRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </section>
  );
}