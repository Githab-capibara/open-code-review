# 03. Delegate Command Reference (Delegation Mode)

- **Authors:** @Githab-capibara

- **Command:** `ocr delegate`
- **Aliases:** `ocr d`
- **Audience:** host coding agents (Claude Code, Codex, Cursor, …) and
  custom agent pipelines

## Overview

Zero-LLM mode: OCR does only the deterministic scaffolding — file
selection and rule resolution — and the **host agent** performs the
review with its own subscription. No LLM endpoint or `ocr config`
setup is required. The command never calls a model on the OCR side.

Sub-commands:

| Sub-command | Purpose |
|-------------|---------|
| `ocr delegate preview` | List reviewable files + mode/ref metadata |
| `ocr delegate rule <path...>` | Resolve review rules grouped by content |

Typical host-agent workflow: `preview` → `rule` for the reviewable
paths → fetch diffs with plain git (`git diff <merge_base>..<to> --
<path>`, `git show <commit> -- <path>`, or `git diff HEAD -- <path>`)
→ review each file against its rule group → report findings.

## Flags (shared by both sub-commands)

| Flag | Short | Default | Purpose |
|------|-------|---------|---------|
| `--repo <path>` | — | current dir | Repository root |
| `--from <ref>` | — | — | Source ref for range mode |
| `--to <ref>` | — | — | Target ref for range mode |
| `--commit <hash>` | `-c` | — | Single-commit mode |
| `--rule <path>` | — | — | Custom `rule.json` path |
| `--exclude <patterns>` | — | — | Comma-separated exclude patterns |
| `--background <text>` | `-b` | — | Business context |
| `--background-file <path>` | `-B` | — | Markdown context file; precedence over `-b` |
| `--max-git-procs <n>` | — | `16` | Max concurrent git subprocesses |
| `--format <fmt>` | `-f` | `text` | `text` or `json` (no sarif); JSON carries `schema_version: 1` |

## Examples

```bash
ocr delegate preview                          # workspace changes
ocr delegate preview --from main --to feature # branch comparison
ocr delegate preview -c abc123                # single commit
ocr delegate preview --format json | jq .reviewable_files
ocr delegate rule internal/agent/agent.go internal/llm/client.go
```

## Output contract

- `preview` (text): a file checklist with `mode`, `from`/`to`/`commit`,
  `merge_base`, insertion/deletion counts, and excluded files with the
  exclusion reason (struck through).
- `preview --format json`: `{schema_version, mode, repository,
  from/to/commit, merge_base, background, *_count, reviewable_files,
  excluded_files}`.
- `rule`: rule groups (`### Rule Group N: <source> / <pattern>`) each
  listing the files it applies to plus the rule text; groups are keyed
  by identical rule content to avoid repetition. `--format json` emits
  `{schema_version, groups:[{group_id, source, pattern, files, rule}]}`.

## Related

- [Skills](../06-integrations/04-skills.md) — `open-code-review-delegate`
- [ADR-07: delegate mode](../03-adr/07-delegate-mode-architecture.md)