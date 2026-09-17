# 01. Review Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr review`
- **Aliases:** `ocr r`
- **Audience:** users

## Overview

The main command. Resolves a Git diff, filters and groups the changed
files, dispatches one sub-agent per group, optionally post-filters the
comments, and prints them. When no mode flag is given it reviews the
working tree (staged + unstaged + untracked) — the usual pre-commit
check.

Modes (mutually exclusive — mixing is a hard error):

| Mode | Invocation | Diff source |
|------|------------|-------------|
| workspace | `ocr review` | `git diff HEAD` (fallback `git diff --staged`) + untracked files from disk |
| range | `ocr review --from main --to feature` | `merge-base(from, to)..to` — only what the branch introduced |
| commit | `ocr review --commit abc123` | `git show abc123` (the commit vs its parent) |

## Flags

| Flag | Short | Default | Purpose |
|------|-------|---------|---------|
| `--repo <path>` | — | current dir | Git repository root |
| `--from <ref>` | — | — | Source ref for range mode |
| `--to <ref>` | — | — | Target ref for range mode |
| `--commit <sha>` | `-c` | — | Single commit to review |
| `--preview` | `-p` | `false` | Run the filter pipeline but skip the LLM; prints file list + exclusion reasons (`--format sarif` unsupported) |
| `--no-filter` | — | `false` | Keep all comments; skip the per-subtask `REVIEW_FILTER_TASK` post-pass |
| `--resume <session-id>` | — | — | Resume a compatible range/commit session (see below) |
| `--format <fmt>` | `-f` | `text` | `text`, `json`, or `sarif` (SARIF 2.1.0 for GitHub Code Scanning) |
| `--output <path>` | `-o` | stdout | Write results to a UTF-8 file; lazily created so failed runs leave files untouched |
| `--audience <who>` | — | `human` | `human` streams progress (to stderr when format is `json`/`sarif`); `agent` suppresses progress |
| `--background <text>` | `-b` | — | Requirement/business context injected into plan + main prompts |
| `--background-file <path>` | `-B` | — | Markdown background file; takes precedence over `-b` |
| `--exclude <patterns>` | — | — | Comma-separated gitignore-style excludes; merged with `rule.json` excludes |
| `--concurrency <n>` | — | `8` | Max subtasks reviewed in parallel |
| `--timeout <minutes>` | — | `15` | Per-subtask deadline; `0` disables; scaled by effort rounds |
| `--effort <level>` | — | `medium` | `low` (1 round) / `medium` (2) / `high` (3); overrides the saved setting |
| `--rule <path>` | — | — | Custom JSON rule file; overrides project/global `rule.json` |
| `--max-tools <n>` | — | template default | Max tool rounds per subtask; `0` = default (100); only ever raises the cap |
| `--max-tokens <n>` | — | config/template | Prompt token ceiling per subtask (template default 200000); does not change the output cap |
| `--max-tokens-budget <n>` | — | `0` (unlimited) | Cap total tokens for the run; dispatch stops when exceeded, partial results still published |
| `--provider <name>` | — | — | Use a saved provider for this run only |
| `--model <name>` | — | — | Override the resolved model for this run only |
| `--max-git-procs <n>` | — | `16` | Max concurrent git subprocesses |
| `--tools <path>` | — | embedded | Custom JSON tool-config file |

## Examples

```bash
ocr review                                    # workspace (pre-commit) check
ocr review --from main --to feature-branch    # range review
ocr review -c abc123                          # one commit
ocr review -B ./pr-description.md --effort high
ocr review --format json --audience agent     # CI / agent consumption
ocr review --preview                          # what would be reviewed, no LLM
```

## Resume semantics

Every run persists a session under `~/.opencodereview/sessions/`.
`--resume <id>` is strict: workspace reviews cannot resume; mode must
match; the resolved diff, rules, and filters must produce the same file
set; provider/model changes must be explicit via `--provider`/`--model`;
the parent must carry a run manifest. A rejected resume writes nothing.
See [session command](04-session-command.md) and
[session management](../02-architecture/06-session-management.md).

## Exit codes

| Code | Meaning |
|------|---------|
| `0` | Completed (possibly zero comments, possibly with warnings) |
| `1` | Fatal error — bad flags, unresolvable LLM endpoint, all sub-agents failed |

## Related

- [Architecture overview](../02-architecture/01-overview.md)
- [Scan command](02-scan-command.md) · [Session command](04-session-command.md)
- Website CLI reference: `pages/src/content/docs/en/cli-reference.md`