import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { Post } from "@/data/types";
import { siteContentQuery } from "@/lib/content";
import {
  articleCategory,
  articleDate,
  articleReadingTime,
  syndicatedArticlesQuery,
  type SyndicatedArticle,
} from "@/lib/articles";
import { tools } from "@/data/tools";
import { collapsibleFaqs, wrapTables } from "@/lib/article-html";
import { Container, Section, BulletList } from "@/components/site/primitives";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { SITE, REGISTER_URL } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  staticData: { sitemap: true },
  loader: async ({ params, context }) => {
    const content = await context.queryClient.ensureQueryData(siteContentQuery);
    const post = content.posts.find((p) => p.slug === params.slug);
    if (post) return { post, article: null };

    const articles = await context.queryClient.ensureQueryData(syndicatedArticlesQuery);
    const article = articles.find((a) => a.slug === params.slug && !a.is_hidden);
    if (!article) throw notFound();
    return { post: null, article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Not found" }, { name: "robots", content: "noindex" }] };
    }
    const metaTitle = loaderData.post
      ? loaderData.post.metaTitle
      : `${loaderData.article!.title} | ${SITE.name}`;
    const description = loaderData.post
      ? loaderData.post.description
      : (loaderData.article!.meta_description ?? SITE.tagline);
    const image = loaderData.article?.hero_image_url;
    return {
      meta: [
        { title: metaTitle },
        { name: "description", content: description },
        { property: "og:title", content: metaTitle },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image?.startsWith("https://")
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { post, article } = Route.useLoaderData();
  if (!post && article) return <SyndicatedArticleView article={article} />;
  return <StaticPostView post={post!} />;
}

function RecommendedReading({ article }: { article: SyndicatedArticle }) {
  const { data: articles } = useSuspenseQuery(syndicatedArticlesQuery);
  const category = articleCategory(article);

  const others = articles.filter((a) => !a.is_hidden && a.slug !== article.slug);
  const sameCategory = others.filter((a) => articleCategory(a) === category);
  const posts = [...sameCategory, ...others.filter((a) => !sameCategory.includes(a))].slice(0, 3);

  const relatedTools = tools
    .filter((tool) => tool.category === category)
    .slice(0, 3)
    .map((tool) => ({ slug: tool.slug, name: tool.name, summary: tool.summary }));

  if (posts.length === 0 && relatedTools.length === 0) return null;

  return (
    <Section tone="sand">
      <Container size="narrow">
        <h2 className="text-2xl sm:text-3xl">Recommended for you</h2>
        {posts.length > 0 ? (
          <ul className="mt-5 border-t border-border">
            {posts.map((r) => (
              <li key={r.slug} className="border-b border-border py-4">
                <Link
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="text-base font-semibold text-foreground transition-colors hover:text-accent"
                >
                  {r.title}
                </Link>
                {r.meta_description ? (
                  <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {r.meta_description}
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {relatedTools.length > 0 ? (
          <>
            <h3 className="mt-10 text-lg font-semibold">Tools to try next</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedTools.map((tool) => (
                <li key={tool.slug} className="rounded-xl bg-card p-4 ring-1 ring-border">
                  <Link
                    to="/$slug"
                    params={{ slug: tool.slug }}
                    className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {tool.name}
                  </Link>
                  <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
                    {tool.summary}
                  </p>
                </li>
              ))}
            </ul>
          </>
        ) : null}
        
      </Container>
    </Section>
  );
}

function SyndicatedArticleView({ article }: { article: SyndicatedArticle }) {
  const jsonLd = article.json_ld ?? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description ?? undefined,
    datePublished: article.published_at ?? article.synced_at,
    image: article.hero_image_url ?? undefined,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {article.faq_json_ld ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faq_json_ld) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: article.title, path: `/blog/${article.slug}` },
            ]),
          ),
        }}
      />

      <Section className="pb-6 pt-10 sm:pt-14">
        <Container size="narrow">
          <Breadcrumbs
            items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: "Guide" }]}
          />
          <p className="mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-accent">{articleCategory(article)}</span>
            <span aria-hidden="true">·</span>
            <span>{articleReadingTime(article)}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={articleDate(article)}>{articleDate(article)}</time>
          </p>
          <h1 className="mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">{article.title}</h1>
          {article.meta_description ? (
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {article.meta_description}
            </p>
          ) : null}
          {article.hero_image_url ? (
            <img
              src={article.hero_image_url}
              alt={article.title}
              loading="lazy"
              className="mt-8 w-full rounded-xl border border-border object-cover"
            />
          ) : null}
        </Container>
      </Section>

      <Section className="py-8">
        <Container size="narrow">
          <div
            className="prose-editorial syndicated-article"
            dangerouslySetInnerHTML={{
              __html: wrapTables(collapsibleFaqs(article.content_html ?? "")),
            }}
          />
        </Container>
      </Section>

      <RecommendedReading article={article} />

      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Try it on your own work</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline}
          </p>
          <div className="mt-8">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </article>
  );
}

function headingId(heading: string) {
  return (
    heading
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "section"
  );
}

