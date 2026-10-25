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
