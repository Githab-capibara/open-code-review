# 01. Npm overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [npm/](../../npm/), [Bin overview](../bin/01-bin-overview.md), [Installation guide](../user-guide/02-installation.md)

## Context

Users install OpenCodeReview with `npm install -g @alibaba-group/open-code-review`,
but the product is a native Go binary. The npm distribution must deliver the
right binary for each OS/architecture without bloating installs.

## Decision

Maintain six optional platform packages under [`npm/`](../../npm/) — one
directory per supported target:

| Directory | Platform |
|-----------|----------|
| [`darwin-arm64/`](../../npm/darwin-arm64/) | macOS Apple Silicon |
| [`darwin-x64/`](../../npm/darwin-x64/) | macOS Intel |
| [`linux-arm64/`](../../npm/linux-arm64/) | Linux ARM64 |
| [`linux-x64/`](../../npm/linux-x64/) | Linux x86-64 |
| [`win32-arm64/`](../../npm/win32-arm64/) | Windows ARM64 |
| [`win32-x64/`](../../npm/win32-x64/) | Windows x86-64 |

Each directory holds its own `package.json` declaring `os`/`cpu` fields and
ships the pre-built `opencodereview` binary (named `opencodereview.exe` on
Windows — see `BINARY_FILENAME` in
[`scripts/platform.js`](../../scripts/platform.js)).

Install flow:

1. npm resolves the optional dependency matching the user's platform.
2. The wrapper [`bin/ocr.js`](../../bin/ocr.js) calls
   `resolveNativeBinary()` from `scripts/platform.js` to locate it.
3. If resolution fails, the wrapper prints a recovery hint pointing at
   `npm install -g`.

Release automation lives in
[`scripts/publish/`](../../scripts/publish/) and publishes every platform
package together with checksums (`make build-all` → `make sha256sum`).

## Consequences

- **Easier:** single well-known install command; no runtime compilation;
  downloads limited to one platform binary per user.
- **Harder:** six packages must be version-bumped and published in lockstep.
- **Given up:** a single fat universal package (~6× download size).
- **Migration:** adding a platform means one new directory, a
  `PLATFORM_PKG` entry in `scripts/platform.js`, and a publish job.

## Alternatives considered

- **Download binary at postinstall time from GitHub Releases:** rejected as
  primary path because corporate networks and offline installs break;
  bundling keeps installs hermetic.
- **Single universal npm package:** rejected due to download size for every
  user regardless of platform.
