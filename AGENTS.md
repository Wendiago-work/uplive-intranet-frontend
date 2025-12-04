## Project overview
- Frontend is a Vite + React + TypeScript app using shadcn/ui + Tailwind; follow patterns in `src` and `README.md` before adding new utilities.
- Prefer existing UI primitives/components; check `components.json` and `src/components` to keep design consistent.
- Read the docs: review `README.md`, `index.css` for theme tokens, and any feature docs in `docs/` or component README files before coding.

## Do
- Use shadcn component if possible.
- Use Tailwind design tokens/util classes; extend via config, not inline styles.
- Put layout components to components/layout/ folder.
- Define props and state types explicitly (via interfaces or type), and prefer functional components + hooks over class components.
- Put all types define in types folder, not in component unless they're strictly for UI component.
- Use TypeScript utility types when appropriate (e.g. Partial, Omit, generics) to keep types DRY.

## Don't
- Do not hard code colors, spacings, font-sizes. USE TAILWIND PREDEFINED CLASSES.
- Do not use `div`s if we have a component already.
- Do not add new dependencies without checking existing alternatives.
- Do not repeat yourself: avoid duplication of logic, styles, or constants; extract shared code into utils, hooks, or reusable components.

## Commands
### Type check a single file by path
npm run tsc --noEmit path/to/file.tsx

### Format a single file by path
npm run prettier --write path/to/file.tsx

### Lint a single file by path
npm run eslint --fix path/to/file.tsx

### Unit tests - pick one
npm run vitest run path/to/file.test.tsx

Note: Always lint, test, and typecheck updated files. Use project-wide build sparingly.

## When stuck
- Ask a clarifying question, propose a short plan, or open a draft PR with notes
- Do not push large speculative changes without confirmation

## When implement a new shadcn component, instead of implement it yourself use: `npx shadcn@latest add ....` with ... is the name of the component. For example: `npx shadcn@latest add popover`