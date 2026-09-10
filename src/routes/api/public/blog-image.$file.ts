import { createFileRoute } from "@tanstack/react-router";

/** Serves generated blog illustrations from private storage over a stable public URL. */
export const Route = createFileRoute("/api/public/blog-image/$file")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ params }) => {
        const file = String((params as { file?: string }).file ?? "");
        if (!/^[a-z0-9._-]+$/i.test(file)) return new Response("Not found", { status: 404 });

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data, error } = await supabaseAdmin.storage.from("blog-images").download(file);
        if (error || !data) return new Response("Not found", { status: 404 });

        return new Response(await data.arrayBuffer(), {
          headers: {
            "Content-Type": data.type || "image/png",
            "Cache-Control": "public, max-age=31536000, immutable",
          },
        });
      },
    },
  },
});
