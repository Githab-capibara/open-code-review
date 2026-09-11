# Integration Documentation

This directory contains documentation for third-party integrations, copied and adapted from the website source (`pages/src/content/docs/en/`).

## Index

| # | Title | Status |
|---|---|---|
| [01](01-delegate.md) | Delegate Mode | Accepted |
| [02](02-agent-skill.md) | Agent Skill | Accepted |
| [03](03-ci.md) | CI/CD Integration | Accepted |
| [04](04-mcp.md) | MCP Server | Accepted |
| [05](05-viewer.md) | Session Viewer | Accepted |
| [06](06-telemetry.md) | Telemetry | Accepted |

## Available Integrations

| File | Description |
|------|-------------|
| [01-delegate.md](01-delegate.md) | Delegation mode — let your AI coding agent run the review |
| [02-agent-skill.md](02-agent-skill.md) | Portable agent skill for skill-compatible agents |
| [03-ci.md](03-ci.md) | CI/CD integration (GitHub Actions, GitLab CI, GitFlic, Gerrit, CodeUp, Bitbucket) |
| [04-mcp.md](04-mcp.md) | Model Context Protocol (MCP) server |
| [05-viewer.md](05-viewer.md) | Session viewer web interface |
| [06-telemetry.md](06-telemetry.md) | OpenTelemetry integration for observability |

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

### Codex / OpenCode / Other Agents

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

## Links

- [Pipeline Documentation](../pipeline/README.md)
- [Plugins](../plugins/README.md)
- [Security Policy](../security/01-security-policy.md)
