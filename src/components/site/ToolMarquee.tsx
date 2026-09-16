import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Tool } from "@/data/types";

type ToolMarqueeProps = {
  rows: Tool[][];
  total: number;
};

function MarqueeCard({ tool, index, accent }: { tool: Tool; index: number; accent: boolean }) {
  return (
    <Link
      to="/$slug"
      params={{ slug: tool.slug }}
      className={`studio-marquee-card group ${accent ? "studio-marquee-card-accent" : ""}`}
    >
      <span className="studio-marquee-index" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="studio-marquee-copy">
        <span className="studio-marquee-category">{tool.category}</span>
        <span className="studio-marquee-name">{tool.name}</span>
        <span className="studio-marquee-summary">{tool.summary}</span>
      </span>
      <ArrowRight className="studio-marquee-arrow" aria-hidden="true" />
    </Link>
  );
}

function MarqueeSet({ tools, offset }: { tools: Tool[]; offset: number }) {
  return (
    <div className="studio-marquee-set">
      {tools.map((tool, index) => (
        <MarqueeCard
          key={`${tool.slug}-${offset}`}
          tool={tool}
          index={offset + index}
          accent={(offset + index) % 5 === 0}
        />
      ))}
    </div>
  );
}

export function ToolMarquee({ rows, total }: ToolMarqueeProps) {
  return (
    <div className="studio-marquee-shell">
      <div className="studio-marquee-topline">
        <span>Core creative systems</span>
        <span>{total} tools online</span>
      </div>
      <div className="studio-marquee-viewport" aria-label="Featured AmmarAI tools">
        {rows.map((row, rowIndex) => {
          const offset = rows.slice(0, rowIndex).reduce((count, current) => count + current.length, 0);
          return (
            <div className="studio-marquee-row" key={row.map((tool) => tool.slug).join("-")}>
              <div className={`studio-marquee-track ${rowIndex % 2 === 0 ? "is-left" : "is-right"}`}>
                <MarqueeSet tools={row} offset={offset} />
                <div aria-hidden="true">
                  <MarqueeSet tools={row} offset={offset} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="studio-marquee-footer">
        <div className="studio-marquee-status">
          <span className="studio-marquee-status-dots" aria-hidden="true"><i /><i /><i /></span>
          <span>One workspace · every tool included</span>
        </div>
        <Link to="/ai-tools" className="studio-marquee-all">
          Explore all {total} tools <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}