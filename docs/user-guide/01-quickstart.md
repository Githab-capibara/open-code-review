
# 01. Quick Start

Get your first code review running in a few minutes.

## Prerequisites

- **Git ≥ 2.41**
- **Node.js ≥ 18**
- **LLM API key** (not needed if using [Delegation Mode](../integration/01-delegate.md)

## Step 1 — Install the CLI

```bash
npm install -g @alibaba-group/open-code-review
```

```bash
ocr version
```

> See [Installation](../user-guide/02-installation.md) for more methods.

## Step 2 — Configure an LLM

> If you're using [Delegation Mode](../integration/01-delegate.md) (e.g. running inside Claude Code, the host agent supplies the model — skip to Step 4.

```bash
ocr config provider
```

It lets you pick a built-in or custom provider, enter an API key, choose a model, saves everything to the config file, and then runs `ocr llm test` once to verify the endpoint. To switch models later:

```bash
ocr config model
```

### Alternative: non-interactive command

In CI or a no-TUI environment, write to the same config directly with `ocr config set`:

```bash
ocr config set provider                    anthropic
ocr config set model                       claude-opus-4-6
ocr config set providers.anthropic.api_key sk-ant-xxxxxxxxxx
```

## Step 3 — Test connectivity

```bash
ocr llm test
```

If you get an error like `no valid LLM endpoint configured`, recheck the Step 2 config. A 401 / 403 means the token is wrong or expired.

## Step 4 — Run your first review

Move into any Git repository and run:

```bash
cd path/to/your-repo

# Workspace mode — reviews staged + unstaged + untracked changes (default)
ocr review

# Branch range — reviews feature-branch's changes since it diverged from main (merge-base mode)
ocr review --from main --to feature-branch

# Single commit — reviews the diff that commit introduced
ocr review --commit abc123
```

> See [CLI Reference](../user-guide/04-cli-reference.md) for the complete list of `ocr review` flags (concurrency tuning, output format, audience mode, background context, and more) plus every other sub-command.

### Want to see what would be reviewed first?

```bash
ocr review --preview              # workspace
ocr review -c abc123 --preview    # commit
```

### JSON output for systems

`--audience agent` suppresses the human-friendly progress UI so the only thing on stdout is the JSON / final summary — exactly what an upstream agent or CI script wants.

```bash
ocr review --format json --audience agent > review.json
```

## See Also

- [Installation](../user-guide/02-installation.md) — every install method and OCR's state directory.
- [Configuration](../user-guide/03-configuration.md) — every env var, config key, and built-in provider.
- [CLI Reference](../user-guide/04-cli-reference.md) — every sub-command, flag, and output mode.
- [Review Rules](../user-guide/05-review-rules.md) — customize what gets reviewed.
- [Integrations](../integration/02-agent-skill.md) — embed OCR in Claude Code, an Agent skill, or CI.
- [FAQ](../user-guide/06-faq.md) — known errors and remedies.
