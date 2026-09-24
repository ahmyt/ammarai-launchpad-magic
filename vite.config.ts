// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Zap-Hosting's shared webspace cannot add nginx directives, so the self-hosted
// (Plesk/Node) build emits caching + security headers itself. These rules are
// skipped inside Lovable builds, where the route manifest must stay published.
const isLovableBuild = Boolean(
  process.env["LOVABLE"] || process.env["LOVABLE_SANDBOX"] || process.env["LOVABLE_NITRO_PRESET"],
);


const selfHostedRouteRules = {
  "/**": {
    headers: {
      "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
      "X-Frame-Options": "SAMEORIGIN",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
  "/assets/**": {
    headers: { "Cache-Control": "public, max-age=15552000, immutable" },
  },
  "/media/**": {
    headers: { "Cache-Control": "public, max-age=2592000, stale-while-revalidate=86400" },
  },
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Pin the Nitro build target to a Node.js server so the app can be hosted on
  // Plesk (or any Node host). This override applies ONLY outside a Lovable
  // build: Lovable sets LOVABLE_NITRO_PRESET=cloudflare-module internally, so
  // the Lovable preview/published site keeps running on Cloudflare unchanged.
  // output.dir is pinned to "dist" so the server entry is always at
  // dist/server/index.mjs regardless of preset.
  nitro: {
    preset: "node-server",
    output: { dir: "dist" },
    ...(isLovableBuild ? {} : { routeRules: selfHostedRouteRules }),
  },
});

