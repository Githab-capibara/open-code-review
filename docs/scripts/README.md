# Build Scripts

This directory contains build, verification, and maintenance scripts for OpenCodeReview.

## Scripts Overview

| Script | Purpose | Language |
|--------|---------|----------|
| [add-license.sh](../../scripts/add-license.sh) | Add SPDX license headers to source files | Bash |
| [verify-license.sh](../../scripts/verify-license.sh) | Verify all source files have license headers | Bash |
| [verify-english-only.go](../../scripts/verify-english-only.go) | Enforce English-only source code | Go |
| [verify-action-pins.sh](../../scripts/verify-action-pins.sh) | Verify GitHub Actions use pinned versions | Bash |
| [install.js](../../scripts/install.js) | Post-install setup for npm package | JavaScript |
| [platform.js](../../scripts/platform.js) | Platform detection and `resolveNativeBinary()` | JavaScript |
| [update.js](../../scripts/update.js) | Update check and notification hint file | JavaScript |
| [version.js](../../scripts/version.js) / `version.test.js` | Version comparison helpers (+ unit test) | JavaScript |

### github-actions/

Reusable Node scripts used by repository workflows:

| Script | Purpose |
|--------|---------|
| [`github-actions/post-review-comments.js`](../../scripts/github-actions/post-review-comments.js) | Post OCR review comments back to the pull request |
| [`github-actions/check-translation-sync.js`](../../scripts/github-actions/check-translation-sync.js) | Verify website translations stay in sync across locales |

Both have colocated Jest tests (`*.test.js`).

### publish/

Release automation:

| Script | Purpose |
|--------|---------|
| [`publish/publish.sh`](../../scripts/publish/publish.sh) | Orchestrate a full release: build all platform binaries and publish packages |
| [`publish/publish-platform.sh`](../../scripts/publish/publish-platform.sh) | Publish one platform-specific npm package |
| [`publish/_common.sh`](../../scripts/publish/_common.sh) | Shared shell helpers |

## Makefile Targets

| Target | Purpose |
|--------|---------|
| `make build` | Build the Go binary |
| `make test` | Run Go tests |
| `make coverage` | Test coverage report |
| `make fmt` / `make vet` | Format and static analysis |
| `make check` | `license-check` + `english-check` gate |
| `make license-add` / `license-check` | SPDX header tooling |
| `make english-check` | English-only source verification |
| `make build-all` | Cross-compile all 6 platforms |
| `make sha256sum` | Generate release checksums after `build-all` |

## Usage

### Add License Headers

```bash
make license-add
# Or directly:
./scripts/add-license.sh
```

### Verify English Only

```bash
make english-check
# Or directly:
go run scripts/verify-english-only.go
```

### Verify License Headers

```bash
make license-check
# Or directly:
./scripts/verify-license.sh
```

## Links

- [Contributing Guide](../development/02-contributing.md)
- [Scripts overview](01-scripts-overview.md)
