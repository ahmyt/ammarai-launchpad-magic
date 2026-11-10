import { Check, Minus, X } from "lucide-react";
import { competitors, compareRows, stackCosts, stackTotal, type Mark } from "@/data/compare";

function Cell({ v }: { v: string | Mark }) {
  if (v === "yes") return <Check className="mx-auto h-5 w-5 text-accent" aria-label="Yes" />;
  if (v === "partial") return <Minus className="mx-auto h-5 w-5 text-muted-foreground" aria-label="Partial" />;
  if (v === "no") return <X className="mx-auto h-5 w-5 text-muted-foreground/60" aria-label="No" />;
  return <span className="text-xs sm:text-sm">{v}</span>;
}

export function CompareMatrix() {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="compare-table w-full min-w-[720px] text-sm">
        <thead>
          <tr>
            <th className="compare-sticky p-3 text-left font-semibold">Capability</th>
            {competitors.map((c, i) => (
              <th key={c} className={`p-3 text-center font-semibold ${i === 0 ? "compare-ours" : ""}`}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {compareRows.map((r) => (
            <tr key={r.feature} className="border-t border-border">
              <td className="compare-sticky max-w-[9rem] p-3 font-medium">{r.feature}</td>
              {r.values.map((v, i) => (
                <td key={i} className={`p-3 text-center ${i === 0 ? "bg-accent/5" : ""}`}><Cell v={v} /></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function StackSavings() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-lg border border-border p-6">
        <p className="eyebrow">Separate tools</p>
        <ul className="mt-4 space-y-2 text-sm">
          {stackCosts.map((s) => (
            <li key={s.need} className="flex justify-between gap-4 border-b border-border pb-2">
              <span>{s.need}</span><span className="whitespace-nowrap font-semibold">{s.cost}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 flex justify-between font-semibold"><span>Total, 5 logins</span><span>{stackTotal}</span></p>
      </div>
      <div className="rounded-lg border-2 border-accent p-6">
        <p className="eyebrow">AmmarAI</p>
        <p className="mt-4 text-3xl font-semibold">$9.99–$59.99/mo</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Writing, images, video, avatars, voice, transcription and website chatbot under one login and one credit
          balance. Start on the free plan with 500 credits a month. Phone agents are available on Ultimate and Voice Scale.
        </p>
      </div>
    </div>
  );
}
