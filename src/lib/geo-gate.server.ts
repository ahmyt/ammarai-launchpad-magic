import { TIMEZONE_COUNTRY } from "./timezone-countries";
import { resolveGeoBypass } from "./geo-bypass.server";

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
  /** How long a visitor's country is remembered, in milliseconds. */
  cacheMs: number;
  /** Also block VPN/proxy/datacenter IPs and devices whose timezone is in a blocked country. */
  blockVpn: boolean;
}

const DEFAULT_CACHE_HOURS = 6;
const MIN_CACHE_HOURS = 1;
const MAX_CACHE_HOURS = 168;

const DEFAULTS: GeoGateSettings = {
  enabled: false,
  mode: "block",
  countries: [],
  title: "AmmarAI is temporarily unavailable in your region",
  message:
    "We are carrying out scheduled maintenance for visitors in your country. Please check back shortly — everything will be back to normal soon.",
  bypassKey: "",
  cacheMs: DEFAULT_CACHE_HOURS * 60 * 60 * 1000,
  blockVpn: false,
};

const SETTINGS_TTL_MS = 60_000;
const GEO_CACHE_MAX = 5000;

let settingsCache: GeoGateSettings = DEFAULTS;
let settingsFetchedAt = 0;
let settingsInFlight: Promise<void> | null = null;

interface GeoInfo {
  country: string;
  /** True when the IP belongs to a VPN, proxy or hosting/datacenter network. */
  vpn: boolean;
}

const geoCache = new Map<string, GeoInfo & { at: number }>();
const geoInFlight = new Map<string, Promise<GeoInfo>>();

// Networks that residential visitors never browse from: VPN brands, proxy
// relays and cloud/datacenter hosts. Matched against the IP owner's org/ISP.
const VPN_NETWORK_RE =
  /(vpn|proxy|m247|datacamp|cdn77|packethub|tzulo|hostroyale|leaseweb|ovh|hetzner|digitalocean|linode|akamai connected cloud|vultr|choopa|contabo|amazon|aws|google cloud|google llc|microsoft|azure|oracle|alibaba|tencent|scaleway|online s\.a\.s|hostinger|ionos|godaddy|hostwinds|psychz|quadranet|colocrossing|zenlayer|g-core|gcore|cogent|clouvider|performive|wholesale internet|frantech|buyvm|servers\.com|hivelocity|serverius|worldstream|nforce|i3d|creanova|zscaler|cloudflare|fastly|private internet access|nordvpn|expressvpn|surfshark|mullvad|protonvpn|proton ag|cyberghost|ipvanish|windscribe|hide\.me|kape|tefincom|data ?cent|hosting|server|cloud)/i;


