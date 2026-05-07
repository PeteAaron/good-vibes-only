# AGENTS.md

This is a generic agent-instruction file. The detailed conventions live in [CLAUDE.md](./CLAUDE.md). Any agent (Claude, Cursor, Copilot, Aider, etc.) working in this repo should read CLAUDE.md and follow it.

The TL;DR:

1. Read `CLAUDE.md` before changing anything.
2. Read `docs/01-principles.md` for the philosophy.
3. Validate every external input with Zod.
4. Read env via `lib/env.ts` only.
5. Run `pnpm check` before claiming done.
6. No new dependencies without justification.

If your tool can only load one rules file, point it at `CLAUDE.md`.
