import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toolHeadData } from "@/lib/flagship-head";
import { Link2 } from "lucide-react";
import { Card, Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ExternalButton } from "@/components/site/Button";
import { Button } from "@/components/ui/button";
import { faqJsonLd } from "@/components/site/Faq";
import { FlagshipVideoHero } from "@/components/site/FlagshipVideoHero";
import { FlagshipToolSections } from "@/components/site/FlagshipToolSections";
import { platformTools } from "@/data/tools-platform";
import { REGISTER_URL } from "@/lib/site";
import adDemo from "@/assets/demo-url-to-video-ad.mp4.asset.json";
import clipDemo from "@/assets/demo-url-to-video-clip.mp4.asset.json";
import avatarDemo from "@/assets/demo-url-to-video-avatar.mp4.asset.json";

const tool = platformTools.find((t) => t.slug === "ai-url-to-video")!;
const url = "https://ammarai.com/ai-url-to-video";

const t = (n: number) => `/media/tutorials/tutorial-influencer-${n}.png`;
const steps = [
  { title: "Start a product ad", body: "Choose the product-powered ad workflow and select Generate New.", img: t(1), w: 1398, h: 728 },
  { title: "Add the product", body: "Paste a product link or upload your own product assets.", img: t(2), w: 1640, h: 838 },
  { title: "Set the details", body: "Pick the language, length and format of the ad.", img: t(3), w: 1588, h: 736 },
  { title: "Choose a presenter", body: "Select the presenter who will appear in the video.", img: t(4), w: 1589, h: 828 },
  { title: "Pick a voice", body: "Preview the voices and select one for the presenter.", img: t(5), w: 1598, h: 839 },
  { title: "Style the captions", body: "Choose a caption style, then generate previews.", img: t(6), w: 1591, h: 854 },
  { title: "Compare previews", body: "Review the generated options and choose a result.", img: t(8), w: 1541, h: 709 },
];

const formats = { "Vertical 9:16": "Reels, TikTok and Shorts", "Square 1:1": "feed posts", "Wide 16:9": "YouTube and websites" } as const;
type FormatKey = keyof typeof formats;
const lengths = ["15 seconds", "30 seconds", "60 seconds"];

const clips = [
  { src: adDemo.url, label: "Product ad built from a product page, with presenter, voiceover and captions" },
  { src: clipDemo.url, label: "Short clip cut from a long podcast, opening on a hook" },
  { src: avatarDemo.url, label: "Influencer-style presenter delivering a written script" },
];

const moreFaqs = [
  { q: "Which plan includes URL to Video & Influencer?", a: "It is included from the Standard plan ($59.99/month) and on every plan above it." },
  { q: "Can I use my own product photos instead of a link?", a: "Yes. The product step accepts either a product link or uploaded product assets." },
];
const faqs = [...(tool.faqs ?? []), ...moreFaqs];

export const Route = createFileRoute("/ai-url-to-video")({
  staticData: { sitemap: true },
  // Head data comes from the loader so the tool catalogue stays out of startup code.
  loader: async () => toolHeadData((await import("@/data/tools-platform")).platformTools, "ai-url-to-video"),
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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "SoftwareApplication", name: t.name, applicationCategory: "MultimediaApplication", operatingSystem: "Web", description: t.description, url, provider: { "@type": "Organization", name: "AmmarAI", url: "https://ammarai.com" } }) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd([...t.faqs, ...moreFaqs])) },
    ],
  }),
  component: UrlToVideoPage,
});

function UrlToVideoPage() {
  const [step, setStep] = useState(0);
  const s = steps[step] ?? steps[0]!;
  const [link, setLink] = useState("https://yourstore.com/products/travel-mug");
  const [format, setFormat] = useState<FormatKey>("Vertical 9:16");
  const [len, setLen] = useState(0);
  const brief = `Product link: ${link || "(paste your product page)"}\nFormat: ${format} for ${formats[format]}\nLength: ${lengths[len]}\nPresenter: friendly, natural delivery. Captions on. End with a clear call to action.`;

  return (
    <>
      <FlagshipVideoHero clip="url-to-video" crumb="AI URL to Video" title={tool.h1} lede={tool.lede} cta={tool.ctaLabel} icon={<Link2 className="size-4" />} jump={{ href: "#brief", label: "Plan your ad" }} note="Included from the Standard plan, $59.99/month." />

      <Section tone="sand">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: tool.name }]} />
          <SectionHeading className="mt-8" eyebrow="Inside the studio" title="From product link to finished ad" intro="Real screens from the workspace. Click each step." />
          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {steps.map((x, i) => <Button key={x.title} role="tab" aria-selected={i === step} size="sm" variant={i === step ? "default" : "outline"} onClick={() => setStep(i)}>{i + 1}. {x.title}</Button>)}
          </div>
          <div key={step} className="restaurant-stage mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-center">
            <div className="border-t-2 border-accent bg-background p-6"><h3 className="text-xl font-semibold">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p></div>
            <img src={s.img} alt={s.title} width={s.w} height={s.h} className="w-full rounded-lg border border-border bg-background" />
          </div>
        </Container>
      </Section>

      <Section id="brief">
        <Container>
          <SectionHeading eyebrow="Ad planner" title="Plan your first ad" intro="Pick the format and length before you start, so the first preview already fits where it will run." />
          <div className="mt-10 grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
            <div className="space-y-5">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Product link</span>
                <input value={link} onChange={(e) => setLink(e.target.value)} className="mt-2 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
              </label>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Format</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(Object.keys(formats) as FormatKey[]).map((k) => <Button key={k} size="sm" variant={format === k ? "default" : "outline"} onClick={() => setFormat(k)}>{k}</Button>)}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Length</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lengths.map((c, i) => <Button key={c} size="sm" variant={len === i ? "default" : "outline"} onClick={() => setLen(i)}>{c}</Button>)}
                </div>
              </div>
            </div>
            <Card className="p-6">
              <p className="eyebrow">Your brief</p>
              <p className="mt-3 whitespace-pre-line break-words font-mono text-sm leading-relaxed text-foreground" aria-live="polite">{brief}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => navigator.clipboard?.writeText(brief)}>Copy brief</Button>
                <ExternalButton href={REGISTER_URL}>Open URL to Video</ExternalButton>
              </div>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="sand">
        <Container>
          <SectionHeading eyebrow="Real results" title="Videos made with this tool" />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {clips.map((c) => (
              <figure key={c.src}>
                <video src={c.src} controls muted playsInline preload="metadata" className="w-full rounded-lg border border-border bg-background" />
                <figcaption className="mt-2 text-sm text-muted-foreground">{c.label}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </Section>

      <FlagshipToolSections
        tool={tool}
        faqs={faqs}
        tutorial={{ slug: "how-to-create-ai-influencer-videos", label: "Read the full URL to Video tutorial" }}
        next={[
          { slug: "ai-ugc-generator", name: "AI UGC Creator", body: "Make creator-style product videos." },
          { slug: "ai-avatar-generator", name: "AI Avatar", body: "Make presenter videos from a script." },
          { slug: "ai-captions", name: "AI Captions", body: "Add styled subtitles for silent viewing." },
          { slug: "ai-video-editor", name: "AI Video Editor", body: "Trim and polish the finished ad." },
        ]}
        pricing={{ title: "Turn your first product link into an ad", body: "URL to Video & Influencer is included from the Standard plan ($59.99/month)." }}
      />
    </>
  );
}
