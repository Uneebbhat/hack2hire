@AGENTS.md

# CLAUDE.md

## Claude Code notes

- Everything Claude Code needs — commands, conventions, RLS/data-access rules, git workflow, CI/CD — lives in `AGENTS.md` above (imported, not duplicated, so the two files can't drift).
- Work phase-by-phase per `docs/PROJECT.md`. Stop after each phase and report what shipped, what was skipped, and what needs a decision — don't chain phases silently in one run.
- Before opening a PR: run `npm run lint && npm run type-check && npm run format:check && npm run build` locally. Don't rely on CI to catch what you could've caught first.
- Cut every feature branch from `integration`, name it `feature/<feature-name>`, and open the PR into `integration` — never target `main` directly, and never merge a PR yourself.
