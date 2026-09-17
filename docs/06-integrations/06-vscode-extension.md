# 06. VS Code Extension

- **Authors:** @Githab-capibara

- **Status:** Shipped (`extensions/vscode/`, v0.1.x, VS Code ≥ 1.74)
- **Audience:** editor users

## Overview

A VS Code extension built on the `ocr` CLI: a Preact WebView sidebar
brings AI code review into the editor. Reviews start from the sidebar,
CLI logs stream live, and each comment can be applied, dismissed, or
flagged as a false positive — inline CommentThreads and the sidebar
stay two-way synced.

## Features

- Three review modes matching the CLI: workspace changes, branch
  comparison (`--from`/`--to`), single commit (`--commit`).
- Files-to-review preview; click a file to open the native diff view.
- Optional `--background` hint per review.
- Streaming logs with cancellation; retryable failure states that
  surface the real CLI error.
- Config view: view/edit the LLM provider config (persisted via
  `ocr config set`), model switching, and connectivity test from the
  status bar.

## Prerequisites

```bash
npm i -g @alibaba-group/open-code-review   # the CLI the extension shells out to
ocr config set llm.url ... && ocr config set llm.auth_token ... && ...
```

or configure everything inside the extension's config view; it writes
the same `~/.opencodereview/config.json`.

## Development

Node.js ≥ 18 with **Yarn** (`yarn.lock` ships in `extensions/vscode/`).
See [`extensions/vscode/README.md`](../../extensions/vscode/README.md)
for build/run/debug instructions and
[development setup](../08-guides/03-development-setup.md) for the
monorepo context.