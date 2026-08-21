# Planning Documentation

This directory contains planning documents for OpenCodeReview.

## Documents

| File | Purpose |
|------|---------|
| [01-roadmap.md](01-roadmap.md) | Project roadmap and planned features |

## Current State (Mid-2026)

OpenCodeReview currently provides:

- CLI tool (`ocr`) for AI-powered code review
- Integration with coding agents: Claude Code, Codex, Cursor
- VSCode extension for in-editor code review
- CI/CD integration (GitHub Actions, GitLab CI, etc.)
- Multi-provider LLM support (OpenAI, Anthropic, Google Gemini, Amazon Bedrock, Azure OpenAI)
- MCP server for Model Context Protocol
- Review rules engine with per-file pattern matching
- Multi-language documentation (English, Chinese, Japanese, Korean, Russian)

## Planned Features

### H2 2026

- **JetBrains plugin** — IDE integration for IntelliJ IDEA, GoLand, PyCharm
- **Delegate Mode** — Subscription-friendly review where OCR doesn't need its own LLM
- **Ultra Mode** — Higher-recall review mode for security-sensitive changes

### H1 2027

- **Domain-Specific Long-Term Memory** — Persistent review knowledge that improves over time

## Out of Scope

- Automated code fixing without human review
- General-purpose AI coding assistant (code generation, refactoring, chat)
- Self-hosted LLM bundling

## Feedback

Provide feedback via:
- [GitHub Discussions](https://github.com/alibaba/open-code-review/discussions)
- [Issues](https://github.com/alibaba/open-code-review/issues)

## Links

- [Governance](../governance/03-governance.md)
- [Contributing](../development/02-contributing.md)