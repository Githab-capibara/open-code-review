# Delegate Package

The `internal/delegate` package provides the deterministic "spec" generation for delegation mode — the mode where the user's own AI coding agent (not OCR's configured LLM) performs the review.

Package doc: *"provides the deterministic 'spec' generation for delegation mode, turning file selection and rule resolution into a markdown spec the host agent consumes."*

## Exports

```go
type RuleGroup struct { /* Name, Paths, Rules — a bundle of paths + the rules that apply to them */ }

func GroupRules(resolver rules.Resolver, paths []string) []RuleGroup
func RuleGroupsMarkdown(groups []RuleGroup) string
```

- `GroupRules(resolver rules.Resolver, paths []string) []RuleGroup` — takes the resolved review `rules.Resolver` (from `internal/config/rules`) and the list of in-scope file paths (from `internal/diff`), and groups them so each group carries the path-filter-matched rules that apply to its files.
- `RuleGroup` — one group: a set of file paths together with the review rules that target them.
- `RuleGroupsMarkdown(groups []RuleGroup) string` — renders the groups into the markdown "spec" handed to the host agent (`ocr delegate rule` / `ocr delegate preview`).

## How it fits

Delegation mode is deterministic by design: OCR owns file selection and rule matching (engineering, not the model), then emits a spec the host agent executes. `delegate` is the boundary that converts resolved rules + paths into that spec.

## Dependencies / Related

- `internal/config/rules` — `rules.Resolver` input.
- `internal/diff` — supplies the in-scope paths.
- `internal/agent` — the non-delegate review path; delegate is the alternative entry point.

## Links

- [Config / Rules](04-config.md)
- [Diff Package](05-diff.md)
- [Agent Package](01-agent.md)
