# Telemetry Package

The `internal/telemetry` package provides OpenTelemetry-based observability for the OpenCodeReview CLI: config resolution, event/span helpers, and human-readable trace summaries printed to the terminal.

Package doc: *"provides OpenTelemetry-based observability for OpenCodeReview CLI."*

## Configuration

```go
type Config struct { /* endpoint, exporter, sampling, headers, ... */ }

func DefaultConfig() Config
func LoadFromJSON(cfg *Config, configPath string) error
func ResolveConfig(configPath string) Config
func HomeConfigPath() string
```

- `Config` — holds exporter settings (OTLP endpoint, console exporter, sampling ratio, headers).
- `DefaultConfig()` — built-in defaults.
- `LoadFromJSON(cfg, configPath)` — overlays a JSON config file.
- `ResolveConfig(configPath)` — merges defaults + env + file into the final `Config`.
- `HomeConfigPath()` — resolves the per-user telemetry config path.

## Event Helpers

All take a `context.Context` (a no-op when telemetry is disabled or ctx is nil):

```go
func Event(ctx context.Context, name string, attrs ...attribute.KeyValue)
func Eventf(ctx context.Context, name string, msg string, attrs ...attribute.KeyValue)
func ErrorEvent(ctx context.Context, name string, err error, extraAttrs ...attribute.KeyValue)
func PhaseEvent(ctx context.Context, phase string, filePath string, dur time.Duration, err error)
func FormatDuration(dur time.Duration) string
```

- `Event` / `Eventf` — record a named event (optionally with a formatted message).
- `ErrorEvent` — record an error event; a nil error is handled gracefully.
- `PhaseEvent` — record a phase (e.g. per-file review) with duration and optional error.

## Terminal Summaries

```go
type TraceSummary struct { /* token usage, durations, session id, ... */ }

func PrintTraceSummary(s TraceSummary)
func PrintToolCallStarted(toolName string, args map[string]any)
func PrintToolCallFinished(toolName string, dur time.Duration)
func PrintToolCallError(toolName string, err error)
```

- `TraceSummary` — aggregates a run's token usage (including cache tokens), durations, and session id.
- `PrintTraceSummary` — prints a concise end-of-run summary; tests verify cache-token and session-id rendering.
- `PrintToolCallStarted/Finished/Error` — live per-tool-call logging for the terminal.

## Behavior Notes

- All event helpers are safe with a nil context and are no-ops when telemetry is off, so callers never need to branch.
- Exporters: OTLP (HTTP) and console are supported; `resolveEnv` maps environment variables into `Config`.

## Dependencies / Related

- `internal/llm` — retry reporting (`RetryCollector`) feeds token/attempt data into `TraceSummary`.
- `internal/agent` — calls `Event` / `PhaseEvent` / `PrintTraceSummary` around the review loop.

## Links

- [LLM Package](02-llm.md)
- [Agent Package](01-agent.md)
