# Hack2Hire — Project Prompt

Full build spec for Hack2Hire. Paste as the opening prompt to Claude Code / Cursor, or keep as `docs/PROJECT.md` in the repo (referenced by `AGENTS.md`/`CLAUDE.md`, which cover day-to-day conventions — this file is the complete "what to build").

## 1. Agent Rules

- Production code only. No `any`, no stub features, no mock data in shipped paths.
- Build phase-by-phase (Sec. 11). Stop after each phase; report what shipped, what was skipped, decisions needed.
- Before coding a phase: restate plan in ≤10 bullets + list forced assumptions.
- Design your own Prisma schema from Section 4/6. Every table ships with hand-written RLS SQL in the same migration — Prisma's schema language doesn't express RLS, so policies are added as raw SQL in the generated migration before it's applied. No table is "done" without them.
- **Authorization runs through Postgres RLS, not just app code.** Prisma has no per-request user context by default — wrap every DB call in a transaction that runs `SET LOCAL app.user_id` / `SET LOCAL app.user_role` (from the NextAuth session) before the query, implemented once as a Prisma Client Extension so no query can accidentally skip it.
- Data access split: **Server Components** for SSR on public/SEO-critical pages (event pages, gallery, profiles). **Route Handlers** as the API layer for everything else, called from the client via **TanStack Query** (queries, mutations, optimistic updates). **Zustand** holds client-only UI state (modals, wizard steps, unsaved filter drafts) — never mirror server data into it.
- On ambiguity: pick the simpler option, implement, flag in report. Don't stall.

## 2. Project

**Hack2Hire** — hackathon management platform for the ACM Student Chapter, UMT Lahore. Replaces Google Forms + WhatsApp + spreadsheets. Functionally scoped Devpost clone: registration → team formation → submission → judging → public results/gallery. Name is branding only — **no recruiter/employer role in v1**; the public gallery is the "hire" surface.

**v1 success metric:** run one full hackathon end-to-end with zero fallback to spreadsheets.

**Confirmed decisions:**

- Open signup — no university domain restriction.
- Public project gallery + public participant profiles, on by default.
- Submitted projects go public **immediately on submission** (matches real Devpost). Scores/rankings stay private until `results_published_at` regardless.
- Auth via NextAuth.js (Auth.js v5). File storage via Vercel Blob. Authorization via full Postgres RLS with session-scoped variables.

**Out of scope for v1:** payments/ticketing, mentor booking, live chat/video, mobile apps, multi-tenancy switching, AI project evaluation, plagiarism detection.

## 3. Roles (event-scoped — stored in DB, read into the RLS session variable per request)

| Role          | Capability                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------- |
| `participant` | Register, form/join team, submit project, view own results                                    |
| `judge`       | View assigned submissions, score against rubric, leave feedback, recuse                       |
| `organizer`   | Create/manage events, problem statements, announcements, view all data                        |
| `admin`       | All of the above + role management + judge assignment + publish results + destructive actions |

A user can hold different roles on different events.

## 4. Functional Spec

**4.1 Auth & Profile**
NextAuth.js v5: Credentials provider (email/password, hashed with argon2) + Google OAuth provider. Credentials provider has no built-in email verification or password reset — implement both via a `verification_tokens` table + Resend email; login blocked until verified. Profile: name, university, department, batch year, avatar (Vercel Blob), bio, GitHub/LinkedIn/portfolio URLs, skill tags. Registration blocked until required profile fields complete.

**4.2 Events**
Fields: title, slug, tagline, description (markdown), cover image (Vercel Blob), mode (`online`/`onsite`/`hybrid`), venue, prize info, rules, FAQ, sponsors, `min_team_size`, `max_team_size`, optional participant cap + waitlist.
Timestamps (UTC): `registration_opens/closes`, `hackathon_starts`, `submission_deadline`, `judging_starts/ends`, `results_published_at`.
Status **derived from timestamps at read time** — never stored as a field that can drift out of sync.
Draft events visible only to organizers+.

**4.3 Problem Statements**
Per event: title, description (markdown), difficulty, sponsor, attachments (Vercel Blob), optional dataset link, `visible_from` timestamp.
Invisible before `visible_from` — **RLS policy checks `visible_from <= now() OR caller role IN (organizer, admin)`**, not just hidden in UI. Teams pick one statement, or mark "open track" if event allows.

