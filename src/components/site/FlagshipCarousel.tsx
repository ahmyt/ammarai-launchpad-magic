import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Tool } from "@/data/types";
import { flagshipWorkflows } from "@/data/ecosystem";
import { ActionButton } from "./Button";

export function FlagshipCarousel({ tools }: { tools: Tool[] }) {
  const railRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(true);

  const goTo = useCallback((index: number, smooth = true) => {
    const rail = railRef.current;
    if (!rail || tools.length === 0) return;
    const next = (index + tools.length) % tools.length;
    const card = rail.children.item(next);
    if (!(card instanceof HTMLElement)) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: card.offsetLeft, behavior: smooth && !reduceMotion ? "smooth" : "auto" });
    setActiveIndex(next);
  }, [tools.length]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      const reference = Math.min(entry.boundingClientRect.height, window.innerHeight);
      setInView(reference > 0 && entry.intersectionRect.height / reference >= 0.5);
    }, { threshold: [0, 0.5, 1] });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || paused || tools.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => goTo(activeIndex + 1), 6200);
    return () => window.clearInterval(timer);
  }, [activeIndex, goTo, inView, paused, tools.length]);

  const onScroll = () => {
    const rail = railRef.current;
    if (!rail) return;
    const cards = Array.from(rail.children).filter((item): item is HTMLElement => item instanceof HTMLElement);
    const closest = cards.reduce((best, card, index) => {
      const distance = Math.abs(card.offsetLeft - rail.scrollLeft);
      return distance < best.distance ? { index, distance } : best;
    }, { index: 0, distance: Number.POSITIVE_INFINITY });
    setActiveIndex(closest.index);
  };

  return (
    <div
      ref={sectionRef}
      className="flagship-carousel mt-14"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
    >
      <div className="flagship-controls">
        <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(tools.length).padStart(2, "0")}</span>
        <div className="flex gap-2">
          <ActionButton type="button" variant="outline" size="sm" className="size-10 p-0" aria-label="Previous flagship tool" onClick={() => goTo(activeIndex - 1)}><ArrowLeft className="size-4" /></ActionButton>
          <ActionButton type="button" variant="outline" size="sm" className="size-10 p-0" aria-label="Next flagship tool" onClick={() => goTo(activeIndex + 1)}><ArrowRight className="size-4" /></ActionButton>
        </div>
      </div>
      <div ref={railRef} className="flagship-rail" onScroll={onScroll} onPointerDown={() => setPaused(true)} onPointerUp={() => setPaused(false)}>
        {tools.map((tool, index) => {
          const workflow = flagshipWorkflows.find((item) => item.slug === tool.slug);
          return (
            <Link key={tool.slug} to="/$slug" params={{ slug: tool.slug }} className="flagship-slide interactive-card-edge" data-selected={activeIndex === index ? "true" : undefined}>
              <div className="flagship-slide-head"><span>{String(index + 1).padStart(2, "0")}</span><span>{tool.category}</span></div>
              <div className="flagship-slide-body">
                <h3>{tool.name}</h3>
                <p>{tool.summary}</p>
                {workflow ? <p className="flagship-outcome"><strong>Outcome</strong>{workflow.get}</p> : null}
                <span className="flagship-link">Explore tool <ArrowRight className="size-4" aria-hidden="true" /></span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="flagship-dots" aria-label="Choose a flagship tool">
        {tools.map((tool, index) => <ActionButton key={tool.slug} type="button" variant="ghost" size="sm" className="p-0" aria-label={`Show ${tool.name}`} aria-current={activeIndex === index ? "true" : undefined} onClick={() => goTo(index)} />)}
      </div>
    </div>
  );
}