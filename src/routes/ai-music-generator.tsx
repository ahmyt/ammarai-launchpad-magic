import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowDown, Music } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { platformTools } from "@/data/tools-platform";
import { REGISTER_URL } from "@/lib/site";

const tool = platformTools.find((t) => t.slug === "ai-music-generator")!;
const url = "https://ammarai.com/ai-music-generator";

const steps = [
  { title: "Write a precise music description", body: "Describe the mood, pace and prominent instruments together.", img: "/media/tutorials/tutorial-music-pro-01.png", w: 1811, h: 629 },
  { title: "Set the duration", body: "Enter the length in seconds so the track fits its destination.", img: "/media/tutorials/tutorial-music-pro-02.png", w: 1801, h: 585 },
  { title: "Choose the musical style", body: "Pick the genre closest to the result; the description supplies the detail.", img: "/media/tutorials/tutorial-music-pro-03.png", w: 1898, h: 636 },
];

const brief = {
  mood: ["optimistic", "calm", "energetic", "dramatic", "warm"],
  instruments: ["light percussion and warm synths", "soft piano and strings", "acoustic guitar and claps", "deep bass and drums"],
  pace: ["a steady mid-tempo build", "a slow, even pace", "a fast, punchy rhythm"],
  use: ["a 15-second social clip", "a 30-second product ad", "a 60-second podcast intro", "a 2-minute presentation bed"],
} as const;
const seconds = [15, 30, 60, 120];

const moreFaqs = [
  { q: "Which plan includes AI Music Pro?", a: "AI Music Pro is included from the Basic plan ($24.99/month) and on every plan above it." },
  { q: "How do I get a track closer to what I want?", a: "Change one element at a time — tempo, instrument or mood — and generate again, keeping the other inputs the same so each revision is easy to compare." },
];
const faqs = [...(tool.faqs ?? []), ...moreFaqs];

export const Route = createFileRoute("/ai-music-generator")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: tool.title },
      { name: "description", content: tool.description },
      { property: "og:title", content: tool.title },
      { property: "og:description", content: tool.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.name, applicationCategory: "MultimediaApplication", operatingSystem: "Web", description: tool.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) },
    ],
  }),
  component: MusicPage,
});

function MusicPage() {
  const [step, setStep] = useState(0);
  const s = steps[step] ?? steps[0]!;
  const [pick, setPick] = useState({ mood: 0, instruments: 0, pace: 0, use: 1 });
  const prompt = `An ${brief.mood[pick.mood]} track with ${brief.instruments[pick.instruments]} and ${brief.pace[pick.pace]}, for ${brief.use[pick.use]}.`.replace(/^An ([^aeiou])/, "A $1");

  return (
    <>
      <FlagshipVideoHero clip="music-pro" crumb="AI Music Pro" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<Music className="size-4" />} jump={{ href: "#brief", label: "Build a music brief" }} note="Included from the Basic plan, $24.99/month." />

      <Section tone="sand">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Inside the studio" title="Three settings make a track" intro="Real screens from AI Music Pro. Click each step." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {steps.map((x, i) => <Button key={x.title} role="tab" aria-selected={i === step} size="sm" variant={i === step ? "default" : "outline"} onClick={() => setStep(i)}>{i + 1}. {x.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
            <div className="border-t-2 border-accent bg-background p-6"><h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p></div>
            <img src={s.img} alt={s.title} width={s.w} height={s.h} className="w-full rounded-lg border border-border bg-background" />
          </div>
        </Container>
      </Section>

      <Section id="brief">
        <Container>
          <SectionHeading eyebrow="Brief builder" title="Describe the track in one sentence" intro="Combine mood, instruments and pace, then match the length to where it plays." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {(Object.keys(brief) as (keyof typeof brief)[]).map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k === "use" ? "where it plays" : k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {brief[k].map((o, i) => <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => setPick({ ...pick, [k]: i })}>{o}</Button>)}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Description</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{prompt}</p>
              <p className="mt-4 text-sm text-muted-foreground">Duration: <strong className="text-foreground">{seconds[pick.use]} seconds</strong></p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(prompt)}>Copy description</Button>
                <ExternalButton href={REGISTER_URL}>Open AI Music Pro</ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <FlagshipToolSections
        tool={tool}
        faqs={faqs}
        tutorial={{ slug: "how-to-use-ai-music-pro", label: "Read the full AI Music Pro tutorial" }}
        next={[
          { slug: "sound-studio", name: "Sound Studio", body: "Lay the track under a voiceover and balance levels." },
          { slug: "ai-voice-generator", name: "AI Voiceover", body: "Generate the narration that sits on top." },
          { slug: "ai-video-generator", name: "AI Video Pro", body: "Make the video the music plays under." },
          { slug: "song-lyrics-generator", name: "Song Lyrics Generator", body: "Draft lyrics from a theme and mood." },
        ]}
        pricing={{ title: "Make your first track", body: "AI Music Pro is included from the Basic plan ($24.99/month), with a 3-day free trial on Basic." }}
      />
    </>
  );
}
