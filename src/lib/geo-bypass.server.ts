import { createClient } from "@supabase/supabase-js";
import { BYPASS_COOKIE, BYPASS_MAX_AGE, bypassHash, parseBypassCookie, readCookie } from "./geo-bypass";

type BypassStore = (action: "claim" | "verify", codeHash: string, deviceHash: string) => Promise<boolean>;

// The gate runs on the public site with only the publishable key, so code
// matching and claiming happen inside security-definer database functions
// (gate_claim_geo_bypass / gate_verify_geo_bypass). The publishable key is an
// opaque string, not a JWT: send it as apikey only, never as a bearer token.
const gateFetch = (key: string): typeof fetch => (input, init) => {
  const headers = new Headers(input instanceof Request ? input.headers : undefined);
  if (init?.headers) new Headers(init.headers).forEach((value, name) => headers.set(name, value));
  if (headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
  headers.set("apikey", key);
  return fetch(input, { ...init, headers });
};

let gateClient: ReturnType<typeof createClient> | undefined;
function client() {
  if (!gateClient) {
    const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Bypass store unavailable");
    gateClient = createClient(url, key, {
      global: { fetch: gateFetch(key) },
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return gateClient;
}

const databaseStore: BypassStore = async (action, codeHash, deviceHash) => {
  const args = { _code_hash: codeHash, _device_hash: deviceHash };
  const { data, error } =
    action === "claim"
      ? await client().rpc("gate_claim_geo_bypass", args)
      : await client().rpc("gate_verify_geo_bypass", args);
  if (error) throw new Error("Bypass verification unavailable");
  return data === true;
};

export async function resolveGeoBypass(request: Request, store: BypassStore = databaseStore): Promise<{ allowed: boolean; response: Response | null }> {
  const url = new URL(request.url);
  const code = url.searchParams.get("bypass_country")?.trim().toLowerCase() ?? null;
  const saved = parseBypassCookie(readCookie(request, BYPASS_COOKIE));
  try {
    if (code !== null) {
      if (code.length === 0 || code.length > 64) return { allowed: false, response: denied() };
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
    if (!saved) return { allowed: false, response: null };
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
