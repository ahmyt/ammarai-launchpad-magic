import { expect, test } from "bun:test";
import { bypassCodes, bypassHash, parseBypassCookie } from "./geo-bypass";
import { resolveGeoBypass } from "./geo-bypass.server";
import { evaluateGeoGate } from "./geo-gate.server";

const request = (code, cookie = "") => new Request(`https://ammarai.com/pricing?keep=yes${code === undefined ? "" : `&bypass_country=${code}`}`, { headers: { cookie } });
// Mirrors the gate_claim_geo_bypass / gate_verify_geo_bypass database
// functions: a code hash is only honoured while its code is still configured.
function storeFixture(configured = ["one"]) {
  const claims = new Map();
  const codes = new Set(configured.map((code) => code.toLowerCase()));
  const store = async (action, codeHash, device) => {
    const known = await Promise.all([...codes].map((code) => bypassHash(code)));
    if (!known.includes(codeHash)) return false;
    if (action === "claim" && !claims.has(codeHash)) claims.set(codeHash, { device, expires: Date.now() + 604800000 });
    const claim = claims.get(codeHash);
    return claim?.device === device && claim.expires > Date.now();
  };
  return { claims, codes, store };
}
const cookieFrom = (result) => result.response.headers.get("set-cookie").split(";")[0];

test("first browser claims code and gets a seven-day opaque cookie", async () => {
  const { store } = storeFixture();
  const result = await resolveGeoBypass(request("one"), store);
  expect(result.response.status).toBe(302);
  expect(result.response.headers.get("location")).toBe("/pricing?keep=yes");
  expect(result.response.headers.get("set-cookie")).toContain("Max-Age=604800; HttpOnly; Secure; SameSite=Lax");
  expect(parseBypassCookie(cookieFrom(result).split("=")[1])).not.toBeNull();
});
test("codes are case-insensitive and ignore surrounding whitespace", async () => {
  const { store } = storeFixture();
  expect(bypassCodes("One, TWO  three")).toEqual(["one", "two", "three"]);
  expect((await resolveGeoBypass(request("ONE"), store)).response.status).toBe(302);
  expect((await resolveGeoBypass(request(" one "), storeFixture().store)).allowed).toBe(true);
});
test("an unconfigured code is denied", async () => {
  const { store } = storeFixture();
  expect((await resolveGeoBypass(request("nope"), store)).response.status).toBe(403);
});
test("a second browser cannot use an already claimed code", async () => {
  const { store } = storeFixture();
  await resolveGeoBypass(request("one"), store);
  expect((await resolveGeoBypass(request("one"), store)).response.status).toBe(403);
});
test("claimed browser can revisit without the code", async () => {
  const { store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), store));
  expect((await resolveGeoBypass(request(undefined, cookie), store)).allowed).toBe(true);
});
test("each comma-separated code has its own first browser", async () => {
  const { claims, store } = storeFixture(["one", "two"]);
  expect((await resolveGeoBypass(request("one"), store)).allowed).toBe(true);
  expect((await resolveGeoBypass(request("two"), store)).allowed).toBe(true);
  expect(claims.size).toBe(2);
});
test("reset revokes old browser and permits a new first claim", async () => {
  const { claims, store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), store));
  claims.delete(await bypassHash("one"));
  expect((await resolveGeoBypass(request(undefined, cookie), store)).allowed).toBe(false);
  expect((await resolveGeoBypass(request("one"), store)).allowed).toBe(true);
});
test("expiry never frees the code for a different browser without reset", async () => {
  const { claims, store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), store));
  claims.get(await bypassHash("one")).expires = Date.now() - 1;
  expect((await resolveGeoBypass(request(undefined, cookie), store)).allowed).toBe(false);
  expect((await resolveGeoBypass(request("one"), store)).response.status).toBe(403);
});
test("removed code invalidates its old browser immediately on current configuration", async () => {
  const { codes, store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), store));
  codes.delete("one");
  expect((await resolveGeoBypass(request(undefined, cookie), store)).allowed).toBe(false);
});
test("legacy raw code and forged auth-looking cookies do not bypass country gate", () => {
  const cfg = { enabled: true, mode: "block", countries: ["ET"], title: "t", message: "m", bypassKey: "one", cacheMs: 1, blockVpn: false };
  expect(evaluateGeoGate(request(undefined, "ammarai_geo_bypass=one; sb-fake-auth-token=yes"), cfg, "ET").status).toBe(503);
});
test("claim database errors fail closed", async () => {
  const result = await resolveGeoBypass(request("one"), async () => { throw new Error("offline"); });
  expect(result.allowed).toBe(false);
  expect(result.response.status).toBe(503);
});
