@AGENTS.md

<!--
  Project: hack2hire — hackathon platform, ACM Student Chapter, UMT Lahore.

  This file is intentionally a single import.

  AGENTS.md is the single source of truth for this repository so that every
  agent (Claude Code, Cursor, Copilot, Codex, Windsurf) reads identical rules.
  Do NOT duplicate rules here — they will drift. Add rules to AGENTS.md instead.

  Only Claude-specific operating instructions belong below this line.
-->

## Claude-specific operating instructions

- Before writing any Next.js code, read the relevant guide in `node_modules/next/dist/docs/`. Do not rely on memorised Next.js conventions.
- Before adding a dependency, read `package.json` and confirm the installed major version. Match the installed API surface, not the latest documented one.
- Plan before editing. For any task touching more than two files, state the file list and the data flow (`page → view → hook → service → route handler → db`) before writing code.
- Never scaffold a feature folder partially. If you create `src/features/<name>/`, create every required subfolder and its `index.ts` barrel as defined in AGENTS.md § 6.
- After finishing a task, run the Definition of Done checklist in AGENTS.md § 27 and report each item as pass/fail. Do not claim completion while `pnpm typecheck` or `pnpm lint` fails.
- The product name is `hack2hire` — always lowercase, never capitalised, never hyphenated. Import it from `src/config/site.ts` rather than typing it into components, emails, or metadata.
- If a rule in AGENTS.md blocks a correct solution, stop and say so explicitly rather than silently violating it.
