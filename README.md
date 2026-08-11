# StatTrack

StatTrack is a live NBA analytics dashboard for exploring player and scoring data.

## Stack

- Frontend: Next.js and React
- Backend: FastAPI
- Data access: `nba_api`, an unofficial client for NBA statistics

## Architecture

The Next.js frontend renders metrics, player lists, scoring charts, and insight states from the API response.
The FastAPI service retrieves NBA data through `nba_api` and exposes it to the frontend as JSON endpoints.

## Known limitations

The backend runs on free-tier hosting, so cold starts can briefly delay responses.
The NBA stats service may rate-limit cloud IPs, making live data intermittent, especially during the offseason.
