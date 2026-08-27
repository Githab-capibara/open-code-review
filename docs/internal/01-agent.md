# 01. Agent Package

The `internal/agent` package implements the core review agent that orchestrates the code-review loop over a set of diffs.

## Overview

The agent package is the engine behind `ocr review`. It:

- Dispatches review work across a pool of comment workers (`llmloop.CommentWorkerPool`).
- Builds LLM tool definitions from the configured tool set (`BuildToolDefs`).
- Fingerprints each review item so resumable sessions skip work already done.
- Classifies per-item and main-loop failures into recoverable vs. fatal classes (`session.FailureClass`).

## Key Types

| Type | Kind | Notes |
|------|------|-------|
| `Agent` | struct | The review orchestrator. Created via `New(args Args)`. |
| `Args` | struct | Inputs to `New`: repo dir, diffs, model, runtime config, tool entries, etc. |
| `RuntimeConfig` | struct | Runtime tunables (token budget, concurrency, timeouts). |
| `CommentWorkerPool` | alias | `= llmloop.CommentWorkerPool`; built via `NewCommentWorkerPool(workerCount int)`. |
| `AgentWarning` | alias | `= llmloop.AgentWarning`. |
| `ResumeInfo` | alias | `= session.ResumeInfo`. |

## Key Functions

- `New(args Args) *Agent` — constructs the agent.
- `NewCommentWorkerPool(workerCount int) *CommentWorkerPool` — builds the worker pool used to parallelize comment generation.
- `BuildToolDefs(entries []toolsconfig.ToolConfigEntry, planOnly bool) []llm.ToolDef` — converts tool config entries into LLM tool definitions.

## Internal Helpers (not part of the public contract)

Shown so reviewers can trace behavior; not guaranteed stable:

- `countDispatchable(diffs []model.Diff) int64`
- `reviewItemFingerprint(mode string, d model.Diff) string`
- `hashFields(fields ...string) string`
- `manifestPaths(d model.Diff) (oldPath, newPath string)`
- `classifyItemError(err error) (session.FailureClass, string)`
- `classifyMainLoopStop(stop llmloop.MainLoopStop) (session.FailureClass, string)`
- `resumedFromSession(resume *session.ResumeState) string`
- `buildFilterCommentsJSON(comments []model.LlmComment) string`
- `parseFilterToolCalls(calls []llm.ToolCall, total int) map[int]struct{}`
- `parseFilterResponse(raw string, total int) map[int]struct{}`
- `formatToolDefs(toolDefs []llm.ToolDef) string`
- `orderedToolParameters(raw json.RawMessage) ([]orderedToolParameter, bool)`

## Dependencies

- `internal/llmloop` — worker pool, main-loop control, message partitioning.
- `internal/session` — resumable session state and failure classification.
- `internal/model` — `Diff`, `LlmComment` data types.
- `internal/config/toolsconfig` — tool definitions consumed by `BuildToolDefs`.

## Notes for Auditors

- The agent delegates the actual LLM request/response loop to `llmloop`. Review prompt construction lives in `internal/config/template` and `internal/config/rules`.
- Resumability is real: `reviewItemFingerprint` is what lets an interrupted session skip already-reviewed items on resume.

## Links

- [LLM Loop Package](13-llmloop.md)
- [Session Package](07-session.md)
- [Model Package](14-model.md)
- [Tools Config](../internal/04-config.md)