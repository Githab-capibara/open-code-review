# 01. Review Engine Research — What Makes a Good Automated Review

- **Authors:** @Githab-capibara

- **Status:** Research note
- **Date:** 2026-09-16
- **Deciders:** @Githab-capibara
- **Researcher:** documentation audit of `internal/agent`, `internal/llmloop`, `internal/tool`
- **Purpose:** record the engineering findings that shaped the review
  pipeline, so future changes to dispatch/loop behavior start from the
  same evidence.
- **Feeds into:** [ADR-01](../03-adr/01-deterministic-agent-hybrid.md),
  [ADR-03](../03-adr/03-tool-use-over-generic-prompts.md),
  [review engine architecture](../02-architecture/02-review-engine.md)

## Problem space

A generic "paste the diff into a prompt" review fails in four
predictable ways:

1. **Context starvation** — the model sees only hunks, so it flags
   "bugs" that the surrounding code already handles, and misses bugs
   one file away.
2. **Volume without signal** — unbounded comment output (style nits,
   speculation) drowns the two findings that matter.
3. **Cost blowup** — naive per-file prompting re-sends the world to
   the model and cannot bound spend.
4. **Non-repeatability** — a crash at minute 12 loses everything.

## Findings (what the shipped engine does about each)

### Context: let the agent fetch, don't pre-stuff

The sub-agent gets read-only tools (`file_read`, `file_read_diff`,
`file_find`, `code_search`, plus `code_comment` / `task_done` for
output — see [tool system](../02-architecture/05-tool-system.md)) and
pulls context on demand. A cheap metadata-only LLM call first
bundles related changes (handler + service + test) into one subtask so
cross-file reasoning happens in one conversation; grouping failures
fall back silently to one file per group.

### Signal: a per-subtask filter pass and severity discipline

Each subtask ends with a `REVIEW_FILTER_TASK` post-pass that prunes
its own output; `--no-filter` skips it deliberately. `--effort`
(1/2/3 review rounds) is the recall/cost dial: high effort roughly
triples per-subtask work. Delegation-mode manifests push the same
severity discipline (discard low-value nits) onto host agents.

### Cost: hard ceilings at every layer

- Prompt ceiling per subtask (`--max-tokens`, default 200k); a file
  whose diff alone exceeds 80% of it is dropped before any call.
- Output cap separated (`MAX_COMPLETION_TOKENS`, 16k) so raising the
  prompt ceiling doesn't inflate output cost.
- Whole-run budget (`--max-tokens-budget`) stops dispatch mid-flight
  and still publishes partial results.
- Timeout per subtask scales linearly with effort rounds.
- Plan phase auto-skips below both the per-file (50 lines) and
  per-group (100 lines) thresholds — small changes don't pay for a
  planning call.

### Repeatability: checkpointing

Every subtask completion is checkpointed into a session;
strict identity fingerprinting (see
[ADR-04](../03-adr/04-session-resume-identity.md)) makes resume safe:
same resolved diff + same rules/filters, or reject wholesale and write
nothing.

## Measured defaults (kept in code as the source of truth)

| Knob | Default | Why |
|------|---------|-----|
| concurrency | 8 subtasks | latency vs. provider rate limits |
| timeout | 15 min/subtask | scaled ×effort-rounds |
| max tool rounds | 100/subtask | loop can't run away |
| group plan thresholds | 50 / 100 lines | small diffs skip planning |
| diff drop ceiling | 80% of prompt cap | hopeless files fail fast |

## Open questions

- Does the grouping call earn its latency on very small diffs (2–3
  files)? Candidate for an auto-skip analogous to the plan threshold.
- Filter-pass recall cost is not yet measured against
  `ocr session compare` bucket quality across the dogfood corpus.
- Effort presets are coarse (3 levels); per-subtask adaptive effort
  based on diff risk is unexplored.

## Related

- [Deterministic-hybrid ADR](../03-adr/01-deterministic-agent-hybrid.md)
- [Agent orchestration](../02-architecture/03-agent-orchestration.md)