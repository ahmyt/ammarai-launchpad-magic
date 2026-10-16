export const SITE = {
  name: "AmmarAI",
  tagline: "One AI for everything you create.",
  url: "https://ammarai.com",
  appUrl: "https://app.ammarai.com",
  description:
    "Write, chat, create images and video, generate voiceovers, transcribe audio, analyze documents, and code in one AI workspace.",
};

/** External app URLs for user sign-up and sign-in (the product dashboard). */
export const REGISTER_URL = "https://app.ammarai.com/register";
export const LOGIN_URL = "https://app.ammarai.com/login";

export const primaryNav = [
  { label: "AI Tools", to: "/ai-tools" },
  { label: "Features", to: "/features" },
  { label: "Use Cases", to: "/use-cases" },
  { label: "Pricing", to: "/pricing" },
  { label: "Tutorials", to: "/tutorials" },
  { label: "Resources", to: "/resources" },
] as const;

export type StaticPath =
  | "/"
  | "/ai-tools"
  | "/features"
  | "/use-cases"
  | "/pricing"
  | "/ai-models"
  | "/resources"
  | "/tutorials"
  | "/blog"
  | "/faq"
  | "/about"
  | "/contact"
  | "/privacy"
  | "/terms"
  | "/refund-policy"
  | "/auth";

export type SiteLink = { label: string; to: StaticPath } | { label: string; slug: string };

