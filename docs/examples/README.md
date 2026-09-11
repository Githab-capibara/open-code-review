# CI/CD Examples

This directory contains ready-to-use CI/CD pipeline examples for OpenCodeReview.

## Index

| # | Title | Status |
|---|---|---|
| [01](01-examples-overview.md) | Examples Overview | Active |
| [02](02-github-actions.md) | GitHub Actions | Active |
| [03](03-gitlab-ci.md) | GitLab CI | Active |
| [04](04-bitbucket-pipelines.md) | Bitbucket Pipelines | Active |
| [05](05-codeup-ci.md) | CodeUp CI | Active |
| [06](06-gerrit-ci.md) | Gerrit CI | Active |
| [07](07-gitflic-ci.md) | GitFlic CI | Active |

## Available Examples

| Example | Platform | Description |
|---------|----------|-------------|
| [github_actions/](../../examples/github_actions/) | GitHub Actions | PR review on every pull request |
| [gitlab_ci/](../../examples/gitlab_ci/) | GitLab CI | Merge request review pipeline |
| [gitflic_ci/](../../examples/gitflic_ci/) | GitFlic CI | Russian Git hosting integration |
| [gerrit_ci/](../../examples/gerrit_ci/) | Gerrit / Jenkins | Code review with Gerrit Trigger |
| [codeup_ci/](../../examples/codeup_ci/) | CodeUp (Aliyun) | Alibaba Cloud CodeUp integration |
| [bitbucket_pipelines/](../../examples/bitbucket_pipelines/) | Bitbucket Pipelines | Atlassian Bitbucket integration |

## Quick Start

### GitHub Actions

Copy `.github/workflows/ocr-review.yml` from the example:

```yaml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install OCR
        run: npm install -g @alibaba-group/open-code-review
      - name: Run Review
        run: ocr review --audience agent
        env:
          OCR_LLM_TOKEN: ${{ secrets.OCR_LLM_TOKEN }}
```

### GitLab CI

Add to `.gitlab-ci.yml`:

```yaml
code_review:
  script:
    - npm install -g @alibaba-group/open-code-review
    - ocr review --audience agent
  only:
    - merge_requests
```

## Best Practices

1. **Use `--audience agent`** in CI to suppress progress UI
2. **Store tokens in secrets**, never in code
3. **Set appropriate timeouts** with `--timeout`
4. **Redirect output** to artifacts for debugging

## Links

- [CI/CD Integration Guide](../integration/03-ci.md)
- [CLI Reference](../user-guide/04-cli-reference.md)

## File Index

| File | Description |
|------|-------------|
| [01-examples-overview](01-examples-overview.md) | Examples directory overview |
| [02-github-actions](02-github-actions.md) | GitHub Actions CI/CD example |
| [03-gitlab-ci](03-gitlab-ci.md) | GitLab CI/CD example |
| [04-bitbucket-pipelines](04-bitbucket-pipelines.md) | Bitbucket Pipelines example |
| [05-codeup-ci](05-codeup-ci.md) | CodeUp (Aliyun) CI/CD example |
| [06-gerrit-ci](06-gerrit-ci.md) | Gerrit CI/CD example |
| [07-gitflic-ci](07-gitflic-ci.md) | GitFlic CI/CD example |
