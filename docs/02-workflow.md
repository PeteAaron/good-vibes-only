# 02 · Workflow

Plan → prompt → review → test → commit. Five steps, in order, every time.

## 1. Plan

Open a scratchpad (a chat with the agent works fine). Write:

- **Goal** — one sentence. "Add a `/api/users` route that returns the current user."
- **Files to touch** — be specific. `app/api/users/route.ts`, `lib/users.ts`, `tests/unit/users.test.ts`.
- **Contract** — inputs, outputs, error cases.
- **Test** — what test will prove this works.

If the plan is more than 100 lines, it's too big. Split it.

## 2. Prompt

Hand the plan to the agent as the spec. See [03-prompting.md](./03-prompting.md) for the format. The agent's job is to translate the plan into code; if you have to re-explain the goal in chat, your plan was incomplete.

## 3. Review

Don't just `git diff` and squint. Look for the things in [04-reviewing-ai-code.md](./04-reviewing-ai-code.md):

- Are inputs validated with Zod?
- Is `process.env` only read in `lib/env.ts`?
- Are there hallucinated APIs or imports?
- Is there dead code, premature abstraction, or commentary that should be in the PR description?

If the answer to any of those is "yes, fix it", say so. The agent will. Don't accept a 95%-correct diff because you're tired.

## 4. Test

Two layers, both required:

- **Unit:** `pnpm test`. New code → new spec under `tests/unit/`.
- **Manual or e2e:** `pnpm dev` and click the thing, or add a Playwright spec under `tests/e2e/`.

Then `pnpm check && pnpm build` for the full gate.

## 5. Commit

Small commits with clear messages. Conventional Commits style is fine:

```
feat: add users API route with Zod-validated body
fix: handle empty array in userSummary
docs: clarify env var workflow in 06-extending.md
chore: bump pnpm to 10.34
```

One concern per commit. If you're tempted to write `and`, split it.

---

The point of the loop isn't ceremony. It's that **every step catches a different class of bug**: planning catches "wrong goal", review catches "wrong code", testing catches "wrong behavior". Skip a step and the bug just shows up later, more expensively.
