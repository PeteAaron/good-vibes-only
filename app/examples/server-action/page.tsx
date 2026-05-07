// good-vibes-only :: app/examples/server-action/page.tsx
// Server component shell. Logic lives in actions.ts (server) and
// GreetingForm.tsx (client). See docs/01-principles.md.
import { GreetingForm } from "./GreetingForm";

export default function ServerActionExample() {
  return (
    <main className="mx-auto max-w-xl px-6 py-16">
      <h1 className="text-2xl font-semibold">Server action example</h1>
      <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
        Submitting calls a server action that validates input with Zod before doing any work.
      </p>
      <GreetingForm />
    </main>
  );
}