function StaticPostView({ post }: { post: Post }) {
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const postBySlug = new Map(content.posts.map((p) => [p.slug, p]));
  const related = post.related
    .map((slug) => postBySlug.get(slug))
    .filter((p): p is Post => Boolean(p) && p!.slug !== post.slug)
    .slice(0, 3);

  const relatedTools = tools.filter((tool) => tool.category === post.category).slice(0, 3);

  const toc = [
    ...post.sections.map((section) => ({
      id: headingId(section.heading),
      label: section.heading,
    })),
    ...(post.faqs && post.faqs.length > 0
      ? [{ id: "frequently-asked-questions", label: "Frequently asked questions" }]
      : []),
    { id: "takeaways", label: "Takeaways" },
  ];



  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {post.faqs && post.faqs.length > 0 ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            }),
          }}
        />
      ) : null}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: "Home", path: "/" },
              { label: "Blog", path: "/blog" },
              { label: post.title, path: `/blog/${post.slug}` },
            ]),
          ),
        }}
      />

      <Section className="pb-6 pt-10 sm:pt-14">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: post.category },
            ]}
          />
          <p className="mt-8 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
            <span className="text-accent">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{post.date}</time>
          </p>
          <h1 className="mt-4 text-balance text-4xl leading-[1.08] sm:text-5xl">{post.title}</h1>
          <div className="prose-editorial mt-6">
            {post.intro.map((p) => (
              <p key={p.slice(0, 40)} className="text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          {toc.length > 2 ? (
            <nav aria-label="Table of contents" className="mt-8 border border-border p-5">
              <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Table of contents
              </h2>
              <ol className="mt-3 space-y-1.5 text-sm">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="text-foreground underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      <span className="mr-2 text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}
        </Container>

      </Section>

      <Section className="py-8">
        <Container size="narrow">
          {post.sections.map((section) => (
            <section
              key={section.heading}
              id={headingId(section.heading)}
              className="mt-10 scroll-mt-24 first:mt-0"
            >
              <h2 className="text-balance text-2xl sm:text-3xl">{section.heading}</h2>
              <div className="prose-editorial mt-4">
                {section.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
              {section.bullets ? <BulletList items={section.bullets} className="mt-4" /> : null}
              {section.table ? (
                <div className="mt-6 overflow-x-auto border border-border">
                  <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
                    {section.table.caption ? (
                      <caption className="border-b border-border bg-muted/40 px-4 py-2.5 text-left text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        {section.table.caption}
                      </caption>
                    ) : null}
                    <thead>
                      <tr className="border-b border-border bg-muted/20">
                        {section.table.head.map((cell) => (
                          <th key={cell} scope="col" className="px-4 py-3 font-semibold">
                            {cell}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row) => (
                        <tr key={row.join("|")} className="border-b border-border last:border-b-0">
                          {row.map((cell, index) => (
                            <td
                              key={`${cell}-${index}`}
                              className="px-4 py-3 align-top text-muted-foreground"
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {section.links ? (
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {section.links.map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="font-semibold text-accent underline underline-offset-4"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </Container>
      </Section>

      {post.faqs && post.faqs.length > 0 ? (
        <Section className="py-8">
          <Container size="narrow">
            <h2 id="frequently-asked-questions" className="scroll-mt-24 text-2xl sm:text-3xl">
              Frequently asked questions
            </h2>
            <div className="prose-editorial mt-6">
              <div className="faq-list">
                {post.faqs.map((faq) => (
                  <details key={faq.q} className="faq-item">
                    <summary>{faq.q}</summary>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone="sand">
        <Container size="narrow">
          <h2 id="takeaways" className="scroll-mt-24 text-2xl sm:text-3xl">
            Takeaways
          </h2>
          <BulletList items={post.takeaways} className="mt-5" />
        </Container>
      </Section>

      {related.length > 0 || relatedTools.length > 0 ? (
        <Section>
          <Container size="narrow">
            <h2 className="text-2xl sm:text-3xl">Recommended for you</h2>
            {related.length > 0 ? (
              <ul className="mt-5 border-t border-border">
                {related.map((r) => (
                  <li key={r.slug} className="border-b border-border py-4">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: r.slug }}
                      className="text-base font-semibold text-foreground transition-colors hover:text-accent"
                    >
                      {r.title}
                    </Link>
                    <p className="mt-1.5 text-pretty text-sm leading-relaxed text-muted-foreground">
                      {r.excerpt}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            {relatedTools.length > 0 ? (
              <>
                <h3 className="mt-10 text-lg font-semibold">Tools to try next</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-3">
                  {relatedTools.map((tool) => (
                    <li key={tool.slug} className="border border-border bg-card p-4">
                      <Link
                        to="/$slug"
                        params={{ slug: tool.slug }}
                        className="text-sm font-semibold text-foreground transition-colors hover:text-accent"
                      >
                        {tool.name}
                      </Link>
                      <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
                        {tool.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </Container>
        </Section>
      ) : null}


      <Section tone="ink" className="py-16">
        <Container className="text-center">
          <h2 className="text-balance text-3xl sm:text-4xl">Try it on your own work</h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed opacity-80">
            {SITE.tagline}
          </p>
          <div className="mt-8">
            <ExternalButton href={REGISTER_URL} variant="onInk" size="lg">
              Start creating free
            </ExternalButton>
          </div>
        </Container>
      </Section>
    </article>
  );
}
