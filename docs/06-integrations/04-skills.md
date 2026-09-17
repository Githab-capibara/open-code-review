# 04. Agent Skills

- **Authors:** @Githab-capibara

- **Status:** Shipped
- **Audience:** agent users

## Overview

`skills/` ships portable [Agent Skills](https://agentskills.io) —
`SKILL.md` manifests that work in any agent supporting the skills
standard. Two skills are published:

| Skill | Path | Who calls the LLM | Use when |
|-------|------|-------------------|----------|
| `open-code-review` | `skills/open-code-review/` | OCR | the agent can run the `ocr` CLI; OCR drives the full review, can auto-apply fixes |
| `open-code-review-delegate` | `skills/open-code-review-delegate/` | host agent | subscription-based agents — OCR does file selection + rules, the host reviews with its own quota |

## Install

```bash
npx skills add alibaba/open-code-review                       # review skill
npx skills add alibaba/open-code-review --skill open-code-review-delegate
```

Or copy the manifest manually:

```bash
cp -R skills/open-code-review ~/.claude/skills/
```

## Requirements

- `ocr` CLI on PATH (`npm install -g @alibaba-group/open-code-review`
  or a GitHub release binary).
- For the review skill: a configured LLM provider
  (`ocr config provider` → `ocr llm test`).
- For the delegate skill: **no LLM config** — see the CLI reference for
  `ocr delegate preview` / `ocr delegate rule`.

## Related

- [Delegate command](../05-cli/03-delegate-command.md)
- [ADR-07: delegate mode](../03-adr/07-delegate-mode-architecture.md)
- [Agent Skill guide on the website](../../pages/src/content/docs/en/integrations/agent-skill.md)