---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Automated tests are PROHIBITED. Capture manual validation notes instead.

**Organization**: Tasks are grouped by user story to enable independent delivery and review.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps task to a user story (US1, US2, ...)
- Include exact file paths in descriptions

## Path Conventions

- Routes & screens: `app/`
- Shared UI: `components/`
- Utilities: `lib/`
- Assets: `public/`

<!--
  ============================================================================
  IMPORTANT: Sample content below MUST be replaced by /speckit.tasks output.
  ==========================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

Purpose: Align feature scaffolding with constitution principles.

- [ ] T001 Audit `app/` route structure for extension points
- [ ] T002 Confirm Tailwind CSS v4 tokens and `shadcn/ui` primitives cover requirements
- [ ] T003 [P] Outline manual validation plan (devices, breakpoints, PWA checks)

---

## Phase 2: Foundational (Blocking Prerequisites)

Purpose: Core assets before story work.

- [ ] T010 Prepare data layer or mock data within `lib/`
- [ ] T011 [P] Define shared UI primitives in `components/`
- [ ] T012 [P] Validate PWA manifest/service worker impact

Checkpoint: Foundation ready — user stories may proceed.

---

## Phase 3: User Story 1 - [Title] (Priority: P1)

Goal: [Describe primary outcome]

Manual Validation: [List manual walkthrough steps]

- [ ] T020 [P] [US1] Implement route/UI under `app/...`
- [ ] T021 [P] [US1] Wire data/loading states respecting minimal deps
- [ ] T022 [US1] Record validation notes (screenshots, devices) in PR

Checkpoint: US1 functional and manually verified.

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

Goal: [Describe outcome]

Manual Validation: [Steps]

- [ ] T030 [P] [US2] Extend responsive layouts in `components/`
- [ ] T031 [US2] Ensure UX feedback (animations, microcopy)
- [ ] T032 [US2] Update validation notes covering breakpoints

Checkpoint: US1 + US2 independently deliverable.

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

Goal: [Describe outcome]

Manual Validation: [Steps]

- [ ] T040 [P] [US3] Add optional components without new deps
- [ ] T041 [US3] Confirm PWA install/offline still succeeds
- [ ] T042 [US3] Capture validation summary for reviewers

Checkpoint: All targeted stories verified.

---

[Add more user story phases as needed]

---

## Phase N: Polish & Cross-Cutting Concerns

Purpose: Repository-wide refinements respecting constitution.

- [ ] T090 [P] Update documentation (`README.md`, `/specs/`)
- [ ] T091 Code cleanup for readability/accessibility
- [ ] T092 Manual Core Web Vitals sweep (desktop + mobile)
- [ ] T093 Confirm no new runtime dependencies introduced
- [ ] T094 Regression walkthrough across key flows

---

## Dependencies & Execution Order

- Phase 1 precedes Phase 2; Phase 2 blocks user stories.
- User stories run sequentially or in parallel once prerequisites satisfied.
- Manual validation MUST succeed before merging each story.

## Implementation Strategy

### MVP First
1. Complete Setup + Foundational
2. Deliver User Story 1
3. Perform manual validation (desktop, mobile, PWA shell)
4. Gather feedback before subsequent scope.

### Incremental Delivery
- Merge each story post-validation, keeping changes small and reviewable.

### Parallel Collaboration
- Coordinate shared component updates to avoid conflicts.
- Share validation results to keep manual QA efficient.
