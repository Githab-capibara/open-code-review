# CI/CD Examples

This directory contains ready-to-use CI/CD pipeline examples for OpenCodeReview.

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

- [CI/CD Integration Guide](../integration/04-ci.md)
- [CLI Reference](../user-guide/04-cli-reference.md)
