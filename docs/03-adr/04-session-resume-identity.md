# 04. Decide resume eligibility by sealed input identity

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [session management](../02-architecture/06-session-management.md), [coverage manifest](../02-architecture/06-session-management.md)

## Context

Reviews on large branches can run long and get interrupted by Ctrl-C,
per-task timeouts, or provider outages. Re-running from scratch pays
for completed work again. But resuming the wrong way — reusing a
session whose input no longer matches — silently reviews stale
content, which is worse than paying twice. The identity of "the same
review" cannot be the CLI string (`--from main --to feat` then `--from
origin/main --to feat` may mean the same commit pair, while an
identical string days later means different commits), and it cannot be
reconstructed by scanning prior session directories.

## Decision

Resume matching uses a **sealed input identity**: a fingerprint
computed deterministically over the resolved review input — mode
(range/commit/workspace), resolved commit SHAs, and the selected file
set — captured before any session state exists (`SealedInput` in
`internal/agent`; run identity in `internal/session`). A candidate
session can be resumed only if its sealed identity matches the current
resolved input; otherwise `--resume` refuses and instructs the user to
start fresh. The same `item_id` derivation keeps per-file coverage
stable across a resume chain, so the manifest stays coherent.

## Consequences

- **Easier:** resume is provably safe — it cannot review stale diffs;
  manifests merge cleanly across resumes; identity checks need no git
  round-trip.
- **Harder:** a force-push or new commit to the branch changes the
  identity and forces a fresh review — intentional, but occasionally
  surprises users who expect partial reuse.
- **Given up:** "best effort" resume by fuzzy CLI-argument matching.
- **Migration:** none — sessions without a sealed identity simply do not
  resume.

## Alternatives considered

- **Resume by session-id only (trust the user):** rejected — silently
  wrong coverage.
- **Resume by matching CLI arguments:** rejected — the same words can
  denote different commits over time.
- **Never resume, always full re-run:** rejected at production review
  volumes for cost alone.