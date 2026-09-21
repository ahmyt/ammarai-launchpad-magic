import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const title = "Refund Policy: 7-Day Subscription Guarantee | AmmarAI";
const description =
  "When AmmarAI subscriptions are refundable, how the 7-day first-purchase guarantee works, how used credits are treated and how you request your refund.";

const UPDATED = "14 September 2026";

const sections: LegalSection[] = [
  {
    heading: "The short version",
    paragraphs: [
      "AmmarAI is operated by Mobile Unlocking LLC, a company incorporated in the United States.",
      "If your first paid subscription is not what you expected, email support@ammarai.com within 7 days of the charge and we will refund it in full, provided you have used no more than 20% of that period's credit allowance.",
      "After that window, subscriptions are non-refundable for the period already started, but you can cancel at any time to stop the next renewal. There is a free plan so you can test the tools before paying.",
    ],
  },
  {
    heading: "7-day first-purchase guarantee",
    bullets: [
      "Applies to your first paid subscription on an account, monthly or annual.",
      "Request must arrive within 7 calendar days of the charge.",
      "Consumption of the period's allowance must be 20% or less, since generation costs are paid to AI model providers the moment output is created.",
      "Refunds go back to the original payment method within 5 to 10 working days, depending on your bank.",
    ],
  },
  {
    heading: "Annual plans",
    paragraphs: [
      "Annual plans are covered by the same 7-day guarantee. After 7 days, an annual plan can be cancelled to prevent renewal but is not refunded pro rata, unless your local consumer law requires otherwise.",
    ],
  },
  {
    heading: "Renewals",
    paragraphs: [
      "Subscriptions renew automatically and we send a reminder before each annual renewal. If a renewal charge was genuinely unintended and you contact us within 7 days of it, with little or no usage in the new period, we will refund it. Cancelling before the renewal date always avoids the charge entirely.",
    ],
  },
  {
    heading: "Credits and consumed usage",
    paragraphs: [
      "Every generated word, image, second of video, minute of voice and transcription costs us money at the point of generation. Consumed credits therefore cannot be refunded, and unused credits do not carry over between billing periods or convert to cash.",
      "Output you dislike is not consumed usage in the sense of a fault. Ask support for help with the brief or the model choice, and where a tool clearly malfunctioned we will restore the credits it wasted.",
    ],
  },
  {
    heading: "When we always refund",
    bullets: [
      "You were charged twice for the same period.",
      "You were charged after a cancellation was confirmed.",
      "A verified platform fault stopped you from using your plan for a significant part of the period.",
      "Unauthorised use of your payment method, confirmed with your bank.",
    ],
  },
  {
    heading: "When we do not refund",
    bullets: [
      "Change of mind after the 7-day window on a period already started.",
      "Failure to use the subscription you paid for.",
      "Dissatisfaction with AI output quality, which varies with the brief, the source material and the model chosen.",
      "Accounts closed for breach of the Terms of Service, including abuse, fraud or prohibited content.",
      "Third-party charges you incurred outside AmmarAI.",
      "Free plan usage, which involves no payment.",
    ],
  },
  {
    heading: "Statutory rights",
    paragraphs: [
      "If you are a consumer in the EU, the UK or another region with a statutory withdrawal right, that right applies in addition to this policy. Where you ask us to start the service immediately and then generate content, the amount already delivered may be deducted from the refund, as the law allows. Nothing in this policy limits rights you cannot waive.",
    ],
  },
  {
    heading: "How to request a refund",
    bullets: [
      "Email support@ammarai.com from the address on the account.",
      "Include the invoice number or the date and amount of the charge.",
      "Tell us briefly what went wrong; if it is a technical fault, name the tool and roughly when it happened.",
      "We respond within two working days and process approved refunds immediately after that.",
    ],
  },
  {
    heading: "Chargebacks",
    paragraphs: [
      "Please contact us before raising a chargeback. Disputes are almost always faster to resolve directly. Accounts with an open chargeback may be suspended until the dispute is settled.",
    ],
  },
  {
    heading: "Changes to this policy",
    paragraphs: [
      "We may update this policy. The version in force is the one published on the date of your charge, and the date at the top of this page shows the current version.",
    ],
  },
];

export const Route = createFileRoute("/refund-policy")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/refund-policy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/refund-policy" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://ammarai.com/refund-policy#webpage",
            url: "https://ammarai.com/refund-policy",
            name: title,
            headline: "Refund Policy",
            description,
            inLanguage: "en-US",
            dateModified: "2026-09-14",
            about: { "@type": "Thing", name: "AmmarAI subscription refunds and cancellation policy" },
            isPartOf: { "@id": "https://ammarai.com/#website" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            breadcrumb: { "@id": "https://ammarai.com/refund-policy#breadcrumb" },
            mainEntity: {
              "@type": "Thing",
              name: "AmmarAI Refund Policy",
              description:
                "AmmarAI offers a 7-day refund guarantee for a customer's first paid subscription, subject to the request being made within 7 calendar days and usage being no more than 20% of the applicable credit allowance.",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://ammarai.com/#website",
            url: "https://ammarai.com/",
            name: "AmmarAI",
            inLanguage: "en-US",
            description: "AmmarAI provides AI-powered generation and productivity tools.",
            publisher: { "@id": "https://ammarai.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ammarai.com/#organization",
            url: "https://ammarai.com/",
            name: "Mobile Unlocking LLC",
            alternateName: "AmmarAI",
            email: "support@ammarai.com",
            brand: { "@type": "Brand", name: "AmmarAI", url: "https://ammarai.com/" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://ammarai.com/refund-policy#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "AmmarAI", item: "https://ammarai.com/" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Refund Policy",
                item: "https://ammarai.com/refund-policy",
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Refunds"
      h1="Refund Policy"
      lede="A 7-day guarantee on your first subscription, clear rules for credits already used, and a straightforward way to ask."
      updated={UPDATED}
      sections={sections}
    />
  ),
});
