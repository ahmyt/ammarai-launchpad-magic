/**
 * Country maintenance gate.
 *
 * Runs at the very front of the Node/Worker request handler (src/server.ts).
 * Design rules, in order of importance:
 *  1. Never block the request on I/O. Settings and country lookups are served
 *     from in-memory caches; misses refresh in the background and fail open.
 *  2. Never hurt SEO. Search crawlers always pass, and blocked visitors get a
 *     503 + no-store so nothing is indexed or cached.
 *  3. Never lock the owner out. Admin, auth, API, sitemap, robots and static
 *     assets always pass, plus a bypass key that sets a cookie.
 */

export interface GeoGateSettings {
  enabled: boolean;
  /** "block" = deny the listed countries, "allow" = deny everything else. */
  mode: "block" | "allow";
  countries: string[];
  title: string;
  message: string;
  bypassKey: string;
}

const DEFAULTS: GeoGateSettings = {
  enabled: false,
  mode: "block",
  countries: [],
  title: "AmmarAI is temporarily unavailable in your region",
  message:
    "We are carrying out scheduled maintenance for visitors in your country. Please check back shortly — everything will be back to normal soon.",
  bypassKey: "",
};

const SETTINGS_TTL_MS = 60_000;
const GEO_TTL_MS = 6 * 60 * 60 * 1000;
const GEO_CACHE_MAX = 5000;
const BYPASS_COOKIE = "ammarai_geo_bypass";

let settingsCache: GeoGateSettings = DEFAULTS;
let settingsFetchedAt = 0;
let settingsInFlight: Promise<void> | null = null;

const geoCache = new Map<string, { country: string; at: number }>();
const geoInFlight = new Set<string>();

const toList = (value: unknown): string[] => {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\s,]+/)
      : [];
  return raw
    .map((entry) => String(entry).trim().toUpperCase())
    .filter((entry) => /^[A-Z]{2}$/.test(entry));
};

function normalise(data: Record<string, unknown> | undefined): GeoGateSettings {
  if (!data) return DEFAULTS;
  const countries = toList(data["geoBlockCountries"]);
  return {
    enabled: data["geoBlockEnabled"] === true && countries.length > 0,
    mode: data["geoBlockMode"] === "allow" ? "allow" : "block",
    countries,
    title: String(data["geoBlockTitle"] ?? "").trim() || DEFAULTS.title,
    message: String(data["geoBlockMessage"] ?? "").trim() || DEFAULTS.message,
    bypassKey: String(data["geoBlockBypassKey"] ?? "").trim(),
  };
}

async function refreshSettings(): Promise<void> {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return;
  const endpoint = `${url}/rest/v1/content?kind=eq.page&slug=eq.settings&select=data,is_hidden`;
  const response = await fetch(endpoint, {
    headers: { apikey: key, accept: "application/json" },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) return;
  const rows = (await response.json()) as { data?: Record<string, unknown>; is_hidden?: boolean }[];
  const row = rows?.[0];
  settingsCache = row && !row.is_hidden ? normalise(row.data) : DEFAULTS;
  settingsFetchedAt = Date.now();
}

function settings(): GeoGateSettings {
  if (Date.now() - settingsFetchedAt > SETTINGS_TTL_MS && !settingsInFlight) {
    settingsInFlight = refreshSettings()
      .catch(() => {
        /* keep the last known settings; the gate fails open */
      })
      .finally(() => {
        settingsInFlight = null;
        settingsFetchedAt = Math.max(settingsFetchedAt, Date.now() - SETTINGS_TTL_MS + 10_000);
      });
  }
  return settingsCache;
}

const SKIP_PATH_RE =
  /^\/(admin|auth|api|assets|fonts|media|_build|_serverFn|favicon|robots\.txt|sitemap\.xml|llms\.txt)/;

const CRAWLER_RE =
  /(googlebot|bingbot|google-inspectiontool|duckduckbot|yandexbot|baiduspider|slurp|applebot|petalbot|ahrefsbot|semrushbot|lighthouse|chrome-lighthouse|pagespeed|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|slackbot)/i;

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-client-ip") ??
    ""
  );
}

const PRIVATE_IP_RE = /^(10\.|127\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|::1|fc|fd|169\.254\.)/i;

