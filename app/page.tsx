"use client";

import MetricCard from "@/components/MetricCard";
import TrendChart from "@/components/TrendChart";
import PlayerList from "@/components/PlayerList";
import InsightAlert from "@/components/InsightAlert";
import { usePlayers } from "@/hooks/usePlayers";
import { useInsights } from "@/hooks/useInsights";
import { useTrends } from "@/hooks/useTrends";
import type { MetricSummary } from "@/types/nba";

const METRICS: MetricSummary[] = [
  { label: "League Avg PPG", value: "114.2", delta: 2.1 },
  { label: "Games Played", value: 1080, delta: 0 },
  { label: "Total 3PM", value: "12,840", delta: 4.7 },
  { label: "Avg Pace", value: "100.4", delta: -0.8 },
];

export default function Page() {
  const { players, loading: playersLoading, error: playersError } = usePlayers();
  const { insights, loading: insightsLoading, error: insightsError } = useInsights();

  const topPlayer = players[0] ?? null;
  const { trend: topPlayerTrend, loading: trendLoading } = useTrends(topPlayer?.id ?? null);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Header */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center gap-3">
        <span className="text-sky-400 font-black text-lg tracking-tight">
          STAT<span className="text-slate-100">TRACK</span>
        </span>
        <span className="text-slate-600 text-sm">NBA Analytics Dashboard</span>
        <span className="ml-auto rounded-full bg-sky-500/10 border border-sky-500/20 px-3 py-0.5 text-xs text-sky-400 font-medium">
          2025–26 Season
        </span>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8 space-y-8">
        {(playersError ?? insightsError) && (
          <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
            Backend unavailable — some data could not be loaded.
          </div>
        )}
        {/* Metric summary row */}
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
            Season at a Glance
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {METRICS.map((m) => (
              <MetricCard key={m.label} metric={m} />
            ))}
          </div>
        </section>

        {/* Trend chart + player list */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {playersLoading || trendLoading ? (
              <div className="rounded-xl bg-slate-800 border border-slate-700 h-64 animate-pulse" />
            ) : topPlayer ? (
              <TrendChart trend={topPlayerTrend} playerName={topPlayer.name} />
            ) : null}
          </div>
          <div>
            {playersLoading ? (
              <div className="rounded-xl bg-slate-800 border border-slate-700 h-64 animate-pulse" />
            ) : (
              <PlayerList players={players} />
            )}
          </div>
        </section>

        {/* Insights / anomalies */}
        <section>
          <h2 className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-4">
            Anomaly Alerts
          </h2>
          {insightsLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="rounded-xl bg-slate-800 border border-slate-700 h-16 animate-pulse"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {insights.map((insight) => (
                <InsightAlert key={insight.id} insight={insight} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
