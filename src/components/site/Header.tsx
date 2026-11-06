import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Menu, Moon, Sun, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { primaryNav, SITE, REGISTER_URL, LOGIN_URL } from "@/lib/site";
import { siteContentQuery } from "@/lib/content";
import { ActionButton, ExternalButton } from "./Button";
import { useTheme } from "./ThemeProvider";
import logoAsset from "@/assets/ammarai-logo.png.asset.json";
import { assetUrl } from "@/lib/asset-url";
import { pillarDetails, pillarOrder } from "@/data/ecosystem";

const featuredPages = [
  { to: "/restaurant-phone-ordering", label: "Restaurant Phone Agent" },
  { to: "/clinic-phone-agent", label: "Clinic Phone Agent" },
  { to: "/ai-phone-agent", label: "AI Phone Agent" },
  { to: "/ai-video-generator", label: "AI Video Pro" },
  { to: "/ai-avatar-generator", label: "AI Avatar" },
  { to: "/ai-image-generator", label: "AI Image Pro" },
  { to: "/ai-fashion-studio", label: "AI Fashion Studio" },
  { to: "/ai-writer", label: "AI Writer" },
  { to: "/ai-agent-builder", label: "AI Agent Builder" },
  { to: "/ai-music-generator", label: "AI Music Pro" },
  { to: "/ai-smart-inbox", label: "Chatbot & Inbox" },
  { to: "/ai-ugc-generator", label: "AI UGC Creator" },
  { to: "/ai-url-to-video", label: "AI URL to Video" },
  { to: "/ai-voice-generator", label: "Voiceover & Voice Clone" },
  { to: "/realtime-voice-chat", label: "Realtime Voice Chat" },
  { to: "/ai-transcription", label: "AI Transcription" },
  { to: "/ai-crm", label: "AI CRM" },
  { to: "/ai-social-media-agent", label: "Social Media Agent" },
  { to: "/ai-blogger-agent", label: "Blogger Agent" },
  { to: "/ai-dm-comment-agent", label: "DM & Comment Agent" },
  { to: "/ai-chat", label: "AI Chat Pro" },
  { to: "/ai-deep-research", label: "Deep Research" },
  { to: "/ai-council-mode", label: "Council Mode" },
  { to: "/ai-video-agent", label: "AI Video Agent" },
  { to: "/ai-video-editor", label: "AI Video Editor" },
  { to: "/ai-dubbing", label: "AI Dubbing" },
  { to: "/viral-clips", label: "Viral Clips" },
  { to: "/ai-video-enhancer", label: "Video Enhancer" },
  { to: "/ai-presentation-maker", label: "Presentation Maker" },
  { to: "/ai-seo-analyzer", label: "SEO Analyzer" },
  { to: "/ai-document-analyzer", label: "Document Analyzer" },
  { to: "/ai-code-generator", label: "Code Generator" },
] as const;

const mobileToolGroups = [
  { label: "AI Phone & Agents", paths: ["/restaurant-phone-ordering", "/clinic-phone-agent", "/ai-phone-agent", "/ai-agent-builder", "/ai-crm", "/ai-social-media-agent", "/ai-blogger-agent", "/ai-dm-comment-agent"] },
  { label: "Video Studio", paths: ["/ai-video-agent", "/ai-video-generator", "/ai-avatar-generator", "/ai-ugc-generator", "/ai-url-to-video", "/ai-video-editor", "/ai-dubbing", "/viral-clips", "/ai-video-enhancer"] },
  { label: "Images & Design", paths: ["/ai-image-generator", "/ai-fashion-studio", "/ai-presentation-maker"] },
  { label: "Audio & Voice", paths: ["/ai-voice-generator", "/ai-music-generator", "/realtime-voice-chat", "/ai-transcription"] },
  { label: "Chat, Content & Research", paths: ["/ai-writer", "/ai-chat", "/ai-smart-inbox", "/ai-deep-research", "/ai-council-mode", "/ai-seo-analyzer", "/ai-document-analyzer", "/ai-code-generator"] },
] as const;

