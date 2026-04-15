"use client";

import { useEffect, useState } from "react";
import type { Player, TrendData } from "@/types/nba";

const API_BASE = "https://stattrack-api-production.up.railway.app/api";

interface ApiPlayer {
  player_id: number;
  name: string;
  team: string;
  pts: number;
  gp: number;
  reb: number;
  ast: number;
  fg_pct: number;
  fg3_pct: number;
  ft_pct: number;
  rank: number;
}

interface ApiPlayersResponse {
  players: ApiPlayer[];
}

export function usePlayers(): { players: Player[]; loading: boolean; error: string | null } {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/players`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<ApiPlayersResponse>;
      })
      .then(({ players: apiPlayers }) => {
        setPlayers(
          apiPlayers.map((p) => ({
            id: String(p.player_id),
            name: p.name,
            team: p.team,
            ppg: p.pts,
            position: "",
            trend: [] as TrendData[],
          }))
        );
        setLoading(false);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : "Failed to load players");
        setLoading(false);
      });
  }, []);

  return { players, loading, error };
}
