# Recipe: Tailwind only

This is the default. Nothing to install — Tailwind v4 is already configured in `app/globals.css` and `postcss.config.mjs`.

## Add your first re-usable component

Don't reach for a library; reach for a function. Most "component libraries" are 80% just buttons and inputs anyway.

```tsx
// components/Button.tsx
import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className = "", ...rest }: Props) {
  const base = "rounded px-4 py-2 text-sm font-medium transition";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
      : "border border-neutral-300 hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-900";
  return <button className={`${base} ${styles} ${className}`.trim()} {...rest} />;
}
```

## Smoke test

```tsx
// app/page.tsx (add somewhere visible)
import { Button } from "@/components/Button";
<Button>Click me</Button>
```

Run `pnpm dev`, click it, done.

## When to graduate

If you're hand-rolling the same pattern (modal, popover, tooltip, combobox) for the third time, that's the signal to look at shadcn/ui. Don't graduate before then.
