"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
  type TooltipItem,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ScoringLeader } from "@/types/nba";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ScoringLeadersChartProps {
  leaders: ScoringLeader[];
}

const options: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: "#1e293b",
      titleColor: "#94a3b8",
      bodyColor: "#f1f5f9",
      borderColor: "#334155",
      borderWidth: 1,
      padding: 10,
      callbacks: {
        label: (ctx: TooltipItem<"bar">) => ` ${(ctx.parsed.x as number).toFixed(1)} PPG`,
      },
    },
  },
  scales: {
    x: {
      min: 0,
      ticks: {
        color: "#64748b",
        font: { size: 11 },
        callback: (value) => `${value}`,
      },
      grid: { color: "rgba(51,65,85,0.5)" },
      border: { color: "rgba(51,65,85,0.5)" },
    },
    y: {
      ticks: {
        color: "#cbd5e1",
        font: { size: 12 },
        crossAlign: "far",
      },
      grid: { display: false },
      border: { display: false },
    },
  },
};

export default function ScoringLeadersChart({ leaders }: ScoringLeadersChartProps) {
  const ordered = [...leaders].reverse();

  const data = {
    labels: ordered.map((l) => l.name),
    datasets: [
      {
        label: "PPG",
        data: ordered.map((l) => l.pts),
        backgroundColor: "rgba(99,179,237,0.55)",
        borderColor: "rgba(99,179,237,0.9)",
        borderWidth: 1,
        borderRadius: 3,
        maxBarThickness: 24,
      },
    ],
  };

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-4">
        Scoring Leaders — Season PPG
      </p>
      <div className="h-[360px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
