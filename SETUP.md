# Setup

First-time, end-to-end. Should take about 5 minutes.

## 1. Install Node via nvm

This repo pins Node via `.nvmrc`.

```bash
# install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash

# inside the repo
nvm install   # reads .nvmrc → Node 22
nvm use
```

Verify:

```bash
node --version   # should print v22.x.x
```

## 2. Enable pnpm via corepack

Corepack ships with Node 16.10+. The `packageManager` field in `package.json` pins the exact pnpm version so everyone on the team uses the same one.

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm --version   # should match packageManager
```

## 3. Install dependencies

```bash
pnpm install
```

Optional (only if you want to run e2e tests locally):

```bash
pnpm exec playwright install --with-deps chromium
```

## 4. Verify everything works

```bash
pnpm check    # lint + typecheck + test
pnpm build    # production build
pnpm dev      # http://localhost:3000
```

If all four pass, you're done.

## 5. Pick a component library

Open this repo in Claude Code or Cursor and say:

> run setup

The agent will read `recipes/components/README.md`, ask which library you want, and apply the recipe. The default keeps just Tailwind.

## Troubleshooting

**`pnpm: command not found`**
You skipped `corepack enable`. Run it, then re-run `pnpm install`.

**`Error: Invalid environment variables`**
You added a required env var to `lib/env.ts` but didn't set it. Either set it or give it a `.default()`. See `docs/06-extending.md`.

**Port 3000 already in use**
`PORT=3001 pnpm dev` — `playwright.config.ts` honors `PORT` too.

**Biome is reformatting things you don't want reformatted**
Add the path to `biome.json`'s `files.ignore`. Don't disable Biome wholesale.

**Tests can't import server modules**
`server-only` is aliased to a no-op in `vitest.config.ts`. If you add another server-only module that fails to import in tests, alias it the same way.
