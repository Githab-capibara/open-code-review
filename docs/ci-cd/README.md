# CI/CD Integration

This directory contains CI/CD integration documentation.

## Supported Platforms

| Platform | Documentation |
|----------|---------------|
| GitHub Actions | [examples/github_actions/README.md](../../examples/github_actions/README.md) |
| GitLab CI | [examples/gitlab_ci/README.md](../../examples/gitlab_ci/README.md) |
| GitFlic CI | [examples/gitflic_ci/README.md](../../examples/gitflic_ci/README.md) |
| Gerrit CI | [examples/gerrit_ci/README.md](../../examples/gerrit_ci/README.md) |
| CodeUp CI | [examples/codeup_ci/README.md](../../examples/codeup_ci/README.md) |
| Bitbucket Pipelines | [examples/bitbucket_pipelines/README.md](../../examples/bitbucket_pipelines/README.md) |

## Quick Start

### GitHub Actions

Create `.github/workflows/ocr-review.yml`:

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

Create `.gitlab-ci.yml`:

```yaml
code_review:
  script:
    - npm install -g @alibaba-group/open-code-review
    - ocr review --audience agent
  only:
    - merge_requests
```

## Best Practices

### 1. Use Agent Audience Mode

Always use `--audience agent` in CI to suppress progress UI:

```bash
ocr review --audience agent
```

### 2. Configure Secrets

Store LLM tokens in repository secrets, never in code:

```bash
export OCR_LLM_TOKEN=${{ secrets.OCR_LLM_TOKEN }}
```

### 3. Set Timeouts

Configure appropriate timeouts for your CI environment:

```bash
ocr review --timeout 15  # 15 minutes
```

### 4. Handle Output

Redirect output to artifacts for review:

```bash
ocr review --audience agent > ocr-review.txt 2>&1
```

## Advanced Configuration

### Custom Rules

Use project-specific rules in `.opencodereview/rule.json`:

```json
{
  "rules": [
    {
      "path": "**/*.go",
      "rule": "All functions must have error handling"
    }
  ]
}
```

### Branch Comparison

Review against specific branches:

```bash
ocr review --from main --to ${{ github.head_ref }}
```

### Session Resume

Resume interrupted reviews:

```bash
ocr review --resume <session-id>
```

## Troubleshooting

### Common Issues

**LLM timeout:** Increase timeout with `--timeout` flag
**Rate limiting:** Reduce concurrency with `--concurrency`
**Token limit:** Use scan mode for large files: `ocr scan`

### Logs

Enable debug logging:

```bash
export OCR_LOG_LEVEL=debug
ocr review
```

## Support

- [Integration Issues](https://github.com/alibaba/open-code-review/issues)
- [FAQ](../user-guide/06-faq.md)
- [User Guide](../user-guide/README.md)