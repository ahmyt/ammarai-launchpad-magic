import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useMemo, type ReactNode } from "react";

import appCss from "../styles.css?url";

// Web fonts load without holding up the first paint: text renders at once in
// the fallback font, then swaps when the font stylesheet arrives.
const FONT_CSS =
  "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap";
const FONT_LOADER = `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href=${JSON.stringify(FONT_CSS)};document.head.appendChild(l);})();`;
import { TOOL_COUNT } from "@/data/tools";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { ContentProtection } from "@/components/site/ContentProtection";
import { OfferProvider } from "@/components/site/OfferProvider";
import { ThemeProvider, useTheme } from "@/components/site/ThemeProvider";
import { siteContentQuery, siteContentRowsQuery, type ContentRow } from "@/lib/content";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  staticData: { sitemap: false },
  loader: ({ context }) => context.queryClient.fetchQuery(siteContentRowsQuery),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AmmarAI: One AI Platform for Writing, Video, Voice and Code" },
      {
        name: "description",
        content:
          `Explore AmmarAI\u2019s ${TOOL_COUNT}-tool workspace for AI agents, writing, chat, images, video, voice, CRM and automation. Start creating free today \u2014 no card required.`,
      },
      { name: "author", content: "AmmarAI" },
      { property: "og:site_name", content: "AmmarAI" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "preload", as: "style", href: FONT_CSS },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const rows = Route.useLoaderData() as ContentRow[] | undefined;

  // Hydration can drop the stylesheet the inline loader added to <head>;
  // make sure it is present (the browser already has it cached).
  useEffect(() => {
    if (document.querySelector('link[data-site-fonts]')) return;
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = FONT_CSS;
    link.dataset.siteFonts = "";
    document.head.appendChild(link);
  }, []);

  // The root loader carries only the CMS rows. Seed the cache with them so the
  // header, footer and page copy resolve without a second request.
  useMemo(() => {
    if (
      Array.isArray(rows) &&
      queryClient.getQueryData(siteContentQuery.queryKey) === undefined
    ) {
      queryClient.setQueryData(siteContentQuery.queryKey, rows);
    }
  }, [rows, queryClient]);


  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <SiteShell />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function SiteShell() {
  const { theme } = useTheme();

  return (
    <OfferProvider>
      <ContentProtection />
      <div className={`site-shell home-swiss flex min-h-screen flex-col bg-background text-foreground ${theme === "dark" ? "theme-dark" : ""}`}>
          <Header />
          <main className="flex-1">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <Footer />
        </div>
    </OfferProvider>
  );
}
