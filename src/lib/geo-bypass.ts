export const BYPASS_COOKIE = "ammarai_geo_bypass";
export const BYPASS_MAX_AGE = 7 * 24 * 60 * 60;

export function bypassCodes(value: string): string[] {
  // Codes are case-insensitive: admins and visitors often type them in a
  // different case, and an exact-case mismatch reads as "invalid code".
  return [...new Set(value.split(/[\s,]+/).map((code) => code.trim().toLowerCase()).filter(Boolean))];
}

export function readCookie(request: Request, name: string): string {
  const entry = (request.headers.get("cookie") ?? "").split(";").map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  return entry?.slice(name.length + 1) ?? "";
}

export async function bypassHash(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export function parseBypassCookie(value: string): { codeHash: string; token: string } | null {
  const match = /^([a-f0-9]{64})\.([a-f0-9]{64})$/.exec(value);
  return match?.[1] && match[2] ? { codeHash: match[1], token: match[2] } : null;
}