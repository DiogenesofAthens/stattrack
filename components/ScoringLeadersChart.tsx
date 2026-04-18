"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ScoringLeader } from "@/types/nba";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

interface ScoringLeadersChartProps {
  leaders: ScoringLeader[];
}

export default function ScoringLeadersChart({ leaders }: ScoringLeadersChartProps) {
  const ordered = [...leaders].reverse();

  const data = {
    labels: ordered.map((l) => l.player_name),
    datasets: [
      {
        label: "PPG",
        data: ordered.map((l) => l.ppg),
        backgroundColor: "rgba(56,189,248,0.75)",
        borderColor: "#38bdf8",
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
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
        callbacks: {
          label: (ctx: { parsed: { x: number } }) => ` ${ctx.parsed.x.toFixed(1)} PPG`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 11 } },
        grid: { color: "rgba(51,65,85,0.5)" },
      },
      y: {
        ticks: { color: "#cbd5e1", font: { size: 11 } },
        grid: { display: false },
      },
    },
  } as const;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-4">
        Scoring Leaders — Season PPG
      </p>
      <div className="h-48">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
