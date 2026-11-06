import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Clock, CalendarCheck, ShieldCheck } from "lucide-react";
import { Card, Container, Section, SectionHeading, NumberedList, BulletList } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink } from "@/components/site/Button";
import { PhoneDemoButton } from "@/components/site/PhoneDemoDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { SmallBusinessRoiCalculator, PhoneAgentPipeline, PhoneAgentRush, PhoneAgentScenarios, PhoneAgentSafetyNet } from "@/components/site/PhoneAgentGrowth";
import { agentTools } from "@/data/tools-agents";
import receptionImage from "@/assets/small-business-reception.jpg";
import followupAudio from "@/assets/ai-phone-agent-outbound-followup.mp3.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { plans } from "@/lib/site";

const tool = agentTools.find((t) => t.slug === "ai-phone-agent")!;
const voiceScale = plans.find((p) => p.name === "Voice Scale");
const ultimate = plans.find((p) => p.name === "Ultimate");

const url = "https://ammarai.com/ai-phone-agent";
const title = `${tool.name}: Answer and Make Business Calls | AmmarAI`;
const description =
  "A natural-sounding AI phone agent for small businesses: answers inbound calls, makes outbound follow-up and reminder calls, books into your calendar and logs every conversation. Try the live demo.";

const routeFaqs: { q: string; a: string }[] = [
  {
    q: "Which plan includes the phone agent?",
    a: `The ${ultimate?.name ?? "Ultimate"} plan (${ultimate?.price ?? "$129.99"}/month) includes the AI Phone Call Agent with 120 inbound and outbound minutes. The ${voiceScale?.name ?? "Voice Scale"} plan (${voiceScale?.price ?? "$349.99"}/month) raises that to 800 voice minutes and adds automated follow-up calls.`,
  },
  {
    q: "Can it make outbound calls, not just answer them?",
    a: "Yes. It can call a list for reminders, confirmations and follow-ups, and hand anything that needs a person to your team. The Voice Scale plan adds automated follow-up calls as a built-in feature.",
  },
  {
    q: "Is this the same as the restaurant phone ordering service?",
    a: "No. Restaurant phone ordering is a separate $399/month service with unlimited inbound calls and POS integration. This general phone agent runs on your plan's voice minutes and works for any business type.",
  },
];
const allFaqs = [...(tool.faqs ?? []), ...routeFaqs];

type Step = { title: string; lines: { who: string; text: string }[] };

const steps: Step[] = [
  { title: "Greet the caller", lines: [{ who: "Agent", text: "Thanks for calling Bluebird Home Services. How can I help you today?" }] },
  {
    title: "Understand the request",
    lines: [
      { who: "Caller", text: "Hi, my AC stopped cooling and I'd like someone out this week." },
      { who: "Agent", text: "I can set that up. May I have your name and the best number to reach you?" },
      { who: "Caller", text: "Dana Reeves, 404-555-0147." },
    ],
  },
  {
    title: "Offer available times",
    lines: [
      { who: "Agent", text: "I have Wednesday at 8:00 am or Thursday at 1:00 pm for a diagnostic visit. Which works better?" },
      { who: "Caller", text: "Wednesday morning is good." },
    ],
  },
  {
    title: "Read it back",
    lines: [
      { who: "Agent", text: "So that's a diagnostic visit for Dana Reeves, Wednesday at 8:00 am. Anything else I should pass to the technician?" },
      { who: "Caller", text: "No, that's it." },
    ],
  },
  { title: "Book into the calendar", lines: [{ who: "Calendar", text: "Booking created with name, phone, service type and time window." }] },
  { title: "Confirm and close", lines: [{ who: "Agent", text: "You're booked, Dana. Our technician will call ahead before arriving. Thanks for calling Bluebird!" }] },
];

export const Route = createFileRoute("/ai-phone-agent")({
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
          name: "AI Phone Call Agent",
          provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" },
          description,
          areaServed: "US",
          url,
        }),
      },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd(allFaqs)) },
    ],
  }),
  component: PhoneAgentPage,
});