**4.4 Teams**
Create (name, description) → creator = lead. Join via invite code or lead-approved request. Lead can remove members / transfer leadership. Solo allowed if `min_team_size = 1`. Membership locks at `submission_deadline`. One team per user per event.

**4.5 Registration**
Individual or team registration. Per-event custom questions stored as JSON schema + JSON answers (so organizers change questions without a migration). Admin: filterable table + CSV export. Onsite check-in toggle.

**4.6 Submissions**
One per team per event, editable until deadline. Fields: title, tagline, description, problem statement, tech stack tags, repo URL, demo URL, video URL, cover image (Vercel Blob), file upload (≤25MB, Vercel Blob). States: `draft` (excluded from judging) / `submitted` (public gallery immediately, per Sec. 2).
**Deadline enforcement, two layers:** a `BEFORE INSERT/UPDATE` trigger raising a clear custom exception ("Submissions closed at ...") for good error UX, backed by an RLS `WITH CHECK` policy as the hard backstop. Full revision history.

**4.7 Judging**
Admin defines rubric per event: named criteria, weight, max score (e.g. Innovation /10 ×0.3, Technical Complexity /10 ×0.3, Impact /10 ×0.2, Presentation /10 ×0.2).
Judge assignment: manual + auto round-robin with balanced load, excluding judges from their own team's submissions.
Judge UI: one submission at a time, rubric alongside, score + private comment + optional public feedback, save-draft → submit.
Aggregate: weighted average across judges. **Leaderboard/scores RLS-gated to admins + assigned judges only, until `results_published_at`.** Judges can recuse.

**4.8 Results & Public Gallery**
Admin publishes results + winners per category. Public gallery: all submitted projects, each with an SEO-ready public page (Server Component, SSR). Public participant profile shows hackathon history + projects — the recruiting surface, no separate role needed.

**4.9 Admin Dashboard**
Metrics: registrations over time, team formation rate, submission rate, judging completion %. Full CRUD all entities. Role management + judge invite by email. Announcements (optionally emailed to registrants). Bulk email by segment. Audit log of admin actions.

**4.10 Notifications**
Transactional email (Resend + React Email): verification, password reset, registration confirmed, team invite, submission received, deadline reminders (T-24h, T-1h), results published. In-app notification center.

## 5. Stack (fixed)

Next.js 15 (App Router, full-stack) · TypeScript strict · Tailwind CSS · shadcn/ui **only** (no other component libraries) · Zustand (client/UI state only) · TanStack Query (server state, caching, mutations) · TanStack Table (admin grids) · React Hook Form + Zod (shared client/server schema) · PostgreSQL via Docker (local dev) + Neon (production) · Prisma ORM · Auth.js / NextAuth v5 (Credentials + Google) · Vercel Blob (file storage) · Resend + React Email · Vercel (hosting) · Docker + docker-compose (local Postgres service) · GitHub Actions (CI/CD) · Vitest + Playwright · **npm** (package manager).

**Neon connection setup:** `DATABASE_URL` = pooled connection string (app runtime), `DIRECT_URL` = unpooled connection string (migrations) — both required in Prisma's `datasource` block; migrations must run against the direct connection.

Propose substitutions only with justification in a phase report — never swap silently.

## 6. Data Model

Implement approximately this via Prisma schema; refine types/relations as needed, but keep every table and unique constraint below.

