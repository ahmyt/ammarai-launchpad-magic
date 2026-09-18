import { useState } from "react";
import type { Example } from "@/data/types";

export function SamplePromptAccordion({ examples }: { examples: Example[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <p className="eyebrow">All sample prompts</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          Browse every prompt and its matching output description.
        </p>
      </div>

      <div>
        {examples.map((example, index) => {
          const isOpen = openIndex === index;
          const contentId = `sample-prompt-${index}`;

          return (
            <details
              key={example.label}
              open={isOpen}
              className="group border-b border-border last:border-b-0"
            >
              <summary
                aria-controls={contentId}
                aria-expanded={isOpen}
                onClick={(event) => {
                  event.preventDefault();
                  setOpenIndex(isOpen ? null : index);
                }}
                className="flex cursor-pointer list-none items-center gap-4 px-5 py-4 text-left marker:hidden sm:px-6"
              >
                <span className="shrink-0 font-mono text-xs font-semibold tabular-nums text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1 text-sm font-semibold text-foreground sm:text-base">
                  {example.label}
                </span>
                <svg
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                >
                  <path d="m5 7.5 5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </summary>

              <div id={contentId} className="grid gap-5 border-t border-border px-5 py-5 sm:grid-cols-2 sm:px-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Input</p>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-foreground">{example.input}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Output</p>
                  <p className="mt-2 text-pretty text-sm leading-relaxed text-muted-foreground">{example.output}</p>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </div>
  );
}