# New component plan (Milestone 1)

## Component I will add
`express-rate-limit`

## What it does
`express-rate-limit` is Express middleware that counts requests from a client (usually by IP) in a time window. If the count is too high, the server responds with **HTTP 429 Too Many Requests**.

## Why I picked this for my Events + RSVPs API
My API will eventually have endpoints where users can create/update RSVPs. Even with validation, a public API can still get spammed with repeated requests. Rate limiting is a simple way to reduce abuse and accidental overload while I am still building the project.

This is also a good “new component” because it is not the main focus of the course work (CRUD + Firebase + auth), but it still adds real value.

## How it fits my layered architecture
It does not replace any layer. It sits in front of the routes as middleware.

Planned placement:
- `src/middleware/rateLimiter.ts` (export the limiter)
- `src/server.ts` (register the middleware after `helmet`, `cors`, and `express.json()`)

Routes/controllers/services/repositories stay the same.

## What endpoints it will affect
### Milestone 1 & 2 (simple approach)
- Apply a **global** limiter to all routes.
- I will likely **exclude** `GET /health` so health checks do not get blocked during demos.

### Milestone 3 (optional improvement)
- Add a **stricter** limiter only for write-heavy routes (example: RSVP create/update).

## Planned settings (starting point)
These numbers are a starting point. I may change them after testing.

- Window: **15 minutes**
- Max requests per IP (global): **300** requests per window
- Response: **429** JSON like:
  - `{ "message": "Too many requests. Please try again later." }`

## Install steps (when I implement it)
```bash
npm i express-rate-limit