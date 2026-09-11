# Agent Skills

This directory contains documentation for OpenCodeReview's portable agent skills.

## Index

| # | Title | Status |
|---|---|---|
| [01](01-skills-overview.md) | Skills Overview | Active |
| [02](02-open-code-review-skill.md) | Core Review Skill | Active |
| [03](03-open-code-review-delegate-skill.md) | Delegate Skill | Active |
| [04](04-plugin-open-code-review-skill.md) | Plugin Skill | Active |
| [05](05-plugin-open-code-review-delegate-skill.md) | Plugin Delegate Skill | Active |

## What are Agent Skills?

Agent skills are portable, platform-agnostic instruction files that teach AI coding agents (Codex, OpenCode, etc.) how to use OpenCodeReview for code review.

## Available Skills

| Skill | Platform | Description |
|-------|----------|-------------|
| [open-code-review-delegate](../../skills/open-code-review-delegate/) | Universal | Delegation mode skill for any agent |
| [open-code-review](../../skills/open-code-review/) | Universal | Core review skill |

## Skill Format

Skills follow the SKILL.md format:

```markdown
---
name: skill-name
description: What this skill does
---

## Usage

When to invoke this skill.

## Steps

1. Step one
2. Step two
```

## Installation

Skills are plain folders with a `SKILL.md` inside. Copy them into your
agent's skills directory:

```bash
cp -R /path/to/open-code-review/skills/open-code-review <skills-dir>/
npx skills add alibaba/open-code-review --skill open-code-review
```

See [Installation](../integration/02-agent-skill.md#install) for the
skills-directory locations of common agents.

## Links

- [Agent Skill Integration](../integration/02-agent-skill.md)
- [Plugin System](../plugins/README.md)
