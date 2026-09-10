import { createFileRoute, Link } from "@tanstack/react-router";
import { Container, Section, SectionHeading } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { FaqAccordion, faqJsonLd } from "@/components/site/Faq";
import { ExternalButton } from "@/components/site/Button";
import { REGISTER_URL } from "@/lib/site";

const title = "AI Models: Every Model in One Subscription | AmmarAI";
const description =
  "Chat, image, video, voice and transcription models available inside AmmarAI, what each one is good at, and how to pick the right model for the job.";

const groups: { heading: string; blurb: string; rows: { name: string; best: string }[] }[] = [
  {
    heading: "Chat and reasoning",
    blurb: "Used by AI Chat Pro, the writing tools, agents and chatbots. Switch mid-thread when the task changes.",
    rows: [
      { name: "Frontier reasoning models", best: "Hard analysis, long documents, strategy, code review" },
      { name: "Fast general models", best: "Everyday questions, drafts, summaries, high-volume work" },
      { name: "Long-context models", best: "Whole contracts, transcripts and research stacks in one pass" },
      { name: "Creative writing models", best: "Voice-led copy, scripts, story and campaign concepts" },
    ],
  },
  {
    heading: "Image",
    blurb: "Behind AI Image Pro, the image editor, photoshoot and try-on tools.",
    rows: [
      { name: "Photoreal generation models", best: "Product shots, lifestyle scenes, people and interiors" },
      { name: "Illustration and design models", best: "Graphic, editorial and stylised visuals" },
      { name: "Editing and inpainting models", best: "Brush-level changes, background swaps, frame extension" },
      { name: "Upscaling models", best: "Large, crisp finals for print-adjacent and retina use" },
    ],
  },
  {
    heading: "Video",
    blurb: "Behind AI Video Pro, the video editor, captions, dubbing and UGC tools.",
    rows: [
      { name: "Text-to-video models", best: "Short cinematic scenes generated from a written brief" },
      { name: "Image-to-video models", best: "Bringing an approved still into motion" },
      { name: "Editing and reframing models", best: "Recuts, pacing, colour and vertical crops" },
      { name: "Lip-sync and dubbing models", best: "Localised video with timing matched to the performance" },
    ],
  },
  {
    heading: "Voice and audio",
    blurb: "Behind voice generation, text to speech, dubbing, transcription and AI Music Pro.",
    rows: [
      { name: "Natural voice models", best: "Narration, adverts, courses and IVR lines" },
      { name: "Speech recognition models", best: "Accurate transcripts with speakers and timestamps" },
      { name: "Music generation models", best: "Royalty-free beds, jingles and loops" },
    ],
  },
];

const faqs = [
  {
    q: "Do I pay separately for each model?",
    a: "No. One subscription covers the whole library. Your plan sets the monthly allowance, not which models you may open.",
  },
  {
    q: "Which model should I use?",
    a: "Start with the fast general model for everyday work and switch to a reasoning or long-context model when the task involves real analysis or a long document.",
  },
  {
    q: "Can I change model in the middle of a conversation?",
    a: "Yes. AI Chat Pro carries the thread across model switches, so nothing already said is lost.",
  },
  {
    q: "Do models change over time?",
    a: "Yes. New versions are added as they are released and older ones are retired, which is why models are grouped by what they are good at rather than pinned to a single version name.",
  },
];

export const Route = createFileRoute("/ai-models")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Models,
});

function Models() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(faqs)) }}
      />
      <Section className="pb-8 pt-10 sm:pt-14">
        <Container>
          <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "AI models" }]} />
          <div className="mt-8 max-w-3xl">
            <p className="eyebrow">AI models</p>
            <h1 className="mt-4 text-balance text-4xl leading-[1.05] sm:text-5xl">
              Every model, one subscription
            </h1>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-muted-foreground">
              AmmarAI is model-agnostic. Chat, image, video, voice and transcription models sit
              behind the same tools, so you pick the one that suits the job instead of paying for
              four separate services.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ExternalButton href={REGISTER_URL} variant="primary">
                Start free
              </ExternalButton>
              <Link
                to="/pricing"
                className="inline-flex items-center rounded-md px-4 py-2 text-sm font-medium text-foreground ring-1 ring-border transition-colors hover:bg-muted"
              >
                See pricing
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {groups.map((group) => (
        <Section key={group.heading} className="pt-4">
          <Container>
            <SectionHeading title={group.heading} intro={group.blurb} />
            <div className="mt-6 overflow-hidden rounded-xl ring-1 ring-border">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-muted/60">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium text-foreground">
                      Model family
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium text-foreground">
                      Best for
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row) => (
                    <tr key={row.name} className="border-t border-border">
                      <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{row.best}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </Section>
      ))}

      <Section tone="sand">
        <Container size="narrow">
          <SectionHeading title="Model questions" />
          <div className="mt-8">
            <FaqAccordion items={faqs} />
          </div>
        </Container>
      </Section>
    </div>
  );
}
