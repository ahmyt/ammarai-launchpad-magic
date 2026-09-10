import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/ai-text-to-video")({
  beforeLoad: () => {
    throw redirect({ to: "/$slug", params: { slug: "ai-video-generator" }, statusCode: 301 });
  },
});
