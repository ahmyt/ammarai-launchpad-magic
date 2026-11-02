import { updateConsent } from "./consent";

// Google Ads account-wide tag for ammarai.com (conversion tracking).
// The conversion event itself fires from the contact form on success.
export const GOOGLE_ADS_ID = "AW-653618937";

export async function loadGoogleAds(
  consentModeRoute = false,
  cmpAllowsAds?: () => boolean | Promise<boolean>,
) {
  const allowed = await (cmpAllowsAds ? cmpAllowsAds() : canTrackAds());
  if (!consentModeRoute && !allowed) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
  if (!cmpAllowsAds) updateConsent(allowed ? "granted" : "denied");
  if (document.querySelector("script[data-google-ads]")) return;
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  window.gtag("config", GOOGLE_ADS_ID);
  const script = document.createElement("script");
  script.src = "https://www.googletagmanager.com/gtag/js?id=" + GOOGLE_ADS_ID;
  script.async = true;
  script.setAttribute("data-google-ads", "");
  document.head.appendChild(script);
}

import { canTrackAds } from "./consent";
