# Agent Skills

This directory contains documentation for OpenCodeReview's portable agent skills.

## What are Agent Skills?

Agent skills are portable, platform-agnostic instruction files that teach AI coding agents (Claude Code, Codex, Cursor, etc.) how to use OpenCodeReview for code review.

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

### Claude Code

```bash
# Skills are auto-discovered from .claude/skills/
```

### Cursor

```bash
# Copy skills to Cursor skills directory
```

### Other Agents

See [Integration Guide](../integration/02-agent-skill.md).

## Links

- [Agent Skill Integration](../integration/02-agent-skill.md)
- [Plugin System](../plugins/README.md)
