import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Tool } from "@/data/types";
import { ActionButton, ButtonLink } from "@/components/site/Button";

const indicatorCount = 7;

export function ToolCarousel({ tools }: { tools: Tool[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const indicators = useMemo(
    () => Array.from({ length: Math.min(indicatorCount, tools.length) }, (_, index) => index),
    [tools.length],
  );

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const item = track.children.item(index);
    if (!(item instanceof HTMLElement)) return;
    track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
    setActiveIndex(index);
  };

  const move = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + tools.length) % tools.length;
    scrollToIndex(nextIndex);
  };

  useEffect(() => {
    if (paused || tools.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % tools.length;
        const track = trackRef.current;
        if (!track) return current;
        const item = track.children.item(next);
        if (item instanceof HTMLElement) {
          track.scrollTo({ left: item.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 3600);
    return () => window.clearInterval(timer);
  }, [paused, tools.length]);

  const syncIndex = () => {
    const track = trackRef.current;
    const first = track?.children.item(0);
    if (!track || !(first instanceof HTMLElement)) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap || "0");
    const step = first.offsetWidth + gap;
    if (step > 0) setActiveIndex(Math.min(tools.length - 1, Math.round(track.scrollLeft / step)));
  };

  const activeIndicator = indicators.length > 1
    ? Math.round((activeIndex / Math.max(1, tools.length - 1)) * (indicators.length - 1))
    : 0;

  return (
    <div
      className="studio-tools-carousel mt-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div
        ref={trackRef}
        className="studio-tools-track"
        onScroll={syncIndex}
        aria-label="More AmmarAI tools"
      >
        {tools.map((tool, index) => (
          <Link
            key={tool.slug}
            to="/$slug"
            params={{ slug: tool.slug }}
            className="studio-secondary-tool group"
          >
            <span className="studio-secondary-tool-number" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-xs font-semibold uppercase text-accent">{tool.category}</span>
            <h3 className="mt-auto text-2xl font-extrabold leading-tight text-foreground">{tool.name}</h3>
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{tool.summary}</p>
            <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase text-foreground">
              Open tool <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>

      <div className="studio-tools-controls mt-7 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <ActionButton variant="outline" size="sm" aria-label="Previous tool" title="Previous tool" onClick={() => move(-1)}>
            <ChevronLeft className="size-4" aria-hidden="true" />
          </ActionButton>
          <ActionButton variant="outline" size="sm" aria-label="Next tool" title="Next tool" onClick={() => move(1)}>
            <ChevronRight className="size-4" aria-hidden="true" />
          </ActionButton>
          <span className="ml-2 text-xs font-semibold tabular-nums text-muted-foreground" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}
          </span>
        </div>

        <div className="studio-tools-indicators" aria-label="Carousel position">
          {indicators.map((indicator) => {
            const target = Math.round((indicator / Math.max(1, indicators.length - 1)) * (tools.length - 1));
            return (
              <button
                key={indicator}
                type="button"
                className="studio-tools-indicator"
                data-active={indicator === activeIndicator}
                aria-label={`Go to tool ${target + 1}`}
                aria-current={indicator === activeIndicator ? "true" : undefined}
                onClick={() => scrollToIndex(target)}
              />
            );
          })}
        </div>

        <ButtonLink to="/ai-tools" variant="ink" size="md">
          View all tools <ChevronRight className="size-4" aria-hidden="true" />
        </ButtonLink>
      </div>
    </div>
  );
}