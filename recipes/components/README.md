# Component library options

The default install ships **Tailwind CSS only** — utility classes, no component primitives. That's enough for landing pages, dashboards, and most internal tools. When you need more, pick *one* library and apply its recipe.

## How to choose

| Library                          | When to pick                                                                                  | Tradeoff                                                       |
| -------------------------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| **Tailwind only** *(default)*    | Landing pages, internal tools, you have a designer, or you want full control                  | More code per component                                        |
| **shadcn/ui**                    | You like Tailwind, want copy-pasted primitives you fully own                                  | You maintain the component code; updates are manual            |
| **Material UI (MUI)**            | Enterprise app, dense forms, accessibility-critical, or your team knows Material              | Heavy bundle, opinionated theme, emotion conflicts with Tailwind |
| **Chakra UI v3**                 | Quick CRUD app, friendly DX, good defaults                                                    | Smaller ecosystem than MUI                                     |
| **Mantine v7**                   | Form-heavy app, lots of date pickers / advanced inputs                                        | Larger surface area to learn                                   |

If you can't decide in 30 seconds, **stay on Tailwind**. You can adopt a library later by running this flow again.

## Agent flow

If you're an agent reading this, the user just asked you to "run setup". Do this:

1. Ask the user (multiple choice): "Which component library do you want? Tailwind only / shadcn/ui / MUI / Chakra / Mantine."
2. Open `recipes/components/<choice>.md` and execute its steps in order.
3. Run the smoke test described at the bottom of the recipe.
4. Commit with `chore: set up <library>`.

Don't auto-pick. Don't combine libraries. Don't add anything not in the recipe.

## Recipes

- [tailwind-only.md](./tailwind-only.md) — default; how to keep just Tailwind and add a single re-usable button
- [shadcn-ui.md](./shadcn-ui.md)
- [mui.md](./mui.md)
- [chakra.md](./chakra.md)
- [mantine.md](./mantine.md)
