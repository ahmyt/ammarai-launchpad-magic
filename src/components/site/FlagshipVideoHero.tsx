import type { ReactNode } from "react";
import { ArrowDown } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { ExternalButton } from "@/components/site/Button";
import { REGISTER_URL } from "@/lib/site";

/** Full-bleed looping video header shared by flagship pages (same look as AI Video Pro). */
export function FlagshipVideoHero({
  clip,
  crumb,
  title,
  lede,
  cta,
  icon,
  jump,
  note,
}: {
  clip: string;
  crumb: string;
  title: string;
  lede: string;
  cta: string;
  icon: ReactNode;
  jump: { href: string; label: string };
  note: string;
}) {
  return (
    <section className="restaurant-hero">
      <video className="restaurant-hero-image" autoPlay muted loop playsInline preload="metadata" poster={`/media/hero-${clip}.poster.jpg`} src={`/media/hero-${clip}.webm`} aria-hidden="true" />
      <Container className="relative z-10 py-12 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / {crumb}</p>
        <div className="mt-10 max-w-2xl restaurant-rise">
          <h1 className="text-balance text-4xl leading-tight sm:text-5xl">{title}</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">{lede}</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <ExternalButton href={REGISTER_URL} size="lg">{icon}{cta}</ExternalButton>
            <a href={jump.href} className="restaurant-hero-link"><ArrowDown className="size-4" />{jump.label}</a>
          </div>
          <p className="mt-6 text-sm">{note}</p>
        </div>
      </Container>
    </section>
  );
}
