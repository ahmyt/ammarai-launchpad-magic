import { describe, expect, test } from "bun:test";
import { BLOG_TOPICS, TYPE_ROTATION, bucketOf, selectQueuedTopic } from "./blog-topics";

describe("Restaurant blog queue", () => {
  test("prioritizes restaurant answering in a commercial slot", () => {
    expect(selectQueuedTopic([])?.id).toBe("restaurant-answering-service");
  });
  test("selects the restaurant informational brief instead of skipping guides", () => {
    expect(selectQueuedTopic(["daily:topic:restaurant-answering-service"])?.id).toBe("ai-phone-answering-for-restaurants");
  });
  test("selects the restaurant ordering walkthrough in a use-case slot", () => {
    expect(selectQueuedTopic(Array.from({ length: 5 }, (_, i) => `daily:old-tool-${i}`))?.id).toBe("ai-restaurant-phone-ordering-workflow");
  });
  test("does not repeat completed restaurant topics", () => {
    const published = ["daily:topic:restaurant-answering-service", ...Array.from({ length: 19 }, (_, i) => `daily:old-tool-${i}`)];
    expect(selectQueuedTopic(published)?.id).toBe("best-ai-video-generators");
  });
  test("preserves the 20-slot content mix", () => {
    expect(TYPE_ROTATION.filter((slot) => slot === "informational").length).toBe(6);
    expect(TYPE_ROTATION.filter((slot) => slot === "best-of").length).toBe(6);
    expect(TYPE_ROTATION.filter((slot) => slot === "versus").length).toBe(5);
    expect(TYPE_ROTATION.filter((slot) => slot === "use-case").length).toBe(3);
    expect(bucketOf(BLOG_TOPICS[0])).toBe("best-of");
  });
});