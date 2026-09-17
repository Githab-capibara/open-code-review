# 03. Coding-Agent Plugins

- **Authors:** @Githab-capibara

- **Status:** Shipped
- **Audience:** agent users

## Overview

`plugins/open-code-review/` ships platform-specific integrations for
CJK-style coding agents so `ocr review` is one command away. All
integrations require Git 2.41+ and the `ocr` CLI installed first
(`npm install -g @alibaba-group/open-code-review`), plus a configured
LLM — unless you use [delegation mode](../05-cli/03-delegate-command.md)
where the host agent supplies the model.

## Platforms

| Platform | Manifest / entry | How to install |
|----------|------------------|----------------|
| Claude Code | `.claude-plugin/` commands | `/plugin marketplace add alibaba/open-code-review` → `/plugin install open-code-review@open-code-review` → `/open-code-review:review`, `/open-code-review:delegate-review` |
| Codex | `.codex-plugin/plugin.json` | add the repo as a Codex marketplace |
| Cursor | `.cursor-plugin/plugin.json` | add via Cursor plugin marketplace |
| OpenCode | `opencode/open-code-review.ts` | see `plugins/open-code-review/opencode/README.md` |
| QCA Forward | `qca/system-prompt.md` + template | see `plugins/open-code-review/qca/README.md` |

In all flavors **OCR drives the review** — it resolves the diff, runs
its own sub-agents, and returns line-level comments. This is the
opposite of [delegation mode](../05-cli/03-delegate-command.md), where
the host agent supplies the reasoning.

## Related

- [Skills](04-skills.md) — the portable, agent-agnostic format
- [Claude Code guide on the website](../../pages/src/content/docs/en/integrations/claude-code.md)
- [plugins/open-code-review/README.md](../../plugins/open-code-review/README.md)