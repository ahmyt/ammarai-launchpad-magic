import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { FaqAccordion } from "@/components/site/Faq";
import { SamplePromptAccordion } from "@/components/site/SamplePromptAccordion";
import { REGISTER_URL } from "@/lib/site";
import type { Tool } from "@/data/types";

type Faq = { q: string; a: string };

/** Shared catalogue-content sections for dedicated flagship pages, so each keeps its full search content. */
export function FlagshipToolSections({
  tool,
  faqs,
  next,
  tutorial,
  pricing,
}: {
  tool: Tool;
  faqs: Faq[];
  next: { slug: string; name: string; body: string }[];
  tutorial: { slug: string; label: string };
  pricing: { title: string; body: string };
}) {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading eyebrow="What it does" title={`What ${tool.name} gives you`} />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tool.capabilities.map((it) => (
              <Card key={it.title} className="restaurant-lift p-5">
                <h3 className="text-base font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </Card>
            ))}
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
          <SectionHeading eyebrow="Step by step" title={`How to use ${tool.name}`} />
          <NumberedList items={tool.how} />
          <p className="mt-6 text-sm"><Link to="/tutorials/$slug" params={{ slug: tutorial.slug }} className="font-semibold text-accent">{tutorial.label} →</Link></p>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Who it's for" title="Built for people with real work to ship" />
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
        <Container size="narrow"><FaqAccordion heading={`${tool.name} FAQ`} items={faqs} /></Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Pair it with" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {next.map((item) => <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Get started</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{pricing.title}</h2>
            <p className="mt-4 leading-relaxed">{pricing.body}</p>
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
