import { Container, Section } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalPage({
  eyebrow,
  h1,
  lede,
  updated,
  sections,
}: {
  eyebrow: string;
  h1: string;
  lede: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <div>
      <Section className="pb-6 pt-10 sm:pt-14">
        <Container size="narrow">
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: eyebrow }]} />
          <div className="mt-8">
            <p className="eyebrow">{eyebrow}</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">{h1}</h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">{lede}</p>
            <p className="mt-4 text-sm text-muted-foreground">Last updated: {updated}</p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="narrow">
          <nav aria-label="On this page" className="site-legal-toc border-y border-border py-5">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-foreground">
              Contents
            </p>
            <ol className="mt-3 grid gap-2 sm:grid-cols-2">
              {sections.map((s, i) => (
                <li key={s.heading} className="text-sm text-muted-foreground">
                  <a href={`#${slugify(s.heading)}`} className="transition-colors hover:text-foreground">
                    {String(i + 1).padStart(2, "0")} {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose-editorial mt-10">
            {sections.map((s) => (
              <section key={s.heading} id={slugify(s.heading)} className="scroll-mt-24">
                <h2>{s.heading}</h2>
                {s.paragraphs?.map((p) => <p key={p}>{p}</p>)}
                {s.bullets ? (
                  <ul>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
