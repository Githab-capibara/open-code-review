# 12. Gitcmd Package

The `internal/gitcmd` package runs git commands with bounded concurrency and a consistent error/streaming API.

## Overview

`gitcmd` centralizes all git execution so the rest of OCR never shells out ad-hoc. A `Runner` serializes/limits concurrent git invocations per repo and exposes several call shapes.

## Runner

```go
type Runner struct { /* ... */ }

func New(maxConcurrent int) *Runner

func (r *Runner) Run(ctx context.Context, repoDir string, args ...string) (string, error)
func (r *Runner) Output(ctx context.Context, repoDir string, args ...string) ([]byte, error)
func (r *Runner) RunSplit(ctx context.Context, repoDir string, args ...string) (string, string, error)
func (r *Runner) Stream(ctx context.Context, repoDir string, consume func(stdout io.Reader) error, args ...string) error
```

- `New(maxConcurrent int) *Runner` — creates a runner allowing at most `maxConcurrent` simultaneous git processes.
- `Run` — runs a git command, returning combined stdout (string) plus error.
- `Output` — same, but returns raw `[]byte`.
- `RunSplit` — returns stdout and stderr as separate strings.
- `Stream` — streams stdout to a consumer callback (used for large/long git operations).

## Behavior Notes

- `maxConcurrent` guards against fork-bombing the host when many file bundles are reviewed in parallel.
- Context cancellation is honored (a cancelled ctx aborts the git process).
- `acquire(ctx)` blocks until a concurrency slot is free or the `ctx` is cancelled, so a caller waiting for the slot never blocks indefinitely (the caller controls the timeout via `context.WithTimeout`).

## Dependencies / Related

- `internal/diff` — uses `gitcmd.Runner` to generate diffs.
- `internal/session` — uses it to read repo state (branch, etc.).

## Links

- [Diff Package](05-diff.md)
- [Session Package](07-session.md)
