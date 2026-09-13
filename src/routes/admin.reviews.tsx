import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle2, Download, FileUp, Search, ShieldCheck, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { ActionButton } from "@/components/site/Button";
import { defaultReviewSettings, type CustomerReview } from "@/lib/reviews";

export const Route = createFileRoute("/admin/reviews")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Customer reviews | AmmarAI Studio" },
      { name: "description", content: "Moderate and publish genuine AmmarAI customer reviews." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Customer reviews | AmmarAI Studio" },
      { property: "og:description", content: "Moderate and publish genuine AmmarAI customer reviews." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminReviews,
});

type ImportRow = {
  reviewer_name: string;
  review_title: string;
  review_text: string;
  rating: number;
  review_date: string;
  source: string;
  source_url: string | null;
  status: "approved" | "pending" | "rejected";
  featured: boolean;
  verified: boolean;
  display_order: number;
  error?: string;
};

const PAGE_SIZES = [10, 20, 50] as const;
const fieldClass = "rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground";

function parseCsvLine(line: string) {
  const values: string[] = [];
  let value = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const character = line[index];
    if (character === '"' && quoted && line[index + 1] === '"') { value += '"'; index += 1; }
    else if (character === '"') quoted = !quoted;
    else if (character === "," && !quoted) { values.push(value.trim()); value = ""; }
    else value += character;
  }
  values.push(value.trim());
  return values;
}

function parseCsv(text: string): ImportRow[] {
  const lines = text.replace(/\r/g, "").split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headerLine = lines[0];
  if (!headerLine) return [];
  const headers = parseCsvLine(headerLine).map((header) => header.toLowerCase());
  return lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    const raw = Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""]));
    const rating = Number(raw["rating"] ?? "");
    const rawStatus = raw["status"] ?? "";
    const status = ["approved", "pending", "rejected"].includes(rawStatus) ? rawStatus as ImportRow["status"] : "approved";
    const row: ImportRow = {
      reviewer_name: raw["reviewer_name"] ?? "",
      review_title: raw["review_title"] ?? "",
      review_text: raw["review_text"] ?? "",
      rating,
      review_date: raw["review_date"] ?? "",
      source: raw["source"] || "Imported review",
      source_url: raw["source_url"] || null,
      status,
      featured: raw["featured"]?.toLowerCase() === "true",
      verified: raw["verified"]?.toLowerCase() === "true",
      display_order: Number(raw["display_order"] || 0),
    };
    if (!row.reviewer_name || !row.review_title || row.review_text.length < 20) row.error = "Missing name, title, or a review of at least 20 characters.";
    else if (!Number.isInteger(rating) || rating < 1 || rating > 5) row.error = "Rating must be a whole number from 1 to 5.";
    else if (!/^\d{4}-\d{2}-\d{2}$/.test(row.review_date)) row.error = "Date must use YYYY-MM-DD.";
    return row;
  });
}

