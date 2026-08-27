# 13. LLM Loop Package

The `internal/llmloop` package is the engine that drives one review file through the LLM: it builds the message list, enforces the token budget, runs tool calls, and collects comments.

## Overview

`llmloop` owns the per-file agent loop:

- Token budgeting and context window partitioning.
- Tool-call execution (delegating to `internal/tool` and `internal/mcp` providers).
- Warning/usage collection and background compression jobs.
- Markdown-fence stripping for model output.

## Token Budget

```go
func PromptTokenLimit(maxTokens int) int
func CountMessagesTokens(msgs []llm.Message) int
```

- `PromptTokenLimit(maxTokens int) int` — derives the usable prompt cap from a configured `maxTokens` (reserves room for the response).
- `CountMessagesTokens(msgs []llm.Message) int` — sums tokens across a message list (BPE via `internal/llm`).

## Runner

```go
type Deps struct { /* model client, tool registry, session, budget, callbacks */ }

type Runner struct { /* ... */ }

func NewRunner(deps Deps) *Runner

func (r *Runner) RunPerFile(ctx context.Context, messages []llm.Message, newPath string) (bool, MainLoopStop, error)
func (r *Runner) WaitBackground()
func (r *Runner) TotalInputTokens() int64
func (r *Runner) TotalOutputTokens() int64
func (r *Runner) TotalCacheReadTokens() int64
func (r *Runner) TotalCacheWriteTokens() int64
func (r *Runner) TotalTokensUsed() int64
func (r *Runner) Warnings() []AgentWarning
func (r *Runner) RecordWarning(warningType, file, message string)
func (r *Runner) ToolCalls() map[string]int64
func (r *Runner) RecordUsage(u *llm.UsageInfo)
func (r *Runner) CollectPendingComments() []model.LlmComment
```

- `NewRunner(deps Deps) *Runner` — constructs the loop runner from its dependencies.
- `RunPerFile(ctx, messages, newPath) (bool, MainLoopStop, error)` — runs the loop for one file; returns whether the task is done, a `MainLoopStop` reason, and an error.
- `MainLoopStop` — enum classifying why the loop stopped (e.g. task done, budget exceeded, unrecoverable).
- Token counters aggregate input/output/cache usage; `Warnings()` exposes `AgentWarning` entries collected during the run.
- `CollectPendingComments()` — drains asynchronously-produced comments (e.g. from the code-comment worker pool).

## Helpers

- `StripMarkdownFences(s string) string` — public wrapper that strips ``` fences from model output (used when parsing tool/comment payloads).
- Internal partition types (`round`, `partitionResult`, `compressionJob`, `compressionState`) support context-window partitioning and background compression so long conversations fit the budget.

## Dependencies / Related

- `internal/llm` — `llm.Message`, `llm.UsageInfo`.
- `internal/tool`, `internal/mcp` — tool execution.
- `internal/model` — `model.LlmComment`.
- `internal/agent` — wraps `llmloop.Runner` for the whole review; `CommentWorkerPool` / `AgentWarning` are surfaced there.

## Links

- [LLM Package](02-llm.md)
- [Tool Package](03-tool.md)
- [MCP Package](09-mcp.md)
- [Model Package](14-model.md)
- [Agent Package](01-agent.md)
