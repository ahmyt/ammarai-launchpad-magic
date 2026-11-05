import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Mic, ShieldCheck } from "lucide-react";
import { coreToolsA } from "@/data/tools-core-a";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";

const catalogueTool = coreToolsA.find((item) => item.slug === "ai-voice-generator");
if (!catalogueTool) throw new Error("Voiceover catalogue entry is missing");
const tool = {
  ...catalogueTool,
  h1: "AI Voiceover & Voice Clone",
  description: "Create AI voiceovers for videos, courses and product audio. Clone your own voice with permission, shape the delivery and hear narration examples.",
};
const url = "https://ammarai.com/ai-voice-generator";
const faqs = [
  ...(tool.faqs ?? []).filter((item) => !["What file formats can I export?", "Can I clone my own voice?"].includes(item.q)),
  { q: "Can I clone my own voice?", a: "Yes. Record at least a minute of clear, natural speech from one speaker, upload it in the voice cloning area and give the voice a name. Once processing finishes, select it from the voice list. Only clone a voice you own or have clear permission to use." },
  { q: "Do the samples change when I edit the script here?", a: "No. The two recordings are existing narration examples. The script brief below prepares your text and delivery notes; generate new audio inside the AmmarAI workspace." },
  { q: "Which plan should I choose?", a: "Basic includes Text-to-Speech from $24.99/month. Voice cloning access is separate from that inclusion; check the available voice features in your workspace before choosing a plan." },
];
const steps = [
  { title: "Record a clear sample", body: "Read naturally for at least a minute in a quiet room. Leave out music, background chatter and heavy echo.", label: "01 / Your recording" },
  { title: "Keep one speaker", body: "Use only your voice, or a voice you have clear permission to use. Record in the language you will narrate in most often.", label: "02 / Clean source" },
  { title: "Upload and name the voice", body: "Open AI Voiceover & Voice Clone, add a new cloned voice, upload the recording and save it with a recognisable name.", label: "03 / Voice library" },
  { title: "Select, script and direct", body: "After processing, select the clone, paste your script and generate. Adjust pace, emphasis and pauses until the delivery fits.", label: "04 / Your narration" },
];
const samples = [
  { title: "Short campaign read", body: "A beat between sentences, with emphasis on “cash-flow”.", src: "/media/demo-voice-ad-read.mp3", script: "Late invoices are not a paperwork problem. They are a cash-flow problem." },
  { title: "Calm course narration", body: "A slower lesson read with a pronunciation correction.", src: "/media/demo-voice-course.mp3", script: "Welcome to this lesson. We will take each idea one step at a time." },
];
const tones = ["Warm and conversational", "Calm and instructional", "Clear and confident"];
const paces = ["Unhurried", "Natural", "Brisk"];

export const Route = createFileRoute("/ai-voice-generator")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: tool.title },
      { name: "description", content: tool.description },
      { property: "og:title", content: tool.title },
      { property: "og:description", content: tool.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }],
  }),
  component: VoicePage,
});

