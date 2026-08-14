<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# hack2hire

**Hackathon platform · ACM Student Chapter, University of Management and Technology (UMT), Lahore**

> Single source of truth for all AI agents and human contributors working in this repository.
> If a rule here conflicts with your training data, **this file wins**.
> If a rule here conflicts with `node_modules/next/dist/docs/`, **the local docs win** for framework APIs only — architecture rules in this file still apply.

---

## Table of contents

1. [Project overview](#1-project-overview)
2. [Golden rules](#2-golden-rules)
3. [Stack of record](#3-stack-of-record)
4. [Repository structure](#4-repository-structure)
5. [Routing map](#5-routing-map)
6. [Feature architecture contract](#6-feature-architecture-contract)
7. [Data flow contract](#7-data-flow-contract)
8. [API contract and error model](#8-api-contract-and-error-model)
9. [TanStack Query conventions](#9-tanstack-query-conventions)
10. [Forms and validation](#10-forms-and-validation)
11. [UI and shadcn rules](#11-ui-and-shadcn-rules)
12. [Animation rules](#12-animation-rules)
13. [SEO rules](#13-seo-rules)
14. [Authentication and RBAC](#14-authentication-and-rbac)
15. [Domain model](#15-domain-model)
16. [TypeScript rules](#16-typescript-rules)
17. [TSDoc rules](#17-tsdoc-rules)
18. [Naming conventions](#18-naming-conventions)
19. [Loading, error, and empty states](#19-loading-error-and-empty-states)
20. [Accessibility](#20-accessibility)
21. [Performance](#21-performance)
22. [Security](#22-security)
23. [Environment variables](#23-environment-variables)
24. [Testing](#24-testing)
25. [Git and PR conventions](#25-git-and-pr-conventions)
26. [Scripts](#26-scripts)
27. [Definition of done](#27-definition-of-done)
28. [Never do this](#28-never-do-this)
29. [Playbooks](#29-playbooks)
30. [Open decisions](#30-open-decisions)

---

## 1. Project overview

**Product:** **hack2hire** — a Devpost-style hackathon platform built and operated by the ACM Student Chapter at the University of Management and Technology (UMT), Lahore.

**Brand rules — apply consistently, agents must not improvise variants:**

| Context | Value |
| --- | --- |
| Product name (all prose, UI, metadata) | `hack2hire` — always lowercase, no space, digit `2` |
| Never write | `Hack2Hire`, `Hack2hire`, `HACK2HIRE`, `hack-2-hire`, `hack to hire` |
| Sentence-start exception | None. Rewrite the sentence rather than capitalising the name |
| Package name | `hack2hire` |
| Title template | `%s | hack2hire` |
| Tagline (default) | `Build. Ship. Get hired.` |
| Positioning line | `Hackathons by ACM UMT — where student projects turn into offers.` |
| Owning organisation (JSON-LD `Organization`) | `ACM Student Chapter, UMT Lahore` |

All name/tagline/URL literals live in `src/config/site.ts` and are imported from there. **Never hardcode the product name in a component, email template, or metadata call** — one rename must be a one-file change.

**Primary jobs to be done:**

| Actor | Needs to |
| --- | --- |
| Participant | Discover hackathons, register, form/join a team, read problem statements, submit a project, track results |
| Admin / Organizer | Create hackathons, publish problem statements, view and export participants, manage teams, review and score submissions, publish results, broadcast announcements |
| Judge | See assigned submissions, score them against rubric criteria, leave feedback |
| Visitor (unauthenticated) | Browse hackathons and the public project gallery — this is the SEO surface |

**Non-goals (v1):** payments, real-time collaborative editing, in-app chat, mobile apps, multi-tenant white-labelling for other universities.

**Success criteria:** a hackathon can be run end-to-end — created, promoted, registered for, submitted to, judged, and published — without anyone touching the database directly.

**Audience note:** organizers are student volunteers who rotate every year. Every admin action must be doable through the UI, and the code must be readable by a second-year CS student.

---

## 2. Golden rules

These are non-negotiable. A PR violating any of these is rejected.

1. **Read `node_modules/next/dist/docs/` before writing framework code.** Never assume a Next.js API from memory.
2. **No `"use client"` or `"use server"` directive inside any `page.tsx`, `layout.tsx`, `template.tsx`, or `route.ts`.** Interactivity lives in feature components that carry their own directive.
3. **Feature-based architecture only.** Domain code lives in `src/features/<feature-name>/`. Nothing domain-specific goes in `src/components/` or `src/lib/`.
4. **Services own network calls. Hooks own cache. Components own rendering.** A component never calls `fetch`. A service never imports TanStack Query.
5. **shadcn/ui is the only component library.** No MUI, Chakra, Ant, DaisyUI, or hand-rolled primitives that shadcn already provides.
6. **Every route exports SEO metadata.** Static via `metadata`, dynamic via `generateMetadata`. No route ships without it.
7. **Framer Motion for all animation.** No CSS keyframe animations for anything beyond `tailwindcss-animate` primitives already used by shadcn.
8. **Full type safety. `any` is banned.** `unknown` + a Zod parse is the escape hatch.
9. **TSDoc on every exported symbol and a file header on every file.**
10. **Zod schema is the single source of truth for every shape crossing a boundary.** Types are inferred from schemas, never hand-written in parallel.
11. **Validate on the server, always.** Client validation is UX; server validation is the security boundary.
12. **Authorize on the server, always.** Never trust a role sent from the client.
13. **Write it reusable or write it once.** If logic appears twice, extract it before the third occurrence.
14. **No dead code, no commented-out code, no `console.log` in committed code.** Use the logger.
15. **`pnpm typecheck && pnpm lint && pnpm test` must pass before any commit.**

---

## 3. Stack of record

Locked choices. Do not introduce alternatives without updating this table in the same PR.

| Concern | Choice | Rationale |
| --- | --- | --- |
| Framework | Next.js (App Router) — **check installed version in `package.json`** | RSC-first, best-in-class SEO, Vercel deploy |
| Language | TypeScript, `strict: true` | Non-negotiable type safety |
| UI components | shadcn/ui (Radix + Tailwind) | Owned source, no lock-in, accessible primitives |
| Styling | Tailwind CSS | Colocated, tree-shaken, matches shadcn |
| Icons | `lucide-react` | shadcn default |
| Animation | Framer Motion (`motion/react` — verify installed package name) | Declarative, layout animations, reduced-motion support |
| Server state | TanStack Query v5 | Cache, retries, invalidation, optimistic updates |
| Client state | React state + `zustand` **only if** a value is needed by 3+ unrelated components | Avoid premature global state |
| Forms | `react-hook-form` + `@hookform/resolvers/zod` + shadcn `Form` | Uncontrolled = fewer re-renders, Zod shared with server |
| Validation | Zod | One schema, client + server + inferred types |
| Database | PostgreSQL (Neon or Supabase free tier) | Relational domain, free for a student chapter |
| ORM | Drizzle ORM | Fully typed, SQL-transparent, tiny runtime |
| Auth | Better Auth (email/password + Google OAuth, with organization/role support) | Type-safe, self-hosted, no seat pricing |
| File uploads | UploadThing (or Supabase Storage if already on Supabase) | Avatars, screenshots, submission assets |
| Transactional email | Resend + React Email | Verification, invites, announcements |
| Tables (admin) | TanStack Table + shadcn `DataTable` | Sorting, filtering, pagination, CSV export |
| Charts (admin) | Recharts | shadcn `Chart` wraps it |
| Dates | `date-fns` + `date-fns-tz` | Deadlines are timezone-critical |
| Notifications | `sonner` (shadcn toast) | shadcn default |
| Markdown | `react-markdown` + `remark-gfm` + `rehype-sanitize` | Problem statements and project descriptions |
| Rate limiting | `@upstash/ratelimit` + Upstash Redis | Protects auth and submission endpoints |
| Logging | `pino` server-side; typed `logger` wrapper | Never `console.log` |
| Unit tests | Vitest + React Testing Library | Fast, ESM-native |
| E2E tests | Playwright | Register → submit → judge flows |
| Package manager | pnpm | Fast, strict node_modules |
| Hosting | Vercel | Zero-config for this stack |

> **If the repo already uses a different tool than listed here, the repo wins — update this table in your PR rather than migrating silently.**

---

## 4. Repository structure

```
.
├── src/
│   ├── app/                          # Routing ONLY. No business logic.
│   │   ├── (marketing)/              # Public, indexed
│   │   ├── (auth)/                   # Login/register, noindex
│   │   ├── (participant)/            # Authenticated participant area, noindex
│   │   ├── (admin)/                  # Admin + organizer area, noindex
│   │   ├── api/                      # Route handlers (the backend)
│   │   ├── layout.tsx                # Root layout: providers, fonts, metadataBase
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── manifest.ts
│   │   ├── not-found.tsx
│   │   ├── global-error.tsx
│   │   └── globals.css
│   │
│   ├── features/                     # ALL domain code lives here
│   │   └── <feature-name>/
│   │       ├── components/
│   │       ├── hooks/
│   │       ├── utils/
│   │       ├── helpers/
│   │       ├── schema/
│   │       ├── services/
│   │       ├── types/
│   │       └── index.ts              # Public barrel — the feature's only export surface
│   │
│   ├── components/                   # Cross-feature, domain-agnostic UI
│   │   ├── ui/                       # shadcn generated — DO NOT hand-edit unless restyling globally
│   │   ├── layout/                   # Navbar, Footer, Sidebar, AdminShell
│   │   ├── motion/                   # Reusable Framer Motion wrappers
│   │   ├── seo/                      # JsonLd, StructuredData helpers
│   │   └── shared/                   # EmptyState, ErrorState, PageHeader, DataTable, ConfirmDialog
│   │
│   ├── lib/                          # Framework-level infrastructure, no domain knowledge
│   │   ├── api-client.ts             # Typed fetch wrapper used by ALL services
│   │   ├── api-response.ts           # Server-side ok()/fail() envelope builders
│   │   ├── api-handler.ts            # Route handler wrapper: auth + validation + error mapping
│   │   ├── errors.ts                 # ApiError, ErrorCode enum
│   │   ├── auth.ts                   # Auth instance
│   │   ├── auth-guards.ts            # requireUser(), requireRole()
│   │   ├── db/                       # Drizzle client, schema, migrations
│   │   ├── query-client.ts           # TanStack Query factory + defaults
│   │   ├── seo.ts                    # buildMetadata(), SITE constants
│   │   ├── motion.ts                 # Shared variants, transitions, easings
│   │   ├── logger.ts
│   │   ├── rate-limit.ts
│   │   ├── env.ts                    # Zod-validated environment variables
│   │   └── utils.ts                  # cn() and other truly generic helpers
│   │
│   ├── config/
│   │   ├── site.ts                   # SITE: name, tagline, url, socials, default OG — single source of brand truth
│   │   ├── navigation.ts             # Nav trees per role
│   │   └── constants.ts              # Enums-as-consts, limits, page sizes
│   │
│   ├── providers/
│   │   ├── query-provider.tsx        # "use client"
│   │   ├── theme-provider.tsx        # "use client"
│   │   └── index.tsx                 # Composed <AppProviders>
│   │
│   ├── hooks/                        # Generic hooks only (useMediaQuery, useDebounce)
│   ├── types/                        # Global ambient types, api.d.ts, next-env additions
│   ├── emails/                       # React Email templates
│   └── styles/
│
├── public/
├── tests/
│   ├── unit/
│   └── e2e/
├── drizzle/                          # Generated migrations
├── AGENTS.md
├── CLAUDE.md
└── package.json
```

### Feature list (v1)

`auth` · `users` · `hackathons` · `problem-statements` · `teams` · `registrations` · `submissions` · `judging` · `announcements` · `admin-dashboard` · `notifications` · `media`

> Note: the folder is `src/features/` (plural) rather than `/feature`. Rename in one place if you prefer the singular — but keep it consistent everywhere.

---

## 5. Routing map

| Route | Group | Access | Indexed |
| --- | --- | --- | --- |
| `/` | marketing | public | ✅ |
| `/hackathons` | marketing | public | ✅ |
| `/hackathons/[slug]` | marketing | public | ✅ |
| `/hackathons/[slug]/problems` | marketing | public | ✅ |
| `/hackathons/[slug]/problems/[problemSlug]` | marketing | public | ✅ |
| `/hackathons/[slug]/projects` | marketing | public (after submission deadline) | ✅ |
| `/hackathons/[slug]/projects/[submissionSlug]` | marketing | public | ✅ |
| `/hackathons/[slug]/results` | marketing | public (after publish) | ✅ |
| `/about`, `/faq`, `/contact`, `/code-of-conduct`, `/privacy`, `/terms` | marketing | public | ✅ |
| `/login`, `/register`, `/forgot-password`, `/reset-password`, `/verify-email` | auth | guest only | ❌ |
| `/dashboard` | participant | authenticated | ❌ |
| `/dashboard/registrations` | participant | authenticated | ❌ |
| `/dashboard/teams`, `/dashboard/teams/[teamId]` | participant | authenticated | ❌ |
| `/dashboard/submissions`, `/dashboard/submissions/[id]/edit` | participant | authenticated | ❌ |
| `/dashboard/profile`, `/dashboard/settings` | participant | authenticated | ❌ |
| `/judge`, `/judge/[submissionId]` | judge | JUDGE | ❌ |
| `/admin` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons`, `/admin/hackathons/new`, `/admin/hackathons/[id]` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons/[id]/problems` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons/[id]/participants` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons/[id]/teams` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons/[id]/submissions`, `/admin/hackathons/[id]/submissions/[submissionId]` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/hackathons/[id]/judging` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/announcements` | admin | ADMIN, ORGANIZER | ❌ |
| `/admin/users` | admin | ADMIN | ❌ |
| `/admin/settings` | admin | ADMIN | ❌ |

**Public project galleries and hackathon pages are the growth engine.** Every participant will share their project link — treat those pages as the highest-priority SEO surface in the product.

---

## 6. Feature architecture contract

Each folder has exactly one job. Do not blur them.

### `components/`

React components scoped to this feature. Client components carry `"use client"` at the top; presentational components stay server-compatible where possible.

- One component per file, named export **and** matching filename in kebab-case.
- Props interface is always named `<ComponentName>Props` and exported.
- Split "container" (calls the hook) from "presentational" (takes props) when a component exceeds ~150 lines.
- A `*-view.tsx` component is the single entry point a `page.tsx` renders.

### `hooks/`

TanStack Query wrappers around services, plus feature-local UI hooks.

- One hook per file: `use-<thing>.ts`.
- Query hooks: `use<Thing>Query` / `use<Things>Query`.
- Mutation hooks: `useCreate<Thing>` / `useUpdate<Thing>` / `useDelete<Thing>`.
- **Hooks are the only place TanStack Query is imported outside `providers/`.**

### `services/`

Pure async functions that talk to the backend. **This is the only layer allowed to touch `apiClient`.**

- Signature is always `(data: TInput) => Promise<TOutput>` — a single `data` parameter object, even for one field.
- Read services with no input take zero args or a single `params` object.
- Never import React, never import TanStack Query, never handle UI concerns.
- Always parse the response with the Zod schema before returning.

```ts
export async function createSubmission(
  data: CreateSubmissionInput,
): Promise<Submission> {
  const response = await apiClient.post<unknown>("/submissions", data);
  return submissionSchema.parse(response);
}
```

### `schema/`

Zod schemas. Source of truth for every boundary shape.

- `<entity>.schema.ts` exports the entity schema plus input schemas (`create*`, `update*`, `*Filters`).
- Types are inferred and re-exported from `types/`.
- Shared by the form resolver **and** the route handler validator. Never duplicate.

### `types/`

TypeScript types for the feature.

- Prefer `z.infer<typeof schema>` over hand-written interfaces.
- Hand-write only what has no runtime shape (component prop unions, discriminated UI states).
- Never `export type Foo = any`.

### `utils/`

**Pure, stateless, generic-within-the-feature functions.** No I/O, no React, no imports from `services/` or `hooks/`. Deterministic input → output. These are the easiest things to unit test, and they must be tested.

_Example:_ `slugify-submission-title.ts`, `calculate-weighted-score.ts`.

### `helpers/`

**Feature-specific glue that composes utils, constants, and domain rules.** May import from `utils/`, `schema/`, `types/`, and `config/`. Still no I/O and no React hooks.

_Example:_ `get-submission-status-label.ts`, `can-user-edit-submission.ts`, `build-hackathon-timeline.ts`.

> Rule of thumb: **`utils` = "how"** (mechanics, reusable anywhere). **`helpers` = "what it means here"** (domain semantics). If it mentions a domain concept in its name, it's a helper.

### `index.ts` (barrel)

Every feature exports its public surface through `index.ts`. Cross-feature imports **must** go through the barrel:

```ts
// ✅
import { useSubmissionsQuery, SubmissionCard } from "@/features/submissions";

// ❌
import { SubmissionCard } from "@/features/submissions/components/submission-card";
```

Do not re-export everything — only what other features and pages legitimately need. Internal components stay internal.

### Cross-feature dependency rules

- A feature may import from `lib/`, `config/`, `components/`, `hooks/`, `types/`.
- A feature may import another feature **only via its barrel**, and only downward through this order: `auth → users → hackathons → problem-statements → registrations → teams → submissions → judging → announcements → admin-dashboard`.
- **Circular feature imports are forbidden.** If two features need each other, the shared piece belongs in `lib/` or a new lower-level feature.

---

## 7. Data flow contract

```
page.tsx (Server Component)
  ├─ generateMetadata()            ← SEO
  ├─ auth guard (requireRole)      ← authorization
  ├─ optional prefetch + HydrationBoundary
  └─ renders <FeatureView />       ← "use client" lives here, not in page.tsx
                │
                └─ useThingQuery() / useCreateThing()   [features/*/hooks]
                        │
                        └─ getThing(data) / createThing(data)   [features/*/services]
                                │
                                └─ apiClient  →  /api/*  (route handler)
                                        │
                                        ├─ requireRole()
                                        ├─ schema.parse(body)
                                        ├─ db query (Drizzle)
                                        └─ ok(data) | fail(error)
```

### `page.tsx` rules — strict

A `page.tsx` may contain **only**:

1. `export const metadata` or `export async function generateMetadata()`
2. `export const revalidate` / `dynamic` / `dynamicParams` when needed
3. `generateStaticParams()` when applicable
4. Awaiting and validating route `params` / `searchParams` (**check the local Next.js docs — these are async in recent versions**)
5. An auth/role guard
6. Optional server-side prefetch into a `HydrationBoundary`
7. A single feature view component render
8. JSON-LD injection

It may **not** contain: `"use client"`, `"use server"`, JSX layout beyond the view wrapper, business logic, `fetch` calls, or state.

```tsx
/**
 * @file Public hackathon detail route.
 */

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { notFound } from "next/navigation";

import { HackathonDetailView, hackathonKeys, getHackathonBySlug } from "@/features/hackathons";
import { JsonLd } from "@/components/seo/json-ld";
import { buildMetadata } from "@/lib/seo";
import { getServerQueryClient } from "@/lib/query-client";

interface HackathonPageProps {
  /** Route parameters. Verify sync vs. async shape against the installed Next.js docs. */
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: HackathonPageProps) {
  const { slug } = await params;
  const hackathon = await getHackathonBySlug({ slug });

  return buildMetadata({
    title: hackathon.title,
    description: hackathon.shortDescription,
    path: `/hackathons/${hackathon.slug}`,
    image: hackathon.coverImageUrl,
    type: "article",
  });
}

export default async function HackathonPage({ params }: HackathonPageProps) {
  const { slug } = await params;
  const queryClient = getServerQueryClient();

  const hackathon = await queryClient
    .fetchQuery({
      queryKey: hackathonKeys.detail(slug),
      queryFn: () => getHackathonBySlug({ slug }),
    })
    .catch(() => null);

  if (!hackathon) notFound();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <JsonLd schema={buildHackathonEventSchema(hackathon)} />
      <HackathonDetailView slug={slug} />
    </HydrationBoundary>
  );
}
```

### Server Actions

Server Actions are permitted **only** in `src/features/<feature>/actions/` (create the folder when first needed), never inline in `page.tsx`. Prefer route handlers + services for anything the client needs to cache, retry, or optimistically update. Use Server Actions only for progressive-enhancement forms with no client cache implications.

---

## 8. API contract and error model

### Response envelope

Every route handler returns one of:

```ts
{ success: true;  data: T }
{ success: false; error: { code: ErrorCode; message: string; details?: unknown } }
```

`apiClient` unwraps `data` on success and throws `ApiError` on failure, so services never see the envelope.

### Error codes

```ts
export const ERROR_CODE = {
  UNAUTHENTICATED: "UNAUTHENTICATED",   // 401
  FORBIDDEN: "FORBIDDEN",               // 403
  NOT_FOUND: "NOT_FOUND",               // 404
  VALIDATION_ERROR: "VALIDATION_ERROR", // 422
  CONFLICT: "CONFLICT",                 // 409
  RATE_LIMITED: "RATE_LIMITED",         // 429
  DEADLINE_PASSED: "DEADLINE_PASSED",   // 409 — domain-specific
  INTERNAL_ERROR: "INTERNAL_ERROR",     // 500
} as const;
```

Never leak stack traces, SQL, or raw exception messages to the client. Log the real error server-side with `logger.error`, return a safe `message`.

### Route handler shape

Every handler is wrapped by `createApiHandler` from `lib/api-handler.ts`, which centralises auth, body validation, and error mapping:

```ts
/**
 * @file Submissions collection route handler.
 */

export const POST = createApiHandler({
  roles: ["PARTICIPANT", "ADMIN"],
  bodySchema: createSubmissionSchema,
  handler: async ({ body, user }) => {
    const submission = await submissionRepository.create({ ...body, userId: user.id });
    return submission;
  },
});
```

### REST conventions

- Plural nouns: `/api/hackathons`, `/api/submissions`.
- Nesting max one level: `/api/hackathons/[id]/submissions`.
- Filtering/pagination via query params: `?page=1&pageSize=20&status=SUBMITTED&q=ai`.
- List responses are always paginated: `{ items, page, pageSize, total, totalPages }`.
- Mutations return the full updated resource, never a bare `{ ok: true }`.

---

## 9. TanStack Query conventions

### Defaults (`lib/query-client.ts`)

```ts
staleTime: 60_000,
gcTime: 5 * 60_000,
retry: (failureCount, error) =>
  error instanceof ApiError && error.status < 500 ? false : failureCount < 2,
refetchOnWindowFocus: false,
```

Never retry 4xx. Never silently swallow errors.

### Query key factories

Every feature exports a key factory from `hooks/` (or `<feature>.keys.ts`). Hand-written string arrays are forbidden.

```ts
export const submissionKeys = {
  all: ["submissions"] as const,
  lists: () => [...submissionKeys.all, "list"] as const,
  list: (filters: SubmissionFilters) => [...submissionKeys.lists(), filters] as const,
  details: () => [...submissionKeys.all, "detail"] as const,
  detail: (id: string) => [...submissionKeys.details(), id] as const,
} satisfies Record<string, unknown>;
```

### Hook shape

```ts
/**
 * Fetches a paginated list of submissions for a hackathon.
 *
 * @param filters - Pagination, status, and search filters.
 * @returns TanStack Query result containing the paginated submissions.
 */
export function useSubmissionsQuery(filters: SubmissionFilters) {
  return useQuery({
    queryKey: submissionKeys.list(filters),
    queryFn: () => getSubmissions(filters),
    placeholderData: keepPreviousData,
  });
}
```

### Mutations

- Always invalidate the narrowest key that covers the change.
- Use optimistic updates for high-frequency, low-risk actions (bookmarking, judge score drafts). Always implement `onError` rollback via context.
- Toast on success and error with `sonner`; do not toast silently-expected failures.

---

## 10. Forms and validation

- `react-hook-form` + `zodResolver` + shadcn `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`.
- The schema comes from `features/<feature>/schema/` — the same schema the route handler uses.
- `mode: "onBlur"`, `reValidateMode: "onChange"`.
- Disable the submit button while `isPending`; show a `Loader2` spinner inside it.
- Map server `VALIDATION_ERROR.details` back to fields via `setError`.
- Multi-step forms (hackathon creation) use a single schema composed of per-step sub-schemas, validated per step.
- Never nest a `<form>` inside a `<form>`. Never use raw `<input>` where a shadcn `Input` exists.

---

## 11. UI and shadcn rules

- Install components with the shadcn CLI. Do not copy-paste by hand.
- `src/components/ui/` is generated code. Edit it only to apply a **global** design change; feature tweaks go through props, `className`, and `cva` variants.
- Compose with `cn()` from `lib/utils`. Never string-concatenate class names.
- Theme via CSS variables in `globals.css`. No hardcoded hex values in components.
- Dark mode via `next-themes`; every component must be legible in both themes.
- Responsive, mobile-first. Admin tables collapse to card lists below `md`.
- Reusable shared components live in `components/shared/`: `PageHeader`, `EmptyState`, `ErrorState`, `LoadingState`, `DataTable`, `ConfirmDialog`, `StatusBadge`, `CopyButton`, `Pagination`.
- Any UI pattern used in 3+ places becomes a shared component. No exceptions.
- Design tone: clean, technical, high-contrast. This is a developer-facing product — restraint over decoration.

---

## 12. Animation rules

- Framer Motion only. Verify the installed import path (`framer-motion` vs `motion/react`) in `package.json` before writing imports.
- Motion requires client components. Wrap, don't convert: put motion in `components/motion/` (`FadeIn`, `SlideUp`, `StaggerContainer`, `StaggerItem`, `AnimatedCounter`, `PageTransition`) so server components stay server components.
- Shared variants, durations, and easings live in `lib/motion.ts`. No inline magic numbers.
- Baseline: `duration: 0.3–0.4s`, `ease: [0.22, 1, 0.36, 1]`. Stagger children at `0.06s`.
- **Always respect `prefers-reduced-motion`** via `useReducedMotion()`; degrade to opacity-only or no animation.
- Use `whileInView` with `viewport={{ once: true, margin: "-80px" }}` for scroll reveals.
- Do not animate `width`/`height`/`top`/`left`. Animate `transform` and `opacity`. Use `layout` for size changes.
- Never animate above-the-fold LCP content on entry — it hurts Core Web Vitals.
- Admin tables and dense data views get **no** entrance animation. Animation is for marketing surfaces and state transitions, not data grids.

---

## 13. SEO rules

Every route ships SEO. This is a hard gate.

### Central helper

All metadata is produced by `buildMetadata()` in `lib/seo.ts`, which enforces title templates, canonical URLs, OG, and Twitter cards.

```ts
export function buildMetadata(input: BuildMetadataInput): Metadata;
```

### Required per route

- `title` (unique, ≤ 60 chars) and `description` (unique, 140–160 chars)
- `alternates.canonical` — absolute URL
- `openGraph`: `title`, `description`, `url`, `siteName`, `type`, `locale: "en_PK"`, `images` (1200×630)
- `twitter`: `card: "summary_large_image"`
- `keywords` where genuinely relevant — do not stuff
- `robots: { index: false, follow: false }` on all `(auth)`, `(participant)`, `(admin)`, and `(judge)` routes

### Root layout

- `metadataBase: new URL(env.NEXT_PUBLIC_APP_URL)`
- `title: { default: SITE.defaultTitle, template: `%s | ${SITE.name}` }` — resolves to `%s | hack2hire`; the default title is `hack2hire — Build. Ship. Get hired.`
- `lang="en"`, correct `<html>` attributes, theme color, icons, `manifest`

### Structured data (JSON-LD)

Injected via `<JsonLd />` from `components/seo/`:

| Page | Schema |
| --- | --- |
| Root layout | `Organization` + `WebSite` (with `SearchAction`) |
| Hackathon detail | `Event` (`startDate`, `endDate`, `location`, `organizer`, `eventAttendanceMode`, `offers` if free) |
| Project detail | `CreativeWork` + `Person`/`Organization` author |
| FAQ page | `FAQPage` |
| Any nested page | `BreadcrumbList` |

### Files

- `app/sitemap.ts` — static routes + dynamic hackathons, problem statements, and public submissions, with real `lastModified`
- `app/robots.ts` — allow public, disallow `/admin`, `/dashboard`, `/judge`, `/api`
- `app/opengraph-image.tsx` per dynamic route where a branded OG image adds value
- `app/manifest.ts`

### Content rules

- Exactly one `<h1>` per page; correct heading order.
- All `next/image` usage requires meaningful `alt`.
- Descriptive link text — never "click here".
- Slugs are lowercase, hyphenated, stable. **Never change a published slug**; if you must, add a redirect.
- Public hackathon and project pages should be statically generated or ISR-cached where possible.

---

## 14. Authentication and RBAC

### Roles

```ts
export const ROLE = {
  PARTICIPANT: "PARTICIPANT",
  JUDGE: "JUDGE",
  ORGANIZER: "ORGANIZER",
  ADMIN: "ADMIN",
} as const;
```

Hierarchy: `ADMIN > ORGANIZER > JUDGE > PARTICIPANT`. `ADMIN` can do everything.

### Enforcement layers — all three are required

1. **Route protection** (middleware or the framework's current equivalent — **check the local docs; `middleware.ts` conventions may have changed**): redirect unauthenticated users away from protected groups. This is UX, not security.
2. **Page guard**: every protected `page.tsx` calls `requireRole([...])` from `lib/auth-guards.ts`.
3. **API guard**: every route handler declares `roles` in `createApiHandler`. **This is the real security boundary.**

Additionally, enforce **resource ownership**: a participant may only mutate a submission belonging to a team they are a member of. Role alone is never sufficient for row-level access — check ownership in the repository layer.

### Rules

- Session read on the server via the auth instance. Never store role in `localStorage`.
- Client-side role checks are for hiding UI only. Assume the client is hostile.
- University email domain (`@umt.edu.pk`) may be required for participant registration — configurable via `config/constants.ts`, not hardcoded in logic.
- Email verification required before submission creation.
- Password reset tokens single-use, 1-hour expiry.
- Rate limit `login`, `register`, `forgot-password`: 5 attempts / 15 min / IP.

---

## 15. Domain model

Drizzle schema lives in `src/lib/db/schema/`, one file per aggregate, re-exported from `schema/index.ts`.

### Core entities

**`users`** — `id`, `name`, `email` (unique), `emailVerified`, `image`, `role`, `university`, `rollNumber`, `department`, `graduationYear`, `bio`, `githubUrl`, `linkedinUrl`, `portfolioUrl`, `createdAt`, `updatedAt`

**`hackathons`** — `id`, `slug` (unique), `title`, `shortDescription`, `description` (markdown), `coverImageUrl`, `status` (`DRAFT | PUBLISHED | REGISTRATION_OPEN | ONGOING | JUDGING | COMPLETED | ARCHIVED`), `mode` (`ONSITE | ONLINE | HYBRID`), `venue`, `registrationOpensAt`, `registrationClosesAt`, `startsAt`, `endsAt`, `submissionDeadline`, `resultsPublishedAt`, `minTeamSize`, `maxTeamSize`, `maxTeams`, `prizePool`, `rules` (markdown), `createdById`, timestamps

**`problem_statements`** — `id`, `hackathonId`, `slug`, `title`, `description` (markdown), `difficulty` (`EASY | MEDIUM | HARD`), `track`, `attachmentsUrl[]`, `sponsorName`, `maxTeams`, `order`, `isPublished`, timestamps

**`registrations`** — `id`, `hackathonId`, `userId`, `status` (`PENDING | APPROVED | REJECTED | WAITLISTED | CANCELLED`), `dietaryPreference`, `tshirtSize`, `emergencyContact`, `registeredAt` — unique on `(hackathonId, userId)`

**`teams`** — `id`, `hackathonId`, `name`, `slug`, `inviteCode` (unique), `problemStatementId`, `leaderId`, `status`, `isLocked`, timestamps

**`team_members`** — `id`, `teamId`, `userId`, `role` (`LEADER | MEMBER`), `joinedAt` — unique on `(teamId, userId)`

**`submissions`** — `id`, `hackathonId`, `teamId`, `problemStatementId`, `slug`, `title`, `tagline`, `description` (markdown), `repositoryUrl`, `liveDemoUrl`, `videoUrl`, `presentationUrl`, `techStack[]`, `coverImageUrl`, `galleryUrls[]`, `status` (`DRAFT | SUBMITTED | UNDER_REVIEW | SHORTLISTED | REJECTED | WINNER`), `submittedAt`, `isPublic`, timestamps — unique on `(hackathonId, teamId)`

**`judging_criteria`** — `id`, `hackathonId`, `name`, `description`, `weight`, `maxScore`, `order`

**`judge_assignments`** — `id`, `hackathonId`, `judgeId`, `submissionId`, `status`

**`scores`** — `id`, `submissionId`, `judgeId`, `criterionId`, `score`, `comment`, timestamps — unique on `(submissionId, judgeId, criterionId)`

**`submission_reviews`** — `id`, `submissionId`, `reviewerId`, `feedback`, `isInternal`, timestamps

**`announcements`** — `id`, `hackathonId` (nullable = global), `title`, `body` (markdown), `audience` (`ALL | PARTICIPANTS | JUDGES`), `publishedAt`, `createdById`

**`audit_logs`** — `id`, `actorId`, `action`, `entityType`, `entityId`, `metadata` (jsonb), `createdAt`

### Data rules

- **All timestamps stored in UTC** (`timestamptz`). Convert to `Asia/Karachi` for display only, using `date-fns-tz`. Deadline bugs are the single most damaging class of bug in this product.
- Soft-delete (`deletedAt`) for `submissions`, `teams`, `hackathons`. Hard-delete everything else.
- Every admin mutation writes an `audit_logs` row.
- Foreign keys with explicit `onDelete` behaviour. No orphans.
- Index every foreign key and every column used in a `WHERE` or `ORDER BY` on a list endpoint.
- Migrations are generated (`pnpm db:generate`) and committed. **Never edit a committed migration.**

---

## 16. TypeScript rules

```jsonc
// tsconfig.json — required compiler options
"strict": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"exactOptionalPropertyTypes": true,
"forceConsistentCasingInFileNames": true
```

- `any` is banned. Use `unknown` + Zod. `@ts-ignore` is banned; `@ts-expect-error` requires a comment explaining why and a linked issue.
- Non-null assertion `!` is banned except immediately after an explicit guard.
- Prefer `type` for unions/intersections, `interface` for object contracts that may be extended (props).
- Const objects + `as const` over TypeScript `enum`.
- Discriminated unions for state: `{ status: "idle" } | { status: "loading" } | { status: "error"; error: ApiError }`.
- Use `satisfies` to validate config objects without widening.
- Export types from `types/`; never import a type from a component file.
- Every exported function has an explicit return type.

---

## 17. TSDoc rules

**Every file** starts with a file header. **Every exported symbol** has a TSDoc block.

```ts
/**
 * @file Service functions for the submissions feature.
 * Handles all HTTP communication with the `/api/submissions` endpoints.
 * @module features/submissions/services
 */

/**
 * Creates a new project submission for a team.
 *
 * Validates the API response against {@link submissionSchema} before returning,
 * so callers can rely on the returned object being structurally correct.
 *
 * @param data - The submission payload, already validated client-side.
 * @returns The persisted submission as returned by the API.
 * @throws {ApiError} When the deadline has passed (`DEADLINE_PASSED`) or the
 *   team already has a submission (`CONFLICT`).
 *
 * @example
 * ```ts
 * const submission = await createSubmission({
 *   teamId: "tm_123",
 *   title: "CampusNav",
 *   repositoryUrl: "https://github.com/acm-umt/campusnav",
 * });
 * ```
 */
export async function createSubmission(data: CreateSubmissionInput): Promise<Submission> {
  // ...
}
```

Required tags by symbol type:

| Symbol | Required |
| --- | --- |
| File | `@file`, `@module` |
| Function / service | description, `@param` (each), `@returns`, `@throws` (if it can throw) |
| React component | description, `@param props`, `@returns`, `@example` for reusable components |
| Hook | description, `@param`, `@returns` (describe the query/mutation result) |
| Type / interface | description + per-property doc comments |
| Constant | description + units/format where non-obvious |

Document **why**, not **what**. `// increment i` adds nothing; `// Judges may re-score, so upsert rather than insert` earns its line.

---

## 18. Naming conventions

| Thing | Convention | Example |
| --- | --- | --- |
| Files & folders | `kebab-case` | `submission-card.tsx` |
| React components | `PascalCase` | `SubmissionCard` |
| Component files | `kebab-case`, name matches component | `submission-card.tsx` |
| Hooks | `use-<name>.ts` → `useName` | `use-submissions-query.ts` |
| Services | `<entity>.service.ts` | `submission.service.ts` |
| Schemas | `<entity>.schema.ts` | `submission.schema.ts` |
| Types | `<entity>.types.ts` | `submission.types.ts` |
| Utils / helpers | verb-first kebab-case | `calculate-weighted-score.ts` |
| Constants | `SCREAMING_SNAKE_CASE` | `MAX_TEAM_SIZE` |
| Booleans | `is` / `has` / `can` / `should` prefix | `canEditSubmission` |
| Event handlers | `handle<Event>` (internal), `on<Event>` (prop) | `handleSubmit`, `onSelect` |
| Async fetchers | `get` / `create` / `update` / `delete` | `getHackathonBySlug` |
| DB tables | `snake_case`, plural | `team_members` |
| Query keys | `<entity>Keys` | `submissionKeys` |

Barrel files are named `index.ts` and only re-export.

---

## 19. Loading, error, and empty states

Every data-driven view handles **four** states. Shipping only the happy path is an incomplete feature.

1. **Loading** — shadcn `Skeleton` matching the real layout's dimensions. Never a bare centered spinner for page-level content.
2. **Error** — `<ErrorState />` with a human message derived from `ApiError.code` and a retry button wired to `refetch()`.
3. **Empty** — `<EmptyState />` with an icon, an explanation, and the primary action ("Create your first hackathon").
4. **Success** — the actual content.

Route-level: provide `loading.tsx` and `error.tsx` per route group. `error.tsx` is a client component with a `reset` handler. Root `global-error.tsx` and `not-found.tsx` must be branded, not default.

---

## 20. Accessibility

- Semantic HTML first. `<button>` for actions, `<a>`/`Link` for navigation.
- All interactive elements reachable and operable by keyboard; visible focus rings (never `outline: none` without a replacement).
- Modals and sheets trap focus and restore it on close — Radix handles this; do not bypass it.
- Icon-only buttons require `aria-label` or an `sr-only` span.
- Form inputs always associated with a `<label>`; errors linked via `aria-describedby` (shadcn `FormMessage` does this).
- Colour contrast ≥ 4.5:1 for body text. Never encode status by colour alone — pair with text or an icon.
- Announce async results with `aria-live` regions where a toast isn't sufficient.
- Target: zero critical `axe` violations on every public page.

---

## 21. Performance

- **Server Components by default.** Push `"use client"` to the leaves. A page should not become a client tree because of one button.
- `next/image` everywhere with explicit `width`/`height` or `fill` + `sizes`. `priority` on the LCP image only.
- `next/font` with `display: "swap"` and subsetting. No `@import` of web fonts.
- Public hackathon/project pages: static or ISR (`revalidate`). Admin pages: dynamic.
- `dynamic()` for heavy client-only chunks: markdown editor, charts, image cropper.
- Paginate every list. Default `pageSize: 20`, hard max `100`.
- Debounce search inputs at 300ms; `keepPreviousData` for paginated queries.
- No N+1 queries. Batch with joins or a single `inArray` lookup.
- Budgets: LCP < 2.5s, CLS < 0.1, INP < 200ms on public pages. Check with Lighthouse before merging changes to public routes.

---

## 22. Security

- **Validate every input server-side with Zod.** Client validation is never sufficient.
- **Authorize every route handler.** Role + resource ownership.
- Rate limit: auth endpoints (5/15min/IP), submission create/update (20/hour/user), file uploads (10/hour/user).
- File uploads: whitelist MIME types (`image/png`, `image/jpeg`, `image/webp`, `application/pdf`), max 5MB images / 20MB PDFs, validate server-side, never trust the client-provided filename or content type.
- User-supplied markdown is rendered with `rehype-sanitize`. **Never** `dangerouslySetInnerHTML` on user content.
- URL fields (`repositoryUrl`, `liveDemoUrl`) validated as `https://` URLs. External links get `rel="noopener noreferrer"`.
- Drizzle parameterises queries — never build SQL by string concatenation.
- Secrets only in server-side env vars. `NEXT_PUBLIC_*` is public — treat it as printed on a billboard.
- Return `NOT_FOUND` rather than `FORBIDDEN` when revealing existence itself is a leak (e.g. unpublished draft hackathons).
- Enumerable integer IDs are forbidden in public URLs — use slugs or prefixed nanoids (`sub_a1b2c3`).
- Set security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`, HSTS) — check the local Next.js docs for the current configuration location.

---

## 23. Environment variables

All env vars are validated at boot in `src/lib/env.ts` with Zod. The app must **fail fast** on a missing variable. Import `env` from there — never read `process.env` directly outside that file.

```
# App
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_APP_NAME="hack2hire"

# Database
DATABASE_URL=

# Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Email
RESEND_API_KEY=
EMAIL_FROM=

# Uploads
UPLOADTHING_TOKEN=

# Rate limiting
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Observability (optional)
SENTRY_DSN=
```

`.env.example` is committed and stays in sync. `.env*` (except `.env.example`) is gitignored. Rotate any secret that has ever been committed.

---

## 24. Testing

| Layer | Tool | What to test |
| --- | --- | --- |
| `utils/` and `helpers/` | Vitest | **Mandatory.** Pure logic, edge cases, deadline boundaries |
| `schema/` | Vitest | Valid + invalid payloads, coercion behaviour |
| Components | Vitest + RTL | Behaviour, not implementation. Loading/error/empty/success |
| Hooks | Vitest + RTL + QueryClient wrapper | Cache keys, invalidation |
| Route handlers | Vitest | Auth guards, validation failures, ownership checks |
| Critical flows | Playwright | Register → join team → submit → judge → publish results |

Rules: no snapshot tests of entire pages. Query by role and label, not test IDs, unless there is no accessible alternative. Mock at the network boundary (MSW), not by stubbing services. Every bug fix ships with a regression test.

---

## 25. Git and PR conventions

**Branches:** `feat/<scope>-<short-desc>`, `fix/…`, `refactor/…`, `chore/…`, `docs/…`

**Commits:** Conventional Commits — `feat(submissions): add project gallery filters`

**PRs must include:** what changed and why, screenshots/recordings for UI changes, migration notes if the schema changed, and a completed Definition of Done checklist.

Keep PRs under ~400 changed lines where possible. `main` is protected: typecheck, lint, and tests must pass.

---

## 26. Scripts

```jsonc
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "typecheck": "tsc --noEmit",
  "format": "prettier --write .",
  "test": "vitest run",
  "test:watch": "vitest",
  "test:e2e": "playwright test",
  "db:generate": "drizzle-kit generate",
  "db:migrate": "drizzle-kit migrate",
  "db:studio": "drizzle-kit studio",
  "db:seed": "tsx scripts/seed.ts",
  "ui:add": "pnpm dlx shadcn@latest add"
}
```

A seed script is required: 1 admin, 2 organizers, 3 judges, 20 participants, 2 hackathons (one live, one completed), 5 problem statements, 8 teams, 8 submissions with scores. Without seed data nobody can review admin UI properly.

---

## 27. Definition of done

Before claiming a task complete, verify **every** item:

- [ ] `pnpm typecheck` passes with zero errors
- [ ] `pnpm lint` passes with zero warnings
- [ ] `pnpm test` passes
- [ ] No `any`, no `@ts-ignore`, no `console.log`
- [ ] File header TSDoc present; every export documented
- [ ] Feature code lives in `src/features/<name>/` with the correct subfolder split
- [ ] Cross-feature imports go through barrels only
- [ ] Services take a single `data` parameter and are called only from hooks
- [ ] `page.tsx` contains no `"use client"` / `"use server"` and no business logic
- [ ] `metadata` or `generateMetadata` exported; canonical + OG present
- [ ] `robots: noindex` on private routes; JSON-LD on public entity pages
- [ ] Loading, error, and empty states implemented
- [ ] Zod schema shared between form and route handler
- [ ] Route handler enforces role **and** resource ownership
- [ ] Animations respect `prefers-reduced-motion`
- [ ] Keyboard navigable; icon buttons labelled; contrast checked
- [ ] Responsive at 360px, 768px, 1280px
- [ ] Dark mode verified
- [ ] Migration generated and committed if the schema changed
- [ ] `.env.example` updated if a new variable was introduced
- [ ] No new dependency added without updating § 3

---

## 28. Never do this

- ❌ `"use client"` in `page.tsx` or `layout.tsx`
- ❌ `fetch()` inside a component or hook — services only
- ❌ Importing TanStack Query outside `hooks/` and `providers/`
- ❌ Hand-written query key arrays
- ❌ Domain logic in `src/components/` or `src/lib/`
- ❌ Deep imports across features (bypassing `index.ts`)
- ❌ A UI library other than shadcn/ui
- ❌ CSS keyframes for component animation
- ❌ `any`, `@ts-ignore`, non-null `!` without a guard
- ❌ Hand-written types that duplicate a Zod schema
- ❌ Trusting a client-supplied `role` or `userId`
- ❌ Storing local time in the database
- ❌ Editing a committed migration
- ❌ Editing `src/components/ui/` for a one-off feature tweak
- ❌ Shipping a route without metadata
- ❌ Writing the product name as anything other than `hack2hire`, or hardcoding it outside `config/site.ts`
- ❌ `console.log` in committed code
- ❌ Adding a dependency to solve something the stack already solves

---

## 29. Playbooks

### Adding a new feature

1. Create `src/features/<name>/` with all seven subfolders and `index.ts`.
2. Write the Zod schemas first (`schema/`) — they define the contract.
3. Infer and export types (`types/`).
4. Write the Drizzle table + generate a migration.
5. Write the route handler(s) under `src/app/api/<name>/` using `createApiHandler`.
6. Write services (`services/`) — one `data` param, parse the response.
7. Write the query key factory and hooks (`hooks/`).
8. Write components (`components/`), ending with `<Name>View`.
9. Create the route: `page.tsx` (metadata + guard + view), `loading.tsx`, `error.tsx`.
10. Add to `sitemap.ts` if public; add nav entry in `config/navigation.ts`.
11. Tests for `utils/`, `helpers/`, `schema/`, and the route handler.
12. Export the public surface from `index.ts`.

### Adding a shadcn component

`pnpm ui:add <component>` → verify it themes correctly in light and dark → wrap it in `components/shared/` if you're adding project-specific behaviour rather than editing `ui/`.

### Adding a public page (SEO checklist)

Unique title + description → canonical → OG image → JSON-LD → one `<h1>` → added to `sitemap.ts` → Lighthouse SEO score 100.

---

## 30. Open decisions

Resolve these and update this file — do not guess at implementation time.

1. **Team formation model** — can a participant register solo and be matched into a team, or must teams be pre-formed? Affects `registrations` ↔ `teams` cardinality.
2. **Judging visibility** — are individual judge scores visible to other judges (bias risk) or blind until submission closes?
3. **Multi-hackathon concurrency** — can two hackathons run simultaneously? If yes, `/dashboard` needs a hackathon switcher.
4. **Submission edit window** — locked hard at `submissionDeadline`, or is there an admin-granted grace period?
5. **Email domain restriction** — UMT-only, or open to other universities? This decides whether this platform is an ACM UMT tool or a product.
6. **Certificate generation** — in scope for v1? If yes, add a `certificates` feature and a PDF pipeline.
7. **Public gallery timing** — projects visible during the event, or only after judging?
8. **The "2hire" half of the product** — the name promises a hiring outcome, but v1 as scoped only delivers the "hack" half. Decide whether v1 ships any of: a `RECRUITER` role with read access to the talent pool, public participant profiles (`/u/[username]`) indexed for SEO, a "open to opportunities" flag on profiles, resume upload in `media`, or a sponsor-facing shortlist export. **If yes, participant profiles become an indexed SEO surface and the `users` table needs `isOpenToWork`, `resumeUrl`, and `skills[]` — decide before the first migration, not after.**

---

_Project: **hack2hire** · Last updated: 2026-08-14 · Owner: Web Dev Lead, ACM Student Chapter, UMT Lahore_