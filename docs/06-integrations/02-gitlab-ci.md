# 02. GitLab CI Integration

- **Authors:** @Githab-capibara

- **Status:** Shipped
- **Audience:** CI maintainers

## Overview

OCR runs on every Merge Request via a copyable GitLab CI recipe; the
upstream example lives in
[`examples/gitlab_ci/`](../../examples/gitlab_ci/). The pipeline is a
thin wrapper around the core command — the same pattern as every CI
recipe:

```bash
ocr review \
  --from "origin/<target-branch>" \
  --to "origin/<source-branch>" \
  --format json \
  --audience agent
```

The job then parses `comments[]` from the JSON envelope and posts them
back to the MR. Findings without valid line info are folded into a
summary note; if the inline-batch API rejects the request the poster
falls back to a plain summary comment.

## Credentials

Two kinds are always in play:

| Credential | Used for | Source |
|------------|----------|--------|
| LLM credentials | generating findings | CI variables for `OCR_LLM_*` / `ocr config set` |
| MR write token | posting comments back | dedicated `GITLAB_API_TOKEN` (recommended); `CI_JOB_TOKEN` is a fork-MR fallback (can post `/discussions`) |

## Steps of the recipe

1. Trigger on MR events (or a manual `/open-code-review` comment).
2. `npm install -g @alibaba-group/open-code-review` in the runner.
3. Configure the LLM from CI secrets — the runner is ephemeral, there
   is no persisted `~/.opencodereview`.
4. Run the range review with `--format json --audience agent`.
5. Walk `comments[]` and post via the GitLab review/discussion API.

## Related

- [Other CI systems](07-other-cicd.md) — Bitbucket, Gerrit, GitFlic, Codeup
- [CI/CD guide on the website](../../pages/src/content/docs/en/integrations/ci.md)
- [JSON envelope](../05-cli/01-review-command.md)