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
  const [loaded, setLoaded] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        setVisible(entry.isIntersecting);
        if (entry.isIntersecting) setLoaded(true);
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !loaded) return;
    if (visible && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      void el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [loaded, visible]);

  return (
    <video
      ref={ref}
      src={loaded ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={loaded ? "auto" : "none"}
      {...rest}
    />
  );
}
