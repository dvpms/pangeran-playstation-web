Canonical folder structure (tree + explanations)

```markdown
├─ package.json — project scripts & dependencies
├─ next.config.mjs — Next.js runtime configuration
├─ tailwind.config.cjs — Tailwind theme extensions (design tokens)
├─ postcss.config.mjs — PostCSS + Autoprefixer config
├─ .env.example — example environment variables
├─ README.md — high-level run & dev notes
├─ docs/ — project documentation (this folder)
├─ config/
│  ├─ uiTokens.js — (optional) JS source of design tokens (colors, shadows)
│  └─ areas.js — whitelist of service areas (Tangerang Raya)
├─ prisma/
│  ├─ schema.prisma — Prisma data models (Unit, Customer, Booking, Admin)
│  └─ seed.js — seed script to populate sample data
├─ public/
│  ├─ images/ — marketing and product imagery
│  └─ icons/ — site icons and favicons
├─ scripts/
│  └─ (tooling) — automation scripts (seed, generate-css-vars)
├─ src/
│  ├─ app/
│  │  ├─ layout.js — global app shell (fonts, providers)
│  │  ├─ globals.css — Tailwind imports + global CSS variables/utilities
│  │  ├─ (public)/ — public-facing routes & route-scoped components
│  │  │  └─ components/ — components used only by public pages
│  │  └─ (admin)/ — admin dashboard routes & route-scoped components
│  │     └─ components/ — components used only by admin pages
│  │  └─ api/
│  │     ├─ bookings/route.js — booking create/list endpoints
│  │     ├─ inventory/route.js — inventory endpoints and locks
│  │     └─ auth/[...nextauth]/route.js — NextAuth routes
│  ├─ components/
│  │  ├─ atoms/ — smallest reusable primitives (Button, Input)
│  │  ├─ molecules/ — composed components (UnitCard, FormRow)
│  │  ├─ organisms/ — larger UI blocks (InventoryGrid, AdminTable)
│  │  └─ ui/ — design-system wrappers (themed containers)
│  ├─ lib/
│  │  ├─ prisma.js — Prisma client singleton
│  │  ├─ api.js — axios instance for HTTP requests
│  │  ├─ validation.js — shared Zod schemas
│  │  └─ locks.js — DB advisory lock helpers
│  ├─ services/
│  │  ├─ bookingService.js — transactional booking flows
│  │  └─ inventoryService.js — stock operations & availability
│  ├─ providers/ — client providers (React Query, Theme)
│  └─ hooks/ — reusable client hooks (useCreateBooking)
├─ test/
│  ├─ unit/ — unit tests for services and utils
│  └─ integration/ — integration tests for booking flows
└─ .github/ — CI/workflow definitions
```

Explanations / rules
- `src/app/(public)` and `src/app/(admin)` are route-scoped: put components that only serve those routes here to keep bundles small and responsibilities clear.
- `src/components/*` contains reusable design-system components; promote a component here when it becomes shared across routes.
- Keep API route handlers (`src/app/api/*/route.js`) thin: move business logic and DB transactions into `src/services/*` so logic is testable and reusable.
- Keep design tokens centralized (either in `config/uiTokens.js` or `tailwind.config.cjs` + `globals.css`). If you keep `uiTokens.js`, consider a small script to generate `:root` CSS variables from it to avoid duplication.
- Add `.env.example` and document required env vars in `docs/SETUP_AND_RUN.md` for reviewers and new developers.

This tree is intended to be a living guideline: keep it updated when moving files or adding subsystems (workers, redis, infra).