// Three-letter codes (e.g. "FRA") are accepted and converted to two-letter.
const ALPHA3: Record<string, string> = Object.fromEntries(
  "AFG:AF ALB:AL DZA:DZ AND:AD AGO:AO ARG:AR ARM:AM AUS:AU AUT:AT AZE:AZ BHS:BS BHR:BH BGD:BD BLR:BY BEL:BE BLZ:BZ BEN:BJ BTN:BT BOL:BO BIH:BA BWA:BW BRA:BR BRN:BN BGR:BG BFA:BF BDI:BI KHM:KH CMR:CM CAN:CA CPV:CV CAF:CF TCD:TD CHL:CL CHN:CN COL:CO COM:KM COG:CG COD:CD CRI:CR CIV:CI HRV:HR CUB:CU CYP:CY CZE:CZ DNK:DK DJI:DJ DOM:DO ECU:EC EGY:EG SLV:SV GNQ:GQ ERI:ER EST:EE SWZ:SZ ETH:ET FJI:FJ FIN:FI FRA:FR GAB:GA GMB:GM GEO:GE DEU:DE GHA:GH GRC:GR GTM:GT GIN:GN GNB:GW GUY:GY HTI:HT HND:HN HKG:HK HUN:HU ISL:IS IND:IN IDN:ID IRN:IR IRQ:IQ IRL:IE ISR:IL ITA:IT JAM:JM JPN:JP JOR:JO KAZ:KZ KEN:KE PRK:KP KOR:KR KWT:KW KGZ:KG LAO:LA LVA:LV LBN:LB LSO:LS LBR:LR LBY:LY LIE:LI LTU:LT LUX:LU MAC:MO MDG:MG MWI:MW MYS:MY MDV:MV MLI:ML MLT:MT MRT:MR MUS:MU MEX:MX MDA:MD MCO:MC MNG:MN MNE:ME MAR:MA MOZ:MZ MMR:MM NAM:NA NPL:NP NLD:NL NZL:NZ NIC:NI NER:NE NGA:NG MKD:MK NOR:NO OMN:OM PAK:PK PSE:PS PAN:PA PNG:PG PRY:PY PER:PE PHL:PH POL:PL PRT:PT PRI:PR QAT:QA ROU:RO RUS:RU RWA:RW SAU:SA SEN:SN SRB:RS SLE:SL SGP:SG SVK:SK SVN:SI SOM:SO ZAF:ZA SSD:SS ESP:ES LKA:LK SDN:SD SUR:SR SWE:SE CHE:CH SYR:SY TWN:TW TJK:TJ TZA:TZ THA:TH TLS:TL TGO:TG TTO:TT TUN:TN TUR:TR TKM:TM UGA:UG UKR:UA ARE:AE GBR:GB USA:US URY:UY UZB:UZ VEN:VE VNM:VN YEM:YE ZMB:ZM ZWE:ZW"
    .split(" ")
    .map((pair) => pair.split(":") as [string, string]),
);

const toList = (value: unknown): string[] => {
  const raw = Array.isArray(value)
    ? value
    : typeof value === "string"
      ? value.split(/[\s,]+/)
      : [];
  return raw
    .map((entry) => String(entry).trim().toUpperCase())
    .map((entry) => (entry.length === 3 ? (ALPHA3[entry] ?? "") : entry))
    .filter((entry) => /^[A-Z]{2}$/.test(entry));
};

/** Hours the visitor's country stays remembered; clamped to 1-168, default 6. */
function cacheHours(value: unknown): number {
  const parsed = Number.parseFloat(String(value ?? "").trim());
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_CACHE_HOURS;
  return Math.min(MAX_CACHE_HOURS, Math.max(MIN_CACHE_HOURS, parsed));
}

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
    cacheMs: cacheHours(data["geoBlockCacheHours"]) * 60 * 60 * 1000,
    blockVpn: data["geoBlockVpn"] === true,
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
  // Bypass codes stay in the admin-only geo_bypass_config table; the gate
  // never reads them. Code matching and claiming happen inside the
  // security-definer gate_* database functions (see geo-bypass.server.ts),
  // so this server only needs the publishable key.
  settingsCache = row && !row.is_hidden ? normalise(row.data) : DEFAULTS;
  settingsFetchedAt = Date.now();
}

async function settings(): Promise<GeoGateSettings> {
  if (Date.now() - settingsFetchedAt <= SETTINGS_TTL_MS) return settingsCache;
  if (!settingsInFlight) {
    settingsInFlight = refreshSettings().finally(() => {
      settingsInFlight = null;
      settingsFetchedAt = Math.max(settingsFetchedAt, Date.now() - SETTINGS_TTL_MS + 10_000);
    });
  }
  // The first request after expiry must use the newly saved CMS value. This
  // happens only once per minute; failures retain the last known good value.
  await settingsInFlight.catch(() => undefined);
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

function cachedGeo(ip: string): GeoInfo | null {
  if (!ip || PRIVATE_IP_RE.test(ip)) return null;
  const hit = geoCache.get(ip);
  return hit && hit.country ? { country: hit.country, vpn: hit.vpn } : null;
}

function cachedCountry(ip: string): string {
  return cachedGeo(ip)?.country ?? "";
}

async function fetchCountry(url: string, json = false): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: { accept: json ? "application/json" : "text/plain", "user-agent": "ammarai-geo-gate" },
      signal: AbortSignal.timeout(1400),
    });
    if (!response.ok) return "";
    const value = json
      ? String(((await response.json()) as { country_code?: unknown }).country_code ?? "")
      : await response.text();
    const code = value.trim().toUpperCase();
    return /^[A-Z]{2}$/.test(code) ? code : "";
  } catch {
    return "";
  }
}

