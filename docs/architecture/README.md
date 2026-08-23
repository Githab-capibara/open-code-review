# Architecture Documentation

This directory contains architecture and design documentation for OpenCodeReview, copied and adapted from the website source (`pages/src/content/docs/en/`).

## Key Documents

| Guide | Purpose |
|-------|---------|
| [01-overview.md](01-overview.md) | System architecture overview and design philosophy |

## Core Design Philosophy

OpenCodeReview combines deterministic engineering with AI agents:

### Deterministic Engineering (Hard Constraints)

- **Precise file selection** — Determines exactly which files need review
- **Smart file bundling** — Groups related files for efficient parallel processing
- **Fine-grained rule matching** — Matches review rules to file characteristics
- **External positioning/reflection modules** — Improves comment accuracy

### Agent (Dynamic Decision-Making)

- **Scenario-tuned prompts** — Optimized for code review, reducing token consumption
- **Scenario-tuned toolset** — Purpose-built tools derived from production data analysis

## Architecture Components

```
┌─────────────────────────────────────────────────────┐
│  CLI Layer (cmd/opencodereview/)                    │
│  - Commands: review, scan, delegate, config, etc.   │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│  Review Engine (internal/)                          │
│  - agent/: AI agent orchestration                   │
│  - llm/: LLM client and retry logic                 │
│  - tool/: Agent tool implementations                │
│  - config/: Configuration management                │
│  - diff/: Git diff parsing                          │
│  - session/: Session management                     │
└─────────────────────────────────────────────────────┘
```

## Key Features

- **Hybrid architecture** — Deterministic engineering + AI agent
- **Parallel processing** — File bundles reviewed concurrently
- **Retry mechanism** — Automatic retry with exponential backoff
- **Session management** — Resume interrupted reviews
- **MCP server** — Expose capabilities via Model Context Protocol
- **Multiple integration modes** — Default, Delegate, Agent Skill

## Links

- [ADR Index](../adr/README.md)
- [Internal Packages](../internal/README.md)
- [Governance](../governance/03-governance.md)
