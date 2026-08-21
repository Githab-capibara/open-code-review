# Scan Package

The `internal/scan` package implements full-file scan mode: instead of reviewing a git diff, it reviews entire files (or directories) for auditing unfamiliar codebases.

## Overview

`scan` reuses the same agent/loop machinery as review but sources its inputs from files on disk rather than a diff. It bundles files, applies rule matching, runs the loop per item, de-duplicates comments, and supports resume.

## Agent

```go
type Args struct { /* repo dir, paths, background, model overrides, batch strategy, resume */ }

type Agent struct { /* ... */ }

func NewAgent(args Args) *Agent

func (a *Agent) Run(ctx context.Context) ([]model.LlmComment, error)

func (a *Agent) Session() *session.SessionHistory
func (a *Agent) SessionID() string
func (a *Agent) ResumeInfo() *session.ResumeInfo
func (a *Agent) FilesReviewed() int64
func (a *Agent) Diffs() []model.Diff
func (a *Agent) ProjectSummary() string
func (a *Agent) BudgetExceeded() bool
func (a *Agent) Warnings() []llmloop.AgentWarning
func (a *Agent) ToolCalls() map[string]int64
func (a *Agent) TotalTokensUsed() int64   // + Input/Output/CacheRead/CacheWrite counters
```

- `NewAgent(args Args) *Agent` — builds the scan agent. `Args` carries the target paths, optional background note, model overrides, batch strategy, and an optional resume session.
- `Run(ctx) ([]model.LlmComment, error)` — executes the scan and returns the collected comments.
- The token/warning/tool-call accessors delegate to the underlying `llmloop.Runner`.
- `BudgetExceeded()` reports whether the run hit its token budget.

## Batching

- `BatchStrategy` (string) — how files are grouped for concurrent review (`none`, `by-language`, `by-directory`). `parseBatchStrategy` and `groupBatches` implement it, with a max batch-size cap.

## Helpers (verified)

- `toLoopTemplate(s template.ScanTemplate) template.Template` — adapts the scan template for the loop.
- `scanItemFingerprint(it model.ScanItem) string` — stable id for a scan item (resume/dedup).
- `resumedFromSession(resume *session.ResumeState) string` — derives a resume marker.
- `extFromPath(path string) string` — file extension extraction.
- `buildSummaryCommentsList`, `buildDedupCommentsJSON`, `applyDedupGroups`, `formatPlanGuidance` — comment summarization, de-duplication, and plan-guidance rendering.
- `filterLargeScans` — caps very large scans; `injectScanContentMap` feeds file contents into prompts.

## Dependencies / Related

- `internal/config/template` — `template.ScanTemplate`.
- `internal/model` — `model.ScanItem`, `model.Diff`, `model.LlmComment`.
- `internal/session` — `session.ResumeState`, `session.ResumeInfo`, `session.SessionHistory`.
- `internal/llmloop` — `llmloop.AgentWarning`, the runner.
- `internal/diff` — `model.Diff` generation for scan items.

## Links

- [Config / Template](04-config.md)
- [Model Package](14-model.md)
- [Session Package](07-session.md)
- [LLM Loop Package](13-llmloop.md)
- [Agent Package](01-agent.md)
