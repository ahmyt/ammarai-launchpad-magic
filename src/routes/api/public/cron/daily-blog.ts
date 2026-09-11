import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const SETTINGS_ID = "daily-blog";

function bearer(request: Request): string | null {
  const match = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  return match?.[1] ?? null;
}

export const Route = createFileRoute("/api/public/cron/daily-blog")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = bearer(request);
        const { verifyCronToken, createCronDb } = await import("@/lib/cron-db.server");

        const platformResponse = await authenticateCronRequest(request);
        const tokenOk = token ? await verifyCronToken(SETTINGS_ID, token) : false;
        if (platformResponse && !tokenOk) return platformResponse;

        try {
          const db = createCronDb(SETTINGS_ID, token ?? "");

          const { intervalHours, lastRunAt } = await db.getSettings();
          if (lastRunAt) {
            const nextDue = new Date(lastRunAt).getTime() + intervalHours * 3_600_000;
            if (Date.now() < nextDue) {
              return Response.json({ ok: true, skipped: true, intervalHours });
            }
          }

          const { writeDailyPost } = await import("@/lib/daily-blog.server");
          const result = await writeDailyPost(db.client, db);

          await db.markRun();

          return Response.json({ ok: true, skipped: false, ...result });
        } catch (error) {
          console.error("[daily-blog] generation failed", error);
          return Response.json(
            { ok: false, error: error instanceof Error ? error.message : "Generation failed" },
            { status: 500 },
          );
        }
      },
    },
  },
});
