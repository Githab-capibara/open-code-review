# 01. Quickstart

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Audience:** New users
- **Prerequisites:** Git >= 2.41, an LLM API key (any supported provider)

## Install

The fastest path is npm:

```bash
npm install -g @alibaba-group/open-code-review
```

After installation, the `ocr` command is available globally. For the
standalone install script, release binaries, or building from source,
see the [installation page](https://open-codereview.ai/docs/installation)
and [`install.sh`](../../install.sh) / [`install.ps1`](../../install.ps1).

## Configure the LLM

OCR needs a model endpoint before it can review code (unless you use
[delegate mode](../05-cli/03-delegate-command.md), which borrows your
coding agent's own model):

```bash
ocr config provider          # pick a built-in provider (or add a custom one)
ocr config model             # choose a model for the active provider
```

The interactive UI walks you through provider selection, API-key entry,
and model choice, then runs a connectivity test. To skip the TUI, the
same settings are reachable with `ocr config set llm.url ...`,
`ocr config set llm.model ...`, and environment variables
(`OCR_LLM_URL`, `OCR_LLM_TOKEN`, `OCR_LLM_MODEL`) — see
[Configuration](../05-cli/05-config-command.md).

## Run your first review

From a Git repository:

```bash
cd your-project

# Workspace mode — staged + unstaged + untracked changes
ocr review

# Branch range — everything feature-branch changed since it diverged from main
ocr review --from main --to feature-branch

# Single commit (compared against its parent)
ocr review --commit abc123
```

OCR prints review comments grouped by file, with line ranges, category,
and severity. Use `--format json` to hand results to another tool:

```bash
ocr review --format json --output result.json
```

## Check before you spend

Two flags avoid burning tokens on the wrong target:

```bash
ocr review --preview                  # list the files that would be reviewed
ocr review --from main --to topic --max-tokens-budget 200000
```

## Recover an interrupted review

A review interrupted by Ctrl-C (or the per-task timeout) is not lost.
Sessions persist under `~/.opencodereview/sessions/`:

```bash
ocr session list
ocr review --from main --to topic --resume <session-id>
```

## Replay in the browser

```bash
ocr viewer
```

Opens `http://localhost:5483` with your review history per repository —
see [viewer](../05-cli/06-viewer-command.md).

## Where to go next

- Every command and flag: [review](../05-cli/01-review-command.md),
  [scan](../05-cli/02-scan-command.md), [delegate](../05-cli/03-delegate-command.md),
  [session](../05-cli/04-session-command.md), [config](../05-cli/05-config-command.md),
  [viewer](../05-cli/06-viewer-command.md), [llm](../05-cli/07-llm-command.md)
- How it works: [Architecture overview](../02-architecture/01-overview.md)
- Automation: [GitHub Actions](../06-integrations/01-github-actions.md),
  [agent skills](../06-integrations/04-skills.md)
- Custom review rules: [rules engine](../02-architecture/08-rules-engine.md)