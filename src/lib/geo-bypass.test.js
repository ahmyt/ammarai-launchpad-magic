import { expect, test } from "bun:test";
import { bypassCodes, bypassHash, parseBypassCookie } from "./geo-bypass";
import { resolveGeoBypass } from "./geo-bypass.server";
import { evaluateGeoGate } from "./geo-gate.server";

const request = (code, cookie = "") => new Request(`https://ammarai.com/pricing?keep=yes${code === undefined ? "" : `&bypass_country=${code}`}`, { headers: { cookie } });
function storeFixture() {
  const claims = new Map();
  return { claims, store: async (action, code, device) => {
    if (action === "claim" && !claims.has(code)) claims.set(code, { device, expires: Date.now() + 604800000 });
    const claim = claims.get(code);
    return claim?.device === device && claim.expires > Date.now();
  } };
}
const cookieFrom = (result) => result.response.headers.get("set-cookie").split(";")[0];

test("first browser claims code and gets a seven-day opaque cookie", async () => {
  const { store } = storeFixture();
  const result = await resolveGeoBypass(request("one"), "one", store);
  expect(result.response.status).toBe(302);
  expect(result.response.headers.get("location")).toBe("/pricing?keep=yes");
  expect(result.response.headers.get("set-cookie")).toContain("Max-Age=604800; HttpOnly; Secure; SameSite=Lax");
  expect(parseBypassCookie(cookieFrom(result).split("=")[1])).not.toBeNull();
});
test("a second browser cannot use an already claimed code", async () => {
  const { store } = storeFixture();
  await resolveGeoBypass(request("one"), "one", store);
  expect((await resolveGeoBypass(request("one"), "one", store)).response.status).toBe(403);
});
test("claimed browser can revisit without the code", async () => {
  const { store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), "one", store));
  expect((await resolveGeoBypass(request(undefined, cookie), "one", store)).allowed).toBe(true);
});
test("each comma-separated code has its own first browser", async () => {
  const { store, claims } = storeFixture();
  expect(bypassCodes("one, two one")).toEqual(["one", "two"]);
  expect((await resolveGeoBypass(request("one"), "one,two", store)).allowed).toBe(true);
  expect((await resolveGeoBypass(request("two"), "one,two", store)).allowed).toBe(true);
  expect(claims.size).toBe(2);
});
test("reset revokes old browser and permits a new first claim", async () => {
  const { store, claims } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), "one", store));
  claims.delete(await bypassHash("one"));
  expect((await resolveGeoBypass(request(undefined, cookie), "one", store)).allowed).toBe(false);
  expect((await resolveGeoBypass(request("one"), "one", store)).allowed).toBe(true);
});
test("expiry never frees the code for a different browser without reset", async () => {
  const { store, claims } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), "one", store));
  claims.get(await bypassHash("one")).expires = Date.now() - 1;
  expect((await resolveGeoBypass(request(undefined, cookie), "one", store)).allowed).toBe(false);
  expect((await resolveGeoBypass(request("one"), "one", store)).response.status).toBe(403);
});
test("removed code invalidates its old browser immediately on current configuration", async () => {
  const { store } = storeFixture();
  const cookie = cookieFrom(await resolveGeoBypass(request("one"), "one", store));
  expect((await resolveGeoBypass(request(undefined, cookie), "two", store)).allowed).toBe(false);
});
test("legacy raw code and forged auth-looking cookies do not bypass country gate", () => {
  const cfg = { enabled: true, mode: "block", countries: ["ET"], title: "t", message: "m", bypassKey: "one", cacheMs: 1, blockVpn: false };
  expect(evaluateGeoGate(request(undefined, "ammarai_geo_bypass=one; sb-fake-auth-token=yes"), cfg, "ET").status).toBe(503);
});
test("claim database errors fail closed", async () => {
  const result = await resolveGeoBypass(request("one"), "one", async () => { throw new Error("offline"); });
  expect(result.allowed).toBe(false);
  expect(result.response.status).toBe(503);
});