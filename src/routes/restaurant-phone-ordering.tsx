import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, ChefHat, CreditCard, MonitorSmartphone, Phone, Receipt, Utensils } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink } from "@/components/site/Button";
import { PhoneDemoButton } from "@/components/site/PhoneDemoDialog";
import { cn } from "@/lib/utils";

const url = "https://ammarai.com/restaurant-phone-ordering";
const title = "AI Restaurant Phone Ordering Agent with POS & KDS | AmmarAI";
const description =
  "An AI phone agent that answers restaurant calls, takes takeout orders, confirms them, creates the order in your POS and sends it to the kitchen display.";

type Step = { title: string; speaker: "agent" | "caller" | "system"; lines: { who: string; text: string }[] };

const steps: Step[] = [
  {
    title: "Greet the caller",
    speaker: "agent",
    lines: [{ who: "Agent", text: "Thanks for calling JJ Fish & Chicken! I can take your takeout order. What would you like today?" }],
  },
  {
    title: "Collect items, quantities and modifiers",
    speaker: "caller",
    lines: [
      { who: "Caller", text: "Two 6-piece wing combos, one lemon pepper and one hot, and a fish sandwich." },
      { who: "Agent", text: "Got it. Fries or rice with the combos, and which drink?" },
      { who: "Caller", text: "Fries, and two lemonades." },
    ],
  },
  {
    title: "Collect name and phone",
    speaker: "agent",
    lines: [
      { who: "Agent", text: "Can I get a name and callback number for the order?" },
      { who: "Caller", text: "Sam, 555-201-4488." },
    ],
  },
  {
    title: "Read the order back",
    speaker: "agent",
    lines: [
      {
        who: "Agent",
        text: "That's 2 × 6-pc wing combo (1 lemon pepper, 1 hot) with fries and lemonade, plus 1 fish sandwich, for Sam. Is that correct?",
      },
      { who: "Caller", text: "Yes, that's right." },
    ],
  },
  {
    title: "Create the order in the POS",
    speaker: "system",
    lines: [{ who: "POS", text: "Takeout order created with items, modifiers, prices, tax and customer details." }],
  },
  {
    title: "Send the ticket to the kitchen",
    speaker: "system",
    lines: [{ who: "Kitchen display", text: "New takeout ticket appears on the kitchen screen (KOT) — cooks start right away." }],
  },
  {
    title: "Give the order number",
    speaker: "agent",
    lines: [{ who: "Agent", text: "You're all set, Sam. Your order number is 104. We'll have it ready for pickup shortly!" }],
  },
];

const integration = [
  { icon: Phone, title: "Restaurant phone line", body: "Forward your existing number. The agent answers every call, even at the dinner rush." },
  { icon: Utensils, title: "Trained on your menu", body: "Items, sizes, sauces, sides, combos, prices and what's unavailable today." },
  { icon: Receipt, title: "POS order", body: "The confirmed order is created in your POS through its API — no re-typing." },
  { icon: ChefHat, title: "Kitchen display (KDS)", body: "The kitchen ticket is sent straight to the kitchen screen or printer." },
  { icon: CreditCard, title: "Optional phone payment", body: "If you need it, we connect your payment provider so orders are paid on the call." },
];

const service = [
  { title: "We train the agent", body: "We load your menu, modifiers, hours and pickup times, and tune the voice and greeting." },
  { title: "We connect your POS", body: "We map your menu to the POS and set up order creation through its API." },
  { title: "We push orders to the kitchen", body: "Confirmed orders reach your kitchen display system automatically." },
  { title: "We test and go live", body: "Test calls with your team, then switch your phone line over." },
];

export const Route = createFileRoute("/restaurant-phone-ordering")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "AI Restaurant Phone Ordering Agent",
          provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" },
          description,
          areaServed: "US",
          url,
        }),
      },
    ],
  }),
  component: RestaurantOrderingPage,
});

