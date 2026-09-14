import { Link } from "@tanstack/react-router";
import { footerNav, SITE } from "@/lib/site";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer className="site-footer border-t border-border bg-sand">
      <div className="site-footer-inner mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="site-footer-main grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,2fr)]">
          <div className="site-footer-brand">
            <div className="site-footer-index" aria-hidden="true">A/14</div>
            <Link to="/" className="site-footer-wordmark inline-block">
              <Wordmark className="font-display text-3xl font-semibold sm:text-4xl" />
            </Link>
            <p className="site-footer-copy mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground">
              {SITE.tagline} Writing, chat, images, video, voice, transcription, vision, documents
              and code in one workspace.
            </p>
            <p className="site-footer-signoff mt-10">Write. Chat. Create. Speak. See. Code.</p>
          </div>

          <div className="site-footer-nav grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {footerNav.map((group, groupIndex) => (
              <nav key={group.heading} aria-label={group.heading}>
                <div className="site-footer-nav-index" aria-hidden="true">
                  {String(groupIndex + 1).padStart(2, "0")}
                </div>
                <h2 className="font-sans text-[11px] font-semibold uppercase text-foreground">
                  {group.heading}
                </h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      {"slug" in link ? (
                        <Link
                          to="/$slug"
                          params={{ slug: link.slug }}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="site-footer-bottom flex flex-col gap-3 border-t border-border sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. An AI creation workspace.
          </p>
          <Link to="/" className="site-footer-back text-xs text-muted-foreground transition-colors hover:text-foreground">
            Back to top <span aria-hidden="true">↑</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