function PhoneAgentPage() {
  const [active, setActive] = useState(0);
  const step = steps[active] ?? steps[0]!;

  return (
    <>
      <section className="restaurant-hero">
        <img src={receptionImage} alt="A tidy small business front desk with a desk phone, an open appointment planner and a laptop in soft natural light" width={1536} height={1024} fetchPriority="high" className="restaurant-hero-image" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / {tool.name}</p>
          <div className="mt-10 max-w-2xl restaurant-rise">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">{tool.h1}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">{tool.lede}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PhoneDemoButton label="Call the live demo agent" />
              <a href="#phone-demo" className="restaurant-hero-link"><ArrowRight className="size-4" />See a call flow</a>
            </div>
            <p className="mt-6 text-sm">Included from {ultimate?.name ?? "Ultimate"} · {ultimate?.price ?? "$129.99"}/month with 120 minutes · {voiceScale?.name ?? "Voice Scale"} at {voiceScale?.price ?? "$349.99"}/month with 800 minutes</p>
          </div>
        </Container>
      </section>
      <div className="border-b border-border bg-secondary/40">
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-semibold">
          <span className="flex items-center gap-2"><Clock className="size-4 text-accent" />Answers day, evening & weekend</span>
          <span className="flex items-center gap-2"><CalendarCheck className="size-4 text-accent" />Books into your calendar</span>
          <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-accent" />Transfers to a human when needed</span>
        </Container>
      </div>

      <Section tone="sand" id="phone-demo">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI Phone Agent" }]} />
          <SectionHeading className="mt-8" eyebrow="Bluebird Home Services · Fictional demo business" title="From the first ring to a booked job" intro="An illustrative call—not a real customer or live booking." />
          <p className="mt-4 inline-block border border-dashed border-accent px-3 py-2 text-xs text-muted-foreground">Example only: Bluebird Home Services, Dana Reeves and the phone numbers are fictional and used to show how a call flows.</p>
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
            <ol className="space-y-2">
              {steps.map((s, i) => (
                <li key={s.title}>
                  <Button variant="ghost" type="button" onClick={() => setActive(i)} aria-current={i === active ? "step" : undefined}
                    className={cn("h-auto min-h-14 w-full justify-start gap-4 whitespace-normal rounded-lg border px-4 py-3 text-left text-sm transition-colors", i === active ? "border-accent bg-card text-foreground" : "border-border text-muted-foreground hover:bg-card")}>
                    <span className={cn("grid size-7 shrink-0 place-items-center rounded-full text-xs font-semibold tabular-nums", i <= active ? "bg-accent text-accent-foreground" : "bg-secondary text-foreground")}>
                      {i < active ? <Check className="size-3.5" aria-hidden="true" /> : i + 1}
                    </span>
                    <span className="font-semibold">{s.title}</span>
                  </Button>
                </li>
              ))}
            </ol>
            <div key={active} className="restaurant-stage border-t-2 border-accent bg-background p-6 sm:p-8">
              <p className="eyebrow">Step {active + 1} of {steps.length}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
              <div className="mt-6 space-y-3" aria-live="polite">
                {step.lines.map((l, i) => (
                  <div key={l.text} style={{ animationDelay: `${i * 200}ms` }} className={cn("restaurant-rise rounded-lg px-4 py-3 text-sm leading-relaxed", l.who === "Caller" ? "ml-8 bg-secondary text-foreground" : l.who === "Agent" ? "mr-8 bg-accent/10 text-foreground" : "border border-dashed border-accent bg-card text-foreground")}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{l.who}</p>
                    <p className="mt-1">{l.text}</p>
                  </div>
                ))}
              </div>
              {active >= 4 ? (
                <div className="restaurant-rise mt-6 rounded-lg border border-border p-4 font-mono text-xs leading-relaxed text-foreground">
                  <p className="font-semibold">WED 8:00 AM · Dana Reeves · 404-555-0147</p>
                  <p>Diagnostic visit · AC not cooling</p>
                  <p className="mt-1 text-muted-foreground">{active >= 5 ? "Confirmed · summary saved ✓" : "Added to calendar ✓"}</p>
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
          <SectionHeading eyebrow="What it does" title="One agent, both directions" intro="Inbound and outbound calling, with every call logged." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {tool.canDo.map((item, i) => (
              <Card key={item} className="restaurant-lift p-5">
                <p className="text-xs font-semibold text-muted-foreground tabular-nums">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-2 text-sm font-semibold leading-relaxed text-foreground">{item}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Missed-call calculator" title="What are unanswered calls costing your business?" intro="Move the sliders to estimate jobs that go to voicemail." />
          <SmallBusinessRoiCalculator />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Booking flow" title="From ring to confirmed booking" intro="Follow one call through every step. Tap any step to pause." />
          <PhoneAgentPipeline />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Mid-job Monday" title="Your busiest hour, before and after" intro="Switch between the two to see what changes when you're the one holding the wrench." />
          <PhoneAgentRush />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Call scenarios" title="How it handles the calls you get every week" intro="Pick a situation." />
          <PhoneAgentScenarios />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Safety net" title="Your business sets the rules" intro="You decide what the agent handles and what goes to your team." />
          <PhoneAgentSafetyNet />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Audio sample" title="Hear an outbound call" intro="A real recording from an AmmarAI phone agent." />
          <figure className="mt-10 max-w-3xl border border-border p-6">
            <p className="eyebrow">Outbound follow-up</p>
            <div className="restaurant-wave my-5 flex h-10 items-center gap-1" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} className="w-1 flex-1 bg-accent" />)}</div>
            <audio controls preload="none" src={assetUrl(followupAudio.url)} className="w-full">Your browser does not support audio playback.</audio>
            <figcaption className="mt-3 text-sm text-muted-foreground">The agent calls a customer, continues the conversation naturally and records the outcome for the team.</figcaption>
          </figure>
          <div className="mt-10 flex flex-col justify-between gap-6 border-y border-border py-8 md:flex-row md:items-center">
            <div className="max-w-xl"><p className="eyebrow">Try it yourself</p><h3 className="mt-3 text-2xl">Call the live demo agent</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Talk to an AmmarAI phone agent right now — no account needed.</p></div>
            <PhoneDemoButton label="Show the demo phone number" />
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Step by step" title="How to set up your phone agent" intro="Give it a number, a job description and a voice, then let it take the calls." />
          <NumberedList items={tool.how} />
          <div className="mt-8 border-l-2 border-accent pl-6">
            <h3 className="text-xl font-semibold">Follow the illustrated tutorial</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">See the actual agent form — greeting, instructions, language, duration and voice — with screenshots from AmmarAI.</p>
            <Link to="/tutorials/$slug" params={{ slug: "how-to-create-an-ai-phone-agent" }} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline">Read the AI phone agent tutorial<ArrowRight className="size-4" /></Link>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-12 md:grid-cols-2">
          <div><h2 className="text-2xl sm:text-3xl">Tips that make it sound human</h2><BulletList items={tool.tips ?? []} className="mt-5" /></div>
          <div><h2 className="text-2xl sm:text-3xl">Mistakes worth avoiding</h2><BulletList items={tool.mistakes ?? []} className="mt-5" /></div>
        </Container>
      </Section>

      <Section tone="sand" id="phone-faq">
        <Container size="narrow"><FaqAccordion heading="AI Phone Agent FAQ" items={allFaqs} /></Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Tools to try next" title="Finish the rest of your front-office workflow" />
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { slug: "ai-crm", name: "AI CRM", body: "Every call lands against the right contact, with transcripts and summaries." },
              { slug: "ai-agent-builder", name: "AI Agent Builder", body: "Automate the follow-up work that happens after the call." },
              { slug: "ai-voice-generator", name: "AI Voice Generator", body: "Prepare voiceovers and messages in the same voice family." },
            ].map((item) => (
              <div key={item.slug} className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/$slug" params={{ slug: item.slug }} className="text-foreground hover:text-accent">{item.name}<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p></div>
            ))}
            <div className="border-t border-border pt-5"><h3 className="text-lg font-semibold"><Link to="/clinic-phone-agent" className="text-foreground hover:text-accent">Clinic Phone Agent<ArrowRight className="ml-2 inline size-4" /></Link></h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The same agent, tuned for dental, medical and spa practices.</p></div>
          </div>
        </Container>
      </Section>

      <Section tone="ink">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow">Pricing</p>
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{voiceScale?.name ?? "Voice Scale"} plan</h2>
            <p className="mt-6 text-5xl font-semibold">{voiceScale?.price ?? "$349.99"}<span className="text-base font-normal"> {voiceScale?.period ?? "/month"}</span></p>
            <ul className="mt-6 space-y-2 text-sm">
              {(voiceScale?.features ?? []).map((f) => <li key={f} className="flex items-center gap-2"><Check className="size-4" />{f}</li>)}
            </ul>
            <p className="mt-4 text-pretty text-sm leading-relaxed opacity-80">The phone agent is included from the {ultimate?.name ?? "Ultimate"} plan at {ultimate?.price ?? "$129.99"}/month with 120 minutes; {voiceScale?.name ?? "Voice Scale"} raises it to 800 minutes and adds automated follow-up calls. Tell us about your business, call volume and calendar, and we reply by email within one business day with a setup plan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" search={{ topic: "phone-agent" }} variant="onInk" size="lg">Request a phone agent demo</ButtonLink>
              <ButtonLink to="/restaurant-phone-ordering" variant="outline" size="lg" className="text-ink-foreground">See the restaurant ordering agent</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
