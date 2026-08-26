# 01. Skills overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [skills/](../../skills/), [Plugins overview](../plugins/01-plugins-overview.md)

## Context

Beyond full plugins, many agents accept plain `SKILL.md` files (Claude Code,
Codex, Cursor, other skill-compatible hosts). Skills are the lowest common
denominator: markdown instructions plus YAML frontmatter, no code.

## Decision

Maintain two portable agent skills at the repository root under
[`skills/`](../../skills/):

| Skill | File | Purpose |
|-------|------|---------|
| `open-code-review` | [`SKILL.md`](../../skills/open-code-review/SKILL.md) | Runs AI review via the `ocr` CLI — workspace diff review, single commit, branch ranges, full-file `ocr scan`. Requires an installed `ocr` and a configured LLM endpoint |
| `open-code-review-delegate` | [`SKILL.md`](../../skills/open-code-review-delegate/SKILL.md) | Delegation mode: the host agent performs the review itself using its own LLM; OCR supplies only deterministic engineering (file selection, rule resolution). No LLM configuration needed on the OCR side |

Both carry YAML frontmatter (`name`, `description`, `license: Apache-2.0`,
`compatibility`, `metadata.version = "1.0.0"`), are Apache-2.0 licensed, and
are duplicated into [`plugins/open-code-review/skills/`](../../plugins/open-code-review/skills/)
so that plugin installs pick them up automatically.

## Consequences

- **Easier:** any skill-compatible agent can adopt review capability by
  copying one directory; no build step involved.
- **Harder:** two copies of each skill must be kept in sync (repository
  root vs plugin bundle).
- **Given up:** programmatic APIs — skills are prompt-level instructions
  only.
- **Migration:** when editing a `SKILL.md`, update both copies in the same
  PR.

## Alternatives considered

- **Generate plugin skill copies at build time:** rejected for now because
  the files are small and static duplication avoids release complexity.
- **One mega-skill with modes:** rejected because delegation mode has a
  different trigger surface and different prerequisites (LLM-free).
