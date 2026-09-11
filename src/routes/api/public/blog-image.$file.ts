import { createFileRoute } from "@tanstack/react-router";

/** Serves generated blog illustrations over a stable public URL. */
export const Route = createFileRoute("/api/public/blog-image/$file")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      GET: async ({ params }) => {
        const file = String((params as { file?: string }).file ?? "");
        if (!/^[a-z0-9._-]+$/i.test(file)) return new Response("Not found", { status: 404 });

        const headers = {
          "Cache-Control": "public, max-age=31536000, immutable",
        };

        // Newer images live in the database (works without the service-role key).
        try {
          const { createPublicClient } = await import("@/lib/cron-db.server");
          const { data } = await createPublicClient()
            .from("blog_images")
            .select("content_type, data")
            .eq("name", file)
            .maybeSingle();
          const row = data as { content_type: string; data: string } | null;
          if (row) {
            const binary = atob(row.data);
            const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
            return new Response(bytes, {
              headers: { ...headers, "Content-Type": row.content_type || "image/png" },
            });
          }
        } catch (error) {
          console.error("[blog-image] database lookup failed", error);
        }

        // Older images still live in private storage (Lovable-hosted only).
        try {
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { data, error } = await supabaseAdmin.storage.from("blog-images").download(file);
          if (error || !data) return new Response("Not found", { status: 404 });
          return new Response(await data.arrayBuffer(), {
            headers: { ...headers, "Content-Type": data.type || "image/png" },
          });
        } catch {
          return new Response("Not found", { status: 404 });
        }
      },
    },
  },
});
