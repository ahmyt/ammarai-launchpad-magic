import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { ArrowRight, Check, ImageIcon, Brush, Scissors, Expand, Layers, Maximize2 } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { coreToolsA } from "@/data/tools-core-a";
import { REGISTER_URL } from "@/lib/site";

const tool = coreToolsA.find((t) => t.slug === "ai-image-generator")!;
const url = "https://ammarai.com/ai-image-generator";
const icons = [Brush, Scissors, Expand, Layers, Maximize2, ImageIcon];

// Steps and screenshots mirror the verified "How to use AI Image Pro" tutorial.
const studioSteps = [
  { title: "Describe the image", body: "Enter a clear description of the visual you want — subject, setting, composition and lighting.", src: "/media/tutorials/tutorial-image-pro-1.png", alt: "AmmarAI AI Image Pro prompt area for describing a new image", w: 1024, h: 450 },
  { title: "Choose variations", body: "Generate one result for a focused request, or several to compare interpretations of the same prompt.", src: "/media/tutorials/tutorial-image-pro-2.png", alt: "AI Image Pro control for choosing the number of image variations", w: 1024, h: 459 },
  { title: "Pick a style", body: "Select the visual preset that matches the look you want, without writing a long style description.", src: "/media/tutorials/tutorial-image-pro-3.png", alt: "AI Image Pro visual style preset gallery", w: 1024, h: 525 },
  { title: "Set the ratio", body: "Choose square, portrait or landscape before generating so the composition fits where it will be published.", src: "/media/tutorials/tutorial-image-pro-5.png", alt: "AI Image Pro aspect-ratio menu beside the prompt", w: 1024, h: 458 },
  { title: "Choose a model", body: "Pick from the image models available in your workspace. Availability can vary by account.", src: "/media/tutorials/tutorial-image-pro-6.png", alt: "AI Image Pro model selection menu", w: 1024, h: 450 },
  { title: "Review results", body: "Compare subject accuracy, composition, edges and small details before choosing a result.", src: "/media/tutorials/tutorial-image-pro-8.png", alt: "AI Image Pro generated image results below the prompt area", w: 1024, h: 490 },
  { title: "Image library", body: "Browse generated and available images and pick the one that fits the subject and format.", src: "/media/tutorials/tutorial-image-pro-9.png", alt: "AI Image Pro image library with generated visual thumbnails", w: 1024, h: 493 },
];

const builder = {
  subject: ["a ceramic coffee mug on a wooden table", "a modern home office desk", "a fresh salad bowl from above", "a running shoe on a concrete step"],
  style: ["photorealistic", "clean studio product shot", "soft watercolor illustration", "minimal flat graphic"],
  light: ["soft morning window light", "bright even studio light", "warm golden-hour light", "moody low-key light"],
  ratio: ["1:1 square", "16:9 wide", "9:16 vertical", "4:5 portrait"],
} as const;

const moreFaqs = [
  { q: "Is AI Image Pro free?", a: "Yes. AI Image is included on the permanent Free plan with 500 monthly credits. Paid plans raise the monthly allowance." },
  { q: "Can I use the images commercially?", a: "Check that the image doesn't include protected characters, brand assets or a real person's likeness without permission, and review faces, hands and lettering before publishing." },
];

export const Route = createFileRoute("/ai-image-generator")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-core-a")).coreToolsA, "ai-image-generator"),
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
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...(t.faqs ?? []), ...moreFaqs])) },
    ],
  }),
  component: ImageProPage,
});

function ImageProPage() {
  const [step, setStep] = useState(0);
  const s = studioSteps[step] ?? studioSteps[0]!;
  const [pick, setPick] = useState({ subject: 0, style: 0, light: 0, ratio: 0 });
  const [copied, setCopied] = useState(false);
  const prompt = `${builder.ratio[pick.ratio]}. ${builder.style[pick.style]} of ${builder.subject[pick.subject]}, ${builder.light[pick.light]}, clear subject with space around it, no text, no logos.`;

  return (
    <>
      <FlagshipVideoHero clip="image-pro" crumb="AI Image Pro" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<ImageIcon className="size-4" />} jump={{ href: "#studio", label: "See the studio" }} note="Included on every plan, including Free (500 credits a month)." />

      <Section tone="sand" id="studio">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Inside the studio" title="From a description to a finished image in seven steps" intro="Click each step to see the real screen." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {studioSteps.map((x, i) => <Button key={x.title} role="tab" aria-selected={i === step} variant={i === step ? "default" : "outline"} size="sm" onClick={() => setStep(i)}>{i + 1}. {x.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="border-t-2 border-accent bg-background p-6">
              <p className="eyebrow">Step {step + 1} of {studioSteps.length}</p>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-5 flex gap-2">
                <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                <Button size="sm" disabled={step === studioSteps.length - 1} onClick={() => setStep(step + 1)}>Next step</Button>
              </div>
            </div>
            <a href={s.src} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-lg border border-border bg-background" aria-label={`Open full-size screenshot: ${s.alt}`}>
              <img src={s.src} alt={s.alt} width={s.w} height={s.h} loading="lazy" className="h-auto w-full" />
            </a>
          </div>
          <p className="mt-6 text-sm"><Link to="/tutorials/$slug" params={{ slug: "how-to-use-ai-image-pro" }} className="font-semibold text-accent">Read the full AI Image Pro tutorial →</Link></p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Prompt builder" title="Build a prompt that gets a usable first image" intro="Pick one option per row, then copy the prompt into AI Image Pro." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {(Object.keys(builder) as (keyof typeof builder)[]).map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {builder[k].map((o, i) => <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => { setPick({ ...pick, [k]: i }); setCopied(false); }}>{o}</Button>)}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your prompt</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{prompt}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(prompt); setCopied(true); }}>{copied ? "Copied" : "Copy prompt"}</Button>
                <ExternalButton href={REGISTER_URL}>Open AmmarAI<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="What it does" title="Generate, edit and finish in one canvas" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tool.capabilities.map((it, i) => {
              const Icon = icons[i] ?? ImageIcon;
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
          <SectionHeading eyebrow="Step by step" title="How to get images you'd actually publish" />
          <NumberedList items={tool.how} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="For anyone who needs visuals on deadline" />
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
          <SectionHeading eyebrow="Examples" title="Example prompts and results" />
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
        <Container size="narrow"><FaqAccordion heading="AI Image Pro FAQ" items={[...(tool.faqs ?? []), ...moreFaqs]} /></Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Take the image further" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "ai-image-to-video", name: "AI Image to Video", body: "Animate a finished still into a short clip." },
              { slug: "ai-image-editor", name: "AI Image Editor", body: "Change a photo by describing the edit." },
              { slug: "ai-photoshoot", name: "AI Product Photoshoot", body: "Put products into clean studio or lifestyle scenes." },
              { slug: "ai-creative-suite", name: "AI Creative Suite", body: "Produce a whole matching campaign set." },
            ].map((item) => <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Create your first image free</h2>
            <p className="mt-4 leading-relaxed">AI Image is on every plan, including Free with 500 monthly credits. Higher plans raise the allowance.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">{tool.ctaLabel}</ExternalButton>
              <ButtonLink to="/pricing" variant="outline" size="lg">Compare plans</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
