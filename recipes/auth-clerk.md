# Recipe: Auth with Clerk

Drop-in user authentication. Free tier covers most starter projects.

## Install

```bash
pnpm add @clerk/nextjs
```

## Configure env

Add to `lib/env.ts`:

```ts
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
CLERK_SECRET_KEY: z.string().min(1),
```

Add the corresponding lines to `tests/unit/env.test.ts`. Set both in `.env.local`.

## Wire it up

Wrap the root layout:

```tsx
// app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en"><body>{children}</body></html>
    </ClerkProvider>
  );
}
```

Add middleware:

```ts
// middleware.ts (project root)
import { clerkMiddleware } from "@clerk/nextjs/server";
export default clerkMiddleware();
export const config = { matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"] };
```

## Use the user

```tsx
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
  const { userId } = await auth();
  if (!userId) return <p>Sign in.</p>;
  return <p>Hello {userId}</p>;
}
```

## Smoke test

1. `pnpm dev`
2. Visit `/` — sign-in modal should appear when you visit a protected route
3. Add a Playwright spec under `tests/e2e/auth.spec.ts` that asserts the sign-in flow on a public page

## Don't forget

- Webhooks for user lifecycle events go in `app/api/webhooks/clerk/route.ts` — validate the signature, then parse the body with Zod.
- Never read `process.env.CLERK_*` directly in app code.
