import { useState } from "react";
import { Phone, PhoneCall } from "lucide-react";
import { ActionButton } from "./Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const PHONE_DEMO_NUMBER = "+18337729060";
export const PHONE_DEMO_NUMBER_FORMATTED = "+1 (833) 772-9060";

/**
 * Button that opens a pop-up showing the live demo AI phone agent's number,
 * so visitors can call it and have a real conversation.
 */
export function PhoneDemoButton({
  className,
  label = "Call the live demo agent",
  phoneNumber = PHONE_DEMO_NUMBER,
  phoneNumberFormatted = PHONE_DEMO_NUMBER_FORMATTED,
  agentName = "AmmarAI",
}: {
  className?: string;
  label?: string;
  phoneNumber?: string;
  phoneNumberFormatted?: string;
  agentName?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ActionButton type="button" onClick={() => setOpen(true)} className={className}>
        <Phone className="size-4 shrink-0" aria-hidden="true" />
        {label}
      </ActionButton>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Talk to the {agentName} demo phone agent</DialogTitle>
            <DialogDescription>
              Call the number below from any phone. A live {agentName} phone agent will
              answer, chat with you and show how it handles a real conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2 flex flex-col items-center gap-4 border border-border bg-secondary/50 px-6 py-8 text-center">
            <span className="grid size-12 place-items-center bg-accent text-accent-foreground">
              <PhoneCall className="size-5" aria-hidden="true" />
            </span>
            <a
              href={`tel:${phoneNumber}`}
              className="text-2xl font-semibold tracking-tight text-foreground underline-offset-4 hover:text-accent hover:underline sm:text-3xl"
            >
              {phoneNumberFormatted}
            </a>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Tap the number to call on mobile, or dial it from any phone.
              Standard carrier rates may apply.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
