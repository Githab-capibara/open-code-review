# 01. Translations and Localization

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Audience:** translators, docs maintainers

## What is localized, where

| Surface | Locations | Locales |
|---------|-----------|---------|
| Root README | root `README.md` + [`docs/i18n/README.<locale>.md`](../i18n/) | `zh-CN`, `ja-JP`, `ko-KR`, `ru-RU` |
| Contributing guide | [`docs/08-guides/01-contributing.md`](../08-guides/01-contributing.md) + `docs/i18n/CONTRIBUTING.<locale>.md` | same four |
| VS Code extension | `extensions/vscode/README.md` + `README.zh-CN.md`, `package.nls*.json` | `zh-CN` |
| Plugin docs | e.g. `plugins/open-code-review/CODEX.ko-KR.md` | `ko-KR` |
| Website docs | `pages/src/content/docs/<locale>/` | `en`, `zh`, `ja`, `ko`, `ru` |

Note the two conventions: `docs/i18n/` files are **localized copies**
named `<ORIGINAL>.<locale>.md` (not renumbered — the numbering rule
applies to canonical English docs, and these filenames are referenced
by many tables/links), while the website uses per-locale directories.

## Sync rules (enforced)

- **README `##` structure:** `.github/workflows/translation-sync.yml`
  runs `scripts/github-actions/check-translation-sync.js readmes`,
  comparing the top-level `##` section structure across `README*.md`.
  When you add/rename/remove a `##` section in root `README.md`, every
  `docs/i18n/README.*.md` must change in the same PR — and vice versa.
- **CLI reference content:** `cmd/opencodereview/cli_reference_compare_docs_test.go`
  pins that each locale of
  `pages/src/content/docs/<locale>/cli-reference.md` documents the same
  commands and uses the agreed per-locale terminology (e.g. "subtask" /
  「サブタスク» / "подзадач"). A command added only in `en` fails the
  build.
- **Canonical paths:** translated guides link back to the English
  canonical doc (e.g. `docs/i18n/CONTRIBUTING.*.md` →
  `../08-guides/01-contributing.md`). When a canonical doc moves, fix
  the links in all locales.

## Translating a new locale

1. Copy the English file, keep the `<ORIGINAL>.<locale>.md` naming.
2. Translate prose; keep code blocks, commands, paths, and links
   intact. Technical terms may stay English where the community does.
3. Add the language switcher link in every sibling and in the
   contributing/docs tables that enumerate locales.
4. For website docs, create `pages/src/content/docs/<locale>/` pages
   matching the `en` structure and run `go test
   ./cmd/opencodereview -run TestCLIReference` locally.

## Related

- [Contributing guide](../08-guides/01-contributing.md) — docs
  contribution workflow
- [Development setup](../08-guides/03-development-setup.md) — running
  the website and sync tests