```
profiles              id(=auth user id), full_name, university, department,
                       batch_year, avatar_url, bio, github_url, linkedin_url,
                       portfolio_url, skills[], created_at

events                 id, slug, title, tagline, description, cover_url, mode,
                       venue, rules, faq, prize_info, min_team_size, max_team_size,
                       participant_cap, custom_questions jsonb, is_published,
                       registration_opens_at, registration_closes_at, starts_at,
                       submission_deadline, judging_starts_at, judging_ends_at,
                       results_published_at, created_by, created_at

event_roles            id, event_id, user_id, role, UNIQUE(event_id,user_id,role)

problem_statements     id, event_id, title, description, difficulty, sponsor,
                       attachments jsonb, visible_from, created_at

teams                  id, event_id, name, description, invite_code UNIQUE,
                       lead_id, is_locked, created_at

team_members            id, team_id, user_id, joined_at, UNIQUE(team_id,user_id)

registrations           id, event_id, user_id, team_id?, answers jsonb,
                       status(registered|waitlisted|cancelled), checked_in_at,
                       created_at, UNIQUE(event_id,user_id)

submissions             id, event_id, team_id, problem_statement_id, title, tagline,
                       description, repo_url, demo_url, video_url, cover_url,
                       tech_stack[], attachments jsonb, status(draft|submitted),
                       submitted_at, created_at, updated_at, UNIQUE(event_id,team_id)

submission_revisions     id, submission_id, changed_by, diff jsonb, created_at

rubric_criteria           id, event_id, name, description, weight, max_score, sort_order

judge_assignments          id, event_id, judge_id, submission_id, status, recused,
                       UNIQUE(judge_id,submission_id)

scores                    id, assignment_id, criterion_id, score, comment,
                       UNIQUE(assignment_id,criterion_id)

judge_feedback              id, assignment_id, private_notes, public_feedback, submitted_at

verification_tokens          id, identifier, token UNIQUE, expires_at

announcements                 id, event_id, title, body, emailed_at, created_by, created_at
notifications                  id, user_id, type, payload jsonb, read_at, created_at
audit_logs                      id, actor_id, action, entity_type, entity_id, metadata jsonb, created_at
```

Index every FK + `events.slug`, `teams.invite_code`, `submissions.status`.

## 7. Security (non-negotiable)

1. RLS enabled on every table, default-deny. Policies read `current_setting('app.user_id')` / `current_setting('app.user_role')`, set per-request via the Prisma extension (Sec. 1).
2. Problem statements: RLS-gated by `visible_from`, per Sec. 4.3.
3. Submitted projects are public per Sec. 2 — but **scores/rankings** are RLS-gated to admins/assigned judges until `results_published_at`.
4. Deadline enforcement: trigger + RLS, per Sec. 4.6 — never client-code-only.
5. Rate-limit auth, invite-code lookup, uploads (e.g. Upstash Ratelimit).
6. Sanitize rendered markdown — no stored XSS via project descriptions.
7. Vercel Blob: private attachments served via short-lived signed URLs; public assets (cover images) served directly.
8. `NEXTAUTH_SECRET`, DB credentials, Blob tokens: server-only env vars, never in the client bundle.

## 8. UX Direction

Dark-mode default, light toggle. Mobile-first. ACM branding: `[[ primary color, logo path — provide ]]`. Empty states that say what to do next. Loading skeletons + error boundaries on every data view. Optimistic UI (TanStack Query) on team join/leave + submission autosave. Prominent countdown to active deadline on event page. WCAG AA, keyboard nav, visible focus states.

## 9. Git Workflow & Branching

```
feature/<feature-name>  →  integration  →  main
     (Preview)               (Preview)     (Production)
```

| Branch           | Purpose                                            | Deploys to                                      |
| ---------------- | -------------------------------------------------- | ----------------------------------------------- |
| `main`           | Production                                         | Vercel **Production** (only branch that does)   |
| `integration`    | Shared staging / merge point for finished features | Vercel **Preview** (stable branch URL)          |
| `feature/<name>` | One branch per task, cut from `integration`        | Vercel **Preview** (own ephemeral URL per push) |

Never push directly to `main` or `integration` — both protected, merge only via PR. Cut feature branches from `integration`. PR `feature/<name> → integration` first (CI must pass); promote with a separate, deliberate PR `integration → main` once verified on its Preview URL.

## 10. CI/CD

- `.github/workflows/ci.yml` ("Hack2Hire CI") is a pure quality gate: install, `prisma generate`, `prisma validate`, type check, lint, format check, build — on every push to `feature/**`/`integration`/`main` and every PR into `integration`/`main`. No deploy step.
- `.github/workflows/deploy-preview.yml` triggers via `workflow_run` once CI succeeds on `integration` or any `feature/*` push: `prisma migrate deploy` against the Preview DB, then `vercel pull` → `vercel build` → `vercel deploy --prebuilt` (Preview environment). Migrations complete before the app deploys.
- `.github/workflows/deploy-production.yml` — same shape, `main` only, `--prod` flags, `cancel-in-progress: false` so a production deploy is never interrupted mid-way.
- `vercel.json` sets `ignoreCommand: "exit 0"`, disabling Vercel's own git-triggered auto-builds — these three workflows are the only path to a deployment.
- **Gotcha:** `workflow_run` reads `deploy-preview.yml`/`deploy-production.yml` from the repo's default branch, not the branch that pushed — changes to those two files need merging to the default branch before they take effect.
- Secrets needed (scoped to GitHub Environments `Preview` / `production`): `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PREVIEW_DATABASE_URL`/`PREVIEW_DIRECT_DATABASE_URL`, `PRODUCTION_DATABASE_URL`/`PRODUCTION_DIRECT_DATABASE_URL`.

