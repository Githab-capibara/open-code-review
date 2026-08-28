# OpenCodeReview Documentation

Welcome to the official documentation for OpenCodeReview.

## Start here

| Guide | Purpose |
|-------|---------|
| [01-quickstart](user-guide/01-quickstart.md) | Get started in ~5 minutes |
| [02-installation](user-guide/02-installation.md) | Install on your platform |
| [03-configuration](user-guide/03-configuration.md) | Configure LLM providers |
| [01-overview](architecture/01-overview.md) | Understand architecture |

## Directory map

| Folder | Description |
|--------|-------------|
| [adr/](adr/) | Architecture Decision Records — trade-off documentation for non-obvious decisions |
| [architecture/](architecture/) | System architecture and design philosophy |
| [bin/](bin/) | Binary entry points and npm wrappers |
| [ci-cd/](ci-cd/) | CI/CD integration guides and platform recipes |
| [design/](design/) | Design documents and research notes |
| [development/](development/) | Development setup and contribution guidelines |
| [examples/](examples/) | CI/CD pipeline examples for all supported platforms |
| [extensions/](extensions/) | IDE extensions (VS Code, JetBrains) |
| [governance/](governance/) | Project governance, policies, and code of conduct |
| [integration/](integration/) | Third-party integrations (Claude Code, CI/CD, MCP, telemetry) |
| [internal/](internal/) | Internal Go package documentation |
| [npm/](npm/) | NPM platform assets and publishing |
| [pages/](pages/) | Website source code |
| [pipeline/](pipeline/) | Review execution pipeline documentation |
| [planning/](planning/) | Roadmap and planning documents |
| [plugins/](plugins/) | Plugin system and agent plugin formats |
| [scripts/](scripts/) | Build, verification, and maintenance scripts |
| [security/](security/) | Security policies and assurance case |
| [skills/](skills/) | Portable agent skills for Claude Code, Codex, Cursor, etc. |
| [user-guide/](user-guide/) | User-facing documentation and CLI reference |
| [rules/](rules/) | Per-language review-rule reference (mirrors internal/config/rules/rule_docs) |

## Key entry points

- → [Delegation Mode](integration/01-delegate.md) — how OCR works with subscription-based AI agents
- → [Architecture Overview](architecture/01-overview.md) — system design and execution pipeline
- → [Security Policy](security/01-security-policy.md) — vulnerability reporting and response
- → [Pipeline Overview](pipeline/01-pipeline-overview.md) — review execution from diff to comments
- → [CLI Reference](user-guide/04-cli-reference.md) — complete command and flag reference
- → [Agent Guidelines](governance/01-agents.md) — project-wide development rules
- → [Language Rule Docs](rules/README.md) — per-language review rules and supported formats

## Governance

- → [Security Policy](security/01-security-policy.md) — vulnerability disclosure and response timeline
- → [Contributing](development/02-contributing.md) — build, test, and contribution guidelines
- → [Code of Conduct](governance/02-code-of-conduct.md) — community behavior expectations
- → [Governance](governance/03-governance.md) — project structure and decision-making
