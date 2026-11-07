import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bell, CalendarCheck, Check, Clock, Moon, Phone, ShieldCheck, Stethoscope } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink } from "@/components/site/Button";
import { PhoneDemoButton } from "@/components/site/PhoneDemoDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ClinicPipeline, ClinicRoiCalculator, ClinicRush, ClinicSafetyNet, ClinicScenarios } from "@/components/site/ClinicGrowth";
import clinicImage from "@/assets/clinic-reception.jpg";
import appointmentAudio from "@/assets/ai-phone-agent-clinic-appointment.mp3.asset.json";
import reminderAudio from "@/assets/ai-phone-agent-clinic-reminder.mp3.asset.json";
import { assetUrl, hostedAssetUrl } from "@/lib/asset-url";
import walkthroughVideo from "@/assets/clinic_agent_walkthrough.mp4.asset.json";
import walkthroughPoster from "@/assets/clinic_agent_walkthrough_poster.jpg.asset.json";
import { plans } from "@/lib/site";

const voiceScale = plans.find((p) => p.name === "Voice Scale");

const url = "https://ammarai.com/clinic-phone-agent";
const title = "AI Phone Receptionist for Clinics & Dental Offices | AmmarAI";
const description =
  "An AI phone receptionist for medical, dental and MedSpa practices: answers every call, books appointments into your calendar, handles after-hours callers and sends reminders.";

type Step = { title: string; lines: { who: string; text: string }[] };

const steps: Step[] = [
  { title: "Greet the caller", lines: [{ who: "Agent", text: "Thank you for calling Peachtree Smile Dental. How can I help you today?" }] },
  {
    title: "Understand the request",
    lines: [
      { who: "Caller", text: "Hi, I'd like to book a cleaning. I'm a new patient." },
      { who: "Agent", text: "Welcome! May I have your full name and the best number to reach you?" },
      { who: "Caller", text: "Maya Patel, 404-555-0182." },
    ],
  },
  {
    title: "Offer available times",
    lines: [
      { who: "Agent", text: "I have Tuesday at 10:30 am or Thursday at 2:00 pm with Dr. Lee. Which works better?" },
      { who: "Caller", text: "Thursday at 2 is perfect." },
    ],
  },
  {
    title: "Read it back",
    lines: [
      { who: "Agent", text: "That's a new-patient cleaning for Maya Patel, Thursday at 2:00 pm with Dr. Lee. Is that correct?" },
      { who: "Caller", text: "Yes." },
    ],
  },
  { title: "Book into the calendar", lines: [{ who: "Calendar", text: "Appointment created with patient name, phone, visit type and provider." }] },
  { title: "Confirm and close", lines: [{ who: "Agent", text: "You're booked, Maya. Please arrive 10 minutes early with your ID and insurance card. See you Thursday!" }] },
];

const features = [
  { icon: Phone, title: "Keep your number", body: "Forward your existing line during busy hours, after hours or all the time." },
  { icon: CalendarCheck, title: "Calendar booking", body: "Books, reschedules and cancels using the calendar connection set up for your practice." },
  { icon: Moon, title: "After-hours answering", body: "Evening and weekend callers can still book instead of reaching voicemail." },
  { icon: Bell, title: "Reminder calls", body: "Outbound reminders help patients remember and confirm upcoming visits." },
  { icon: Stethoscope, title: "Trained on your practice", body: "Services, providers, hours, location, accepted insurance and new-patient steps." },
];

export const Route = createFileRoute("/clinic-phone-agent")({
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
          name: "AI Phone Receptionist for Clinics",
          provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" },
          description,
          areaServed: "US",
          url,
        }),
      },
    ],
  }),
  component: ClinicPage,
});

