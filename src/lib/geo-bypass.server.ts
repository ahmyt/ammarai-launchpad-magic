import { BYPASS_COOKIE, BYPASS_MAX_AGE, bypassCodes, bypassHash, parseBypassCookie, readCookie } from "./geo-bypass";

type BypassStore = (action: "claim" | "verify", codeHash: string, deviceHash: string) => Promise<boolean>;

const databaseStore: BypassStore = async (action, codeHash, deviceHash) => {
  // Only reached after matching a configured code or its hash. No public RPC
  // may claim ownership; otherwise callers could pre-claim someone else's code.
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc(
    action === "claim" ? "claim_geo_bypass" : "verify_geo_bypass",
    { _code_hash: codeHash, _device_hash: deviceHash },
  );
  if (error) throw new Error("Bypass verification unavailable");
  return data === true;
};

export async function resolveGeoBypass(request: Request, configured: string, store: BypassStore = databaseStore): Promise<{ allowed: boolean; response: Response | null }> {
  const url = new URL(request.url);
  const code = url.searchParams.get("bypass_country");
  const codes = bypassCodes(configured);
  const saved = parseBypassCookie(readCookie(request, BYPASS_COOKIE));
  const hashes = await Promise.all(codes.map(bypassHash));
  try {
    if (code !== null) {
      if (!codes.includes(code)) return { allowed: false, response: denied() };
      const codeHash = await bypassHash(code);
      const token = saved?.codeHash === codeHash ? saved.token :
        Array.from(crypto.getRandomValues(new Uint8Array(32)), (byte) => byte.toString(16).padStart(2, "0")).join("");
      const accepted = await store("claim", codeHash, await bypassHash(token));
      if (!accepted) return { allowed: false, response: denied() };
      url.searchParams.delete("bypass_country");
      return { allowed: true, response: new Response(null, {
        status: 302,
        headers: {
          location: url.pathname + url.search,
          "set-cookie": `${BYPASS_COOKIE}=${codeHash}.${token}; Path=/; Max-Age=${BYPASS_MAX_AGE}; HttpOnly; Secure; SameSite=Lax`,
          "cache-control": "private, no-store",
          "referrer-policy": "no-referrer",
        },
      }) };
    }
    if (!saved || !hashes.includes(saved.codeHash)) return { allowed: false, response: null };
    return { allowed: await store("verify", saved.codeHash, await bypassHash(saved.token)), response: null };
  } catch {
    // Fail closed for bypass credentials, without changing ordinary country decisions.
    return { allowed: false, response: code !== null ? denied(503) : null };
  }
}

function denied(status = 403): Response {
  return new Response(status === 503 ? "Bypass verification is temporarily unavailable. Please try again." :
    "This bypass code is invalid, expired, or already claimed by another browser. Ask an administrator to reset it.", {
    status, headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "private, no-store", "referrer-policy": "no-referrer", "x-robots-tag": "noindex" },
  });
}