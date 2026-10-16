import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Info, X } from "lucide-react";
import { plans, REGISTER_URL, type Plan } from "@/lib/site";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { ActionButton, ExternalButton } from "@/components/site/Button";
import { OfferInline } from "@/components/site/OfferInline";
import { cn } from "@/lib/utils";

const title = "Pricing: One Subscription for Every AI Tool | AmmarAI";
const description =
  "AmmarAI pricing: Starter, Basic, Standard, Ultimate and Voice Scale plans. Every plan includes a monthly credit allowance across writing, image, video, voice and AI agent tools.";

const faqs = [
  {
    q: "Is there a free way to try the platform?",
    a: "Yes. You can create a free account and explore the platform before choosing a paid plan. No card is required to start.",
  },
  {
    q: "What are plan credits?",
    a: "Credits are a single balance that every tool draws from. Writing, images, video, voice and agents each use credits at their own rate, so one allowance covers your whole workflow.",
  },
  {
    q: "What happens when I use up my credits?",
    a: "Generation pauses until the next monthly cycle or until you upgrade. Nothing is deleted and your history stays available.",
  },
  {
    q: "Can I change plan later?",
    a: "Yes, at any time. Upgrades apply immediately and downgrades take effect at the end of the billing period.",
  },
  {
    q: "Do I own what I generate?",
    a: "On paid plans you can use generated content commercially. Do not prompt for trademarked characters, brands or the likeness of real people.",
  },
];

export const Route = createFileRoute("/pricing")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ammarai.com/pricing" },
      { property: "og:image", content: "https://ammarai.com/media/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://ammarai.com/media/og-image.png" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/pricing" }],
  }),
  component: Pricing,
});

function PlanFeaturesDialog({ plan, onClose }: { plan: Plan; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/50 p-0 sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${plan.name} plan features`}
        tabIndex={-1}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-t-2xl bg-card p-6 ring-1 ring-border shadow-xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{plan.name} plan</p>
            <h3 className="mt-1 font-display text-xl font-semibold text-foreground">
              Everything included
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {plan.price}
              {plan.period} · {plan.featureCount} features
            </p>
          </div>
          <ActionButton
            variant="ghost"
            type="button"
            onClick={onClose}
            aria-label="Close feature list"
            className="rounded-full p-2 text-muted-foreground ring-1 ring-border transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </ActionButton>
        </div>
        <div className="mt-6 flex flex-col gap-6">
          <div className="rounded-xl bg-accent/5 p-4 ring-1 ring-accent/20">
            <h4 className="text-sm font-semibold text-accent">
              {plan.name === "Starter"
                ? "Included in Starter:"
                : `New in ${plan.name} — everything in the previous plan, plus:`}
            </h4>
            <ul className="mt-2.5 flex flex-col gap-1">
              {plan.newInPlan.map((item) => (
                <li key={item.title}>
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedTool((cur) => (cur === item.title ? null : item.title))
                    }
                    aria-expanded={expandedTool === item.title}
                    className="flex w-full items-start gap-2.5 rounded-lg px-2 py-1.5 text-left text-sm leading-relaxed text-foreground transition-colors hover:bg-accent/10"
                  >
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    <span className="flex-1 font-medium">{item.title}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0 text-muted-foreground transition-transform",
                        expandedTool === item.title && "rotate-180",
                      )}
                    />
                  </button>
                  {expandedTool === item.title ? (
                    <p className="px-2 pb-2 pl-8 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
          {plan.featureGroups.map((group) => (
            <div key={group.heading}>
              <h4 className="text-sm font-semibold text-foreground">{group.heading}</h4>
              <ul className="mt-2.5 flex flex-col gap-2">
                {group.items.map((item) => (
                  <li key={`${group.heading}-${item}`} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                    <span aria-hidden="true" className="text-accent">
                      ✓
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ExternalButton href={REGISTER_URL} variant="primary" className="mt-7 w-full">
          {plan.cta}
        </ExternalButton>
      </div>
    </div>
  );
}

function Pricing() {
  const [openPlan, setOpenPlan] = useState<Plan | null>(null);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Pricing" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Pricing</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              One subscription instead of seven
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              Every plan includes a monthly credit allowance that works across writing, image,
              video, voice and AI agent tools. Pick the tier that matches your volume.
            </p>
          </div>
        </Container>
      </Section>

      <Section className="pt-4">
        <Container size="wide">
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "flex flex-col rounded-xl bg-card p-6 ring-1 ring-border",
                  plan.highlight && "ring-2 ring-accent",
                )}
              >
                {plan.highlight ? <p className="eyebrow text-accent">Most popular</p> : null}
                <h2 className="mt-1 font-display text-xl font-semibold text-foreground">
                  {plan.name}
                </h2>
                <p className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-4xl font-semibold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">{plan.period}</span>
                </p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground">
                  {plan.blurb}
                </p>
                 <ActionButton
                   variant="ghost"
                  type="button"
                  onClick={() => setOpenPlan(plan)}
                   className="mt-5 inline-flex items-center gap-1.5 self-start px-0 py-0 text-sm font-medium text-accent underline-offset-2 transition-colors hover:underline"
                  aria-haspopup="dialog"
                >
                  <Info className="h-4 w-4" aria-hidden="true" />
                  Access {plan.featureCount} features
                 </ActionButton>
                <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-sm leading-relaxed text-foreground">
                      <span aria-hidden="true" className="text-accent">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <ExternalButton
                  href={REGISTER_URL}
                  variant={plan.highlight ? "primary" : "outline"}
                  className="mt-7 w-full"
                >
                  {plan.cta}
                </ExternalButton>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Prices shown in USD. Annual billing reduces the effective monthly rate on paid plans.
            Explore the{" "}
            <Link to="/ai-models" className="underline underline-offset-2 hover:text-foreground">
              model library
            </Link>
            . Available tools and allowances vary by plan.
          </p>
        </Container>
      </Section>

      <OfferInline />

      <Section tone="sand">
        <Container size="narrow">
          <SectionHeading title="Pricing questions" />
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section>

      {openPlan ? <PlanFeaturesDialog plan={openPlan} onClose={() => setOpenPlan(null)} /> : null}
    </div>
  );
}
