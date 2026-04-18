"use client";

import { useEffect, useState } from "react";
import type { TrendData } from "@/types/nba";

const API_BASE = "https://api.kirkwessman.com/api";

interface ApiGame {
  game_date: string;
  pts: number;
}

interface ApiTrendsResponse {
  player_id: number;
  games: ApiGame[];
}

const MONTH_MAP: Record<string, string> = {
  JAN: "01", FEB: "02", MAR: "03", APR: "04",
  MAY: "05", JUN: "06", JUL: "07", AUG: "08",
  SEP: "09", OCT: "10", NOV: "11", DEC: "12",
};

function parseNbaDate(dateStr: string): string {
  const parts = dateStr.split(" ");
  if (parts.length < 3) return dateStr;
  const month = MONTH_MAP[parts[0]] ?? "01";
  const day = parts[1].replace(",", "").padStart(2, "0");
  const year = parts[2];
  return `${year}-${month}-${day}`;
}

export function useTrends(playerId: string | null): {
  trend: TrendData[];
  loading: boolean;
  error: string | null;
} {
  const [trend, setTrend] = useState<TrendData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playerId) return;

    setLoading(true);
    setError(null);

    fetch(`${API_BASE}/trends/${playerId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiTrendsResponse>;
      })
      .then(({ games }) => {
        // API returns newest-first; reverse for chronological display
        const chronological = [...games].reverse();
        setTrend(
          chronological.map((g) => ({
            date: parseNbaDate(g.game_date),
            points: g.pts,
          }))
        );
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load trends");
        setLoading(false);
      });
  }, [playerId]);

  return { trend, loading, error };
}
