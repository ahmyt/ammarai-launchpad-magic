import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight, Info, Lightbulb, TriangleAlert } from "lucide-react";

import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { buttonClass } from "@/components/site/Button";
import { Container } from "@/components/site/primitives";
import { adjacentTutorials, getTutorial, type Tutorial, type TutorialCallout } from "@/data/tutorials";

export const Route = createFileRoute("/tutorials/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params }) => {
    // Loaded on demand so the tutorial library stays out of the startup bundle.
    const library = await import("@/data/tutorials");
    const tutorial = library.getTutorial(params.slug);
    if (!tutorial) throw notFound();
    return { tutorial };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Tutorial not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { tutorial } = loaderData;
    const hasSteps = tutorial.sections.some((section) => section.steps && section.steps.length > 0);
    const jsonLd: Record<string, unknown>[] = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://ammarai.com/" },
          {
            "@type": "ListItem",
            position: 2,
            name: "Tutorials",
            item: "https://ammarai.com/tutorials",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: tutorial.h1,
            item: `https://ammarai.com/tutorials/${tutorial.slug}`,
          },
        ],
      },
    ];
    if (hasSteps) {
      const steps = tutorial.sections
        .flatMap((section) =>
          (section.steps ?? []).map((step) => ({
            "@type": "HowToStep",
            name: step.title,
            text: step.body,
          })),
        );
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: tutorial.h1,
        description: tutorial.description,
        step: steps,
      });
    }
    return {
      meta: [
        { title: tutorial.title },
        { name: "description", content: tutorial.description },
        { property: "og:title", content: tutorial.title },
        { property: "og:description", content: tutorial.description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary" },
      ],
      links: [
        { rel: "canonical", href: `https://ammarai.com/tutorials/${tutorial.slug}` },
      ],
      scripts: jsonLd.map((data) => ({
        type: "application/ld+json",
        children: JSON.stringify(data),
      })),
    };
  },
  component: TutorialPage,
  notFoundComponent: TutorialNotFound,
});

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const calloutIcon = {
  tip: Lightbulb,
  note: Info,
  warning: TriangleAlert,
} as const;

function Callout({ callout }: { callout: TutorialCallout }) {
  const Icon = calloutIcon[callout.type];
  const label = callout.type === "tip" ? "Tip" : callout.type === "note" ? "Note" : "Important";
  return (
    <aside className={`tutorial-callout tutorial-callout-${callout.type}`}>
      <p className="tutorial-callout-label">
        <Icon className="size-4" aria-hidden="true" />
        {label}
      </p>
      <p>{callout.body}</p>
    </aside>
  );
}

function CtaLink({ cta }: { cta: Tutorial["cta"] }) {
  const label = (
    <>
      Try {cta.toolName} in AmmarAI <ArrowRight aria-hidden="true" />
    </>
  );
  if (cta.kind === "feature") {
    return (
      <Link
        to="/features/$slug"
        params={{ slug: cta.toolSlug }}
        className={buttonClass("primary", "lg")}
      >
        {label}
      </Link>
    );
  }
  return (
    <Link to="/$slug" params={{ slug: cta.toolSlug }} className={buttonClass("primary", "lg")}>
      {label}
    </Link>
  );
}

