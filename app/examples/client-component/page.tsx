// good-vibes-only :: app/examples/client-component/page.tsx
// Tiny "use client" page demonstrating local state. Default to server
// components — only opt in when you need browser APIs or interactivity.
"use client";

import { useState } from "react";

export default function ClientComponentExample() {
  const [count, setCount] = useState(0);

  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Client component example</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        This page is marked <code>"use client"</code> so React state works in the browser.
      </p>

      <div className="mt-6 flex items-center gap-3">
        <button
          type="button"
          onClick={() => setCount((c) => c - 1)}
          className="rounded border border-neutral-300 px-3 py-1 dark:border-neutral-700"
        >
          −
        </button>
        <span className="min-w-8 text-center font-mono text-lg">{count}</span>
        <button
          type="button"
          onClick={() => setCount((c) => c + 1)}
          className="rounded border border-neutral-300 px-3 py-1 dark:border-neutral-700"
        >
          +
        </button>
      </div>
    </main>
  );
}
