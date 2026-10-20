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