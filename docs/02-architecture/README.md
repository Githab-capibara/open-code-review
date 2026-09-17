# Architecture

- **Authors:** @Githab-capibara

This directory contains the architecture documentation for OpenCodeReview (OCR).

## Contents

| Document | Purpose |
|----------|---------|
| [01-overview.md](01-overview.md) | How the whole system fits together |
| [02-review-engine.md](02-review-engine.md) | The diff-based review pipeline |
| [03-agent-orchestration.md](03-agent-orchestration.md) | Agent dispatch, grouping, and cost estimation |
| [04-llm-client.md](04-llm-client.md) | Multi-protocol LLM client abstraction |
| [05-tool-system.md](05-tool-system.md) | Tools the agent can invoke during review |
| [06-session-management.md](06-session-management.md) | JSONL session persistence, resume, and compare |
| [07-diff-parser.md](07-diff-parser.md) | Unified diff parsing and line-number resolution |
| [08-rules-engine.md](08-rules-engine.md) | Per-file review rules and rule matching |

Use [`template.md`](template.md) as the starting point for new documents in
this directory.

## Related

- [ADR index](../03-adr/)
- [Design documents](../04-design/)