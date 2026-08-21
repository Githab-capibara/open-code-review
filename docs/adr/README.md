# Architecture Decision Records

This directory contains the **Architecture Decision Records** (ADRs) for
OpenCodeReview — short, numbered, append-only documents that capture
non-obvious architectural decisions, their context, and their
consequences.

## When to write one

Write an ADR when the answer to "why is the code shaped this way?"
needs to be available to a future maintainer (human or AI) who was not
in the room when the decision was made. Concretely:

- A trade-off between two viable designs where the loser is not
  obviously bad (e.g. middleware composition order, sandbox transport
  mechanism, LLM integration approach, token budget management).
- A constraint that the code relies on but does not test (e.g. an
  invariant about which services share a configuration namespace).
- A reversal of a previous decision — the old ADR is marked
  `Superseded` and the new one explains why.
- A policy that governs how the project is operated (e.g. the
  agent tool selection criteria, the retry boundary policy).

Do **not** write an ADR for:

- Decisions that are obvious from reading the code.
- Bug fixes that do not change architecture.
- Style or formatting decisions (the project's lint config is the
  source of truth).
- Feature scoping (open an issue).

## Format

Each ADR follows the [Michael Nygard format](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions):

1. **Title** — short, imperative, present tense.
2. **Status** — `Proposed` / `Accepted` / `Deprecated` / `Superseded by ADR-NN`.
3. **Context** — the forces at play; what makes this decision non-obvious.
4. **Decision** — what we are doing.
5. **Consequences** — what becomes easier, what becomes harder, what is
  given up.
6. **Alternatives considered** — the designs that lost, with one
  sentence each on why.

Use [`template.md`](template.md) as the starting point.

## Lifecycle

- Numbered sequentially, two digits, never renumbered: `01-...`,
  `02-...`. The number is allocated when the PR opens; if your draft
  PR sits for a while and another ADR lands first, renumber yours.
- File name kebab-case, derived from the title: `07-agent-architecture.md`.
- Append-only. To change a decision, write a new ADR that supersedes
  the old one; do not edit the old one except to flip its `Status` to
  `Superseded by ADR-NN`.
- ADRs are CODEOWNERS-gated (`docs/adr/**` requires owner review).
  Proposed ADRs may be opened by any contributor; only an owner-approved
  PR can land them at `Status: Accepted`.

## Index

| # | Title | Status |
|---|---|---|
| [01](01-record-architecture-decisions.md) | Record architecture decisions | Accepted |

Keep this index in sync when you land a new ADR.