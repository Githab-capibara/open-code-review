# Coding agent plugins

Open Code Review ships platform-specific integrations for Codex, OpenCode,
and QCA Forward. Choose your platform below instead of adapting installation
instructions written for a different agent.

All integrations require Git 2.41 or later. Install the `ocr` CLI first:

```bash
npm install -g @alibaba-group/open-code-review
```

Configure and test an OCR LLM before running a review, unless you plan to use
[Delegation Mode](https://open-codereview.ai/docs/delegate):

```bash
ocr config provider
ocr config model
ocr llm test
```

## Codex

Add this repository as a Codex marketplace, then start Codex:

```bash
codex plugin marketplace add alibaba/open-code-review
codex
```

Open `/plugins`, install and enable **Open Code Review**, then start a new task.
The plugin exposes callable review skills backed by the local `ocr` CLI. For
example:

```text
@Open Code Review review my current changes
@Open Code Review review this branch against main
@Open Code Review review and fix high-confidence issues
```

## OpenCode

The `opencode/` directory contains a native TypeScript plugin
(`open-code-review.ts`) with its own `package.json`, vitest tests, and README.
See [opencode/README.md](opencode/README.md) for installation and usage.

## QCA Forward

QCA Forward uses the host model through OCR delegation mode. Publish the
`open-code-review-delegate` Skill, preinstall OCR in the referenced QCA
environment, and create a Forward Template from the bundled example. No OCR
LLM endpoint is required.

See the [QCA Forward integration guide](qca/README.md) and
[template example](qca/template.example.json).
