# 01. GitHub Actions Workflow Examples

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Audience:** CI maintainers

Ready-to-copy workflows live in
[`examples/github_actions/`](../../examples/github_actions/) — copy
into `.github/workflows/` and set secrets/vars. The integration itself
is documented in [GitHub Actions integration](../06-integrations/01-github-actions.md).

## Example 1 — minimal, fully delegated

`examples/github_actions/ocr-review.yml` delegates every step
(checkout, install, review, posting, artifacts) to the official
composite action; it covers automatic review
(`pull_request_target: opened/synchronize/reopened`) and on-demand
re-review via `/open-code-review` / `@open-code-review` comments:

```yaml
- uses: alibaba/open-code-review@main
  with:
    llm_url: ${{ secrets.OCR_LLM_URL }}
    llm_auth_token: ${{ secrets.OCR_LLM_AUTH_TOKEN }}
    llm_model: ${{ vars.OCR_LLM_MODEL }}
    llm_use_anthropic: ${{ vars.OCR_LLM_USE_ANTHROPIC }}
```

## Example 2 — reproducible pinning

`@main` + `ocr_version: latest` means a new CLI release changes review
behavior. Freeze both coordinates:

```yaml
- uses: alibaba/open-code-review@<full-commit-sha>  # vX.Y.Z
  with:
    ocr_version: 'X.Y.Z'
    # …LLM inputs as above
```

Every action referenced *inside* `action.yml` is itself pinned to a
full SHA (`scripts/verify-action-pins.sh` enforces this in CI), so the
outer SHA transitively freezes the workflow.

## Example 3 — self-hosted runner

The project's own CI (`.github/workflows/ocr-review.yml`) runs the
action on `runs-on: self-hosted` in a `node:24` container. Borrow:

- `container:` image with Node.js (git is installed if missing);
- `git config --global --replace-all safe.directory '*'` inside the
  container ("dubious ownership" fix — `--replace-all`, not `--add`);
- explicit input pinning (`sticky_summary`, `incremental`,
  `upload_artifacts`, `llm_extra_body`, …).

Note: that workflow uses `uses: ./` only because `action.yml` lives in
the same repo — external users keep `uses: alibaba/open-code-review@…`.
The action fetches the PR with `fetch-depth: 0` internally; no extra
checkout step is required.

## Related

- [GitHub Actions integration](../06-integrations/01-github-actions.md)
- [Other CI examples](../06-integrations/07-other-cicd.md)