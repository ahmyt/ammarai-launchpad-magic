import type { Tool } from "./types";

export const seoAnalyzerTools: Tool[] = [
  {
    slug: "ai-seo-analyzer",
    name: "AI SEO Analyzer",
    category: "AI SEO",
    featured: true,
    popular: true,
    summary:
      "Find current keyword and search-question ideas while planning an article, then generate focused metadata for your site and blog posts.",
    title: "AI SEO Analyzer for Article Ideas and Metadata | AmmarAI",
    description:
      "Use AmmarAI SEO tools for recent-search keyword suggestions, search-question ideas, site metadata and blog-post SEO fields.",
    h1: "Plan search-led articles and create clearer SEO metadata",
    lede: "Use four focused SEO functions in the places where the work happens. Find keyword ideas and recent search questions inside Article Wizard, then generate metadata for your site and individual blog posts.",
    ctaLabel: "Try the SEO tools",
    what: [
      "The AI SEO Analyzer brings together four practical functions. Article Wizard Keyword Suggestions proposes SEO-focused phrases from recent Google searches while you plan an article. Article Wizard Search Questions surfaces recent questions during the outline step, helping you shape sections around what readers are asking.",
      "For publishing, Site Meta Optimization helps administrators generate a focused meta title, description and keywords for the website. Blog Post SEO Enhancement generates SEO fields for an individual post using its title and recent search results. These are planning and metadata tools, not a technical site crawler or ranking guarantee.",
    ],
    canDo: [
      "Generate SEO-focused keyword suggestions from recent searches inside Article Wizard",
      "Bring recent search questions into the Article Wizard outline step",
      "Use relevant questions to shape useful article headings and sections",
      "Generate a site meta title, description and keywords from general settings",
      "Generate SEO fields for an individual blog post from its title and recent searches",
      "Review and edit every suggestion before publishing it",
    ],
    how: [
      {
        title: "Choose the job",
        body: "Work in Article Wizard for keyword and question ideas, general settings for site metadata, or the blog editor for post-level SEO fields.",
      },
      {
        title: "Provide the page or article context",
        body: "Enter the article topic, review the site details, or open the blog post whose SEO fields you want to improve.",
      },
      {
        title: "Generate focused suggestions",
        body: "Request keywords, search questions, or metadata in the relevant workspace and compare the returned options with the page's real purpose.",
      },
      {
        title: "Review before applying",
        body: "Keep only accurate, relevant wording. Edit titles, descriptions, keywords and headings so they read naturally and match the content.",
      },
    ],
    examples: [
      {
        label: "Article keyword suggestions",
        input: "Article topic: how small retailers can use AI for seasonal marketing",
        output:
          "A focused set of keyword phrases based on recent searches appears inside Article Wizard. Select only the phrases that match the article's audience and purpose.",
      },
      {
        label: "Article search questions",
        input: "Outline topic: choosing an AI writing workflow for a small marketing team",
        output:
          "Recent questions people search for appear during the outline step. Keep the useful ones and turn them into direct, reader-focused sections.",
      },
      {
        label: "Site meta optimization",
        input: "Website: an AI workspace for writing, image, video, voice and automation",
        output:
          "A proposed site meta title, description and keyword set for an administrator to review, edit and apply in general settings.",
      },
      {
        label: "Blog post SEO enhancement",
        input: "Post title: A practical guide to creating product videos with AI",
        output:
          "Suggested SEO fields based on the post title and recent searches, ready for an administrator to check against the finished article before saving.",
      },
    ],
    capabilities: [
      {
        title: "Keywords where articles begin",
        body: "SEO-focused keyword suggestions appear inside Article Wizard, so search intent can inform the brief before drafting starts.",
      },
      {
        title: "Questions where outlines take shape",
        body: "Recent search questions appear during outlining, making it easier to build sections around genuine reader needs.",
      },
      {
        title: "Site-level metadata assistance",
        body: "Administrators can generate a site meta title, description and keywords, then refine them before applying the changes.",
      },
      {
        title: "Post-level SEO fields",
        body: "Administrators can generate SEO fields for a blog post from its title and recent search context without leaving the editor.",
      },
    ],
    audiences: [
      {
        who: "Content writers",
        why: "Use keyword and question suggestions while the article brief and outline are still flexible.",
      },
      {
        who: "Editors",
        why: "Review whether suggested questions deserve full sections before the draft moves forward.",
      },
      {
        who: "Site administrators",
        why: "Create a starting point for site metadata and keep it aligned with the website's actual offer.",
      },
      {
        who: "Blog managers",
        why: "Generate post-level SEO fields from each article's title and current search context, then approve the final wording.",
      },
    ],
    useCases: [
      {
        title: "Search-led article planning",
        body: "Start with a topic, compare the suggested keyword phrases, and keep the ones that accurately match the article you intend to write.",
      },
      {
        title: "Question-based outlines",
        body: "Bring recent search questions into the outline and turn the strongest ones into sections that answer the query directly.",
      },
      {
        title: "Website metadata refresh",
        body: "Generate a new site meta title, description and keyword set when the positioning changes, then edit each field before applying it.",
      },
      {
        title: "Blog-post SEO fields",
        body: "Use a finished post title and recent searches to generate its SEO fields, then confirm the metadata accurately represents the article.",
      },
    ],
    tips: [
      "Choose keyword suggestions that match the reader's intent, not every phrase the tool returns.",
      "Turn a search question into a heading only when the article can answer it properly.",
      "Keep the site meta title focused on the real offer rather than listing every feature.",
      "Write meta descriptions for people first: make the page's value clear and avoid awkward keyword repetition.",
      "Review generated SEO fields against the finished page or post before saving them.",
    ],
    mistakes: [
      "Treating every suggested phrase as a required keyword.",
      "Adding unrelated search questions just because they appear in the suggestions.",
      "Publishing generated metadata without checking accuracy, clarity and length.",
      "Using the same title and description across several pages or posts.",
      "Assuming suggestions guarantee rankings or replace technical SEO review.",
    ],
    faqs: [
      {
        q: "What are the four SEO functions?",
        a: "They are Article Wizard keyword suggestions, Article Wizard search questions, site meta optimization, and blog post SEO enhancement.",
      },
      {
        q: "Where do keyword and question suggestions appear?",
        a: "Both appear inside Article Wizard: keywords during article planning and recent search questions during the outline step.",
      },
      {
        q: "Who can use the metadata functions?",
        a: "Site meta optimization and blog post SEO enhancement are administrator workflows in the site and blog management areas.",
      },
      {
        q: "Does the tool perform a technical website audit?",
        a: "No. These documented functions support article ideas and metadata. They do not crawl a site, score technical SEO, test speed, or check sitemaps and robots files.",
      },
      {
        q: "Should I publish every suggestion unchanged?",
        a: "No. Treat each suggestion as a draft, then check relevance, accuracy and natural wording before applying it.",
      },
    ],
    related: [
      "article-wizard",
      "keyword-generator",
      "landing-page-copy-generator",
      "ai-writer",
    ],
  },
];
