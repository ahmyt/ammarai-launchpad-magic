import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { REGISTER_URL } from "@/lib/site";
import {
  markOfferSeen,
  offerInlineMatches,
  offerExpiryLabel,
  offerVisitorId,
} from "@/lib/offer-display";
import { recordOfferEvent } from "@/lib/offers.functions";
import { useOfferContext } from "./OfferProvider";

/**
 * The permanent block. It renders only on the paths listed in Site settings, so
 * one line in a page is enough and the studio decides where it appears.
 */
export function OfferInline() {
  const context = useOfferContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [copied, setCopied] = useState(false);

  const show =
    Boolean(context) &&
    context!.display.inline &&
    offerInlineMatches(pathname, context!.display.inlinePages);

  useEffect(() => {
    if (!show || !context?.offer) return;
    if (!markOfferSeen(context.offer.id, "inline")) return;
    void recordOfferEvent({
      data: {
        offerId: context.offer.id,
        event: "seen",
        source: "inline",
        page: typeof window === "undefined" ? "" : window.location.pathname,
        visitorId: offerVisitorId(),
      },
    });
  }, [show, context]);

  if (!show || !context) return null;
  const { offer, claim, copyCode } = context;

  const handleCopy = async () => {
    if (await copyCode("inline")) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="offer-inline" aria-label="Current discount campaign">
      <div className="offer-inline-main">
        {offer.label ? <p className="offer-kicker">{offer.label}</p> : null}
        <h2 className="offer-inline-title">{offer.headline}</h2>
        {offer.discountLabel ? <p className="offer-discount">{offer.discountLabel}</p> : null}
        {offer.terms ? <p className="offer-terms">{offer.terms}</p> : null}
      </div>
      <div className="offer-inline-side">
        <div className="offer-code-row">
          <p className="offer-code">{offer.code}</p>
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
        <a href={REGISTER_URL} className="offer-cta" onClick={() => void claim("inline")}>
          Start free and use my code
        </a>
      </div>
    </section>
  );
}
