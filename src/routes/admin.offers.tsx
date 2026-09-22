import { useMemo, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Percent, RotateCcw, Save, Trash2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ActionButton } from "@/components/site/Button";
import {
  deleteOffer,
  listOffers,
  resetOfferCount,
  saveOffer,
  type OfferDraft,
  type OfferRow,
} from "@/lib/offers-admin.functions";

export const Route = createFileRoute("/admin/offers")({
  staticData: { sitemap: false },
  head: () => ({
    meta: [
      { title: "Discount campaigns | AmmarAI Studio" },
      { name: "description", content: "Create and schedule AmmarAI discount campaigns." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Discount campaigns | AmmarAI Studio" },
      { property: "og:description", content: "Create and schedule AmmarAI discount campaigns." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminOffers,
});

const fieldClass =
  "rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground";

const emptyDraft: OfferDraft = {
  slug: "",
  label: "",
  headline: "",
  discountLabel: "",
  terms: "",
  code: "",
  useType: "multi_use",
  maxUses: null,
  startsAt: null,
  expiresAt: null,
  isActive: false,
};

const pad = (value: number) => String(value).padStart(2, "0");

const toLocalInput = (iso: string | null): string => {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`;
};

const fromLocalInput = (value: string): string | null => {
  if (!value.trim()) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
};

const formatMoment = (iso: string | null): string => {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

function AdminOffers() {
  const { session, loading, isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const fetchOffers = useServerFn(listOffers);
  const writeOffer = useServerFn(saveOffer);
  const clearCount = useServerFn(resetOfferCount);
  const removeOffer = useServerFn(deleteOffer);

  const [draft, setDraft] = useState<OfferDraft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const { data: offers = [], isLoading } = useQuery({
    queryKey: ["admin-offers"],
    enabled: isAdmin,
    queryFn: () => fetchOffers(),
  });

  const active = useMemo(() => offers.find((offer) => offer.isActive), [offers]);

  const invalidate = () => {
    void queryClient.invalidateQueries({ queryKey: ["admin-offers"] });
    void queryClient.invalidateQueries({ queryKey: ["active-offer"] });
  };

  const save = useMutation({
    mutationFn: (next: OfferDraft) => writeOffer({ data: { draft: next } }),
    onSuccess: (row) => {
      invalidate();
      setNotice(`Saved "${row.slug}".`);
      setEditingId(row.id);
      setDraft(toDraft(row));
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const reset = useMutation({
    mutationFn: (id: string) => clearCount({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setNotice("Used count reset to zero.");
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const remove = useMutation({
    mutationFn: (id: string) => removeOffer({ data: { id } }),
    onSuccess: () => {
      invalidate();
      setNotice("Campaign deleted.");
    },
    onError: (error: Error) => setNotice(error.message),
  });

  const startNew = () => {
    setDraft(emptyDraft);
    setEditingId(null);
    setNotice(null);
  };

  const edit = (offer: OfferRow) => {
    setDraft(toDraft(offer));
    setEditingId(offer.id);
    setNotice(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleActive = (offer: OfferRow) => {
    save.mutate({ ...toDraft(offer), isActive: !offer.isActive });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    save.mutate(draft);
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-card p-6 ring-1 ring-border text-sm text-muted-foreground">
        Loading…
      </div>
    );
  }

  if (!session) {
    return (
      <div className="rounded-xl bg-card p-6 ring-1 ring-border text-sm text-muted-foreground">
        Sign in to manage campaigns.
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="rounded-xl bg-card p-6 ring-1 ring-border text-sm text-muted-foreground">
        Discount campaigns are open to administrators only.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-card p-6 ring-1 ring-border">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Percent className="h-5 w-5 text-accent" aria-hidden="true" />
              Discount campaigns
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              One campaign can be live at a time. Set the code, how many times it may be used, and
              when it ends — visitors see it in the places you switch on in Site settings.
            </p>
          </div>
          <Link
            to="/admin/$kind"
            params={{ kind: "page" }}
            className="rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-secondary"
          >
            Placement switches in Site settings
          </Link>
        </div>

        {active ? (
          <p className="mt-5 rounded-lg bg-secondary px-4 py-3 text-sm text-foreground">
            Live now: <strong>{active.slug}</strong> — code {active.code}.{" "}
            {active.maxUses
              ? `${active.usedCount} of ${active.maxUses} uses taken`
              : `${active.usedCount} uses taken`}
            . {active.expiresAt ? `Ends ${formatMoment(active.expiresAt)}.` : "No end date set."}
          </p>
        ) : (
          <p className="mt-5 rounded-lg bg-secondary px-4 py-3 text-sm text-muted-foreground">
            No campaign is live. Visitors see nothing until you switch one on.
          </p>
        )}
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-xl bg-card p-6 ring-1 ring-border flex flex-col gap-5"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-base font-semibold text-foreground">
            {editingId ? "Edit campaign" : "New campaign"}
          </h3>
          <button
            type="button"
            onClick={startNew}
            className="rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-secondary"
          >
            Start a new campaign
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Reference (internal)
            <input
              className={fieldClass}
              value={draft.slug}
              onChange={(event) => setDraft({ ...draft, slug: event.target.value })}
              placeholder="launch-20"
              required
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Small label above the headline
            <input
              className={fieldClass}
              value={draft.label}
              onChange={(event) => setDraft({ ...draft, label: event.target.value })}
              placeholder="Launch offer"
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Headline visitors see
          <input
            className={fieldClass}
            value={draft.headline}
            onChange={(event) => setDraft({ ...draft, headline: event.target.value })}
            placeholder="Get 20% off your first three months"
            required
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Discount line
            <input
              className={fieldClass}
              value={draft.discountLabel}
              onChange={(event) => setDraft({ ...draft, discountLabel: event.target.value })}
              placeholder="20% off your first three months"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Discount code
            <input
              className={fieldClass}
              value={draft.code}
              onChange={(event) => setDraft({ ...draft, code: event.target.value })}
              placeholder="LAUNCH20"
              required
            />
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            How often it can be used
            <select
              className={fieldClass}
              value={draft.useType}
              onChange={(event) =>
                setDraft({ ...draft, useType: event.target.value as OfferDraft["useType"] })
              }
            >
              <option value="single_use">One customer only</option>
              <option value="multi_use">Multiple customers</option>
            </select>
          </label>
          <label
            className={`flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground ${
              draft.useType === "single_use" ? "opacity-50" : ""
            }`}
          >
            Maximum uses (blank = unlimited)
            <input
              className={fieldClass}
              type="number"
              min={1}
              step={1}
              disabled={draft.useType === "single_use"}
              value={draft.maxUses ?? ""}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  maxUses: event.target.value ? Number(event.target.value) : null,
                })
              }
              placeholder="100"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Live?
            <span className="flex h-[38px] items-center gap-3 rounded-md border border-border px-3">
              <input
                id="offer-is-active"
                type="checkbox"
                checked={draft.isActive}
                onChange={(event) => setDraft({ ...draft, isActive: event.target.checked })}
              />
              <span className="text-sm font-normal text-foreground">
                {draft.isActive ? "Showing to visitors" : "Draft — hidden"}
              </span>
            </span>
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Starts at (your time)
            <input
              className={fieldClass}
              type="datetime-local"
              value={toLocalInput(draft.startsAt)}
              onChange={(event) =>
                setDraft({ ...draft, startsAt: fromLocalInput(event.target.value) })
              }
            />
          </label>
          <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
            Expires at (your time)
            <input
              className={fieldClass}
              type="datetime-local"
              value={toLocalInput(draft.expiresAt)}
              onChange={(event) =>
                setDraft({ ...draft, expiresAt: fromLocalInput(event.target.value) })
              }
            />
          </label>
        </div>

        <label className="flex flex-col gap-1.5 text-xs font-semibold text-muted-foreground">
          Small print under the code
          <textarea
            className={`${fieldClass} min-h-[80px]`}
            value={draft.terms}
            onChange={(event) => setDraft({ ...draft, terms: event.target.value })}
            placeholder="New accounts only. Cannot be combined with other offers."
          />
        </label>

        <div className="flex flex-wrap items-center gap-3">
          <ActionButton type="submit" disabled={save.isPending}>
            <Save className="h-4 w-4" aria-hidden="true" />
            {save.isPending ? "Saving…" : "Save campaign"}
          </ActionButton>
          {notice ? (
            <p className="text-sm text-muted-foreground" role="status">
              {notice}
            </p>
          ) : null}
        </div>
      </form>

      <div className="rounded-xl bg-card p-6 ring-1 ring-border">
        <h3 className="text-base font-semibold text-foreground">All campaigns</h3>
        {isLoading ? (
          <p className="mt-3 text-sm text-muted-foreground">Loading…</p>
        ) : offers.length === 0 ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Nothing yet — create the first campaign above.
          </p>
        ) : (
          <ul className="mt-4 flex flex-col divide-y divide-border">
            {offers.map((offer) => (
              <li key={offer.id} className="flex flex-wrap items-start gap-4 py-4">
                <div className="min-w-[16rem] flex-1">
                  <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
                    {offer.slug}
                    {offer.isActive ? (
                      <span className="rounded-full bg-accent px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide text-accent-foreground">
                        Live
                      </span>
                    ) : (
                      <span className="rounded-full px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-wide ring-1 ring-border text-muted-foreground">
                        Draft
                      </span>
                    )}
                    <span className="font-mono text-xs text-muted-foreground">{offer.code}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{offer.headline}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {offer.useType === "single_use" ? "One customer" : "Multiple customers"} ·{" "}
                    {offer.maxUses
                      ? `${offer.usedCount}/${offer.maxUses} uses taken`
                      : `${offer.usedCount} uses taken`}{" "}
                    · shown {offer.seen} · copied {offer.copied} · claimed {offer.claimed} ·{" "}
                    {offer.expiresAt ? `ends ${formatMoment(offer.expiresAt)}` : "no end date"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => edit(offer)}
                    className="rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-secondary"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleActive(offer)}
                    className="rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-secondary"
                  >
                    {offer.isActive ? "Deactivate" : "Activate"}
                  </button>
                  <button
                    type="button"
                    onClick={() => reset.mutate(offer.id)}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold ring-1 ring-border hover:bg-secondary"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Reset counter
                  </button>
                  <button
                    type="button"
                    onClick={() => remove.mutate(offer.id)}
                    className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-semibold text-destructive ring-1 ring-border hover:bg-secondary"
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

const toDraft = (offer: OfferRow): OfferDraft => ({
  id: offer.id,
  slug: offer.slug,
  label: offer.label,
  headline: offer.headline,
  discountLabel: offer.discountLabel,
  terms: offer.terms,
  code: offer.code,
  useType: offer.useType,
  maxUses: offer.maxUses,
  startsAt: offer.startsAt,
  expiresAt: offer.expiresAt,
  isActive: offer.isActive,
});
