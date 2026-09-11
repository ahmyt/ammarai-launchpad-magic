// Server-only: database access for the scheduled jobs (article sync + daily blog)
// WITHOUT the service-role key, so the automation can run on self-hosted
// deployments (Plesk) that only have the public Supabase keys.
//
// Every write goes through a token-checked SECURITY DEFINER function: the cron
// trigger token is verified inside the database before anything is written.
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function publicFetch(key: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((v, k) => headers.set(k, v));
    if (isNewSupabaseApiKey(key) && headers.get("Authorization") === `Bearer ${key}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", key);
    return fetch(input, { ...init, headers });
  };
}

export function createPublicClient(): SupabaseClient<Database> {
  const url = process.env["SUPABASE_URL"] ?? process.env["VITE_SUPABASE_URL"];
  const key =
    process.env["SUPABASE_PUBLISHABLE_KEY"] ?? process.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    throw new Error(
      "Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY.",
    );
  }
  return createClient<Database>(url, key, {
    global: { fetch: publicFetch(key) },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export interface ArticleWriter {
  /** Saves or updates an article. Returns an error message when it fails. */
  upsertArticle(row: Record<string, unknown>): Promise<{ error: string | null }>;
  /** Stores a generated illustration; returns the public path to serve it from. */
  storeImage(name: string, contentType: string, bytes: Uint8Array): Promise<string | null>;
}

export interface CronDb extends ArticleWriter {
  /** Read client for plain public queries. */
  client: SupabaseClient<Database>;
  getSettings(): Promise<{ intervalHours: number; lastRunAt: string | null }>;
  markRun(): Promise<void>;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

type Rpc = (fn: string, args: Record<string, unknown>) => Promise<{
  data: unknown;
  error: { message: string } | null;
}>;

/** Verifies a cron trigger token against the database. */
export async function verifyCronToken(id: string, token: string): Promise<boolean> {
  try {
    const client = createPublicClient();
    const { data, error } = await (client.rpc.bind(client) as unknown as Rpc)("cron_verify_token", {
      _id: id,
      _token: token,
    });
    return !error && data === true;
  } catch {
    return false;
  }
}

/** Database access for a scheduled job, authorised by its trigger token. */
export function createCronDb(id: string, token: string): CronDb {
  const client = createPublicClient();
  const rpc = client.rpc.bind(client) as unknown as Rpc;

  return {
    client,
    async getSettings() {
      const { data, error } = await rpc("cron_get_settings", { _id: id, _token: token });
      if (error) throw new Error(error.message);
      const row = (Array.isArray(data) ? data[0] : data) as
        | { interval_hours: number; last_run_at: string | null }
        | undefined;
      return { intervalHours: row?.interval_hours ?? 24, lastRunAt: row?.last_run_at ?? null };
    },
    async markRun() {
      const { error } = await rpc("cron_mark_run", { _id: id, _token: token });
      if (error) throw new Error(error.message);
    },
    async upsertArticle(row) {
      const { error } = await rpc("cron_upsert_article", { _id: id, _token: token, _row: row });
      return { error: error ? error.message : null };
    },
    async storeImage(name, contentType, bytes) {
      const { error } = await rpc("cron_store_blog_image", {
        _id: id,
        _token: token,
        _name: name,
        _content_type: contentType,
        _data: toBase64(bytes),
      });
      if (error) {
        console.error(`[cron] image store failed: ${error.message}`);
        return null;
      }
      return `/api/public/blog-image/${name}`;
    },
  };
}

/** Wraps a normal Supabase client (admin or signed-in admin) as an article writer. */
export function writerFromClient(supabase: SupabaseClient<Database>): ArticleWriter {
  return {
    async upsertArticle(row) {
      const { error } = await supabase
        .from("syndicated_articles")
        .upsert(row as never, { onConflict: "slug" });
      return { error: error ? error.message : null };
    },
    async storeImage(name, contentType, bytes) {
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(name, bytes, { contentType, upsert: true });
      if (error) {
        console.error(`[daily-blog] image upload failed: ${error.message}`);
        return null;
      }
      return `/api/public/blog-image/${name}`;
    },
  };
}
