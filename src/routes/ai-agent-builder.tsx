import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { ArrowDown, Bot, Brain, Send, FileBarChart, Mail, GitBranch, Share2, Megaphone, MessageSquare, Users, Clock, Plus, X } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { agentTools } from "@/data/tools-agents";
import { REGISTER_URL } from "@/lib/site";

const tool = agentTools.find((t) => t.slug === "ai-agent-builder")!;
const url = "https://ammarai.com/ai-agent-builder";

/** The nine step types shown in the live builder's "Add Step" dialog. */
const stepTypes = [
  { id: "ask", icon: Brain, name: "Ask Agent", body: "Send a message to an AI model and store the response." },
  { id: "send", icon: Send, name: "Send Message", body: "Send a message to a connected channel (Telegram, WhatsApp, etc.)." },
  { id: "report", icon: FileBarChart, name: "Generate Report", body: "Generate an AI-summarised activity report for a given date range." },
  { id: "gmail", icon: Mail, name: "Gmail", body: "Manage your Gmail: send emails, read them, manage labels, drafts and more." },
  { id: "path", icon: GitBranch, name: "Path", body: "Split execution into multiple branches based on conditions." },
  { id: "social", icon: Share2, name: "Social Media Agent", body: "Manage social media agents, create and approve posts, and fetch post analytics." },
  { id: "marketing", icon: Megaphone, name: "Marketing Bot", body: "Manage marketing campaigns, get stats, browse conversations and schedule sends." },
  { id: "chatbot", icon: MessageSquare, name: "External Chatbot", body: "Interact with chatbots — list, get analytics, manage conversations and close tickets." },
  { id: "crm", icon: Users, name: "CRM Agent", body: "Interact with the CRM — contacts, companies, deals, pipeline stages, tasks, notes and analytics." },
] as const;
type StepId = (typeof stepTypes)[number]["id"];

const recipes: { label: string; trigger: string; steps: StepId[] }[] = [
  { label: "Daily CRM briefing", trigger: "Schedule · every day at 1 PM UTC", steps: ["crm", "ask", "send"] },
  { label: "Weekly marketing report", trigger: "Schedule · every Monday at 8 AM", steps: ["marketing", "social", "report", "gmail"] },
  { label: "Support ticket sweep", trigger: "Schedule · every 2 hours", steps: ["chatbot", "ask", "path", "send"] },
];

const moreFaqs = [
  { q: "Which steps can an agent workflow use?", a: "The builder's Add Step menu offers Ask Agent, Send Message, Generate Report, Gmail, Path, Social Media Agent, Marketing Bot, External Chatbot and CRM Agent. Each step can use the result of the one before it." },
  { q: "Which plan includes the Agent Builder?", a: "AI Agent is included from the Basic plan. Unlimited Agent Builder with all connectors is part of the Ultimate plan. Check the pricing page for the current allowances." },
];
const faqs = [...(tool.faqs ?? []), ...moreFaqs];

export const Route = createFileRoute("/ai-agent-builder")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-agents")).agentTools, "ai-agent-builder"),
  head: ({ loaderData: t }) => !t ? {} : ({
    meta: [
      { title: t.title },
      { name: "description", content: t.description },
      { property: "og:title", content: t.title },
      { property: "og:description", content: t.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: t.name, applicationCategory: "BusinessApplication", operatingSystem: "Web", description: t.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...t.faqs, ...moreFaqs])) },
    ],
  }),
  component: AgentBuilderPage,
});

