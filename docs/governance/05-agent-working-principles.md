# 05. Agent working principles

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** docs/governance/01-agents.md

## Context

This document captures non-negotiable working principles for AI agents and contributors in this repository. The principles were originally defined in Russian and are now documented in English as per project documentation standards.

## Decision

We will enforce the following principles for all agent and human contributors.

### Principles

1. **No laziness.** Always work at maximum quality.
2. **Reconnaissance before action.** Research first, act second.
3. **Update documentation on changes.** Any edit requires documentation update.
4. **Update documentation on new features.** Feature addition requires documentation update.
5. **Update tests on changes.** Edit existing tests or write new ones.
6. **Update tests on new features.** Edit existing tests or write new ones.
7. **Validate after work.** Always verify nothing is broken.
8. **System work requires maximum care.**
9. **GitHub work uses `gh`.** The `gh` CLI is configured.
10. **Commit author.** Always set commit author to: Nick: `Githab-capibara`, Email: `rrrarrr37r@gmail.com`.
11. **Documentation style.** Follow the documentation style defined in this repository: ADR format Michael Nygard, Design Documents format, README tables with Guide/Purpose, main README with badges, hero, benchmark donut chart, architecture SVG, docs links.
12. **Fix style violations.** If documentation is not in the required style, fix it immediately.

## Consequences

- **Easier:** Consistent quality bar and documentation hygiene.
- **Harder:** Requires discipline on every change.
- **Given up:** Informal shortcuts and undocumented changes.
- **Migration:** AGENTS.md moved from root to docs/governance.

## Alternatives considered

- **Keep principles in root file:** Rejected because all documentation must live in `/docs`.
- **Keep Russian original:** Rejected because documentation must be English only.
