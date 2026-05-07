# good-vibes-only

> An enterprise-ready Next.js starter and a guide for working productively with AI agents — what we call **vibe coding**.

## What is vibe coding?

Vibe coding is the practice of building software with AI assistants as full-time collaborators. It's not "let the bot YOLO it" — it's an opinionated workflow: **plan → prompt → review → test → commit**. This repo gives you a clean starting point and a short, opinionated guide so you don't reinvent the workflow on every project.

## Who is this for?

- Engineers new to working with Claude, Cursor, Copilot, or similar tools
- Teams that want a shared baseline for AI-assisted development
- Anyone tired of starter templates that ship 200 dependencies you'll never read

## Quickstart

```bash
git clone <this-repo> good-vibes-only
cd good-vibes-only
nvm use            # picks up .nvmrc → Node 22
corepack enable    # picks up packageManager → pnpm
pnpm install
pnpm dev
```

Then visit <http://localhost:3000>.

Other useful scripts:

```bash
pnpm typecheck     # tsc --noEmit, strict
pnpm lint          # biome check
pnpm test          # vitest unit tests
pnpm test:e2e      # playwright (after pnpm exec playwright install chromium)
pnpm build         # production build
pnpm check         # lint + typecheck + test (the local CI)
```

Full first-time setup walkthrough: [SETUP.md](./SETUP.md).

## The guide

Read these in order, ~5 minutes each:

1. [docs/01-principles.md](./docs/01-principles.md) — five rules that govern everything else
2. [docs/02-workflow.md](./docs/02-workflow.md) — plan, prompt, review, test, commit
3. [docs/03-prompting.md](./docs/03-prompting.md) — how to write specs an agent can act on
4. [docs/04-reviewing-ai-code.md](./docs/04-reviewing-ai-code.md) — what to look for, when to push back
5. [docs/05-anti-patterns.md](./docs/05-anti-patterns.md) — common mistakes with fixes
6. [docs/06-extending.md](./docs/06-extending.md) — adding a feature without breaking the contract

Agent-specific instructions live in [CLAUDE.md](./CLAUDE.md) (also mirrored in [.cursorrules](./.cursorrules) and [AGENTS.md](./AGENTS.md)).

## Choosing a component library

The default install ships **Tailwind CSS only** — no component library locked in. Open the repo in Claude Code or Cursor and say `run setup`; the agent will ask which library you want (shadcn/ui, Material UI, Chakra, Mantine, or stay on Tailwind alone) and apply the matching recipe. See [recipes/components/README.md](./recipes/components/README.md).

## Stack

- Next.js 15 (App Router) · TypeScript strict
- pnpm · Node 22 LTS
- Biome (lint + format)
- Zod (runtime validation)
- pino (structured logging)
- Vitest (unit) · Playwright (e2e)
- GitHub Actions CI

## License

MIT
