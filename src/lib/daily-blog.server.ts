// Server-only: writes one SEO blog post per day about an AmmarAI tool using
// OpenAI directly (your own OPENAI_API_KEY), then stores it alongside the
// synced articles. Self-hosted: no Lovable AI Gateway dependency.
import sanitizeHtml from "sanitize-html";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { writerFromClient, type ArticleWriter } from "@/lib/cron-db.server";
import { tools } from "@/data/tools";
import { SITE } from "@/lib/site";
import { getToolKeywords } from "@/data/tool-keywords";
import {
  BANNED_PHRASES,
  BLOG_TOPICS,
  TYPE_ROTATION,
  bucketOf,
  type BlogTopic,
} from "@/lib/blog-topics";

const OPENAI_URL = "https://api.openai.com/v1/chat/completions";
const DEFAULT_MODEL = "gpt-5.6-sol";

export interface DailyBlogResult {
  slug: string;
  title: string;
  toolSlug: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

type Assignment =
  | { kind: "topic"; topic: BlogTopic }
  | { kind: "tool"; tool: (typeof tools)[number] };

/** External ids of every article the daily writer has already produced. */
async function publishedIds(supabase: SupabaseClient<Database>): Promise<string[]> {
  const { data } = await supabase
    .from("syndicated_articles")
    .select("external_id, published_at")
    .like("external_id", "daily:%")
    .order("published_at", { ascending: false });
  return ((data ?? []) as { external_id: string | null }[])
    .map((row) => row.external_id ?? "")
    .filter(Boolean);
}

/** Pick the tool that has gone the longest without a generated post. */
function pickTool(published: string[]) {
  const used = published
    .filter((id) => !id.startsWith("daily:topic:"))
    .map((id) => id.replace(/^daily:/, ""));
  const usedSet = new Set(used);

  const fresh = tools.filter((tool) => !usedSet.has(tool.slug));
  if (fresh.length > 0) {
    return fresh[Math.floor(Math.random() * fresh.length)]!;
  }
  const oldestFirst = [...used].reverse();
  for (const slug of oldestFirst) {
    const tool = tools.find((t) => t.slug === slug);
    if (tool) return tool;
  }
  return tools[0]!;
}

/**
 * Decide what to write next: the roadmap queue drives commercial, comparison
 * and use-case slots, while informational slots stay tool-led. The rotation
 * holds the 30/30/25/15 content mix automatically.
 */
async function pickAssignment(supabase: SupabaseClient<Database>): Promise<Assignment> {
  const published = await publishedIds(supabase);
  const doneTopics = new Set(
    published.filter((id) => id.startsWith("daily:topic:")).map((id) => id.slice("daily:topic:".length)),
  );
  const remaining = BLOG_TOPICS.filter((topic) => !doneTopics.has(topic.id));
  const wanted = TYPE_ROTATION[published.length % TYPE_ROTATION.length]!;

  if (wanted !== "informational") {
    const match = remaining.find((topic) => bucketOf(topic) === wanted);
    if (match) return { kind: "topic", topic: match };
    const any = remaining.find((topic) => bucketOf(topic) !== "informational");
    if (any) return { kind: "topic", topic: any };
  }
  return { kind: "tool", tool: pickTool(published) };
}

interface GeneratedPost {
  title: string;
  metaDescription: string;
  intro: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
    table?: { caption?: string | null; head: string[]; rows: string[][] } | null;
  }[];
  faqs: { question: string; answer: string }[];
}

const GENERIC_FAILURE = "Something went wrong and the content wasn't generated.";
const ALLOWED_MODEL_PREFIX = "gpt-5.6";

