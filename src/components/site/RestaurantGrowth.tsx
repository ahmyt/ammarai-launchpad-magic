import { useEffect, useState } from "react";
import { Bell, ChefHat, Clock, MessageSquare, Mic, Phone, PhoneForwarded, Plug, Receipt, ShieldCheck, Sparkles, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { missedCallEstimate, restaurantOffer } from "@/data/restaurant-offer";

const usd = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function RestaurantRoiCalculator() {
  const [ticket, setTicket] = useState(40);
  const [missed, setMissed] = useState(8);
  const r = missedCallEstimate(ticket, missed);
  const appFee = Math.round(r.recoverable * 0.25);
  return <div className="mt-10 grid gap-8 lg:grid-cols-2">
    <div className="space-y-8 border border-border p-6">
      <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Average takeout ticket</span><span className="tabular-nums">{usd(ticket)}</span></span>
        <Slider className="mt-4" min={20} max={80} step={1} value={[ticket]} onValueChange={([v]) => setTicket(v ?? 40)} aria-label="Average takeout ticket" /></label>
      <label className="block"><span className="flex justify-between text-sm font-semibold"><span>Missed calls per day</span><span className="tabular-nums">{missed}</span></span>
        <Slider className="mt-4" min={1} max={30} step={1} value={[missed]} onValueChange={([v]) => setMissed(v ?? 8)} aria-label="Missed calls per day" /></label>
      <p className="text-xs leading-relaxed text-muted-foreground">Estimate only. Assumes every missed call was a potential order, 30 days a month, and that about 85% could be answered and converted. Your results depend on your menu and callers.</p>
    </div>
    <div aria-live="polite" className="grid gap-4 sm:grid-cols-2">
      <div className="border border-border p-6"><p className="eyebrow">Possible missed revenue</p><p key={r.lost} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{usd(r.lost)}<span className="text-sm text-muted-foreground">/mo</span></p></div>
      <div className="border border-accent bg-accent/10 p-6"><p className="eyebrow">Recoverable estimate</p><p key={r.recoverable} className="restaurant-count mt-3 text-3xl font-semibold tabular-nums">{usd(r.recoverable)}<span className="text-sm text-muted-foreground">/mo</span></p></div>
      <div className="border border-border p-6 sm:col-span-2"><p className="eyebrow">Break-even</p><p className="mt-3 text-lg"><span className="font-semibold tabular-nums">{r.breakEvenOrders} orders a month</span> cover the flat {usd(restaurantOffer.monthlyPrice)} plan.</p>
        <div className="mt-4 h-2 overflow-hidden bg-secondary"><span className="restaurant-bar block h-full bg-accent" style={{ width: `${Math.min(100, (r.breakEvenOrders / Math.max(1, missed * 30)) * 100)}%` }} /></div>
        <p className="mt-4 text-sm text-muted-foreground">A delivery app charging around 25% on the same orders would take about <span className="font-semibold text-foreground tabular-nums">{usd(appFee)}</span>. AmmarAI charges $0 per order.</p></div>
    </div>
  </div>;
}

const rush = {
  without: ["Phone rings while the line is out the door", "Cashier holds the phone and rings up a guest", "Modifiers scribbled on paper, misheard", "Callers wait on hold or hang up"],
  with: ["Every call answered on the first ring", "Counter team stays with in-person guests", "Confirmed ticket sent to the kitchen digitally", "Callers get the order number and pickup time"],
};

export function RestaurantRush() {
  const [on, setOn] = useState(true);
  const list = on ? rush.with : rush.without;
  return <div className="mt-10">
    <div role="group" aria-label="Compare Friday rush" className="inline-flex border border-border">
      <Button variant="ghost" aria-pressed={!on} onClick={() => setOn(false)} className={cn("rounded-none", !on && "bg-secondary")}>Without AmmarAI</Button>
      <Button variant="ghost" aria-pressed={on} onClick={() => setOn(true)} className={cn("rounded-none", on && "bg-accent text-accent-foreground hover:bg-accent/90")}>With AmmarAI</Button>
    </div>
    <div key={String(on)} className="restaurant-stage mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr]">
      <div className={cn("flex flex-col items-center justify-center gap-4 border p-8", on ? "border-accent" : "border-destructive/50")}>
        <div className={cn("relative grid size-20 place-items-center rounded-full", on ? "bg-accent/15" : "bg-destructive/10")}>
          <Phone className={cn("size-8", on ? "text-accent" : "text-destructive restaurant-ring")} />
          {on ? <span className="restaurant-pulse absolute inset-0 rounded-full border-2 border-accent" aria-hidden="true" /> : null}
        </div>
        <p className="text-center font-semibold">{on ? "Answered. Order confirmed." : "Ringing… 3 callers waiting"}</p>
      </div>
      <ul className="space-y-3">{list.map((t, i) => <li key={t} style={{ animationDelay: `${i * 90}ms` }} className="restaurant-rise flex items-start gap-3 border-b border-border pb-3 text-sm">{on ? <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" /> : <Clock className="mt-0.5 size-4 shrink-0 text-destructive" />}{t}</li>)}</ul>
    </div>
  </div>;
}

const baseItems = [["10-pc Wings", 14.99]] as const;
const upsells = [["Make it a combo (fries)", 3.5], ["Peach sweet tea", 2.0], ["2 × extra dipping sauce", 1.0]] as const;

export function RestaurantUpsell() {
  const [added, setAdded] = useState(0);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setAdded(upsells.length); return; }
    const id = window.setInterval(() => setAdded((a) => (a >= upsells.length ? 0 : a + 1)), 1600);
    return () => window.clearInterval(id);
  }, []);
  const base = baseItems[0][1];
  const total = base + upsells.slice(0, added).reduce((s, [, p]) => s + p, 0);
  const lift = Math.round(((total - base) / base) * 100);
  return <div className="mt-10 grid gap-8 md:grid-cols-2">
    <div className="border border-border p-6">
      <div className="flex items-center gap-2 text-sm font-semibold"><Mic className="size-4 text-accent" />Agent</div>
      <p className="mt-3 rounded-lg bg-accent/10 p-4 text-sm leading-relaxed">“Would you like to make that a combo with fries and a peach sweet tea? Any extra sauce on the side?”</p>
      <p className="mt-4 text-xs leading-relaxed text-muted-foreground">One polite offer per order, based on add-ons you choose. Illustrative prices; your menu sets the real ones.</p>
    </div>
    <div className="border border-border p-6 font-mono text-sm" aria-live="polite">
      <div className="flex justify-between"><span>{baseItems[0][0]}</span><span>${base.toFixed(2)}</span></div>
      {upsells.map(([n, p], i) => <div key={n} className={cn("flex justify-between transition-all duration-500", i < added ? "mt-2 opacity-100 text-accent" : "h-0 overflow-hidden opacity-0")}><span>+ {n}</span><span>${p.toFixed(2)}</span></div>)}
      <div className="mt-4 flex items-end justify-between border-t border-dashed border-border pt-4"><span className="font-sans font-semibold">Ticket total</span><span className="text-2xl font-semibold tabular-nums">${total.toFixed(2)}</span></div>
      <p className="mt-2 text-right font-sans text-xs font-semibold text-success">{lift > 0 ? `+${lift}% on this example order` : "\u00a0"}</p>
    </div>
  </div>;
}

const scenarios = [
  { label: "Custom modifiers", caller: "10 wings, all flats, lemon pepper extra wet, fries well done.", agent: "Got it: 10 flats, lemon pepper extra wet, well-done fries. Anything to drink?" },
  { label: "Order status", caller: "Where's my order 104?", agent: "I can check. What phone number is on the order? … Thanks, it's being prepared and should be ready around 6:40 PM." },
  { label: "After hours", caller: "Can I order now? It's 10:45.", agent: "We're closed for ordering right now. We open at 10 AM — please call back then." },
  { label: "Allergy question", caller: "What oil do you fry the fish in?", agent: "I'll answer from the information the restaurant provided, and if I'm unsure I'll say so rather than guess." },
];

export function RestaurantScenarios() {
  const [a, setA] = useState(0);
  const s = scenarios[a];
  if (!s) return null;
  return <div className="mt-10">
    <div role="tablist" aria-label="Call scenarios" className="flex flex-wrap gap-2">
      {scenarios.map((x, i) => <Button key={x.label} role="tab" aria-selected={a === i} variant="outline" onClick={() => setA(i)} className={cn(a === i && "border-accent bg-accent/10")}>{x.label}</Button>)}
    </div>
    <div key={a} role="tabpanel" className="mt-6 space-y-3 border border-border p-6">
      <div className="restaurant-rise ml-8 rounded-lg bg-secondary p-4 text-sm"><p className="text-xs font-semibold uppercase text-muted-foreground">Caller</p><p className="mt-1">{s.caller}</p></div>
      <div className="restaurant-rise mr-8 rounded-lg bg-accent/10 p-4 text-sm" style={{ animationDelay: "350ms" }}>
        <p className="flex items-center gap-3 text-xs font-semibold uppercase text-muted-foreground">Agent<span className="restaurant-wave inline-flex h-3 items-end gap-0.5" aria-hidden="true">{[0, 1, 2, 3, 4].map((k) => <span key={k} className="w-0.5 bg-accent" style={{ animationDelay: `${k * 120}ms` }} />)}</span></p>
        <p className="mt-1">{s.agent}</p></div>
      <p className="pt-2 text-xs text-muted-foreground">Written examples of agent behavior. Call the demo line above to hear the real voice.</p>
    </div>
  </div>;
}

const pipeline = [
  { icon: Phone, title: "Caller", body: "Customer calls your existing number." },
  { icon: Mic, title: "Voice agent", body: "Takes the order, reads it back and gets a yes." },
  { icon: Plug, title: "POS", body: "Confirmed items are created with your menu IDs." },
  { icon: ChefHat, title: "Kitchen", body: "Ticket reaches the kitchen display or printer." },
  { icon: MessageSquare, title: "Customer", body: "Order number and pickup time confirmed." },
];

export function RestaurantPipeline() {
  const [a, setA] = useState(0);
  const [auto, setAuto] = useState(true);
  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setA((x) => (x + 1) % pipeline.length), 1800);
    return () => window.clearInterval(id);
  }, [auto]);
  const step = pipeline[a];
  return <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
    <div>
      <ol className="restaurant-pipe grid grid-cols-5 gap-2">
        {pipeline.map((p, i) => <li key={p.title}><button type="button" onClick={() => { setAuto(false); setA(i); }} aria-current={a === i ? "step" : undefined} className={cn("flex w-full flex-col items-center gap-2 text-center text-xs font-semibold", i <= a ? "text-foreground" : "text-muted-foreground")}>
          <span className={cn("relative grid size-12 place-items-center rounded-full border-2 bg-card transition-colors sm:size-14", i <= a ? "border-accent" : "border-border")}><p.icon className={cn("size-5", i <= a && "text-accent")} />{a === i ? <span className="restaurant-pulse absolute inset-0 rounded-full border-2 border-accent" aria-hidden="true" /> : null}</span>{p.title}</button></li>)}
      </ol>
      <div className="mt-5 h-1 bg-border"><span className="block h-full bg-accent transition-all duration-700" style={{ width: `${(a / (pipeline.length - 1)) * 100}%` }} /></div>
      {step ? <p key={a} className="restaurant-rise mt-5 text-sm leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground">{step.title}:</span> {step.body}</p> : null}
    </div>
    <div className={cn("border-2 border-dashed p-5 font-mono text-xs transition-opacity", a >= 3 ? "border-accent opacity-100" : "border-border opacity-50")} aria-label="Example kitchen ticket">
      <div className="flex items-center justify-between font-sans"><span className="flex items-center gap-2 font-semibold"><Receipt className="size-4" />KOT · Order #104</span><span className={cn("rounded px-2 py-0.5 text-[10px] font-semibold", a >= 3 ? "bg-accent text-accent-foreground" : "bg-secondary")}>{a >= 4 ? "CONFIRMED" : a >= 3 ? "PREPARING" : "WAITING"}</span></div>
      <p className="mt-3 text-muted-foreground">PICKUP · Anchor Fish & Wings</p>
      <div className="mt-3 space-y-1 border-y border-dashed border-border py-3"><p>2 × 6-pc Wing Combo</p><p className="pl-4 text-accent">1 Lemon Pepper · 1 Hot</p><p>1 × Fish Sandwich</p></div>
      <p className="mt-3 flex items-center gap-2"><UserRound className="size-3.5" />Ahmed · ready ~18 min</p>
      <p className="mt-2 text-[10px] text-muted-foreground">Example ticket for illustration.</p>
    </div>
  </div>;
}

export function RestaurantSafetyNet() {
  return <div className="mt-10 grid gap-4 sm:grid-cols-3">
    {[
      [PhoneForwarded, "Transfer to your team", "Manager requests, catering or anything outside the rules can be routed to a number you choose."],
      [Bell, "Callback requests", "If no one can take a transfer, the caller's details can be passed on for a callback (setup required)."],
      [Sparkles, "Never guesses", "Unavailable items, prices or policies are not invented. The agent says it doesn't know."],
    ].map(([Icon, h, b]) => { const I = Icon as typeof Bell; return <div key={h as string} className="restaurant-lift border border-border p-6"><I className="size-6 text-accent" /><h3 className="mt-4 text-lg">{h as string}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b as string}</p></div>; })}
  </div>;
}
