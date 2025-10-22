<!-- Auto-generated guidance for AI coding agents working on this repo. Keep concise and actionable. -->
# Copilot instructions — solusi-fajar-distrindo-app

This file gives focused, repository-specific guidance for AI coding agents working on this Next.js + Tailwind (app dir) project.

Primary facts
- Framework: Next.js (App Router, React 19) — see `next` in `package.json` and files under `app/`.
- Styling: Tailwind CSS v4 and utility classes live in `app/globals.css`.
- UI primitives: components under `components/ui/` follow the shadcn-style pattern (cva + radix primitives). See `components/ui/button.tsx` and `components/ui/dropdown-menu.tsx` for examples.
- Theme handling: `components/theme-provider.tsx` wraps `next-themes`; theme toggling is in `components/mode-toggle.tsx`.

What matters when editing code
- Use the App Router conventions: server components by default, add "use client" at the top of client components (see `components/*`).
- Prefer existing design tokens and utility helpers: `cn` in `lib/utils.ts` and `buttonVariants` in `components/ui/button.tsx`.
- Follow the project's aliasing and `components.json` conventions when adding or referencing components (aliases: `@/components`, `@/lib`, `@/components/ui`).

Common patterns to follow (concrete examples)
- Component structure: export small, focused components in `components/` and `components/ui/`. Example: `ModeToggle` composes `Button` and `DropdownMenu` and calls `useTheme().setTheme`.
- Styling: use className utilities + `cn(...)` and cva variants. Example: `buttonVariants(...)` defines `variant` and `size` options — reuse these rather than inventing new variant props.
- Accessibility: Radix primitives are used for dropdowns. Preserve `asChild`, `aria-*`, `sr-only`, and focus-visible styles as shown in `components/ui/*`.

Build, run and lint commands (developer workflow)
- Dev server: `npm run dev` (runs `next dev`). Default port 3000.
- Build: `npm run build` (runs `next build`).
- Start (production): `npm run start` (runs `next start`).
- Lint: `npm run lint` (runs `eslint`).

Testing and checks
- There are no tests in repo by default. For quick validation after edits:
  - Run the dev server and open http://localhost:3000 to verify UI changes.
  - Run lint (`npm run lint`) to catch ESLint/TS problems; the project uses TypeScript types and Next's ESLint presets.

Editing guidelines for AI PRs
- Keep changes minimal and localized. Update or add types when touching props.
- For any UI change, include one example usage in `app/page.tsx` or a new small route in `app/` so reviewers can run and visually inspect.
- When adding new components, register exports under `components/` and follow existing file-level defaults (client/server declarations).

Integration and external dependencies
- next-themes is used for theme management (`ThemeProvider` wrapper). Changing theme behavior should be confined to `components/theme-provider.tsx` and `components/mode-toggle.tsx`.
- shadcn-style configuration is present in `components.json` — generated components will use the aliasing and tailwind CSS file at `app/globals.css`.

Corner cases and gotchas
- Next 16 app directory: server components are default. Don't add client-only hooks (useState/useEffect/useTheme) without adding `"use client"`.
- Tailwind v4 uses slightly different config and plugin surface; prefer existing utility classes used across the repo.
- The project uses `lucide-react` for icons; preserve icon className conventions (size and rotation used for animations in `ModeToggle`).

Where to look for examples
- Theme + layout: `app/layout.tsx` and `components/theme-provider.tsx`.
- Button and variants: `components/ui/button.tsx`.
- Dropdown implementation: `components/ui/dropdown-menu.tsx` and `components/mode-toggle.tsx`.
- Class utility helper: `lib/utils.ts` (`cn` wrapper around clsx + tailwind-merge).

If you need to make larger architectural changes
- Open an issue first describing the change and migration plan. Large changes to routing, theme system, or CI should be discussed.

Last step in PRs
- Run `npm run lint` and confirm the dev server loads without runtime errors.
- Add a short note in the PR description listing which files were changed and how to verify manually.

If anything in this file is unclear or you need more examples, request a follow-up and point to the specific file(s) you want expanded.
