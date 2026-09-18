import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Moon, Sun } from "lucide-react";
import { primaryNav, SITE, REGISTER_URL, LOGIN_URL } from "@/lib/site";
import { siteContentQuery } from "@/lib/content";
import { ActionButton, ExternalButton } from "./Button";
import { useTheme } from "./ThemeProvider";
import logoAsset from "@/assets/ammarai-logo.png.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { pillarDetails, pillarOrder } from "@/data/ecosystem";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <img
        src={assetUrl(logoAsset.url)}
        alt="AmmarAI logo"
        width={32}
        height={32}
        className="rounded-md size-7 sm:size-8 shrink-0"
      />
      <span className={className ?? "font-display text-2xl font-semibold tracking-tight"}>
        Ammar<span className="text-accent">AI</span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const settings = content.pages.find((p) => p.slug === "settings");
  const showTutorials = settings?.showTutorialsNav !== false;
  const navItems = showTutorials
    ? primaryNav
    : primaryNav.filter((item) => item.to !== "/tutorials");

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-3.5 sm:px-8">
        <Link to="/" aria-label={`${SITE.name} home`} className="flex items-baseline gap-2">
          <Wordmark />
          <span className="sr-only">{SITE.name}</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => item.to === "/ai-tools" ? (
            <div key={item.to} className="site-tools-menu group relative">
              <Link
                to={item.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {item.label}
              </Link>
              <div className="site-tools-menu-panel" aria-label="AI tools by workflow">
                {pillarOrder.map((pillar) => (
                  <div key={pillar}>
                    <p className="eyebrow">{pillar}</p>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillarDetails[pillar].description}</p>
                    <Link to="/ai-tools" className="mt-3 inline-flex text-xs font-semibold text-accent">Explore {pillar}</Link>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ActionButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="theme-toggle size-9 p-0"
          >
            {theme === "light" ? <Moon className="size-4" aria-hidden="true" /> : <Sun className="size-4" aria-hidden="true" />}
          </ActionButton>
          <a
            href={LOGIN_URL}
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Login
          </a>
          <ExternalButton href={REGISTER_URL} variant="ink" size="sm">
            Start Free
          </ExternalButton>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ActionButton
            type="button"
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            className="theme-toggle size-10 p-0"
          >
            {theme === "light" ? <Moon className="size-4" aria-hidden="true" /> : <Sun className="size-4" aria-hidden="true" />}
          </ActionButton>
          <ActionButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
            className="site-menu-toggle size-10 p-0"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {open ? "×" : "≡"}
            </span>
          </ActionButton>
        </div>
      </div>

      {open ? (
        <div className="site-mobile-menu border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 text-sm font-medium text-foreground last:border-0"
              >
                {item.label}
              </Link>
            ))}
            <div className="grid grid-cols-2 gap-2 border-b border-border py-4">
              {pillarOrder.map((pillar) => (
                <Link key={pillar} to="/ai-tools" onClick={() => setOpen(false)} className="text-xs font-semibold text-accent">
                  {pillar} tools
                </Link>
              ))}
            </div>
            <div className="flex items-center gap-3 pt-4">
              <ExternalButton
                href={REGISTER_URL}
                variant="primary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Start Creating Free
              </ExternalButton>
              <a
                href={LOGIN_URL}
                onClick={() => setOpen(false)}
                className="text-sm font-medium text-muted-foreground"
              >
                Login
              </a>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
