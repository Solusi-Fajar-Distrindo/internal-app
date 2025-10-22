<!--
Sync Impact Report
Version change: 0.0.0 → 1.0.0
Modified principles: None (initial publication)
Added sections:
- Core Principles
- Technology Stack Standards
- Workflow Constraints
- Governance
Templates requiring updates:
- ✅ .specify/templates/plan-template.md
- ✅ .specify/templates/spec-template.md
- ✅ .specify/templates/tasks-template.md
Follow-up TODOs: None
-->
# Solusi Fajar Distrindo App Constitution

## Core Principles

### I. Clean Code Discipline
- Components MUST be authored in TypeScript with explicit props, concise files, and descriptive naming.
- Shared logic MUST reside in `lib/` or composable hooks to avoid duplication and tangled dependencies.
- Reviews MUST block merge when readability, accessibility semantics, or TypeScript safety degrade.

### II. Modern UI Craftsmanship
- Interfaces MUST be composed with `shadcn/ui` primitives and Radix foundations to ensure consistent, modern styling.
- Visual design MUST leverage Tailwind CSS v4 utility tokens and animation packages already approved in `package.json`.
- Any deviation from the established design system requires a documented rationale and alignment sign-off.

### III. Pleasant User Experience
- Flows MUST minimise cognitive load with clear hierarchy, micro-copy, and predictable interactions.
- Accessibility MUST meet WCAG 2.2 AA semantics (labels, focus management, keyboard support) using React 19.2.0 features.
- Latency-sensitive interactions MUST provide instant visual feedback (optimistic UI, skeletons, or loading states).

### IV. Responsive-First Delivery
- Layouts MUST adapt gracefully from 320px mobile to large desktop breakpoints using CSS grid/flex patterns.
- Progressive Web App capabilities MUST remain functional (installability, offline shell, viewport responsiveness).
- Motion and media MUST degrade smoothly on low-capability devices without breaking core flows.

### V. Minimal Dependency Footprint
- Only dependencies required for core experience (Next.js 16 App Router, React 19.2.0, `next-themes`, `lucide-react`, `shadcn/ui`, Tailwind CSS v4) MAY be used.
- Introducing a new runtime dependency requires RFC approval citing bundle impact and maintenance plan.
- Build tooling MUST reuse existing stack; polyfills or heavy libraries are prohibited unless performance evidence is logged.

## Technology Stack Standards

- **Framework**: Next.js 16 with the App Router. All routes, layouts, and metadata MUST reside under `app/`.
- **Language**: TypeScript targeting React 19.2.0 with server/client components explicitly annotated.
- **Styling**: Tailwind CSS v4 with `tailwind-merge` and project-defined tokens; custom CSS files must be scoped.
- **UI Kit**: `shadcn/ui` components backed by Radix primitives for consistent behaviour.
- **PWA**: Service worker, manifest, and offline-ready assets MUST be maintained with each release cycle.
- **Build & Deploy**: Rely on Next.js defaults; additional build steps require governance sign-off.

## Workflow Constraints

- Automated testing of any form (unit, integration, E2E, visual regression) is PROHIBITED; remove or ignore generated test scaffolding.
- Quality assurance relies on manual verification via local preview, design reviews, and stakeholder walkthroughs.
- Pull requests MUST document manual validation steps, impacted breakpoints, and dependency changes (if any).
- Feature work MUST preserve existing folder conventions (`app/`, `components/`, `lib/`, `public/`) and avoid create-next-app boilerplate cruft.
- Performance instrumentation MUST use built-in Next.js tooling; no external monitoring libraries may be added.

## Governance

- This constitution supersedes conflicting guidance in templates, docs, or legacy policies.
- Amendments require: proposal issue, maintainer review, adoption plan, and version bump according to semantic rules.
- Compliance reviews occur at every merge: reviewers MUST confirm adherence to principles, stack standards, dependency limits, and the no-testing mandate.
- Versioning policy: MAJOR for principle removals or incompatible workflow changes; MINOR for new principles/sections; PATCH for clarifications.
- Non-compliance MUST block merge until rectified or explicitly waived via governance meeting notes (recorded in repository docs).

**Version**: 1.0.0 | **Ratified**: 2025-10-22 | **Last Amended**: 2025-10-22
