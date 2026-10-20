import { describe, expect, test } from "bun:test";
import { videoTools } from "./tools-video";
import { suggestTools, toolSummaryBySlug } from "./tools-lite";
import { tutorialsByTool } from "./tutorials";
import { intentUseCases } from "./intent-use-cases";
import { allToolWorkflows } from "./ecosystem";

describe("AI Video Agent discovery", () => {
  test("has its own video catalogue record and generated summary", () => {
    expect(videoTools.filter((tool) => tool.slug === "ai-video-agent")).toHaveLength(1);
    expect(toolSummaryBySlug.get("ai-video-agent")?.category).toBe("AI Video");
  });
  test("is discoverable for presenter and video agent searches", () => {
    for (const query of ["video agent", "presenter video", "storyboard"]) {
      expect(suggestTools(query).map((tool) => tool.slug)).toContain("ai-video-agent");
    }
  });
  test("links to its existing verified tutorial", () => {
    expect(tutorialsByTool.get("ai-video-agent")?.map((tutorial) => tutorial.slug)).toEqual([
      "how-to-create-a-video-with-the-video-agent",
    ]);
  });
  test("is included in the three relevant video use cases", () => {
    for (const slug of ["ai-marketing-video-maker", "ai-product-demo-video-maker", "ai-social-media-video-maker"]) {
      expect(intentUseCases.find((item) => item.slug === slug)?.toolkit.map((tool) => tool.slug)).toContain("ai-video-agent");
    }
    expect(allToolWorkflows.find((item) => item.slug === "ai-video-agent")?.useCaseSlugs).toHaveLength(3);
  });
});
import { featuredTools } from "./tools-lite";
import { pillarForTool } from "./ecosystem";
import { plans } from "../lib/site";
describe("AI Video Agent flagship placement", () => {
  test("is the 11th flagship, right after AI Phone Agent", () => {
    const slugs = featuredTools.map((t) => t.slug);
    expect(slugs).toHaveLength(11);
    expect(slugs.indexOf("ai-video-agent")).toBe(slugs.indexOf("ai-phone-agent") + 1);
  });
  test("sits in the Automate pillar", () => {
    expect(pillarForTool(toolSummaryBySlug.get("ai-video-agent"))).toBe("Automate");
  });
  test("is listed in Basic plan features", () => {
    const basic = plans.find((p) => p.name === "Basic");
    expect(basic.newInPlan.map((i) => i.title)).toContain("AI Video Agent");
  });
});
