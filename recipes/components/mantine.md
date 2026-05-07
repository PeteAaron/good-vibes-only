# Recipe: Mantine v7

Polished components, excellent forms (`@mantine/form`), great date pickers. Pick this if your app is forms-heavy.

## Install

```bash
pnpm add @mantine/core @mantine/hooks
pnpm add -D postcss-preset-mantine postcss-simple-vars
```

## PostCSS

Mantine ships its own PostCSS plugins. Update `postcss.config.mjs` to include both:

```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    "postcss-preset-mantine": {},
    "postcss-simple-vars": { variables: { "mantine-breakpoint-sm": "48em" } },
  },
};
export default config;
```

## Wrap the layout

```tsx
// app/layout.tsx
import { MantineProvider, ColorSchemeScript } from "@mantine/core";
import "@mantine/core/styles.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
```

## Use a component

```tsx
// app/page.tsx
import { Button } from "@mantine/core";

<Button>Click me</Button>
```

## Smoke test

1. `pnpm dev`
2. Visit `/`, confirm the Mantine button renders
3. `pnpm build`

## Don't forget

- Mantine has its own dark mode system — pick one of Tailwind's or Mantine's, not both.
- `@mantine/form` is excellent and pairs well with Zod via `@mantine/form` resolvers.
- Date inputs require `@mantine/dates` (separate install).
