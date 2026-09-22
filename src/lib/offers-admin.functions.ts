import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type OfferUseType = "single_use" | "multi_use";

export interface OfferRow {
  id: string;
  slug: string;
  label: string;
  headline: string;
  discountLabel: string;
  terms: string;
  code: string;
  useType: OfferUseType;
  maxUses: number | null;
  usedCount: number;
  startsAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
  createdAt: string;
  seen: number;
  copied: number;
  claimed: number;
  lastClaimedAt: string | null;
}

export interface OfferDraft {
  id?: string;
  slug: string;
  label: string;
  headline: string;
  discountLabel: string;
  terms: string;
  code: string;
  useType: OfferUseType;
  maxUses: number | null;
  startsAt: string | null;
  expiresAt: string | null;
  isActive: boolean;
}

const asString = (value: unknown, fallback = ""): string =>
  typeof value === "string" ? value : fallback;

const asIso = (value: unknown): string | null =>
  value == null || value === "" ? null : new Date(String(value)).toISOString();

const mapRow = (row: Record<string, unknown>): OfferRow => ({
  id: asString(row["id"]),
  slug: asString(row["slug"]),
  label: asString(row["label"]),
  headline: asString(row["headline"]),
  discountLabel: asString(row["discount_label"]),
  terms: asString(row["terms"]),
  code: asString(row["code"]),
  useType: row["use_type"] === "single_use" ? "single_use" : "multi_use",
  maxUses: row["max_uses"] == null ? null : Number(row["max_uses"]),
  usedCount: Number(row["used_count"] ?? 0),
  startsAt: row["starts_at"] == null ? null : asIso(row["starts_at"]),
  expiresAt: row["expires_at"] == null ? null : asIso(row["expires_at"]),
  isActive: Boolean(row["is_active"]),
  createdAt: asIso(row["created_at"]) ?? "",
  seen: Number(row["seen"] ?? 0),
  copied: Number(row["copied"] ?? 0),
  claimed: Number(row["claimed"] ?? 0),
  lastClaimedAt: row["last_claimed"] == null ? null : asIso(row["last_claimed"]),
});

/** Throws unless the caller is an administrator. */
const assertAdmin = (result: { data: unknown; error: unknown }): void => {
  if (result.error || result.data !== true) throw new Error("Forbidden");
};

/** Every campaign with its counters, newest first. Admins only. */
export const listOffers = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<OfferRow[]> => {
    assertAdmin(
      await context.supabase.rpc("has_role", {
        _user_id: context.userId,
        _role: "admin",
      }),
    );
    const { data, error } = await context.supabase
      .from("offers")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;

    const rows = (data ?? []) as unknown as Record<string, unknown>[];
    return Promise.all(
      rows.map(async (row) => {
        const { data: stats, error: statsError } = await context.supabase.rpc(
          "admin_offer_stats",
          { _offer_id: String(row["id"]) },
        );
        if (statsError) console.error("admin_offer_stats failed", statsError.message);
        const counts = (stats ?? {}) as Record<string, unknown>;
        return mapRow({
          ...row,
          seen: counts["seen"] ?? 0,
          copied: counts["copied"] ?? 0,
          claimed: counts["claimed"] ?? 0,
          last_claimed: counts["last_claimed"] ?? null,
        });
      }),
    );
  });

/** Create or update a campaign. Refuses a second live campaign. */
export const saveOffer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { draft: OfferDraft }) => input)
  .handler(async ({ data, context }): Promise<OfferRow> => {
    assertAdmin(
      await context.supabase.rpc("has_role", {
        _user_id: context.userId,
        _role: "admin",
      }),
    );
    const draft = data.draft;

    const slug = draft.slug
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9-]+/g, "-")
      .replace(/^-|-$/g, "");
    const code = draft.code.trim().toUpperCase().replace(/\s+/g, "");
    if (!slug) throw new Error("Give the campaign a reference (for example launch-20).");
    if (!code) throw new Error("The campaign needs a discount code.");
    if (!draft.headline.trim()) throw new Error("Write the headline visitors will see.");

    const startsAt = asIso(draft.startsAt);
    const expiresAt = asIso(draft.expiresAt);
    if (startsAt && expiresAt && new Date(expiresAt) <= new Date(startsAt)) {
      throw new Error("The expiry must be after the start.");
    }
    const maxUses =
      draft.useType === "multi_use" && draft.maxUses != null && Number(draft.maxUses) > 0
        ? Math.floor(Number(draft.maxUses))
        : null;

    const payload = {
      slug,
      label: draft.label.trim(),
      headline: draft.headline.trim(),
      discount_label: draft.discountLabel.trim(),
      terms: draft.terms.trim(),
      code,
      use_type: draft.useType,
      max_uses: maxUses,
      starts_at: startsAt,
      expires_at: expiresAt,
      is_active: Boolean(draft.isActive),
    };

    if (payload.is_active) {
      const { data: live, error: liveError } = await context.supabase
        .from("offers")
        .select("id, slug")
        .eq("is_active", true)
        .neq("id", draft.id ?? "00000000-0000-0000-0000-000000000000");
      if (liveError) throw liveError;
      const clash = (live ?? [])[0] as { slug?: string } | undefined;
      if (clash) {
        throw new Error(
          `Only one campaign can be live at a time — deactivate "${clash.slug}" first.`,
        );
      }
    }

    const supabase = context.supabase;
    if (draft.id) {
      const { data: updated, error } = await supabase
        .from("offers")
        .update(payload)
        .eq("id", draft.id)
        .select("*");
      if (error) throw error;
      const row = (updated ?? [])[0] as unknown as Record<string, unknown> | undefined;
      if (!row) throw new Error("That campaign no longer exists.");
      return mapRow(row);
    }

    const { data: created, error } = await supabase
      .from("offers")
      .insert(payload)
      .select("*");
    if (error) throw error;
    const row = (created ?? [])[0] as unknown as Record<string, unknown> | undefined;
    if (!row) throw new Error("The campaign could not be created.");
    return mapRow(row);
  });

/** Put the used-count back to zero after a campaign is edited. */
export const resetOfferCount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }): Promise<void> => {
    assertAdmin(
      await context.supabase.rpc("has_role", {
        _user_id: context.userId,
        _role: "admin",
      }),
    );
    const { error } = await context.supabase
      .from("offers")
      .update({ used_count: 0 })
      .eq("id", data.id);
    if (error) throw error;
  });

export const deleteOffer = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }): Promise<void> => {
    assertAdmin(
      await context.supabase.rpc("has_role", {
        _user_id: context.userId,
        _role: "admin",
      }),
    );
    const { error } = await context.supabase.from("offers").delete().eq("id", data.id);
    if (error) throw error;
  });
