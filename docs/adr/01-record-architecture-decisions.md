# 01. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-08-21
- **Deciders:** @lizhengfeng101
- **Related:** None

## Context

As OpenCodeReview grows, we need to capture architectural decisions that shape the codebase. Without proper documentation, future maintainers (human or AI) may struggle to understand why certain design choices were made, leading to potential misinterpretation or costly rework.

## Decision

We adopt the Architecture Decision Record pattern as described by Michael Nygard to document significant architectural decisions in the project.

## Consequences

- **Easier:** Future maintainers can quickly understand architectural decisions. AI agents can reason about design choices when making changes. Reduces need for oral history or tribal knowledge transfer.
- **Harder:** Requires discipline to write ADRs for significant decisions. Initial time investment for each ADR. Must keep index table synchronized.
- **Given up:** Informal documentation in code comments for architectural decisions. Relying on git history for architecture rationale.
- **Migration:** This ADR establishes the pattern. No existing code changes required. Future decisions will follow this pattern.

## Alternatives considered

- **Keep architecture in code comments:** Rejected because comments are scattered, hard to discover, and don't capture the decision-making process
- **Use a separate wiki:** Rejected because keeping docs in-repo with code improves discoverability and keeps docs versioned with code
- **No formal documentation:** Rejected because this would lead to knowledge loss and make future maintenance difficult