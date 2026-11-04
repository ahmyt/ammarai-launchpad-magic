import { useEffect, useState } from "react";
import { Bell, CalendarClock, ClipboardList, Clock, Moon, Phone, PhoneForwarded, ShieldAlert, UserRound, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function SmallBusinessRoiCalculator() {
  const [value, setValue] = useState(300);
  const [missed, setMissed] = useState(6);
  const [booked, setBooked] = useState(30);
  const lost = Math.round(value * missed * 22 * (booked / 100));
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="space-y-8 border border-border p-6">
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Average job or booking value</span><span className="tabular-nums">{usd(value)}</span></span>
          <Slider className="mt-4" min={50} max={1500} step={10} value={[value]} onValueChange={([v]) => setValue(v ?? 300)} aria-label="Average job or booking value" /></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Missed calls per working day</span><span className="tabular-nums">{missed}</span></span>
          <Slider className="mt-4" min={1} max={40} step={1} value={[missed]} onValueChange={([v]) => setMissed(v ?? 6)} aria-label="Missed calls per working day" /></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Missed callers who would have booked</span><span className="tabular-nums">{booked}%</span></span>
          <Slider className="mt-4" min={5} max={80} step={5} value={[booked]} onValueChange={([v]) => setBooked(v ?? 30)} aria-label="Share of missed callers who would book" /></label>
        <p className="text-xs leading-relaxed text-muted-foreground">Estimate only, based on 22 working days a month and the values you enter. It does not include repeat customers or predict your results.</p>
      </div>
      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
        <div className="border border-border p-6"><p className="eyebrow">Missed bookings</p><p key={missed * booked} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{Math.round(missed * 22 * (booked / 100))}<span className="text-sm text-muted-foreground">/mo</span></p></div>
        <div className="border border-accent bg-accent/10 p-6"><p className="eyebrow">Job value at risk</p><p key={lost} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{usd(lost)}<span className="text-sm text-muted-foreground">/mo</span></p></div>
        <div className="border border-border p-6 sm:col-span-2"><p className="eyebrow">Calls reaching voicemail</p>
          <div className="mt-4 h-2 overflow-hidden bg-secondary"><span className="restaurant-bar block h-full bg-accent" style={{ width: `${Math.min(100, (missed / 40) * 100)}%` }} /></div>
          <p className="mt-4 text-sm text-muted-foreground">Callers who reach voicemail usually try the next business on the list. An AI phone agent picks up, answers routine questions and offers an open slot.</p></div>
      </div>
    </div>
  );
}

const pipeline = [
  { icon: Phone, title: "Call answered", body: "The agent greets the caller with your business name—day, evening or weekend." },
  { icon: UserRound, title: "Reason & details", body: "Collects the caller's name, phone number and what they need, in normal conversation." },
  { icon: CalendarClock, title: "Slot offered", body: "Checks your connected calendar and offers times you can actually staff." },
  { icon: ClipboardList, title: "Confirmed & logged", body: "Books or records the request, then saves a transcript, summary and next step." },
];

export function PhoneAgentPipeline() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % pipeline.length), 2600);
    return () => window.clearInterval(t);
  }, [paused]);
  const step = pipeline[active]!;
  return (
    <div className="mt-10">
      <div className="restaurant-timeline">
        {pipeline.map((p, i) => (
          <Button key={p.title} variant="ghost" onClick={() => { setActive(i); setPaused(true); }} aria-pressed={i === active} className={cn("restaurant-timeline-tab", i === active && "is-active")}>
            <span className="restaurant-step-icon"><p.icon className="size-5" /></span>
            <span className="text-sm font-semibold">{p.title}</span>
          </Button>
        ))}
      </div>
      <div key={active} className="restaurant-stage grid gap-6 border border-t-0 border-border p-6 sm:p-8 md:grid-cols-[auto_1fr] md:items-center">
        <div className="relative grid size-20 place-items-center rounded-full bg-accent/15">
          <step.icon className="size-8 text-accent" />
          <span className="restaurant-pulse absolute inset-0 rounded-full border-2 border-accent" aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Step {active + 1} of {pipeline.length}</p>
          <h3 className="mt-2 text-xl font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          <div className="restaurant-signal mt-5 h-1 overflow-hidden bg-secondary"><span className="block h-full w-1/4 bg-accent" /></div>
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">{paused ? "Paused. " : ""}Tap any step to pause.</p>
    </div>
  );
}

const rush = {
  without: ["The phone rings while you're mid-job", "Callers sit in a queue, then hang up", "Evening calls go to voicemail", "You call back into a busy line and play phone tag"],
  with: ["Every call answered, even mid-job", "One call at a time answered, with no queue", "Evening and weekend callers can book", "You get a clear summary of every call"],
};

