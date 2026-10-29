import { useState } from "react";
import { ArrowRight, Check, FileText, PhoneForwarded, Plug, Rocket, ShieldCheck, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const onboarding = [
  { icon: Utensils, title: "Your menu", label: "01 · Train", body: "Share your menu, modifiers, prices, opening hours and pickup rules. We shape the agent around your restaurant.", details: ["Menu & modifiers", "Opening hours", "Pickup rules"], outcome: "A voice agent that knows your menu" },
  { icon: Plug, title: "Your systems", label: "02 · Connect", body: "We review your POS API access, map menu IDs and connect confirmed orders to the kitchen workflow.", details: ["API access review", "Menu ID mapping", "POS & KDS testing"], outcome: "One confirmed order. No retyping." },
  { icon: PhoneForwarded, title: "Your test line", label: "03 · Rehearse", body: "Your team calls a private test line. Try custom orders, future pickups, closed-hours calls and customer verification before forwarding your number.", details: ["Private test calls", "Staff feedback", "Human handoff rules"], outcome: "Test first. Switch only when ready." },
  { icon: Rocket, title: "Your launch", label: "04 · Go live", body: "Keep your existing number and arrange call forwarding with your phone provider. We review the first calls and fine-tune the experience.", details: ["Existing phone number", "Call forwarding", "Launch review"], outcome: "Your front counter, with fewer interruptions" },
];

export function RestaurantOnboarding() {
  const [active, setActive] = useState(0);
  const step = onboarding[active];
  if (!step) return null;
  return <div className="mt-10">
    <div role="tablist" aria-label="Restaurant onboarding" className="restaurant-timeline">
      {onboarding.map((item, i) => <Button key={item.title} id={`onboarding-tab-${i}`} role="tab" aria-selected={active === i} aria-controls="onboarding-panel" variant="ghost" onClick={() => setActive(i)} className={cn("restaurant-timeline-tab", active === i && "is-active")}>
        <span className="restaurant-step-icon"><item.icon aria-hidden="true" /></span>
        <span><span className="block text-xs text-muted-foreground">{item.label}</span><span className="mt-1 block font-semibold">{item.title}</span></span>
      </Button>)}
    </div>
    <div id="onboarding-panel" role="tabpanel" aria-labelledby={`onboarding-tab-${active}`} className="grid gap-8 border-b border-border py-10 md:grid-cols-2">
      <div><p className="eyebrow">{step.label}</p><h3 className="mt-4 text-2xl">{step.outcome}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{step.body}</p></div>
      <div key={active} className="restaurant-stage flex flex-col justify-center gap-3 bg-secondary/50 p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4"><step.icon className="size-6 text-accent" /><span className="font-semibold">Anchor Fish & Wings</span></div>
        {step.details.map((detail) => <div key={detail} className="flex items-center gap-3 text-sm"><Check className="size-4 text-success" />{detail}</div>)}
        <div className="restaurant-signal mt-3 h-1 overflow-hidden bg-border"><span className="block h-full w-1/3 bg-accent" /></div>
      </div>
    </div>
  </div>;
}

const systems = [
  { name: "AymarPOS", status: "Tested order flow", body: "Pickup order creation and customer-verified status lookup have been tested with AymarPOS. Each restaurant still needs its own menu mapping and launch checks." },
  { name: "Square", status: "API review required", body: "Square publishes developer APIs. Restaurant access, menu modifiers and the kitchen workflow must be reviewed before we confirm a connection." },
  { name: "Toast", status: "Partner access review", body: "Toast provides integration APIs, but access can depend on partner approval and restaurant permissions. Not advertised as a ready-to-use AmmarAI integration." },
  { name: "Clover", status: "API review required", body: "Clover offers developer APIs. App permissions, device setup and kitchen routing need assessment for your location." },
  { name: "Lightspeed", status: "Product & access review", body: "API access varies across Lightspeed products. We first confirm the exact restaurant product, region and available permissions." },
  { name: "Custom REST API", status: "Built around your POS", body: "Have a custom POS? Share its API documentation. We assess secure access, item IDs, order submission, customer lookup and kitchen-ticket actions." },
];

export function RestaurantConnections() {
  const [active, setActive] = useState(0);
  const system = systems[active];
  if (!system) return null;
  return <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
    <div className="restaurant-hub">
      <div className="flex items-center justify-center gap-3 py-5"><PhoneForwarded className="size-5 text-accent" /><span className="font-semibold">AmmarAI phone agent</span><ArrowRight className="size-4 text-muted-foreground" /></div>
      <div className="restaurant-connection-line" aria-hidden="true" />
      <div role="group" aria-label="POS systems" className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {systems.map((item, i) => <Button key={item.name} variant="outline" aria-pressed={i === active} onClick={() => setActive(i)} className={cn("h-16 whitespace-normal text-center", i === active && "border-accent bg-accent/10")}><Plug className="size-4" />{item.name}</Button>)}
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-4" />Authenticated API access · Confirmed orders only</div>
    </div>
    <div aria-live="polite" className="border-l-2 border-accent pl-6"><p className="eyebrow">{system.status}</p><h3 className="mt-3 text-2xl">{system.name}</h3><p className="mt-4 text-sm leading-relaxed text-muted-foreground">{system.body}</p><div className="mt-6 flex items-center gap-2 text-sm font-semibold"><FileText className="size-4 text-accent" />Compatibility checked before launch</div></div>
  </div>;
}