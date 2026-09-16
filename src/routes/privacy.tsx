import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const title = "Privacy Policy: Data Collection & User Rights | AmmarAI";
const description =
  "How AmmarAI collects, uses, shares and protects your personal data and the content you create, including AI model providers, retention periods and your rights.";

const UPDATED = "14 September 2026";

const sections: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "AmmarAI is operated by Mobile Unlocking LLC, a company incorporated in the United States. AmmarAI is an all-in-one AI creation workspace covering writing, chat, images, video, voice, transcription, vision, documents and code. This policy explains what we collect when you visit ammarai.com or use the AmmarAI application at app.ammarai.com, why we collect it and what control you have over it.",
      "For any privacy question, or to exercise any right described below, contact us at support@ammarai.com. We answer privacy requests within 30 days.",
    ],
  },
  {
    heading: "Information we collect",
    bullets: [
      "Account data: name, email address, password hash, plan, and workspace or team membership.",
      "Billing data: subscription plan, billing country, invoice history and the last four digits of your card. Full card numbers are handled by our payment processor and never reach our servers.",
      "Content you provide: prompts, uploaded files, images, audio, video, documents, brand voice settings and the outputs generated from them.",
      "Usage data: which tools you use, words, images, audio minutes and credits consumed, feature interactions and error reports.",
      "Technical data: IP address, browser and device type, language, time zone, and cookie or local storage identifiers.",
      "Communications: messages you send through our contact form, support emails and reviews you submit.",
    ],
  },
  {
    heading: "How we use your information",
    bullets: [
      "Provide the service: run the tools you request, store your history and apply your plan allowances.",
      "Billing: process subscriptions, renewals, invoices and refunds.",
      "Support: answer your questions and investigate problems you report.",
      "Safety and abuse prevention: detect fraud, automated scraping, credit abuse and prohibited content.",
      "Product improvement: aggregated and de-identified analytics about which features are used and where they fail.",
      "Legal compliance: meet tax, accounting and law enforcement obligations.",
    ],
    paragraphs: [
      "We do not sell your personal data, and we do not use your prompts or outputs to train our own models or the models of third-party providers.",
    ],
  },
  {
    heading: "Your content and AI model providers",
    paragraphs: [
      "To generate output, your prompt and any attached files are transmitted to the AI model provider that powers the tool you selected. Those providers act as our processors and are contractually restricted to processing the data solely to return your result.",
      "Model providers may retain a short-lived copy of a request for abuse monitoring, typically up to 30 days, after which it is deleted. Providers used include major commercial model vendors for text, image, video, voice, transcription and vision. The list changes as models are added or retired.",
      "You own the content you submit, and as between you and us, you own the output you generate, subject to the Terms of Service and the underlying model provider's own usage terms.",
    ],
  },
  {
    heading: "Legal bases for processing",
    bullets: [
      "Performance of a contract: operating your account and delivering the tools you use.",
      "Legitimate interests: securing the platform, preventing abuse and improving the product.",
      "Consent: optional analytics and marketing cookies, and marketing emails where consent is required.",
      "Legal obligation: tax, accounting and compliance records.",
    ],
  },
  {
    heading: "Sharing your information",
    bullets: [
      "AI model providers, to generate the output you request.",
      "Cloud hosting, storage and database providers that run the platform.",
      "Payment processors, to take payment and handle refunds and chargebacks.",
      "Email and support providers, to deliver transactional and support messages.",
      "Analytics and error-monitoring providers, to keep the service reliable.",
      "Authorities or advisers, where required by law or to establish or defend legal claims.",
      "A successor entity, if the business is merged, acquired or restructured. You will be notified before your data becomes subject to a different policy.",
    ],
  },
  {
    heading: "International transfers",
    paragraphs: [
      "Our providers operate in several countries, including the United States and the European Union. Where personal data leaves your region, we rely on Standard Contractual Clauses or an equivalent lawful transfer mechanism with each provider.",
    ],
  },
  {
    heading: "How long we keep data",
    bullets: [
      "Account data: for as long as your account exists, then deleted within 90 days of account closure.",
      "Generated content and history: until you delete it, or 90 days after account closure.",
      "Billing records: up to 7 years, where tax and accounting law requires it.",
      "Support messages and contact form submissions: up to 24 months.",
      "Server and security logs: up to 12 months.",
    ],
  },
  {
    heading: "Security",
    paragraphs: [
      "Data is encrypted in transit with TLS and at rest by our hosting providers. Access to production systems is restricted to the small number of people who need it, protected by strong authentication, and logged. Passwords are stored as salted hashes and never in readable form.",
      "No online service can promise perfect security. If a breach affects your personal data, we will notify you and the relevant regulator within the periods required by law.",
    ],
  },
  {
    heading: "Your rights",
    bullets: [
      "Access a copy of the personal data we hold about you.",
      "Correct data that is inaccurate or incomplete.",
      "Delete your account and the content associated with it.",
      "Export your content in a portable format.",
      "Object to or restrict certain processing, including direct marketing.",
      "Withdraw consent at any time, without affecting processing already carried out.",
      "Complain to your local data protection authority.",
    ],
    paragraphs: [
      "Email support@ammarai.com to exercise any of these rights. We may ask you to confirm your identity before acting on a request.",
    ],
  },
  {
    heading: "Cookies and similar technologies",
    paragraphs: [
      "We use strictly necessary cookies and local storage to keep you signed in and remember workspace preferences. Optional analytics cookies help us understand which pages and tools are used. You can block or clear cookies in your browser, though sign-in will not work without the necessary ones.",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "AmmarAI is not directed at children under 16, and we do not knowingly collect their data. If you believe a child has created an account, contact support@ammarai.com and we will remove it.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy as the product and the law change. Material changes are announced by email or in the application before they take effect, and the date at the top of this page always shows the current version.",
    ],
  },
];

export const Route = createFileRoute("/privacy")({
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
  }),
  component: () => (
    <LegalPage
      eyebrow="Privacy"
      h1="Privacy Policy"
      lede="What we collect, why we collect it, who processes it and how you get it back or removed."
      updated={UPDATED}
      sections={sections}
    />
  ),
});
