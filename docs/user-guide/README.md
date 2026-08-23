# User Guide

This directory contains user-facing documentation for OpenCodeReview, copied and adapted from the website source (`pages/src/content/docs/en/`).

## Documents

| Guide | Purpose |
|-------|---------|
| [01-quickstart.md](01-quickstart.md) | Get started in 5 minutes |
| [02-installation.md](02-installation.md) | Install on every platform |
| [03-configuration.md](03-configuration.md) | Configure LLM providers and settings |
| [04-cli-reference.md](04-cli-reference.md) | Complete CLI command and flag reference |
| [05-review-rules.md](05-review-rules.md) | Customize review rules |
| [06-faq.md](06-faq.md) | Common questions and troubleshooting |
| [07-tools.md](07-tools.md) | Built-in agent tool reference |

## Quick Start

```bash
# 1. Install
npm install -g @alibaba-group/open-code-review

# 2. Configure LLM
ocr config provider

# 3. Review
cd your-project
ocr review
```

## Core Commands

### Review Commands
- `ocr review` — Review staged, unstaged, and untracked changes
- `ocr review --from main --to feature` — Review a branch diff
- `ocr review --commit abc123` — Review a single commit
- `ocr scan` — Full-file scan (no git history needed)

### Configuration
- `ocr config provider` — Configure the LLM provider
- `ocr config model` — Select the model
- `ocr rules check` — Preview rules for a file

### Session Management
- `ocr session list` — List review sessions
- `ocr session show <id>` — Show session details

### Delegation Mode
- `ocr delegate preview` — Preview delegation mode
- `ocr delegate rule <files>` — Get rules for an agent

## Getting Help

- [FAQ](06-faq.md) — Common questions
- [GitHub Discussions](https://github.com/alibaba/open-code-review/discussions) — Community help
- [GitHub Issues](https://github.com/alibaba/open-code-review/issues) — Bug reports and feature requests

## Advanced Topics

- [Review Rules Customization](05-review-rules.md)
- [MCP Server](../integration/05-mcp.md)
- [Delegate Mode](../integration/01-delegate.md)
- [CI/CD Integration](../integration/04-ci.md)
