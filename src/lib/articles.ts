import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface SyndicatedArticle {
  id: string;
  slug: string;
  title: string;
  external_id: string | null;
  content_html: string | null;
  content_markdown: string | null;
  meta_description: string | null;
  hero_image_url: string | null;
  json_ld: unknown;
  faq_json_ld: unknown;
  language_code: string;
  published_at: string | null;
  synced_at: string;
  is_hidden: boolean;
  category: string | null;
  content_type: string | null;
}

const COLUMNS =
  "id, slug, title, external_id, content_html, content_markdown, meta_description, hero_image_url, json_ld, faq_json_ld, language_code, published_at, synced_at, is_hidden, category, content_type";

export async function fetchSyndicatedArticles(): Promise<SyndicatedArticle[]> {
  const { data, error } = await supabase
    .from("syndicated_articles")
    .select(COLUMNS)
    .eq("language_code", "en")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("Failed to load syndicated articles", error.message);
    return [];
  }
  return (data ?? []) as unknown as SyndicatedArticle[];
}

export const syndicatedArticlesQuery = queryOptions({
  queryKey: ["syndicated-articles"],
  queryFn: fetchSyndicatedArticles,
  staleTime: 60_000,
});

/** Admin view: includes hidden articles and every language. */
export const allSyndicatedArticlesQuery = queryOptions({
  queryKey: ["syndicated-articles", "all"],
  queryFn: async (): Promise<SyndicatedArticle[]> => {
    const { data, error } = await supabase
      .from("syndicated_articles")
      .select(COLUMNS)
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as SyndicatedArticle[];
  },
  staleTime: 0,
});

export function articleDate(article: SyndicatedArticle): string {
  const value = article.published_at ?? article.synced_at;
  return value.slice(0, 10);
}

export function articleExcerpt(article: SyndicatedArticle): string {
  return article.meta_description ?? "";
}

/** Source of the article: BabyLoveGrowth sync or the daily AI blog writer. */
export function articleSource(article: SyndicatedArticle): "BabyLoveGrowth" | "Daily Writer" {
  return article.external_id?.startsWith("daily:") ? "Daily Writer" : "BabyLoveGrowth";
}

/** Topical categories used across the blog. */
export const BLOG_CATEGORIES = [
  "AI Tools",
  "AI Writing",
  "AI Video",
  "AI Image",
  "AI Voice",
  "AI Audio",
  "AI Marketing",
  "AI SEO",
  "AI Automation",
  "AI Agents",
  "AI Productivity",
  "AI for Business",
  "AI for Agencies",
  "AI for Content Creators",
  "AI Comparisons",
  "AI Alternatives",
  "AI Tutorials",
  "AI Use Cases",
  "AI Social Media",
  "AI E-commerce",
  "AI Guides",
] as const;

/** Article formats, used for the blog filter row. */
export const CONTENT_TYPES = [
  { id: "guide", label: "Guides" },
  { id: "best-of", label: "Best AI Tools" },
  { id: "comparison", label: "Comparisons" },
  { id: "alternatives", label: "Alternatives" },
  { id: "tutorial", label: "Tutorials" },
  { id: "use-case", label: "Use Cases" },
] as const;

export type ContentTypeId = (typeof CONTENT_TYPES)[number]["id"];

export function contentTypeLabel(id: string): string {
  return CONTENT_TYPES.find((t) => t.id === id)?.label ?? "Guides";
}

/** Derive a format from the slug/title when nothing is stored yet. */
export function inferContentType(slug: string, title = ""): ContentTypeId {
  const text = `${slug} ${title}`.toLowerCase();
  if (/\balternatives?\b/.test(text)) return "alternatives";
  if (/\bvs\b|\bcompared?\b|comparison/.test(text)) return "comparison";
  if (/^best-|\bbest \b|top-\d/.test(text)) return "best-of";
  if (/^how-to-|how to /.test(text)) return "tutorial";
  return "guide";
}

export function articleContentType(article: SyndicatedArticle): ContentTypeId {
  const stored = article.content_type;
  if (stored && CONTENT_TYPES.some((t) => t.id === stored)) return stored as ContentTypeId;
  return inferContentType(article.slug, article.title);
}

/**
 * Stored category when present, otherwise derived from the article's title,
 * description and body. Falls back to "AI Guides" when nothing matches.
 */
const CATEGORY_KEYWORDS: [string, string[]][] = [
  ["AI SEO", ["seo", "search engine", "ranking", "rank on google", "serp", "backlink", "keyword research", "organic traffic", "meta description", "schema markup"]],
  ["AI Marketing", ["marketing", "campaign", "conversion", "advertising", "ads", "funnel", "branding", "copy that converts", "lead generation", "email campaign"]],
  ["AI Writing", ["writing", "copywriting", "blog post", "content writing", "storytelling", "essay", "article writing", "headline"]],
  ["AI Video", ["video", "animation", "lip-sync", "footage", "thumbnail"]],
  ["AI Voice", ["voice", "voiceover", "text to speech", "tts", "narration", "dubbing"]],
  ["AI Audio", ["audio", "podcast", "music", "sound", "transcription", "speech to text"]],
  ["AI Social Media", ["instagram", "tiktok", "social media", "linkedin", "twitter", "x post", "caption", "hashtag", "followers"]],
  ["AI Business", ["business", "startup", "entrepreneur", "sales", "revenue", "growth strategy", "productivity", "workflow"]],
  ["AI E-commerce", ["e-commerce", "ecommerce", "shopify", "product description", "online store", "checkout"]],
  ["AI Image", ["image generation", "image generator", "photo", "illustration", "art", "design"]],
];

export function articleCategory(article: SyndicatedArticle): string {
  if (article.category) return article.category;
  const title = (article.title ?? "").toLowerCase();
  const description = (article.meta_description ?? "").toLowerCase();
  const bodySource = article.content_markdown ?? article.content_html ?? "";
  const body = bodySource
    .replace(/<[^>]+>/g, " ")
    .toLowerCase()
    .slice(0, 3000);

  let best: string | null = null;
  let bestScore = 0;
  for (const [category, keywords] of CATEGORY_KEYWORDS) {
    let score = 0;
    for (const keyword of keywords) {
      if (title.includes(keyword)) score += 5;
      if (description.includes(keyword)) score += 3;
      if (body.includes(keyword)) score += 1;
    }
    if (score > bestScore) {
      bestScore = score;
      best = category;
    }
  }
  return best ?? "AI Guides";
}

/** Rough reading time based on the article body, e.g. "8 min read". */
export function articleReadingTime(article: SyndicatedArticle): string {
  const source = article.content_markdown ?? article.content_html ?? "";
  const text = source
    .replace(/<[^>]+>/g, " ")
    .replace(/[#>*_`~[\]()!-]/g, " ")
    .trim();
  const words = text ? text.split(/\s+/).length : 0;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}
