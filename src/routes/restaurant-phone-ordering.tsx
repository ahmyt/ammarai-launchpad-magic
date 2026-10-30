import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChefHat, CreditCard, MessageSquare, Mic, MonitorSmartphone, Phone, Receipt, ShieldCheck, Utensils } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink } from "@/components/site/Button";
import { PhoneDemoButton } from "@/components/site/PhoneDemoDialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RestaurantOnboarding, RestaurantConnections } from "@/components/site/RestaurantVisuals";
import { RestaurantRoiCalculator, RestaurantRush, RestaurantUpsell, RestaurantScenarios, RestaurantPipeline, RestaurantSafetyNet } from "@/components/site/RestaurantGrowth";
import { ChatbotTryButton } from "@/components/site/LiveChatbot";
import { restaurantOffer } from "@/data/restaurant-offer";
import restaurantImage from "@/assets/anchor-restaurant.jpg";
import callPoster from "@/assets/anchor-call-poster.jpg";
import callVideo from "@/assets/anchor-fish-wings-call-demo.mp4.asset.json";
import { assetUrl } from "@/lib/asset-url";

const url = "https://ammarai.com/restaurant-phone-ordering";
const title = "AI Restaurant Phone Ordering Agent with POS & KDS | AmmarAI";
const description =
  "An AI phone agent that answers restaurant calls, takes takeout orders, confirms them, creates the order in your POS and sends it to the kitchen display.";

type Step = { title: string; speaker: "agent" | "caller" | "system"; lines: { who: string; text: string }[] };

