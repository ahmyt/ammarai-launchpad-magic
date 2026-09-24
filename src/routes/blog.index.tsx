import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { fullSiteContentQuery as siteContentQuery } from "@/lib/content-full";
import {
  CONTENT_TYPES,
  articleCategory,
  articleContentType,
  articleDate,
  articleReadingTime,
  contentTypeLabel,
  inferContentType,
  syndicatedArticlesQuery,
} from "@/lib/articles";
import { Container, Section } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";

const title = "Blog: Practical AI Guides and Workflows | AmmarAI";
const description =
  "Long-form AI guides on writing, video, voice, SEO and productivity, written for people shipping real work. New articles every week from the AmmarAI team.";

export const Route = createFileRoute("/blog/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: title,
          description,
          url: "https://ammarai.com/blog",
          isPartOf: { "@type": "WebSite", name: "AmmarAI", url: "https://ammarai.com" },
        }),
      },
    ],
  }),
  loader: async ({ context }) => {
    await Promise.all([
      context.queryClient.prefetchQuery(siteContentQuery),
      context.queryClient.ensureQueryData(syndicatedArticlesQuery),
    ]);
  },
  component: BlogIndex,
});

function BlogIndex() {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const { data: articles } = useSuspenseQuery(syndicatedArticlesQuery);
  const staticSlugs = new Set(content.posts.map((p) => p.slug));
  const [format, setFormat] = useState<string>("all");

  const entries = [
    ...articles
      .filter((a) => !a.is_hidden && !staticSlugs.has(a.slug))
      .map((a) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.meta_description ?? "",
        category: articleCategory(a),
        contentType: articleContentType(a) as string,
        readingTime: articleReadingTime(a),
        date: articleDate(a),
      })),
    ...content.posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      category: p.category,
      contentType: (p as { contentType?: string }).contentType ?? inferContentType(p.slug, p.title),
      readingTime: p.readingTime,
      date: p.date,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const counts = new Map<string, number>();
  for (const entry of entries) counts.set(entry.contentType, (counts.get(entry.contentType) ?? 0) + 1);

  const filters = [
    { id: "all", label: "All", count: entries.length },
    ...CONTENT_TYPES.filter((t) => (counts.get(t.id) ?? 0) > 0).map((t) => ({
      id: t.id as string,
      label: t.label,
      count: counts.get(t.id) ?? 0,
    })),
  ];

  const visible = format === "all" ? entries : entries.filter((e) => e.contentType === format);

  return (
    <div>
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Writing</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Guides from people who use these tools every day
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              No hype, no ten-times-your-output promises. Just how the workflows are actually run
              and where they break.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="narrow">
          <nav aria-label="Filter articles by format" className="flex flex-wrap gap-2 pb-7">
            {filters.map((filter) => {
              const active = filter.id === format;
              return (
                <button
                  key={filter.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFormat(filter.id)}
                  className={`border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {filter.label}
                  <span className="ml-1.5 opacity-60">{filter.count}</span>
                </button>
              );
            })}
          </nav>
          <ul className="border-t border-border">
            {visible.map((post) => (
              <li key={post.slug} className="border-b border-border py-7">
                <p className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="text-accent">{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{contentTypeLabel(post.contentType)}</span>

                  {post.readingTime ? (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{post.readingTime}</span>
                    </>
                  ) : null}
                </p>
                <h2 className="mt-3 text-balance text-2xl leading-snug">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="text-foreground transition-colors hover:text-accent"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </div>
  );
}
