@AGENTS.md
@NOTES.md

# StatTrack frontend

## Overview

StatTrack is a client-rendered NBA analytics dashboard built with the Next.js App Router, TypeScript, Tailwind CSS, and Chart.js. The page currently reads a static 2025-26 snapshot from `public/data/*.json`, which keeps the response shapes of the FastAPI backend. The production backend at `https://api.kirkwessman.com/api` is offline (Railway returns "Application not found" as of 2026-10-21).

## Stack and commands

- Next.js 16.2.3 with Turbopack
- React 19.2.4
- TypeScript 5 in strict mode
- Tailwind CSS 4
- Chart.js through `react-chartjs-2`
- `npm run dev` starts local development.
- `npm run lint` runs ESLint.
- `npm run build` performs the production build and TypeScript checks.

Follow the Next.js-specific instructions imported from `AGENTS.md`. In particular, consult the installed Next.js documentation under `node_modules/next/dist/docs/` before relying on remembered framework behavior.

## Current data flow

- `hooks/usePlayers.ts` fetches `/data/players.json` (the `GET /api/players` shape) and maps API player records to the frontend `Player` type.
- `hooks/useInsights.ts` fetches `/data/insights.json` (the `GET /api/insights` shape) and maps hot, cold, and watch records to alert cards.
- `hooks/useScoringLeaders.ts` fetches `/data/scoring-leaders.json` (the `GET /api/scoring-leaders` shape) and supplies the horizontal scoring-leaders chart.
- `app/page.tsx` composes the dashboard and invokes all three active hooks.

The scoring-leaders response has this shape:

```json
{"players":[{"player_id":1629029,"name":"Luka Doncic","team":"LAL","pts":33.5}]}
```

`hooks/useTrends.ts` and `components/TrendChart.tsx` are currently unused by `app/page.tsx`. The hook requests `GET /api/trends/{player_id}`, but the current backend does not expose that route. Do not treat it as an active API path without implementing and validating the backend contract first.

## Key files

- `app/page.tsx` — dashboard composition and loading/error states
- `app/globals.css` — global styling
- `hooks/` — backend requests and response mapping
- `components/ScoringLeadersChart.tsx` — horizontal PPG chart
- `types/nba.ts` — shared frontend data types

## Integration and verification

- The data base path (`DATA_BASE`) is currently repeated in the active hooks. Keep them consistent when changing it, including when pointing them back at a live API.
- Preserve the backend's snake_case response fields at the API boundary and map them explicitly to frontend types.
- Trace changes through fetch, response shape, state, and rendering.
- Before considering a code change complete, run `npm run lint` and `npm run build`.
- Do not commit, push, or trigger a deployment unless the user asks for it.

## Repository and production

- Branch: `main`
- Remote: `https://github.com/DiogenesofAthens/stattrack`
- Production site: `https://stattrack.kirkwessman.com`
- `NOTES.md` is gitignored and exists only locally. It holds the START HERE board, the session log and the project notes, and is imported at the top of this file. Never commit or push it, because this repo is public.
