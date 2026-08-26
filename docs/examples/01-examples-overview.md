# 01. Examples overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [examples/](../../examples/), [CI/CD guide](../ci-cd/README.md), [CI integration](../integration/04-ci.md)

## Context

Every git host has its own pipeline format and comment-posting API. Copy-paste
examples per platform are the fastest path from zero to automated review.

## Decision

Maintain one ready-to-copy pipeline per supported platform under
[`examples/`](../../examples/):

| Example | Pipeline file | Comment posting |
|---------|---------------|-----------------|
| [`github_actions/`](../../examples/github_actions/) | `ocr-review.yml` | Built-in OCR GitHub step |
| [`gitlab_ci/`](../../examples/gitlab_ci/) | `.gitlab-ci.yml` | [`post_review.py`](../../examples/gitlab_ci/post_review.py) (+ test) posts notes to the merge request API |
| [`gitflic_ci/`](../../examples/gitflic_ci/) | `gitflic-ci.yaml` | [`post_review.py`](../../examples/gitflic_ci/post_review.py) (+ test) |
| [`gerrit_ci/`](../../examples/gerrit_ci/) | `Jenkinsfile` (Gerrit Trigger plugin) | [`post_review.py`](../../examples/gerrit_ci/post_review.py) (+ test) pushes reviews to Gerrit |
| [`codeup_ci/`](../../examples/codeup_ci/) | `codeup-flow.yml` | [`post_review.py`](../../examples/codeup_ci/post_review.py) (+ test) for Aliyun CodeUp |
| [`bitbucket_pipelines/`](../../examples/bitbucket_pipelines/) | `bitbucket-pipelines.yml` | Native OCR output |

Common conventions across all examples:

1. Install once with `npm install -g @alibaba-group/open-code-review`.
2. Run `ocr review --audience agent` so output is machine-readable and the
   progress UI is suppressed.
3. Provide the model token through a platform secret (`OCR_LLM_TOKEN`).
4. Python posters are unit-tested (`post_review_test.py`) and mirror each
   other per platform API.

Deeper setup steps live in each example's own `README.md`; the user-facing
guide is [CI/CD integration](../integration/04-ci.md).

## Consequences

- **Easier:** teams adopt review automation by copying a single directory;
  six major hosts covered out of the box.
- **Harder:** six pipelines must be updated together when flags or env
  variables change.
- **Given up:** a universal pipeline template — host syntaxes are too
  different.
- **Migration:** a new host means a new subdirectory: pipeline file +
  optional poster script + test + README, then update this matrix.

## Alternatives considered

- **Document YAML snippets only (no runnable directories):** rejected
  because untested snippets rot; runnable examples with tests stay honest.
- **Publish examples as a separate action/marketplace item per host:**
  deferred until usage data justifies the maintenance cost.
