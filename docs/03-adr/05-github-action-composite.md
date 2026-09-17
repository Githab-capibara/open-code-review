# 05. Ship GitHub integration as a composite action

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [GitHub Actions integration](../06-integrations/01-github-actions.md), [examples](../11-examples/01-github-actions.md)

## Context

Teams want AI review on pull requests with inline comments, a summary
comment, and incremental behavior. There are two ways to package a
GitHub integration: a **JavaScript/Docker "action"** doing everything
inside Node, or a **composite action** (`runs.using: composite`) that
composes shell steps and delegates the real work to the CLI plus thin
`github-script` helpers. A composite action must also run correctly
under forks, where the workflow must not materialize untrusted PR files
into the workspace.

## Decision

We ship `action.yml` as a composite action. It installs the npm CLI,
configures it, and runs `ocr review --format json`; a Node helper
(`scripts/github-actions/post-review-comments.js`) posts comments via
`actions/github-script`. The checkout step checks out the trusted base
and fetches the PR head blob so untrusted files are never materialized.
Version floors for new inputs are enforced by parsing `ocr version` at
install time rather than trusting the requested spec.

## Consequences

- **Easier:** one review engine everywhere (CLI, Action, editor) shares
  every fix; the action stays a thin, auditable orchestration of shell +
  `github-script`; fork-safety comes from git object layout, not trust
  assumptions; inputs map 1:1 to CLI flags and env, so docs transfer.
- **Harder:** the composite action must validate/normalize inputs itself
  (timeouts, effort, budgets) and gate newer inputs against the resolved
  CLI version.
- **Given up:** bundling review logic as Node — no separate JS review
  codebase to maintain, but also no JS-only reuse.
- **Migration:** none — action inputs are additive; older workflows
  keep working.

## Alternatives considered

- **Node/Docker action doing review in JS:** rejected — duplicates the
  engine and re-solves problems the Go CLI already solved.
- **Users call `ocr` from a hand-written workflow only:** rejected — too
  easy to get fork-safety, batching, and inline-comment posting wrong,
  which is exactly what the reusable action encodes and tests
  (`action-contract.yml`).