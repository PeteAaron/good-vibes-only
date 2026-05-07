# Recipe: Observability with Sentry

Error tracking and performance monitoring.

## Install

```bash
pnpm add @sentry/nextjs
```

The Sentry CLI wizard handles most of the setup:

```bash
npx @sentry/wizard@latest -i nextjs
```

This generates `sentry.{client,server,edge}.config.ts` and updates `next.config.ts`.

## Configure env

Add to `lib/env.ts`:

```ts
NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
SENTRY_AUTH_TOKEN: z.string().optional(),  // build-time only
```

Mark them optional so local dev still boots without Sentry. Add to `tests/unit/env.test.ts`.

## Wire it to the logger

```ts
// lib/logger.ts (additions)
import * as Sentry from "@sentry/nextjs";

logger.error = (...args) => {
  Sentry.captureException(args[0]);
  return pinoLogger.error(...args);
};
```

(Or use Sentry's pino transport if you prefer — the manual hook is shorter.)

## Smoke test

1. Add a temporary route that throws.
2. `pnpm dev` and visit it.
3. Confirm the error appears in your Sentry project within ~30 seconds.
4. Delete the temporary route.

## Don't forget

- Strip PII from error reports — configure `beforeSend` in `sentry.server.config.ts`.
- Source maps are uploaded at build time; this requires `SENTRY_AUTH_TOKEN` in CI.
- Sentry's bundle size matters on the client. Consider `tunnelRoute` if ad-blockers are an issue for your audience.
