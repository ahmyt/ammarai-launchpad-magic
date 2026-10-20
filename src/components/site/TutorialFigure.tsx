import { useState } from "react";
import { Expand, ZoomIn, ZoomOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import type { TutorialStep } from "@/data/tutorials";

export function TutorialFigure({ image }: { image: NonNullable<TutorialStep["image"]> }) {
  const [open, setOpen] = useState(false);
  const [actualSize, setActualSize] = useState(false);

  return (
    <figure className="tutorial-step-figure">
      <div className="relative">
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
        <Button variant="outline" size="icon" className="absolute bottom-2 right-2 bg-background" aria-label={`Enlarge: ${image.alt}`} title="Enlarge screenshot" onClick={() => { setActualSize(false); setOpen(true); }}>
          <Expand aria-hidden="true" />
        </Button>
      </div>
      {image.caption ? <figcaption>{image.caption}</figcaption> : null}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-[96vw] gap-3 p-4">
          <DialogTitle className="pr-10 text-base">{image.caption || image.alt}</DialogTitle>
          <DialogDescription className="sr-only">{image.alt}</DialogDescription>
          <div className="flex justify-end">
            <Button variant="outline" size="icon" aria-label={actualSize ? "Fit screenshot" : "View original size"} title={actualSize ? "Fit screenshot" : "View original size"} onClick={() => setActualSize(value => !value)}>
              {actualSize ? <ZoomOut aria-hidden="true" /> : <ZoomIn aria-hidden="true" />}
            </Button>
          </div>
          <div className="max-h-[75dvh] overflow-auto overscroll-contain border border-border bg-card">
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} className={actualSize ? "block h-auto max-w-none" : "mx-auto block h-auto max-h-[75dvh] max-w-full object-contain"} />
          </div>
        </DialogContent>
      </Dialog>
    </figure>
  );
}