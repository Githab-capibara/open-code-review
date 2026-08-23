# 01. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-08-21
- **Deciders:** @lizhengfeng101
- **Related:** None

## Context

As OpenCodeReview grows, we need to capture architectural decisions that shape the codebase. Without proper documentation, future maintainers (human or AI) may struggle to understand why certain design choices were made, leading to potential misinterpretation or costly rework.

## Decision

We will adopt the Architecture Decision Record (ADR) pattern as described by Michael Nygard to document significant architectural decisions in the project.

### ADR Format

Each ADR follows this structure:

1. **Title** — Short, imperative, present tense
2. **Status** — `Proposed` / `Accepted` / `Deprecated` / `Superseded by ADR-NN`
3. **Context** — Forces at play, what makes the decision non-obvious
4. **Decision** — What we are doing (affirmative, present tense)
5. **Consequences** — What becomes easier, harder, or given up
6. **Alternatives considered** — Designs that lost, with one-sentence rationale

### Storage Location

- All ADRs live in `/docs/adr/`
- Numbered sequentially: `01-...`, `02-...`
- File names use kebab-case derived from title
- Append-only — never edit an accepted ADR except to mark it superseded

### ADR Lifecycle

- Proposed ADRs can be opened by any contributor
- Acceptance requires maintainer review (CODEOWNERS-gated)
- To change a decision, write a new ADR that supersedes the old one
- Maintain an index table in `/docs/adr/README.md`

## Consequences

- **Easier:** Future maintainers can quickly understand architectural decisions. AI agents can reason about design choices when making changes. Reduces need for oral history or tribal knowledge transfer.
- **Harder:** Requires discipline to write ADRs for significant decisions. Initial time investment for each ADR. Must keep index table synchronized.
- **Given up:** Informal documentation in code comments for architectural decisions. Relying on git history for architecture rationale.
- **Migration:** This ADR establishes the pattern. No existing code changes required. Future decisions will follow this pattern.

## Alternatives considered

- **Keep architecture in code comments:** Rejected because comments are scattered, hard to discover, and don't capture the decision-making process
- **Use a separate wiki:** Rejected because keeping docs in-repo with code improves discoverability and keeps docs versioned with code
- **No formal documentation:** Rejected because this would lead to knowledge loss and make future maintenance difficult