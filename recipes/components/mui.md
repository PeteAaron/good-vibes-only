# Recipe: Material UI (MUI)

Mature, accessibility-tested component library. Best for enterprise apps with form-heavy UIs.

> ⚠️ MUI uses emotion under the hood. It coexists with Tailwind but the two systems are independent — pick one for layout and stick with it. We recommend keeping Tailwind for layout and MUI for primitives.

## Install

```bash
pnpm add @mui/material @emotion/react @emotion/styled @mui/material-nextjs
```

## Add the App Router cache provider

```tsx
// app/layout.tsx
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
      </body>
    </html>
  );
}
```

## Use a component

```tsx
// app/page.tsx
import Button from "@mui/material/Button";

<Button variant="contained">Click me</Button>
```

Always import from the deep path (`@mui/material/Button`), not the barrel — it makes tree-shaking work.

## Theme

```tsx
// lib/mui-theme.ts
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: { mode: "light", primary: { main: "#2563eb" } },
});
```

Wrap with `<ThemeProvider theme={theme}>` inside the cache provider.

## Smoke test

1. `pnpm dev`
2. Visit `/`, confirm the MUI button renders with Material styling
3. `pnpm build` — confirm bundle compiles

## Don't forget

- Bundle size: import from deep paths only. Audit with `pnpm exec next build` and check the size column.
- Server components: MUI v5+ supports them via the cache provider, but most components opt into `"use client"`. That's expected.
- Don't mix MUI form inputs with shadcn or Mantine in the same form.
