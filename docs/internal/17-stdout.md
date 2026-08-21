# Stdout Package

The `internal/stdout` package provides a swappable, capturable stdout sink used to silence or redirect terminal output during tests and structured runs.

## Overview

OCR prints progress/telemetry to stdout. `stdout` wraps `os.Stdout` behind a small indirection so other packages can temporarily quiet or capture it without touching global state directly.

## API

```go
func Writer() io.Writer
func Quiet() func()
func Swap(replacement io.Writer) func()
```

- `Writer() io.Writer` — returns the current stdout writer (defaults to `os.Stdout`).
- `Quiet() func()` — temporarily silences stdout; returns a restore function. Call the returned function to restore output.
- `Swap(replacement io.Writer) func()` — redirects stdout to `replacement` (e.g. a buffer); returns a restore function. Swaps are composable (a swap inside a swap restores correctly).

## Behavior Notes

- Both `Quiet` and `Swap` return a closure that must be called to undo the effect; they are safe to nest.
- Used by tests to assert on printed output and by CLI modes that need clean machine-readable output.

## Dependencies / Related

- `internal/telemetry` — `PrintTraceSummary` / `PrintToolCall*` write through this sink.

## Links

- [Telemetry Package](10-telemetry.md)
