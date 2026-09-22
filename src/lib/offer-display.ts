import type { Page } from "@/data/types";

export interface OfferDisplay {
  /** Master switch from Site settings. */
  enabled: boolean;
  exitIntent: boolean;
  timed: boolean;
  stickyMobile: boolean;
  inline: boolean;
  /** Milliseconds before the timed card appears. */
  delayMs: number;
  /** Milliseconds to wait before a dismissed offer may show again. */
  reshowMs: number;
  /** Paths that carry the permanent block. */
  inlinePages: string[];
}

const numberFrom = (raw: string | undefined, min: number, max: number, fallback: number) => {
  const parsed = Number.parseInt((raw ?? "").trim(), 10);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(max, Math.max(min, parsed));
};

/** Reads the offer switches from the Site settings page. */
export function offerDisplayFromPage(page?: Page): OfferDisplay {
  const delaySeconds = numberFrom(page?.offerDelaySeconds, 5, 600, 30);
  const reshowDays = numberFrom(page?.offerReshowDays, 0, 90, 3);
  const inlinePages = (page?.offerInlinePages ?? [])
    .map((path) => (typeof path === "string" ? path.trim() : ""))
    .filter((path) => path.startsWith("/"));
  return {
    enabled: page?.offerEnabled !== false,
    exitIntent: page?.offerShowExitIntent !== false,
    timed: page?.offerShowTimed !== false,
    stickyMobile: page?.offerShowStickyMobile !== false,
    inline: page?.offerShowInline !== false,
    delayMs: delaySeconds * 1000,
    reshowMs: reshowDays * 24 * 60 * 60 * 1000,
    inlinePages: inlinePages.length ? inlinePages : ["/pricing"],
  };
}

/** True when the current path should carry the permanent block. */
export function offerInlineMatches(pathname: string, pages: string[]): boolean {
  return pages.some(
    (page) => pathname === page || pathname.startsWith(page.endsWith("/") ? page : `${page}/`),
  );
}

/** Human expiry line, e.g. "Ends in 3 days" or "Ends today". */
export function offerExpiryLabel(expiresAt: string | null, now = Date.now()): string {
  if (!expiresAt) return "Limited-time campaign";
  const ms = new Date(expiresAt).getTime() - now;
  if (!Number.isFinite(ms) || ms <= 0) return "This campaign has ended";
  const hours = Math.floor(ms / 3_600_000);
  if (hours < 1) return `Ends in ${Math.max(1, Math.floor(ms / 60_000))} minutes`;
  if (hours < 24) return `Ends in ${hours} hours`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Ends tomorrow";
  if (days < 30) return `Ends in ${days} days`;
  return `Ends ${new Date(expiresAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })}`;
}

/**
 * Random per-browser id so one person cannot drain a single-use code. The
 * server hashes it together with the request IP; the raw id is never stored
 * outside this browser.
 */
const VISITOR_KEY = "ammarai-offer-visitor";

export const offerVisitorId = (): string => {
  if (typeof window === "undefined") return "";
  try {
    const existing = window.localStorage.getItem(VISITOR_KEY);
    if (existing) return existing;
    const next =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    window.localStorage.setItem(VISITOR_KEY, next);
    return next;
  } catch {
    return "";
  }
};

const STORE_KEY = "ammarai-offer";

interface OfferStore {
  offerId?: string;
  dismissedAt?: number;
  claimedAt?: number;
  /** Placements already counted this session, so impressions are not doubled. */
  seen?: Record<string, true>;
}

const readStore = (): OfferStore => {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    const parsed = raw ? (JSON.parse(raw) as OfferStore) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

const writeStore = (patch: OfferStore): void => {
  if (typeof window === "undefined") return;
  try {
    const next = { ...readStore(), ...patch };
    window.localStorage.setItem(STORE_KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable — the offer simply shows again */
  }
};

/** Should this visitor still be shown the offer? */
export function offerIsEligible(offerId: string, reshowMs: number): boolean {
  const store = readStore();
  if (store.claimedAt && store.offerId === offerId) return false;
  if (!store.dismissedAt) return true;
  if (store.offerId !== offerId) return true;
  return Date.now() - store.dismissedAt >= reshowMs;
}

export const markOfferDismissed = (offerId: string): void => {
  writeStore({ offerId, dismissedAt: Date.now() });
};

export const markOfferClaimed = (offerId: string): void => {
  writeStore({ offerId, claimedAt: Date.now() });
};

/** Has this browser already been handed this campaign's code? */
export const offerAlreadyClaimed = (offerId: string): boolean => {
  const store = readStore();
  return Boolean(store.claimedAt) && store.offerId === offerId;
};

/** Records a placement once per session so the studio counts stay readable. */
export const markOfferSeen = (offerId: string, placement: string): boolean => {
  const store = readStore();
  if (store.seen?.[placement]) return false;
  writeStore({
    offerId,
    seen: { ...(store.seen ?? {}), [placement]: true },
  });
  return true;
};
