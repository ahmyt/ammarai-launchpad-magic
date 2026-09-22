import { useEffect, useRef, useState } from "react";
import { REGISTER_URL } from "@/lib/site";
import { offerExpiryLabel } from "@/lib/offer-display";
import type {
  ActiveOffer,
  ClaimResult,
  OfferSource,
} from "@/lib/offers.functions";

interface OfferCardProps {
  offer: ActiveOffer;
  source: OfferSource;
  onClose: () => void;
  onClaim: (source: OfferSource) => Promise<ClaimResult>;
  onCopy: (source: OfferSource) => Promise<boolean>;
}

/**
 * The offer card. A real dialog: focus is trapped, Escape closes it, and the
 * code is copied with a visible confirmation before the signup link opens.
 */
export function OfferCard({ offer, source, onClose, onClaim, onCopy }: OfferCardProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("[data-offer-primary]")?.focus();
    const previous = document.activeElement as HTMLElement | null;
    return () => previous?.focus?.();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleCopy = async () => {
    if (await onCopy(source)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleOpen = async () => {
    const result = await onClaim(source);
    if (!result.claimed && result.reason !== "rate_limited") setUnavailable(true);
  };

  return (
    <div
      className="offer-overlay fixed inset-0 z-[80] flex items-center justify-center p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="offer-card-title"
        className="offer-card relative w-full max-w-lg"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close this offer"
          className="offer-close absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full text-lg text-muted-foreground hover:text-foreground"
        >
          ×
        </button>

        <div className="offer-card-body">
          {offer.label ? <p className="offer-kicker">{offer.label}</p> : null}
          <h2 id="offer-card-title" className="offer-title">
            {offer.headline}
          </h2>
          {offer.discountLabel ? (
            <p className="offer-discount">{offer.discountLabel}</p>
          ) : null}

          <div className="offer-code-row">
            <p className="offer-code" aria-live="polite">
              {offer.code}
            </p>
            <button
              type="button"
              onClick={handleCopy}
              className="offer-copy"
              aria-label={`Copy discount code ${offer.code}`}
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <p className="offer-expiry">{offerExpiryLabel(offer.expiresAt)}</p>

          <a
            href={REGISTER_URL}
            data-offer-primary
            className="offer-cta"
            onClick={() => void handleOpen()}
          >
            Start free and use my code
          </a>

          <div className="offer-foot">
            {offer.terms ? <p className="offer-terms">{offer.terms}</p> : null}
            {unavailable ? (
              <p className="offer-terms">
                This campaign is no longer available — you can still start free.
              </p>
            ) : null}
            <button type="button" onClick={onClose} className="offer-dismiss">
              No thanks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
