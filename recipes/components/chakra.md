# Recipe: Chakra UI v3

Friendly DX, sensible defaults, smaller surface area than MUI. Good for quick CRUD apps.

## Install

```bash
pnpm add @chakra-ui/react @emotion/react
```

## Wrap the layout

```tsx
// app/providers.tsx
"use client";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>;
}
```

```tsx
// app/layout.tsx
import { Providers } from "./providers";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

## Use a component

```tsx
// app/page.tsx
import { Button } from "@chakra-ui/react";

<Button colorPalette="blue">Click me</Button>
```

## Smoke test

1. `pnpm dev`
2. Visit `/`, confirm the Chakra button renders
3. `pnpm build`

## Don't forget

- Chakra v3 changed the API significantly from v2. Use v3 docs only.
- Theme tokens go in `defaultSystem` — see Chakra v3 docs for `createSystem`.
- Like MUI, this brings emotion. Keep Tailwind for layout, Chakra for primitives.
