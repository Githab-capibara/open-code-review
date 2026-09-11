# 04. Agent Working Principles

**Status:** Active
**Last Updated:** 2026-08-23
**Maintainer:** @Githab-capibara

## Purpose

This document captures non-negotiable working principles for AI agents and
contributors in this repository. The principles were originally defined in
Russian and are now documented in English as per project documentation standards.

## Scope

Applies to:
- All AI coding assistants operating in this repository
- All human contributors

## Policy

The following 12 principles are enforced for every change:

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
11. **Documentation style.** Follow the documentation style defined in this repository: ADR format (Michael Nygard), Design Documents format, README tables with Guide/Purpose, main README with badges, hero, benchmark donut chart, architecture SVG, docs links.
12. **Fix style violations.** If documentation is not in the required style, fix it immediately.

## Process

- Principles are enforced via [`docs/rules/README.md`](../rules/README.md) and CI checks.
- Violations are caught by `make check` (license + English-only gates).
- AI agents must self-audit against these principles before committing.

## Escalation

Disputes about principle interpretation are resolved by the Project Lead
(@Githab-capibara).

## Related Documentation

- [Agent Guidelines](01-agents.md)
- [Contributing Guide](../development/01-contributing.md)
