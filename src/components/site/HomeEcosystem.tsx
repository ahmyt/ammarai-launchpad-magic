import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pillarDetails, pillarOrder, flagshipWorkflows, toolsInPillar } from "@/data/ecosystem";
import type { Tool } from "@/data/types";
import { Container, Section, SectionHeading } from "./primitives";
import { buttonClass } from "./Button";

export function EcosystemOverview({ tools }: { tools: Tool[] }) {
  return (
    <Section tone="sand" className="studio-section ecosystem-overview">
      <Container size="wide">
        <SectionHeading
          eyebrow="One connected workspace"
          title="Create. Think. Automate. Grow."
          intro="AmmarAI is not a shelf of disconnected generators. Start with the job, move between the tools it needs, and keep the work together."
          scale="large"
          className="studio-heading-wide"
        />
        <div className="ecosystem-pillar-grid mt-12">
          {pillarOrder.map((pillar, index) => {
            const pillarTools = toolsInPillar(tools, pillar);
            return (
              <article key={pillar} className="ecosystem-pillar">
                <div className="flex items-start justify-between gap-4">
                  <span className="ecosystem-number">0{index + 1}</span>
                  <span className="eyebrow">{pillarTools.length} tools</span>
                </div>
                <h3>{pillar}</h3>
                <p>{pillarDetails[pillar].description}</p>
                <ul aria-label={`${pillar} examples`}>
                  {pillarTools.slice(0, 4).map((tool) => (
                    <li key={tool.slug}>
                      <Link to="/$slug" params={{ slug: tool.slug }}>{tool.name}</Link>
                    </li>
                  ))}
                </ul>
                <Link to="/ai-tools" search={{ pillar }} className={buttonClass("ghost", "sm", "mt-auto self-start px-0")}>
                  Explore {pillar} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

export function WorkflowStories({ tools }: { tools: Tool[] }) {
  const toolMap = new Map(tools.map((tool) => [tool.slug, tool]));
  return (
    <Section className="studio-section workflow-stories">
      <Container size="wide">
        <SectionHeading
          eyebrow="How the workspace works"
          title="Bring the goal. AmmarAI organizes the work."
          intro="Each product has a focused job, but the workflow stays simple: give it useful context, let the right tool do its part, then review a practical result."
          scale="large"
          className="studio-heading-wide"
        />
        <div className="workflow-story-grid mt-12">
          {flagshipWorkflows.map((workflow, index) => {
            const tool = toolMap.get(workflow.slug);
            if (!tool) return null;
            return (
              <article key={workflow.slug} className="workflow-story interactive-card-edge" data-interactive-card="true">
                <div className="workflow-story-head">
                  <span className="ecosystem-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="eyebrow">{tool.category}</span>
                </div>
                <h3>{tool.name}</h3>
                <dl>
                  <div><dt>Bring</dt><dd>{workflow.bring}</dd></div>
                  <div><dt>AmmarAI</dt><dd>{workflow.process}</dd></div>
                  <div><dt>Get</dt><dd>{workflow.get}</dd></div>
                </dl>
                <Link to="/$slug" params={{ slug: tool.slug }} className="workflow-story-link">
                  Explore {tool.name} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}