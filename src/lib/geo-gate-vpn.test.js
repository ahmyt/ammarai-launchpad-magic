import { expect, test } from "bun:test";
import { ALLOWED_SERVER_IPS, evaluateGeoGate, ipFingerprint, isVpnNetwork, parseRememberedGeo } from "./geo-gate.server";
const cfg = { enabled: true, mode: "block", countries: ["GB"], title: "t", message: "m", bypassKey: "", cacheMs: 1, blockVpn: true };
const req = (cookie = "", ua = "Mozilla") => new Request("https://ammarai.com/pricing", { headers: { cookie, "user-agent": ua } });
test("vpn ip blocked when on", () => expect(evaluateGeoGate(req(), cfg, "US", true)?.status).toBe(503));
test("vpn ip passes when off", () => expect(evaluateGeoGate(req(), { ...cfg, blockVpn: false }, "US", true)).toBeNull());
test("GB timezone blocked", () => expect(evaluateGeoGate(req("ammarai_tz=Europe%2FLondon"), cfg, "US", false)?.status).toBe(503));
test("US residential passes", () => expect(evaluateGeoGate(req("ammarai_tz=America%2FNew_York"), cfg, "US", false)).toBeNull());
test("googlebot passes", () => expect(evaluateGeoGate(req("", "Googlebot"), cfg, "US", true)).toBeNull());
test("nord detected", () => expect(isVpnNetwork({ org: "M247 Europe SRL" })).toBe(true));
test("BT not vpn", () => expect(isVpnNetwork({ org: "British Telecommunications PLC", isp: "BT" })).toBe(false));
// Both Plesk outgoing addresses must stay allowlisted, otherwise MagicAI's
// agent training gets 503 when it scrapes ammarai.com.
test("both plesk outgoing ips allowlisted", () => {
  expect(ALLOWED_SERVER_IPS.has("185.223.31.164")).toBe(true);
  expect(ALLOWED_SERVER_IPS.has("194.156.89.107")).toBe(true);
});
// The allowlist must not weaken the gate for real visitors.
test("residential visitor in blocked country still gets 503", () =>
  expect(evaluateGeoGate(req(), cfg, "GB", false)?.status).toBe(503));

// The remember cookie is bound to the IP it was issued for, so turning on a
// VPN (new IP) forces an immediate re-check instead of trusting a stale pass.
const HOME_IP = "203.0.113.10";
const VPN_IP = "198.51.100.77";
test("remember cookie trusted for the issuing ip", () =>
  expect(parseRememberedGeo(`ammarai_cc=US.${ipFingerprint(HOME_IP)}`, HOME_IP)).toEqual({ country: "US", vpn: false }));
test("remember cookie with vpn flag trusted for the issuing ip", () =>
  expect(parseRememberedGeo(`ammarai_cc=US-V.${ipFingerprint(HOME_IP)}`, HOME_IP)).toEqual({ country: "US", vpn: true }));
test("remember cookie rejected when the ip changes", () =>
  expect(parseRememberedGeo(`ammarai_cc=US.${ipFingerprint(HOME_IP)}`, VPN_IP)).toBeNull());
test("legacy cookie without fingerprint rejected", () =>
  expect(parseRememberedGeo("ammarai_cc=US", HOME_IP)).toBeNull());
test("remember cookie rejected without a public ip", () =>
  expect(parseRememberedGeo(`ammarai_cc=US.${ipFingerprint(HOME_IP)}`, "")).toBeNull());