export function PhoneAgentRush() {
  const [on, setOn] = useState(true);
  const list = on ? rush.with : rush.without;
  return (
    <div className="mt-10">
      <div role="group" aria-label="Compare a busy stretch" className="inline-flex border border-border">
        <Button variant="ghost" aria-pressed={!on} onClick={() => setOn(false)} className={cn("rounded-none", !on && "bg-secondary")}>Without AmmarAI</Button>
        <Button variant="ghost" aria-pressed={on} onClick={() => setOn(true)} className={cn("rounded-none", on && "bg-accent text-accent-foreground hover:bg-accent/90")}>With AmmarAI</Button>
      </div>
      <div key={String(on)} className="restaurant-stage mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className={cn("flex flex-col items-center justify-center gap-4 border p-8", on ? "border-accent" : "border-destructive/50")}>
          <div className={cn("relative grid size-20 place-items-center rounded-full", on ? "bg-accent/15" : "bg-destructive/10")}>
            <Phone className={cn("size-8", on ? "text-accent" : "text-destructive restaurant-ring")} />
            {on ? <span className="restaurant-pulse absolute inset-0 rounded-full border-2 border-accent" aria-hidden="true" /> : null}
          </div>
          <p className="text-center font-semibold">{on ? "Answered. Booking taken." : "Ringing… straight to voicemail"}</p>
        </div>
        <ul className="space-y-3">
          {list.map((t, i) => (
            <li key={t} style={{ animationDelay: `${i * 90}ms` }} className="restaurant-rise flex items-start gap-3 border-b border-border pb-3 text-sm">
              <Clock className={cn("mt-0.5 size-4 shrink-0", on ? "text-accent" : "text-destructive")} />{t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const scenarios = [
  { icon: Moon, label: "After-hours booking", caller: "Hi, it's 7 pm on a Friday—I need someone Saturday morning.", agent: "I can help with that. I have Saturday at 9:00 am or 11:30 am. Which works better?", note: "Booked into your calendar; you see it before Saturday opens." },
  { icon: Wrench, label: "Price question", caller: "How much for a service call?", agent: "A standard service call is listed at the price your business approves. If a quote needs a person, I'll take the details and pass it to your team.", note: "The agent answers from the prices and services you approve—it never invents a price." },
  { icon: CalendarClock, label: "Reschedule", caller: "I need to move my Thursday appointment.", agent: "No problem. Can I confirm your name and phone number, then I'll offer the next open times.", note: "Identity checks and change rules follow the steps you define." },
  { icon: ShieldAlert, label: "Upset customer", caller: "I've been waiting three days for a callback and I'm not happy.", agent: "I'm sorry about the wait. I don't want to guess at the answer, so I'm transferring you to someone on the team now.", note: "Complaints and anything about money transfer to a person by default." },
];

export function PhoneAgentScenarios() {
  const [i, setI] = useState(0);
  const s = scenarios[i]!;
  return (
    <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
      <div className="grid gap-2">
        {scenarios.map((sc, idx) => (
          <Button key={sc.label} variant="ghost" onClick={() => setI(idx)} aria-pressed={idx === i} className={cn("h-auto min-h-14 justify-start gap-3 rounded-lg border px-4 py-3 text-left text-sm", idx === i ? "border-accent bg-card" : "border-border text-muted-foreground")}>
            <sc.icon className="size-4 text-accent" />{sc.label}
          </Button>
        ))}
      </div>
      <div key={i} className="restaurant-stage space-y-3 border-t-2 border-accent bg-background p-6">
        <div className="restaurant-rise ml-8 rounded-lg bg-secondary px-4 py-3 text-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Caller</p><p className="mt-1">{s.caller}</p></div>
        <div style={{ animationDelay: "250ms" }} className="restaurant-rise mr-8 rounded-lg bg-accent/10 px-4 py-3 text-sm"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Agent</p><p className="mt-1">{s.agent}</p></div>
        <p style={{ animationDelay: "500ms" }} className="restaurant-rise border border-dashed border-accent p-3 text-xs text-muted-foreground">{s.note}</p>
      </div>
    </div>
  );
}

export function PhoneAgentSafetyNet() {
  const items = [
    { icon: PhoneForwarded, title: "Warm transfer", body: "Callers who ask for a person, or anything outside approved topics, can be routed to your team." },
    { icon: ShieldAlert, title: "Approved answers only", body: "It answers from the information you approve. It doesn't invent prices, promise discounts or guess at jobs it hasn't seen." },
    { icon: Bell, title: "Full call records", body: "Every call leaves a recording, transcript, short summary and outcome against the right contact." },
  ];
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.title} className="restaurant-lift border border-border p-6"><it.icon className="size-5 text-accent" /><h3 className="mt-4 text-lg">{it.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p></div>
      ))}
    </div>
  );
}
