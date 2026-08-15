<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

# AGENTS.md

Operating instructions for any AI coding agent (Claude Code, Cursor, Codex, etc.) working in this repository. Full feature spec lives in `docs/PROJECT.md` — this file covers commands, conventions, and workflow only. Read this before making any change.

## 1. Project

**Hack2Hire** — hackathon management platform for the ACM Student Chapter, UMT Lahore. Next.js full-stack app. See `docs/PROJECT.md` for the complete functional spec, data model, and phased build plan.

## 2. Stack

Next.js 15 (App Router, full-stack) · TypeScript strict · Tailwind CSS + shadcn/ui **only** · Zustand (client/UI state) · TanStack Query (server state) · TanStack Table · React Hook Form + Zod · PostgreSQL via Docker (local) + Neon (prod) · Prisma ORM · NextAuth v5 (Credentials + Google) · Vercel Blob · Resend + React Email · Vercel · GitHub Actions · Vitest + Playwright.

## 3. Setup & Commands

```bash
npm install
cp .env.example .env          # fill in local values
docker compose up -d          # local Postgres
npx prisma migrate dev        # apply migrations locally
npx prisma db seed            # seed demo data
npm run dev                   # start app

npm run lint                  # ESLint
npm run type-check             # tsc --noEmit
npm run format:check          # Prettier check
npm test                      # Vitest unit tests
npm run test:e2e              # Playwright
npm run build                  # production build
```

Run `lint`, `type-check`, `format:check`, and `build` before opening any PR — CI enforces the same checks and will block merge on failure.

## 4. Code Conventions

- TypeScript strict mode. No `any`. No stub/mock data in shipped code paths.
- shadcn/ui only — do not add another component library.
- Zod schemas are the single source of truth for validation, shared between client forms (React Hook Form) and server-side checks.
- Data access split, don't blur it:
  - **Server Components** — SSR for public/SEO pages (event pages, gallery, profiles).
  - **Route Handlers** — the API layer for everything else.
  - **TanStack Query** — all client-side fetching/mutation/caching against Route Handlers. Never fetch server data directly into Zustand.
  - **Zustand** — client-only UI state (modals, wizard steps, unsaved filters). Nothing that originates from the server belongs here.
- Authorization is enforced in **Postgres RLS**, not app code alone. Every new table needs RLS policies added as raw SQL in its migration — a table without policies is an incomplete PR, not a follow-up. Prisma has no per-request user context by default; DB calls go through the existing session-variable extension (`SET LOCAL app.user_id` / `app.user_role`) — don't bypass it with a raw `prisma.$queryRaw` that skips the transaction wrapper.
- Never expose service credentials, `NEXTAUTH_SECRET`, or Blob tokens to the client bundle.

## 5. Testing

Vitest for units, Playwright for the three critical flows (registration, submission-before-deadline, judge scoring). New features touching those flows need a corresponding test in the same PR, not a follow-up ticket.

## 6. Git Workflow & Environments

```
feature/<feature-name>  →  integration  →  main
     (Preview)               (Preview)     (Production)
```

| Branch           | Purpose                                            | Deploys to                                      |
| ---------------- | -------------------------------------------------- | ----------------------------------------------- |
| `main`           | Production                                         | Vercel **Production** (only branch that does)   |
| `integration`    | Shared staging / merge point for finished features | Vercel **Preview** (stable branch URL)          |
| `feature/<name>` | One branch per task, cut from `integration`        | Vercel **Preview** (own ephemeral URL per push) |

**Rules:**

- Never push directly to `main` or `integration`. Both are protected — merge only via PR.
- Cut feature branches from `integration`, not `main`: `git checkout integration && git pull && git checkout -b feature/<name>`.
- Open the PR `feature/<name> → integration` when ready. CI (type check + lint + format check + build) must pass before merge.
- Promotion to production is a separate, deliberate PR: `integration → main`, opened when `integration` has been verified on its Preview URL. Only this merge triggers a Production deploy.
- Only `main`, `integration`, and `feature/*` branches deploy at all — anything else (e.g. `bugfix/`, personal scratch branches) is skipped by the `ignoreCommand` in `vercel.json`, so it won't burn build minutes or create stray preview URLs.

## 7. CI/CD

- `.github/workflows/ci.yml` ("Hack2Hire CI") runs on every push to `feature/**`/`integration`/`main` and every PR into `integration`/`main`: install, `prisma generate`, `prisma validate`, type check, lint, format check, build. No deploy step — this is a pure quality gate.
- `.github/workflows/deploy-preview.yml` triggers via `workflow_run` after CI succeeds on `integration` or any `feature/*` push: runs `prisma migrate deploy` against the Preview database, then `vercel pull` → `vercel build` → `vercel deploy --prebuilt` (Preview environment). Migration runs _before_ the app deploys, not in parallel.
- `.github/workflows/deploy-production.yml` — same shape, triggers only on `main`, deploys to the Production environment with `--prod`. `concurrency.cancel-in-progress: false` so an in-flight production deploy is never cancelled mid-way.
- Vercel's own git-triggered auto-builds are disabled (`vercel.json`'s `ignoreCommand: "exit 0"`) — these three workflows are the only path to a deployment, so migrations and app code never go out of sync.
- **Gotcha:** `workflow_run` reads the _triggering_ workflow file (`deploy-preview.yml`/`deploy-production.yml`) from the repo's default branch, not from the branch that pushed. Changes to these two files only take effect once merged into the default branch.
- Required secrets (GitHub → Settings → Secrets → Environments `Preview` and `production`): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PREVIEW_DATABASE_URL` / `PREVIEW_DIRECT_DATABASE_URL`, `PRODUCTION_DATABASE_URL` / `PRODUCTION_DIRECT_DATABASE_URL`.

## 8. Never Do

- Push directly to `main` or `integration`.
- Ship a table without RLS policies in the same migration.
- Add a component library alongside shadcn/ui.
- Put server-fetched data in Zustand instead of TanStack Query's cache.
- Merge with failing CI, even for "just a docs change."

<!-- END:nextjs-agent-rules -->
