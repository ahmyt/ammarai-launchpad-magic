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

export const plans: Plan[] = [
  {
    name: "Starter",
    price: "$9.99",
    period: "/month",
    blurb: "For individuals and solo creators exploring AI writing, image creation, and everyday tools.",
    features: [
      "15,000 plan credits per month",
      "AI chat, image generation and presentations",
      "Code generator and AI captions",
    ],
    featureCount: 154,
    featureGroups: [
      {
        heading: "Writing & Chat",
        items: [
          "AI Writer with economical models",
          "AI Article Wizard",
          "AI Rewriter & Content Improver",
          "Blog post, ad copy and email templates",
          "AI Chat (standard models)",
        ],
      },
      {
        heading: "Image & Design",
        items: [
          "AI Image Generation (economical models)",
          "Stock image search (Unsplash, Pexels)",
          "AI Presentation Maker",
        ],
      },
      {
        heading: "Everyday Tools",
        items: [
          "AI Code Generator",
          "AI Captions",
          "AI Document & PDF analysis",
          "Saved prompts and history",
          "1 seat — solo workspace",
        ],
      },
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Basic",
    price: "$24.99",
    period: "/month",
    blurb: "For freelancers and professionals creating content, audio and presentations regularly.",
    features: [
      "35,000 plan credits per month",
      "AI Agent and AI video generation",
      "AI chat, images, audio and SEO tools",
    ],
    featureCount: 168,
    featureGroups: [
      {
        heading: "Everything in Starter, plus",
        items: [
          "Higher credit allowance across all tools",
          "Standard image models",
          "AI Chat (standard models)",
        ],
      },
      {
        heading: "Agents & Video",
        items: [
          "AI Agent",
          "AI Video Generation",
        ],
      },
      {
        heading: "Content Production",
        items: [
          "AI Voiceover (standard voices)",
          "Speech-to-text transcription",
          "Plagiarism & content detector",
        ],
      },
      {
        heading: "Growth Tools",
        items: [
          "AI SEO tools and keyword research",
          "AI Social Media post generator",
          "1 seat — solo workspace",
        ],
      },
    ],
    cta: "Choose Basic",
    highlight: false,
  },
  {
    name: "Standard",
    price: "$59.99",
    period: "/month",
    blurb: "For marketers and small teams producing video, social and research at scale.",
    features: [
      "80,000 plan credits per month",
      "AI Chat Pro with skills",
      "2 team seats included",
    ],
    featureCount: 183,
    featureGroups: [
      {
        heading: "Everything in Basic, plus",
        items: [
          "AI Chat Pro with skills",
          "Frontier and research chat models",
          "Premium image models",
          "2 team seats with shared workspace",
        ],
      },
      {
        heading: "Video & Social",
        items: [
          "Higher AI video generation allowance",
          "AI Video Editor",
          "Social media scheduling tools",
        ],
      },
      {
        heading: "Business & Research",
        items: [
          "AI Chatbot for your website",
          "AI Web Research (live data)",
          "AI Vision & image analysis",
          "Brand voice and personas",
        ],
      },
    ],
    cta: "Choose Standard",
    highlight: true,
  },
  {
    name: "Ultimate",
    price: "$129.99",
    period: "/month",
    blurb: "For agencies and power users running full-scale content and automation operations.",
    features: [
      "200,000 plan credits per month",
      "Agent Builder, UGC ads and dubbing",
      "3 team seats included",
    ],
    featureCount: 196,
    featureGroups: [
      {
        heading: "Everything in Standard, plus",
        items: [
          "All models unlocked — switch freely",
          "Highest credit allowance",
          "3 team seats with shared workspace",
        ],
      },
      {
        heading: "Agents & Automation",
        items: [
          "AI Agent Builder (custom agents)",
          "AI Blog automation",
          "Full CRM & lead tools",
        ],
      },
      {
        heading: "Advanced Media",
        items: [
          "UGC-style video ads",
          "AI Video Dubbing & translation",
          "Viral clips generator",
          "Voice cloning (premium voices)",
        ],
      },
    ],
    cta: "Choose Ultimate",
    highlight: false,
  },
  {
    name: "Voice Scale",
    price: "$349.99",
    period: "/month",
    blurb: "For businesses and agencies running high-volume AI phone operations and follow-ups.",
    features: [
      "75,000 plan credits per month",
      "800 voice minutes — inbound & outbound",
      "5 team seats included",
    ],
    featureCount: 201,
    featureGroups: [
      {
        heading: "Everything in Ultimate, plus",
        items: [
          "5 team seats — shared workspace & call logs",
          "Full Ultimate tool suite included",
        ],
      },
      {
        heading: "AI Phone Agent",
        items: [
          "AI Phone Call Agent (inbound & outbound)",
          "800 voice minutes included per month",
          "Automated follow-up calls (reminders & confirmations)",
          "Call recordings, transcripts and summaries",
        ],
      },
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
