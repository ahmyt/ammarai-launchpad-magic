import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Captions, Check, Clapperboard, Film, Layers, Mic, RefreshCw, Sparkles, Wand2 } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { plans, REGISTER_URL } from "@/lib/site";

const basic = plans.find((p) => p.name === "Basic");
const url = "https://ammarai.com/ai-video-generator";
const title = "AI Video Pro: Create Complete AI Videos | AmmarAI";
const description =
  "Create short videos from text prompts or still images, with text-to-video, image-to-video, smooth transitions, and caption and voiceover options. Try it free.";

const clips = [
  { id: "espresso", tab: "Product ad", label: "The Perfect Morning Espresso", prompt: "Film an extreme macro of dark espresso streaming from a polished steel portafilter into an ivory cup. Let amber crema spread in slow motion while fine steam crosses a narrow beam of morning light.", result: "A photoreal specialty-coffee commercial shot with convincing crema, delicate steam and a premium morning atmosphere." },
  { id: "red-panda", tab: "3D animation", label: "Red Panda's Tea-House Discovery", prompt: "A cinematic 3D animated short about an inquisitive red panda discovering a tiny tea house in a mossy forest at sunrise. One gentle continuous camera move; only stream water, birds and soft pawsteps.", result: "A richly detailed woodland character moment with a clear visual story and natural environmental sound." },
  { id: "octopus-library", tab: "Cinematic", label: "The Octopus Librarian", prompt: "A cinematic continuous shot of an intelligent octopus absorbed in an antique book inside a shadow-filled library. Restrained red glow, subtle camera movement, believable reading behaviour.", result: "An atmospheric fantasy-library scene with convincing tentacle motion and controlled crimson lighting." },
  { id: "comedy-reel", tab: "Social comedy", label: "The Coffee Surprise", prompt: "A widescreen live-action comedy reel in a bright home kitchen. A sleepy woman drops an unexpected ingredient into her coffee, takes one cautious look, then reacts with wide-eyed disbelief.", result: "A compact kitchen mishap with a clear setup, escalating reaction and an instantly readable ending." },
  { id: "fighters", tab: "Action", label: "Duel in the Cavern", prompt: "Two martial artists trade a rapid, precisely choreographed series of strikes inside a stone cavern. Each impact lifts dust through shafts of daylight. Keep the framing fixed.", result: "A fast, legible action beat with dynamic dust and lighting while the camera holds its framing." },
];

const shots = {
  subject: ["a steaming cup of coffee", "a sneaker on a pedestal", "a red panda in a forest", "a city street at night"],
  camera: ["slow push in", "locked-off wide shot", "orbit around the subject", "handheld follow"],
  light: ["soft morning light", "neon reflections", "golden-hour backlight", "dramatic rim light"],
  ratio: ["9:16", "1:1", "16:9"],
} as const;

const features = [
  { icon: Film, title: "Text to video", body: "Describe subject, action, camera and light; get a clip back with no source footage." },
  { icon: Layers, title: "Image to video", body: "Animate a product photo or a generated still you already have." },
  { icon: Mic, title: "Voiceover", body: "Add a generated voiceover in a chosen voice and pace." },
  { icon: Captions, title: "Captions", body: "Burn in captions styled for silent autoplay feeds." },
  { icon: RefreshCw, title: "Scene swaps", body: "Regenerate one scene without rebuilding the whole video." },
];

const uses = [
  { who: "E-commerce", what: "Product hero clips and ad variants from a single photo." },
  { who: "Agencies", what: "Several hook variants of one cut to test against each other." },
  { who: "Creators", what: "Short reels and B-roll when you have no footage." },
  { who: "Course & SaaS", what: "Explainer intros in 9:16, 1:1 and 16:9." },
];

export const Route = createFileRoute("/ai-video-generator")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AI Video Pro", applicationCategory: "MultimediaApplication", operatingSystem: "Web", description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) }],
  }),
  component: VideoPage,
});

