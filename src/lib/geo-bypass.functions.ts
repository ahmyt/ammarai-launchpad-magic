import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { bypassCodes, bypassHash } from "./geo-bypass";

export const listGeoBypasses = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const role = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (role.error || role.data !== true) throw new Error("Forbidden");
    const settings = await context.supabase.from("geo_bypass_config").select("codes").eq("id", "settings").maybeSingle();
    if (settings.error) throw settings.error;
    const keys = settings.data?.codes ?? "";
    const claims = await context.supabase.from("geo_bypass_claims").select("code_hash,claimed_at,expires_at");
    if (claims.error) throw claims.error;
    return Promise.all(bypassCodes(keys).map(async (code, index) => {
      const hash = await bypassHash(code);
      const claim = claims.data.find((item) => item.code_hash === hash);
      return { hash, label: `Code ${index + 1}`, claimedAt: claim?.claimed_at ?? null, expiresAt: claim?.expires_at ?? null };
    }));
  });

export const resetGeoBypass = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { hash: string }) => {
    if (!/^[a-f0-9]{64}$/.test(data.hash)) throw new Error("Invalid code");
    return data;
  })
  .handler(async ({ context, data }) => {
    // The database function validates the administrator role and revokes the old device immediately.
    const result = await context.supabase.rpc("admin_reset_geo_bypass", { _code_hash: data.hash });
    if (result.error) throw result.error;
    return result.data;
  });