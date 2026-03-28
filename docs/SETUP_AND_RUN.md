Developer setup (Windows)

Prerequisites
- Node.js 18+ (LTS recommended)
- PostgreSQL local or remote
- Git

Install
1. Clone repo
   git clone <repo>
2. Install dependencies
   npm install
3. Copy environment
   cp .env.example .env
   # update DATABASE_URL and NEXTAUTH_SECRET
4. Initialize Prisma (if DB ready)
   npx prisma migrate dev --name init
   node prisma/seed.js  # if provided
5. Run dev server
   npm run dev

Helpful scripts
- `npm run dev` — Next dev server
- `npm run build` — build for production
- `npm run start` — start production server after build

Env variables to set (example in `.env.example`)
- `DATABASE_URL` — postgres connection
- `NEXTAUTH_SECRET` — random string for NextAuth
- `NEXT_PUBLIC_API_BASE` — optional base path for client API (defaults to `/api`)

Notes
- Tailwind CSS uses PostCSS — `postcss.config.mjs` and `tailwind.config.cjs` included.
- If Prisma is not used locally, provide a test DB and run migrations in CI.