export const footerNav: { heading: string; links: SiteLink[] }[] = [

  {
    heading: "Platform",
    links: [
      { label: "AI Tools directory", to: "/ai-tools" },
      { label: "Features", to: "/features" },
      { label: "Pricing", to: "/pricing" },
      { label: "AI models", to: "/ai-models" },
      { label: "Tutorials", to: "/tutorials" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    heading: "Create",
    links: [
      { label: "AI Writer", slug: "ai-writer" },
      { label: "AI Image Pro", slug: "ai-image-generator" },
      { label: "AI Video Pro", slug: "ai-video-generator" },
      { label: "AI Video Editor", slug: "ai-video-editor" },
      { label: "AI Voice Generator", slug: "ai-voice-generator" },

    ],
  },
  {
    heading: "Use cases",
    links: [
      { label: "AI for Marketing", slug: "ai-for-marketing" },
      { label: "AI for Content Creators", slug: "ai-for-content-creators" },
      { label: "AI for Small Business", slug: "ai-for-small-business" },
      { label: "AI for SEO", slug: "ai-for-seo" },
      { label: "AI for Students", slug: "ai-for-students" },
    ],
  },

  {
    heading: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Resources", to: "/resources" },
      { label: "Contact", to: "/contact" },
      { label: "Content studio", to: "/auth" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Terms of Service", to: "/terms" },
      { label: "Refund Policy", to: "/refund-policy" },
    ],
  },
];

export interface PlanFeatureGroup {
  heading: string;
  items: string[];
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  blurb: string;
  /** Short bullets shown on the card */
  features: string[];
  /** Total feature count shown next to the info icon */
  featureCount: number;
  /** Tools newly unlocked at this tier, highlighted at the top of the pop-up (tap to expand) */
  newInPlan: { title: string; description: string }[];
  /** Full feature list shown in the pop-up */
  featureGroups: PlanFeatureGroup[];
  cta: string;
  highlight: boolean;
}

const includedTemplates: PlanFeatureGroup[] = [
  { heading: "Blog & Writing Templates", items: ["Article Generator", "Blog Section", "Blog Post Ideas", "Blog Intros", "Blog Conclusion", "Paragraph Generator", "Grammar Correction", "TL;DR Summarization"] },
  { heading: "Ecommerce Templates", items: ["Product Description", "Product Name Generator", "Testimonial Review", "Product Features", "Product Name Ideas", "Why Choose This Product", "Reviews", "Review Responder", "Amazon"] },
  { heading: "Development Templates", items: ["Problem Agitate Solution", "Pros & Cons", "Meta Description"] },
  { heading: "Social Media Templates", items: ["Youtube Video Description", "Youtube Video Title", "Youtube Video Tag", "Instagram Captions", "Instagram Hashtags", "Social Media Post Tweet", "Social Media Post Business", "Facebook Headlines", "IG Reel Script", "IG Captions", "TikTok Script", "TikTok Video Caption", "Viral Tweet Idea", "Clickbait Titles", "App and SMS Notifications", "AMA Post", "Trending Post"] },
  { heading: "Email Templates", items: ["Email Generator", "Email Answer Generator", "Newsletter Generator", "Welcome Email", "Invitation Mail", "Follow up Email", "Reply Email", "Newsletter", "Press Release"] },
  { heading: "Academic Templates", items: ["Cover Letter", "Math Question", "Bullet Point Answer", "Academic Essay", "Thesis Statement", "Proofreading"] },
  { heading: "Business Templates", items: ["Cost Benefit Analysis", "Brainstorming", "Linkedin Post", "Sales Pitch", "Newsletter", "Strategy", "Marketing Plan"] },
  { heading: "Customer Service Templates", items: ["Social Media Reply", "Apology Email", "Ticket Reply", "Article Generator - Documentation"] },
  { heading: "Advertising Templates", items: ["Advertising Ideas", "FB Ad", "Google Ad", "Ad Script", "TV Ads", "Youtube Ads"] },
  { heading: "Language Templates", items: ["Translate", "Grammar Check", "List Synonyms"] },
  { heading: "Additional Included Templates", items: ["Terms and Conditions", "Generate From RSS Feed", "Undetectable AI", "Pros and Cons", "Real Estate Listing", "Prompt Generator", "Storytelling", "Viral Ideas"] },
];

const starterInclusions: PlanFeatureGroup[] = [
  {
    heading: "Writing & Chat",
    items: ["Access to all 90+ prompt templates", "AI Writer", "AI Editor", "AI Chat", "AI Assistant", "Brand Voice"],
  },
  {
    heading: "Image, Presentations & Code",
    items: ["AI Image Generation", "AI Code Generator", "AI Presentation Maker", "AI Captions"],
  },
  { heading: "Support", items: ["Standard email support"] },
];

const basicInclusions: PlanFeatureGroup[] = [
  {
    heading: "Agents, Video & Automation",
    items: ["AI Agent", "AI Video Generation", "AI Social Media & Automation"],
  },
  {
    heading: "Writing & Content Checks",
    items: ["Article Wizard", "AI ReWriter", "AI Plagiarism Detector", "AI Content Detector"],
  },
  {
    heading: "Image Tools",
    items: ["AI Image Editor", "AI Realtime Image", "AI Vision", "AI Chat Image"],
  },
  {
    heading: "Audio & Research",
    items: ["Text-to-Speech", "Speech-to-Text", "AI Realtime Voice Chat", "AI File Chat", "AI Web Chat", "SEO Tool", "Multi Model Support"],
  },
];

const standardInclusions: PlanFeatureGroup[] = [
  {
    heading: "Video & Publishing",
    items: ["AI YouTube (YouTube videos into blog posts)", "AI URL to Video & Influencer", "AI Video Editor", "AI Auto Blog to WordPress"],
  },
  {
    heading: "Website Bots & Chat Pro",
    items: ["External Chatbot Builder (website embed)", "AI Voice Bots for Websites", "AI Chat Pro Skills"],
  },
  {
    heading: "Product & Fashion",
    items: ["AI Product Photography", "AI Fashion Studio"],
  },
  {
    heading: "Business & Deep Research",
    items: ["AI CRM", "AI Sales", "Deep Research", "Model Council Support"],
  },
];

const ultimateInclusions: PlanFeatureGroup[] = [
  {
    heading: "Advanced Media",
    items: ["UGC Factory", "AI Viral Clips", "AI Video Dubbing (multi-language lip-sync)", "Creative Suite"],
  },
  {
    heading: "Agent Builder & Connections",
    items: ["Unlimited AI Agent Builder & full CRM", "All connectors", "Chatbot Training"],
  },
];

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "$9.99",
    period: "/month",
    blurb: "For individuals and solo creators exploring AI writing, image creation, and everyday tools.",
    features: ["2,000 plan credits per month", "AI chat, images, presentations & code", "Access to all 90+ prompt templates"],
    featureCount: 154,
    newInPlan: [
      { title: "AI Writer, Editor, Chat & Assistant", description: "Write, rewrite and refine content with a full writing suite, plus an AI chat assistant for questions and ideas." },
      { title: "AI Image Generation", description: "Turn text prompts into original images for blogs, ads and social posts." },
      { title: "AI Presentation Maker", description: "Generate complete slide decks from a topic or outline in seconds." },
      { title: "AI Code Generator", description: "Generate, explain and debug code snippets in popular languages." },
      { title: "AI Captions", description: "Auto-generate captions and subtitles for your videos." },
      { title: "All 90+ prompt templates", description: "Ready-made templates for blogs, emails, ads, social media, ecommerce and more." },
    ],
    featureGroups: [
      { heading: "Plan Allowance", items: ["2,000 plan credits per month"] },
      ...starterInclusions,
      ...includedTemplates,
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Basic",
    price: "$24.99",
    period: "/month",
    blurb: "For freelancers and professionals creating content, audio and presentations regularly.",
    features: ["5,000 plan credits per month", "AI Agent & AI video generation", "3-day free trial · everything in Starter"],
    featureCount: 170,
    newInPlan: [
      { title: "AI Agent", description: "An autonomous agent that plans and completes multi-step tasks for you." },
      { title: "AI Video Generation", description: "Create videos from text prompts or images, ready for social and ads." },
      { title: "AI Social Media & Automation", description: "Schedule and auto-publish AI-generated posts across your social channels." },
      { title: "Article Wizard & AI ReWriter", description: "Generate full structured articles step by step, or rewrite existing content in a fresh voice." },
      { title: "Plagiarism & Content Detectors", description: "Check content for originality and detect AI-generated text before publishing." },
      { title: "AI Image Editor, Vision & Realtime Image", description: "Edit images with AI, analyze pictures, and generate images in real time as you type." },
      { title: "Text-to-Speech & Speech-to-Text", description: "Turn scripts into natural voiceovers and transcribe audio or video to text." },
      { title: "AI Realtime Voice Chat", description: "Talk with the AI live by voice, with instant spoken responses." },
      { title: "AI File & Web Chat", description: "Chat with your documents or any webpage to get answers and summaries." },
      { title: "SEO Tool & Multi Model Support", description: "Built-in SEO analysis plus the freedom to switch between leading AI models." },
    ],
    featureGroups: [
      { heading: "Plan Allowance", items: ["5,000 plan credits per month", "3-day free trial"] },
      ...starterInclusions,
      ...basicInclusions,
      ...includedTemplates,
    ],
    cta: "Choose Basic",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$59.99",
    period: "/month",
    blurb: "For marketers and small teams producing video, social and research at scale.",
    features: ["15,000 plan credits per month", "AI Chat Pro Skills & website voice bots", "Everything in Basic, plus CRM & deep research"],
    featureCount: 188,
    newInPlan: [
      { title: "AI Chat Pro Skills", description: "Unlock advanced chat skills: web search, file analysis and pro workflows inside AI Chat." },
      { title: "AI Voice Bots for Websites", description: "Add a voice assistant to your website that talks with visitors and answers questions." },
      { title: "External Chatbot Builder (website embed)", description: "Build a custom chatbot trained on your content and embed it on any website." },
      { title: "AI YouTube to Blog", description: "Turn any YouTube video into a ready-to-publish blog post." },
      { title: "AI URL to Video & Influencer", description: "Paste a product or page URL and get a video ad or AI influencer clip." },
      { title: "AI Video Editor", description: "Edit, trim and enhance videos with AI-powered tools." },
      { title: "AI Auto Blog to WordPress", description: "Generate and publish blog posts straight to your WordPress site automatically." },
      { title: "AI Product Photography & Fashion Studio", description: "Create studio-quality product shots and virtual fashion try-on images." },
      { title: "AI CRM & AI Sales", description: "Manage leads and customers with AI-assisted sales tools built in." },
      { title: "Deep Research & Model Council", description: "Run in-depth research reports and compare answers from multiple top AI models at once." },
    ],
    featureGroups: [
      { heading: "Plan Allowance", items: ["15,000 plan credits per month"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
      ...includedTemplates,
    ],
    cta: "Choose Standard",
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "$129.99",
    period: "/month",
    blurb: "For agencies and power users running full-scale content and automation operations.",
    features: ["35,000 plan credits per month", "120 inbound & outbound phone minutes", "3 team seats · everything in Standard"],
    featureCount: 201,
    newInPlan: [
      { title: "AI Phone Call Agent (inbound & outbound)", description: "An AI agent that answers incoming calls and makes outbound calls in a natural voice." },
      { title: "120 phone minutes per month", description: "Included monthly calling allowance for your AI phone agent." },
      { title: "3 team seats", description: "Invite two teammates to share your workspace and credit pool." },
      { title: "UGC Factory & AI Viral Clips", description: "Produce UGC-style creator videos and cut long videos into viral short clips." },
      { title: "AI Video Dubbing (multi-language lip-sync)", description: "Dub videos into other languages with matching lip-sync." },
      { title: "Creative Suite", description: "An advanced bundle of creative tools for professional production work." },
      { title: "Unlimited AI Agent Builder & full CRM", description: "Build as many custom AI agents as you need, connected to the full CRM." },
      { title: "All connectors & Chatbot Training", description: "Connect external apps and train chatbots on your own data and documents." },
    ],
    featureGroups: [
      { heading: "Plan Allowance & Team", items: ["35,000 plan credits per month", "3 team seats included"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
      ...ultimateInclusions,
      { heading: "AI Phone Call Agent", items: ["AI Phone Call Agent (inbound & outbound)", "120 phone minutes included per month"] },
      ...includedTemplates,
    ],
    cta: "Choose Ultimate",
    highlight: false,
  },
  {
    name: "Voice Scale",
    price: "$349.99",
    period: "/month",
    blurb: "For businesses and agencies running high-volume AI phone operations and follow-ups.",
    features: ["75,000 plan credits per month", "800 voice minutes & automated follow-ups", "5 team seats · everything in Ultimate"],
    featureCount: 201,
    newInPlan: [
      { title: "800 voice minutes per month", description: "A high-volume monthly calling allowance for busy phone operations." },
      { title: "Automated Follow-Up Calls (reminders & confirmations)", description: "The AI automatically calls customers to remind them of appointments and confirm bookings." },
      { title: "5 team seats", description: "Invite four teammates to share your workspace and credit pool." },
      { title: "Shared team workspace & call logs", description: "Your whole team works in one workspace with shared call history and logs." },
    ],
    featureGroups: [
      { heading: "Plan Allowance & Team", items: ["75,000 plan credits per month", "5 team seats included", "Shared team workspace & call logs"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
      ...ultimateInclusions,
      { heading: "AI Phone Call Agent & Follow-Ups", items: ["AI Phone Call Agent (inbound & outbound)", "800 voice minutes included per month", "Automated Follow-Up Calls (reminders & confirmations)"] },
      ...includedTemplates,
    ],
    cta: "Choose Voice Scale",
    highlight: false,
  },
];

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/media/ammarai-logo.webp`,
  },
  image: `${SITE.url}/media/og-image.png`,
  // Verified brand profile URLs — strengthen entity recognition in Google and AI search.
  sameAs: [
    SITE.appUrl,
    "https://www.facebook.com/profile.php?id=61594692873342",
    "https://www.tiktok.com/@ammarai.com",
    "https://www.instagram.com/ammarai_com",
  ],
};

export function softwareApplicationJsonLd(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: path,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free plan available",
    },
  };
}