function AdminReviews() {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<"submissions" | "published" | "settings" | "import">("submissions");
  const [query, setQuery] = useState("");
  const [rating, setRating] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [notice, setNotice] = useState<string | null>(null);
  const [importRows, setImportRows] = useState<ImportRow[]>([]);

  const { data: submissions = [] } = useQuery({
    queryKey: ["review-submissions"], enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("review_submissions").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const { data: reviews = [] } = useQuery({
    queryKey: ["customer-reviews", "admin"], enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("customer_reviews").select("*").order("review_date", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
  const { data: settings = defaultReviewSettings } = useQuery({
    queryKey: ["review-settings", "admin"], enabled: isAdmin,
    queryFn: async () => {
      const { data, error } = await supabase.from("review_settings").select("*").eq("id", "homepage").maybeSingle();
      if (error) throw error;
      return data ?? defaultReviewSettings;
    },
  });

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["review-submissions"] });
    void queryClient.invalidateQueries({ queryKey: ["customer-reviews"] });
    void queryClient.invalidateQueries({ queryKey: ["review-settings"] });
  };

  const moderate = useMutation({
    mutationFn: async ({ id, status, verified = false }: { id: string; status: "approved" | "rejected"; verified?: boolean }) => {
      const { error } = await supabase.rpc("admin_moderate_review", { _submission_id: id, _status: status, _verified: verified, _featured: false });
      if (error) throw error;
    },
    onSuccess: () => { setNotice("Review status updated."); invalidate(); },
    onError: (error: Error) => setNotice(error.message),
  });

  const updateReview = useMutation({
    mutationFn: async ({ id, values }: { id: string; values: Partial<CustomerReview> }) => {
      const { error } = await supabase.from("customer_reviews").update(values).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { setNotice("Published review updated."); invalidate(); },
    onError: (error: Error) => setNotice(error.message),
  });

  const filtered = useMemo(() => {
    const list = tab === "submissions" ? submissions : reviews;
    const search = query.trim().toLowerCase();
    return list.filter((item) => (!rating || item.rating === rating) && (!search || item.reviewer_name.toLowerCase().includes(search) || item.review_title.toLowerCase().includes(search) || item.review_text.toLowerCase().includes(search)));
  }, [query, rating, reviews, submissions, tab]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, pages);
  const visible = filtered.slice((current - 1) * pageSize, current * pageSize);

  async function saveSettings(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("review_settings").upsert({
      id: "homepage",
      display_count: Number(form.get("display_count")), min_rating: Number(form.get("min_rating")),
      date_from: String(form.get("date_from") || "") || null, date_to: String(form.get("date_to") || "") || null,
      sort_order: String(form.get("sort_order")), featured_first: form.get("featured_first") === "on",
    });
    setNotice(error ? error.message : "Homepage review settings saved.");
    if (!error) invalidate();
  }

  async function addManualReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const { error } = await supabase.from("customer_reviews").insert({
      reviewer_name: String(form.get("reviewer_name")), review_title: String(form.get("review_title")), review_text: String(form.get("review_text")),
      rating: Number(form.get("rating")), review_date: String(form.get("review_date")), source: String(form.get("source") || "Direct customer"),
      source_url: String(form.get("source_url") || "") || null, verified: form.get("verified") === "on", featured: form.get("featured") === "on", status: "approved",
    });
    setNotice(error ? error.message : "Genuine review added.");
    if (!error) { event.currentTarget.reset(); invalidate(); }
  }

  async function importValidRows() {
    const valid = importRows.filter((row) => !row.error).map(({ error: _error, ...row }) => row);
    if (!valid.length) return;
    const { error } = await supabase.from("customer_reviews").insert(valid);
    setNotice(error ? error.code === "23505" ? "Import stopped because one or more reviews already exist." : error.message : `${valid.length} genuine reviews imported.`);
    if (!error) { setImportRows([]); invalidate(); }
  }

  function downloadTemplate() {
    const headers = "reviewer_name,review_title,review_text,rating,review_date,source,source_url,status,featured,verified,display_order\n";
    const url = URL.createObjectURL(new Blob([headers], { type: "text/csv" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "ammarai-review-import.csv"; anchor.click(); URL.revokeObjectURL(url);
  }

  if (!isAdmin) return <p className="text-sm text-muted-foreground">Only admins can manage customer reviews.</p>;

  return (
    <div className="space-y-6">
      <div><h2 className="text-xl font-semibold">Customer reviews</h2><p className="mt-1 text-sm text-muted-foreground">Moderate genuine submissions, import existing feedback, and control the homepage display.</p></div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Review management">
        {(["submissions", "published", "settings", "import"] as const).map((value) => <ActionButton key={value} type="button" size="sm" variant={tab === value ? "ink" : "outline"} onClick={() => { setTab(value); setPage(1); }}>{value.charAt(0).toUpperCase() + value.slice(1)}</ActionButton>)}
      </div>
      {notice ? <p role="status" className="rounded-md bg-muted px-4 py-3 text-sm text-muted-foreground">{notice}</p> : null}

      {tab === "settings" ? (
        <form onSubmit={saveSettings} className="grid max-w-3xl gap-4 rounded-xl bg-card p-6 ring-1 ring-border sm:grid-cols-2">
          <label className="text-sm font-semibold">Reviews shown<input className={`${fieldClass} mt-1 w-full`} name="display_count" type="number" min="1" max="24" defaultValue={settings.display_count} required /></label>
          <label className="text-sm font-semibold">Minimum rating<select className={`${fieldClass} mt-1 w-full`} name="min_rating" defaultValue={settings.min_rating}>{[1,2,3,4,5].map((value) => <option key={value} value={value}>{value}+ stars</option>)}</select></label>
          <label className="text-sm font-semibold">From date<input className={`${fieldClass} mt-1 w-full`} name="date_from" type="date" defaultValue={settings.date_from ?? ""} /></label>
          <label className="text-sm font-semibold">To date<input className={`${fieldClass} mt-1 w-full`} name="date_to" type="date" defaultValue={settings.date_to ?? ""} /></label>
          <label className="text-sm font-semibold">Order<select className={`${fieldClass} mt-1 w-full`} name="sort_order" defaultValue={settings.sort_order}><option value="newest">Newest</option><option value="oldest">Oldest</option><option value="highest">Highest rated</option><option value="manual">Manual order</option></select></label>
          <label className="flex items-center gap-2 self-end py-2 text-sm font-semibold"><input type="checkbox" name="featured_first" defaultChecked={settings.featured_first} />Show featured reviews first</label>
          <ActionButton type="submit" className="sm:col-span-2 sm:justify-self-start">Save homepage settings</ActionButton>
        </form>
      ) : tab === "import" ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3"><ActionButton type="button" variant="outline" onClick={downloadTemplate}><Download className="size-4" />Download CSV template</ActionButton><label className="inline-flex cursor-pointer items-center gap-2 rounded-md bg-ink px-5 py-3 text-sm font-semibold text-ink-foreground"><FileUp className="size-4" />Choose CSV<input type="file" accept=".csv,text/csv" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (!file) return; const reader = new FileReader(); reader.onload = () => setImportRows(parseCsv(String(reader.result ?? ""))); reader.readAsText(file); }} /></label></div>
          {importRows.length ? <><p className="text-sm text-muted-foreground">Preview: {importRows.filter((row) => !row.error).length} valid · {importRows.filter((row) => row.error).length} need attention</p><div className="max-h-96 overflow-auto rounded-xl ring-1 ring-border"><table className="w-full text-left text-xs"><thead className="bg-muted"><tr><th className="p-3">Reviewer</th><th className="p-3">Rating</th><th className="p-3">Date</th><th className="p-3">Result</th></tr></thead><tbody>{importRows.map((row, index) => <tr key={`${row.reviewer_name}-${index}`} className="border-t border-border"><td className="p-3"><strong>{row.reviewer_name}</strong><span className="block text-muted-foreground">{row.review_title}</span></td><td className="p-3">{row.rating}</td><td className="p-3">{row.review_date}</td><td className="p-3 text-muted-foreground">{row.error ?? "Ready"}</td></tr>)}</tbody></table></div><ActionButton type="button" disabled={!importRows.some((row) => !row.error)} onClick={importValidRows}>Import valid reviews</ActionButton></> : null}
          <form onSubmit={addManualReview} className="grid max-w-3xl gap-4 border-t border-border pt-6 sm:grid-cols-2"><h3 className="text-lg font-semibold sm:col-span-2">Add one genuine review</h3><label className="text-sm font-semibold">Reviewer<input className={`${fieldClass} mt-1 w-full`} name="reviewer_name" required minLength={2} /></label><label className="text-sm font-semibold">Title<input className={`${fieldClass} mt-1 w-full`} name="review_title" required minLength={3} /></label><label className="text-sm font-semibold">Rating<select className={`${fieldClass} mt-1 w-full`} name="rating" defaultValue="5">{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></label><label className="text-sm font-semibold">Review date<input className={`${fieldClass} mt-1 w-full`} name="review_date" type="date" max={new Date().toISOString().slice(0,10)} required /></label><label className="text-sm font-semibold">Source<input className={`${fieldClass} mt-1 w-full`} name="source" defaultValue="Direct customer" /></label><label className="text-sm font-semibold">Source URL/reference<input className={`${fieldClass} mt-1 w-full`} name="source_url" /></label><label className="text-sm font-semibold sm:col-span-2">Review<textarea className={`${fieldClass} mt-1 min-h-28 w-full`} name="review_text" minLength={20} required /></label><div className="flex gap-5 text-sm sm:col-span-2"><label className="flex items-center gap-2"><input type="checkbox" name="verified" />Verified</label><label className="flex items-center gap-2"><input type="checkbox" name="featured" />Featured</label></div><ActionButton type="submit" className="sm:col-span-2 sm:justify-self-start">Add review</ActionButton></form>
        </div>
      ) : (
        <>
          <div className="flex flex-wrap gap-3"><label className="relative min-w-56 flex-1"><Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" /><input className={`${fieldClass} w-full pl-9`} value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="Search reviews" /></label><select className={fieldClass} value={rating} onChange={(event) => { setRating(Number(event.target.value)); setPage(1); }}><option value="0">All ratings</option>{[5,4,3,2,1].map((value) => <option key={value} value={value}>{value} stars</option>)}</select></div>
          {visible.length === 0 ? <p className="text-sm text-muted-foreground">No reviews match these filters.</p> : tab === "submissions" ? <ul className="space-y-3">{submissions.filter((item) => visible.some((row) => row.id === item.id)).map((item) => <li key={item.id} className="rounded-xl bg-card p-5 ring-1 ring-border"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong>{item.reviewer_name}</strong><span className="inline-flex items-center gap-1 text-xs text-accent"><Star className="size-3" fill="currentColor" />{item.rating}</span><span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{item.status}</span></div><h3 className="mt-2 text-base font-semibold">{item.review_title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{item.review_text}</p><p className="mt-3 text-xs text-muted-foreground">{item.review_date} · {item.email}</p></div><div className="flex flex-wrap gap-2"><ActionButton size="sm" type="button" onClick={() => moderate.mutate({ id: item.id, status: "approved", verified: true })}><CheckCircle2 className="size-4" />Approve verified</ActionButton><ActionButton size="sm" variant="outline" type="button" onClick={() => moderate.mutate({ id: item.id, status: "approved" })}>Approve</ActionButton><ActionButton size="sm" variant="ghost" type="button" onClick={() => moderate.mutate({ id: item.id, status: "rejected" })}>Reject</ActionButton></div></div></li>)}</ul> : <ul className="space-y-3">{reviews.filter((item) => visible.some((row) => row.id === item.id)).map((item) => <li key={item.id} className="rounded-xl bg-card p-5 ring-1 ring-border"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong>{item.reviewer_name}</strong><span className="inline-flex items-center gap-1 text-xs text-accent"><Star className="size-3" fill="currentColor" />{item.rating}</span><span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">{item.status}</span>{item.verified ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-success"><ShieldCheck className="size-4" />Verified</span> : null}</div><h3 className="mt-2 text-base font-semibold">{item.review_title}</h3><p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">{item.review_text}</p><p className="mt-3 text-xs text-muted-foreground">{item.review_date} · {item.source}</p></div><div className="flex flex-wrap gap-2"><ActionButton size="sm" variant="outline" type="button" onClick={() => updateReview.mutate({ id: item.id, values: { featured: !item.featured } })}>{item.featured ? "Unfeature" : "Feature"}</ActionButton><ActionButton size="sm" variant="outline" type="button" onClick={() => updateReview.mutate({ id: item.id, values: { verified: !item.verified } })}>{item.verified ? "Remove verification" : "Mark verified"}</ActionButton><ActionButton size="sm" variant="ghost" type="button" onClick={() => updateReview.mutate({ id: item.id, values: { status: item.status === "approved" ? "rejected" : "approved" } })}>{item.status === "approved" ? "Unpublish" : "Publish"}</ActionButton></div></div></li>)}</ul>}
          {filtered.length ? <div className="flex flex-wrap items-center justify-between gap-3 text-xs"><label className="text-muted-foreground">Per page <select className={`${fieldClass} ml-2 py-1.5`} value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1); }}>{PAGE_SIZES.map((value) => <option key={value} value={value}>{value}</option>)}</select></label><div className="flex items-center gap-3"><ActionButton size="sm" variant="outline" disabled={current === 1} onClick={() => setPage((value) => value - 1)}>Previous</ActionButton><span>Page {current} of {pages}</span><ActionButton size="sm" variant="outline" disabled={current === pages} onClick={() => setPage((value) => value + 1)}>Next</ActionButton></div></div> : null}
        </>
      )}
    </div>
  );
}
