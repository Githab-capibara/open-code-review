# OpenCodeReview Documentation

Welcome to the official documentation for OpenCodeReview, an AI-powered code review CLI tool.

## Start Here

| Guide | Purpose |
|-------|---------|
| [01-quickstart](user-guide/01-quickstart.md) | Get started in ~5 minutes |
| [02-installation](user-guide/02-installation.md) | Install on your platform |
| [03-configuration](user-guide/03-configuration.md) | Configure LLM providers and settings |
| [01-overview](architecture/01-overview.md) | Understand the architecture |

## Directory Map

| Folder | Contents |
|--------|----------|
| **[adr/](adr/)** | Architecture Decision Records - non-obvious design decisions |
| **[architecture/](architecture/)** | System architecture and design patterns |
| **[bin/](bin/)** | Binary entry points and npm wrapper scripts |
| **[ci-cd/](ci-cd/)** | CI/CD integration guides and workflows |
| **[design/](design/)** | Design documents and research notes |
| **[development/](development/)** | Development setup and guidelines |
| **[examples/](examples/)** | CI/CD pipeline examples (GitHub Actions, GitLab CI, etc.) |
| **[extensions/](extensions/)** | IDE extensions (VSCode, JetBrains, etc.) |
| **[governance/](governance/)** | Project governance, policies, and procedures |
| **[integration/](integration/)** | Third-party integrations (Claude Code, Cursor, Codex, etc.) |
| **[internal/](internal/)** | Internal package documentation |
| **[npm/](npm/)** | NPM package platform-specific assets |
| **[pages/](pages/)** | Website source code and documentation |
| **[planning/](planning/)** | Roadmap and planning documents |
| **[plugins/](plugins/)** | Plugin system documentation |
| **[scripts/](scripts/)** | Build, verification, and maintenance scripts |
| **[security/](security/)** | Security policies and assurance |
| **[skills/](skills/)** | Portable agent skills documentation |
| **[user-guide/](user-guide/)** | User documentation and CLI reference |

## Key Entry Points

### For Users
- [Quick Start Guide](user-guide/01-quickstart.md) - Get up and running quickly
- [CLI Reference](user-guide/04-cli-reference.md) - All commands and flags
- [Review Rules](user-guide/05-review-rules.md) - Customize review behavior
- [Integration Guides](integration/) - Connect to your coding workflow

### For Contributors
- [Contributing Guide](development/02-contributing.md) - How to contribute
- [Claude Code Setup](development/03-claude.md) - AI assistant configuration
- [Architecture Overview](architecture/01-overview.md) - System architecture
- [Internal Packages](internal/) - Internal package documentation

### For Integrators
- [Plugin System](plugins/) - Build plugins for OCR
- [MCP Server](integration/05-mcp.md) - Use OCR via Model Context Protocol
- [Delegate Mode](integration/01-delegate.md) - Integrate with AI agents
- [Extension Development](extensions/) - Build IDE extensions

## Governance

- [Security Policy](security/01-security-policy.md) - Security reporting and best practices
- [Code of Conduct](governance/02-code-of-conduct.md) - Community behavior guidelines
- [Governance Model](governance/03-governance.md) - Project governance and decision-making
- [Contributing Guidelines](development/02-contributing.md) - Contribution workflow and standards

## ADR Index

| # | Title | Status |
|---|---|---|
| [01](adr/01-record-architecture-decisions.md) | Record architecture decisions | Accepted |

---

**Table of Contents Navigation:**
- [Architecture Decision Records](adr/README.md)
- [Security Documentation](security/README.md)
- [Governance](governance/README.md)
- [Architecture](architecture/README.md)
- [Integration Guides](integration/README.md)
- [User Guide](user-guide/README.md)
- [Development](development/README.md)
- [Internal Packages](internal/README.md)
- [Plugins](plugins/README.md)
- [Extensions](extensions/README.md)
- [CI/CD](ci-cd/README.md)
- [Planning](planning/README.md)
- [Examples](examples/README.md)
- [Pages](pages/README.md)
- [Skills](skills/README.md)
- [Scripts](scripts/README.md)
- [Bin](bin/README.md)
- [NPM](npm/README.md)