# hack2hire — Claude Code prompt pack

Two prompts. Run **Prompt 1 once**, then **Prompt 2 repeatedly** until `MIGRATION.md` is fully checked off.

Do not merge them. Prompt 1 is read-only and cheap; Prompt 2 writes code and must stay narrow.

---

## Prompt 1 — Audit (run once, read-only)

> **Before running:** `git checkout -b chore/agents-md-audit` and confirm `git status` is clean.

```
Read CLAUDE.md, then AGENTS.md. That is the target architecture for this repo.
This is an existing codebase that predates those rules, so assume it violates them.

PHASE 0 — AUDIT ONLY. Write no code. Create exactly one file: MIGRATION.md.

Budget: stay under ~150 tool calls. Prefer counting over reading.

Discovery rules (token discipline — follow strictly):
- Use `git ls-files` for the file tree. Never `find`, never `ls -R`, never touch node_modules.
- Use `rg -l` and `rg -c` to locate and count. Only open a file when a count alone
  cannot answer the question.
- When you must open a file, read at most 60 lines unless it is under 60 lines.
- Skip entirely: src/components/ui/**, public/**, *.lock, migrations, generated files.
- Sample, don't exhaust: for any violation class with >10 hits, inspect 3 representative
  files and extrapolate. Record the count, not the list.
- Never paste file contents into your reply or into MIGRATION.md. Cite path:line only.

Answer these, in this order:
1. STACK REALITY — read package.json + tsconfig.json. Build a table of what is actually
   installed vs AGENTS.md §3. Flag: missing (TanStack Query, Zod, RHF, Framer Motion,
   shadcn), conflicting (another UI lib, another data layer), and version risks.
   Note the exact Next.js version and whether `node_modules/next/dist/docs/` exists.
2. STRUCTURE REALITY — current top-level layout under src/ (2 levels deep, no file lists).
   Does any feature-based structure already exist, or is it pages + components + lib?
3. ROUTE INVENTORY — every page.tsx/route.ts. One table row each:
   route | has metadata? | "use client" in page? | auth guard? | data-fetch style used.
4. VIOLATION COUNTS — one row per rule, with a count and 2-3 example path:line refs:
   `any` / @ts-ignore / console.log / raw fetch in components / direct TanStack Query
   imports outside hooks / missing TSDoc file headers / hardcoded product name /
   pages missing metadata / unguarded route handlers / non-UTC timestamp handling.
5. BLAST RADIUS — which 3 changes touch the most files, and which are safely isolated.
6. DEAD WEIGHT — unused deps, unreferenced components, duplicate implementations.

Then write MIGRATION.md containing:
- A "Codebase reality" section: findings 1-5 above, compact tables only.
- A phased migration plan ordered by (risk of breakage) ASC, (leverage) DESC.
  Phase 0 must be foundation-only: tsconfig strictness, lib/api-client.ts,
  lib/api-response.ts, lib/api-handler.ts, lib/errors.ts, lib/env.ts, lib/seo.ts,
  lib/motion.ts, providers/, config/site.ts. Nothing user-facing.
  Then one phase per feature, as a vertical slice, in the AGENTS.md §6 dependency order.
- A markdown checkbox list of every slice, unchecked. This file is the durable state
  across sessions — future sessions read it instead of re-auditing.
- An "Open questions" section for anything you could not resolve from the code alone,
  including anything in AGENTS.md §30 that the code has already implicitly decided.

Reply in chat with at most 15 lines: the top 5 findings and the proposed phase order.
Everything else goes in MIGRATION.md. Do not summarise the file back to me.
```

---

## Prompt 2 — Migrate one slice (repeat until done)

```
Read AGENTS.md, then MIGRATION.md. Do not re-audit the codebase — MIGRATION.md is
current. If something in it is stale, fix that line and continue.

Take the next unchecked slice: [SLICE NAME]

Rules:
- Vertical slice only: schema -> types -> service -> hook -> component -> page, for this
  feature alone. Do not touch any other feature, even to fix an obvious violation there.
  Log unrelated issues at the bottom of MIGRATION.md instead.
- Preserve behaviour. This is a refactor, not a redesign. If you believe the existing
  behaviour is wrong, stop and ask before changing it.
- Reuse before creating. Search for an existing component or util first; a near-match you
  extend beats a new file.
- Keep the diff reviewable. If the slice exceeds ~10 files, split it, do the first half,
  and say so.

Before writing any Next.js code, read the relevant guide in node_modules/next/dist/docs/.
Do not rely on memorised Next.js conventions.

Work in this order:
1. State the file list you will create/modify/delete, and the data flow, in under 10 lines.
   Wait for nothing — proceed unless the list exceeds 10 files.
2. Make the changes.
3. Run `pnpm typecheck` and `pnpm lint`. Fix every error you introduced. Do not suppress.
4. Walk AGENTS.md §27 and report each item pass/fail for this slice only.
5. Tick the slice in MIGRATION.md and commit with a Conventional Commit message.

Do not paste the code you wrote back into chat. Reply with: files changed, the DoD
result, and anything you deliberately left broken or deferred.
```

---

## Notes

**Why the audit is read-only.** A model that audits and refactors in one pass will start refactoring three files in and lose the global picture. Separating them costs one extra session and saves a rewrite.

**Why `MIGRATION.md` matters more than the prompt.** It is the only thing that survives a `/clear`. Session two opens one file instead of scanning 200. Keep it in the repo, commit it, and delete it when the last box is ticked.

**Feed `[SLICE NAME]` explicitly.** Letting the model pick the next slice invites it to choose the interesting one over the correct one.

**Run `/clear` between slices.** Slice N's context is worthless to slice N+1 — `MIGRATION.md` carries everything that matters forward.

**If a slice goes wrong,** `git reset --hard` and re-run Prompt 2 with a narrower slice. Do not debug a bad refactor conversationally; it costs more than redoing it.
