import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { FileAudio, Search } from "lucide-react";
import { coreToolsA } from "@/data/tools-core-a";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { VoiceToolWorkflow } from "@/components/site/VoiceToolWorkflow";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";

const entry = coreToolsA.find(item => item.slug === "ai-transcription");
if (!entry) throw new Error("Transcription catalogue entry missing");
const tool = { ...entry, description: "Turn audio and video recordings into searchable transcripts with speaker labels and timestamps. Review interviews, extract quotes and prepare subtitles with AmmarAI." };
const faqs = [...(tool.faqs ?? []), { q: "Does the preview transcribe my files?", a: "No. These are existing recordings and catalogue excerpts. Upload and process your own recording inside the AmmarAI workspace." }];
const steps = [
  { title: "Upload the recording", body: "Start with clear audio or video. Record separate speaker tracks where possible, and tell participants they are being recorded." },
  { title: "Set the language", body: "Name the spoken language, particularly for accented speech or technical vocabulary." },
  { title: "Fix speaker labels", body: "Rename the detected speakers before sharing the transcript. Ask each speaker to introduce themselves at the start of the recording." },
  { title: "Review the transcript", body: "Use timestamps to return to the recording. Check names, numbers, specialist terms and overlapping speech before quoting." },
  { title: "Reuse and export", body: "Search the transcript, extract decisions and action items, or export subtitles for the source video." },
];
const samples = [
  { name: "Customer interview", src: "/media/demo-transcription-interview.mp3", speaker: "Participant", timestamp: "00:04:12", excerpt: "Honestly, the hardest part is the handoff. We finish a draft and then it just sits in someone's inbox for three days before anyone looks at it." },
  { name: "Product walkthrough", src: "/media/demo-transcription-walkthrough.mp3", speaker: "Presenter", timestamp: "00:01:38", excerpt: "Now open the campaign tab. You'll see every variant listed here, and clicking one shows the exact version that ran, along with its results." },
];
export const Route = createFileRoute("/ai-transcription")({
  staticData: { sitemap: true },
  head: () => ({ meta: [{ title: tool.title }, { name: "description", content: tool.description }, { property: "og:title", content: tool.title }, { property: "og:description", content: tool.description }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }], links: [{ rel: "canonical", href: "https://ammarai.com/ai-transcription" }], scripts: [{ type: "application/ld+json", children: JSON.stringify(faqJsonLd(faqs)) }] }),
  component: TranscriptionPage,
});
function TranscriptionPage() {
  const [selected, setSelected] = useState(0);
  const [query, setQuery] = useState("");
  const sample = samples[selected];
  const matches = sample?.excerpt.toLowerCase().includes(query.trim().toLowerCase());
  return <>
    <FlagshipVideoHero clip="transcription" crumb="AI Transcription" title="AI Transcription" lede={tool.lede} cta={tool.ctaLabel} icon={<FileAudio className="size-4" />} jump={{ href: "#recordings", label: "Explore the recordings" }} note="Find the quote. Check the speaker. Keep the original recording." />
    <Section id="recordings" tone="sand"><Container><Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} /><SectionHeading className="mt-8" eyebrow="Audio to text" title="Hear the recording. Inspect an excerpt." /><div className="mt-8 flex flex-wrap gap-2">{samples.map((item, index) => <Button key={item.name} aria-pressed={selected === index} variant={selected === index ? "default" : "outline"} onClick={() => { setSelected(index); setQuery(""); }}>{item.name}</Button>)}</div>{sample ? <div className="mt-8 grid gap-10 md:grid-cols-2"><figure className="min-w-0 border-t-2 border-accent pt-5"><h3 className="text-xl">{sample.name}</h3><audio key={sample.src} aria-label={sample.name} className="mt-5 w-full" controls preload="none" src={sample.src} /><figcaption className="mt-3 text-sm text-muted-foreground">Existing source recording</figcaption></figure><div className="min-w-0 border-t border-border pt-5"><label className="block text-sm font-semibold">Search example excerpt<div className="relative mt-2"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search a word or phrase" className="w-full rounded-md border border-input bg-background py-2.5 pl-10 pr-3 font-normal" /></div></label><div aria-live="polite" className="mt-6">{matches ? <><p className="font-mono text-xs text-accent">[{sample.timestamp}] / {sample.speaker}</p><blockquote className="mt-3 text-lg leading-relaxed">{sample.excerpt}</blockquote></> : <p className="text-muted-foreground">No match in this excerpt.</p>}</div><p className="mt-4 text-xs text-muted-foreground">Illustrative catalogue excerpt · timestamp refers to the full example, not the short audio sample.</p></div></div> : null}</Container></Section>
    <Section><Container><SectionHeading eyebrow="Recording to record" title="A transcript worth referring back to" /><VoiceToolWorkflow label="Transcription workflow" steps={steps} /></Container></Section>
    <FlagshipToolSections tool={tool} faqs={faqs} tutorial={{ slug: "how-to-transcribe-a-meeting-or-interview", label: "Read the meeting and interview transcription tutorial" }} pricing={{ title: "Turn your next recording into useful text", body: "Compare plans and check the recording limits and transcription features available in your AmmarAI workspace." }} next={[{ slug: "ai-speech-to-text", name: "Speech to Text", body: "Convert shorter dictation into a draft." }, { slug: "ai-captions", name: "AI Captions", body: "Style your words for video." }, { slug: "ai-writer", name: "AI Writer", body: "Develop interview material into an article." }, { slug: "ai-document-analyzer", name: "Document Analyzer", body: "Ask questions of written material." }]} />
  </>;
}