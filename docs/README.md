# OpenCodeReview Documentation

- **Authors:** @Githab-capibara

> **Master index** for all OpenCodeReview documentation.

OpenCodeReview (OCR) is an AI-powered code review CLI tool that reads Git diffs,
sends changed files to a configurable LLM via an agent with tool-use capabilities,
and generates structured review comments with line-level precision.

## Start here

| Guide | Purpose |
|-------|---------|
| [Quickstart](01-getting-started/01-quickstart.md) | Get OCR running in under 5 minutes |
| [Architecture overview](02-architecture/01-overview.md) | How the system fits together |
| [CLI reference](05-cli/01-review-command.md) | Every command and flag |
| [Configuration](05-cli/05-config-command.md) | Provider, model, and behavior settings |
| [Contributing](08-guides/01-contributing.md) | How to help improve OCR |

## Directory map

| # | Directory | Contents |
|---|-----------|----------|
| 01 | [getting-started](01-getting-started/) | Quickstart guide, first review walkthrough |
| 02 | [architecture](02-architecture/) | System overview, review engine, agent orchestration, LLM client, tool system, session management, diff parser, rules engine |
| 03 | [adr](03-adr/) | Architecture Decision Records — numbered, append-only decisions |
| 04 | [design](04-design/) | Design documents, research notes, proposals |
| 05 | [cli](05-cli/) | Per-command reference: review, scan, delegate, session, config, viewer, llm |
| 06 | [integrations](06-integrations/) | GitHub Actions, GitLab CI, plugins, skills, MCP server, VSCode extension, other CI |
| 07 | [security](07-security/) | Security assurance case, vulnerability policy, trust boundaries |
| 08 | [guides](08-guides/) | Contributing, code of conduct, development setup, AI contributor policy |
| 09 | [governance](09-governance/) | Project governance, roles, decision-making |
| 10 | [roadmap](10-roadmap/) | Planned features and direction |
| 11 | [examples](11-examples/) | CI/CD integration examples |
| 12 | [internationalization](12-internationalization/) | Translation status and process |
| 13 | [agents-config](13-agents-config/) | AI agent operating principles and configuration |

## Key entry points

- **New to OCR?** Start with the [quickstart](01-getting-started/01-quickstart.md).
- **Curious how it works?** Read the [architecture overview](02-architecture/01-overview.md).
- **Need a specific command?** See the [CLI reference](05-cli/01-review-command.md).
- **Integrating into CI?** Check [GitHub Actions](06-integrations/01-github-actions.md) or [GitLab CI](06-integrations/02-gitlab-ci.md).
- **Adding a plugin?** See [plugins](06-integrations/03-plugins.md) and [skills](06-integrations/04-skills.md).
- **Security questions?** Read the [assurance case](07-security/01-security-assurance-case.md) and [security policy](07-security/02-security-policy.md).
- **Want to contribute?** Start with [contributing](08-guides/01-contributing.md).
- **Understanding decisions?** Browse the [ADR index](03-adr/).

## ADR index

| # | Title | Status |
|---|-------|--------|
| [01](03-adr/01-deterministic-agent-hybrid.md) | Deterministic engineering x agent hybrid architecture | Accepted |
| [02](03-adr/02-multi-protocol-llm-client.md) | Multi-protocol LLM client abstraction | Accepted |
| [03](03-adr/03-tool-use-over-generic-prompts.md) | Tool-use agent over generic prompt-only review | Accepted |
| [04](03-adr/04-session-resume-identity.md) | Session resume via identity fingerprinting | Accepted |
| [05](03-adr/05-github-action-composite.md) | GitHub Action as a composite action | Accepted |
| [06](03-adr/06-zero-ai-slop-policy.md) | Zero AI-slop policy — the 100% quality bar | Accepted |
| [07](03-adr/07-delegate-mode-architecture.md) | Delegate mode — host-agent review without own LLM key | Accepted |

## Governance

| Document | Purpose |
|----------|---------|
| [Governance](09-governance/01-governance.md) | Roles, decision-making, merge expectations |
| [Code of Conduct](08-guides/02-code-of-conduct.md) | Expected behavior and enforcement |
| [Security Policy](07-security/02-security-policy.md) | Vulnerability reporting and response timeline |
| [Contributing](08-guides/01-contributing.md) | How to submit changes |

## License

OpenCodeReview is licensed under the [Apache License 2.0](../LICENSE).
