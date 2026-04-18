"use client";

import { useEffect, useState } from "react";
import type { ScoringLeader } from "@/types/nba";

const API_BASE = "https://api.kirkwessman.com/api";

export function useScoringLeaders(): {
  leaders: ScoringLeader[];
  loading: boolean;
  error: string | null;
} {
  const [leaders, setLeaders] = useState<ScoringLeader[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/scoring-leaders`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ players: ScoringLeader[] }>;
      })
      .then((data) => {
        setLeaders(data.players.slice(0, 10));
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load scoring leaders");
        setLoading(false);
      });
  }, []);

  return { leaders, loading, error };
}
