# Extensions

This directory contains IDE extension documentation for OpenCodeReview.

## Documents

| Guide | Purpose |
|-------|---------|
| [01-extensions-overview.md](01-extensions-overview.md) | Overview of IDE extension strategy and architecture |
| [02-vscode-extension.md](02-vscode-extension.md) | VS Code extension — features, installation, development, architecture |

## Current Extensions

| Extension | IDE | Status |
|-----------|-----|--------|
| [VSCode Extension](../../extensions/vscode/) | Visual Studio Code | **Available** on Marketplace |
| JetBrains plugin (planned) | IntelliJ IDEA, GoLand, PyCharm | **H2 2026** |

## VSCode Extension Quick Reference

The VSCode extension integrates AI-powered code review directly into the editor:

- **Three review modes**: workspace changes, branch comparison (`--from` / `--to`), single commit (`--commit`)
- **Streaming logs**: tail CLI output live; cancel anytime
- **Two-way sync**: comment cards in sidebar stay in sync with CommentThreads in the editor
- **Actions**: apply fixes, dismiss comments, flag as false-positive inline
- **Configuration**: view/edit LLM provider config inside the extension (persists via `ocr config set`)

## Links

- [Extension Issues](https://github.com/alibaba/open-code-review/issues)
- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=open-code-review.opencodereview)
- [Integration Documentation](../integration/README.md)
- [Architecture Overview](../architecture/01-overview.md)