function TutorialPage() {
  const { tutorial } = Route.useLoaderData();
  const { prev, next } = adjacentTutorials(tutorial.slug);
  const showToc = tutorial.sections.length >= 3;

  return (
    <article className="tutorial-page">
      <Container className="tutorial-container">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Tutorials", to: "/tutorials" },
            { label: tutorial.h1 },
          ]}
        />
        <header className="tutorial-header">
          <p className="eyebrow">{tutorial.category}</p>
          <h1>{tutorial.h1}</h1>
          {tutorial.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 40)} className="tutorial-lede">
              {paragraph}
            </p>
          ))}
          <div className="tutorial-cta-top">
            <CtaLink cta={tutorial.cta} />
          </div>
        </header>

        {tutorial.whenToUse && tutorial.whenToUse.length > 0 && (
          <section className="tutorial-when" aria-labelledby="tutorial-when-heading">
            <h2 id="tutorial-when-heading">When to use this</h2>
            <ul>
              {tutorial.whenToUse.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {showToc && (
          <nav className="tutorial-toc" aria-labelledby="tutorial-toc-heading">
            <p id="tutorial-toc-heading" className="tutorial-toc-title">
              In this guide
            </p>
            <ol>
              {tutorial.sections.map((section) => (
                <li key={section.heading}>
                  <a href={`#${slugify(section.heading)}`}>{section.heading}</a>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="tutorial-body">
          {tutorial.sections.map((section) => (
            <section key={section.heading} aria-labelledby={slugify(section.heading)}>
              <h2 id={slugify(section.heading)} className="tutorial-section-heading">
                {section.heading}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {section.steps && section.steps.length > 0 && (
                <ol className="tutorial-steps">
                  {section.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="tutorial-step-number" aria-hidden="true">
                        {index + 1}
                      </span>
                      <div className="tutorial-step-content">
                        <h3>{step.title}</h3>
                        <p>{step.body}</p>
                        {step.image ? (
                          <figure className="tutorial-step-figure">
                            <img
                              src={step.image.src}
                              alt={step.image.alt}
                              width={step.image.width}
                              height={step.image.height}
                              loading="lazy"
                              decoding="async"
                            />
                            {step.image.caption ? <figcaption>{step.image.caption}</figcaption> : null}
                          </figure>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="tutorial-bullets">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {section.table && (
                <div className="table-scroll">
                  <table>
                    <thead>
                      <tr>
                        {section.table.head.map((cell) => (
                          <th key={cell}>{cell}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row[0]}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${row[0]}-${cellIndex}`}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {section.callouts?.map((callout) => (
                <Callout key={callout.body} callout={callout} />
              ))}
            </section>
          ))}
        </div>

        <div className="tutorial-cta-bottom">
          <p className="tutorial-cta-title">Ready to try it?</p>
          <CtaLink cta={tutorial.cta} />
        </div>

        {tutorial.relatedTools.length > 0 && (
          <section className="tutorial-related" aria-labelledby="tutorial-related-tools">
            <h2 id="tutorial-related-tools">Related tools</h2>
            <ul className="tutorial-related-list">
              {tutorial.relatedTools.map((toolSlug) => (
                <li key={toolSlug}>
                  <Link to="/$slug" params={{ slug: toolSlug }} className="tutorial-related-link">
                    {toolSlug
                      .split("-")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                    <ChevronRight className="size-4" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {tutorial.relatedTutorials.length > 0 && (
          <section className="tutorial-related" aria-labelledby="tutorial-related-guides">
            <h2 id="tutorial-related-guides">Related tutorials</h2>
            <ul className="tutorial-related-list">
              {tutorial.relatedTutorials.map((slug) => {
                const related = getTutorial(slug);
                if (!related) return null;
                return (
                  <li key={slug}>
                    <Link to="/tutorials/$slug" params={{ slug }} className="tutorial-related-link">
                      {related.h1}
                      <ChevronRight className="size-4" aria-hidden="true" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        <nav className="tutorial-pager" aria-label="More tutorials">
          {prev ? (
            <Link to="/tutorials/$slug" params={{ slug: prev.slug }} className="tutorial-pager-link">
              <ChevronLeft className="size-4" aria-hidden="true" />
              <span>
                <span className="tutorial-pager-label">Previous</span>
                {prev.h1}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to="/tutorials/$slug"
              params={{ slug: next.slug }}
              className="tutorial-pager-link tutorial-pager-next"
            >
              <span>
                <span className="tutorial-pager-label">Next</span>
                {next.h1}
              </span>
              <ChevronRight className="size-4" aria-hidden="true" />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </Container>
    </article>
  );
}

function TutorialNotFound() {
  return (
    <Container className="py-24 text-center">
      <p className="eyebrow">Tutorials</p>
      <h1 className="mt-4 text-4xl font-bold tracking-tight">Guide not found</h1>
      <p className="mx-auto mt-4 max-w-md text-muted-foreground">
        This tutorial may have moved. Browse the full list instead.
      </p>
      <Link to="/tutorials" className={buttonClass("primary", "md", "mt-8")}>
        All tutorials
      </Link>
    </Container>
  );
}