async function generate(toolName: string, prompt: string): Promise<GeneratedPost> {
  const key = process.env["OPENAI_API_KEY"];
  if (!key) throw new Error("Missing OPENAI_API_KEY");

  const model = process.env["OPENAI_MODEL"]?.trim() || DEFAULT_MODEL;
  if (!model.startsWith(ALLOWED_MODEL_PREFIX)) {
    console.error(
      `[daily-blog] refusing to generate: OPENAI_MODEL="${model}" is not a ${ALLOWED_MODEL_PREFIX} model`,
    );
    throw new Error(GENERIC_FAILURE);
  }

  const response = await fetch(OPENAI_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model,

      messages: [
        {
          role: "system",
          content:
            "You are a senior SEO content writer for AmmarAI, an all-in-one AI creation platform. " +
            "Write practical, specific, non-hyped articles for marketers and creators. " +
            "Reply with JSON only, no markdown fences.",
        },
        { role: "user", content: prompt },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "blog_post",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["title", "metaDescription", "intro", "sections", "faqs"],
            properties: {
              title: { type: "string" },
              metaDescription: { type: "string" },
              intro: { type: "string" },
              sections: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["heading", "paragraphs", "bullets", "table"],
                  properties: {
                    heading: { type: "string" },
                    paragraphs: { type: "array", items: { type: "string" } },
                    bullets: { type: "array", items: { type: "string" } },
                    table: {
                      type: ["object", "null"],
                      additionalProperties: false,
                      required: ["caption", "head", "rows"],
                      properties: {
                        caption: { type: ["string", "null"] },
                        head: { type: "array", items: { type: "string" } },
                        rows: { type: "array", items: { type: "array", items: { type: "string" } } },
                      },
                    },
                  },
                },
              },
              faqs: {
                type: "array",
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["question", "answer"],
                  properties: { question: { type: "string" }, answer: { type: "string" } },
                },
              },
            },
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error(
      `[daily-blog] OpenAI request failed (${response.status}) for ${model} writing about ${toolName}: ${detail.slice(0, 500)}`,
    );
    throw new Error(GENERIC_FAILURE);
  }

  const payload = (await response.json()) as {
    model?: string;
    choices?: { message?: { content?: string } }[];
  };

  const served = payload.model ?? "";
  if (!served.startsWith(ALLOWED_MODEL_PREFIX)) {
    console.error(`[daily-blog] OpenAI served "${served}" instead of a ${ALLOWED_MODEL_PREFIX} model`);
    throw new Error(GENERIC_FAILURE);
  }

  const content = payload.choices?.[0]?.message?.content ?? "";
  const cleaned = content.replace(/^```(?:json)?|```$/g, "").trim();
  try {
    return JSON.parse(cleaned) as GeneratedPost;
  } catch {
    console.error(`[daily-blog] could not parse ${served} output for ${toolName}`);
    throw new Error(GENERIC_FAILURE);
  }
}


function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** Human label for an AmmarAI URL, e.g. "AI Event Planner" instead of the raw address. */
export function linkLabelFor(url: string): string | null {
  const site = SITE.url.replace(/\/$/, "");
  if (!url.startsWith(site)) return null;
  const path = url.slice(site.length).replace(/^\/|\/$/g, "").split(/[?#]/)[0] ?? "";
  if (!path) return SITE.name;

  const known = tools.find((tool) => tool.slug === path);
  if (known) return known.name;

  const last = path.split("/").pop() ?? path;
  return last
    .split("-")
    .map((word) => (word.length <= 2 ? word.toUpperCase() : word[0]!.toUpperCase() + word.slice(1)))
    .join(" ");
}

/**
 * Replaces links whose visible text is the raw URL with a readable label,
 * so articles read "AI Event Planner" instead of "https://ammarai.com/event-planner".
 */
export function readableLinks(html: string): string {
  return html.replace(
    /<a href="(https?:\/\/[^"]+)"([^>]*)>\s*(https?:\/\/[^<]+?)\s*<\/a>/gi,
    (match, href: string, attrs: string, text: string) => {
      if (href.replace(/\/$/, "") !== text.replace(/\/$/, "")) return match;
      const label = linkLabelFor(href);
      return label ? `<a href="${href}"${attrs}>${escapeHtml(label)}</a>` : match;
    },
  );
}

/**
 * The model sometimes returns Markdown emphasis inside plain-text fields.
 * Convert it to real HTML so readers never see stray ** or __ markers.
 */
function inlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*\*([^*]+)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s.,;:!?)]|$)/g, "$1<em>$2</em>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*/g, "")
    .replace(/^#{1,6}\s+/gm, "")
    // Turn any remaining bare URL into a real link (skips ones already inside an <a href="...">).
    .replace(
      /(^|[\s(])(https?:\/\/[^\s<>"')]*[^\s<>"').,;:!?])/g,
      (_m, lead: string, url: string) =>
        `${lead}<a href="${url}">${escapeHtml(linkLabelFor(url) ?? url)}</a>`,
    );
}

/** Category-matched illustration bundled with the site. */
const CATEGORY_IMAGES: Record<string, string> = {
  "AI Writing": "/media/blog-cat-writing.jpg",
  "AI Documents": "/media/blog-cat-writing.jpg",
  "AI Email": "/media/blog-cat-writing.jpg",
  "AI Chat": "/media/blog-cat-writing.jpg",
  "AI Code": "/media/blog-cat-writing.jpg",
  "AI Video": "/media/blog-cat-video.jpg",
  "AI Vision": "/media/blog-cat-video.jpg",
  "AI Voice": "/media/blog-cat-voice.jpg",
  "AI Audio": "/media/blog-cat-voice.jpg",
  "AI Transcription": "/media/blog-cat-voice.jpg",
  "AI SEO": "/media/blog-cat-seo.jpg",
  "AI Marketing": "/media/blog-cat-marketing.jpg",
  "AI Social Media": "/media/blog-cat-marketing.jpg",
  "AI E-commerce": "/media/blog-cat-marketing.jpg",
  "AI Business": "/media/blog-cat-business.jpg",
  "AI Productivity": "/media/blog-cat-business.jpg",
  "AI Image": "/media/blog-cat-image.jpg",
};

function imageFor(category: string): string {
  return CATEGORY_IMAGES[category] ?? "/media/blog-cat-business.jpg";
}

/** A stock picture that is guaranteed not to repeat the hero image. */
function altImageFor(category: string, avoid: string): string {
  const pool = [
    ...new Set([imageFor(category), ...Object.values(CATEGORY_IMAGES)]),
  ].filter((src) => src !== avoid);
  return pool[0] ?? "/media/blog-cat-writing.jpg";
}

function figure(src: string, alt: string, caption: string): string {
  return (
    `<figure><img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" width="1280" height="720" />` +
    `<figcaption>${escapeHtml(caption)}</figcaption></figure>`
  );
}

const IMAGE_URL = "https://api.openai.com/v1/images/generations";

/**
 * Creates an illustration that matches this specific article and stores it,
 * so every post gets its own picture instead of the shared category image.
 */
async function createArticleImage(
  writer: ArticleWriter,
  slug: string,
  index: number,
  scene: string,
): Promise<string | null> {
  const key = process.env["OPENAI_API_KEY"];
  if (!key) return null;

  try {
    const response = await fetch(IMAGE_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-image-1",
        prompt:
          `Editorial illustration for a blog article. ${scene}. ` +
          `Light high-key studio photography style, warm cream and soft beige palette, ` +
          `clean minimal composition, subtle abstract connective line accents, no text, no logos, no watermarks.`,
        size: "1536x1024",
        quality: "medium",
        n: 1,
      }),
    });
    if (!response.ok) {
      console.error(`[daily-blog] image generation failed (${response.status})`);
      return null;
    }
    const payload = (await response.json()) as { data?: { b64_json?: string }[] };
    const b64 = payload.data?.[0]?.b64_json;
    if (!b64) return null;

    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    const name = `${slug}-${index}-${Date.now()}.png`;
    return writer.storeImage(name, "image/png", bytes);
  } catch (error) {
    console.error("[daily-blog] image generation error", error);
    return null;
  }
}

function headingId(text: string, used: Set<string>): string {
  const base = slugify(text.replace(/<[^>]+>/g, "")) || "section";
  let id = base;
  let n = 2;
  while (used.has(id)) id = `${base}-${n++}`;
  used.add(id);
  return id;
}

