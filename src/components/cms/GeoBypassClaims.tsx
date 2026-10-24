import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { ActionButton } from "@/components/site/Button";
import { listGeoBypasses, resetGeoBypass } from "@/lib/geo-bypass.functions";

export function GeoBypassClaims() {
  const { isAdmin } = useAuth();
  const list = useServerFn(listGeoBypasses);
  const reset = useServerFn(resetGeoBypass);
  const queryClient = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [status, setStatus] = useState("");
  const query = useQuery({ queryKey: ["geo-bypass-claims"], queryFn: () => list(), enabled: isAdmin });
  if (!isAdmin) return null;
  return <section className="mt-8 border-t border-border pt-6" aria-label="Bypass device claims">
    <h3 className="text-lg font-semibold">Bypass device claims</h3>
    {query.isPending ? <p className="mt-3 text-sm text-muted-foreground">Loading claims…</p> : null}
    {query.error ? <p role="alert" className="mt-3 text-sm text-destructive">Could not load bypass claims.</p> : null}
    {query.data?.length === 0 ? <p className="mt-3 text-sm text-muted-foreground">No saved bypass codes.</p> : null}
    {query.data?.map((item) => <div key={item.hash} className="flex flex-wrap items-center justify-between gap-3 border-b border-border py-4">
      <div><p className="text-sm font-semibold">{item.label}</p><p className="mt-1 text-xs text-muted-foreground">{item.claimedAt ? `Claimed ${new Date(item.claimedAt).toLocaleDateString()} · ${item.expiresAt && new Date(item.expiresAt) <= new Date() ? "Expired" : "One browser"}` : "Unclaimed"}</p></div>
      <ActionButton type="button" variant="outline" size="sm" disabled={!item.claimedAt || busy !== null} onClick={async () => {
        if (!window.confirm(`Reset ${item.label}? Its current browser will lose bypass access.`)) return;
        setBusy(item.hash); setStatus("");
        try { await reset({ data: { hash: item.hash } }); await queryClient.invalidateQueries({ queryKey: ["geo-bypass-claims"] }); setStatus(`${item.label} reset. The next browser can claim it.`); }
        catch { setStatus("Could not reset the code. Please try again."); }
        finally { setBusy(null); }
      }}><RotateCcw size={14} />{busy === item.hash ? "Resetting…" : "Reset device"}</ActionButton>
    </div>)}
    {status ? <p role="status" className="mt-3 text-sm text-muted-foreground">{status}</p> : null}
  </section>;
}