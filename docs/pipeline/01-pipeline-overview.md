# 01. Pipeline overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [Architecture](../architecture/01-overview.md), [Internal package index](../internal/README.md), [CI/CD guide](../ci-cd/README.md)

## Context

`ocr review` turns a git diff into posted review comments. The steps that
must never go wrong (file selection, rule matching) are deterministic
engineering; the steps that benefit from judgment (comment quality) are the
agent's job. The pipeline is the contract between those two halves.

## Decision

The default execution pipeline, and the internal package owning each stage:

| # | Stage | Owner | What happens |
|---|-------|-------|--------------|
| 1 | Diff acquisition | [`internal/gitcmd`](../internal/12-gitcmd.md), [`internal/diff`](../internal/05-diff.md) | Collect staged/unstaged/untracked changes (workspace mode) or a commit / merge-base range; parse into structured `Diff` models ([`internal/model`](../internal/14-model.md)) |
| 2 | File selection & filtering | [`internal/config`](../internal/04-config.md) | Apply exclude/include rules so no important change is missed and noise is dropped early |
| 3 | Smart bundling | [`internal/agent`](../internal/01-agent.md) | Group related files into one review unit (e.g. locale pairs); each bundle becomes an isolated sub-agent context — divide-and-conquer that scales to large changesets |
| 4 | Rule matching | [`internal/config/rules`](../../internal/config/rules/) | Template-engine match of per-language rules (`rule_docs/*`) to each bundle, keeping model attention focused |
| 5 | Agent loop | [`internal/llmloop`](../internal/13-llmloop.md), [`internal/llm`](../internal/02-llm.md) | Run the scenario-tuned prompt against the configured provider; the agent uses its toolset ([`internal/tool`](../internal/03-tool.md)) to read files and search code |
| 6 | Budget & retry discipline | [`internal/agent`](../internal/01-agent.md) | Token budget allocation per bundle; exponential-backoff retries at safe boundaries |
| 7 | Positioning & reflection | [`internal/suggestdiff`](../internal/18-suggestdiff.md) | External positioning module anchors comments to exact lines; reflection pass re-checks comment validity |
| 8 | Output | [`internal/stdout`](../internal/17-stdout.md), CI posters | Render human or agent-audience output; in CI, platform posters publish comments |

Session persistence ([`internal/session`](../internal/07-session.md)) wraps
stages 1–8 so any interruption can be resumed with
`--resume <session-id>`; `ocr scan` reuses stages 3–8 over whole files via
[`internal/scan`](../internal/16-scan.md). Delegation mode replaces stages
5–6 with the host coding agent while keeping 1–4 and 7–8
([delegate docs](../integration/01-delegate.md)). Observability across all
stages is provided by [`internal/telemetry`](../internal/10-telemetry.md).

## Consequences

- **Easier:** each stage has one owning package, so regressions localize;
  resumability falls out of session persistence rather than ad-hoc state.
- **Harder:** stage boundaries are an API contract — changing a stage's
  output shape requires touching its consumers.
- **Given up:** single-pass streaming reviews; correctness requires the
  full select → bundle → review → position sequence.
- **Migration:** new stages slot in by number; document the owner package
  here in the same PR as the code.

## Alternatives considered

- **Pure agent-driven pipeline (no hard constraints):** rejected — it is
  exactly the failure mode described in the root README (incomplete
  coverage, position drift).
- **Fully deterministic rule-based review without LLM:** rejected because
  semantic issue detection needs model judgment.
