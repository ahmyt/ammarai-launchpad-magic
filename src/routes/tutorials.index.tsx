import { Link, createFileRoute } from "@tanstack/react-router";
import { BookOpenText, ChevronRight, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Container } from "@/components/site/primitives";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import {
  searchTutorials,
  tutorialCategories,
  tutorials,
  tutorialsByCategory,
} from "@/data/tutorials";

export const Route = createFileRoute("/tutorials/")({
  staticData: { sitemap: true },
  head: () => ({
    meta: [
      { title: "AmmarAI Tutorials & Documentation" },
      {
        name: "description",
        content:
          "Step-by-step AmmarAI guides for chat, documents, images, video generation, viral clips, AI influencer videos, Fashion Studio, dubbing, captions and UGC videos.",
      },
      { property: "og:title", content: "AmmarAI Tutorials & Documentation" },
      {
        property: "og:description",
        content:
          "Verified AmmarAI guides for chat, documents, image generation, video creation, video marketing and fashion.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TutorialsIndexPage,
});

function TutorialsIndexPage() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => searchTutorials(query), [query]);
  const searching = query.trim().length > 0;

  return (
    <div>
      <Container className="tutorials-hub">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tutorials" }]} />
        <header className="tutorials-hub-header">
          <p className="eyebrow">Tutorials</p>
          <h1>AmmarAI documentation</h1>
          <p className="tutorials-hub-lede">
            Step-by-step guidance for verified AmmarAI chat, document, image, video and video-marketing workflows.
          </p>
        </header>

        <div className="tutorials-search" role="search">
          <Search className="tutorials-search-icon size-4" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search tutorials…"
            aria-label="Search tutorials"
            className="tutorials-search-input"
          />
        </div>

        {searching ? (
          <section aria-live="polite">
            {results.length > 0 ? (
              <ul className="tutorials-results">
                {results.map((tutorial) => (
                  <li key={tutorial.slug}>
                    <Link
                      to="/tutorials/$slug"
                      params={{ slug: tutorial.slug }}
                      className="tutorials-card"
                    >
                      <span className="tutorials-card-category">{tutorial.category}</span>
                      <span className="tutorials-card-title">{tutorial.h1}</span>
                      <span className="tutorials-card-desc">{tutorial.description}</span>
                      <span className="tutorials-card-link">
                        Read tutorial <ChevronRight className="size-4" aria-hidden="true" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="tutorials-empty">
                <BookOpenText className="size-6" aria-hidden="true" />
                <p>No tutorials match “{query.trim()}”.</p>
                <p className="tutorials-empty-hint">
                  Try a different term, or browse the categories below.
                </p>
              </div>
            )}
          </section>
        ) : (
          tutorialCategories.map((category) => {
            const items = tutorialsByCategory(category);
            if (items.length === 0) return null;
            return (
              <section key={category} className="tutorials-hub-section">
                <h2>{category}</h2>
                <ul className="tutorials-results">
                  {items.map((tutorial) => (
                    <li key={tutorial.slug}>
                      <Link
                        to="/tutorials/$slug"
                        params={{ slug: tutorial.slug }}
                        className="tutorials-card"
                      >
                        <span className="tutorials-card-category">{tutorial.category}</span>
                        <span className="tutorials-card-title">{tutorial.h1}</span>
                        <span className="tutorials-card-desc">{tutorial.description}</span>
                        <span className="tutorials-card-link">
                          Read tutorial <ChevronRight className="size-4" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })
        )}

        <p className="tutorials-hub-foot">
          {tutorials.length} {tutorials.length === 1 ? "guide" : "guides"} published. A guide
          is added only after its tool and end-user workflow are verified.
        </p>
      </Container>
    </div>
  );
}
