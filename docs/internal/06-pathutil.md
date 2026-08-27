# 06. Path Utility Package

The `internal/pathutil` package provides safe, repository-scoped path handling used across file-reading tools and session storage.

Package doc: *"provides path utilities for repository-scoped, symlink-safe resolution."*

## Functions

```go
func CanonicalPath(path string) (string, error)
func WithinBase(base, target string) bool
```

- `CanonicalPath(path string) (string, error)` — resolves `path` to an absolute, symlink-free canonical path. Errors on paths that cannot be resolved (non-existent targets return an error only when resolution is required; relative paths are anchored to the process CWD).
- `WithinBase(base, target string) bool` — returns true when the canonical `target` is located inside `base`. This is the core guard against path-traversal: it canonicalizes both sides (resolving symlinks) before comparing, so a symlink pointing outside the repo base is correctly rejected.

## Why it matters

`WithinBase` is what makes `file_read` / `file_find` / `code_search` safe: a tool argument like `../../etc/passwd` or a symlink to `.secrets/` is rejected because the canonical target falls outside the repository base. Resolution happens *before* comparison, which defeats symlink-escape attempts.

## Tests (behavior contract)

The package tests pin the security semantics:

- `TestWithinBase_AdditionalCases` — confirms traversal and symlink-escape are rejected.
- `TestCanonicalPathResolvesSymlink` / `TestCanonicalPath_NestedSymlink` — confirms symlinks are expanded, including nested ones.
- `TestCanonicalPath_NonExistentPath` / `TestCanonicalPath_RelativePath` — confirms relative and missing paths resolve under defined rules.

## Dependencies / Related

- `internal/tool` — calls `WithinBase` / `CanonicalPath` from the `FileReader` and search providers.
- `internal/session` — uses canonical paths for session storage layout.

## Links

- [Tool Package](03-tool.md)
- [Security Policy](../security/01-security-policy.md)
