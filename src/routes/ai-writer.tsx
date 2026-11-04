import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, PenLine, Wand2, Ruler, Repeat2, Languages, Search, ListTree, FileText } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { coreToolsA } from "@/data/tools-core-a";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { REGISTER_URL } from "@/lib/site";

const tool = coreToolsA.find((t) => t.slug === "ai-writer")!;
const url = "https://ammarai.com/ai-writer";
const title = tool.title;
const description = tool.description;
const icons = [PenLine, Wand2, Ruler, Repeat2, Languages];

const wizardSteps = [
  { icon: FileText, title: "Enter your topic", body: "Start a new article and describe what the piece is about in plain words — the product, the problem or the subject.", sample: "Topic: how small bakeries can take more online pre-orders" },
  { icon: Search, title: "Pick keyword suggestions", body: "Request suggestions at the keyword step. You get phrases based on recent searches around your topic, then keep the two or three a reader would genuinely type.", sample: "Kept: “bakery pre-order system”, “online cake orders”" },
  { icon: ListTree, title: "Turn real questions into sections", body: "At the outline step, pull in the questions people search and turn the ones you keep into headings with a straight answer underneath.", sample: "H2: How do I take cake orders online without a website?" },
  { icon: PenLine, title: "Write and review section by section", body: "Let the wizard draft each section, then edit for accuracy. Anything you cannot verify comes out before you publish.", sample: "Draft ready → edit facts → publish" },
];

const brief = {
  format: ["product update", "landing page section", "customer email", "blog intro"],
  audience: ["existing customers", "first-time visitors", "busy managers"],
  tone: ["direct and warm", "calm and expert", "plain and friendly"],
} as const;

const moreFaqs = [
  { q: "What is the Article Wizard?", a: "The Article Wizard is the guided article flow inside AmmarAI. You enter a topic, choose keyword suggestions based on recent searches, build an outline from real search questions, then draft and review each section." },
  { q: "Can AI Writer publish to my blog?", a: "AmmarAI can publish posts to WordPress. Follow the WordPress publishing tutorial to connect your site, and always review the draft before it goes live." },
];

export const Route = createFileRoute("/ai-writer")({
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
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.name, applicationCategory: "BusinessApplication", operatingSystem: "Web", description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...(tool.faqs ?? []), ...moreFaqs])) },
    ],
  }),
  component: WriterPage,
});

