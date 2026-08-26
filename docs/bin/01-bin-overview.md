# 01. Bin entry points

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [bin/](../../bin/), [Npm overview](../npm/01-npm-overview.md), [Scripts overview](../scripts/01-scripts-overview.md)

## Context

The npm package declares a `bin` entry so that `ocr` lands on `PATH` after
`npm install -g`, but the actual review engine is a native Go binary. A
thin Node wrapper must bridge npm's world and the binary's world.

## Decision

Maintain exactly one executable entry point at
[`bin/ocr.js`](../../bin/ocr.js) — a Node.js launcher that:

1. Calls `resolveNativeBinary()` from
   [`scripts/platform.js`](../../scripts/platform.js) to locate the
   platform-specific `opencodereview` binary delivered by the matching
   package under [`npm/`](../../npm/).
2. Exits with a recovery hint (`Run: npm install -g @alibaba-group/open-code-review`)
   when no binary is found.
3. Surfaces update availability: reads
   `~/.opencodereview/update-available`, prints a yellow upgrade banner via
   [`scripts/version.js`](../../scripts/version.js), or clears the stale
   hint file.
4. Honors `OCR_NO_UPDATE=1` to skip the background update check.
5. Spawns the native binary with all passed-through arguments and forwards
   its exit code.

## Consequences

- **Easier:** users get one global `ocr` command regardless of platform;
  update notifications require no code inside the Go binary.
- **Harder:** the wrapper is on the critical path of every invocation, so it
  must stay dependency-light and fast.
- **Given up:** pure-binary distribution without Node — npm remains the
  primary channel.
- **Migration:** any new startup behavior belongs in this file first, then
  mirrors into release scripts if needed.

## Alternatives considered

- **Shell wrapper only:** rejected because Windows has no reliable POSIX
  shell story; Node is already guaranteed by npm.
- **Native symlink to the Go binary:** rejected because optional-dependency
  layout differs per platform and symlinks break on Windows.
