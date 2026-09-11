# 01. Extensions Overview

**Status:** Active
**Last Updated:** 2026-08-23
**Maintainer:** @Githab-capibara

## Purpose

Developers want review results without leaving the editor. The CLI covers
terminal workflows; IDE integration brings inline comments, apply/discard
actions, and configuration UI.

## Compatibility

- **VS Code:** `^1.74.0`, TypeScript, Preact WebView
- **JetBrains:** Planned for H2 2026 (see [roadmap](../planning/01-roadmap.md))
- **Localization:** English (`package.nls.json`) and Chinese (`package.nls.zh-cn.json`)

## Installation

1. Install VS Code `^1.74.0` or later
2. Open Extensions view (`Ctrl+Shift+X`)
3. Search for `open-code-review`
4. Click Install

Or install from the Marketplace directly:
```bash
# From VS Code CLI
code --install-extension alibaba-group.open-code-review
```

## Features

The VS Code extension (`open-code-review-vscode`) provides:

- **Three review modes:** workspace changes, branch comparison (`--from` / `--to`), and a single commit (`--commit`)
- **Inline gutter annotations:** apply / dismiss / flag-as-false-positive each comment
- **Live sidebar logging:** real-time review progress streaming
- **Two-way sync:** comments in the editor stay in sync with the sidebar session

**Registered commands:** `ocr.review.start`, `ocr.review.cancel`,
`ocr.config.open`, `ocr.comment.apply`, `ocr.comment.discard`,
`ocr.comment.falsePositive`.

**Testing:** Jest unit tests colocated under `__tests__/`; the VSCode API is
mocked via `__mocks__/vscode.js`. CI builds and packages via the
`vscode-ext.yml` workflow.

## Configuration

- `ocr.review.start` — start a review session
- `ocr.review.cancel` — cancel an in-progress session
- `ocr.config.open` — open the config panel
- `ocr.comment.apply` — apply the suggested fix inline
- `ocr.comment.discard` — dismiss a review comment
- `ocr.comment.falsePositive` — mark a comment as false positive

## Related Documentation

- [VS Code Extension](02-vscode-extension.md)
- [Extensions README](README.md)
- [Plugins Overview](../plugins/README.md)
