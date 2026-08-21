# Model Package

The `internal/model` package defines the core data types shared across OpenCodeReview: diffs, review comments, scan items, and preview entries.

## Types

```go
type Diff struct { /* a single file diff (old/new path, status, hunks) */ }

type ExcludeReason string          // why a file was excluded from review

type PreviewEntry struct { /* one file in a review preview */ }
type Preview struct { /* the set of preview entries */ }

type LlmComment struct { /* a single review comment (path, line, severity, body) */ }
type CodeReviewResult struct { /* aggregate result of a review run */ }

type ScanItem struct { /* one item reviewed in full-file scan mode */ }
```

- `Diff` — canonical diff representation consumed by the agent and the viewer.
- `ExcludeReason` — enum string recording why a file was filtered out (e.g. binary, ignored, too large).
- `PreviewEntry` / `Preview` — the `ocr review`/`ocr scan` preview (what will be reviewed before it runs).
- `LlmComment` — the unit of review output: file path, line range, severity, category, and body. This is what `session.LoadComments` returns and what the agent ultimately emits.
- `CodeReviewResult` — the full result object (comments + metadata) produced by a review.
- `ScanItem` — one unit in scan mode; `(*ScanItem).AsDiff() *Diff` converts a scan item into a `Diff` for uniform processing (nil for non-diffable items, binary handling tested).

## JSON

All types are JSON-serializable; tests pin round-tripping and `omitempty` behavior (`ExcludeReason` omitted when empty, `ScanItem.AsDiff` nil handling).

## Dependencies / Related

- `internal/session` — `LoadComments` returns `[]model.LlmComment`.
- `internal/agent`, `internal/scan` — produce `model.LlmComment` / `CodeReviewResult`.
- `internal/tool` — `tool.ParseComments` returns `[]model.LlmComment`.

## Links

- [Session Package](07-session.md)
- [Agent Package](01-agent.md)
- [Scan Package](16-scan.md)
- [Tool Package](03-tool.md)
