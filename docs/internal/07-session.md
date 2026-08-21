# Session Package

The `internal/session` package provides a session-history mechanism for collecting conversation records, review items, and token usage, plus loading/listing past sessions for resume and the viewer.

Package doc: *"provides a session history mechanism for collecting conversation records during a review run."*

## Core Type

```go
func New(repoDir, gitBranch, model string, opts SessionOptions) *SessionHistory
```

- `SessionHistory` — the in-memory accumulator for one review run. Append task records, responses, tool results, and review items; it serializes to disk so a run can be resumed or replayed.
- `SessionOptions` — options controlling what is recorded (e.g. whether to capture full conversations).

## Records

`SessionHistory` is built from record types:

- `TaskRecord` — one reviewed unit (a file or a file bundle).
- `ResponseRecord` — a model response.
- `ToolResultRecord` — a tool-call result.
- `TokenUsage` — token counters for a response.
- `FileSession` — per-file session grouping.

## Resume

- `ResumeInfo` — summary info used by the agent to resume an interrupted run.
- `ResumeState` (referenced by `agent`/`scan`) — the richer persisted state reconstructed from disk.

## Comments

- `LoadComments(repoDir, sessionID string) ([]model.LlmComment, error)` — returns the ordered review comments recorded in a session, with later checkpoints superseding earlier ones.

## Listing & Loading (read side, used by viewer and `ocr session`)

- `Summary` — aggregate summary of a session.
- `ItemDetail` — per-item detail for a session.
- `SessionsDir(repoDir string) (string, error)` — resolves the sessions directory for a repo (falls back to a home-relative location when the repo dir is unavailable).
- `ListSessions(repoDir string) ([]Summary, error)` — lists sessions (sorted, aggregated).
- `LoadSummary(repoDir, sessionID string) (*Summary, error)` — loads a session summary; prefers the v1 run manifest, falls back to session-end files reviewed.
- `LoadDetail(repoDir, sessionID string) (*Summary, []ItemDetail, error)` — loads summary + per-item detail.

## Task Types

- `TaskType` — enum string classifying a task (e.g. review vs. scan item).

## Dependencies / Related

- `internal/model` — `model.LlmComment` is the comment type returned by `LoadComments`.
- `internal/agent` and `internal/scan` — construct a `SessionHistory` via `New` and record into it.
- `internal/viewer` — uses `ListSessions` / `LoadSummary` / `LoadDetail`.

## Links

- [Agent Package](01-agent.md)
- [Scan Package](16-scan.md)
- [Viewer Package](08-viewer.md)
- [Model Package](14-model.md)
