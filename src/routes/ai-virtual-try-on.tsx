import { createFileRoute, redirect } from "@tanstack/react-router";

// Keep catalogue links and existing bookmarks working at the original tool URL.
export const Route = createFileRoute("/ai-virtual-try-on")({
  beforeLoad: () => {
    throw redirect({ to: "/ai-fashion-studio", statusCode: 301 });
  },
});