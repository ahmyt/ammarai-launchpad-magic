import { createFileRoute } from "@tanstack/react-router";
import { LegalPage, type LegalSection } from "@/components/site/LegalPage";

const title = "AmmarAI Terms of Service | User Agreement & Policies";
const description =
  "The rules for using AmmarAI: accounts, subscriptions and credits, acceptable use, ownership of AI output, liability and how the agreement can be ended.";

const UPDATED = "14 September 2026";

const sections: LegalSection[] = [
  {
    heading: "Agreement to these terms",
    paragraphs: [
      "These Terms of Service govern your use of the AmmarAI website at ammarai.com and the AmmarAI application at app.ammarai.com. AmmarAI is operated by Mobile Unlocking LLC, a company incorporated in the United States. By creating an account or using any tool, you accept these terms. If you are accepting on behalf of a company, you confirm you are authorised to bind it.",
      "If you do not agree with these terms, do not use the service.",
    ],
  },
  {
    heading: "The service",
    paragraphs: [
      "AmmarAI is a subscription workspace that gives you access to AI tools for writing, chat, images, video, voice, transcription, vision, documents, code and automation agents, powered by third-party AI models.",
      "Tools, models and allowances evolve. We may add, change or retire individual tools and models. Where a change materially reduces what your paid plan provides, we will tell you before it takes effect.",
    ],
  },
  {
    heading: "Accounts",
    bullets: [
      "You must be at least 16 years old, or the age of digital consent in your country, whichever is higher.",
      "Provide accurate registration details and keep them current.",
      "Keep your password confidential; you are responsible for activity under your account.",
      "One account per person, unless you are on a team plan with assigned seats.",
      "Tell us promptly at support@ammarai.com if you suspect unauthorised access.",
    ],
  },
  {
    heading: "Plans, credits and billing",
    bullets: [
      "Paid plans are billed in advance, monthly or annually, and renew automatically until cancelled.",
      "Each plan includes an allowance of words, images, audio minutes, video and other credits, which resets at the start of each billing period and does not roll over.",
      "Prices are shown exclusive of any tax that applies in your country, which is added at checkout where required.",
      "You can cancel at any time from your account. Cancellation stops the next renewal; access continues to the end of the period already paid for.",
      "We may change prices with at least 30 days' notice before your next renewal. Continuing after that date means you accept the new price.",
      "Failed payments may lead to suspension of paid features until the balance is settled.",
    ],
    paragraphs: [
      "Refunds are governed by our Refund Policy, which forms part of these terms.",
    ],
  },
  {
    heading: "Free plan and trials",
    paragraphs: [
      "The free plan is provided as-is with limited allowances and may be changed or withdrawn at any time. Creating multiple accounts to obtain additional free allowance is a breach of these terms and may result in all related accounts being closed.",
    ],
  },
  {
    heading: "Your content and AI output",
    bullets: [
      "You keep ownership of everything you submit: prompts, files, brand settings and source material.",
      "As between you and AmmarAI, you own the output generated from your inputs, and you may use it commercially, subject to these terms and to the usage terms of the underlying model provider.",
      "You grant us a limited licence to host, process and transmit your content only as needed to operate the service and support you.",
      "We do not use your content to train models.",
      "Similar prompts can produce similar output for different users, so we cannot guarantee that any output is unique or protectable.",
    ],
  },
  {
    heading: "Acceptable use",
    bullets: [
      "No unlawful, infringing, defamatory, hateful or harassing content.",
      "No sexual content involving minors and no non-consensual intimate imagery of any kind.",
      "No deceptive impersonation, including voice cloning or likeness generation of a real person without their documented permission.",
      "No malware, phishing, spam or large-scale unsolicited messaging.",
      "No disinformation campaigns, fabricated news or content designed to manipulate elections.",
      "No medical, legal or financial advice presented as professional guidance without qualified human review.",
      "No reverse engineering, scraping, resale of raw model access, or attempts to bypass rate limits, allowances or security controls.",
    ],
    paragraphs: [
      "We may suspend or close accounts that breach this section, and we may remove content that does. Serious or repeated breaches end the agreement immediately without refund.",
    ],
  },
  {
    heading: "AI output is not verified",
    paragraphs: [
      "AI systems can produce output that is inaccurate, outdated, biased or entirely invented, and they can reproduce material resembling existing work. You are responsible for reviewing, fact-checking and editing anything you publish or rely on. AmmarAI makes no promise about the accuracy, originality or fitness of generated output, and no promise about search rankings, engagement or business results.",
    ],
  },
  {
    heading: "Third-party services",
    paragraphs: [
      "The tools depend on third-party model providers, hosting and payment services. Their availability, terms and policies are outside our control, and an interruption at a provider can interrupt part of the service.",
    ],
  },
  {
    heading: "Intellectual property in the platform",
    paragraphs: [
      "The AmmarAI platform, brand, interface, templates, prompts library and documentation remain our property. These terms grant you a limited, non-exclusive, non-transferable right to use the service while your subscription is active. Nothing here transfers ownership of the platform itself.",
    ],
  },
  {
    heading: "Availability and support",
    paragraphs: [
      "We aim for continuous availability but do not guarantee uninterrupted service. Maintenance, provider outages and emergency fixes can cause downtime. Support is provided by email at support@ammarai.com, normally within two working days.",
    ],
  },
  {
    heading: "Disclaimers and liability",
    paragraphs: [
      "The service is provided on an as-is and as-available basis, without warranties of any kind to the fullest extent permitted by law.",
      "To the maximum extent permitted by law, AmmarAI is not liable for indirect, incidental or consequential loss, lost profits, lost data or lost business opportunity. Our total liability for any claim is limited to the amount you paid us in the twelve months before the event giving rise to the claim.",
      "Nothing in these terms excludes liability that cannot be excluded by law, including for fraud or death or personal injury caused by negligence. Consumers keep all mandatory statutory rights.",
    ],
  },
  {
    heading: "Indemnity",
    paragraphs: [
      "You agree to indemnify AmmarAI against claims, damages and reasonable costs arising from your content, your use of generated output or your breach of these terms.",
    ],
  },
  {
    heading: "Suspension and termination",
    paragraphs: [
      "You may close your account at any time. We may suspend or terminate access for breach of these terms, non-payment, or where required by law. On termination, your right to use the service stops and your content is deleted in line with the retention periods in the Privacy Policy. Export anything you need before closing your account.",
    ],
  },
  {
    heading: "Changes to these terms",
    paragraphs: [
      "We may update these terms. Material changes are announced by email or in the application before they take effect. Continued use after that date means you accept the updated terms.",
    ],
  },
  {
    heading: "Contact",
    paragraphs: [
      "Questions about these terms: support@ammarai.com. Team, agency and partnership enquiries: teams@ammarai.com and partners@ammarai.com.",
    ],
  },
];

