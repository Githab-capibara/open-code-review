# 01. GitHub Actions Integration

- **Authors:** @Githab-capibara

- **Status:** Shipped
- **Audience:** CI maintainers

## Overview

The repo root ships `action.yml`, a **composite GitHub Action** ("OCG
PR Review") that runs an AI review on pull requests and posts inline
comments, a sticky summary, and incremental non-destructive updates.
It wraps the CLI (`ocr review --format json`) plus a Node poster
(`scripts/github-actions/post-review-comments.js`). The architecture
rationale is [ADR-05](../03-adr/05-github-action-composite.md).

## Usage

```yaml
name: OCR review
on:
  pull_request_target:
    types: [opened]
permissions:
  pull-requests: write
  contents: read
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: alibaba/open-code-review@v1
        with:
          llm_url: ${{ secrets.OCR_LLM_URL }}
          llm_auth_token: ${{ secrets.OCR_LLM_TOKEN }}
          llm_model: claude-sonnet-4-5
          llm_use_anthropic: "true"
```

`pull_request_target` is used so secrets work for fork PRs; OCR only
reads the diff and never executes PR code. The checkout materializes
the trusted base and fetches the PR head as a blob, so untrusted files
are never written into the workspace (see
[trust boundaries](../07-security/03-trust-boundaries.md)).

## Key inputs (abridged — `action.yml` is the contract)

| Group | Inputs |
|-------|--------|
| LLM | `llm_url`, `llm_auth_token`, `llm_model`, `llm_use_anthropic`, `llm_auth_header`, `llm_extra_headers`, `llm_extra_body`, `llm_reasoning_effort`, `llm_timeout`, `review_task_timeout` |
| Review | `review_concurrency`, `background`, `rule`, `effort`, `max_tokens_budget`, `stream_progress`, `language` |
| Posting | `sticky_summary`, `incremental`, `incremental_overlap_threshold`, `review_comment_batch_size`, `route_severity_below`, `route_categories` |
| Scope | `checkpoint_range`, `full_review`, `base_ref`, `head_sha`, `pr_number` |
| Infra | `github_token`, `ocr_version`, `node_version`, `upload_artifacts` |

Outputs: `comments_total`, `comments_inline`, `comments_skipped`,
`comments_routed`, `comments_failed`, `summary_comment_url`.

## Re-running from a comment

The bundled example workflow (`examples/github_actions/ocr-review.yml`)
also triggers on `issue_comment` bodies starting with
`/open-code-review` / `@open-code-review`, so reviewers can re-run the
review by commenting.

## Version floors

New inputs are gated against the resolved CLI version: the action parses
`ocr version` at install time and fails fast when `ocr_version` is too
old for a requested input — the requested spec is never trusted blindly.

## Contract tests

`.github/workflows/action-contract.yml` validates the action surface;
keep it green when touching `action.yml` or the poster.

## Related

- [Example workflows](../11-examples/01-github-actions.md)
- [CLI review reference](../05-cli/01-review-command.md)