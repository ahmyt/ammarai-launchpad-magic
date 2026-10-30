import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export const Route = createFileRoute("/api/public/whatsapp-webhook")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      // Meta verification handshake
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = (url.searchParams.get("hub.verify_token") ?? "").trim();
        const challenge = url.searchParams.get("hub.challenge") ?? "";
        const expected = (process.env["WHATSAPP_VERIFY_TOKEN"] ?? "").trim();
        if (!expected) {
          return new Response("Forbidden: verify token is not configured on this server", { status: 403 });
        }
        if (mode !== "subscribe" || !challenge || challenge.length > 200) {
          return new Response("Forbidden: invalid verification request", { status: 403 });
        }
        if (!safeEqual(token, expected)) {
          return new Response("Forbidden: verify token does not match", { status: 403 });
        }
        return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
      },
      // Incoming messages (signature-verified when app secret is configured)
      POST: async ({ request }) => {
        const body = await request.text();
        const appSecret = process.env["WHATSAPP_APP_SECRET"];
        if (!appSecret) return new Response("ok", { status: 200 }); // not processing yet
        const sig = request.headers.get("x-hub-signature-256") ?? "";
        const expected = "sha256=" + createHmac("sha256", appSecret).update(body).digest("hex");
        if (!safeEqual(sig, expected)) return new Response("Invalid signature", { status: 401 });
        // Intake bot processing will be added next.
        return new Response("ok", { status: 200 });
      },
    },
  },
});
