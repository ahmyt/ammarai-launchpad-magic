import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { contentKinds, contentRowsQuery, staticItems } from "@/lib/content";
import { allSyndicatedArticlesQuery } from "@/lib/articles";

export const Route = createFileRoute("/admin/")({
  staticData: { sitemap: false },
  component: AdminOverview,
});

function AdminOverview() {
  const { isAdmin, isEditor, refreshRoles } = useAuth();
  const queryClient = useQueryClient();
  const { data: rows = [] } = useQuery({ ...contentRowsQuery, enabled: isEditor });
  const { data: articles = [] } = useQuery({ ...allSyndicatedArticlesQuery, enabled: isAdmin });
  const [claiming, setClaiming] = useState(false);
  const [claimMessage, setClaimMessage] = useState<string | null>(null);

  const claim = async () => {
    setClaiming(true);
    setClaimMessage(null);
    const { error } = await supabase.rpc("claim_first_admin");
    if (error) setClaimMessage(error.message);
    else {
      setClaimMessage("You are now the admin.");
      await refreshRoles();
      await queryClient.invalidateQueries();
    }
    setClaiming(false);
  };

  return (
    <div className="space-y-8">
      {!isAdmin ? (
        <div className="rounded-xl bg-card p-6 ring-1 ring-border">
          <h2 className="text-lg font-semibold">Claim the admin seat</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            If no admin exists yet, you can take the first admin seat. After that, only admins can
            grant roles.
          </p>
          <button
            type="button"
            onClick={claim}
            disabled={claiming}
            className="mt-4 rounded-md bg-ink px-4 py-2.5 text-sm font-semibold text-ink-foreground disabled:opacity-60"
          >
            {claiming ? "Claiming…" : "Claim first admin"}
          </button>
          {claimMessage ? (
            <p className="mt-3 text-sm text-muted-foreground">{claimMessage}</p>
          ) : null}
        </div>
      ) : null}

      {isEditor ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contentKinds.map((k) => {
            const staticList = staticItems(k.kind);
            const custom = rows.filter((r) => r.kind === k.kind && !r.is_hidden).length;
            let hidden = rows.filter((r) => r.kind === k.kind && r.is_hidden).length;
            let base = staticList.length;
            if (k.kind === "post") {
              const staticSlugs = new Set(staticList.map((i) => i.slug));
              const extra = articles.filter((a) => !staticSlugs.has(a.slug));
              base += extra.filter((a) => !a.is_hidden).length;
              hidden += extra.filter((a) => a.is_hidden).length;
            }
            return (
              <Link
                key={k.kind}
                to="/admin/$kind"
                params={{ kind: k.kind }}
                className="rounded-xl bg-card p-5 ring-1 ring-border transition-colors hover:ring-accent/50"
              >
                <p className="eyebrow">{k.label}</p>
                <p className="mt-3 text-3xl">{base}</p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {custom} edited or added · {hidden} hidden
                </p>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
