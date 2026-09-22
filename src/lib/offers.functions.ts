import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { createClient } from "@supabase/supabase-js";
import { createHash } from "node:crypto";
import type { Database } from "@/integrations/supabase/types";

export type OfferUseType = "single_use" | "multi_use";
export type OfferSource = "exit_intent" | "timed" | "sticky" | "inline" | "direct";

/** The single live campaign a visitor is allowed to see, if any. */
export interface ActiveOffer {
  id: string;
  slug: string;
  label: string;
  headline: string;
  discountLabel: string;
  terms: string;
  code: string;
  useType: OfferUseType;
  startsAt: string | null;
  expiresAt: string | null;
  /** Uses left, or null when unlimited. */
  remaining: number | null;
}

export interface ClaimResult {
  claimed: boolean;
  code?: string;
  reason?:
    | "expired"
    | "exhausted"
    | "unavailable"
    | "not_started"
    | "rate_limited"
    | "missing"
    | "error";
}

/**
 * A short-lived, anonymous client fingerprint. It exists only to stop one
 * visitor draining a single-use code; the raw address is never stored.
 */
const clientIp = (): string => {
  try {
    const headers = getRequest().headers;
    return (
      headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      headers.get("cf-connecting-ip")?.trim() ||
      headers.get("x-real-ip")?.trim() ||
      ""
    );
  } catch {
    return "";
  }
};

/**
 * Hashes whatever identification is available: the visitor's browser id, the
 * request IP when the host forwards one, or both. Only the hash is written.
 */
const fingerprint = (ip: string, visitorId: string): string => {
  const seed = [ip, visitorId].filter(Boolean).join("|");
  if (!seed) return "";
  return createHash("sha256").update(seed).digest("hex").slice(0, 16);
};

const publicClient = () =>
  createClient<Database>(
    process.env["SUPABASE_URL"]!,
    process.env["SUPABASE_PUBLISHABLE_KEY"]!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        // Publishable keys are opaque, not JWTs: send apikey only.
        fetch: (input, init) => {
          const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? "";
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    },
  );

/** Returns the one live campaign, or null when there is none. */
export const getActiveOffer = createServerFn({ method: "GET" }).handler(
  async (): Promise<ActiveOffer | null> => {
    const supabase = publicClient();
    const { data, error } = await supabase.rpc("get_active_offer");
    if (error) {
      console.error("get_active_offer failed", error.message);
      return null;
    }
    const rows = (data ?? []) as unknown as Record<string, unknown>[];
    const row = rows[0];
    if (!row) return null;

    const remaining =
      row["remaining"] == null ? null : Number(row["remaining"]);
    return {
      id: String(row["id"]),
      slug: String(row["slug"]),
      label: String(row["label"] ?? ""),
      headline: String(row["headline"] ?? ""),
      discountLabel: String(row["discount_label"] ?? ""),
      terms: String(row["terms"] ?? ""),
      code: String(row["code"] ?? ""),
      useType: row["use_type"] === "single_use" ? "single_use" : "multi_use",
      startsAt: row["starts_at"] == null ? null : String(row["starts_at"]),
      expiresAt: row["expires_at"] == null ? null : String(row["expires_at"]),
      remaining: Number.isFinite(remaining) ? remaining : null,
    };
  },
);

/** Hand out the code and count one use. Rate-limited per client. */
export const claimOffer = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      offerId: string;
      source: OfferSource;
      page: string;
      visitorId: string;
    }) => input,
  )
  .handler(async ({ data }): Promise<ClaimResult> => {
    const ipHash = fingerprint(clientIp(), data.visitorId ?? "");
    if (!ipHash) return { claimed: false, reason: "unavailable" };

    if (!rateLimit(`claim:${ipHash}`, 8, 60_000)) {
      return { claimed: false, reason: "rate_limited" };
    }
    if (!rateLimit(`claimday:${ipHash}`, 60, 86_400_000)) {
      return { claimed: false, reason: "rate_limited" };
    }

    const supabase = publicClient();
    const { data: result, error } = await supabase.rpc("claim_offer", {
      _offer_id: data.offerId,
      _source: data.source,
      _page: String(data.page ?? "").slice(0, 200),
      _ip_hash: ipHash,
    });
    if (error) {
      console.error("claim_offer failed", error.message);
      return { claimed: false, reason: "unavailable" };
    }

    const outcome = (result ?? {}) as Record<string, unknown>;
    if (outcome["claimed"] === true && typeof outcome["code"] === "string") {
      return { claimed: true, code: outcome["code"] };
    }
    const reason = outcome["reason"];
    return {
      claimed: false,
      reason:
        reason === "expired" || reason === "exhausted" || reason === "not_started"
          ? reason
          : "unavailable",
    };
  });

/** Record a view or a copy so the studio can see what is working. */
export const recordOfferEvent = createServerFn({ method: "POST" })
  .inputValidator(
    (input: {
      offerId: string;
      event: "seen" | "copied";
      source: OfferSource;
      page: string;
      visitorId: string;
    }) => input,
  )
  .handler(async ({ data }): Promise<void> => {
    const ipHash = fingerprint(clientIp(), data.visitorId ?? "");
    if (!ipHash) return;
    if (!rateLimit(`event:${ipHash}`, 60, 60_000)) return;
    if (!rateLimit(`eventday:${ipHash}`, 300, 86_400_000)) return;

    const supabase = publicClient();
    const { error } = await supabase.rpc("record_offer_event", {
      _offer_id: data.offerId,
      _event: data.event,
      _source: data.source,
      _page: String(data.page ?? "").slice(0, 200),
      _ip_hash: ipHash,
    });
    if (error) console.error("record_offer_event failed", error.message);
  });

// ---- lightweight in-process rate limits (same approach as the contact form) ----

interface RateBucket {
  count: number;
  resetAt: number;
}

const rateBuckets = new Map<string, RateBucket>();

const rateLimit = (key: string, max: number, windowMs: number): boolean => {
  const now = Date.now();
  const existing = rateBuckets.get(key);
  if (existing && now < existing.resetAt) {
    if (existing.count >= max) return false;
    existing.count += 1;
    return true;
  }
  rateBuckets.set(key, { count: 1, resetAt: now + windowMs });
  if (rateBuckets.size > 10_000) {
    for (const [k, v] of rateBuckets) {
      if (now >= v.resetAt) rateBuckets.delete(k);
    }
  }
  return true;
};
