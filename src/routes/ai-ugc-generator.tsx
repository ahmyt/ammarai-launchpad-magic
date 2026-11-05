import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clapperboard } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { videoTools } from "@/data/tools-video";
import { REGISTER_URL } from "@/lib/site";

const tool = videoTools.find((t) => t.slug === "ai-ugc-generator")!;
const url = "https://ammarai.com/ai-ugc-generator";

const steps = [
  { title: "Open the UGC workspace", body: "Script, voice, actor and scene options sit on one screen.", img: "/media/tutorials/tutorial-ugc-1.png", w: 1337, h: 626 },
  { title: "Write the script and pick a voice", body: "Type the script and choose a voice, or upload or record your own audio instead.", img: "/media/tutorials/tutorial-ugc-2.png", w: 1730, h: 846 },
  { title: "Select an actor", body: "Pick from the library, upload a reference or create a new actor.", img: "/media/tutorials/tutorial-ugc-3.png", w: 1738, h: 901 },
  { title: "Choose a scene and generate", body: "Select the setting, then generate the finished video.", img: "/media/tutorials/tutorial-ugc-4.png", w: 1763, h: 910 },
];

const hooks = {
  "Problem first": (p: string) => `Okay, I was so tired of dealing with this until I found ${p}.`,
  "Honest review": (p: string) => `I've been using ${p} for two weeks, and here's my honest take.`,
  "Quick demo": (p: string) => `Let me show you how ${p} works in under 30 seconds.`,
  "Surprise result": (p: string) => `I didn't expect ${p} to actually make this much difference.`,
} as const;
type HookKey = keyof typeof hooks;
const ctas = ["Link is in my bio.", "Grab yours before the offer ends.", "Try it and tell me what you think."];

const clips = [
  { src: "/media/ai-ugc-skincare-serum.webm", poster: "/media/ai-ugc-skincare-serum.poster.jpg", label: "Skincare serum creator review" },
  { src: "/media/demo-ugc-creator.webm", poster: "/media/demo-ugc-creator.poster.jpg", label: "UGC Creator walkthrough" },
];

const moreFaqs = [
  { q: "Which plan includes the UGC Creator?", a: "UGC Factory is part of the Ultimate plan ($129.99/month)." },
  { q: "Can I use my own voice?", a: "Yes. Instead of typing a script for a generated voice, you can upload an audio file or record directly in the workspace." },
];
const faqs = [...(tool.faqs ?? []), ...moreFaqs];

export const Route = createFileRoute("/ai-ugc-generator")({
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
  component: UgcPage,
});

function UgcPage() {
  const [step, setStep] = useState(0);
  const s = steps[step] ?? steps[0]!;
  const [product, setProduct] = useState("this vitamin C serum");
  const [hook, setHook] = useState<HookKey>("Problem first");
  const [cta, setCta] = useState(0);
  const script = `${hooks[hook](product || "this product")} [show the product up close] It's quick to use and fits right into my routine. ${ctas[cta]}`;

  return (
    <>
      <FlagshipVideoHero clip="ugc-creator" crumb="AI UGC Creator" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<Clapperboard className="size-4" />} jump={{ href: "#hooks", label: "Write a hook" }} note="UGC Factory is included on the Ultimate plan, $129.99/month." />

      <Section tone="sand">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Inside the studio" title="Four steps to a creator video" intro="Real screens from the UGC Creator. Click each step." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {steps.map((x, i) => <Button key={x.title} role="tab" aria-selected={i === step} size="sm" variant={i === step ? "default" : "outline"} onClick={() => setStep(i)}>{i + 1}. {x.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
            <div className="border-t-2 border-accent bg-background p-6"><h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p></div>
            <img src={s.img} alt={s.title} width={s.w} height={s.h} className="w-full rounded-lg border border-border bg-background" />
          </div>
        </Container>
      </Section>

      <Section id="hooks">
        <Container>
          <SectionHeading eyebrow="Hook builder" title="Draft a script to test" intro="Keep the product and offer the same, and change only the opening line between versions." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Product</span>
                <input value={product} onChange={(e) => setProduct(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </label>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Hook style</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(Object.keys(hooks) as HookKey[]).map((k) => <Button key={k} size="sm" variant={hook === k ? "default" : "outline"} onClick={() => setHook(k)}>{k}</Button>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Call to action</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ctas.map((c, i) => <Button key={c} size="sm" variant={cta === i ? "default" : "outline"} onClick={() => setCta(i)}>{c}</Button>)}
                </div>
              </div>
            </div>
            <Card className="p-6">
              <p className="eyebrow">Script</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{script}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(script)}>Copy script</Button>
                <ExternalButton href={REGISTER_URL}>Open UGC Creator</ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Real results" title="Videos made with the UGC Creator" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {clips.map((c) => (
              <figure key={c.src}>
                <video src={c.src} poster={c.poster} controls muted playsInline preload="none" className="w-full rounded-lg border border-border bg-background" />
                <figcaption className="mt-2 text-sm text-muted-foreground">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <FlagshipToolSections
        tool={tool}
        faqs={faqs}
        tutorial={{ slug: "how-to-create-ugc-videos", label: "Read the full UGC video tutorial" }}
        next={[
          { slug: "ai-avatar-generator", name: "AI Avatar", body: "Make presenter videos from a script." },
          { slug: "ai-captions", name: "AI Captions", body: "Add styled subtitles for silent viewing." },
          { slug: "ad-script-generator", name: "Ad Script Generator", body: "Draft more hooks and ad scripts." },
          { slug: "ai-video-generator", name: "AI Video Pro", body: "Generate product b-roll to cut in." },
        ]}
        pricing={{ title: "Make your first creator video", body: "UGC Factory is included on the Ultimate plan ($129.99/month)." }}
      />
    </>
  );
}
