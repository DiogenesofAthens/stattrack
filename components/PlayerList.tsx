import type { Player } from "@/types/nba";

interface PlayerListProps {
  players: Player[];
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function PlayerList({ players }: PlayerListProps) {
  return (
    <div className="rounded-xl bg-slate-800 border border-slate-700 p-5">
      <p className="text-xs font-medium uppercase tracking-widest text-slate-400 mb-4">
        Top Scorers
      </p>
      <ul className="divide-y divide-slate-700">
        {players.map((player, idx) => (
          <li key={player.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
            <span className="w-5 text-right text-xs text-slate-500 font-medium shrink-0">
              {idx + 1}
            </span>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sky-800 text-xs font-bold text-sky-200">
              {initials(player.name)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-100 truncate">{player.name}</p>
              <p className="text-xs text-slate-500">
                {player.team}{player.position ? ` · ${player.position}` : ""}
              </p>
            </div>
            <span className="text-sm font-bold text-sky-400 shrink-0">
              {player.ppg.toFixed(1)}
              <span className="text-xs font-normal text-slate-500 ml-1">PPG</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
