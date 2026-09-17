# 02. Review Engine

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** the `ocr review` diff-based pipeline (`internal/agent`, `internal/diff`, `internal/llmloop`)

## Overview

The review engine turns a Git change-set into structured review
comments. It is the pipeline behind `ocr review` (alias `ocr r`). Its
defining property is that every step which must be correct is
deterministic Go code; the LLM only makes the dynamic decisions
([ADR 01](../03-adr/01-deterministic-agent-hybrid.md)).

## Modes

| Mode | Selection | Use case |
|------|-----------|----------|
| Workspace | staged + unstaged + untracked changes vs `HEAD` | reviewing local work in progress |
| Range | `--from <base> --to <head>` (merge-base) | reviewing a branch |
| Commit | `--commit <sha>` (vs its parent) | reviewing one change |

Diff loading lives in `internal/diff/git.go` (`LoadDiffs`); parsing in
`internal/diff/parser.go`.

## File selection (`internal/agent/selection.go`)

`selectFiles` is the **single** deterministic pre-dispatch gate. It is
pure — no git, no LLM, no mutation — so `--preview` and the real run
read the exact same answer and cannot drift. For each changed file it
applies, in order:

1. **Binary** → `ExcludeBinary`.
2. **Secret paths** → `ExcludeSecretPath`. Credentials (`.env`,
   `id_rsa`, …) are excluded ahead of every user rule: no include glob
   can admit them, no exclude can reclassify them.
3. **User excludes/includes** → `--exclude` patterns merged with
   `rule.json` excludes.
4. **Extension allowlist** → `supported_file_types.json`.
5. **Default exclude patterns** → `default_exclude_patterns.json`
   (generated/vendored/test fixtures).
6. **Deleted files** → retained in the change-file list but never
   dispatched (`ExcludeDeleted`) — no new content to review.
7. **Per-file size ceiling** → if the diff's tokens exceed the
   per-group prompt ceiling, `ExcludeTooLarge`.

Each excluded file gets a reason recorded in the run manifest, so
"why wasn't file X reviewed?" is always answerable.

## Grouping (`internal/agent/grouping.go`)

Selected files become review units ("bundles"):

- **Small change-sets** → auto-bundled deterministically into a single
  unit.
- **Large change-sets** → an LLM semantic grouping pass
  (`GROUPING_TASK`) bundles related files (e.g. `messages_en.properties`
  with `messages_zh.properties`) so shared context stays together.
- Each bundle is dispatched as an isolated sub-agent; isolation is what
  makes large changesets stable and concurrency safe.

## Cost & effort

- `--effort low|medium|high` (`internal/config/template/effort.go`) sets
  `MaxReviewRounds` to **1 / 2 / 3** respectively; default is medium (=2).
- `Estimate()` (`internal/agent/estimate.go`) projects tokens/cost
  before the run so users can budget.
- `--max-tokens-budget` caps whole-run usage; on exhaustion dispatch
  stops, skipped files are reported `failed(budget)`, partial results
  still publish, and the run exits 0 unless *every* item failed.

## Resume

`--resume <session-id>` reuses the prior session. Resume eligibility is
computed from a sealed identity over the *selected* diffs, without
creating session state (`internal/agent/identity.go`,
`SealedInput` — see [session management](06-session-management.md)).

## Post-processing

1. **Line resolution** — `internal/diff/resolver.go` matches each
   comment's `ExistingCode` against hunks (primary) or full file
   content (fallback) to fill `StartLine`/`EndLine`.
2. **Re-location** — a comment that fails to match is re-located by a
   bounded LLM pass (`internal/diff/relocation.go`).
3. **Review filter** — a bounded `REVIEW_FILTER_TASK` pass trims weak
   comments; `--no-filter` skips it.
4. **Reflection** — per-comment validation runs in the async worker
   pool (`internal/llmloop/pool.go`).

## Related

- [Agent orchestration](03-agent-orchestration.md)
- [Diff parser](07-diff-parser.md)
- [Rules engine](08-rules-engine.md)
- [Session management](06-session-management.md)
- [review command reference](../05-cli/01-review-command.md)
- [ADR 01](../03-adr/01-deterministic-agent-hybrid.md)