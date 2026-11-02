import { createFileRoute } from "@tanstack/react-router";

/**
 * Same-origin trace endpoint in Cloudflare's /cdn-cgi/trace format, so the
 * consent banner's region lookup also works on self-hosted deployments
 * (e.g. Plesk) that have no Cloudflare in front. When Cloudflare IS in front,
 * its own /cdn-cgi/trace answers first and this route never runs.
 */
export const Route = createFileRoute("/cdn-cgi/trace")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { visitorCountry } = await import("@/lib/geo-gate.server");
        const country = await visitorCountry(request);
        const host = new URL(request.url).hostname;
        const body = `h=${host}\nloc=${country || "XX"}\nv=t\n`;
        return new Response(body, {
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
