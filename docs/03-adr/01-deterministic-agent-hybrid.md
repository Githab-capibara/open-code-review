# 01. Use a deterministic-engineering x agent hybrid architecture

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [ADR 03](03-tool-use-over-generic-prompts.md), [architecture overview](../02-architecture/01-overview.md), [review engine](../02-architecture/02-review-engine.md)

## Context

Pure prompt-driven review agents (e.g. a general-purpose coding agent
given a "please review this PR" skill) fail on three dimensions at
scale: coverage (the agent "cuts corners" on large diffs and silently
skips files), positioning (reported line numbers drift off target), and
debuggability (quality swings with prompt wording and no hard
constraints on the process). The forces are:

- **Large changesets** demand hard coverage guarantees — an LLM cannot
  be trusted with deciding *whether* to review a file.
- **CI usage** demands bounded cost per run — silent infinite loops and
  context blow-ups are unacceptable.
- **Professional review** demands precision — noisy false positives cost
  more triage time than they save.

## Decision

We split the pipeline along a strict line: every step that must not go
wrong is deterministic Go code; the LLM is only used where dynamic,
semantic judgment genuinely helps. Concretely, deterministic code owns
file selection, file-to-rule matching, diff parsing, and comment
positioning; the agent owns context gathering (which file to read next,
what to search) and the semantic review itself. Coverage is guaranteed
by selection, not requested from the model.

## Consequences

- **Easier:** coverage and cost are auditable facts (`run-manifest/v1`),
  bugs in deterministic steps have unit tests, the architecture
  benchmark shows significantly higher precision/F1 at ~1/9 of a
  general-purpose agent's tokens.
- **Harder:** two paradigms must be kept consistent; the deterministic
  layer carries the quality bar, so selection/positioning bugs are
  directly user-visible.
- **Given up:** the "one prompt to rule them all" simplicity — adding a
  capability often means touching both layers.
- **Migration:** none — this was the founding architecture.

## Alternatives considered

- **Pure agent (skills/prompt only):** rejected because coverage,
  positioning, and cost become unverifiable suggestions.
- **Pure static analysis + LLM polish:** rejected because
  rule-based-only review misses cross-file and semantic defects the tool
  set is built to find.