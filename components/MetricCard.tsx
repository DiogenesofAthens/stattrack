import type { MetricSummary } from "@/types/nba";

interface MetricCardProps {
  metric: MetricSummary;
}

export default function MetricCard({ metric }: MetricCardProps) {
  const isPositive = metric.delta >= 0;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 px-6 py-5 flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-widest text-slate-400">
        {metric.label}
      </span>
      <span className="text-3xl font-bold text-slate-100">{metric.value}</span>
      <span
        className={`text-sm font-medium ${
          isPositive ? "text-emerald-400" : "text-rose-400"
        }`}
      >
        {isPositive ? "▲" : "▼"} {Math.abs(metric.delta)}%{" "}
        <span className="text-slate-500 font-normal">vs last week</span>
      </span>
    </div>
  );
}
