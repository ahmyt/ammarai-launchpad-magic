import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TutorialFigure } from "@/components/site/TutorialFigure";
import type { TutorialStep } from "@/data/tutorials";

export function VoiceToolWorkflow({ label, steps }: { label: string; steps: TutorialStep[] }) {
  const [selected, setSelected] = useState(0);
  const current = steps[selected];
  return <>
    <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label={label}>
      {steps.map((step, index) => <Button key={step.title} role="tab" id={`workflow-${index}`} aria-controls="workflow-panel" aria-selected={selected === index} variant={selected === index ? "default" : "outline"} onClick={() => setSelected(index)}>{index + 1}. {step.title}</Button>)}
    </div>
    {current ? <div id="workflow-panel" role="tabpanel" aria-labelledby={`workflow-${selected}`} className="mt-8 grid gap-8 border-y border-border py-8 md:grid-cols-2">
      <div><p className="eyebrow">{String(selected + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p><h3 className="mt-4 text-2xl">{current.title}</h3><p className="mt-4 leading-relaxed text-muted-foreground">{current.body}</p></div>
      {current.image ? <TutorialFigure image={current.image} /> : <div className="flex items-center border-l-2 border-accent pl-6"><p className="text-xl leading-relaxed">{current.title}</p></div>}
    </div> : null}
  </>;
}