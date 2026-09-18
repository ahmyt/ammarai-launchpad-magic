import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

import { tutorialCategories, tutorialsByCategory } from "@/data/tutorials";

export const Route = createFileRoute("/tutorials")({
  staticData: { sitemap: true },
  component: TutorialsLayout,
});

function TutorialsLayout() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <div className="tutorials-shell">
      <div className="shell-grid">
        <aside className="tutorials-sidebar" aria-label="Tutorial navigation">
          <nav className="tutorials-sidebar-inner">
            <Link to="/tutorials" className="tutorials-sidebar-home">
              Tutorials
            </Link>
            {tutorialCategories.map((category) => {
              const items = tutorialsByCategory(category);
              if (items.length === 0) return null;
              return (
                <div key={category} className="tutorials-sidebar-group">
                  <p className="tutorials-sidebar-heading">{category}</p>
                  <ul>
                    {items.map((tutorial) => {
                      const href = `/tutorials/${tutorial.slug}`;
                      const active = pathname === href;
                      return (
                        <li key={tutorial.slug}>
                          <Link
                            to="/tutorials/$slug"
                            params={{ slug: tutorial.slug }}
                            className={`tutorials-sidebar-link${active ? " is-active" : ""}`}
                            aria-current={active ? "page" : undefined}
                          >
                            {tutorial.h1}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
            <div className="tutorials-sidebar-group">
              <p className="tutorials-sidebar-heading">More</p>
              <ul>
                <li>
                  <Link to="/ai-tools" className="tutorials-sidebar-link">
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                    AI tools directory
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="tutorials-sidebar-link">
                    <ChevronRight className="size-3.5" aria-hidden="true" />
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        <div className="tutorials-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