function ClinicPage() {
  const [active, setActive] = useState(0);
  const step = steps[active];
  if (!step) return null;

  return (
    <>
      <section className="restaurant-hero">
        <img src={clinicImage} alt="Bright dental clinic reception desk with a phone and an appointment calendar on a tablet" width={1536} height={1024} fetchPriority="high" className="restaurant-hero-image" />
        <Container className="relative z-10 py-12 sm:py-16">
          <p className="text-xs font-semibold uppercase tracking-wide">AmmarAI / For clinics</p>
          <div className="mt-10 max-w-2xl restaurant-rise">
            <h1 className="text-balance text-4xl leading-tight sm:text-5xl">The AI phone receptionist for your practice</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed">Every patient call answered. Appointments booked into your calendar, after-hours callers handled, reminders sent—so your front desk can focus on the people in the room.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink to="/contact" search={{ topic: "clinic" } as never} size="lg"><Phone className="size-4" />Request a clinic demo</ButtonLink>
              <a href="#clinic-demo" className="restaurant-hero-link"><ArrowRight className="size-4" />Explore the demo</a>
            </div>
            <p className="mt-6 text-sm">{voiceScale?.price ?? "$349.99"}/month · 800 voice minutes · Reminder &amp; confirmation calls</p>
            <p className="mt-2 text-sm">Dental · Medical · MedSpa · Physical therapy · Veterinary</p>
            <p className="mt-2 text-sm">No call needed — we handle the consultation by email or chat and reply within one business day.</p>
          </div>
        </Container>
      </section>
      <div className="border-b border-border bg-secondary/40">
        <Container className="flex flex-wrap gap-x-8 gap-y-3 py-5 text-sm font-semibold">
          <span className="flex items-center gap-2"><Clock className="size-4 text-accent" />Answers day, evening & weekend</span>
          <span className="flex items-center gap-2"><CalendarCheck className="size-4 text-accent" />Books into your calendar</span>
          <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-accent" />Never gives medical advice</span>
        </Container>
      </div>

      <Section>
        <Container>
          <SectionHeading eyebrow="How-to video" title="Set up your clinic phone agent" intro="Watch the full setup in AmmarAI: agent instructions, voice, calendar booking, and a real test call where the agent books an appointment." />
          <figure className="mt-10 border border-border">
            <video className="aspect-video w-full bg-secondary" controls controlsList="nodownload" preload="none" playsInline poster={hostedAssetUrl(walkthroughPoster.url)} src={hostedAssetUrl(walkthroughVideo.url)}>
              Your browser does not support video playback.
            </video>
            <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">Peachtree Smile Dental demo agent · 3 min 9 s</figcaption>
          </figure>
        </Container>
      </Section>



      <Section tone="sand" id="clinic-demo">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Clinic Phone Agent" }]} />
          <SectionHeading className="mt-8" eyebrow="Peachtree Smile Dental · Fictional demo practice" title="From the first ring to a booked appointment" intro="An illustrative new-patient call—not a real patient or live booking." />
          <p className="mt-4 inline-block border border-dashed border-accent px-3 py-2 text-xs text-muted-foreground">Example only: Peachtree Smile Dental, Dr. Lee, Maya Patel, phone numbers and insurance names are fictional and used to show how a call flows.</p>
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
                  <p className="font-semibold">THU 2:00 PM · Maya Patel · 404-555-0182</p>
                  <p>New patient · Cleaning · Dr. Lee</p>
                  <p className="mt-1 text-muted-foreground">{active >= 5 ? "Confirmed · reminder scheduled ✓" : "Added to calendar ✓"}</p>
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
          <SectionHeading eyebrow="What it handles" title="Your front desk, always available" intro="Set up around your services, providers and booking rules." />
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((it, i) => (
              <Card key={it.title} className="restaurant-lift p-5">
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
          <SectionHeading eyebrow="Missed-call calculator" title="What are unanswered calls costing your practice?" intro="Move the sliders to estimate first visits that go to voicemail." />
          <ClinicRoiCalculator />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Booking flow" title="From ring to confirmed visit" intro="Follow one appointment through every step. Tap any step to pause." />
          <ClinicPipeline />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Calendar & practice software" title="Works with the schedule you already use" intro="No server changes and no new system for your team to learn." />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", title: "Google Calendar & Outlook", body: "Two-way sync with Google Calendar, Outlook / Microsoft 365 and Apple Calendar. The agent only offers open times, so it never double-books." },
              { n: "02", title: "Dentrix, Eaglesoft & on-site systems", body: "Your front desk gets an instant text and email with the patient's name, phone, visit reason and time, ready to enter in seconds." },
              { n: "03", title: "Cloud practice software", body: "Bookings can be sent to cloud systems such as Athenahealth, Kareo (Tebra) or Jane App through Zapier or webhooks, set up during onboarding." },
            ].map((it) => (
              <Card key={it.n} className="restaurant-lift p-5">
                <p className="text-xs font-semibold text-muted-foreground tabular-nums">{it.n}</p>
                <h3 className="mt-1 text-base font-semibold text-foreground">{it.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">Direct practice-software connections depend on the system you use. Sending patient details through Zapier requires a plan that supports a signed BAA.</p>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Monday 8 am" title="Your busiest hour, before and after" intro="Switch between the two to see what changes at the front desk." />
          <ClinicRush />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Audio samples" title="Hear it in action" intro="Real recordings from AmmarAI phone agents." />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { src: appointmentAudio.url, label: "Appointment booking", caption: "The agent answers a check-up enquiry, offers an available time and explains what to bring." },
              { src: reminderAudio.url, label: "Reminder call", caption: "The agent calls a patient to remind them about an upcoming appointment." },
            ].map((a) => (
              <figure key={a.label} className="border border-border p-6">
                <p className="eyebrow">{a.label}</p>
                <div className="restaurant-wave my-5 flex h-10 items-center gap-1" aria-hidden="true">{Array.from({ length: 24 }, (_, i) => <span key={i} className="w-1 flex-1 bg-accent" />)}</div>
                <audio controls preload="none" src={assetUrl(a.src)} className="w-full">Your browser does not support audio playback.</audio>
                <figcaption className="mt-3 text-sm text-muted-foreground">{a.caption}</figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 flex flex-col justify-between gap-6 border-y border-border py-8 md:flex-row md:items-center">
            <div className="max-w-xl"><p className="eyebrow">Try it yourself</p><h3 className="mt-3 text-2xl">Call the live demo agent</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Talk to an AmmarAI phone agent right now — no account needed.</p></div>
            <PhoneDemoButton label="Call the clinic demo agent" />
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Call scenarios" title="How it handles the calls your team gets every day" intro="Pick a situation." />
          <ClinicScenarios />
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Safety net" title="Your practice sets the rules" intro="You decide what the agent handles and what goes to your team." />
          <ClinicSafetyNet />
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="More than a phone line" title="Patient communication, in the same plan" intro={`Most answering services stop at the call. Your ${voiceScale?.name ?? "Voice Scale"} plan also includes these AmmarAI tools at no extra cost.`} />
          <BeyondThePhone
            items={[
              { icon: "chat", job: "Website chat & bookings", tool: "Website AI Chatbot & Smart Inbox", to: "/ai-smart-inbox", body: "Answer website questions after hours, offer an appointment slot inside the chat, and read website, WhatsApp and Telegram messages in one inbox.", tutorial: { slug: "how-to-take-bookings-with-your-website-chatbot", label: "See how chat bookings work" } },
              { icon: "newsletter", job: "Newsletters & announcements", tool: "AI Writer", to: "/ai-writer", body: "Draft patient newsletters, seasonal care tips, holiday-hours notices and recall reminders with ready-made email templates." },
              { icon: "social", job: "Social & Google posts", tool: "AI Social Media Agent", to: "/ai-social-media-agent", body: "Plan, write and schedule practice updates and care tips, and review every post before anything goes out.", tutorial: { slug: "how-to-run-a-social-media-agent", label: "See the social media tutorial" } },
            ]}
            note="Use these tools for general education and announcements. Keep patient names, health details and appointment records out of marketing content."
          />
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
            <p className="mt-4 text-pretty text-sm leading-relaxed opacity-80">Includes inbound and outbound calling with automated reminder and confirmation calls. Tell us about your practice, call volume and calendar, and we reply by email within one business day with a setup plan.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink to="/contact" search={{ topic: "clinic" } as never} variant="onInk" size="lg">Request a clinic demo</ButtonLink>
              <ButtonLink to="/ai-phone-agent" variant="outline" size="lg" className="text-ink-foreground">See the general phone agent</ButtonLink>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
