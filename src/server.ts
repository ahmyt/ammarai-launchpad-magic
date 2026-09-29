import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";
import { geoMaintenanceResponse } from "./lib/geo-gate.server";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

// Plesk/Zap-Hosting webspace cannot add custom nginx directives, so the Node
// app emits its own security + caching headers (their support recommended this).
const IMMUTABLE_ASSET_RE = /^\/(assets|_build|_serverFn)\//;
const LONG_LIVED_MEDIA_RE = /\.(?:webp|avif|png|jpe?g|gif|svg|ico|mp3|mp4|webm|woff2?|ttf|otf|eot)$/i;

function withSiteHeaders(request: Request, response: Response): Response {
  const headers = new Headers(response.headers);

  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  headers.set("X-Frame-Options", "SAMEORIGIN");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  if (response.status === 200) {
    const pathname = new URL(request.url).pathname;
    if (pathname.startsWith("/fonts/")) {
      // Always override: the static server sends no-cache for public files.
      headers.set("Cache-Control", "public, max-age=31536000, immutable");
    } else if (IMMUTABLE_ASSET_RE.test(pathname) && pathname !== "/_serverFn/" && !pathname.startsWith("/_serverFn/")) {
      if (!headers.has("Cache-Control")) headers.set("Cache-Control", "public, max-age=15552000, immutable");
    } else if (LONG_LIVED_MEDIA_RE.test(pathname)) {
      headers.set("Cache-Control", "public, max-age=2592000, stale-while-revalidate=86400");
    }
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const gate = await geoMaintenanceResponse(request);
      if (gate.block) return gate.block;
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const final = withSiteHeaders(request, await normalizeCatastrophicSsrResponse(response));
      if (gate.cookie) final.headers.append("set-cookie", gate.cookie);
      return final;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};

