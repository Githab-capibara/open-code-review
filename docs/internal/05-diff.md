# Diff Package

The `internal/diff` package resolves what code to review: it turns CLI inputs (workspace, commit range, single commit) into a concrete set of file diffs and a resolved git remote.

## Overview

`internal/diff` is the input-resolution layer. It:

- Decides which files are in scope for a review/scan run.
- Generates per-file diffs via git.
- Applies `.gitignore` and exclusion matching so ignored/irrelevant files never reach the model.
- Computes a canonical remote URL for telemetry/attribution.

## Provider

`Provider` is the central type holding resolved inputs. Constructors:

- `NewProvider(...)` — general provider from resolved inputs.
- `NewCommitProvider(...)` — diff for a single commit / commit range.
- `NewWorkspaceProvider(...)` — diff for working-tree changes (staged, unstaged, untracked).

## Input Resolution

- `InputResolution` — the resolved set of files + diffs produced by a provider.
- `matchGitignore*` — internal helpers matching paths against `.gitignore` and the built-in exclusion list.
- `canonicalRemote` — resolves the canonical remote URL (used for session attribution).

## Mode

A `Mode` value distinguishes workspace vs. commit vs. range reviews. (The exact constants live in `diff.go`; consumers switch on `Mode` to pick a generator.)

## Gitignore Interaction

Files excluded by `.gitignore` (or the allowlist in `internal/config/allowlist`) are dropped during `InputResolution` so the agent only ever sees reviewable source.

## Dependencies / Related

- `internal/config/allowlist` — `IsAllowedExt` / `IsExcludedPath` gate which files enter resolution.
- `internal/tool` — `NewFileReadDiff(DiffMap)` reads the resolved diffs for the agent.
- `internal/session` — stores the resolved inputs for resume.

## Links

- [Tool Package](03-tool.md)
- [Config Package](04-config.md)
- [Session Package](07-session.md)