/** ipwho.is returns country plus network owner, so it also powers VPN detection. */
async function fetchIpWho(ip: string): Promise<GeoInfo | null> {
  try {
    const response = await fetch(
      `https://ipwho.is/${encodeURIComponent(ip)}?fields=country_code,connection`,
      { headers: { accept: "application/json", "user-agent": "ammarai-geo-gate" }, signal: AbortSignal.timeout(1400) },
    );
    if (!response.ok) return null;
    const body = (await response.json()) as {
      country_code?: unknown;
      connection?: { org?: unknown; isp?: unknown; domain?: unknown };
    };
    const country = String(body.country_code ?? "").trim().toUpperCase();
    if (!/^[A-Z]{2}$/.test(country)) return null;
    return { country, vpn: isVpnNetwork(body.connection) };
  } catch {
    return null;
  }
}

export function isVpnNetwork(connection?: { org?: unknown; isp?: unknown; domain?: unknown }): boolean {
  if (!connection) return false;
  const owner = [connection.org, connection.isp, connection.domain].map((v) => String(v ?? "")).join(" ");
  return VPN_NETWORK_RE.test(owner);
}

async function lookupCountry(ip: string): Promise<GeoInfo> {
  // ipwho.is is preferred because it carries network data; ipapi.co is the
  // fallback for the country only. Both run in parallel, capped at 1.4s.
  const backup = fetchCountry(`https://ipapi.co/${encodeURIComponent(ip)}/country/`);
  const primary = await fetchIpWho(ip);
  if (primary) return primary;
  return { country: await backup, vpn: false };
}

function resolveCountry(ip: string): Promise<GeoInfo> {
  const cached = cachedGeo(ip);
  if (cached) return Promise.resolve(cached);
  const active = geoInFlight.get(ip);
  if (active) return active;
  const lookup = lookupCountry(ip)
    .then((info) => {
      if (geoCache.size >= GEO_CACHE_MAX) geoCache.clear();
      geoCache.set(ip, { ...info, at: Date.now() });
      return info;
    })
    .finally(() => geoInFlight.delete(ip));
  geoInFlight.set(ip, lookup);
  return lookup;
}

function isBlocked(country: string, config: GeoGateSettings): boolean {
  if (!country) return false; // unknown country always passes
  const listed = config.countries.includes(country);
  return config.mode === "allow" ? !listed : listed;
}

function maintenanceHtml(config: GeoGateSettings): string {
  const escape = (value: string) =>
    value.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c);
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
const COUNTRY_COOKIE = "ammarai_cc";

/** Short non-secret fingerprint of an IP, stored in the remember cookie. */
export function ipFingerprint(ip: string): string {
  let hash = 5381;
  for (let i = 0; i < ip.length; i++) hash = ((hash << 5) + hash + ip.charCodeAt(i)) >>> 0;
  return hash.toString(16).padStart(8, "0");
}

const REMEMBERED_RE = /ammarai_cc=([A-Z]{2}|XX)(-V)?(?:\.([0-9a-f]{8}))?\b/;

/**
 * Trust the remember cookie only when it carries a fingerprint of the
 * current IP. Legacy cookies without a fingerprint, and cookies issued to a
 * different IP, are ignored so the visitor is re-checked.
 */
