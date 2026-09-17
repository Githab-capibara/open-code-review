# 07. Split delegation mode into deterministic scaffolding and host-side reasoning

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @Githab-capibara
- **Related:** [delegate command](../05-cli/03-delegate-command.md), [skills](../06-integrations/04-skills.md), [rules engine](../02-architecture/08-rules-engine.md)

## Context

Many teams run coding agents on a bundled LLM subscription (Claude
Code, Codex, Cursor, …). For those users OCR's own model endpoint is
redundant — they already pay for reasoning. What they lack is the
deterministic engineering OCR does well: resolving which files in a
diff are worth reviewing, applying the four-layer rule chain, and
enforcing exclusion logic. The question was how to expose that value
without forcing a second LLM configuration and without OCR doing any
reasoning itself.

## Decision

We split the pipeline at the LLM boundary and ship the left half as
`ocr delegate` (alias `ocr d`), a zero-LLM command:

- `ocr delegate preview` runs the same file-selection/filtering logic
  as `ocr review` (via `agent.Preview`) and emits mode/ref metadata
  (`workspace`/`range`/`commit`, `merge_base`, insertions/deletions)
  plus reviewable and excluded file lists — text or `--format json`
  with `schema_version: 1`.
- `ocr delegate rule <path...>` resolves the rule chain for the given
  paths and outputs rule groups keyed by content (`internal/delegate`),
  so files sharing a rule are stated once.
- The host agent does everything after that: fetches diffs with plain
  git, reviews using its own subscription, and reports. No Template is
  passed to preview, so OCR's per-file token ceiling is deliberately not
  applied — the host's context window is the bound.

## Consequences

- **Easier:** subscription users get OCR's scaffolding with zero LLM
  setup; the JSON contract is stable and machine-readable for custom
  pipelines; the same filter/rule code paths stay shared with `review`,
  so there is one source of truth for "what should be reviewed".
- **Harder:** review quality in delegation mode is the host agent's
  responsibility — OCR cannot vouch for it; the skill/command manifests
  (`plugins/open-code-review/`, `skills/open-code-review-delegate`)
  must keep the workflow steps in sync with the CLI output schema.
- **Given up:** OCR-side reasoning in this mode (no plan phase, no
  filter task, no token budgeting) — that is exactly the point.
- **Migration:** additive command; existing `review`-based integrations
  are untouched.

## Alternatives considered

- **Make delegate call the LLM "if configured":** rejected — a
  half-LLM mode doubles the test surface and confuses the contract;
  users who want OCR reasoning use `ocr review`.
- **Expose only a file list, let hosts resolve rules themselves:**
  rejected — rule resolution is the highest-value half of the
  scaffolding and is easy to get wrong (four-layer priority, glob
  matching).