function VoicePage() {
  const [step, setStep] = useState(0);
  const [script, setScript] = useState(samples[0]?.script ?? "");
  const [tone, setTone] = useState(tones[0] ?? "");
  const [pace, setPace] = useState("Natural");
  const [pronunciation, setPronunciation] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const current = steps[step];
  const brief = `Script:\n${script.trim()}\n\nDelivery: ${tone}. ${pace} pace. Leave a natural pause between sentences.${pronunciation.trim() ? `\nPronunciation: ${pronunciation.trim()}` : ""}`;

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(brief);
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopyError(true);
    }
  }

  return (
    <>
      <FlagshipVideoHero clip="voiceover" crumb={tool.name} title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<Mic className="size-4" />} jump={{ href: "#listen", label: "Hear the examples" }} note="Your script. Your delivery. Your own voice, with permission." />

      <Section id="listen" tone="sand">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Listen" title="Two different reads. One voice workspace." />
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {samples.map((sample) => <figure key={sample.src} className="min-w-0 border-t-2 border-accent pt-5">
              <h3 className="text-xl font-semibold">{sample.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{sample.body}</p>
              <audio src={sample.src} controls preload="none" className="mt-5 w-full" aria-label={sample.title} />
              <figcaption className="mt-3 text-xs text-muted-foreground">Existing narration sample</figcaption>
            </figure>)}
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading eyebrow="Your own voice" title="From a recording to repeatable narration" />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Voice cloning steps">
            {steps.map((item, index) => <Button key={item.title} role="tab" id={`voice-step-${index}`} aria-controls="voice-step-panel" aria-selected={step === index} variant={step === index ? "default" : "outline"} onClick={() => setStep(index)}>{index + 1}. {item.title}</Button>)}
          </div>
          {current ? <div id="voice-step-panel" role="tabpanel" aria-labelledby={`voice-step-${step}`} className="mt-8 grid gap-6 border-y border-border py-8 md:grid-cols-2">
            <p className="eyebrow">{current.label}</p>
            <div><h3 className="text-2xl">{current.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{current.body}</p></div>
          </div> : null}
          <p className="mt-6 flex items-start gap-3 text-sm text-muted-foreground"><ShieldCheck className="size-5 shrink-0 text-accent" />Only clone your own voice or one you have clear permission to use.</p>
        </Container>
      </Section>

      <Section id="script" tone="sand">
        <Container>
          <SectionHeading eyebrow="Script brief" title="Write for the ear. Direct the read." />
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div className="min-w-0 space-y-6">
              <label className="block text-sm font-semibold">Script<textarea value={script} onChange={(event) => { setScript(event.target.value); setCopied(false); }} rows={5} className="mt-2 w-full rounded-md border border-input bg-background p-3 font-normal" /></label>
              <div><p className="text-sm font-semibold">Tone</p><div className="mt-3 flex flex-wrap gap-2">{tones.map((value) => <Button key={value} size="sm" variant={value === tone ? "default" : "outline"} aria-pressed={value === tone} onClick={() => { setTone(value); setCopied(false); }}>{value}</Button>)}</div></div>
              <div><p className="text-sm font-semibold">Pace</p><div className="mt-3 flex flex-wrap gap-2">{paces.map((value) => <Button key={value} size="sm" variant={value === pace ? "default" : "outline"} aria-pressed={value === pace} onClick={() => { setPace(value); setCopied(false); }}>{value}</Button>)}</div></div>
              <label className="block text-sm font-semibold">Pronunciation notes<input value={pronunciation} placeholder="Kubernetes: koo-ber-NET-eez" onChange={(event) => { setPronunciation(event.target.value); setCopied(false); }} className="mt-2 w-full rounded-md border border-input bg-background p-3 font-normal" /></label>
            </div>
            <div className="min-w-0 border-t-2 border-accent pt-6">
              <p className="eyebrow">Your narration brief</p>
              <p aria-live="polite" className="mt-5 whitespace-pre-wrap break-words font-mono text-sm leading-relaxed">{brief}</p>
              <Button onClick={copyBrief} disabled={!script.trim()} variant="outline" className="mt-6">{copied ? <Check className="size-4" /> : <Copy className="size-4" />}{copied ? "Copied" : "Copy brief"}</Button>
              {copyError ? <p role="status" className="mt-3 text-sm text-muted-foreground">Copy was unavailable. Select the brief above to copy it.</p> : null}
            </div>
          </div>
        </Container>
      </Section>

      <FlagshipToolSections tool={tool} faqs={faqs} tutorial={{ slug: "how-to-clone-your-own-voice-for-voiceovers", label: "Read the voice cloning tutorial" }} next={[
        { slug: "ai-text-to-speech", name: "AI Text to Speech", body: "Turn longer written material into audio." },
        { slug: "ai-video-generator", name: "AI Video Pro", body: "Create the visuals for your narration." },
        { slug: "ai-avatar-generator", name: "AI Avatar", body: "Pair a script with an on-camera presenter." },
        { slug: "ai-transcription", name: "AI Transcription", body: "Turn recordings back into editable text." },
      ]} pricing={{ title: "Give your next script a voice", body: "Compare plans and check the voice features available in your workspace. Basic includes Text-to-Speech from $24.99/month; voice cloning access is not confirmed by that inclusion." }} />
    </>
  );
}