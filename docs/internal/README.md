# Internal Packages

This directory contains documentation for OpenCodeReview's internal Go packages.

## Package Overview

| Package | Purpose |
|---------|---------|
| [agent/](../../internal/agent/) | AI agent orchestration and management |
| [llm/](../../internal/llm/) | LLM client, retry logic, and provider interfaces |
| [tool/](../../internal/tool/) | Agent tool implementations (file search, read, etc.) |
| [config/](../../internal/config/) | Configuration management and validation |
| [diff/](../../internal/diff/) | Git diff parsing and analysis |
| [gitcmd/](../../internal/gitcmd/) | Git command execution with concurrency control |
| [session/](../../internal/session/) | Session management and persistence |
| [viewer/](../../internal/viewer/) | Web viewer for session history |
| [mcp/](../../internal/mcp/) | Model Context Protocol server implementation |
| [telemetry/](../../internal/telemetry/) | OpenTelemetry integration |
| [pathutil/](../../internal/pathutil/) | Path validation and security utilities |
| [delegate/](../../internal/delegate/) | Delegate mode implementation |
| [scan/](../../internal/scan/) | Full-file scan implementation |
| [stdout/](../../internal/stdout/) | Output formatting and display |
| [suggestdiff/](../../internal/suggestdiff/) | Diff suggestion generation |
| [llmloop/](../../internal/llmloop/) | LLM loop management |
| [model/](../../internal/model/) | Data models (Diff, ScanItem, LlmComment, Preview) |
| [release/](../../internal/release/) | Release asset validation |

## Key Architectural Patterns

### Agent System

The agent system (`internal/agent/`) orchestrates AI-powered code review:

- **Budget management:** Token budget allocation and tracking
- **Retry logic:** Automatic retry with exponential backoff
- **Identity tracking:** Request/response correlation
- **Manifest validation:** Tool result validation

### LLM Client

The LLM client (`internal/llm/`) provides:

- **Multi-provider support:** OpenAI, Anthropic, Google, Azure, etc.
- **Retry boundary:** Automatic retry with configurable boundaries
- **Token estimation:** BPE-based token counting
- **Session key management:** Request deduplication

### Tool System

Agent tools (`internal/tool/`) implement the tool interface:

- `code_search` — Search codebase with context
- `file_read` — Read full files with validation
- `file_find` — Find files by pattern
- `code_comment` — Generate code comments

### Security

Path validation (`internal/pathutil/`) ensures:

- All file paths are within repository root
- Symlinks are resolved before validation
- Path traversal attacks are prevented

## Development

### Testing

```bash
# Test specific package
go test ./internal/agent/...

# Test with race detector
go test -race ./internal/...

# Run coverage
go test -cover ./internal/...
```

### Adding a New Package

1. Create package directory under `internal/`
2. Implement package with tests
3. Add documentation here
4. Update package index

### Code Organization

```
internal/
├── agent/          # Agent orchestration
├── llm/            # LLM client and retry
├── tool/           # Agent tools
├── config/         # Configuration
├── diff/           # Diff parsing
├── gitcmd/         # Git command runner
├── session/        # Session management
├── viewer/         # Web viewer
├── mcp/            # MCP server
├── telemetry/      # Telemetry
├── pathutil/       # Path utilities
├── delegate/       # Delegate mode
├── scan/           # Full-file scan
├── stdout/         # Output formatting
├── suggestdiff/    # Diff suggestion
├── llmloop/        # LLM loop management
├── model/          # Data models
└── release/        # Release validation
```

## Links

- [Architecture Overview](../architecture/01-overview.md)
- [ADR Index](../adr/README.md)
- [Development Guide](../development/02-contributing.md)