import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { ArrowRight, Check, Shirt, Users, Layers, Palette, Sparkles, Images } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { visualTools } from "@/data/tools-visual";
import { REGISTER_URL } from "@/lib/site";

const tool = visualTools.find((t) => t.slug === "ai-virtual-try-on")!;
const url = "https://ammarai.com/ai-fashion-studio";
const title = "AI Fashion Studio: Photoshoots, Try-On & Fashion Video | AmmarAI";

// Real Fashion Studio screens from the verified tutorial.
const modes = [
  { id: "shoot", tab: "AI Photoshoot", img: "/media/tutorials/tutorial-fashion-13.png", body: "Choose a product, a model, a pose and a background, then review the full scene before generating." },
  { id: "tryon", tab: "Virtual Try-On", img: "/media/tutorials/tutorial-fashion-14.png", body: "Pair a model image with a garment image and generate the garment worn." },
  { id: "model", tab: "Change Model", img: "/media/tutorials/tutorial-fashion-15.png", body: "Keep the outfit and swap in a different model from a replacement image." },
  { id: "edit", tab: "Edit Image", img: "/media/tutorials/tutorial-fashion-16.png", body: "Upload a photo and describe the change you want in plain words." },
  { id: "video", tab: "Fashion video", img: "/media/tutorials/tutorial-fashion-23.png", body: "Animate a still fashion image into a short clip with a motion prompt." },
  { id: "library", tab: "My Photoshoots", img: "/media/tutorials/tutorial-fashion-17.png", body: "Every generated image and video is kept in one library to reuse." },
];

const icons = [Shirt, Sparkles, Users, Users, Layers, Palette];

const brief = {
  garment: ["linen blazer", "striped cotton T-shirt", "ribbed knit dress", "raw denim jacket"],
  setting: ["neutral studio wall", "city street at golden hour", "sunlit interior", "outdoor daylight park"],
  pose: ["relaxed standing", "walking towards camera", "three-quarter turn"],
} as const;

export const Route = createFileRoute("/ai-fashion-studio")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-visual")).visualTools, "ai-virtual-try-on"),
  head: ({ loaderData: t }) => !t ? {} : ({
    meta: [
      { title },
      { name: "description", content: t.description },
      { property: "og:title", content: title },
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
  component: FashionPage,
});

function FashionPage() {
  const [active, setActive] = useState(0);
  const m = modes[active] ?? modes[0];
  const [pick, setPick] = useState({ garment: 0, setting: 0, pose: 0 });
  const prompt = `A ${brief.garment[pick.garment]} worn by the model, ${brief.pose[pick.pose]} pose, ${brief.setting[pick.setting]}, soft natural light. Keep the fabric, colour, print and seams exactly as in the uploaded photo.`;
  const [shoot, setShoot] = useState({ cost: 1500, pieces: 20 });
  const perPiece = shoot.pieces > 0 ? shoot.cost / shoot.pieces : 0;

  if (!m || !tool) return null;

  return (
    <>
      <section className="restaurant-hero">
        <img className="restaurant-hero-image" src="/media/howto-ai-fashion-studio.poster.webp" alt="" aria-hidden="true" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / AI Fashion Studio</p>
          <div className="mt-10 max-w-2xl restaurant-rise">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">{tool.h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{tool.lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} size="lg"><Shirt className="size-4" />{tool.ctaLabel}</ExternalButton>
              <a href="#fashion-howto" className="restaurant-hero-link"><ArrowRight className="size-4" />Watch it work</a>
            </div>
          </div>
        </Container>
      </section>

      <Section tone="sand" id="fashion-howto">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Screen recording" title="Watch a full Fashion Studio session" intro="A real walkthrough inside AmmarAI, from choosing the garment to the finished images." />
          <video className="mt-8 aspect-video w-full border border-border bg-secondary object-contain" controls playsInline preload="none" poster="/media/howto-ai-fashion-studio.poster.webp" src="/media/howto-ai-fashion-studio.mp4" aria-label="How to use AI Fashion Studio" />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Six tools, one studio" title="Everything you need for a collection" intro="Pick a tool to see its real screen inside AmmarAI." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {modes.map((c, i) => <Button key={c.id} role="tab" aria-selected={i === active} variant={i === active ? "default" : "outline"} size="sm" onClick={() => setActive(i)}>{c.tab}</Button>)}
          </div>
          <div key={m.id} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <div className="border-t-2 border-accent bg-background p-6">
              <p className="eyebrow">{m.tab}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              <Link to="/tutorials/$slug" params={{ slug: "how-to-use-fashion-studio" }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">Full step-by-step guide<ArrowRight className="size-4" /></Link>
            </div>
            <img src={m.img} alt={`AmmarAI Fashion Studio ${m.tab} screen`} loading="lazy" className="w-full border border-border bg-secondary" />
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Prompt builder" title="Write a direction the model can follow" intro="Pick one option per row and copy the direction into Fashion Studio with your garment photo." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {(Object.keys(brief) as (keyof typeof brief)[]).map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {brief[k].map((o, i) => <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => setPick({ ...pick, [k]: i })}>{o}</Button>)}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your direction</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{prompt}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(prompt)}>Copy direction</Button>
                <ExternalButton href={REGISTER_URL}>Open AmmarAI<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="What it does" title="Your garment, worn, in any setting" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tool.capabilities.map((it, i) => {
              const Icon = icons[i] ?? Images;
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

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Your numbers" title="What does a photoshoot cost you per piece?" intro="Enter what your last shoot cost and how many pieces it covered. These are your figures, not ours." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="space-y-5">
              <label className="block text-sm font-semibold">Total shoot cost (models, studio, styling, editing) $
                <input type="number" min={0} value={shoot.cost} onChange={(e) => setShoot({ ...shoot, cost: Number(e.target.value) })} className="mt-2 w-full border border-border bg-background px-3 py-2" />
              </label>
              <label className="block text-sm font-semibold">Pieces photographed
                <input type="number" min={1} value={shoot.pieces} onChange={(e) => setShoot({ ...shoot, pieces: Number(e.target.value) })} className="mt-2 w-full border border-border bg-background px-3 py-2" />
              </label>
            </div>
            <Card className="p-6">
              <p className="eyebrow">Cost per piece</p>
              <p className="mt-3 text-4xl font-semibold text-foreground">${perPiece.toFixed(2)}</p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Repeat that for every colourway and season. With Fashion Studio, each new image uses credits from your plan instead — compare allowances on the pricing page.</p>
            </Card>
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
          <SectionHeading eyebrow="Step by step" title="How to put a garment on a model" />
          <NumberedList items={tool.how} />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for people who sell clothes online" />
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
        <Container size="narrow"><FaqAccordion heading="AI Fashion Studio FAQ" items={tool.faqs ?? []} /></Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Finish the rest of the launch" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "ai-photoshoot", name: "AI Product Photoshoot", body: "Product-only scenes for shoes, bags and accessories." },
              { slug: "ai-image-editor", name: "AI Image Editor", body: "Clean up and retouch the finished shots." },
              { slug: "ai-image-to-video", name: "Image to Video", body: "Turn a lookbook image into a short ad clip." },
              { slug: "why-choose-this-product", name: "Product Copy", body: "Write the product description to go with the photos." },
            ].map((item) => <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Put your first garment on a model</h2>
            <p className="mt-4 leading-relaxed">Fashion Studio uses your plan's image and video credits. Check which plan fits on the pricing page.</p>
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
