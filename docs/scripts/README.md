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
| [platform.js](../../scripts/platform.js) | Platform detection utilities | JavaScript |
| [update.js](../../scripts/update.js) | Update check and notification | JavaScript |
| [version.js](../../scripts/version.js) | Version management | JavaScript |

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

## GitHub Actions Scripts

The `github-actions/` subdirectory contains reusable workflows:

| Script | Purpose |
|--------|---------|
| `github-actions/` | Reusable CI workflows |

## Publish Scripts

The `publish/` subdirectory contains release automation:

| Script | Purpose |
|--------|---------|
| `publish/` | Release publishing tools |

## Links

- [Contributing Guide](../development/02-contributing.md)
- [Makefile Reference](../user-guide/04-cli-reference.md)
