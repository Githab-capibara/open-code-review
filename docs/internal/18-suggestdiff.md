# 18. Suggest Diff Package

The `internal/suggestdiff` package computes a line-level diff between two code snippets so the agent can propose concrete replacements.

Package doc: *"provides line-level diff computation between code snippets, used to turn a suggested code change into a review comment."*

## API

```go
type DiffLineType int   // added / removed / unchanged (context)

type DiffLine struct {
    Type DiffLineType
    Text string
    // OldLine / NewLine line numbers as applicable
}

func ComputeLineDiff(oldLines, newLines []string) []DiffLine
```

- `DiffLineType` — classifies each output line as added, removed, or unchanged context.
- `DiffLine` — one line of the computed diff, carrying its type, text, and the relevant old/new line numbers.
- `ComputeLineDiff(oldLines, newLines []string) []DiffLine` — aligns the two line slices and returns the sequence of diff lines (with context lines around changes, tested).

## How it fits

When the agent suggests a code fix, `suggestdiff` renders the change as a compact line diff that becomes part of the review comment, giving the user a copy-ready patch rather than free-form text.

## Dependencies / Related

- `internal/model` — `model.LlmComment` carries the rendered suggestion.
- `internal/agent` — invokes `suggestdiff` when building suggestion comments.

## Links

- [Model Package](14-model.md)
- [Agent Package](01-agent.md)
