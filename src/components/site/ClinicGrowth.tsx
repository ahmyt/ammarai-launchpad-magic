import { useEffect, useState } from "react";
import { Bell, CalendarCheck, CalendarClock, Clock, Moon, Phone, PhoneForwarded, ShieldAlert, Stethoscope, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function ClinicRoiCalculator() {
  const [value, setValue] = useState(250);
  const [missed, setMissed] = useState(6);
  const [booked, setBooked] = useState(30);
  const lost = Math.round(value * missed * 22 * (booked / 100));
  return (
    <div className="mt-10 grid gap-8 lg:grid-cols-2">
      <div className="space-y-8 border border-border p-6">
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Average first-visit value</span><span className="tabular-nums">{usd(value)}</span></span>
          <Slider className="mt-4" min={50} max={1500} step={10} value={[value]} onValueChange={([v]) => setValue(v ?? 250)} aria-label="Average first-visit value" /></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Missed calls per working day</span><span className="tabular-nums">{missed}</span></span>
          <Slider className="mt-4" min={1} max={40} step={1} value={[missed]} onValueChange={([v]) => setMissed(v ?? 6)} aria-label="Missed calls per working day" /></label>
        <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Missed callers who would have booked</span><span className="tabular-nums">{booked}%</span></span>
          <Slider className="mt-4" min={5} max={80} step={5} value={[booked]} onValueChange={([v]) => setBooked(v ?? 30)} aria-label="Share of missed callers who would book" /></label>
        <p className="text-xs leading-relaxed text-muted-foreground">Estimate only, based on 22 working days a month and the values you enter. It does not include repeat visits or predict your results.</p>
      </div>
      <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
        <div className="border border-border p-6"><p className="eyebrow">Missed bookings</p><p key={missed * booked} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{Math.round(missed * 22 * (booked / 100))}<span className="text-sm text-muted-foreground">/mo</span></p></div>
        <div className="border border-accent bg-accent/10 p-6"><p className="eyebrow">First-visit value at risk</p><p key={lost} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{usd(lost)}<span className="text-sm text-muted-foreground">/mo</span></p></div>
        <div className="border border-border p-6 sm:col-span-2"><p className="eyebrow">Calls reaching voicemail</p>
          <div className="mt-4 h-2 overflow-hidden bg-secondary"><span className="restaurant-bar block h-full bg-accent" style={{ width: `${Math.min(100, (missed / 40) * 100)}%` }} /></div>
          <p className="mt-4 text-sm text-muted-foreground">Callers who reach voicemail often try the next practice on the list. An AI receptionist picks up, answers routine questions and offers an open slot.</p></div>
      </div>
    </div>
  );
}

const pipeline = [
  { icon: Phone, title: "Call answered", body: "The agent greets the caller with your practice name—day, evening or weekend." },
  { icon: UserRound, title: "Reason & details", body: "Collects name, phone, new or returning patient and the reason for the visit." },
  { icon: CalendarClock, title: "Slot offered", body: "Checks your connected calendar and offers available times." },
  { icon: Bell, title: "Confirmed & reminded", body: "Books the visit, reads it back and can follow up with a reminder call." },
];

export function ClinicPipeline() {
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
  without: ["Phones ring while patients wait at the desk", "Callers sit on hold, then hang up", "After-hours calls go to voicemail", "Staff return calls instead of helping patients"],
  with: ["Every call answered, even at 8 am Monday", "Front desk stays with patients in the room", "Evening and weekend callers can book", "Staff get a clear summary of each call"],
};

export function ClinicRush() {
  const [on, setOn] = useState(true);
  const list = on ? rush.with : rush.without;
  return (
    <div className="mt-10">
      <div role="group" aria-label="Compare Monday morning" className="inline-flex border border-border">
        <Button variant="ghost" aria-pressed={!on} onClick={() => setOn(false)} className={cn("rounded-none", !on && "bg-secondary")}>Without AmmarAI</Button>
        <Button variant="ghost" aria-pressed={on} onClick={() => setOn(true)} className={cn("rounded-none", on && "bg-accent text-accent-foreground hover:bg-accent/90")}>With AmmarAI</Button>
      </div>
      <div key={String(on)} className="restaurant-stage mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
        <div className={cn("flex flex-col items-center justify-center gap-4 border p-8", on ? "border-accent" : "border-destructive/50")}>
          <div className={cn("relative grid size-20 place-items-center rounded-full", on ? "bg-accent/15" : "bg-destructive/10")}>
            <Phone className={cn("size-8", on ? "text-accent" : "text-destructive restaurant-ring")} />
            {on ? <span className="restaurant-pulse absolute inset-0 rounded-full border-2 border-accent" aria-hidden="true" /> : null}
          </div>
          <p className="text-center font-semibold">{on ? "Answered. Appointment booked." : "Ringing… 4 callers on hold"}</p>
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
  { icon: Moon, label: "After-hours booking", caller: "Hi, it's 9 pm—can I book a cleaning for next week?", agent: "Of course. I have Tuesday at 10:30 am or Thursday at 2:00 pm. Which works better?", note: "Booked into your calendar; your team sees it in the morning." },
  { icon: CalendarCheck, label: "Reschedule", caller: "I need to move my appointment on Friday.", agent: "No problem. I can confirm your name and date of birth, then offer the next open times.", note: "Identity checks follow the steps your practice defines." },
  { icon: Stethoscope, label: "Insurance question", caller: "Do you take Delta Dental?", agent: "Our practice lists Delta Dental as accepted. Coverage depends on your plan, so our team can confirm details before your visit.", note: "Example only — the agent answers from the insurance list your practice approves." },
  { icon: ShieldAlert, label: "Urgent symptoms", caller: "I have severe chest pain right now.", agent: "Please hang up and call 911 now. I'm not able to give medical advice.", note: "Emergency wording is set by your practice; the agent never diagnoses." },
];

export function ClinicScenarios() {
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

export function ClinicSafetyNet() {
  const items = [
    { icon: PhoneForwarded, title: "Warm transfer", body: "Callers who ask for a person, or anything outside approved topics, can be routed to your team." },
    { icon: ShieldAlert, title: "No medical advice", body: "The agent does not diagnose, triage or advise on treatment. Emergency callers are told to call 911." },
    { icon: UserRound, title: "Call summaries", body: "Every call is logged with the caller's request so staff can follow up quickly." },
  ];
  return (
    <div className="mt-10 grid gap-5 md:grid-cols-3">
      {items.map((it) => (
        <div key={it.title} className="restaurant-lift border border-border p-6"><it.icon className="size-5 text-accent" /><h3 className="mt-4 text-lg">{it.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.body}</p></div>
      ))}
    </div>
  );
}
