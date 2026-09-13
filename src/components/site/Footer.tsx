import { Link } from "@tanstack/react-router";
import { footerNav, SITE } from "@/lib/site";
import { Wordmark } from "./Header";

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(4,1fr)]">
          <div>
            <Link to="/" className="inline-block">
              <Wordmark className="font-display text-xl font-semibold tracking-tight" />
            </Link>
            <p className="mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground">
              {SITE.tagline} Writing, chat, images, video, voice, transcription, vision, documents
              and code in one workspace.
            </p>
          </div>

          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-foreground">
                {group.heading}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {"slug" in link ? (
                      <Link
                        to="/$slug"
                        params={{ slug: link.slug }}
                        className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <Link
                        to={link.to}
                        className="text-sm text-ink-foreground/60 transition-colors hover:text-ink-foreground"
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

        <div className="mt-12 flex flex-col gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {SITE.name}. An AI creation workspace.
          </p>
          <p className="text-xs text-muted-foreground">Write. Chat. Create. Speak. See. Code.</p>
        </div>
      </div>
    </footer>
  );
}
