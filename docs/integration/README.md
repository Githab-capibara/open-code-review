# Integration Documentation

This directory contains documentation for third-party integrations, copied and adapted from the website source (`pages/src/content/docs/en/`).

## Available Integrations

| File | Description |
|------|-------------|
| [01-delegate.md](01-delegate.md) | Delegation mode — let your AI coding agent run the review |
| [02-agent-skill.md](02-agent-skill.md) | Portable agent skill for skill-compatible agents |
| [03-claude-code.md](03-claude-code.md) | Claude Code plugin and slash-command integration |
| [04-ci.md](04-ci.md) | CI/CD integration (GitHub Actions, GitLab CI, GitFlic, Gerrit, CodeUp, Bitbucket) |
| [05-mcp.md](05-mcp.md) | Model Context Protocol (MCP) server |
| [06-viewer.md](06-viewer.md) | Session viewer web interface |
| [07-telemetry.md](07-telemetry.md) | OpenTelemetry integration for observability |

## Integration Modes

### Default (OCR-Managed)

OCR runs the review using its configured LLM:
- Requires API key configuration
- Full control over review process
- Recommended for CI/CD and standalone usage

### Delegate Mode

Your AI coding agent runs the review using its own LLM:
- No OCR API key required
- OCR handles file selection and rule resolution
- Recommended for interactive development — see [01-delegate.md](01-delegate.md)

### Agent Skill

Install the portable skill for skill-compatible agents:
- Works with any agent supporting the skill format
- Single skill file, no dependencies
- Recommended for agent platforms — see [02-agent-skill.md](02-agent-skill.md)

## Quick Start

### Claude Code

```bash
npm install -g @alibaba-group/open-code-review
ocr config provider  # Configure your LLM
ocr review           # Review your changes
```

### Cursor / Codex / Other Agents

See [plugins documentation](../plugins/) for plugin installation, or [02-agent-skill.md](02-agent-skill.md) for the portable skill.

### MCP Server

```bash
ocr mcp start  # Start MCP server
# Configure your MCP client to connect to the server
```

## Support

For integration issues:
- [GitHub Issues](https://github.com/alibaba/open-code-review/issues)
- [GitHub Discussions](https://github.com/alibaba/open-code-review/discussions)
- [FAQ](../user-guide/06-faq.md)
