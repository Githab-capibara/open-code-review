# Design Documents

This directory contains design documents for OpenCodeReview — research notes, technical explorations, and design proposals that feed into architecture decisions.

## When to use this folder

Use design documents when you need to:

- Research external technologies or approaches before implementation
- Document technical explorations and experiments
- Propose new features or architectural changes
- Capture design thinking before committing to an ADR

## Format

Design documents use this structure:

- **Status:** Research note | Proposed | Accepted | Deprecated
- **Date:** YYYY-MM-DD
- **Deciders:** GitHub handles
- **Researcher:** agent/person who wrote the doc
- **Purpose:** What this document achieves
- **Feeds into:** ADR or implementation this doc informs

## Lifecycle

- Numbered sequentially: `01-...`, `02-...`
- File name kebab-case, derived from the title
- Can be superseded by ADRs when decisions are finalized
- Keep drafts as status "Research note" until ready for review

## Index

| # | Title | Status | Feeds into |
|---|---|---|---|
| [01](01-design-overview.md) | Design overview | Accepted | docs/architecture/01-overview.md|