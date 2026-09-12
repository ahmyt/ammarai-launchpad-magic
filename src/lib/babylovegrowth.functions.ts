import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SETTINGS_ID = "babylovegrowth";

type AdminContext = {
  supabase: {
    rpc: (
      fn: string,
      args: Record<string, unknown>,
    ) => Promise<{ data: unknown; error: { message: string } | null }>;
    from: (table: string) => unknown;
  };
  userId: string;
};

async function requireAdmin(context: AdminContext) {
  const { data: isAdmin } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (!isAdmin) throw new Error("Forbidden");
  return context.supabase;
}

export const syncBabyLoveGrowthArticles = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const { syncArticles } = await import("@/lib/babylovegrowth.server");
    const result = await syncArticles(supabase);
    await supabase.rpc("admin_mark_sync_run", {
      _id: SETTINGS_ID,
      _status: "success",
      _message: `Synced ${result.upserted} of ${result.fetched}${
        result.errors.length ? ` · ${result.errors.length} failed` : ""
      }`,
    });
    return result;
  });

/** Writes today's AI blog post about one of our tools. */
export const writeDailyBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const { writeDailyPost } = await import("@/lib/daily-blog.server");
    const result = await writeDailyPost(supabase);
    await supabase.rpc("admin_mark_sync_run", {
      _id: "daily-blog",
      _status: "success",
      _message: `Published "${result.title}" (${result.slug})`,
    });
    return result;
  });

/** Recent automation runs for the Studio articles page. */
export const getSyncRunLog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const query = supabase.from("blog_sync_runs") as {
      select: (cols: string) => {
        order: (
          col: string,
          opts: { ascending: boolean },
        ) => {
          limit: (
            n: number,
          ) => Promise<{
            data: { job_id: string; status: string; message: string | null; source: string; created_at: string }[] | null;
            error: { message: string } | null;
          }>;
        };
      };
    };
    const { data, error } = await query
      .select("job_id, status, message, source, created_at")
      .order("created_at", { ascending: false })
      .limit(8);
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const getSyncSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const query = supabase.from("sync_settings") as {
      select: (cols: string) => Promise<{
        data: { id: string; interval_hours: number; last_run_at: string | null }[] | null;
        error: { message: string } | null;
      }>;
    };
    const { data, error } = await query.select("id, interval_hours, last_run_at, run_time_utc");
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    const sync = rows.find((r) => r.id === SETTINGS_ID);
    const daily = rows.find((r) => r.id === "daily-blog");
    return {
      intervalHours: sync?.interval_hours ?? 24,
      lastRunAt: sync?.last_run_at ?? null,
      dailyLastRunAt: daily?.last_run_at ?? null,
    };
  });

export const setSyncInterval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data) =>
    z.object({ intervalHours: z.number().int().min(1).max(720) }).parse(data),
  )
  .handler(async ({ context, data }) => {
    const supabase = await requireAdmin(context as unknown as AdminContext);
    const table = supabase.from("sync_settings") as {
      update: (row: Record<string, unknown>) => {
        eq: (col: string, val: string) => Promise<{ error: { message: string } | null }>;
      };
    };
    const { error } = await table
      .update({ interval_hours: data.intervalHours, updated_at: new Date().toISOString() })
      .eq("id", SETTINGS_ID);
    if (error) throw new Error(error.message);
    return { intervalHours: data.intervalHours };
  });
