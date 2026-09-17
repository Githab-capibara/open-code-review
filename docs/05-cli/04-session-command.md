# 04. Session Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr session`
- **Aliases:** `ocr sessions`
- **Audience:** users

## Overview

Lists and inspects local review session logs saved under
`~/.opencodereview/sessions/`. Use it to find a session ID, inspect
per-file checkpoint status, read recorded comments, compare two runs,
and feed `ocr review --resume <id>`.

Sub-commands: `list` (`ls`), `show <id>`, `comments <id>`,
`compare <before> <after>` (alias `diff <before> <after>`).

## `ocr session list`

```bash
ocr session list
ocr session list --limit 50 --json
```

| Flag | Default | Purpose |
|------|---------|---------|
| `--repo <path>` | current dir | Repository whose sessions to list |
| `--json` | `false` | Emit summaries as JSON |
| `--limit <n>` | `20` | Cap listed sessions; `0` = unlimited |

## `ocr session show <id>`

Metadata + per-file checkpoint items for one session. Resumed runs also
show the run they continued and any provider/model transition. Flags:
`--repo <path>`, `--json`.

## `ocr session comments <id>`

Every persisted comment, rendered like `ocr review` terminal output.

| Flag | Default | Purpose |
|------|---------|---------|
| `--repo <path>` | current dir | Repository scope |
| `--json` | `false` | Emit comments as a JSON array |
| `--severity <list>` | all | `critical,high,medium,low` subset |
| `--category <list>` | all | e.g. `bug,security` |

## `ocr session compare <before> <after>` (alias `diff`)

Groups two sessions' findings into four buckets:

| Bucket | Meaning |
|--------|---------|
| `new` | only in the *after* session |
| `persisting` | in both |
| `resolved` | only in the *before* session |
| `not_reviewed` | in *before*, but *after* never looked at that file — not counted as resolved |

Findings match on path, category, and offending snippet — not line
numbers — so a finding that only moved still counts as persisting. Both
sessions must belong to the same repository. Flags: `--repo <path>`,
`--json`.

```bash
ocr session compare <before-id> <after-id>
ocr session diff --json <before-id> <after-id>
```

## Related

- [Session management architecture](../02-architecture/06-session-management.md)
- [Resume semantics](01-review-command.md#resume-semantics)
- [Viewer command](06-viewer-command.md) — browse sessions in a browser