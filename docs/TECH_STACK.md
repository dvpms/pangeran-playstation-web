Tech Stack

Frontend
- Next.js 14 (App Router) — server + client in one framework, Route Handlers for API.
- React 19 — UI library.
- Tailwind CSS 4 — utility-first styling, extended with design tokens.
- SweetAlert2 — user-friendly alerts/modals.
- Axios — HTTP client (readable, explicit requests).
- @tanstack/react-query — caching, mutations, invalidations, optimistic updates.

Backend (in-project)
- Next.js Route Handlers (serverless style endpoints) — keep API co-located.
- Prisma + PostgreSQL — relational DB with typed client and migrations.

Auth
- NextAuth.js v5 — admin authentication (Credentials provider initially).

Validation & Types
- Zod — runtime validation for API inputs and shared schemas.

Dev tooling
- ESLint, Tailwind CLI (PostCSS + Autoprefixer), Prisma CLI.

Rationale / Notes
- Single repo (Next.js) reduces infra complexity for MVP. For scale, backend can be extracted.
- Use `axios + react-query` for readable request code + strong caching/mutation features required by booking flows.
- Prisma chosen for developer DX and safe DB migrations.

Optional additions later
- Redis for short reservation locks, background worker for reconciliation, or WebSocket/Realtime layer for live stock updates.