function buildHtml(
  post: GeneratedPost,
  toolName: string,
  image: string,
  secondImage?: string | null,
): string {
  const used = new Set<string>();
  const toc: { id: string; label: string }[] = [];
  const body: string[] = [];

  post.sections.forEach((section, index) => {
    const heading = inlineMarkdown(section.heading);
    const id = headingId(section.heading, used);
    toc.push({ id, label: heading });
    body.push(`<h2 id="${id}">${heading}</h2>`);
    for (const paragraph of section.paragraphs) body.push(`<p>${inlineMarkdown(paragraph)}</p>`);
    if (section.bullets?.length) {
      body.push(
        `<ul>${section.bullets.map((b) => `<li>${inlineMarkdown(b)}</li>`).join("")}</ul>`,
      );
    }
    const table = section.table;
    if (table?.head?.length && table.rows?.length) {
      const head = `<thead><tr>${table.head.map((c) => `<th>${inlineMarkdown(c)}</th>`).join("")}</tr></thead>`;
      const rows = table.rows
        .map((row) => `<tr>${row.map((c) => `<td>${inlineMarkdown(c)}</td>`).join("")}</tr>`)
        .join("");
      body.push(
        `<table>${table.caption ? `<caption>${inlineMarkdown(table.caption)}</caption>` : ""}${head}<tbody>${rows}</tbody></table>`,
      );
    }
    if (index === 1) {
      body.push(figure(image, `${toolName} in AmmarAI`, `${toolName} inside AmmarAI.`));
    }
    if (index === 3 && secondImage) {
      body.push(
        figure(secondImage, `${post.title} illustration`, `Putting ${toolName} to work.`),
      );
    }
  });

  if (post.faqs.length) {
    const id = headingId("frequently-asked-questions", used);
    toc.push({ id, label: "Frequently asked questions" });
    body.push(`<h2 id="${id}">Frequently asked questions</h2>`);
    for (const faq of post.faqs) {
      body.push(
        `<h3>${inlineMarkdown(faq.question)}</h3><p>${inlineMarkdown(faq.answer)}</p>`,
      );
    }
  }

  const parts: string[] = [`<p>${inlineMarkdown(post.intro)}</p>`];
  if (toc.length > 2) {
    parts.push(
      `<nav class="article-toc" aria-labelledby="table-of-contents"><h2 id="table-of-contents">Table of Contents</h2><ol>` +
        toc.map((item) => `<li><a href="#${item.id}">${item.label}</a></li>`).join("") +
        `</ol></nav>`,
    );
  }
  parts.push(...body);

  const html = sanitizeHtml(parts.join("\n"), {
    allowedTags: [
      ...sanitizeHtml.defaults.allowedTags,
      "h2",
      "h3",
      "img",
      "figure",
      "figcaption",
      "nav",
    ],
    allowedAttributes: {
      a: ["href", "rel", "target"],
      img: ["src", "alt", "loading", "width", "height"],
      h2: ["id"],
      h3: ["id"],
      nav: ["class"],
    },
  });
  return readableLinks(html);
}


/** House rules every generated article follows (Part 7 of the content brief). */
function houseRules(links: string[], siblings: string[]): string[] {
  return [
    ``,
    `STRUCTURE (required):`,
    `- The first 60 words must answer the question in the title directly, with no throat-clearing.`,
    `- 5-7 H2 sections, short paragraphs, clear hierarchy.`,
    `- Whenever two or more options, tools or approaches are discussed, put them in the section's "table" field (head + rows). One table minimum for comparison, alternatives and best-of articles.`,
    `- Give a "best for" line and honest pros and cons for every option you name.`,
    `- Finish with 5 FAQs, 2-4 sentence answers each.`,
    ``,
    `INTERNAL LINKS (required, Markdown links with varied natural anchor text — never the same anchor twice, never a bare URL as visible text):`,
    ...links.map((path) => `- ${SITE.url}${path}`),
    ...(siblings.length
      ? [`- one of these existing articles:`, ...siblings.map((path) => `  - ${SITE.url}${path}`)]
      : []),
    ``,
    `HONESTY:`,
    `- No invented statistics, customer results, review quotes or guarantees.`,
    `- Competitor pricing only if you state it as a list price with the date it was checked; otherwise say pricing changes and link the vendor's page.`,
    `- Never claim AmmarAI is the number one or best tool outright; recommend it where it genuinely fits and say where a competitor is stronger.`,
    ``,
    `STYLE: direct and specific, written by someone who uses these tools. No emojis. Word count is not a goal.`,
    `NEVER open with or use these phrases: ${BANNED_PHRASES.join("; ")}.`,
  ];
}