export const Route = createFileRoute("/terms")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/terms" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://ammarai.com/terms#webpage",
            url: "https://ammarai.com/terms",
            name: title,
            headline: "Terms of Service",
            description,
            inLanguage: "en-US",
            dateModified: "2026-09-14",
            about: { "@id": "https://ammarai.com/#organization" },
            isPartOf: { "@id": "https://ammarai.com/#website" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            mainEntity: { "@id": "https://ammarai.com/terms#terms" },
          },
          {
            "@context": "https://schema.org",
            "@type": "TermsOfService",
            "@id": "https://ammarai.com/terms#terms",
            url: "https://ammarai.com/terms",
            name: "AmmarAI Terms of Service",
            headline: "Terms of Service",
            description:
              "The agreement between users and AmmarAI covering use of the website and application, accounts, subscriptions, credits, acceptable use, AI output ownership, liability and termination.",
            inLanguage: "en-US",
            dateModified: "2026-09-14",
            serviceUrl: "https://app.ammarai.com",
            audience: {
              "@type": "Audience",
              audienceType: "Users of the AmmarAI website and application",
            },
            about: [
              { "@type": "Thing", name: "AmmarAI account requirements" },
              { "@type": "Thing", name: "AmmarAI subscriptions, credits and billing" },
              { "@type": "Thing", name: "Acceptable use of AmmarAI" },
              { "@type": "Thing", name: "Ownership of AI-generated output" },
              { "@type": "Thing", name: "Limitation of liability" },
              { "@type": "Thing", name: "Termination of the agreement" },
            ],
            provider: { "@id": "https://ammarai.com/#organization" },
            publisher: { "@id": "https://ammarai.com/#organization" },
            isPartOf: { "@id": "https://ammarai.com/#website" },
          },
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://ammarai.com/#organization",
            url: "https://ammarai.com",
            name: "Mobile Unlocking LLC",
            alternateName: "AmmarAI",
            email: "support@ammarai.com",
            description:
              "Mobile Unlocking LLC operates AmmarAI, a subscription workspace providing AI tools for writing, chat, images, video, voice, transcription, vision, documents, code and automation agents.",
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": "https://ammarai.com/#website",
            url: "https://ammarai.com",
            name: "AmmarAI",
            inLanguage: "en-US",
            publisher: { "@id": "https://ammarai.com/#organization" },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "@id": "https://ammarai.com/terms#breadcrumb",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "AmmarAI", item: "https://ammarai.com" },
              {
                "@type": "ListItem",
                position: 2,
                name: "Terms of Service",
                item: "https://ammarai.com/terms",
              },
            ],
          },
        ]),
      },
    ],
  }),
  component: () => (
    <LegalPage
      eyebrow="Terms"
      h1="Terms of Service"
      lede="The agreement between you and AmmarAI: what you get, what you owe, what you may not do and who is responsible for what."
      updated={UPDATED}
      sections={sections}
    />
  ),
});
