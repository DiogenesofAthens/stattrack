import type { Insight } from "@/types/nba";

interface InsightAlertProps {
  insight: Insight;
}

const BADGE_STYLES: Record<Insight["badge"], string> = {
  hot: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  cold: "bg-sky-500/20 text-sky-400 border border-sky-500/30",
  watch: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};

const BADGE_LABELS: Record<Insight["badge"], string> = {
  hot: "🔥 Hot",
  cold: "🧊 Cold",
  watch: "👁 Watch",
};

export default function InsightAlert({ insight }: InsightAlertProps) {
  const delta = insight.stat - insight.seasonAvg;
  const pct = ((delta / insight.seasonAvg) * 100).toFixed(1);
  const isAbove = delta >= 0;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 px-5 py-4 flex items-start gap-4">
      <span
        className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${BADGE_STYLES[insight.badge]}`}
      >
        {BADGE_LABELS[insight.badge]}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-100">
          {insight.playerName}{" "}
          <span className="text-slate-500 font-normal text-xs">· {insight.team}</span>
        </p>
        <p className="text-xs text-slate-400 mt-0.5">{insight.statLabel}</p>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-slate-100">{insight.stat.toFixed(1)}</p>
        <p
          className={`text-xs font-medium ${
            isAbove ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isAbove ? "▲" : "▼"} {Math.abs(parseFloat(pct))}% vs avg
        </p>
      </div>
    </div>
  );
}
