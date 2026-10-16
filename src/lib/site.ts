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
  /** Full feature list shown in the pop-up */
  featureGroups: PlanFeatureGroup[];
  cta: string;
  highlight: boolean;
}

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
    features: ["2,000 plan credits per month", "AI chat, images, presentations & code", "7-day free trial"],
    featureCount: 154,
    featureGroups: [
      { heading: "Plan Allowance", items: ["2,000 plan credits per month", "7-day free trial"] },
      ...starterInclusions,
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Basic",
    price: "$24.99",
    period: "/month",
    blurb: "For freelancers and professionals creating content, audio and presentations regularly.",
    features: ["5,000 plan credits per month", "AI Agent & AI video generation", "Everything in Starter, plus audio & automation"],
    featureCount: 170,
    featureGroups: [
      { heading: "Plan Allowance", items: ["5,000 plan credits per month"] },
      ...starterInclusions,
      ...basicInclusions,
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
    featureGroups: [
      { heading: "Plan Allowance", items: ["15,000 plan credits per month"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
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
    featureGroups: [
      { heading: "Plan Allowance & Team", items: ["35,000 plan credits per month", "3 team seats included"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
      ...ultimateInclusions,
      { heading: "AI Phone Call Agent", items: ["AI Phone Call Agent (inbound & outbound)", "120 phone minutes included per month"] },
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
    featureGroups: [
      { heading: "Plan Allowance & Team", items: ["75,000 plan credits per month", "5 team seats included", "Shared team workspace & call logs"] },
      ...starterInclusions,
      ...basicInclusions,
      ...standardInclusions,
      ...ultimateInclusions,
      { heading: "AI Phone Call Agent & Follow-Ups", items: ["AI Phone Call Agent (inbound & outbound)", "800 voice minutes included per month", "Automated Follow-Up Calls (reminders & confirmations)"] },
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
