# 15. Release Package

The `internal/release` package holds release/version metadata and the consistency checks that keep the published release assets in sync with the build pipeline.

## Purpose

OCR publishes versioned binaries and checksums. `internal/release` pins the expected asset URL/naming patterns and validates that the release manifest (`.github/workflows/release.yml`), the `Makefile` build targets, and the generated checksum filenames all conform to the same pattern. This prevents a release from shipping assets whose names/URLs drift from what the install scripts and docs expect.

## What it checks (test-covered)

- `TestURLPatternNoVersionInFilename` / `TestURLPatternFormat` / `TestURLPatternHTTPS` — the canonical asset URL pattern (HTTPS, no version embedded in the filename).
- `TestReleaseYmlMatchesURLPattern` — `release.yml` produces URLs matching the pattern.
- `TestMakefileBuildMatchesURLPattern` — `Makefile` build outputs match the pattern.
- `TestChecksumFilenameNoVersion` — checksum filenames omit the version.

## Internal helpers

The package uses unexported helpers (e.g. deriving a release filename from a URL pattern) and config structs (`ocrConfig`, `packageJSON`) to mirror the published artifact manifest. These are internal to the release-consistency checks and are not part of OCR's runtime API.

## Note for auditors

This package is about release reproducibility, not review logic. It has no runtime dependency on the agent/LLM path; it exists to keep CI release artifacts consistent.

## Links

- [CI/CD Integration](../ci-cd/README.md)
