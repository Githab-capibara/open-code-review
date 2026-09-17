# 07. Diff Parser

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/diff` — diff loading, parsing, positional resolution

## Overview

`internal/diff` is the deterministic layer between raw Git and the
review agent. It (1) loads diffs in three modes, (2) parses unified
diffs into structured models, (3) resolves comment line numbers from
the model's code snippets, and (4) re-locates comments that fail to
match — the modules that make OCR's positioning far more accurate than
a prompt-only review.

## Loading (`git.go`)

`LoadDiffs` drives git subprocesses (through `internal/gitcmd`, bounded
by `--max-git-procs`) for the run's mode:

| Mode | Git operation |
|------|---------------|
| workspace | staged (`git diff --cached`), unstaged (`git diff`), and untracked (`git status --porcelain`) |
| range | `git diff <merge-base> <head>` with merge-base resolved by `git merge-base` |
| commit | `git diff <commit>^ <commit>` (root commits handled with the empty tree) |

All invocations are argument vectors with `--end-of-options` and
hardcoded subcommands — no shell, so adversarial refs and paths cannot
inject flags ([trust boundary
1](../07-security/03-trust-boundaries.md)). Untracked files are read
with traversal protection (`workspace_file.go`).

## Parsing (`parser.go`, `hunk.go`)

`ParseDiffText` splits a concatenated unified diff into one
`model.Diff` per file: old/new paths, rename/delete/new/binary flags,
insertion/deletion counts, and parsed hunks (`Hunk`/`HunkLine` carry
the `@@ -m,n +p,q @@` header plus typed context/added/deleted lines).
Strict format validation rejects malformed headers before the data
reaches the agent.

## Gitignore integration (`gitignore.go`)

`LoadGitignorePatterns` / `ExcludedDirs` parse `.gitignore` and apply a
provider-directory blocklist so vendored and ignored content is not
selected for review ([review engine](02-review-engine.md)).

## Line-number resolution (`resolver.go`)

Every `code_comment` carries `existing_code` — the verbatim added lines
the model is pointing at. `ResolveLineNumbers` turns that anchor into
concrete `StartLine`/`EndLine`:

1. **Primary** — match the snippet against added lines in the relevant
   hunks. A match pins the comment to the exact lines Git reported
   changed.
2. **Fallback** — match against the full modified-file content
   (`file_read`'s view) when hunk matching misses.

Only when both deterministic passes miss does the pipeline use LLM
re-location.

## Re-location (`relocation.go`)

`BuildReLocationMessages` constructs a small, bounded conversation
asking the model to restate its anchor precisely; `ReLocateComment`
re-runs resolution on the answer. This is the *only* LLM step permitted
to move a comment, and it is capped per comment — cost and drift stay
bounded. Position quality vs cost is the subject of [ADR
03](../03-adr/03-tool-use-over-generic-prompts.md).

## Suggestions rendering

For CLI display, `internal/suggestdiff.ComputeLineDiff` computes an
LCS diff between `existing_code` and `suggestion_code` so the terminal
shows an inline before/after for each fix.

## Related

- [Review engine](02-review-engine.md)
- [Tool system](05-tool-system.md)
- [Session management](06-session-management.md)
- [ADR 03](../03-adr/03-tool-use-over-generic-prompts.md)