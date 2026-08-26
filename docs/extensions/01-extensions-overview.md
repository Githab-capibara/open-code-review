# 01. Extensions overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [extensions/vscode/](../../extensions/vscode/), [Extensions README](README.md)

## Context

Developers want review results without leaving the editor. The CLI covers
terminal workflows; IDE integration brings inline comments, apply/discard
actions, and configuration UI.

## Decision

Maintain IDE integrations under [`extensions/`](../../extensions/). Today
that is one extension — the VSCode extension
[`extensions/vscode/`](../../extensions/vscode/) (`open-code-review-vscode`,
VSCode `^1.74.0`, TypeScript):

**Architecture** (`src/extension/`):

| Layer | Modules | Role |
|-------|---------|------|
| Entry | `extension.ts`, `commands.ts` | Activation and command registration |
| Providers | `CommentProvider`, `SidebarProvider`, `ConfigPanelProvider` | Inline review comments, sidebar session browsing, settings panel |
| Positioning | `commentAnchor.ts`, `lineOffset.ts` | Map OCR line-level comments to stable editor anchors despite edits |
| Services | `CliService`, `GitService`, `ConfigService`, `ReviewSession` | Spawn the `ocr` CLI, read git state, manage config drafts, track session lifecycle |
| Parsers | `cliParse.ts`, `configParse.ts`, `configDraft.ts`, `gitMap.ts`, `shellEnv.ts` | Typed parsing of CLI output, config JSON, git status, shell environment |

**Registered commands:** `ocr.review.start`, `ocr.review.cancel`,
`ocr.config.open`, `ocr.comment.apply`, `ocr.comment.discard`,
`ocr.comment.falsePositive`.

**Testing:** Jest unit tests colocated under `__tests__/`; the VSCode API is
mocked via `__mocks__/vscode.js`. Localization through `package.nls.json`
(English) and `package.nls.zh-cn.json` (Chinese). CI builds and packages via
the `vscode-ext.yml` workflow; the roadmap adds a JetBrains plugin in H2
2026 ([roadmap](../planning/01-roadmap.md)).

## Consequences

- **Easier:** review feedback appears as native editor comments with
  one-keystroke apply/discard; no terminal context switching.
- **Harder:** extension must parse CLI output formats — CLI changes can
  break anchoring, covered by parser tests.
- **Given up:** deep LSP-style language analysis — the extension delegates
  all intelligence to the `ocr` process.
- **Migration:** new IDE targets get a sibling directory under
  `extensions/` plus an entry here.

## Alternatives considered

- **Generic Language Server instead of an extension:** rejected because
  review comments are transient annotations, not persistent diagnostics.
- **Webview-only UI:** rejected for comments — inline gutter annotations are
  the core UX requirement.
