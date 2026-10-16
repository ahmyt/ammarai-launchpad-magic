import { createFileRoute } from "@tanstack/react-router";
import { Container, Section } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { ButtonLink, ExternalButton } from "@/components/site/Button";
import { REGISTER_URL } from "@/lib/site";
import demoVideo from "@/assets/ammarai-free-demo.mp4.asset.json";

const title = "Free AI Video Demo: See Real AmmarAI Output | AmmarAI";
const description =
  "Watch a real AI-generated video made with AmmarAI's text-to-video tool before you pay. See the quality, the prompt behind it, and start free.";

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
  return (
    <Section>
      <Container>
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Free demo video" }]} />
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-widest text-muted-foreground">Free demo</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight md:text-5xl">
            See a real AI-generated video before you pay
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            This clip was generated from a single text prompt with AmmarAI's text-to-video tool. No editing,
            no stock footage — just the raw output, marked with the AmmarAI logo.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-border bg-muted">
            <video
              src={demoVideo.url}
              poster="/media/free-demo-video.poster.jpg"
              controls
              playsInline
              muted
              loop
              autoPlay
              preload="metadata"
              controlsList="nodownload"
              width={1344}
              height={768}
              className="aspect-video h-auto w-full"
            >
              Your browser does not support video playback.
            </video>
          </div>

          <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-border p-4">
              <dt className="text-muted-foreground">Tool</dt>
              <dd className="mt-1 font-medium">AI Text to Video</dd>
            </div>
            <div className="rounded-lg border border-border p-4">
              <dt className="text-muted-foreground">Length</dt>
              <dd className="mt-1 font-medium">About 5 seconds</dd>
            </div>
            <div className="rounded-lg border border-border p-4">
              <dt className="text-muted-foreground">Resolution</dt>
              <dd className="mt-1 font-medium">1344 × 768 (16:9)</dd>
            </div>
          </dl>

          <div className="mt-10 rounded-xl border border-border p-6">
            <h2 className="text-2xl font-semibold">Make your own in minutes</h2>
            <p className="mt-2 text-muted-foreground">
              Start on the free plan, type a prompt, and get a video like this one. Upgrade only when you need more.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL}>Start free</ExternalButton>
              <ButtonLink to="/pricing" variant="secondary">See plans</ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
