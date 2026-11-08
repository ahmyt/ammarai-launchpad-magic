import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { ArrowDown, Inbox, MessageSquare, Send, Globe, UserRound } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { engagementTools } from "@/data/tools-engagement";
import { REGISTER_URL } from "@/lib/site";

const tool = engagementTools.find((t) => t.slug === "ai-smart-inbox")!;
const url = "https://ammarai.com/ai-smart-inbox";
const title = "Website AI Chatbot & Smart Inbox | AmmarAI";
const description = "Build a website chatbot, embed it on your site, and read website, WhatsApp and Telegram conversations in one AmmarAI inbox with human handover.";

const setup = [
  { title: "Open AI Bots", body: "AI Bots holds every chatbot you build.", img: "/media/tutorials/tutorial-site-chatbot-1.png", w: 462, h: 764 },
  { title: "Add a new chatbot", body: "Start a new chatbot from the AI Bots page.", img: "/media/tutorials/tutorial-site-chatbot-3.png", w: 1097, h: 812 },
  { title: "Fill in the basics", body: "Title, bubble message, welcome message, instructions, language and model — with a live preview beside them.", img: "/media/tutorials/tutorial-site-chatbot-4.png", w: 2024, h: 1566 },
  { title: "Decide how conversations are handled", body: "Choose what happens when the assistant cannot answer, including handing over to a person.", img: "/media/tutorials/tutorial-site-chatbot-9.png", w: 850, h: 896 },
  { title: "Offer starter questions", body: "Suggested prompts guide visitors into useful questions.", img: "/media/tutorials/tutorial-site-chatbot-8.png", w: 792, h: 637 },
  { title: "Choose the look", body: "Logo, avatar, colours and position, so it matches your site.", img: "/media/tutorials/tutorial-site-chatbot-5.png", w: 1938, h: 1446 },
];

type Channel = "Website" | "WhatsApp" | "Telegram";
const threads: { ch: Channel; name: string; msg: string; reply: string; human?: boolean }[] = [
  { ch: "Website", name: "Visitor · pricing page", msg: "Do you deliver on Sundays?", reply: "Yes — Sunday deliveries run 10am to 4pm. Want me to check your postcode?" },
  { ch: "WhatsApp", name: "Maria G.", msg: "Can I move my booking to Thursday?", reply: "Handed to your team — booking changes need a person.", human: true },
  { ch: "Telegram", name: "Dev K.", msg: "Is there a student discount?", reply: "There's 15% off with a valid student email. Shall I send the link?" },
  { ch: "Website", name: "Visitor · contact page", msg: "I was charged twice.", reply: "Handed to your team with the full chat history.", human: true },
];
const channelIcon = { Website: Globe, WhatsApp: MessageSquare, Telegram: Send } as const;

const moreFaqs = [
  { q: "Can I put the chatbot on my own website?", a: "Yes. Build it in AI Bots, then copy the embed code into your site. The tutorial walks through every setting, including the look and the starter questions." },
  { q: "Which messaging apps can I read in the inbox?", a: "The inbox shows conversations from your connected channels, such as WhatsApp and Telegram, newest first. Use the channel selector to work through one platform at a time." },
  { q: "Which plan includes the website chatbot?", a: "The External Chatbot Builder (website embed) is included from the Standard plan ($59.99/month). Chatbot Training and all connectors are on Ultimate." },
];
const faqs = [...(tool.faqs ?? []), ...moreFaqs];

export const Route = createFileRoute("/ai-smart-inbox")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-engagement")).engagementTools, "ai-smart-inbox"),
  head: ({ loaderData: t }) => !t ? {} : ({
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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AmmarAI Website Chatbot & Smart Inbox", applicationCategory: "BusinessApplication", operatingSystem: "Web", description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...t.faqs, ...moreFaqs])) },
    ],
  }),
  component: InboxPage,
});

