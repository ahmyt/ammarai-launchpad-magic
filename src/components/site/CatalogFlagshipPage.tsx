import { useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { REGISTER_URL } from "@/lib/site";
import type { Faq, Tool } from "@/data/types";

export type BriefRows = Record<string, readonly string[]>;

export type CatalogFlagshipConfig = {
  tool: Tool;
  clip: string;
  icon: ReactNode;
  planNote: string;
  pricing: { title: string; body: string };
  tutorial: { slug: string; label: string };
  next: { slug: string; name: string; body: string }[];
  moreFaqs?: Faq[];
  brief: { title: string; intro: string; rows: BriefRows; build: (pick: Record<string, string>) => string };
};

export function catalogFlagshipHead(c: Pick<CatalogFlagshipConfig, "tool" | "moreFaqs">, category = "BusinessApplication") {
  const { tool } = c;
  const url = `https://ammarai.com/${tool.slug}`;
  return {
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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: tool.name, applicationCategory: category, operatingSystem: "Web", description: tool.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...(tool.faqs ?? []), ...(c.moreFaqs ?? [])])) },
    ],
  };
}

/** Dedicated flagship layout for catalogue tools: moving header, step viewer, before/after, brief builder and full search sections. */
export function CatalogFlagshipPage(c: CatalogFlagshipConfig) {
  const { tool } = c;
  const [step, setStep] = useState(0);
  const s = tool.how[step] ?? tool.how[0]!;
  const [ex, setEx] = useState(0);
  const [after, setAfter] = useState(true);
  const sample = tool.examples[ex] ?? tool.examples[0];
  const keys = Object.keys(c.brief.rows);
  const [pick, setPick] = useState<Record<string, number>>(() => Object.fromEntries(keys.map((k) => [k, 0])));
  const chosen = Object.fromEntries(keys.map((k) => [k, c.brief.rows[k]![pick[k] ?? 0]!]));
  const briefText = c.brief.build(chosen);
  const [copied, setCopied] = useState(false);

  return (
    <>
      <FlagshipVideoHero clip={c.clip} crumb={tool.name} title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={c.icon} jump={{ href: "#workflow", label: "See how it works" }} note={c.planNote} />

      <Section tone="sand" id="workflow">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Step by step" title={`How ${tool.name} works`} intro="Click each step to follow the workflow." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={`${tool.name} steps`}>
            {tool.how.map((h, i) => <Button key={h.title} role="tab" aria-selected={i === step} size="sm" variant={i === step ? "default" : "outline"} onClick={() => setStep(i)}>{i + 1}. {h.title}</Button>)}
          </div>
          <div key={step} role="tabpanel" className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-2">
            <div className="border-t-2 border-accent bg-background p-6">
              <p className="eyebrow">{String(step + 1).padStart(2, "0")} / {String(tool.how.length).padStart(2, "0")}</p>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
            <div className="flex flex-col justify-center gap-4 bg-background p-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary"><div className="h-full bg-accent transition-all" style={{ width: `${((step + 1) / tool.how.length) * 100}%` }} /></div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>Back</Button>
                <Button size="sm" disabled={step === tool.how.length - 1} onClick={() => setStep(step + 1)}>Next step</Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {sample ? (
        <Section>
          <Container>
            <SectionHeading eyebrow="Before → after" title="See an example request and result" intro={`Example inputs and outputs from ${tool.name}.`} />
            <div className="mt-8 flex flex-wrap gap-2">
              {tool.examples.map((e, i) => <Button key={e.label} size="sm" variant={i === ex ? "default" : "outline"} onClick={() => setEx(i)}>{e.label}</Button>)}
              <Button size="sm" variant="outline" onClick={() => setAfter(!after)}>{after ? "Show the request" : "Show the result"}</Button>
            </div>
            <Card className="mt-6 p-6" aria-live="polite">
              <p className="eyebrow">{after ? "Result" : "Request"}</p>
              <p className="mt-3 whitespace-pre-line leading-relaxed text-foreground">{after ? sample.output : sample.input}</p>
            </Card>
          </Container>
        </Section>
      ) : null}

      <Section tone="sand" id="brief">
        <Container>
          <SectionHeading eyebrow="Brief builder" title={c.brief.title} intro={c.brief.intro} />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              {keys.map((k) => (
                <div key={k}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{k}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {c.brief.rows[k]!.map((o, i) => <Button key={o} size="sm" variant={pick[k] === i ? "default" : "outline"} onClick={() => { setPick({ ...pick, [k]: i }); setCopied(false); }}>{o}</Button>)}
                  </div>
                </div>
              ))}
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your brief</p>
              <p className="mt-3 font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{briefText}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(briefText); setCopied(true); }}>{copied ? "Copied" : "Copy brief"}</Button>
                <ExternalButton href={REGISTER_URL}>Open AmmarAI<ArrowRight className="size-4" /></ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <FlagshipToolSections tool={tool} faqs={[...(tool.faqs ?? []), ...(c.moreFaqs ?? [])]} next={c.next} tutorial={c.tutorial} pricing={c.pricing} />
    </>
  );
}