## 11. Phased Execution

| Phase                         | Scope                                                                                                            | Done when                                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| 0 Foundation                  | Repo, Next.js+TS+Tailwind+shadcn, Dockerfile + docker-compose (app+Postgres), Prisma init, Neon project, CI, env | `npm run dev` (or `docker compose up`) runs against local Postgres; CI green on empty PR   |
| 1 Auth & Profiles             | NextAuth (Credentials+Google), verification/reset via Resend, profile CRUD, roles, RLS extension wired up        | User signs up → verifies → completes profile → promoted to admin                           |
| 2 Events & Problem Statements | Event CRUD, public event page (SSR), timed-release statements via RLS                                            | Admin schedules a statement that stays hidden until release time, even via direct API call |
| 3 Teams & Registration        | Team CRUD, invite codes, registration + custom Qs, CSV export                                                    | 5 seeded users form 2 teams and register                                                   |
| 4 Submissions                 | CRUD, draft/submit, Vercel Blob uploads, trigger+RLS deadline enforcement, revisions                             | Post-deadline write rejected by DB with a clear error, not just UI                         |
| 5 Judging                     | Rubric builder, assignment (manual+auto), scoring UI, aggregation, RLS-hidden leaderboard                        | 3 judges score 6 submissions; weighted ranking correct                                     |
| 6 Results & Gallery           | Publish results, winners, public gallery, public project/profile pages, OG metadata                              | Publish flips visibility atomically for all participants                                   |
| 7 Notifications & Polish      | Transactional email, reminders, in-app notifications, announcements, metrics, audit log                          | Full mock hackathon dry-run, zero manual DB edits                                          |

## 12. Deliverables

Working Next.js app (conventional structure, `output: 'standalone'` in `next.config.js`) · `Dockerfile` (multi-stage: dependencies/development/builder/runner) + `.dockerignore` + `docker-compose.yml` (Postgres + app, local dev) · Prisma schema + versioned migrations incl. hand-written RLS SQL · Prisma seed script (`npx prisma db seed`) producing 1 event, 4 problem statements, 20 participants, 6 teams, 6 submissions, 3 judges w/ partial scores · `.env.example` (`DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_URL`, `NEXTAUTH_SECRET`, `GOOGLE_CLIENT_ID/SECRET`, `BLOB_READ_WRITE_TOKEN`, `RESEND_API_KEY`) · `README.md` (Docker setup, Neon setup, migrations, deploy) · `docs/ADMIN_GUIDE.md` (non-technical run-through) · Playwright tests on the 3 critical flows · `AGENTS.md` / `CLAUDE.md` (repo conventions) · `.github/workflows/ci.yml` + `deploy-preview.yml` + `deploy-production.yml` + `vercel.json` (CI/CD, per Sec. 9–10).

## 13. Acceptance Criteria

- [ ] Signup → submitted project with zero organizer intervention.
- [ ] No API-level access to a problem statement before `visible_from` — verified by calling the Route Handler directly, not just checking the UI.
- [ ] No submission/edit accepted after `submission_deadline`.
- [ ] No score/ranking visible to anyone but admins/assigned judges before publish.
- [ ] Admin runs the full event lifecycle with zero direct SQL access.
- [ ] Every list view: search + filter + pagination + CSV export.
- [ ] Lighthouse ≥ 90 on public event page.
- [ ] `npm run type-check && npm run lint && npm run format:check && npm run build` clean.
- [ ] Only `main` deploys to Production (via `deploy-production.yml`); `integration` and `feature/*` deploy to Preview only (via `deploy-preview.yml`); no other branch triggers a deployment.

## 14. Remaining Open Calls (default given — flag when reached, don't stall)

1. Blind judging (hide participant identity from judges)? **Default: not blind.**
2. Certificate generation — v1 or v2? **Default: v2.**
3. Can teams re-form mid-event, or lock at registration? **Default: lock at `submission_deadline`, open until then.**
