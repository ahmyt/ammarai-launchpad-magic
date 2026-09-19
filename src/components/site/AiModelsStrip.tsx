const models = [
  "OpenAI",
  "GPT-4o",
  "GPT-4o Mini",
  "GPT-4 Turbo",
  "GPT-4",
  "GPT-3.5",
  "Gemini",
  "Anthropic Claude",
  "xAI Grok",
  "DeepSeek",
  "Meta Llama",
  "OpenRouter",
  "Perplexity",
  "DALL·E 2",
  "DALL·E 3",
  "Stable Diffusion 3",
  "fal.ai",
  "ElevenLabs",
  "Azure AI",
];

function ModelTrack({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="ai-model-track" aria-hidden={duplicate || undefined}>
      {models.map((model) => (
        <span key={model} className="ai-model-badge" tabIndex={duplicate ? undefined : 0}>
          {model}
        </span>
      ))}
    </div>
  );
}

export function AiModelsStrip() {
  return (
    <section aria-labelledby="ai-models-strip-heading" className="ai-model-strip border-y border-border bg-background py-10">
      <h2 id="ai-models-strip-heading" className="mb-7 text-center font-sans text-xs font-semibold uppercase text-muted-foreground">
        Every major AI model, built in
      </h2>
      <div className="ai-model-marquee" role="group" aria-label="AI models available in the AmmarAI workspace">
        <ModelTrack />
        <ModelTrack duplicate />
      </div>
    </section>
  );
}