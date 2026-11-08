import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Mic } from "lucide-react";
import { blogTemplateTools } from "@/data/tools-templates-blog";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { VoiceToolWorkflow } from "@/components/site/VoiceToolWorkflow";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { toolHeadData } from "@/lib/flagship-head";

const tool = blogTemplateTools.find((item) => item.slug === "realtime-voice-chat");
if (!tool) throw new Error("Realtime Voice Chat catalogue entry missing");
const extraFaqs = [{ q: "Is this a phone agent for my business?", a: "No. Realtime Voice Chat is a spoken session inside your own AI Chat. For incoming customer calls, explore the dedicated AI Phone Agent." }, { q: "Are these live conversations?", a: "The recordings below are existing spoken-answer samples. Start an actual two-way voice session inside the AmmarAI workspace." }];
const faqs = [...(tool.faqs ?? []), ...extraFaqs];
const steps = [
  { title: "Open a chat", body: "Go to AI Chat and open an existing conversation or start a new one. Realtime voice runs inside a normal chat, so earlier messages remain available as context." },
  { title: "Switch on real-time voice", body: "Select the real-time voice control in the message bar to switch from typed messages to a live spoken session.", image: { src: "/media/tutorials/tutorial-voice-chat-1.png", alt: "AmmarAI chat message bar with the real-time voice control highlighted", caption: "The real-time voice control sits in the message bar of any chat.", width: 2724, height: 1313 } },
  { title: "Allow microphone access", body: "Accept your browser's microphone permission and check the selected input device if you use a headset." },
  { title: "Speak naturally", body: "Talk in ordinary sentences. Interrupt, follow up and change direction as you would in a conversation." },
  { title: "End the session", body: "Close the voice session when finished. The conversation stays in chat history, ready to revisit or continue in text." },
];
const scenarios = [
  { name: "Interview rehearsal", brief: "Act as a hiring manager interviewing me for a product manager role. Ask one question at a time, wait for my answer, then give constructive feedback and a follow-up question." },
  { name: "Language practice", brief: "Practice a friendly everyday conversation in Spanish with me. Keep your sentences short, wait for my answer and gently correct mistakes before continuing." },
  { name: "Think out loud", brief: "Help me think through a decision between two job offers. Ask about my priorities one at a time. Reflect the trade-offs back without deciding for me." },
];
export const Route = createFileRoute("/realtime-voice-chat")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-templates-blog")).blogTemplateTools, "realtime-voice-chat"),
  head: ({ loaderData: t }) => !t ? {} : ({ meta: [{ title: t.title }, { name: "description", content: t.description }, { property: "og:title", content: t.title }, { property: "og:description", content: t.description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://ammarai.com/realtime-voice-chat" }], scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd([...t.faqs, ...extraFaqs])) }] }),
  component: RealtimePage,
});
function RealtimePage() {
  const [scenario, setScenario] = useState(0);
  const [brief, setBrief] = useState(scenarios[0]?.brief ?? "");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  async function copy() { try { await navigator.clipboard.writeText(brief); setCopied(true); setCopyError(false); } catch { setCopyError(true); } }
  if (!tool) return null;
  return <>
    <FlagshipVideoHero clip="realtime" crumb="Realtime Voice Chat" title="Realtime Voice Chat" lede={tool.lede} cta={tool.ctaLabel} icon={<Mic className="size-4" />} jump={{ href: "#conversation", label: "Explore voice chat" }} note="Think aloud. Rehearse your next conversation. Keep the context." />
    <Section id="conversation" tone="sand"><Container><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} /><SectionHeading className="mt-8" eyebrow="Inside AI Chat" title="From a typed chat to a spoken conversation" /><VoiceToolWorkflow label="Voice conversation steps" steps={steps} /></Container></Section>
    <Section><Container><SectionHeading eyebrow="Hear the voice" title="A reply you can listen to" /><div className="mt-10 grid gap-8 md:grid-cols-2">{[{ name: "Calm spoken answer", src: "/media/demo-voice-course.mp3" }, { name: "Study-style narration", src: "/media/demo-tts-study.mp3" }].map(sample => <figure key={sample.src} className="min-w-0 border-t-2 border-accent pt-5"><h3 className="text-xl">{sample.name}</h3><audio aria-label={sample.name} className="mt-5 w-full" controls preload="none" src={sample.src} /><figcaption className="mt-3 text-sm text-muted-foreground">Existing audio sample · not a live session</figcaption></figure>)}</div></Container></Section>
    <Section tone="sand"><Container><SectionHeading eyebrow="Conversation starter" title="Give the conversation a direction" /><div className="mt-10 grid gap-8 md:grid-cols-2"><div><div className="flex flex-wrap gap-2">{scenarios.map((item, index) => <Button key={item.name} variant={index === scenario ? "default" : "outline"} aria-pressed={index === scenario} onClick={() => { setScenario(index); setBrief(item.brief); setCopied(false); }}>{item.name}</Button>)}</div><label className="mt-6 block text-sm font-semibold">Your opening request<textarea className="mt-2 w-full rounded-md border border-input bg-background p-3 font-normal" rows={7} value={brief} onChange={event => { setBrief(event.target.value); setCopied(false); }} /></label><Button className="mt-4" variant="outline" disabled={!brief.trim()} onClick={copy}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy request"}</Button>{copyError ? <p role="status" className="mt-3 text-sm">Copy unavailable. Select the request to copy it.</p> : null}</div><div className="border-t-2 border-accent pt-6"><p className="eyebrow">{scenarios[scenario]?.name}</p><p className="mt-5 whitespace-pre-wrap break-words text-lg leading-relaxed">{brief}</p></div></div></Container></Section>
    <FlagshipToolSections tool={tool} faqs={faqs} tutorial={{ slug: "how-to-use-realtime-voice-chat", label: "Read the Realtime Voice Chat tutorial" }} pricing={{ title: "Make room for a real conversation", body: "Compare AmmarAI plans and the voice features available in your workspace before starting your next spoken session." }} next={[{ slug: "ai-chat", name: "AI Chat Pro", body: "Continue the same ideas in writing." }, { slug: "ai-voice-generator", name: "Voiceover & Voice Clone", body: "Turn a finished script into narration." }, { slug: "ai-transcription", name: "AI Transcription", body: "Work with recordings as searchable text." }, { slug: "ai-phone-agent", name: "AI Phone Agent", body: "Explore customer-facing business calls." }]} />
  </>;
}