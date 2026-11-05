import { createFileRoute, redirect } from "@tanstack/react-router";

// The website chatbot now lives on the combined Website Chatbot & Smart Inbox page.
export const Route = createFileRoute("/external-chatbot")({
  staticData: { sitemap: false },
  beforeLoad: () => {
    throw redirect({ to: "/ai-smart-inbox", statusCode: 301 });
  },
});