function WriterPage() {
  const [step, setStep] = useState(0);
  const ws = wizardSteps[step] ?? wizardSteps[0]!;
  const [ex, setEx] = useState(0);
  const [after, setAfter] = useState(true);
  const sample = tool.examples[ex] ?? tool.examples[0]!;
  const [pick, setPick] = useState({ format: 0, audience: 0, tone: 0 });
  const briefText = `Write a ${brief.format[pick.format]} for ${brief.audience[pick.audience]}. Tone: ${brief.tone[pick.tone]}. Goal: [what the reader should do next]. Must include: [facts, numbers, links]. Leave out: [claims you can't verify].`;
  const WsIcon = ws.icon;

  return (
    <>
      <FlagshipVideoHero clip="ai-writer" crumb="AI Writer" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<PenLine className="size-4" />} jump={{ href: "#article-wizard", label: "See the Article Wizard" }} note="Included on every plan, including Free." />

      <Section tone="sand" id="article-wizard">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Article Wizard" title="From a topic to a search-ready article in four steps" intro="Click each step to see what happens. The example topic is illustrative." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {wizardSteps.map((w, i) => <Button key={w.title} role="tab" aria-selected={i === step} variant={i === step ? "default" : "outline"} size="sm" onClick={() => setStep(i)}>{i + 1}. {w.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-2">
            <div className="border-t-2 border-accent bg-background p-6">
              <WsIcon className="size-6 text-accent" aria-hidden="true" />
              <h3 className="mt-3 text-xl font-semibold">{ws.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{ws.body}</p>
            </div>
            <div className="flex flex-col justify-center bg-background p-6">
              <p className="eyebrow">On screen</p>
              <p className="mt-3 rounded-lg bg-secondary px-4 py-3 font-mono text-sm text-foreground">{ws.sample}</p>
              <div className="mt-5 flex gap-2">
                <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                <Button size="sm" disabled={step === wizardSteps.length - 1} onClick={() => setStep(step + 1)}>Next step</Button>
              </div>
            </div>
          </div>
          <p className="mt-6 text-sm"><Link to="/tutorials/$slug" params={{ slug: "how-to-get-keyword-and-question-ideas-in-the-article-wizard" }} className="font-semibold text-accent">Read the full Article Wizard tutorial →</Link></p>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Before → after" title="See what one pass of editing does" intro="Real example inputs and outputs from AI Writer." />
          <div className="mt-8 flex flex-wrap gap-2">
            {tool.examples.map((e, i) => <Button key={e.label} size="sm" variant={i === ex ? "default" : "outline"} onClick={() => setEx(i)}>{e.label}</Button>)}
            <Button size="sm" variant="outline" onClick={() => setAfter(!after)}>{after ? "Show the brief" : "Show the result"}</Button>
          </div>
          <Card className="mt-6 p-6" aria-live="polite">
            <p className="eyebrow">{after ? "Result" : "Brief"}</p>
            <p className="mt-3 leading-relaxed text-foreground">{after ? sample.output : sample.input}</p>
          </Card>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Brief builder" title="Write the brief that gets a usable first draft" intro="Pick one option per row, fill the brackets, and paste it into AI Writer." />
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
              <p className="eyebrow">Your brief</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{briefText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(briefText)}>Copy brief</Button>
                <ExternalButton href={REGISTER_URL}>Open AmmarAI<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="What it does" title="An editor that works in passes, not one-shot text" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {tool.capabilities.map((it, i) => {
              const Icon = icons[i] ?? PenLine;
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

      <Section>
        <Container>
          <SectionHeading eyebrow="Step by step" title="How to get writing you'd actually publish" />
          <NumberedList items={tool.how} />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Who it's for" title="For people who write as part of the job" />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {tool.audiences.map((a) => <div key={a.who} className="border-t-2 border-accent pt-4"><h3 className="text-base font-semibold text-foreground">{a.who}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.why}</p></div>)}
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {tool.useCases.map((u) => <div key={u.title} className="border-t border-border pt-5"><h3 className="text-lg font-semibold">{u.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{u.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Examples" title="Example inputs and outputs" />
          <SamplePromptAccordion examples={tool.examples} />
        </Container>
      </Section>

      <Section tone="sand">
        <Container className="grid gap-12 md:grid-cols-2">
          <div><h2 className="text-2xl sm:text-3xl">Tips that improve results</h2><BulletList items={tool.tips} className="mt-5" /></div>
          <div><h2 className="text-2xl sm:text-3xl">Mistakes worth avoiding</h2><BulletList items={tool.mistakes} className="mt-5" /></div>
        </Container>
      </Section>

      <Section>
        <Container size="narrow"><FaqAccordion heading="AI Writer FAQ" items={[...(tool.faqs ?? []), ...moreFaqs]} /></Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Take the draft further" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "article-wizard", name: "Article Wizard", body: "Build a full search-ready article step by step." },
              { slug: "ai-seo-analyzer", name: "AI SEO Analyzer", body: "Audit the published page for search issues." },
              { slug: "ai-blogger-agent", name: "AI Blogger Agent", body: "Schedule recurring posts around one topic." },
              { slug: "ai-proofreader", name: "AI Proofreader", body: "Catch grammar and spelling before you publish." },
            ].map((item) => <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Write your first draft free</h2>
            <p className="mt-4 leading-relaxed">AI Writer is on every plan, including Free. Higher plans raise the monthly allowance and unlock advanced models.</p>
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
