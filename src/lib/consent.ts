declare global {
  interface Window { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void }
}

// Regional advertising-consent helpers. The stored choice records the
// visitor's advertising decision from the consent banner ("granted" or
// "denied"); a missing choice falls back to regional defaults.
export const STORAGE_KEY = "cookie_consent";
const CONSENT_COUNTRIES = ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH','CA'];
let consentRegion: Promise<boolean> | undefined;

export function isConsentRequiredRegion(): Promise<boolean> {
  return consentRegion ??= lookupConsentRegion();
}

async function lookupConsentRegion(): Promise<boolean> {
  try {
    const res = await fetch("/cdn-cgi/trace", { signal: AbortSignal.timeout(2000) });
    if (!res.ok) return true;
    const trace = await res.text();
    // Behind a rewrite proxy the trace answers for the proxy's connection under another host.
    const host = trace.match(/^h=(.+)$/m)?.[1]?.trim().toLowerCase();
    if (host !== location.hostname) return true;
    const country = trace.match(/^loc=([A-Z0-9]{2})$/m)?.[1];
    if (!country || country === "XX" || country === "T1") return true;
    return CONSENT_COUNTRIES.includes(country);
  } catch {
    return true;
  }
}

export async function hasAdConsent(): Promise<boolean> {
  return localStorage.getItem(STORAGE_KEY) === "granted";
}

export async function canTrackAds(): Promise<boolean> {
  const choice = localStorage.getItem(STORAGE_KEY);
  if (choice !== null) return choice === "granted";
  const required = await isConsentRequiredRegion();
  const latest = localStorage.getItem(STORAGE_KEY);
  return latest !== null ? latest === "granted" : !required;
}

export function updateConsent(decision: "granted" | "denied") {
  if (localStorage.getItem(STORAGE_KEY) === "denied") decision = "denied";
  if (decision === "denied") window.gtag?.("set", "user_data", null);
  window.gtag?.("consent", "update", {
    ad_storage: decision,
    ad_user_data: decision,
    ad_personalization: decision,
  });
}
