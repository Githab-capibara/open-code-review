# 06. Session Management

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/session` — persistence, resume, comparison, coverage manifest

## Overview

Every `ocr review` / `ocr scan` run is recorded as a **session**: an
append-only JSONL file under
`~/.opencodereview/sessions/<repo>/<session-id>.jsonl`. Sessions are the
audit trail, the resume source, and the viewer's data — they make every
run replayable and every failure explainable.

## Record model (`history.go`, `persist.go`, `raw_writer.go`)

A session is a stream of typed records: run metadata, per-task
conversation rounds (prompt, tool calls, tool results), submitted
comments, and a final coverage manifest. The writer (`jsonlWriter`)
is thread-safe and streams records as the run progresses, so a crash
mid-run still leaves a readable partial session that can be resumed.

## Coverage manifest (`manifest.go`)

Each completed (or interrupted) run seals an `ocr.run-manifest/v1` —
a machine-readable contract listing, per reviewed item:

| Field | Meaning |
|-------|---------|
| `item_id` | stable per logical file across a resume chain |
| `status` | completed / failed / skipped |
| `failure_class` | provider · timeout · cancelled · configuration · input · budget · panic · unknown |
| `exclude_reason` | why selection skipped a file (see [review engine](02-review-engine.md)) |
| input mode | `range` / `commit` / `workspace` |

Consumers gate on the schema version string and ignore unknown future
versions. The manifest answers "what did this run actually cover?"
without parsing conversation records.

## Resume (`resume.go`, `resume_identity.go`)

`--resume <session-id>` continues an interrupted review instead of
re-paying for finished work. Eligibility is decided by a **run
identity**: a fingerprint computed over the selected input (mode, refs,
file set), not the raw CLI arguments, so semantically identical reruns
match ([ADR 04](../03-adr/04-session-resume-identity.md)). Resume works
for range/commit reviews and full-file scans; identity sealing happens
in `internal/agent/identity.go` without creating any session state.

## Comparison (`compare.go`)

`ocr session compare <before> <after>` diffs two sessions' findings
into **new / persisting / resolved / not-reviewed** groups — the
workflow for "did my fixes address the review?" across pushes.

## Listing & inspection (`list.go`, plus `comments.go`)

`ocr session list`, `show`, `comments` read the JSONL store: per-run
metadata, per-file item status, and extracted comments with severity
and category filters. The same data feeds the web viewer
([viewer command](../05-cli/06-viewer-command.md)).

## Lifecycle of a session file

```
run start ──▶ <id>.jsonl created (metadata record)
   │  append: conversation rounds, tool calls, comments (streaming)
   ▼
interrupt / done ──▶ coverage manifest sealed
   │
   ├─▶ ocr session show <id>     (inspect)
   ├─▶ ocr review --resume <id>  (continue)
   ├─▶ ocr session compare       (diff two runs)
   └─▶ ocr viewer                (browse)
```

Sessions are local; nothing is uploaded. They contain diffs and model
output, so treat the directory like source code you care about.

## Related

- [Review engine](02-review-engine.md)
- [Session command reference](../05-cli/04-session-command.md)
- [Viewer](../05-cli/06-viewer-command.md)
- [ADR 04](../03-adr/04-session-resume-identity.md)