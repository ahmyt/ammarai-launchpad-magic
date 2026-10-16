import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { REGISTER_URL } from "@/lib/site";
import demoVideo from "@/assets/ammarai-free-demo.mp4.asset.json";

const title = "Free AI Video Demos: See Real AmmarAI Output | AmmarAI";
const description =
  "Watch real videos made with AmmarAI — text to video, image to video, avatars, UGC ads, editing, captions and dubbing — before you pay. Start free.";

type Demo = { id: string; tab: string; tool: string; src: string; poster: string; blurb: string; slug?: string };

const demos: Demo[] = [
  { id: "text", tab: "Text to video", tool: "AI Text to Video", src: demoVideo.url, poster: "/media/free-demo-video.poster.jpg", blurb: "Generated from one text prompt. No editing, no stock footage — raw output with the AmmarAI logo." },
  { id: "family", tab: "Cinematic scene", tool: "AI Video Generator", src: "/media/ai-video-pro-family-lunch.webm", poster: "/media/ai-video-pro-family-lunch.poster.webp", blurb: "A warm family meal scene created from a written description.", slug: "ai-video-generator" },
  { id: "image", tab: "Image to video", tool: "AI Image to Video", src: "/media/demo-image-to-video.mp4", poster: "/media/demo-image-to-video.poster.jpg", blurb: "A still picture brought to life with natural motion." },
  { id: "avatar", tab: "Talking avatar", tool: "AI Avatar Video Generator", src: "/media/demo-avatar-video.webm", poster: "/media/demo-avatar-video.poster.webp", blurb: "A presenter that speaks your script with matching lip movement.", slug: "ai-avatar-generator" },
  { id: "ugc", tab: "UGC ad", tool: "AI UGC Generator", src: "/media/ai-ugc-skincare-serum.webm", poster: "/media/ai-ugc-skincare-serum.poster.webp", blurb: "A creator-style product review ready for social ads.", slug: "ai-ugc-generator" },
  { id: "url", tab: "URL to video ad", tool: "URL to Video", src: "/media/demo-url-to-video-ad.mp4", poster: "/media/demo-url-to-video-ad.poster.jpg", blurb: "Paste a product page link and get a short promo video." },
  { id: "editor", tab: "Video editing", tool: "AI Video Editor", src: "/media/demo-video-editor.webm", poster: "/media/demo-video-editor.poster.webp", blurb: "A polished product edit made from raw clips.", slug: "ai-video-editor" },
  { id: "captions", tab: "Captions", tool: "AI Captions", src: "/media/demo-ai-captions.mp4", poster: "/media/demo-ai-captions.poster.jpg", blurb: "Automatic, styled captions added to a spoken clip." },
  { id: "dubbing", tab: "Dubbing", tool: "AI Dubbing", src: "/media/demo-ai-dubbing.mp4", poster: "/media/demo-ai-dubbing.poster.jpg", blurb: "The same video re-voiced in another language." },
];

export const Route = createFileRoute("/demo-video")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "video.other" },
      { property: "og:url", content: "https://ammarai.com/demo-video" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ammarai.com/demo-video" }],
  }),
  component: DemoVideoPage,
});

function DemoVideoPage() {
  const [activeId, setActiveId] = useState(demos[0].id);
  const active = demos.find((d) => d.id === activeId) ?? demos[0];

  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Free demo videos" }]} />
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Free demos</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
            See real AI-generated videos before you pay
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick a tool below to watch what it actually produces. Every clip is real output from AmmarAI.
          </p>

          <div role="tablist" aria-label="Demo videos" className="mt-8 flex flex-wrap gap-2">
            {demos.map((d) => (
              <button
                key={d.id}
                role="tab"
                type="button"
                aria-selected={d.id === active.id}
                onClick={() => setActiveId(d.id)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  d.id === active.id
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background text-foreground hover:bg-secondary"
                }`}
              >
                {d.tab}
              </button>
            ))}
          </div>

          <div role="tabpanel" className="mt-6">
            <div className="overflow-hidden rounded-xl border border-border bg-muted">
              <video
                key={active.id}
                src={active.src}
                poster={active.poster}
                controls
                playsInline
                muted
                loop
                autoPlay
                preload="metadata"
                controlsList="nodownload"
                aria-label={`${active.tool} sample video`}
                className="aspect-video h-auto w-full object-contain"
              >
                Your browser does not support video playback.
              </video>
            </div>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{active.tool}</h2>
                <p className="mt-1 text-muted-foreground">{active.blurb}</p>
              </div>
              {active.slug && (
                <ButtonLink to="/$slug" params={{ slug: active.slug }} variant="outline">
                  About this tool
                </ButtonLink>
              )}
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-border p-6">
            <h2 className="text-2xl font-semibold">Make your own in minutes</h2>
            <p className="mt-2 text-muted-foreground">
              Start on the free plan, try the tools, and upgrade only when you need more.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL}>Start free</ExternalButton>
              <ButtonLink to="/pricing" variant="outline">See plans</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
