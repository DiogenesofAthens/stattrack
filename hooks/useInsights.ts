"use client";

import { useEffect, useState } from "react";
import type { Insight } from "@/types/nba";

const API_BASE = "https://api.kirkwessman.com/api";

interface ApiInsight {
  player_id: number;
  name: string;
  team: string;
  alert: "hot" | "cold" | "watch";
  season_avg_pts: number;
  last5_avg_pts: number;
  delta_pct: number;
}

interface ApiInsightsResponse {
  insights: ApiInsight[];
}

export function useInsights(): { insights: Insight[]; loading: boolean; error: string | null } {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    fetch(`${API_BASE}/insights`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiInsightsResponse>;
      })
      .then(({ insights: apiInsights }) => {
        setInsights(
          apiInsights.map((i) => ({
            id: String(i.player_id),
            badge: i.alert,
            playerName: i.name,
            team: i.team,
            stat: i.last5_avg_pts,
            seasonAvg: i.season_avg_pts,
            statLabel: "PPG (last 5 games)",
          }))
        );
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load insights");
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));
  }, []);

  return { insights, loading, error };
}
