# Recipe: shadcn/ui

Copy-pasteable primitives built on Radix and Tailwind. You own the component code — updates are manual but you have full control.

## Install

```bash
pnpm dlx shadcn@latest init
```

Answer the prompts:

- Style: `default`
- Base color: `neutral`
- CSS variables: `yes`
- Components alias: `@/components`
- Utils alias: `@/lib/utils`

## Add your first component

```bash
pnpm dlx shadcn@latest add button
```

This generates `components/ui/button.tsx`. The code is yours — edit it freely.

## Use it

```tsx
// app/page.tsx
import { Button } from "@/components/ui/button";

<Button>Click me</Button>
```

## Smoke test

1. `pnpm dev`
2. Visit `/`, confirm the button renders styled
3. `pnpm build` — confirm no type errors

## Don't forget

- shadcn drops files into your repo. Treat them as your code: lint them, type-check them, edit them when you need to.
- The `cn()` helper in `lib/utils.ts` is from shadcn — that's the only addition to `lib/`.
- If you want a primitive shadcn doesn't ship (e.g. file-upload), build it next to the others — don't add another component lib.
