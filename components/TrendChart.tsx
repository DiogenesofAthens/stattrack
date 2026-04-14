"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { TrendData } from "@/types/nba";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

interface TrendChartProps {
  trend: TrendData[];
  playerName: string;
}

export default function TrendChart({ trend, playerName }: TrendChartProps) {
  const labels = trend.map((d) => {
    const [, month, day] = d.date.split("-");
    return `${month}/${day}`;
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Points",
        data: trend.map((d) => d.points),
        borderColor: "#38bdf8",
        backgroundColor: "rgba(56,189,248,0.12)",
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#38bdf8",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
      },
    },
    scales: {
      x: {
        ticks: { color: "#64748b", font: { size: 11 } },
        grid: { color: "rgba(51,65,85,0.5)" },
      },
      y: {
        ticks: { color: "#64748b", font: { size: 11 } },
        grid: { color: "rgba(51,65,85,0.5)" },
      },
    },
  } as const;

  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-4">
        Scoring trend — {playerName}
      </p>
      <div className="h-48">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
