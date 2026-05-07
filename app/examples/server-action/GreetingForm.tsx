// good-vibes-only :: app/examples/server-action/GreetingForm.tsx
// Client form using React 19's useActionState — the recommended pattern for
// progressive-enhancement forms backed by server actions.
"use client";

import { useActionState } from "react";
import { type GreetingState, greet } from "./actions";

const INITIAL: GreetingState = { status: "idle" };

export function GreetingForm() {
  const [state, action, pending] = useActionState(greet, INITIAL);

  return (
    <>
      <form action={action} className="mt-6 flex gap-2">
        <input
          name="name"
          placeholder="your name"
          aria-label="name"
          className="flex-1 rounded border border-neutral-300 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-900"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {pending ? "..." : "Greet"}
        </button>
      </form>

      {state.status === "ok" && (
        <p className="mt-4 text-sm text-green-700 dark:text-green-400">{state.greeting}</p>
      )}
      {state.status === "error" && (
        <p className="mt-4 text-sm text-red-700 dark:text-red-400">{state.message}</p>
      )}
    </>
  );
}
