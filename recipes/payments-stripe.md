# Recipe: Payments with Stripe

Subscriptions and one-time payments via Stripe Checkout.

## Install

```bash
pnpm add stripe
```

## Configure env

Add to `lib/env.ts`:

```ts
STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
STRIPE_WEBHOOK_SECRET: z.string().startsWith("whsec_"),
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith("pk_"),
```

Add lines to `tests/unit/env.test.ts`. Set all three in `.env.local`.

## Create a singleton

```ts
// lib/stripe.ts
import "server-only";
import Stripe from "stripe";
import { env } from "./env";

export const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-12-18.acacia",
});
```

## Create a checkout session

```ts
// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import { stripe } from "@/lib/stripe";

const Body = z.object({ priceId: z.string().min(1) });

export async function POST(request: Request) {
  const parsed = Body.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ issues: parsed.error.flatten() }, { status: 400 });
  }
  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: parsed.data.priceId, quantity: 1 }],
    success_url: `${request.headers.get("origin")}/billing/success`,
    cancel_url: `${request.headers.get("origin")}/billing/cancel`,
  });
  return NextResponse.json({ url: session.url });
}
```

## Handle webhooks

```ts
// app/api/webhooks/stripe/route.ts
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  const sig = request.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "missing signature" }, { status: 400 });

  const body = await request.text();
  try {
    const event = stripe.webhooks.constructEvent(body, sig, env.STRIPE_WEBHOOK_SECRET);
    logger.info({ type: event.type, id: event.id }, "stripe webhook");
    // handle event.type here
    return NextResponse.json({ received: true });
  } catch (err) {
    logger.error({ err }, "stripe webhook signature failed");
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }
}
```

## Smoke test

1. `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
2. `stripe trigger checkout.session.completed`
3. Confirm the log line appears

## Don't forget

- The webhook route must NOT use a body-parser middleware that consumes the body before signature verification.
- Test mode keys (`sk_test_…`) and live keys (`sk_live_…`) are different schemas — keep them in different `.env.*` files.