const mobileResourcePages = [
  { to: "/pricing", label: "Pricing & Plans" },
  { to: "/use-cases", label: "Use Cases" },
  { to: "/features", label: "Features" },
  { to: "/tutorials", label: "Step-by-Step Tutorials" },
  { to: "/resources", label: "Resources Hub" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/about", label: "About Us" },
  { to: "/contact", label: "Contact & Support" },
] as const;

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <picture>
        <source srcSet="/media/ammarai-logo.webp" type="image/webp" />
        <img
          src={assetUrl(logoAsset.url)}
          alt="AmmarAI logo"
          width={32}
          height={32}
          decoding="async"
          fetchPriority="high"
          className="rounded-md size-7 sm:size-8 shrink-0"
        />
      </picture>
      <span className={className ?? "font-display text-2xl font-semibold tracking-tight"}>
        Ammar<span className="text-accent">AI</span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const { theme, toggleTheme } = useTheme();
  const { data: content } = useSuspenseQuery(siteContentQuery);
  const settings = content.pages.find((p) => p.slug === "settings");
  const showTutorials = settings?.showTutorialsNav !== false;
  const showThemeToggle = settings?.showHeaderThemeToggle !== false;
  const navItems = showTutorials
    ? primaryNav
    : primaryNav.filter((item) => item.to !== "/tutorials");

  return (
    <header className="site-header sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    }}>
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
                    <Link to="/ai-tools" search={{ pillar }} className="mt-3 inline-flex text-xs font-semibold text-accent">Explore {pillar}</Link>
                  </div>
                ))}
                <div>
                  <p className="eyebrow">For restaurants</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">AI answers calls, takes pickup orders and sends tickets to your POS and kitchen.</p>
                  <Link to="/restaurant-phone-ordering" className="mt-3 inline-flex text-xs font-semibold text-accent">Restaurant Phone Ordering</Link>
                </div>
                <div>
                  <p className="eyebrow">For clinics</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">AI receptionist answers patient calls, books appointments into your calendar and sends reminders.</p>
                  <Link to="/clinic-phone-agent" className="mt-3 inline-flex text-xs font-semibold text-accent">Clinic Phone Agent</Link>
                </div>
                <div>
                  <p className="eyebrow">Featured tool pages</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Dedicated guides with live demos and real examples.</p>
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
                    {featuredPages.filter((f) => !f.to.includes("restaurant") && !f.to.includes("clinic")).map((f) => (
                      <Link key={f.to} to={f.to} className="text-xs font-semibold text-accent">{f.label}</Link>
                    ))}
                  </div>
                </div>
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
          {showThemeToggle ? (
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
          ) : null}

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
          {showThemeToggle ? (
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
          ) : null}

          <ActionButton
            ref={menuToggleRef}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label="Toggle navigation menu"
            className="site-menu-toggle size-10 p-0"
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </ActionButton>
        </div>
      </div>

      {open ? (
        <div id="mobile-navigation" className="site-mobile-menu border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-6xl flex-col px-5 py-4">
            <div className="grid grid-cols-2 gap-3 border-b border-border pb-4">
              <ExternalButton href={LOGIN_URL} variant="outline" size="sm" onClick={() => setOpen(false)}>Login</ExternalButton>
              <ExternalButton
                href={REGISTER_URL}
                variant="primary"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Start Free
              </ExternalButton>
            </div>
            <Accordion type="single" collapsible className="mobile-nav-groups">
              {mobileToolGroups.map((group) => (
                <AccordionItem key={group.label} value={group.label} className="border-border">
                  <AccordionTrigger className="min-h-14 gap-3 font-semibold hover:no-underline">{group.label}</AccordionTrigger>
                  <AccordionContent className="flex flex-col pb-3">
                    {group.paths.map((path) => featuredPages.find((page) => page.to === path)).map((page) => page ? (
                      <Link key={page.to} to={page.to} onClick={() => setOpen(false)} className="mobile-nav-link" activeProps={{ className: "text-accent" }}>{page.label}</Link>
                    ) : null)}
                    {group.label === "Chat, Content & Research" ? <>
                      <Link to="/ai-models" onClick={() => setOpen(false)} className="mobile-nav-link">AI Models Comparison</Link>
                      <Link to="/ai-tools" onClick={() => setOpen(false)} className="mobile-nav-link">Full AI Tools Directory</Link>
                      {pillarOrder.map((pillar) => <Link key={pillar} to="/ai-tools" search={{ pillar }} onClick={() => setOpen(false)} className="mobile-nav-link text-muted-foreground">{pillar} tools</Link>)}
                    </> : null}
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="resources" className="border-border">
                <AccordionTrigger className="min-h-14 gap-3 font-semibold hover:no-underline">Resources & Company</AccordionTrigger>
                <AccordionContent className="flex flex-col pb-3">
                  {mobileResourcePages.filter((page) => showTutorials || page.to !== "/tutorials").map((page) => <Link key={page.to} to={page.to} onClick={() => setOpen(false)} className="mobile-nav-link" activeProps={{ className: "text-accent" }}>{page.label}</Link>)}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
