import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const SETTINGS_ID = "babylovegrowth";

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

export const Route = createFileRoute("/api/public/cron/babylovegrowth")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const token = bearer(request);
        const { verifyCronToken, createCronDb } = await import("@/lib/cron-db.server");

        // Either the platform cron secret or the database-held trigger token.
        const platformResponse = await authenticateCronRequest(request);
        const tokenOk = token ? await verifyCronToken(SETTINGS_ID, token) : false;
        if (platformResponse && !tokenOk) return platformResponse;

        try {
          const db = createCronDb(SETTINGS_ID, token ?? "");

          // Honour the admin-chosen interval: skip if the last run is still fresh.
          const { intervalHours, lastRunAt } = await db.getSettings();
          if (shouldSkip(lastRunAt, intervalHours)) {
            await db.logRun("skipped", `Interval ${intervalHours}h not elapsed`);
            return Response.json({ ok: true, skipped: true, intervalHours });
          }

          const { syncArticles } = await import("@/lib/babylovegrowth.server");
          const result = await syncArticles(db);

          await db.markRun();
          await db.logRun(
            "success",
            `Synced ${result.upserted} of ${result.fetched}${
              result.errors.length ? ` · ${result.errors.length} failed` : ""
            }`,
          );

          return Response.json({ ok: true, skipped: false, ...result });
        } catch (error) {
          console.error("[babylovegrowth] sync failed", error);
          const message = error instanceof Error ? error.message : "Sync failed";
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
