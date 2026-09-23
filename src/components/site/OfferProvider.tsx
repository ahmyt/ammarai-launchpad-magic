import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useHydrated } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { siteContentQuery } from "@/lib/content";
import {
  claimOffer as claimOfferServerFn,
  getActiveOffer,
  recordOfferEvent,
  type ActiveOffer,
  type ClaimResult,
  type OfferSource,
} from "@/lib/offers.functions";
import {
  markOfferClaimed,
  markOfferDismissed,
  markOfferSeen,
  offerAlreadyClaimed,
  offerDisplayFromPage,
  offerIsEligible,
  offerVisitorId,
  type OfferDisplay,
} from "@/lib/offer-display";
import { OfferCard } from "./OfferCard";
import { OfferBar } from "./OfferBar";

interface OfferContextValue {
  offer: ActiveOffer;
  display: OfferDisplay;
  /** Redeem a use of the campaign and return the code. */
  claim: (source: OfferSource) => Promise<ClaimResult>;
  /** Copy the code to the clipboard, counting the copy once. */
  copyCode: (source: OfferSource) => Promise<boolean>;
}

const OfferContext = createContext<OfferContextValue | null>(null);

export function useOfferContext(): OfferContextValue | null {
  return useContext(OfferContext);
}

const useIsMobile = (): boolean => {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const sync = () => setMobile(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);
  return mobile;
};

/**
 * Loads the live campaign in the browser after hydration — never from a route
 * loader, so the server HTML stays small — and drives the four placements.
 */
export function OfferProvider({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  const contentQuery = useQuery({ ...siteContentQuery, enabled: hydrated });
  const settings = contentQuery.data?.pages.find((page) => page.slug === "settings");
  const display = useMemo(() => offerDisplayFromPage(settings), [settings]);
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    setDelayElapsed(false);
    if (!hydrated || !contentQuery.isFetched || !display.enabled) return;
    const timer = window.setTimeout(() => setDelayElapsed(true), display.delayMs);
    return () => window.clearTimeout(timer);
  }, [hydrated, contentQuery.isFetched, display.enabled, display.delayMs]);

  // Do not request campaign data during startup. The offer cannot appear before
  // this delay anyway, so the network and server work can wait too.
  const ready = hydrated && contentQuery.isFetched && display.enabled && delayElapsed;
  const offerQuery = useQuery({
    queryKey: ["active-offer"],
    queryFn: () => getActiveOffer(),
    enabled: ready,
    staleTime: 5 * 60 * 1000,
  });
  const offer = offerQuery.data ?? null;

  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<OfferSource>("timed");
  const [barVisible, setBarVisible] = useState(false);
  const shownRef = useRef(false);

  // Sticky bar on phones: a plain region, not a modal. It waits out the same
  // delay as the desktop card so nothing appears the instant a page loads.
  useEffect(() => {
    setBarVisible(false);
    if (!offer || !isMobile || !display.stickyMobile) return;
    if (!offerIsEligible(offer.id, display.reshowMs)) return;
    setBarVisible(true);
  }, [offer, isMobile, display]);

  // Exit-intent and timed cards on desktop only.
  useEffect(() => {
    setOpen(false);
    shownRef.current = false;
    if (!offer || !ready || isMobile) return;
    if (!display.exitIntent && !display.timed) return;
    if (!offerIsEligible(offer.id, display.reshowMs)) return;

    const openWith = (source: OfferSource) => {
      if (shownRef.current) return;
      shownRef.current = true;
      setMode(source);
      setOpen(true);
    };

    const onMouseOut = (event: MouseEvent) => {
      if (!display.exitIntent) return;
      if (!event.relatedTarget && event.clientY <= 0) openWith("exit_intent");
    };

    const onScroll = () => {
      if (!display.timed) return;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 200 && window.scrollY >= scrollable / 2) openWith("timed");
    };

    if (display.timed) openWith("timed");

    document.addEventListener("mouseout", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [offer, ready, isMobile, display]);

  const recordSeen = useCallback(
    (source: OfferSource) => {
      if (!offer) return;
      if (!markOfferSeen(offer.id, source)) return;
      void recordOfferEvent({
        data: {
          offerId: offer.id,
          event: "seen",
          source,
          page: typeof window === "undefined" ? "" : window.location.pathname,
          visitorId: offerVisitorId(),
        },
      });
    },
    [offer],
  );

  useEffect(() => {
    if (open) recordSeen(mode);
  }, [open, mode, recordSeen]);

  useEffect(() => {
    if (barVisible) recordSeen("sticky");
  }, [barVisible, recordSeen]);

  const claim = useCallback(
    async (source: OfferSource): Promise<ClaimResult> => {
      if (!offer) return { claimed: false, reason: "missing" };
      // This browser already holds the code — do not spend a second use.
      if (offerAlreadyClaimed(offer.id)) return { claimed: true, code: offer.code };
      try {
        const result = await claimOfferServerFn({
          data: {
            offerId: offer.id,
            source,
            page: typeof window === "undefined" ? "" : window.location.pathname,
            visitorId: offerVisitorId(),
          },
        });
        if (result.claimed) markOfferClaimed(offer.id);
        return result;
      } catch (error) {
        console.error("offer claim failed", error);
        return { claimed: false, reason: "error" };
      }
    },
    [offer],
  );

  const copyCode = useCallback(
    async (source: OfferSource): Promise<boolean> => {
      if (!offer) return false;
      let copied = false;
      try {
        await navigator.clipboard.writeText(offer.code);
        copied = true;
      } catch {
        const field = document.createElement("textarea");
        field.value = offer.code;
        field.setAttribute("readonly", "");
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        try {
          copied = document.execCommand("copy");
        } catch {
          copied = false;
        }
        document.body.removeChild(field);
      }
      if (copied && markOfferSeen(offer.id, `copied-${source}`)) {
        void recordOfferEvent({
          data: {
            offerId: offer.id,
            event: "copied",
            source,
            page: typeof window === "undefined" ? "" : window.location.pathname,
            visitorId: offerVisitorId(),
          },
        });
        // A copy counts as a use straight away, so the studio sees real demand.
        if (!offerAlreadyClaimed(offer.id)) void claim(source);
      }
      return copied;
    },
    [offer, claim],
  );

  const value = useMemo<OfferContextValue | null>(
    () => (offer ? { offer, display, claim, copyCode } : null),
    [offer, display, claim, copyCode],
  );

  const close = useCallback(() => {
    setOpen(false);
    if (offer) markOfferDismissed(offer.id);
  }, [offer]);

  const dismissBar = useCallback(() => {
    setBarVisible(false);
    if (offer) markOfferDismissed(offer.id);
  }, [offer]);

  return (
    <OfferContext.Provider value={value}>
      {children}
      {offer && open && !isMobile ? (
        <OfferCard
          offer={offer}
          onClose={close}
          onClaim={claim}
          onCopy={copyCode}
          source={mode}
        />
      ) : null}
      {offer && barVisible && isMobile ? (
        <OfferBar offer={offer} onDismiss={dismissBar} onClaim={claim} onCopy={copyCode} />
      ) : null}
    </OfferContext.Provider>
  );
}