export function parseRememberedGeo(cookieHeader: string, ip: string): GeoInfo | null {
  const match = cookieHeader.match(REMEMBERED_RE);
  if (!match?.[1] || !ip || PRIVATE_IP_RE.test(ip)) return null;
  if (match[3] !== ipFingerprint(ip)) return null;
  return { country: match[1], vpn: Boolean(match[2]) };
}

/** Own servers (e.g. the app.ammarai.com Plesk host) always pass the gate. */
export const ALLOWED_SERVER_IPS = new Set(["185.223.31.164", "194.156.89.107"]);

export async function geoMaintenanceResponse(request: Request): Promise<{ block: Response | null; cookie: string | null }> {
  const config = await settings();
  if (!config.enabled) return { block: null, cookie: null };
  if (ALLOWED_SERVER_IPS.has(clientIp(request))) return { block: null, cookie: null };
  const path = new URL(request.url).pathname;
  if (SKIP_PATH_RE.test(path) || /\.[a-z0-9]{2,5}$/i.test(path) || CRAWLER_RE.test(request.headers.get("user-agent") ?? "")) return { block: null, cookie: null };
  const bypass = await resolveGeoBypass(request, config.bypassKey);
  if (bypass.response || bypass.allowed) return { block: bypass.response, cookie: null };
  const cookies = request.headers.get("cookie") ?? "";
  const ip = clientIp(request);
  // The remember cookie is bound to the IP it was issued for: switching
  // networks or turning on a VPN changes the IP, so the old pass is never
  // trusted and the visitor is re-checked immediately.
  let info: GeoInfo | null = parseRememberedGeo(cookies, ip);
  const header = headerCountry(request);
  if (header && !config.blockVpn) info = { country: header, vpn: false };
  let fresh = false;
  if (!info) {
    info = cachedGeo(ip);
    if (!info && ip && !PRIVATE_IP_RE.test(ip)) {
      // While the filter is on, resolve before rendering so a new visitor gets
      // the same decision on the first request and every refresh after it.
      info = await resolveCountry(ip);
    }
    if (info && header) info = { ...info, country: header };
    fresh = true;
  }
  const country = info?.country ?? "";
  const response = evaluateGeoGate(request, config, country === "XX" ? "" : country, info?.vpn ?? false);
  if (!fresh || !country) return { block: response, cookie: null };
  const maxAge = Math.round(config.cacheMs / 1000);
  const value = `${country}${info?.vpn ? "-V" : ""}.${ipFingerprint(ip)}`;
  const cookie = `${COUNTRY_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Lax`;
  if (response) response.headers.append("set-cookie", cookie);
  return { block: response, cookie };
}

/** Pure gate decision — exported so the behaviour can be tested directly. */
export function evaluateGeoGate(
  request: Request,
  config: GeoGateSettings,
  knownCountry?: string,
  vpn = false,
): Response | null {
  if (!config.enabled) return null;


  const url = new URL(request.url);
  if (SKIP_PATH_RE.test(url.pathname)) return null;
  if (/\.[a-z0-9]{2,5}$/i.test(url.pathname)) return null;

  const agent = request.headers.get("user-agent") ?? "";
  if (CRAWLER_RE.test(agent)) return null;

  const cookies = request.headers.get("cookie") ?? "";
  // Bypass credentials are verified against durable browser claims above.
  // Cookie names alone (including auth-looking names) are not authorization.

  const country =
    knownCountry ?? (headerCountry(request) || cachedCountry(clientIp(request)));
  // Device timezone is written by a tiny browser script after page load.
  const tzRaw = cookies.match(/ammarai_tz=([^;]+)/)?.[1];
  let tzCountry = "";
  try { tzCountry = tzRaw ? (TIMEZONE_COUNTRY[decodeURIComponent(tzRaw)] ?? "") : ""; } catch { /* Ignore malformed cookies. */ }
  const blocked =
    isBlocked(country, config) ||
    (config.blockVpn && vpn) ||
    (config.blockVpn && tzCountry !== "" && config.mode === "block" && isBlocked(tzCountry, config));
  if (!blocked) return null;

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
