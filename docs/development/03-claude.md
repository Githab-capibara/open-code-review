# 03. Claude Code Environment Setup

- **Status:** Accepted
- **Date:** 2026-08-21
- **Deciders:** @lizhengfeng101
- **Related:** [AGENTS.md](governance/01-agents.md), [Contributing Guide](02-contributing.md)

## Context

Developers using Claude Code as their AI coding assistant need project-specific guidance for working on OpenCodeReview. The `CLAUDE.md` file at the project root provides this context.

## Decision

The `CLAUDE.md` file delegates to `AGENTS.md` for comprehensive project guidelines. This keeps the Claude Code setup minimal while providing full documentation in a platform-agnostic location.

### CLAUDE.md Content

```markdown
See [AGENTS.md](./AGENTS.md) for all project guidelines.
```

### AGENTS.md Coverage

The `AGENTS.md` file covers:

- Project overview and module path
- Git commit notes (review before commit, English messages, LF line endings)
- License headers (SPDX, `make license-add`)
- Code style (`make check`, English-only source)
- Testing (`make test`, 90% coverage threshold)
- README localization workflow

## Consequences

- **Easier:** Single source of truth for project guidelines
- **Harder:** Claude Code users must read AGENTS.md (one extra click)
- **Given up:** Claude-specific inline instructions
- **Migration:** No migration needed

## Alternatives considered

- **Duplicate content in CLAUDE.md:** Rejected because it would diverge from AGENTS.md
- **Claude-specific instructions:** Rejected because project guidelines are platform-agnostic
- **No CLAUDE.md:** Rejected because Claude Code users expect this file
