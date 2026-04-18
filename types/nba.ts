export interface TrendData {
  date: string; // ISO date string, e.g. "2026-03-30"
  points: number;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  ppg: number;
  position: string;
  trend: TrendData[];
}

export interface Insight {
  id: string;
  badge: "hot" | "cold" | "watch";
  playerName: string;
  team: string;
  stat: number;
  seasonAvg: number;
  statLabel: string;
}

export interface MetricSummary {
  label: string;
  value: string | number;
  delta: number; // positive = up, negative = down
}

export interface ScoringLeader {
  player_id: number;
  name: string;
  team: string;
  pts: number;
}