function headerCountry(request: Request): string {
  const header =
    request.headers.get("cf-ipcountry") ??
    request.headers.get("x-vercel-ip-country") ??
    request.headers.get("x-country-code") ??
    request.headers.get("x-geoip-country") ??
    request.headers.get("geoip-country-code") ??
    "";
  const code = header.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : "";
}

/**
 * Country for this IP, or "" when unknown. Never awaits: an unknown IP is
 * resolved in the background so this and every later request stay instant.
 */
function cachedCountry(ip: string): string {
  if (!ip || PRIVATE_IP_RE.test(ip)) return "";
  const hit = geoCache.get(ip);
  if (hit && Date.now() - hit.at < GEO_TTL_MS) return hit.country;
  if (!geoInFlight.has(ip)) {
    geoInFlight.add(ip);
    void lookupCountry(ip)
      .then((country) => {
        if (geoCache.size > GEO_CACHE_MAX) geoCache.clear();
        geoCache.set(ip, { country, at: Date.now() });
      })
      .catch(() => {
        geoCache.set(ip, { country: "", at: Date.now() });
      })
      .finally(() => geoInFlight.delete(ip));
  }
  return hit?.country ?? "";
}

async function lookupCountry(ip: string): Promise<string> {
  const response = await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/country/`, {
    headers: { accept: "text/plain", "user-agent": "ammarai-geo-gate" },
    signal: AbortSignal.timeout(4000),
  });
  if (!response.ok) return "";
  const code = (await response.text()).trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code) ? code : "";
}

function isBlocked(country: string, config: GeoGateSettings): boolean {
  if (!country) return false; // unknown country always passes
  const listed = config.countries.includes(country);
  return config.mode === "allow" ? !listed : listed;
}

function maintenanceHtml(config: GeoGateSettings): string {
  const escape = (value: string) =>
    value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>${escape(config.title)}</title><style>
:root{color-scheme:light}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px;background:#faf9f7;color:#171512;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;line-height:1.6}
main{max-width:560px;text-align:center}
.mark{font-size:13px;letter-spacing:.18em;text-transform:uppercase;color:#8a8479;font-weight:700}
h1{margin:20px 0 14px;font-size:30px;line-height:1.25;font-weight:700}
p{margin:0;font-size:16px;color:#55504a}
.rule{margin:32px auto 0;width:56px;height:2px;background:#171512}
</style></head><body><main><p class="mark">AmmarAI</p><h1>${escape(config.title)}</h1><p>${escape(config.message)}</p><div class="rule"></div></main></body></html>`;
}

/**
 * Returns a maintenance Response when this visitor's country is switched off
 * in the CMS, otherwise null so the site renders as normal.
 */
export function geoMaintenanceResponse(request: Request): Response | null {
  const config = settings();
  if (!config.enabled) return null;

  const url = new URL(request.url);
  if (SKIP_PATH_RE.test(url.pathname)) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null;

  const agent = request.headers.get("user-agent") ?? "";
  if (CRAWLER_RE.test(agent)) return null;

  const cookies = request.headers.get("cookie") ?? "";
  const hasBypassCookie =
    config.bypassKey.length > 0 && cookies.includes(`${BYPASS_COOKIE}=${config.bypassKey}`);
  const bypassParam = url.searchParams.get("bypass_country");
  if (config.bypassKey && bypassParam === config.bypassKey) {
    url.searchParams.delete("bypass_country");
    return new Response(null, {
      status: 302,
      headers: {
        location: url.pathname + (url.search || "") ,
        "set-cookie": `${BYPASS_COOKIE}=${config.bypassKey}; Path=/; Max-Age=604800; HttpOnly; Secure; SameSite=Lax`,
        "cache-control": "private, no-store",
      },
    });
  }
  if (hasBypassCookie) return null;
  if (cookies.includes("sb-") && cookies.includes("-auth-token")) return null; // signed-in staff

  const country = headerCountry(request) || cachedCountry(clientIp(request));
  if (!isBlocked(country, config)) return null;

  return new Response(maintenanceHtml(config), {
    status: 503,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "private, no-store, must-revalidate",
      "retry-after": "3600",
      "x-robots-tag": "noindex",
    },
  });
}
