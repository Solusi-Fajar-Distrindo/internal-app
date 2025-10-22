# Feature Specification: [FEATURE NAME]

**Feature Branch**: `[###-feature-name]`  
**Created**: [DATE]  
**Status**: Draft  
**Input**: User description: "$ARGUMENTS"

## User Scenarios & Testing *(mandatory)*

<!--
  IMPORTANT: User stories should be PRIORITIZED as user journeys ordered by importance.
  Each user story/journey must be INDEPENDENTLY VALIDATED manually — automated tests
  are prohibited by the constitution.
-->

### User Story 1 - [Brief Title] (Priority: P1)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Manual Validation**: [Describe how reviewers must manually verify this story]

**Acceptance Scenarios (Manual)**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]
2. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 2 - [Brief Title] (Priority: P2)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Manual Validation**: [Describe manual walkthrough steps]

**Acceptance Scenarios (Manual)**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

### User Story 3 - [Brief Title] (Priority: P3)

[Describe this user journey in plain language]

**Why this priority**: [Explain the value and why it has this priority level]

**Manual Validation**: [Describe manual walkthrough steps]

**Acceptance Scenarios (Manual)**:

1. **Given** [initial state], **When** [action], **Then** [expected outcome]

---

[Add more user stories as needed, each with an assigned priority]

### Edge Cases

- What happens when [boundary condition]?
- How does system handle [error scenario]?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Implementation MUST follow Clean Code Discipline (TypeScript types, accessibility, readability).
- **FR-002**: UI MUST use `shadcn/ui` components styled with Tailwind CSS v4 tokens.
- **FR-003**: Experience MUST provide responsive layouts (320px–desktop) and PWA compliance.
- **FR-004**: Manual validation steps MUST be documented for each user journey; no automated tests allowed.
- **FR-005**: Features MUST avoid introducing new runtime dependencies without RFC approval.

*Example of marking unclear requirements:*

- **FR-006**: System MUST authenticate users via [NEEDS CLARIFICATION]
- **FR-007**: System MUST retain user data for [NEEDS CLARIFICATION]

### Key Entities *(include if feature involves data)*

- **[Entity 1]**: [What it represents, key attributes without implementation]
- **[Entity 2]**: [What it represents, relationships to other entities]

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Manual UX walkthrough completes without blockers in under [time] minutes.
- **SC-002**: UI remains accessible (WCAG 2.2 AA) across supported breakpoints.
- **SC-003**: PWA install prompt remains available after feature deployment.
- **SC-004**: No new runtime dependencies are added to `package.json`.
