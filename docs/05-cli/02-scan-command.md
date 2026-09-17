# 02. Scan Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr scan`
- **Aliases:** `ocr s`
- **Audience:** users

## Overview

Full-file review without requiring a Git diff. Each file's current
content is read from the working tree and sent to the LLM — useful for
auditing an unfamiliar/codebase or a directory with no meaningful diff.
With no `--path`, the whole repository is scanned.

## Flags

| Flag | Short | Default | Purpose |
|------|-------|---------|---------|
| `--path <list>` | — | whole repo | Comma-separated repo-relative dirs/files (e.g. `internal/agent,internal/llm/client.go`) |
| `--exclude <patterns>` | — | — | Comma-separated gitignore-style excludes shared with `rule.json` excludes |
| `--repo <path>` | — | current dir | Git repository root |
| `--rule <path>` | — | — | Custom JSON rule file |
| `--preview` | `-p` | `false` | Enumerate and filter files without the LLM; prints counts, total lines, exclusion reasons |
| `--no-plan` | — | `false` | Skip the per-file `PLAN_TASK` pre-pass |
| `--no-dedup` | — | `false` | Skip the per-batch `DEDUP_TASK` |
| `--no-summary` | — | `false` | Skip the post-run `PROJECT_SUMMARY_TASK` |
| `--batch <strategy>` | — | template | Override batching: `none` \| `by-language` \| `by-directory` |
| `--resume <session-id>` | — | — | Resume a previous scan session |
| `--format <fmt>` | `-f` | `text` | `text` or `json` |
| `--output <path>` | `-o` | stdout | Write results to a UTF-8 file `-` means stdout |
| `--audience <who>` | — | `human` | `human` streams progress, `agent` keeps output minimal |
| `--background <text>` | `-b` | — | Requirement/context for the scan |
| `--concurrency <n>` | — | `8` | Max concurrent subtasks |
| `--timeout <minutes>` | — | `15` | Per-subtask deadline |
| `--max-tools <n>` | — | template default | Max tool rounds per subtask; only raises the cap |
| `--max-tokens <n>` | — | config/template | Per-file prompt token ceiling |
| `--max-tokens-budget <n>` | — | `0` (unlimited) | Cap total token usage for the scan |
| `--provider <name>` / `--model <name>` | — | — | Per-run LLM selection, same as `review` |
| `--max-git-procs <n>` | — | `16` | Max concurrent git subprocesses |
| `--no-filter` | — | `false` | Keep all comments; skip the LLM post-filter |
| `--effort <level>` | — | `medium` | Effort preset, same as `review` |

## Examples

```bash
ocr scan --preview                       # see what would be scanned
ocr scan --path internal/agent           # one directory
ocr scan --path internal/agent,internal/llm/client.go
ocr scan --exclude '**/generated/*,*.pb.go'
ocr scan --provider openai --model gpt-5.4 --format json
```

## Related

- [Review command](01-review-command.md) — diff-based counterpart
- [Scan architecture](../02-architecture/02-review-engine.md)