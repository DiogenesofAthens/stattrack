@AGENTS.md

# StatTrack frontend

## Overview

StatTrack is a client-rendered NBA analytics dashboard built with the Next.js App Router, TypeScript, Tailwind CSS, and Chart.js. The page fetches season data directly from the production FastAPI backend at `https://api.kirkwessman.com/api`.

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

- `hooks/usePlayers.ts` calls `GET /api/players` and maps API player records to the frontend `Player` type.
- `hooks/useInsights.ts` calls `GET /api/insights` and maps hot, cold, and watch records to alert cards.
- `hooks/useScoringLeaders.ts` calls `GET /api/scoring-leaders` and supplies the horizontal scoring-leaders chart.
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

- The API base URL is currently repeated in the hooks. Keep all active hooks consistent when changing it.
- Preserve the backend's snake_case response fields at the API boundary and map them explicitly to frontend types.
- Trace changes through fetch, response shape, state, and rendering.
- Before considering a code change complete, run `npm run lint` and `npm run build`.
- Do not commit, push, or trigger a deployment unless the user asks for it.

## Repository and production

- Branch: `main`
- Remote: `https://github.com/DiogenesofAthens/stattrack`
- Production site: `https://stattrack.kirkwessman.com`