function InboxPage() {
  const [step, setStep] = useState(0);
  const s = setup[step] ?? setup[0]!;
  const [filter, setFilter] = useState<Channel | "All">("All");
  const [open, setOpen] = useState(0);
  const list = threads.filter((t) => filter === "All" || t.ch === filter);
  const t = list[open] ?? list[0];

  return (
    <>
      <FlagshipVideoHero clip="smart-inbox" crumb="Website Chatbot & Smart Inbox" title={"A chatbot on your site. Every reply in one inbox."} lede={"Build an AI assistant for your website, embed it in minutes, and read website, WhatsApp and Telegram conversations side by side — stepping in yourself whenever a chat needs a person."} cta={"Build your chatbot"} icon={<Inbox className="size-4" />} jump={{ href: "#inbox", label: "Try the inbox" }} note="Website chatbot included from Standard, $59.99/month." />

      <Section tone="sand">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Website Chatbot & Smart Inbox" }]} />
          <SectionHeading className="mt-8" eyebrow="Build the chatbot" title="Six screens from blank to live" intro="Real screens from the chatbot builder. Click each step." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {setup.map((x, i) => <Button key={x.title} role="tab" aria-selected={i === step} size="sm" variant={i === step ? "default" : "outline"} onClick={() => setStep(i)}>{i + 1}. {x.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
            <div className="border-t-2 border-accent bg-background p-6"><h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p></div>
            <img src={s.img} alt={s.title} width={s.w} height={s.h} className="mx-auto max-h-[480px] w-auto max-w-full rounded-lg border border-border bg-background" />
          </div>
        </Container>
      </Section>

      <Section id="inbox">
        <Container>
          <SectionHeading eyebrow="Smart Inbox" title="Filter by channel, open a thread, step in" intro="An illustrative inbox: the assistant answers routine questions and hands the rest to you with the history attached." />
          <div className="mt-8 flex flex-wrap gap-2">
            {(["All", "Website", "WhatsApp", "Telegram"] as const).map((c) => <Button key={c} size="sm" variant={filter === c ? "default" : "outline"} onClick={() => { setFilter(c); setOpen(0); }}>{c}</Button>)}
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
            <div className="space-y-2">
              {list.map((x, i) => {
                const Icon = channelIcon[x.ch];
                return (
                  <button key={x.name} type="button" onClick={() => setOpen(i)} className={`w-full rounded-lg border bg-background p-3 text-left transition-colors ${i === open ? "border-accent" : "border-border hover:border-accent"}`}>
                    <p className="flex items-center justify-between gap-2 text-sm font-semibold text-foreground"><span className="flex items-center gap-2"><Icon className="size-4 text-accent" />{x.name}</span>{x.human && <span className="text-xs font-semibold text-accent">Needs you</span>}</p>
                    <p className="mt-1 truncate text-xs text-muted-foreground">{x.msg}</p>
                  </button>
                );
              })}
            </div>
            {t && (
              <Card className="p-6" aria-live="polite">
                <p className="eyebrow">{t.ch} · {t.name}</p>
                <p className="mt-4 max-w-sm rounded-lg bg-secondary px-4 py-3 text-sm text-foreground">{t.msg}</p>
                <p className="ml-auto mt-3 flex max-w-sm items-start gap-2 rounded-lg border border-border px-4 py-3 text-sm text-foreground">{t.human ? <UserRound className="mt-0.5 size-4 shrink-0 text-accent" /> : <MessageSquare className="mt-0.5 size-4 shrink-0 text-accent" />}{t.reply}</p>
                {t.human && <ExternalButton href={REGISTER_URL} className="mt-5" size="sm">Reply as a person</ExternalButton>}
              </Card>
            )}
          </div>
        </Container>
      </Section>

      <FlagshipToolSections
        tool={tool}
        faqs={faqs}
        tutorial={{ slug: "how-to-read-whatsapp-and-telegram-messages-in-one-inbox", label: "Read the Smart Inbox tutorial" }}
        next={[
          { slug: "external-chatbot", name: "Website Chatbot", body: "Full guide to the embeddable website assistant." },
          { slug: "ai-crm", name: "AI CRM", body: "Turn conversations into contacts and deals." },
          { slug: "ai-agent-builder", name: "AI Agent Builder", body: "Sweep chatbot tickets on a schedule." },
          { slug: "ai-phone-agent", name: "AI Phone Agent", body: "Answer phone calls the same way." },
        ]}
        pricing={{ title: "Put an assistant on your site", body: "The website chatbot builder is included from the Standard plan ($59.99/month). Ultimate ($129.99/month) adds Chatbot Training and all connectors." }}
      />
    </>
  );
}
