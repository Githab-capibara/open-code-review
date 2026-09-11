# 01. CI/CD Overview

**Status:** Active
**Last Updated:** 2026-08-23
**Maintainer:** @Githab-capibara

## Purpose

CI/CD integration guides document how to use OpenCodeReview in pipelines.
This document defines what belongs in this folder and links to per-platform
runnable pipelines.

## Trigger

CI/CD integration docs are created/updated whenever a new pipeline platform
is added (GitHub Actions, GitLab CI, GitFlic, etc.) or when the OCR CLI
interface changes that affect pipeline usage.

## Steps

1. **Write user-facing CI/CD guide** in [`integration/03-ci.md`](../integration/03-ci.md)
2. **Add runnable pipeline example** under [`examples/`](../examples/)
3. **Link both** from this overview's Related Documentation section

## Configuration

- Pipeline examples reference secrets: `OCR_LLM_URL`, `OCR_LLM_AUTH_TOKEN`, `OCR_LLM_MODEL`
- Example variables are platform-specific (GitLab CI uses `CI/CD Variables`, GitHub uses `secrets.*`)
- See [`integration/03-ci.md`](../integration/03-ci.md) for the canonical env var list

## Failure Handling

- Pipeline failures surface via OCR CLI exit codes (non-zero = review failed)
- Uploaded artifacts (`ocr-result.json`, `ocr-stderr.log`) help debug parse errors
- See the Troubleshooting section of each platform-specific example for details

## Related Documentation

- [Integration: CI/CD](../integration/03-ci.md)
- [Examples Overview](../examples/01-examples-overview.md)
- [GitHub Actions Example](../examples/02-github-actions.md)
- [GitLab CI Example](../examples/03-gitlab-ci.md)
