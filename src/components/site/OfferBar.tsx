import { useState } from "react";
import { REGISTER_URL } from "@/lib/site";
import { offerExpiryLabel } from "@/lib/offer-display";
import type {
  ActiveOffer,
  ClaimResult,
  OfferSource,
} from "@/lib/offers.functions";

interface OfferBarProps {
  offer: ActiveOffer;
  onDismiss: () => void;
  onClaim: (source: OfferSource) => Promise<ClaimResult>;
  onCopy: (source: OfferSource) => Promise<boolean>;
}

/**
 * Phones get a sticky bar rather than a modal — nothing covers the page and it
 * can be dismissed with one tap.
 */
export function OfferBar({ offer, onDismiss, onClaim, onCopy }: OfferBarProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (await onCopy("sticky")) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="offer-bar" role="region" aria-label="Discount offer">
      <div className="offer-bar-inner">
        <div className="offer-bar-copy">
          <p className="offer-bar-headline">{offer.headline}</p>
          <p className="offer-bar-meta">
            {offer.discountLabel ? `${offer.discountLabel} · ` : ""}
            {offerExpiryLabel(offer.expiresAt)}
          </p>
        </div>
        <div className="offer-bar-actions">
          <button
            type="button"
            onClick={handleCopy}
            className="offer-bar-copy-btn"
            aria-label={`Copy discount code ${offer.code}`}
          >
            {copied ? "Copied" : offer.code}
          </button>
          <a
            href={REGISTER_URL}
            className="offer-bar-cta"
            onClick={() => void onClaim("sticky")}
          >
            Start free
          </a>
          <button
            type="button"
            onClick={onDismiss}
            className="offer-bar-close"
            aria-label="Dismiss this offer"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
