import { createFileRoute } from "@tanstack/react-router";
import { createHmac, timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

export const Route = createFileRoute("/api/public/whatsapp-webhook")({
  server: {
    handlers: {
      // Meta verification handshake
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const mode = url.searchParams.get("hub.mode");
        const token = url.searchParams.get("hub.verify_token") ?? "";
        const challenge = url.searchParams.get("hub.challenge") ?? "";
        const expected = process.env.WHATSAPP_VERIFY_TOKEN;
        if (mode === "subscribe" && expected && safeEqual(token, expected) && /^[\w-]{1,200}$/.test(challenge)) {
          return new Response(challenge, { status: 200, headers: { "Content-Type": "text/plain" } });
        }
        return new Response("Forbidden", { status: 403 });
      },
      // Incoming messages (signature-verified when app secret is configured)
      POST: async ({ request }) => {
        const body = await request.text();
        const appSecret = process.env.WHATSAPP_APP_SECRET;
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
