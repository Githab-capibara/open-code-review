# 07. Other CI Systems (Bitbucket, GitFlic, Gerrit, Codeup)

- **Authors:** @Githab-capibara

- **Status:** Shipped (examples)
- **Audience:** CI maintainers

## Overview

Beyond GitHub Actions and GitLab CI, the repo ships copy-and-adapt
pipeline examples under
[`examples/`](../../examples/). Every example follows the same CI
pattern: install `ocr` → configure the LLM from CI secrets → run
`ocr review --from <base> --to <head> --format json --audience agent`
→ parse `comments[]` → post findings back through the forge's API.

| System | Files | Posting helper |
|--------|-------|----------------|
| Bitbucket Pipelines | `examples/bitbucket_pipelines/bitbucket-pipelines.yml` | inline steps |
| GitFlic CI | `examples/gitflic_ci/gitflic-ci.yaml` | `post_review.py` |
| Gerrit (Jenkins / Gerrit Trigger) | `examples/gerrit_ci/Jenkinsfile` | `post_review.py` |
| Aliyun Codeup Flow | `examples/codeup_ci/codeup-flow.yml` | `post_review.py` |

The `post_review.py` helpers are unit-tested (`post_review_test.py`)
and fold findings without line info into a summary note, same as the
GitLab/GitHub posters.

## How to adopt

1. Read the subdirectory's own `README.md` — each documents its
   triggers, required variables, and token permissions.
2. Provide two credential kinds: **LLM credentials** (findings) and a
   **forge write token** (posting comments).
3. Keep the runner ephemeral-safe: configure via `ocr config set` or
   `OCR_LLM_*` env on every run.

Patterns shared with the first-class recipes — see
[GitHub Actions](01-github-actions.md) and
[GitLab CI](02-gitlab-ci.md).

## Related

- [Examples index](../11-examples/01-github-actions.md)
- [JSON envelope](../05-cli/01-review-command.md)