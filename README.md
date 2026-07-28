# TennisWeather

Web app that recommends indoor or outdoor tennis courts based on real-time weather conditions.

## Tech Stack
- Backend: Node.js, Express, Prisma, PostgreSQL (Neon)
- Frontend: React, Vite

## Features
- Fetches real-time weather data for a selected city
- Recommends indoor or outdoor courts based on configurable thresholds (wind, humidity, temperature)
- Displays available courts filtered by city and recommendation
- API endpoints: `/api/courts`, `/api/weather`, `/api/recommendation`


## Setup
1. Clone the repo
2. Run `npm install` in both `/server` and `/client`
3. Add a `.env` file in `/server` with `DATABASE_URL` (Neon connection string) and your weather API key
4. Run `npx prisma generate` in `/server`
5. Run `node server.js` in `/server`
6. Run `npm run dev` in `/client`

## Running with Docker
1. Build the image: `docker build -t tennisweather-server ./server`
2. Run the container: `docker run -p 8000:8000 --env-file server/.env tennisweather-server`


## Status
Core features complete: weather-based recommendation logic, courts API, React frontend, Docker containerization, and CI/CD pipeline. See [Releases](https://github.com/Nitzan-Ann/tennisweather/releases) for version history.

## Testing
- Unit tests for decision logic (decision.test.js) - 4 tests
- Integration tests for all API endpoints (courts, weather, recommendation) - 6 tests, run against a live server
- Code coverage measured with c8: 91.66% on decision.js
  (Note: coverage tooling measures only same-process code;
  integration tests run successfully against server.js in a
  separate process, so server.js logic is tested but not
  reflected in the coverage percentage above.)

## CI/CD
GitHub Actions pipeline runs on every pull request and push to `main`: installs dependencies, generates the Prisma client, starts the server, and runs all unit and integration tests.