function RestaurantOrderingPage() {
  const [active, setActive] = useState(0);
  const step = steps[active];

  return (
    <>
      <Section>
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Phone Call Agent", to: "/ai-phone-agent" }, { label: "Restaurant Phone Ordering" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">Restaurant phone ordering · Takeout</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.02] sm:text-5xl">
              Every takeout call answered — and sent straight to your kitchen
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              An AI phone agent that takes takeout orders, confirms them with the caller, creates the order in your
              POS and sends the ticket to your kitchen display. Full service: we set it up for you.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" size="lg">Book a restaurant setup call</ButtonLink>
              <PhoneDemoButton label="Call the demo agent" />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading
            eyebrow="How a call works"
            title="A real takeout order, step by step"
            intro="Example: JJ Fish & Chicken. Tap each step to see what happens on the call and behind the counter."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      i === active ? "border-accent bg-card text-foreground" : "border-border text-muted-foreground hover:bg-card",
                    )}
                  >
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums", i <= active ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground")}>
                      {i < active ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="font-semibold">{s.title}</span>
                  </button>
                </li>
              ))}
            </ol>

            <Card className="p-6 sm:p-8">
              <p className="eyebrow">Step {active + 1} of {steps.length}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <div className="mt-6 space-y-3" aria-live="polite">
                {step.lines.map((l) => (
                  <div
                    key={l.text}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm leading-relaxed",
                      l.who === "Caller" ? "ml-8 bg-secondary text-foreground" : l.who === "Agent" ? "mr-8 bg-accent/10 text-foreground" : "border border-dashed border-accent bg-card text-foreground",
                    )}
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{l.who}</p>
                    <p className="mt-1">{l.text}</p>
                  </div>
                ))}
              </div>
              {active >= 4 ? (
                <div className="mt-6 rounded-lg border border-border p-4 font-mono text-xs leading-relaxed text-foreground">
                  <p className="font-semibold">TAKEOUT #104 · Sam · 555-201-4488</p>
                  <p>2 × 6-pc Wing Combo — 1 Lemon Pepper, 1 Hot · Fries · Lemonade</p>
                  <p>1 × Fish Sandwich</p>
                  <p className="mt-1 text-muted-foreground">{active >= 5 ? "Sent to kitchen display ✓" : "Created in POS ✓"}</p>
                </div>
              ) : null}
              <div className="mt-6 flex gap-3">
                <button type="button" className="text-sm font-semibold text-muted-foreground disabled:opacity-40" disabled={active === 0} onClick={() => setActive(active - 1)}>← Back</button>
                <button type="button" className="text-sm font-semibold text-accent disabled:opacity-40" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>Next step →</button>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Integration"
            title="From the phone to the POS to the kitchen"
            intro="Takeout only, so the agent stays focused and orders stay accurate."
          />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {integration.map((it, i) => (
              <Card key={it.title} className="p-5">
                <it.icon className="size-5 text-accent" aria-hidden="true" />
                <p className="mt-3 text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Watch it work" title="Real call, POS screen and kitchen display" />
          <Card className="mt-8 grid aspect-video place-items-center p-6 text-center">
            <div>
              <MonitorSmartphone className="mx-auto size-8 text-accent" aria-hidden="true" />
              <p className="mt-3 text-sm text-muted-foreground">
                Screen recording coming soon: a live phone order appearing in the POS and on the kitchen display.
              </p>
            </div>
          </Card>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Full service" title="We set it up for you" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.map((s, i) => (
              <Card key={s.title} className="p-6">
                <p className="font-display text-sm font-semibold text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-base font-semibold text-foreground">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Runs on the Voice Scale plan</h2>
            <p className="mt-4 text-pretty leading-relaxed opacity-80">
              Voice Scale ($349.99/month) includes 800 call minutes per month. Setup — menu training, POS connection,
              kitchen display and optional phone payments — is quoted per restaurant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" variant="onInk" size="lg">Get a setup quote</ButtonLink>
              <ButtonLink to="/pricing" variant="outline" size="lg" className="text-ink-foreground">See all plans</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