const steps: Step[] = [
  {
    title: "Greet the caller",
    speaker: "agent",
    lines: [{ who: "Agent", text: "Thanks for calling Anchor Fish & Wings! I can take your takeout order. What would you like today?" }],
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
  if (!step) return null;

  return (
    <>
      <section className="restaurant-hero">
        <img src={restaurantImage} alt="Fish and wings takeout counter with a POS terminal and kitchen display" width={1536} height={1024} fetchPriority="high" className="restaurant-hero-image" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / For restaurants</p>
          <div className="mt-10 max-w-2xl">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">AI restaurant phone ordering</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">Every takeout call answered. Every confirmed order sent to your POS and kitchen. Your team stays focused on the food.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/contact" search={{ topic: "restaurant" } as never} size="lg"><Phone className="size-4" />Book a restaurant setup call</ButtonLink>
              <a href="#restaurant-demo" className="restaurant-hero-link"><ArrowRight className="size-4" />Explore the demo</a>
            </div>
            <p className="mt-6 text-sm">${restaurantOffer.monthlyPrice}/month · Unlimited inbound calls · Zero per-order commissions</p>
          </div>
        </Container>
      </section>
      <div className="border-b border-border bg-secondary/40">
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-semibold">
          <span className="flex items-center gap-2"><Utensils className="size-4 text-accent" />Your menu, your rules</span>
          <span className="flex items-center gap-2"><Phone className="size-4 text-accent" />Keep your existing number</span>
          <span className="flex items-center gap-2"><Receipt className="size-4 text-accent" />POS & kitchen workflow</span>
        </Container>
      </div>

      <Section tone="sand" id="restaurant-demo">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Restaurant Phone Ordering" }]} />
          <SectionHeading
            className="mt-8"
            eyebrow="Anchor Fish & Wings · Fictional demo restaurant"
            title="From the first hello to the kitchen ticket"
            intro="An illustrative takeout conversation—not a live transaction. Confirm items, modifiers and customer details before sending an order."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Button
                    variant="ghost"
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={i === active ? "step" : undefined}
                    className={cn(
                      "h-auto min-h-14 w-full justify-start gap-4 whitespace-normal rounded-lg border px-4 py-3 text-left text-sm transition-colors",
                      i === active ? "border-accent bg-card text-foreground" : "border-border text-muted-foreground hover:bg-card",
                    )}
                  >
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums", i <= active ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground")}>
                      {i < active ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="font-semibold">{s.title}</span>
                  </Button>
                </li>
              ))}
            </ol>

            <div className="border-t-2 border-accent bg-background p-6 sm:p-8">
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
                <Button variant="ghost" aria-label="Previous call step" disabled={active === 0} onClick={() => setActive(active - 1)}><ArrowLeft />Back</Button>
                <Button variant="outline" disabled={active === steps.length - 1} onClick={() => setActive(active + 1)}>Next step<ArrowRight /></Button>
              </div>
            </div>
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
          <SectionHeading eyebrow="Missed-call calculator" title="What are unanswered calls costing you?" intro="Move the sliders to estimate the takeout revenue that rings out during busy hours." />
          <RestaurantRoiCalculator />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Order flow" title="From ring to kitchen ticket" intro="Follow one confirmed order through every step. Tap any step to pause." />
          <RestaurantPipeline />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Friday night rush" title="Your busiest hour, before and after" intro="Switch between the two to see what changes at the counter." />
          <RestaurantRush />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Smart add-ons" title="Bigger tickets, without the pushy sell" intro="Busy staff often skip add-ons. The agent offers the ones you choose, every time." />
          <RestaurantUpsell />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Call scenarios" title="Hear how it handles the tricky calls" intro="Pick a situation your staff deals with every week." />
          <RestaurantScenarios />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="POS connections" title="Your phone agent. Your POS." intro="A tested AymarPOS order flow, plus API-based options we assess for your restaurant. API availability does not mean an integration is already live." />
          <RestaurantConnections />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Full-service onboarding" title="From your menu to your first call" intro="We handle training, connection setup and launch testing with your team. Timing depends on menu complexity, phone provider and POS access." />
          <RestaurantOnboarding />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="The complete picture" title="One call. Three connected moments." intro="A real test call recording: the AI agent takes the order, the ticket reaches the POS and kitchen, and the customer receives an update." />
          <figure className="mt-10 border border-border">
            <video className="aspect-video w-full bg-secondary" controls preload="none" playsInline poster={callPoster} src={assetUrl(callVideo.url)}>
              Your browser does not support video playback.
            </video>
            <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Recorded test call · Anchor Fish & Wings demo menu · 2 min 41 s</figcaption>
          </figure>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <div className="border border-border p-6"><Phone className="size-6 text-accent" /><p className="mt-5 text-xs text-muted-foreground">01 / THE CALL</p><h3 className="mt-2 text-lg">Anchor Fish & Wings</h3><div className="restaurant-wave my-5 flex h-10 items-center gap-1" aria-hidden="true">{Array.from({length: 16}, (_, i) => <span key={i} className="w-1 flex-1 bg-accent" />)}</div><p className="text-sm leading-relaxed text-muted-foreground">“Two wing combos and a fish sandwich. Is that correct?”</p></div>
            <div className="border border-border p-6"><MonitorSmartphone className="size-6 text-accent" /><p className="mt-5 text-xs text-muted-foreground">02 / POS → KITCHEN</p><h3 className="mt-2 text-lg">Order #104</h3><div className="my-5 space-y-3 border-y border-dashed border-border py-4 text-sm"><p>2 × Wing combo</p><p>1 × Fish sandwich</p><p className="flex items-center gap-2 text-success"><Check className="size-4" />Confirmed → kitchen ticket</p></div><p className="text-xs text-muted-foreground">Example ticket · Not a live order</p></div>
            <div className="border border-border p-6"><MessageSquare className="size-6 text-accent" /><p className="mt-5 text-xs text-muted-foreground">03 / CUSTOMER UPDATE</p><h3 className="mt-2 text-lg">Pickup confirmed</h3><p className="my-5 border-l-2 border-accent bg-secondary/50 p-4 text-sm leading-relaxed">Anchor Fish & Wings: your order #104 is confirmed. Your pickup details will appear here.</p><p className="text-xs leading-relaxed text-muted-foreground">Optional SMS requires a configured messaging service and customer consent; not active in this preview.</p></div>
          </div>
          <div className="mt-10 flex flex-col justify-between gap-6 border-y border-border py-8 md:flex-row md:items-center">
            <div className="max-w-xl"><p className="eyebrow">Speak with AmmarAI</p><h3 className="mt-3 text-2xl">Try a live AI conversation</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Tap the voice button on this page to talk to the Anchor Fish & Wings agent from your browser. Orders placed in this demo are for testing only.</p></div>
            <div className="flex shrink-0 flex-col gap-3"><PhoneDemoButton label="Call the Anchor Fish demo" agentName="Anchor Fish & Wings" phoneNumber={restaurantOffer.demoPhone} phoneNumberFormatted={restaurantOffer.demoPhoneFormatted} /><ChatbotTryButton /></div>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Built-in guardrails" title="Your restaurant sets the rules" />
          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            {[
              ["Hours & future pickups", "Configure local opening hours and pickup windows, including the full date and time for tomorrow or a later day."],
              ["Confirm before sending", "Read back items and modifiers. Submit only after the caller confirms. Never guess an unavailable item or price."],
              ["Private order status", "Match the customer-facing order number and phone number before sharing order status or pickup details."],
            ].map(([heading, body]) => <div key={heading} className="border-t border-border pt-5"><ShieldCheck className="size-5 text-accent" /><h3 className="mt-4 text-lg">{heading}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Safety net" title="When a call needs a person" intro="You decide what the agent handles and what goes to your team." />
          <RestaurantSafetyNet />
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">Restaurant phone ordering</h2>
            <p className="mt-6 text-5xl font-semibold">${restaurantOffer.monthlyPrice}<span className="text-base font-normal"> / month</span></p>
            <p className="mt-4 text-pretty leading-relaxed opacity-80">
              Unlimited inbound calls. Zero per-order commissions. Menu training, POS connection and kitchen-workflow testing are included for the agreed setup. We confirm POS compatibility and any optional payment or messaging services before you sign up.
            </p>
            <p className="mt-4 text-sm opacity-80">This is a separate restaurant service, not the general Voice Scale plan. Optional phone payment and SMS are scoped separately; any additional charges require your approval.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" search={{ topic: "restaurant" } as never} variant="onInk" size="lg">Discuss your restaurant</ButtonLink>
              <ButtonLink to="/pricing" variant="outline" size="lg" className="text-ink-foreground">Compare AI workspace plans</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
