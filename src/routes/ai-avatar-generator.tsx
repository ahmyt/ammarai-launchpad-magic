import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { ArrowRight, Check, Mic, ScanFace, Languages, Images, UserRound } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { coreToolsB } from "@/data/tools-core-b";
import { REGISTER_URL } from "@/lib/site";

const tool = coreToolsB.find((t) => t.slug === "ai-avatar-generator")!;
const url = "https://ammarai.com/ai-avatar-generator";
const title = tool.title;
const description = tool.description;

const samples = [
  { id: "founder", tab: "Founder announcement", src: "/media/avatar-option-1-final.webm", poster: "/media/avatar-option-1-final.poster.jpg", input: "Founder headshot + typed 45-second launch script, generated voice.", result: "A talking-head clip delivering the announcement with lip-sync, ready for LinkedIn and a product page." },
  { id: "lesson", tab: "Course lesson", src: "/media/demo-avatar-video-2-lipsynced.mp4", poster: "/media/demo-avatar-video-2-lipsynced.poster.jpg", input: "Template presenter + uploaded voiceover of an existing lesson script.", result: "The same presenter delivering the lesson, with mouth movement matched to the new audio." },
  { id: "voice", tab: "Uploaded voice", src: "/media/demo-avatar-video-female-voice.mp4", poster: "/media/demo-avatar-video-female-voice.poster.jpg", input: "Presenter portrait + a recorded female voiceover.", result: "A presenter clip driven by your own recording instead of a generated voice." },
];

const icons = [ScanFace, UserRound, Images, Images, Mic];

const scripts = {
  goal: ["announce a new feature", "welcome a new customer", "explain one product benefit", "open a training lesson"],
  tone: ["warm and direct", "upbeat and quick", "calm and expert"],
  length: ["15 seconds", "30 seconds", "45 seconds"],
} as const;

export const Route = createFileRoute("/ai-avatar-generator")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-core-b")).coreToolsB, "ai-avatar-generator"),
  head: ({ loaderData: t }) => !t ? {} : ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: t.name, applicationCategory: "MultimediaApplication", operatingSystem: "Web", description: t.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(t.faqs ?? [])) },
    ],
  }),
  component: AvatarPage,
});

function AvatarPage() {
  const [active, setActive] = useState(0);
  const s = samples[active] ?? samples[0]!;
  const [pick, setPick] = useState({ goal: 0, tone: 0, length: 0 });
  const brief = `Write a ${scripts.length[pick.length]} spoken script, ${scripts.tone[pick.tone]}, to ${scripts.goal[pick.goal]}. Use short sentences and natural pauses.`;

  return (
    <>
      <section className="restaurant-hero">
        <video className="restaurant-hero-image" autoPlay muted loop playsInline preload="metadata" poster="/media/avatar-option-1-final.poster.jpg" src="/media/avatar-option-1-final.webm" aria-hidden="true" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / AI Avatar</p>
          <div className="mt-10 max-w-2xl restaurant-rise">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">{tool.h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{tool.lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} size="lg"><ScanFace className="size-4" />{tool.ctaLabel}</ExternalButton>
              <a href="#avatar-gallery" className="restaurant-hero-link"><ArrowRight className="size-4" />See real results</a>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="sand" id="avatar-gallery">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Input → result" title="Real talking videos, and what went in" intro="Pick an example to see the source and the clip it produced." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {samples.map((c, i) => <Button key={c.id} role="tab" aria-selected={i === active} variant={i === active ? "default" : "outline"} size="sm" onClick={() => setActive(i)}>{c.tab}</Button>)}
          </div>
          <div key={s.id} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div className="border-t-2 border-accent bg-background p-6">
              <p className="eyebrow">Input</p>
              <p className="mt-3 rounded-lg bg-secondary px-4 py-3 font-mono text-xs leading-relaxed text-foreground">{s.input}</p>
              <p className="eyebrow mt-6">Result</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.result}</p>
            </div>
            <video className="aspect-video w-full border border-border bg-secondary object-contain" controls playsInline preload="none" poster={s.poster} src={s.src} aria-label={s.tab} />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Script builder" title="Start with a script people will listen to" intro="Pick one option per row, copy the brief into AI Writer or AI Chat, then paste the script into the avatar tool." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {(Object.keys(scripts) as (keyof typeof scripts)[]).map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {scripts[k].map((o, i) => <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => setPick({ ...pick, [k]: i })}>{o}</Button>)}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your brief</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{brief}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(brief)}>Copy brief</Button>
                <ExternalButton href={REGISTER_URL}>Open AmmarAI<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="What it does" title="From a face and a script to a talking clip" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {tool.capabilities.map((it, i) => {
              const Icon = icons[i] ?? Languages;
              return (
                <Card key={it.title} className="restaurant-lift p-5">
                  <Icon className="size-5 text-accent" aria-hidden="true" />
                  <h3 className="mt-3 text-base font-semibold text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
                </Card>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl sm:text-3xl">What it is</h2>
            {tool.what.map((p) => <p key={p.slice(0, 24)} className="mt-4 leading-relaxed text-muted-foreground">{p}</p>)}
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl">What you can do</h2>
            <ul className="mt-5 space-y-2 text-sm">
              {tool.canDo.map((c) => <li key={c} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-accent" />{c}</li>)}
            </ul>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Step by step" title="How to make a talking avatar video" />
          <NumberedList items={tool.how} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for people who need to be on camera without a shoot" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tool.audiences.map((a) => <div key={a.who} className="border-t-2 border-accent pt-4"><h3 className="text-base font-semibold text-foreground">{a.who}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.why}</p></div>)}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tool.useCases.map((u) => <div key={u.title} className="border-t border-border pt-5"><h3 className="text-lg font-semibold">{u.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Examples" title="Example inputs and outputs" />
          <SamplePromptAccordion examples={tool.examples} />
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 md:grid-cols-2">
          <div><h2 className="text-2xl sm:text-3xl">Tips that improve results</h2><BulletList items={tool.tips} className="mt-5" /></div>
          <div><h2 className="text-2xl sm:text-3xl">Mistakes worth avoiding</h2><BulletList items={tool.mistakes} className="mt-5" /></div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container size="narrow"><FaqAccordion heading="AI Avatar FAQ" items={tool.faqs ?? []} /></Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Finish the rest of your video" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "ai-voice-generator", name: "AI Voice Generator", body: "Prepare a voiceover to drive the avatar." },
              { slug: "ai-video-agent", name: "AI Video Agent", body: "Turn a brief into a full presenter video." },
              { slug: "ai-video-generator", name: "AI Video Pro", body: "Generate B-roll scenes around your presenter." },
              { slug: "ai-captions", name: "AI Captions", body: "Add captions for silent autoplay feeds." },
            ].map((item) => <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Create your first talking avatar</h2>
            <p className="mt-4 leading-relaxed">Check which plan includes the avatar tool and its credit allowance on the pricing page.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">{tool.ctaLabel}</ExternalButton>
              <ButtonLink to="/pricing" variant="outline" size="lg" className="text-ink-foreground">Compare plans</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
