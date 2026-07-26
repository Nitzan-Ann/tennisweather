# TennisWeather

Web app that recommends indoor or outdoor tennis courts based on real-time weather conditions.

## Tech Stack
- Backend: Node.js, Express, Prisma, PostgreSQL (Neon)
- Frontend: React, Vite


## Setup
1. Clone the repo
2. Run `npm install` in both `/server` and `/client`
3. Add a `.env` file with your weather API key
4. Run `node server.js` in `/server`
5. Run `npm run dev` in `/client`


## Status
In development

## Testing
- Unit tests for decision logic (decision.test.js) - 4 tests
- Integration tests for all API endpoints (courts, weather, recommendation) - 6 tests, run against a live server
- Code coverage measured with c8: 91.66% on decision.js
  (Note: coverage tooling measures only same-process code;
  integration tests run successfully against server.js in a
  separate process, so server.js logic is tested but not
  reflected in the coverage percentage above.)