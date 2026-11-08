import { useEffect, useRef, useState, type VideoHTMLAttributes } from "react";

type Props = Omit<VideoHTMLAttributes<HTMLVideoElement>, "src" | "autoPlay" | "preload"> & {
  src: string;
  poster: string;
};

/**
 * Muted looping clip that downloads only when it scrolls near the screen and
 * pauses when it leaves, so below-the-fold videos add nothing to page load.
 * Until then the poster image shows in the same box (no layout shift).
 */
export function InViewVideo({ src, poster, ...rest }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setLoad(true);
          if (!reduce) void el.play().catch(() => {});
        } else if (!el.paused) {
          el.pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      {...rest}
    />
  );
}