function VideoPage() {
  const [active, setActive] = useState(0);
  const clip = clips[active] ?? clips[0]!;
  const [pick, setPick] = useState({ subject: 0, camera: 0, light: 0, ratio: 0 });
  const brief = `Cinematic shot of ${shots.subject[pick.subject]}, ${shots.camera[pick.camera]}, ${shots.light[pick.light]}. 5 seconds, ${shots.ratio[pick.ratio]}.`;

  return (
    <>
      <section className="restaurant-hero">
        <video className="restaurant-hero-image" autoPlay muted loop playsInline preload="metadata" poster="/media/ai-video-pro-espresso.poster.jpg" src="/media/ai-video-pro-espresso.webm" aria-hidden="true" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / AI Video Pro</p>
          <div className="mt-10 max-w-2xl restaurant-rise">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">AI Video Pro, from script to finished cut</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">Describe a shot or upload a still, and get short videos for ads, reels and explainers—with voiceover, captions and every aspect ratio in one place.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} size="lg"><Clapperboard className="size-4" />Generate a video</ExternalButton>
              <a href="#video-gallery" className="restaurant-hero-link"><ArrowRight className="size-4" />See real results</a>
            </div>
            <p className="mt-6 text-sm">Included from {basic?.name ?? "Basic"} · {basic?.price ?? "$24.99"}/month · 3-day free trial</p>
          </div>
        </Container>
      </section>
      <div className="border-b border-border bg-secondary/40">
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-semibold">
          <span className="flex items-center gap-2"><Sparkles className="size-4 text-accent" />Text & image to video</span>
          <span className="flex items-center gap-2"><Layers className="size-4 text-accent" />9:16 · 1:1 · 16:9</span>
          <span className="flex items-center gap-2"><Wand2 className="size-4 text-accent" />Built for 15–90 second pieces</span>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionHeading eyebrow="How-to video" title="How to make a cinematic text-to-video" intro="A screen recording of a real AI Video Pro session, step by step · 1 min 34 s." />
          <figure className="mt-10 border border-border">
            <video className="aspect-video w-full bg-secondary" controls controlsList="nodownload" preload="none" playsInline poster="/media/howto-ai-video-pro.poster.webp" src="/media/howto-ai-video-pro.mp4">Your browser does not support video playback.</video>
          </figure>
        </Container>
      </Section>

      <Section tone="sand" id="video-gallery">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Video Pro" }]} />
          <SectionHeading className="mt-8" eyebrow="Prompt → result" title="Real clips, the prompts that made them" intro="Pick a style to see the prompt and the video it produced in AI Video Pro." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {clips.map((c, i) => (
              <Button key={c.id} role="tab" aria-selected={i === active} variant={i === active ? "default" : "outline"} size="sm" onClick={() => setActive(i)}>{c.tab}</Button>
            ))}
          </div>
          <div key={clip.id} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div className="border-t-2 border-accent bg-background p-6">
              <p className="eyebrow">Prompt</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{clip.label}</h3>
              <p className="mt-4 rounded-lg bg-secondary px-4 py-3 font-mono text-xs leading-relaxed text-foreground">{clip.prompt}</p>
              <p className="eyebrow mt-6">Result</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{clip.result}</p>
            </div>
            <video className="aspect-video w-full border border-border bg-secondary object-cover" controls muted loop playsInline preload="none" poster={`/media/ai-video-pro-${clip.id}.poster.jpg`} src={`/media/ai-video-pro-${clip.id}.webm`} aria-label={clip.label} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Shot builder" title="Write a prompt that directs the camera" intro="Pick one option in each row. Copy the brief and paste it into AI Video Pro." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {(Object.keys(shots) as (keyof typeof shots)[]).map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {shots[k].map((o, i) => (
                      <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => setPick({ ...pick, [k]: i })}>{o}</Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your brief</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{brief}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(brief)}>Copy brief</Button>
                <ExternalButton href={REGISTER_URL}>Try it in AI Video Pro<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="What it does" title="One place from idea to posted video" intro="Generate, voice, caption and resize without switching apps." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((it, i) => (
              <Card key={it.title} className="restaurant-lift p-5">
                <it.icon className="size-5 text-accent" aria-hidden="true" />
                <p className="mt-3 text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for short-form work" intro="Honest framing: it's made for 15–90 second pieces, not a replacement for a filmed brand piece with a crew." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {uses.map((u) => (
              <div key={u.who} className="border-t-2 border-accent pt-4">
                <h3 className="text-base font-semibold text-foreground">{u.who}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.what}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Included from the {basic?.name ?? "Basic"} plan</h2>
            <p className="mt-6 text-5xl font-semibold">{basic?.price ?? "$24.99"}<span className="text-base font-normal"> {basic?.period ?? "/month"}</span></p>
            <ul className="mt-6 space-y-2 text-sm">
              {(basic?.features ?? []).map((f) => <li key={f} className="flex items-center gap-2"><Check className="size-4" />{f}</li>)}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">Start the 3-day trial</ExternalButton>
              <ButtonLink to="/pricing" variant="outline" size="lg" className="text-ink-foreground">Compare plans</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
