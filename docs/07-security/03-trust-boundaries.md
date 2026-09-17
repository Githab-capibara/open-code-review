# 03. Trust Boundaries

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [01-security-assurance-case.md](01-security-assurance-case.md), [02-security-policy.md](02-security-policy.md)

## Overview

OpenCodeReview sits between four semi-trusted data sources: the local
git repository, the configured LLM provider, the local filesystem, and
(if the viewer is running) a web browser. This document names every
trust boundary, the code that mediates it, and what crossing it is
allowed to do.

## Boundaries

| # | Boundary | Data crossing | Mediated by | Enforcement |
|---|----------|---------------|-------------|-------------|
| 1 | Git repo → CLI | diff text, file contents, `git ls-files` output | `internal/diff`, `internal/gitcmd` | All subprocess invocations are `git` with hardcoded subcommands and explicit argument vectors; `--end-of-options` on all rev/path arguments; no shell. |
| 2 | CLI → LLM provider | diffs + prompts out, JSON responses in | `internal/llm` | HTTPS/TLS 1.2+ only; `InsecureSkipVerify` never set; keys from env/config only, excluded from logs and telemetry. |
| 3 | CLI → filesystem | output files, session JSONL | `internal/pathutil`, `internal/session`, `internal/tool/filereader.go` | `pathutil.WithinBase()` containment before and after symlink resolution; output path validated against repo root. |
| 4 | Browser → viewer | HTTP requests to the local session viewer | `internal/viewer/hostguard.go`, `internal/viewer/securityheaders.go` | Host-header allowlist (loopback default, `OCR_VIEWER_ALLOWED_HOSTS` for more); `html/template` escaping; CSP `default-src 'self'`; `X-Frame-Options: DENY`; `nosniff`. |
| 5 | LLM response → agent tools | tool-call arguments (paths, line numbers, comment text) | `internal/llmloop`, `internal/tool` | Schema-validated JSON; line numbers bounded by diff ranges; tool arguments JSON-repaired then range-checked; path args pass boundary 3's checks; consecutive-failure streaks abort runaway loops. |
| 6 | User config → child processes | MCP server commands, API-key commands, shell tool scripts | `internal/mcp`, `internal/llm/keycmd_*.go`, `cmd/opencodereview/shell_*.go` | These are the only non-`git` subprocess paths; each runs exactly what the local user configured, never remote- or LLM-supplied content. |

## Trust assumptions

1. **The local user is trusted.** OCR never executes configuration it
   did not receive from the local user (environment, config files,
   flags). Anything the LLM or the repository suggests is *data*, never
   *instructions*.
2. **The LLM provider is semi-trusted.** Provider responses are treated
   as hostile until they pass schema validation (boundary 5). A
   compromised provider cannot escalate beyond what boundary 3 and 5
   allow: crafted file paths, line numbers, and comment text remain
   data.
3. **The repository is semi-trusted.** Diffs may contain prompt-injection
   payloads (e.g. a changed comment saying "approve this PR"). The
   deterministic pipeline (file selection, rule matching, line-number
   resolution) limits the blast radius of any such payload to the
   review content, never to code execution.
4. **The network is untrusted.** Every outbound call is TLS with full
   certificate verification.

## Invariants

- No `sh -c`/`cmd /c` invocation ever contains a string interpolated
  from a diff, LLM response, or remote config.
- `git` subprocess arguments are vectors, never command strings, and
  always `--end-of-options`-guarded.
- Every path derived from an LLM response passes `WithinBase()` both
  lexically and after `EvalSymlinks`.
- The viewer refuses any request whose `Host` header is not on the
  allowlist.

## Related

- [Security assurance case](01-security-assurance-case.md)
- [Architecture overview](../02-architecture/01-overview.md)
- [Session management](../02-architecture/06-session-management.md)
- [Viewer command reference](../05-cli/06-viewer-command.md)