import { useEffect, useMemo, useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/content";
import type { Example } from "@/data/types";
import type { ToolDemoMedia, ToolDemoPresentationSlide } from "@/data/tool-demos";
import { cn } from "@/lib/utils";
import { assetUrl } from "@/lib/asset-url";

type Phase = "typing" | "thinking" | "writing" | "resting";

const TYPE_MS = 22;
const THINK_MS = 700;
const WRITE_MS = 26;
const REST_MS = 2600;

function videoPoster(url?: string) {
  if (!url || !/\.mp4(?:$|[?#])/i.test(url)) return undefined;
  return url.replace(/\.mp4(?=$|[?#])/i, ".poster.jpg");
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/** Bold inline labels like "Hook:" / "Step 1:" so streamed output reads with structure. */
function renderOutput(text: string) {
  const parts = text.split(/((?:^|\s)[A-Z][A-Za-z0-9 ]{1,14}:)/g);
  return parts.map((part, i) => {
    const match = part.match(/^(\s*)([A-Z][A-Za-z0-9 ]{1,14}:)$/);
    if (!match) return <span key={i}>{part}</span>;
    return (
      <span key={i}>
        {match[1]}
        <strong className="font-semibold text-foreground">{match[2]}</strong>
      </span>
    );
  });
}

/**
 * Replays a tool's example as a live-looking session: the prompt types itself in,
 * the model "thinks", then the output streams out word by word.
 */
export function AnimatedExample({
  examples,
  toolName,
  demoVideos,
  className,
}: {
  examples: Example[];
  toolName: string;
  demoVideos?: (ToolDemoMedia | undefined)[] | undefined;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const { data: siteContent } = useSuspenseQuery(siteContentQuery);
  const allowDownload =
    siteContent.pages.find((p) => p.slug === "settings")?.allowVideoDownload === true;
  const downloadControls = allowDownload ? undefined : "nodownload";
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("typing");
  const [typed, setTyped] = useState("");
  const [written, setWritten] = useState("");
  const [revealed, setRevealed] = useState(0);
  const [playing, setPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const example = examples[index];
  const rawMedia = demoVideos?.[index];
  // Normalize CDN-hosted media URLs so they also load when the site is
  // hosted outside Lovable (e.g. on Plesk).
  const media = rawMedia
    ? {
        ...rawMedia,
        url: rawMedia.url ? assetUrl(rawMedia.url) : rawMedia.url,
        poster: rawMedia.poster ? assetUrl(rawMedia.poster) : rawMedia.poster,
        inputImage: rawMedia.inputImage ? assetUrl(rawMedia.inputImage) : rawMedia.inputImage,
        inputAudio: rawMedia.inputAudio ? assetUrl(rawMedia.inputAudio) : rawMedia.inputAudio,
        inputVideo: rawMedia.inputVideo ? assetUrl(rawMedia.inputVideo) : rawMedia.inputVideo,
      }
    : undefined;
  const demoVideo = media?.url ? media : undefined;
  const demoCode = media?.code ? media : undefined;
  const demoScene = media?.scene ? media.scene : undefined;
  const demoPresentation = media?.presentation ? media.presentation : undefined;
  const outputWords = useMemo(() => (example?.output ?? "").split(" "), [example?.output]);


  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Reset whenever the selected example changes.
  useEffect(() => {
    setTyped("");
    setWritten("");
    setRevealed(0);
    setPhase("typing");
  }, [index]);

  const active = playing && inView && !reduced && examples.length > 0;

  useEffect(() => {
    if (!example) return;
    if (reduced) {
      setTyped(example.input);
      setWritten(demoCode?.code ?? example.output);
      setRevealed(demoScene?.steps.length ?? 0);
      setPhase("resting");
      return;
    }
    if (!active) return;


    if (phase === "typing") {
      if (typed.length >= example.input.length) {
        const t = setTimeout(() => setPhase("thinking"), 240);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setTyped(example.input.slice(0, typed.length + 1)), TYPE_MS);
      return () => clearTimeout(t);
    }

    if (phase === "thinking") {
      const t = setTimeout(() => setPhase("writing"), THINK_MS);
      return () => clearTimeout(t);
    }

    if (phase === "writing" && demoScene) {
      if (revealed >= demoScene.steps.length) {
        const t = setTimeout(() => setPhase("resting"), 1800);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setRevealed((r) => r + 1), revealed === 0 ? 300 : 950);
      return () => clearTimeout(t);
    }

    if (phase === "writing" && demoCode) {
      const full = demoCode.code ?? "";
      if (written.length >= full.length) {
        const t = setTimeout(() => setPhase("resting"), 1200);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setWritten(full.slice(0, written.length + 3)), 12);
      return () => clearTimeout(t);
    }

    if (phase === "writing" && demoVideo) {
      // Audio is visitor-controlled: keep the selected recording visible until
      // they choose another sample so long conversations can finish naturally.
      if (demoVideo.kind === "audio") return;
      const hold = demoVideo.kind === "image" ? 4200 : 5200;
      const t = setTimeout(() => setPhase("resting"), hold);
      return () => clearTimeout(t);
    }

    if (phase === "writing" && demoPresentation) return;

    if (phase === "writing") {
      const count = written ? written.split(" ").length : 0;
      if (count >= outputWords.length) {
        const t = setTimeout(() => setPhase("resting"), 400);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setWritten(outputWords.slice(0, count + 1).join(" ")),
        WRITE_MS + (count % 5) * 8,
      );
      return () => clearTimeout(t);
    }

    const t = setTimeout(() => {
      setIndex((i) => (i + 1) % examples.length);
    }, REST_MS);
    return () => clearTimeout(t);
  }, [
    active,
    reduced,
    phase,
    typed,
    written,
    revealed,
    example,
    outputWords,
    examples.length,
    demoVideo,
    demoCode,
    demoScene,
    demoPresentation,
  ]);

  if (!example) return null;

  const outputKind = demoScene
    ? "scene"
    : demoCode
      ? "code"
      : demoPresentation
        ? "presentation"
      : demoVideo?.kind === "audio"
        ? "audio"
        : demoVideo?.kind === "image"
          ? "image"
          : demoVideo
            ? "video"
            : "text";

  const outputVerb =
    outputKind === "code"
      ? "AmmarAI codes"
      : outputKind === "audio"
        ? "AmmarAI speaks"
        : outputKind === "image" || outputKind === "video" || outputKind === "presentation"
          ? "AmmarAI renders"
          : outputKind === "scene"
            ? "AmmarAI works"
            : "AmmarAI writes";

  const inputVerb = media?.inputImage
    ? "You upload + type"
    : media?.inputAudio
      ? "You record"
      : media?.inputFileLabel
        ? "You attach + ask"
        : outputKind === "scene"
          ? "You set it up"
          : "You type";

  const progress =
    phase === "typing"
      ? (typed.length / Math.max(example.input.length, 1)) * 0.35
      : phase === "thinking"
        ? 0.42
        : phase === "writing"
          ? demoScene
            ? 0.45 + (revealed / Math.max(demoScene.steps.length, 1)) * 0.5
            : demoCode
              ? 0.45 + (written.length / Math.max((demoCode.code ?? "").length, 1)) * 0.5
              : demoVideo || demoPresentation
                ? 0.7
                : 0.45 +
                  ((written ? written.split(" ").length : 0) / Math.max(outputWords.length, 1)) *
                    0.5
          : 1;


  const statusLabel =
    phase === "typing"
      ? "Writing the prompt"
      : phase === "thinking"
        ? "Generating"
        : phase === "writing"
          ? "Delivering output"
          : "Complete";

  return (
    <div
      ref={containerRef}
      className={cn(
        "site-demo group/demo overflow-hidden rounded-3xl bg-card ring-1 ring-border",
        className,
      )}
    >
      {/* Chrome */}
      <div className="relative border-b border-border bg-gradient-to-b from-secondary/70 to-secondary/25 px-4 pb-3 pt-3.5 sm:px-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span
              className={cn(
                "absolute inset-0 rounded-full bg-accent",
                phase !== "resting" && active ? "demo-ping" : "",
              )}
            />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="min-w-0 text-[13px] font-semibold tracking-tight text-foreground">
            <span className="truncate">{toolName}</span>
          </p>
          <span className="rounded-full bg-accent/12 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent ring-1 ring-accent/25">
            Live demo
          </span>
          <span className="ml-auto flex items-center gap-2.5">
            <span
              aria-live="polite"
              className="hidden text-[11px] font-medium tabular-nums text-muted-foreground sm:inline"
            >
              {statusLabel}
            </span>
            {examples.length > 1 ? (
              <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
                {index + 1}/{examples.length}
              </span>
            ) : null}
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause the demo" : "Play the demo"}
              className="flex h-7 w-7 items-center justify-center rounded-full bg-card text-foreground/70 ring-1 ring-border transition-colors hover:bg-secondary hover:text-foreground"
            >
              {playing ? (
                <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
                  <rect x="2" y="1.5" width="3" height="9" rx="1" />
                  <rect x="7" y="1.5" width="3" height="9" rx="1" />
                </svg>
              ) : (
                <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current" aria-hidden="true">
                  <path d="M3 1.7 10 6 3 10.3z" />
                </svg>
              )}
            </button>
          </span>
        </div>
        {/* Progress rail */}
        <div className="mt-3 h-[3px] w-full overflow-hidden rounded-full bg-border/70">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-200 ease-linear"
            style={{ width: `${Math.min(100, Math.max(2, progress * 100))}%` }}
          />
        </div>
      </div>

      <div className="demo-grid px-4 py-5 sm:px-6 sm:py-7">
        {/* Input */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-ink text-[9px] font-bold text-ink-foreground">
              You
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {inputVerb}
            </p>
          </div>
          <div className="mt-2.5 rounded-2xl rounded-tl-md bg-card px-4 py-3.5 shadow-[0_1px_0_rgba(0,0,0,0.02)] ring-1 ring-border">
            {media?.inputImage ? (
              <div className="mb-3 flex items-center gap-3 rounded-xl bg-secondary/60 p-2 ring-1 ring-border/70">
                <img
                  src={media.inputImage}
                  alt={media.inputImageAlt ?? "Source image for the sample"}
                  loading="lazy"
                  className="h-14 w-20 shrink-0 rounded-lg object-cover ring-1 ring-border/60"
                />
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-foreground">
                    Source image attached
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {media.inputImageAlt ?? "Uploaded still"}
                  </span>
                </span>
              </div>
            ) : null}
            {media?.inputAudio ? (
              <div className="mb-3 rounded-xl bg-secondary/60 p-2 ring-1 ring-border/70">
                <p className="mb-2 truncate text-xs font-semibold text-foreground">
                  {media.inputAudioLabel ?? "Recording attached"}
                </p>
                <audio
                  key={media.inputAudio}
                  src={media.inputAudio}
                  controls
                  controlsList={downloadControls}
                  preload="none"
                  className="w-full"
                  aria-label={`${toolName} sample input recording`}
                />
              </div>
            ) : null}
            {media?.inputVideo ? (
              <div className="mb-3 overflow-hidden rounded-xl bg-secondary/60 p-2 ring-1 ring-border/70">
                <p className="mb-2 truncate text-xs font-semibold text-foreground">
                  {media.inputVideoLabel ?? "Source video attached"}
                </p>
                <video
                  key={media.inputVideo}
                  src={media.inputVideo}
                  poster={videoPoster(media.inputVideo)}
                  controls
                  controlsList={downloadControls}
                  muted
                  playsInline
                  preload="metadata"
                  className="max-h-48 w-full rounded-lg bg-ink object-contain"
                  aria-label={`${toolName} sample input video`}
                />
              </div>
            ) : null}
            {media?.inputFileLabel ? (
              <p className="mb-3 inline-flex items-center gap-2 rounded-lg bg-secondary/70 px-2.5 py-1.5 text-xs font-semibold text-foreground ring-1 ring-border/70">
                <span aria-hidden="true">📄</span>
                {media.inputFileLabel}
              </p>
            ) : null}
            <p className="min-h-[2.5rem] text-pretty font-mono text-[13px] leading-relaxed text-foreground">
              {typed}
              {phase === "typing" ? (
                <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
              ) : null}
            </p>
          </div>
        </div>

        {/* Connector */}
        <div className="flex items-center gap-3 py-3.5" aria-hidden="true">
          <span className="h-px flex-1 bg-border" />
          <span
            className={cn(
              "flex h-6 w-6 items-center justify-center rounded-full ring-1 transition-colors",
              phase === "thinking"
                ? "bg-accent text-accent-foreground ring-accent"
                : "bg-card text-muted-foreground ring-border",
            )}
          >
            <svg viewBox="0 0 12 12" className="h-3 w-3 fill-current">
              <path d="M6 1.5 6 8.2 3.4 5.6 2.4 6.6 6 10.2 9.6 6.6 8.6 5.6 6 8.2z" />
            </svg>
          </span>
          <span className="h-px flex-1 bg-border" />
        </div>

        {/* Output */}
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-5 items-center rounded-full bg-accent/15 px-2 text-[9px] font-bold uppercase tracking-wider text-accent">
              AI
            </span>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {outputVerb}
            </p>
            {phase === "thinking" ? (
              <span className="flex gap-1" aria-label="Generating">
                <Dot delay="0ms" />
                <Dot delay="140ms" />
                <Dot delay="280ms" />
              </span>
            ) : null}
          </div>

          <div className="relative mt-2.5 overflow-hidden rounded-2xl rounded-tr-md bg-card p-4 shadow-[0_18px_40px_-32px_rgba(60,40,20,0.5)] ring-1 ring-accent/25">
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              aria-hidden="true"
            />
            {phase === "thinking" ? (
              <div className="space-y-2.5 py-1" aria-hidden="true">
                {["w-11/12", "w-full", "w-8/12"].map((w) => (
                  <div key={w} className={cn("relative h-3 overflow-hidden rounded-full bg-secondary", w)}>
                    <span className="demo-shimmer absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />
                  </div>
                ))}
              </div>
            ) : demoScene ? (
              <div className="demo-reveal">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-foreground">
                    {demoScene.label}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    {Math.min(revealed, demoScene.steps.length)}/{demoScene.steps.length} steps
                  </span>
                </div>

                {/* Connector rail */}
                {(() => {
                  const connectors = demoScene.connectors;
                  if (!connectors || connectors.length === 0) return null;
                  return (
                    <div className="agent-flow-rail mt-4">
                      <div className="agent-flow-connectors">
                        {connectors.map((connector, i) => {
                          const active =
                            revealed > 0 &&
                            demoScene.steps.slice(0, revealed).some((s) => s.connector === connector.id);
                          const currentStep = demoScene.steps[Math.min(revealed - 1, demoScene.steps.length - 1)];
                          const current = revealed > 0 && currentStep?.connector === connector.id;
                          return (
                            <div key={connector.id} className="agent-flow-connector">
                              <span
                                className={cn(
                                  "agent-flow-tile",
                                  active && "agent-flow-tile-active",
                                  current && "agent-flow-tile-current",
                                )}
                                aria-hidden="true"
                              >
                                <ConnectorIcon id={connector.id} />
                              </span>
                              <span className={cn("agent-flow-label", active && "agent-flow-label-active")}>
                                {connector.label}
                              </span>
                              {connector.note ? (
                                <span
                                  className={cn(
                                    "agent-flow-note",
                                    active && "agent-flow-note-active",
                                  )}
                                >
                                  {connector.note}
                                </span>
                              ) : null}
                              {i < connectors.length - 1 ? (
                                <span
                                  className={cn(
                                    "agent-flow-line",
                                    active && "agent-flow-line-active",
                                  )}
                                  aria-hidden="true"
                                />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}

                {/* Steps */}
                <ol className="agent-flow-steps mt-4">
                  {demoScene.steps.map((step, i) => {
                    const shown = i < revealed;
                    return (
                      <li
                        key={`${step.actor}-${i}`}
                        className={cn(
                          "agent-flow-step",
                          shown ? "agent-flow-step-shown" : "agent-flow-step-hidden",
                        )}
                      >
                        <span className="agent-flow-step-marker" aria-hidden="true">
                          {i + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="agent-flow-step-actor">{step.actor}</span>
                          <span className="agent-flow-step-text">{step.text}</span>
                        </span>
                        {step.meta ? (
                          <span className="agent-flow-step-meta">{step.meta}</span>
                        ) : null}
                      </li>
                    );
                  })}
                </ol>

                {/* Result panel */}
                {demoScene.result && revealed >= demoScene.steps.length ? (
                  <div className="agent-flow-result">
                    <span className="agent-flow-result-label">Result</span>
                    <p className="agent-flow-result-text">{demoScene.result}</p>
                  </div>
                ) : null}
                <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">
                  {media?.caption ?? example.output}
                </p>
              </div>
            ) : demoPresentation ? (
              <PresentationPreview
                title={demoPresentation.title}
                slides={demoPresentation.slides}
                caption={media?.caption ?? example.output}
              />
            ) : demoCode ? (

              <div className="demo-reveal">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-foreground">
                    {demoCode.language ?? "code"}
                  </span>
                  <span className="text-[11px] text-muted-foreground">generated file</span>
                </div>
                <pre className="mt-3 max-h-80 overflow-auto rounded-xl bg-ink px-4 py-3.5 text-[12px] leading-relaxed text-ink-foreground ring-1 ring-border/40">
                  <code className="whitespace-pre font-mono">
                    {written}
                    {phase === "writing" ? (
                      <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
                    ) : null}
                  </code>
                </pre>
                <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">
                  {demoCode.caption ?? example.output}
                </p>
              </div>
            ) : demoVideo ? (
              <div className="demo-reveal">
                {demoVideo.kind === "audio" ? (
                  <div className="rounded-xl bg-secondary/60 p-3 ring-1 ring-border/70">
                    <audio
                      key={demoVideo.url}
                      src={demoVideo.url}
                      controls
                      controlsList={downloadControls}
                      preload="metadata"
                      className="w-full"
                      aria-label={`${toolName} sample output audio`}
                    />
                  </div>
                ) : (
                  <figure className="overflow-hidden rounded-xl bg-ink ring-1 ring-border/50">
                    {demoVideo.kind === "image" ? (
                      <img
                        key={demoVideo.url}
                        src={demoVideo.url}
                        alt={demoVideo.caption ?? `${toolName} sample output image`}
                        loading="lazy"
                        className="w-full object-cover"
                      />
                    ) : (
                      <video
                        key={demoVideo.url}
                        src={demoVideo.url}
                        poster={demoVideo.poster ?? videoPoster(demoVideo.url)}
                        controlsList={downloadControls}
                        title={`${toolName} — ${example.label}`}
                        className="aspect-video w-full object-contain"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        controls
                        aria-label={`${toolName} sample video: ${example.label}. ${demoVideo.caption ?? example.output}`}
                      />
                    )}
                  </figure>
                )}
                <p className="mt-3 text-pretty text-sm leading-relaxed text-foreground/85">
                  {demoVideo.caption}
                </p>
                <p className="mt-1.5 text-pretty text-xs leading-relaxed text-muted-foreground">
                  {example.output}
                </p>
              </div>
            ) : (
              <p
                aria-live="polite"
                className="min-h-[5rem] text-pretty text-sm leading-relaxed text-foreground/85"
              >
                {renderOutput(written)}
                {phase === "writing" ? (
                  <span className="ml-0.5 inline-block h-4 w-[2px] translate-y-0.5 animate-pulse bg-accent align-middle" />
                ) : null}
              </p>
            )}
          </div>
        </div>

        {/* Example switcher */}
        {examples.length > 1 ? (
          <div className="mt-5 flex items-center gap-3">
            <span className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground sm:inline">
              Try
            </span>
            <div className="flex gap-1.5 overflow-x-auto rounded-full bg-secondary/70 p-1 ring-1 ring-border/70 sm:flex-wrap sm:overflow-visible">
              {examples.map((ex, i) => (
                <button
                  key={ex.label}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-pressed={i === index}
                  className={cn(
                    "shrink-0 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all",
                    i === index
                      ? "bg-ink text-ink-foreground shadow-[0_6px_14px_-8px_rgba(0,0,0,0.6)]"
                      : "text-foreground/65 hover:bg-card hover:text-foreground",
                  )}
                >
                  {ex.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function PresentationPreview({
  title,
  slides,
  caption,
}: {
  title: string;
  slides: ToolDemoPresentationSlide[];
  caption: string;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];
  if (!slide) return null;

  return (
    <div className="demo-reveal">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-ink-foreground">
          Presentation
        </span>
        <span className="text-[11px] font-semibold tabular-nums text-muted-foreground">
          {activeSlide + 1} / {slides.length} slides
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl bg-ink ring-1 ring-border/50">
        <PresentationSlide slide={slide} deckTitle={title} />
      </div>

      <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-6" aria-label="12-slide presentation preview">
        {slides.map((item, slideIndex) => (
          <button
            key={`${item.kicker}-${slideIndex}`}
            type="button"
            onClick={() => setActiveSlide(slideIndex)}
            aria-label={`Show slide ${slideIndex + 1}: ${item.title}`}
            aria-pressed={activeSlide === slideIndex}
            className={cn(
              "group/slide aspect-video overflow-hidden rounded-md bg-ink text-left ring-1 transition-all",
              activeSlide === slideIndex
                ? "ring-2 ring-accent"
                : "ring-border/60 hover:ring-accent/70",
            )}
          >
            <span className="flex h-full flex-col justify-between p-1.5">
              <span className="text-[6px] font-semibold uppercase text-accent">{slideIndex + 1}</span>
              <span className="line-clamp-2 text-[7px] font-semibold leading-tight text-ink-foreground">
                {item.title}
              </span>
            </span>
          </button>
        ))}
      </div>

      <p className="mt-3 text-pretty text-xs leading-relaxed text-muted-foreground">{caption}</p>
    </div>
  );
}

function PresentationSlide({
  slide,
  deckTitle,
}: {
  slide: ToolDemoPresentationSlide;
  deckTitle: string;
}) {
  return (
    <div className="relative aspect-video overflow-hidden p-5 text-ink-foreground sm:p-8">
      <div className="absolute inset-y-0 right-0 w-2/5 bg-accent/20" aria-hidden="true" />
      <div className="absolute right-[8%] top-[16%] h-20 w-20 rotate-12 border border-accent/60 sm:h-32 sm:w-32" aria-hidden="true" />
      <div className="absolute bottom-[12%] right-[18%] h-10 w-10 bg-accent sm:h-16 sm:w-16" aria-hidden="true" />
      <div className="relative flex h-full max-w-[72%] flex-col">
        <p className="text-[8px] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[10px]">{slide.kicker}</p>
        <h3 className="mt-auto text-balance text-xl font-semibold leading-[1.05] text-ink-foreground sm:text-4xl">
          {slide.title}
        </h3>
        <p className="mt-2 max-w-md text-[9px] leading-relaxed text-ink-foreground/70 sm:text-sm">{slide.detail}</p>
        <div className="mt-auto flex items-end justify-between gap-4 border-t border-ink-foreground/20 pt-2">
          <span className="text-[7px] font-semibold uppercase text-ink-foreground/55 sm:text-[9px]">{deckTitle}</span>
          <span className="flex gap-1" aria-hidden="true">
            {[0, 1, 2].map((bar) => (
              <span key={bar} className={cn("block w-5 bg-accent", bar === 1 ? "h-2" : bar === 2 ? "h-3" : "h-1")} />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <span
      className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
      style={{ animationDelay: delay }}
    />
  );
}

/**
 * Simple monochrome glyphs for connector tiles.
 * These are intentionally abstract, not copied brand logos.
 */
function ConnectorIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    gmail: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16v16H4z" />
        <path d="M4 4l8 6 8-6" />
      </svg>
    ),
    calendar: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    slack: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 10c-.8 0-1.5-.7-1.5-1.5V4c0-.8.7-1.5 1.5-1.5s1.5.7 1.5 1.5v4.5c0 .8-.7 1.5-1.5 1.5z" />
        <path d="M19.5 10h-1.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
        <path d="M10 14.5c0 .8-.7 1.5-1.5 1.5H4c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h4.5c.8 0 1.5.7 1.5 1.5z" />
        <path d="M10 19.5v-1.5c0-.8-.7-1.5-1.5-1.5s-1.5.7-1.5 1.5v1.5c0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5z" />
        <path d="M14 9.5c.8 0 1.5.7 1.5 1.5v4.5c0 .8-.7 1.5-1.5 1.5s-1.5-.7-1.5-1.5V11c0-.8.7-1.5 1.5-1.5z" />
        <path d="M9.5 14h1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5H9.5c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5z" />
      </svg>
    ),
    telegram: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.7 3.3 2.5 10.7l7.1 3.1 3.1 7.1 9-14.6z" />
        <path d="m10.5 14.5 8.2-8.2" />
      </svg>
    ),
    docs: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6 2 2 0 0 1 2-2.2h3a2 2 0 0 1 2 1.7c.2 1.3.6 2.6 1.1 3.7a2 2 0 0 1-.5 2.1L7.1 9.1a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c1.2.5 2.4.9 3.7 1.1a2 2 0 0 1 1.7 2z" />
      </svg>
    ),
    sms: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.3 8.5 8.5 0 0 1-7.3 4.2 8.4 8.4 0 0 1-4.3-1.2L3 21l2.2-5.2A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 4.2-7.3A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5z" />
      </svg>
    ),
    crm: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" />
      </svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.3 8.5 8.5 0 0 1-7.3 4.2 8.4 8.4 0 0 1-4.3-1.2L3 21l2.2-5.2A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 4.2-7.3A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5z" />
        <path d="M9 12.5s1.5-1 3-1 3 1 3 1M8 14.5s2-1.5 4-1.5 4 1.5 4 1.5" />
      </svg>
    ),
    slides: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 7h10M7 12h10M7 17h6" />
      </svg>
    ),
    instagram: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="18" cy="6" r="1.5" fill="currentColor" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 12a4 4 0 1 0 4 4V4h4" />
        <path d="M15 8a5 5 0 0 0 4-2" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
    search: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
    wordpress: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6c4.4 0 7.5 3 7.5 6.5S16.4 19 12 19s-7.5-3-7.5-6.5S7.6 6 12 6z" />
        <path d="M7.5 17.5 12 6l4.5 11.5" />
      </svg>
    ),
    chat: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.3 8.5 8.5 0 0 1-7.3 4.2 8.4 8.4 0 0 1-4.3-1.2L3 21l2.2-5.2A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 4.2-7.3A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5z" />
      </svg>
    ),
    comments: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.4 8.4 0 0 1-1.2 4.3 8.5 8.5 0 0 1-7.3 4.2 8.4 8.4 0 0 1-4.3-1.2L3 21l2.2-5.2A8.4 8.4 0 0 1 4 11.5a8.5 8.5 0 0 1 4.2-7.3A8.4 8.4 0 0 1 12.5 3h.5a8.5 8.5 0 0 1 8 8v.5z" />
        <path d="M8 12h8M8 16h5" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.5 6.4a2.8 2.8 0 0 0-2-2C18.6 3.7 12 3.7 12 3.7s-6.6 0-8.5.7a2.8 2.8 0 0 0-2 2C.8 8.3.8 12 .8 12s0 3.7.7 5.6a2.8 2.8 0 0 0 2 2c1.9.7 8.5.7 8.5.7s6.6 0 8.5-.7a2.8 2.8 0 0 0 2-2c.7-1.9.7-5.6.7-5.6s0-3.7-.7-5.6z" />
        <polygon points="9.8,15.6 15.8,12 9.8,8.4" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  };

  return (
    <span className="flex h-4 w-4 items-center justify-center">
      {icons[id] ?? (
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      )}
    </span>
  );
}
