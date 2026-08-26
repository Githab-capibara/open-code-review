# 01. Plugins overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [plugins/open-code-review/](../../plugins/open-code-review/), [Integration index](../integration/README.md)

## Context

OpenCodeReview ships as one Go binary (`ocr`), but coding agents each have
their own extension format. The plugin system packages review commands,
skills, and prompts per platform so users install once and get native
slash-command / tool integration.

## Decision

Maintain all platform plugins under `plugins/open-code-review/`, one
subdirectory (or manifest) per host platform:

| Platform | Location | Mechanism |
|----------|----------|-----------|
| Claude Code | [`claude-code/`](../../plugins/open-code-review/claude-code/) | `.claude-plugin/plugin.json` manifest + slash commands `review.md`, `delegate-review.md` |
| Codex | [`.codex-plugin/plugin.json`](../../plugins/open-code-review/.codex-plugin/plugin.json), `CODEX.ko-KR.md` | Codex plugin manifest with callable review skills |
| Cursor | [`.cursor-plugin/plugin.json`](../../plugins/open-code-review/.cursor-plugin/plugin.json) | Cursor plugin manifest with portable skills |
| OpenCode | [`opencode/`](../../plugins/open-code-review/opencode/) | Native TypeScript plugin (`open-code-review.ts`) with its own `package.json`, vitest tests, and README |
| QCA Forward | [`qca/`](../../plugins/open-code-review/qca/) | Host-model delegation: `system-prompt.md` plus ready-to-publish `template.example.json` |

Both portable agent skills (`open-code-review`,
`open-code-review-delegate`) are bundled inside the plugin tree under
[`skills/`](../../plugins/open-code-review/skills/) and mirrored at the
repository root under [`skills/`](../../skills/) — see
[Skills overview](../skills/01-skills-overview.md).

## Consequences

- **Easier:** users install a single plugin per platform; command names and
  behavior stay consistent across hosts.
- **Harder:** five platform manifests must be kept in sync when review
  behavior changes.
- **Given up:** a single universal plugin format — none of the hosts share
  one.
- **Migration:** adding a new host means adding one subdirectory with its
  manifest and updating this document.

## Alternatives considered

- **Single generic skill only (no plugins):** rejected because slash-command
  UX and native tool registration differ too much per host.
- **Per-platform repositories:** rejected because it splits release
  engineering and the copies drift quickly.
