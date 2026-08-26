# 01. Scripts overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [scripts/](../../scripts/), [Makefile](../../Makefile), [Scripts README](README.md)

## Context

Repository hygiene (license headers, English-only sources, pinned GitHub
Actions) and npm lifecycle behavior are enforced by scripts so that both
humans and CI fail fast on violations.

## Decision

Maintain all build, verification, and maintenance automation under
[`scripts/`](../../scripts/):

### Repository verification

| Script | Purpose | Invoked by |
|--------|---------|------------|
| [`add-license.sh`](../../scripts/add-license.sh) | Add SPDX `Apache-2.0` headers to source files | `make license-add` |
| [`verify-license.sh`](../../scripts/verify-license.sh) | Fail if any source file lacks a license header | `make license-check` → `make check` |
| [`verify-english-only.go`](../../scripts/verify-english-only.go) | Fail on non-English text in source code | `make english-check` → `make check` |
| [`verify-action-pins.sh`](../../scripts/verify-action-pins.sh) | Verify GitHub Actions are version-pinned | CI |

### npm package lifecycle

| Script | Purpose |
|--------|---------|
| [`install.js`](../../scripts/install.js) | postinstall: resolve the platform-specific binary for the current OS/arch |
| [`platform.js`](../../scripts/platform.js) | Platform mapping (`darwin`/`linux`/`win32` × `arm64`/`x64`) and `resolveNativeBinary()` used by `bin/ocr.js` |
| [`update.js`](../../scripts/update.js) | Background update check; writes the hint file consumed by the CLI |
| [`version.js`](../../scripts/version.js) + [`version.test.js`](../../scripts/version.test.js) | Version comparison helpers with unit tests |

### Release and CI support

| Path | Purpose |
|------|---------|
| [`github-actions/post-review-comments.js`](../../scripts/github-actions/post-review-comments.js) (+ test) | Post OCR review comments back to the pull request from a workflow step |
| [`github-actions/check-translation-sync.js`](../../scripts/github-actions/check-translation-sync.js) (+ test) | Verify website translations stay in sync across locales |
| [`publish/publish.sh`](../../scripts/publish/publish.sh), [`publish-platform.sh`](../../scripts/publish/publish-platform.sh), [`_common.sh`](../../scripts/publish/_common.sh) | Release automation: build all platform binaries, checksum, publish npm packages per platform |

The Makefile wires these into targets: `check` = `license-check` +
`english-check`; release flow is `build-all` → `sha256sum` → publish
scripts.

## Consequences

- **Easier:** one command (`make check`) gates style, licensing, and
  language policy; releases are repeatable shell scripts.
- **Harder:** three script languages (Bash, Go, JavaScript) must all stay
  runnable in CI images.
- **Given up:** ad-hoc manual fixes — every policy has an enforcing script.
- **Migration:** new policies should land as `verify-*` scripts plus a
  Makefile target.

## Alternatives considered

- **GitHub Actions inline steps only:** rejected because local contributors
  need the same checks before pushing.
- **A polyglot lint meta-tool:** rejected as overkill; four small focused
  scripts are easier to audit.
