import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Clapperboard, ImageIcon, PhoneCall, UserRound } from "lucide-react";

type Slide = {
  label: string;
  caption: string;
  slug: string;
  icon: typeof Clapperboard;
  video?: string;
  poster: string;
};

const slides: Slide[] = [
  { label: "AI Video Pro", caption: "Text to cinematic video", slug: "ai-video-generator", icon: Clapperboard, video: "/media/ai-video-pro-espresso.webm", poster: "/media/ai-video-pro-espresso.poster.jpg" },
  { label: "AI Image Pro", caption: "Product photos from a prompt", slug: "ai-image-generator", icon: ImageIcon, poster: "/media/tutorial-product-photoshoot-3.webp" },
  { label: "AI Avatar", caption: "Talking presenter videos", slug: "ai-avatar-generator", icon: UserRound, video: "/media/demo-avatar-video.webm", poster: "/media/demo-avatar-video.poster.webp" },
  { label: "AI Phone Agent", caption: "Answers calls and books orders", slug: "restaurant-phone-ordering", icon: PhoneCall, poster: "/media/ai-video-pro-hot-pot.poster.jpg" },
];

const DURATION = 4500;

export function HomeShowreel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = window.setTimeout(() => setActive((i) => (i + 1) % slides.length), DURATION);
    return () => window.clearTimeout(t);
  }, [active, paused]);

  const slide = slides[active];

  return (
    <div className="showreel" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="showreel-frame" aria-live="polite">
        {slides.map((s, i) => (
          <div key={s.label} className={`showreel-slide ${i === active ? "is-active" : ""}`} aria-hidden={i !== active}>
            {s.video && i === active ? (
              <video src={s.video} poster={s.poster} autoPlay muted loop playsInline preload="metadata" />
            ) : (
              <img src={s.poster} alt="" loading={i === 0 ? "eager" : "lazy"} />
            )}
            {s.slug === "restaurant-phone-ordering" ? (
              <div className="showreel-wave" aria-hidden="true">{Array.from({ length: 18 }).map((_, k) => <span key={k} style={{ animationDelay: `${k * 70}ms` }} />)}</div>
            ) : null}
          </div>
        ))}
        <Link to="/$slug" params={{ slug: slide.slug }} className="showreel-caption">
          <span className="showreel-caption-label"><slide.icon className="size-4" />{slide.label}</span>
          <span className="showreel-caption-text">{slide.caption} <ArrowRight className="size-3.5" /></span>
        </Link>
      </div>
      <div className="showreel-tabs" role="tablist" aria-label="Showreel">
        {slides.map((s, i) => (
          <button key={s.label} type="button" role="tab" aria-selected={i === active} onClick={() => setActive(i)} className={`showreel-tab ${i === active ? "is-active" : ""}`}>
            <span className="showreel-tab-bar"><i style={{ animationDuration: `${DURATION}ms`, animationPlayState: paused ? "paused" : "running" }} /></span>
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
