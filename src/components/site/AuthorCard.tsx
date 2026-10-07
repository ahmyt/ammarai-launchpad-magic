import { useSuspenseQuery } from "@tanstack/react-query";
import { fullSiteContentQuery } from "@/lib/content-full";
import { Container, Section } from "@/components/site/primitives";
import type { Page } from "@/data/types";

const LINKS: { key: keyof Page; label: string }[] = [
  { key: "authorWebsite", label: "Website" },
  { key: "authorLinkedin", label: "LinkedIn" },
  { key: "authorX", label: "X" },
  { key: "authorYoutube", label: "YouTube" },
  { key: "authorInstagram", label: "Instagram" },
];

export function authorProfile(settings: Page | undefined) {
  if (!settings || settings.showAuthorCard === false) return null;
  const name = settings.authorName?.trim();
  if (!name) return null;
  const links = LINKS.map((l) => ({ label: l.label, url: String(settings[l.key] ?? "").trim() })).filter(
    (l) => /^https?:\/\//.test(l.url),
  );
  return {
    name,
    role: settings.authorRole?.trim() ?? "",
    bio: settings.authorBio?.trim() ?? "",
    avatar: settings.authorAvatarUrl?.trim() ?? "",
    links,
  };
}

/** JSON-LD author: a named Person when the CMS profile is filled, else the organisation. */
export function useArticleAuthor(orgName: string) {
  const { data } = useSuspenseQuery(fullSiteContentQuery);
  const author = authorProfile(data.pages.find((p) => p.slug === "settings"));
  if (!author) return { "@type": "Organization", name: orgName };
  return {
    "@type": "Person",
    name: author.name,
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(author.avatar.startsWith("https://") ? { image: author.avatar } : {}),
    ...(author.links.length ? { sameAs: author.links.map((l) => l.url) } : {}),
  };
}

export function AuthorCard() {
  const { data } = useSuspenseQuery(fullSiteContentQuery);
  const author = authorProfile(data.pages.find((p) => p.slug === "settings"));
  if (!author) return null;
  const initials = author.name
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Section className="py-10">
      <Container size="narrow">
        <aside
          aria-label="About the author"
          className="rounded-2xl border border-border bg-card p-6 sm:p-8"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
            About the author
          </p>
          <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-start">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                width={80}
                height={80}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-full object-cover ring-2 ring-accent ring-offset-2 ring-offset-card"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary text-xl font-semibold text-foreground ring-2 ring-accent ring-offset-2 ring-offset-card"
              >
                {initials}
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xl font-semibold text-foreground">{author.name}</p>
              {author.role ? (
                <p className="mt-1 text-sm text-muted-foreground">{author.role}</p>
              ) : null}
              {author.bio ? (
                <p className="mt-3 text-pretty text-base leading-relaxed text-muted-foreground">
                  {author.bio}
                </p>
              ) : null}
              {author.links.length > 0 ? (
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {author.links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="font-medium text-foreground underline-offset-4 hover:text-accent hover:underline"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </aside>
      </Container>
    </Section>
  );
}
