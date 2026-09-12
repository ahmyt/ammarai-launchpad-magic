import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const SETTINGS_ID = "daily-blog";

function bearer(request: Request): string | null {
  const match = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  return match?.[1] ?? null;
}

/** Runs due or not, without clock drift: daily+ intervals compare UTC calendar days. */
function shouldSkip(lastRunAt: string | null, intervalHours: number): boolean {
  if (!lastRunAt) return false;
  if (intervalHours >= 24) {
    return new Date(lastRunAt).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10);
  }
  return Date.now() < new Date(lastRunAt).getTime() + intervalHours * 3_600_000;
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
          if (shouldSkip(lastRunAt, intervalHours)) {
            const logWarning = await db.logRun("skipped", `Interval ${intervalHours}h not elapsed`);
            return Response.json({ ok: true, skipped: true, intervalHours, logWarning });
          }

          const { writeDailyPost } = await import("@/lib/daily-blog.server");
          const result = await writeDailyPost(db.client, db);

          await db.markRun();
          const logWarning = await db.logRun("success", `Published "${result.title}" (${result.slug})`);

          return Response.json({ ok: true, skipped: false, logWarning, ...result });
        } catch (error) {
          console.error("[daily-blog] generation failed", error);
          const message = error instanceof Error ? error.message : "Generation failed";
          try {
            await createCronDb(SETTINGS_ID, token ?? "").logRun("error", message);
          } catch {
            /* logging is best-effort */
          }
          return Response.json({ ok: false, error: message }, { status: 500 });
        }
      },
    },
  },
});
