import { Link } from "@tanstack/react-router";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/site/primitives";
import { restaurantOffer } from "@/data/restaurant-offer";
import { hostedAssetUrl } from "@/lib/asset-url";
import callPoster from "@/assets/anchor-call-poster.jpg";
import clinicPoster from "@/assets/clinic_agent_walkthrough_poster.jpg.asset.json";

/** Phone-agent strip shown right under the homepage hero. */
export function HomePhoneAgentsStrip() {
  return (
    <section className="border-b border-border bg-ink text-ink-foreground">
      <Container size="wide" className="flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <span className="grid size-11 shrink-0 place-items-center bg-accent text-accent-foreground"><PhoneCall className="size-5" /></span>
          <div>
            <p className="text-lg font-semibold">AI phone agents for restaurants and clinics</p>
            <p className="mt-1 text-sm opacity-80">Answer every call, take orders and book appointments. From $349.99/month.</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${restaurantOffer.demoPhone}`} className="inline-flex h-11 items-center gap-2 bg-accent px-5 text-sm font-semibold text-accent-foreground">
            <PhoneCall className="size-4" /> Call the demo line {restaurantOffer.demoPhoneFormatted}
          </a>
          <Link to="/restaurant-phone-ordering" className="inline-flex h-11 items-center gap-2 border border-current px-4 text-sm font-semibold">Restaurants <ArrowRight className="size-3.5" /></Link>
          <Link to="/clinic-phone-agent" className="inline-flex h-11 items-center gap-2 border border-current px-4 text-sm font-semibold">Clinics <ArrowRight className="size-3.5" /></Link>
        </div>
      </Container>
    </section>
  );
}

const pages = [
  { to: "/ai-video-generator", label: "AI Video Pro", text: "Turn a prompt or a photo into short cinematic clips.", video: "/media/ai-video-pro-red-panda.webm", poster: "/media/ai-video-pro-red-panda.poster.jpg" },
  { to: "/ai-avatar-generator", label: "AI Avatar", text: "Talking presenter videos from a script.", video: "/media/avatar-option-1-final.webm", poster: "/media/avatar-option-1-final.poster.jpg" },
  { to: "/restaurant-phone-ordering", label: "AI Phone Agents", text: "Answer calls, take orders and book visits 24/7.", poster: callPoster },
  { to: "/clinic-phone-agent", label: "Clinic Phone Agent", text: "Books, reschedules and reminds patients by phone.", poster: hostedAssetUrl(clinicPoster.url) },
] as const;

/** Large video cards linking to the dedicated flagship pages. */
export function HomeFeaturedPages() {
  return (
    <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pages.map((p) => (
        <Link key={p.to} to={p.to} className="group flex flex-col border border-border bg-background">
          <div className="aspect-[4/3] overflow-hidden bg-secondary">
            {"video" in p ? (
              <video src={p.video} poster={p.poster} autoPlay muted loop playsInline preload="none" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" aria-hidden="true" />
            ) : (
              <img src={p.poster} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            )}
          </div>
          <div className="flex flex-1 flex-col gap-1 p-5">
            <p className="text-lg font-semibold text-foreground">{p.label}</p>
            <p className="text-sm text-muted-foreground">{p.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">See the page <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </Link>
      ))}
    </div>
  );
}