function siblingLinks(cluster: string, exclude: string[]): string[] {
  const byCluster: Record<string, string[]> = {
    writing: ["/blog/best-ai-writing-tools", "/blog/how-to-write-a-blog-post-with-ai"],
    video: ["/blog/how-to-create-ai-videos"],
    image: ["/blog/how-to-use-ai-for-content-creation"],
    marketing: ["/blog/ai-tools-for-marketers"],
    business: ["/blog/ai-tools-for-small-businesses"],
    content: ["/blog/how-to-use-ai-for-content-creation"],
    audio: ["/blog/how-to-generate-ai-voiceovers"],
    seo: ["/blog/how-to-use-ai-for-seo"],
    automation: ["/blog/ai-productivity-workflows"],
    platform: ["/blog/best-ai-writing-tools"],
  };
  return (byCluster[cluster] ?? ["/blog/how-to-use-ai-for-content-creation"]).filter(
    (path) => !exclude.includes(path),
  );
}

export async function writeDailyPost(
  supabase: SupabaseClient<Database>,
  articleWriter?: ArticleWriter,
): Promise<DailyBlogResult> {
  const writer = articleWriter ?? writerFromClient(supabase);
  const assignment = await pickAssignment(supabase);

  let subjectName: string;
  let subjectSummary: string;
  let externalId: string;
  let category: string;
  let contentType: string;
  let fallbackSlug: string;
  let blogPrompt: string;

  if (assignment.kind === "topic") {
    const topic = assignment.topic;
    subjectName = topic.workingTitle;
    subjectSummary = topic.brief;
    externalId = `daily:topic:${topic.id}`;
    category = topic.category;
    contentType = topic.contentType;
    fallbackSlug = topic.id;

    const typeBrief: Record<string, string> = {
      "best-of":
        `This is a commercial category page. Open with the problem the reader is trying to solve, state your evaluation criteria, then compare the tools objectively with a table, pricing, and the ideal user for each. Close with an "Our pick" split by user type and a natural mention of where AmmarAI fits. It must read like a buyer's guide, not an advertisement.`,
      alternatives:
        `This is an alternatives page for people already using the named product. Put the comparison table near the top, cover why people look for alternatives, then each alternative with pros, cons and who it suits. A section on where the original product is still the stronger choice is mandatory.`,
      comparison:
        `This is a head-to-head comparison. Comparison table near the top, then feature-by-feature analysis, pricing, and a verdict split by user type. Name the cases where the competitor wins.`,
      "use-case":
        `This is a genuine step-by-step tutorial. Numbered steps the reader can follow today, what to check at each stage, and what the tools still get wrong.`,
      tutorial: `This is a genuine step-by-step tutorial with numbered, followable steps.`,
      guide: `This is a practical informational guide built around a real workflow.`,
    };

    blogPrompt = [
      `Write an article for the AmmarAI blog titled around "${topic.workingTitle}".`,
      `Brief: ${topic.brief}`,
      ``,
      `PRIMARY KEYWORD: "${topic.primaryKeyword}"${topic.volume ? ` (${topic.volume.toLocaleString()} searches/month)` : ""}.`,
      `The title MUST include the primary keyword and be under 60 characters. The metaDescription MUST include it and be under 155 characters.`,
      typeBrief[topic.contentType] ?? "",
      `AmmarAI is an all-in-one AI workspace with 151 tools on one subscription: writing, video, image, voice, agents, SEO and marketing.`,
      ...houseRules(topic.links, siblingLinks(topic.cluster, topic.links)),
    ].join("\n");
  } else {
    const tool = assignment.tool;
    subjectName = tool.name;
    subjectSummary = tool.summary;
    externalId = `daily:${tool.slug}`;
    category = tool.category;
    contentType = "guide";
    fallbackSlug = `${tool.slug}-guide`;

    const kw = getToolKeywords(tool.slug);
    const base = [
      `Write a practical informational guide for the AmmarAI blog about "${tool.name}".`,
      `Tool summary: ${tool.summary}`,
      `Focus on the real workflow — how the job gets done, where it breaks, and how to check the output. Not a feature list.`,
    ];

    if (kw) {
      const relatedList = kw.relatedKeywords
        .slice(0, 6)
        .map((r) => `${r.keyword} (${r.volume.toLocaleString()}/mo)`)
        .join(", ");
      const questionList = kw.questions.slice(0, 5).map((q) => `- ${q}`).join("\n");
      base.push(
        ``,
        `PRIMARY KEYWORD: "${kw.primaryKeyword}" (${kw.searchVolume.toLocaleString()} searches/month, difficulty ${kw.difficulty}/100).`,
        `The title MUST include the primary keyword and be under 60 characters. The metaDescription MUST include it and be under 155 characters.`,
        `Use the primary keyword naturally in the intro, at least one H2 heading and the closing section — do not stuff.`,
        `RELATED KEYWORDS to work in naturally: ${relatedList}.`,
        ``,
        `Use these exact questions as the FAQ questions:`,
        questionList,
      );
    } else {
      base.push(
        `Primary keyword: ${tool.name.toLowerCase()}. Title under 60 characters, metaDescription under 155.`,
      );
    }

    const clusterByCategory: Record<string, string> = {
      "AI Video": "video",
      "AI Image": "image",
      "AI Voice": "audio",
      "AI Audio": "audio",
      "AI SEO": "seo",
      "AI Marketing": "marketing",
      "AI Writing": "writing",
    };
    blogPrompt = [
      ...base,
      ...houseRules(
        [`/${tool.slug}`, "/ai-tools"],
        siblingLinks(clusterByCategory[tool.category] ?? "content", []),
      ),
    ].join("\n");
  }

  const post = await generate(subjectName, blogPrompt);

  const baseSlug = slugify(post.title) || fallbackSlug;
  let slug = baseSlug;
  for (let attempt = 0; attempt < 5; attempt += 1) {
    const { data: existing } = await supabase
      .from("syndicated_articles")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${attempt + 2}`;
  }

  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      }
    : null;

  const now = new Date().toISOString();
  const fallback = imageFor(category);
  const [hero, inline] = await Promise.all([
    createArticleImage(
      writer,
      slug,
      1,
      `Wide cover image for an article titled "${post.title}": ${subjectSummary}. ` +
        `Show the overall theme as a calm establishing shot from a slight distance.`,
    ),
    createArticleImage(
      writer,
      slug,
      2,
      `A visibly different, closer supporting scene for the same article — do not repeat the cover. ` +
        `Illustrate this specific section: "${post.sections[3]?.heading ?? post.sections[1]?.heading ?? subjectSummary}" ` +
        `for ${subjectName} (${category}), using a different camera angle, objects and composition than a cover shot.`,
    ),
  ]);
  // The two pictures must never be identical, even when generation is unavailable.
  const image = hero ?? fallback;
  const bodyImage = inline ?? altImageFor(category, image);
  const row = {
    slug,
    external_id: externalId,
    title: post.title,
    content_html: buildHtml(post, subjectName, bodyImage),
    content_markdown: null,
    meta_description: post.metaDescription,
    hero_image_url: image,
    category,
    content_type: contentType,


    json_ld: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.metaDescription,
      datePublished: now,
      author: { "@type": "Organization", name: SITE.name },
      publisher: { "@type": "Organization", name: SITE.name },
    },
    faq_json_ld: faqJsonLd,
    language_code: "en",
    published_at: now,
    synced_at: now,
    is_hidden: false,
  };

  const { error } = await writer.upsertArticle(row);
  if (error) throw new Error(error);

  return {
    slug,
    title: post.title,
    toolSlug: assignment.kind === "tool" ? assignment.tool.slug : assignment.topic.id,
  };
}