function AgentBuilderPage() {
  const [recipe, setRecipe] = useState(0);
  const [steps, setSteps] = useState<StepId[]>(recipes[0]!.steps);
  const [picking, setPicking] = useState(false);
  const [running, setRunning] = useState(-1);
  const r = recipes[recipe] ?? recipes[0]!;
  const byId = (id: StepId) => stepTypes.find((s) => s.id === id)!;

  function loadRecipe(i: number) {
    setRecipe(i);
    setSteps(recipes[i]!.steps);
    setRunning(-1);
  }
  function run() {
    steps.forEach((_, i) => setTimeout(() => setRunning(i), 600 * (i + 1)));
    setTimeout(() => setRunning(steps.length), 600 * (steps.length + 1));
  }

  return (
    <>
      <FlagshipVideoHero clip="agent-builder" crumb="AI Agent Builder" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<Bot className="size-4" />} jump={{ href: "#workflow", label: "Try the workflow builder" }} note="AI Agent from Basic · unlimited Agent Builder on Ultimate." />

      <Section tone="sand" id="workflow">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Workflow builder" title="Stack steps, then let it run on its own" intro="Pick a starting recipe, add or remove steps, and press Run. These are the same nine step types the builder offers; the run is a simulation." />
          <div className="mt-8 flex flex-wrap gap-2">
            {recipes.map((x, i) => <Button key={x.label} size="sm" variant={i === recipe ? "default" : "outline"} onClick={() => loadRecipe(i)}>{x.label}</Button>)}
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="flex flex-col items-center gap-2" aria-live="polite">
              <Card className="w-full max-w-md p-4"><p className="flex items-center gap-2 text-sm font-semibold"><Clock className="size-4 text-accent" />Schedule</p><p className="mt-1 text-xs text-muted-foreground">{r.trigger}</p></Card>
              {steps.map((id, i) => {
                const s = byId(id);
                const Icon = s.icon;
                const state = running > i ? "done" : running === i ? "running" : "idle";
                return (
                  <div key={`${id}-${i}`} className="flex w-full flex-col items-center gap-2">
                    <ArrowDown className="size-4 text-muted-foreground" aria-hidden="true" />
                    <Card className={`w-full max-w-md p-4 transition-colors ${state === "running" ? "border-accent" : ""}`}>
                      <div className="flex items-center justify-between gap-2">
                        <p className="flex items-center gap-2 text-sm font-semibold"><Icon className="size-4 text-accent" />{s.name}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{state === "done" ? "✓ Done" : state === "running" ? "Running…" : ""}</span>
                          <button type="button" aria-label={`Remove ${s.name}`} onClick={() => setSteps(steps.filter((_, j) => j !== i))} className="text-muted-foreground hover:text-foreground"><X className="size-4" /></button>
                        </div>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">{s.body}</p>
                    </Card>
                  </div>
                );
              })}
              <ArrowDown className="size-4 text-muted-foreground" aria-hidden="true" />
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setPicking(!picking)}><Plus className="size-4" />Add step</Button>
                <Button size="sm" disabled={steps.length === 0} onClick={run}>Run workflow</Button>
              </div>
              {running >= steps.length && steps.length > 0 && <p className="text-sm font-semibold text-accent">Run complete — every step logged.</p>}
            </div>
            <div>
              <p className="eyebrow">{picking ? "Add step · choose one" : "Available steps"}</p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {stepTypes.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button key={s.id} type="button" disabled={!picking} onClick={() => { setSteps([...steps, s.id]); setPicking(false); setRunning(-1); }} className="rounded-lg border border-border bg-background p-3 text-left transition-colors enabled:hover:border-accent disabled:opacity-80">
                      <p className="flex items-center gap-2 text-sm font-semibold text-foreground"><Icon className="size-4 text-accent" />{s.name}</p>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <FlagshipToolSections
        tool={tool}
        faqs={faqs}
        tutorial={{ slug: "how-to-build-an-ai-agent", label: "Read the full Agent Builder tutorial" }}
        next={[
          { slug: "ai-crm", name: "AI CRM", body: "Give agents real deals and contacts to work from." },
          { slug: "ai-social-media-agent", name: "AI Social Media Agent", body: "Plan, write and post social content on a schedule." },
          { slug: "external-chatbot", name: "Website Chatbot", body: "Answer site visitors and hand tickets to agents." },
          { slug: "ai-deep-research", name: "AI Deep Research", body: "Run cited research reports for any topic." },
        ]}
        pricing={{ title: "Build your first agent", body: "AI Agent is included from the Basic plan ($24.99/month). The Ultimate plan ($129.99/month) adds the unlimited Agent Builder and all connectors." }}
      />
    </>
  );
}
