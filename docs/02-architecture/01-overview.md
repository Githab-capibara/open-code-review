# 01. Architecture Overview

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** the whole system

## System in one paragraph

OpenCodeReview (OCR) is a Go CLI. It reads Git diffs, decides
deterministically which files to review and how to group them into
review units, then runs each unit through an LLM tool-use loop that can
read files, search code, and fetch other diffs. The tool loop's output
is post-processed (line-number resolution, re-location, reflection
filtering) into structured review comments. Every run is persisted as a
JSONL session that can be listed, replayed in a web viewer, compared,
and resumed.

## The core idea

**Deterministic engineering x agent hybrid.** For every step that must
not go wrong, deterministic Go code — not the LLM — guarantees
correctness:

| Step | Owner | Why |
|------|-------|-----|
| File selection | deterministic (`internal/agent/selection.go`) | coverage guarantee: no important change is silently skipped |
| File grouping | hybrid (LLM semantic grouping, deterministic fallback) | context locality without dropping files |
| Rule matching | deterministic (glob + content sniffer) | predictable rule application, prompt noise cut |
| Tool loop | agent (`internal/llmloop`) | dynamic context gathering where flexibility pays |
| Comment positioning | deterministic + LLM fallback (`internal/diff/resolver.go`) | line accuracy: `ExistingCode` matched against hunks first, LLM re-location only on miss |
| Comment reflection | LLM, bounded by schema | content quality with hard validation |

Full rationale: [ADR 01](../03-adr/01-deterministic-agent-hybrid.md).

## Component map

```
CLI (cmd/opencodereview, cobra)
  ├─ review ──▶ internal/agent ──▶ internal/llmloop ──▶ internal/llm ──▶ provider
  │                 │                    │
  │                 │                    └─▶ internal/tool (6 built-in tools + MCP)
  │                 ├─▶ internal/diff (parse, resolve lines, relocate)
  │                 ├─▶ internal/config/rules (rule matching)
  │                 └─▶ internal/config/template (prompts, effort)
  ├─ scan ────▶ internal/scan (reuses llmloop, tool, llm)
  ├─ delegate ▶ internal/delegate (rule resolution + task packaging only)
  ├─ session ─▶ internal/session (list/show/comments/compare)
  ├─ config ──▶ internal/config (env, files, keyring, key commands)
  ├─ viewer ──▶ internal/viewer (read-only web UI over sessions)
  └─ llm ─────▶ internal/llm (test, providers)
        everything writes into internal/session
        internal/telemetry observes every layer
```

## Review pipeline (happy path)

1. **Load diffs** — `internal/diff` fetches and parses unified diffs
   (workspace, range, or commit mode) via `internal/gitcmd`.
2. **Select files** — deterministic allowlist/exclude/binary/size
   filtering ([review engine](02-review-engine.md)).
3. **Group files** — related files bundled into review units
   ([agent orchestration](03-agent-orchestration.md)).
4. **Resolve rules** — per-file review rules matched by glob + content
   sniffing ([rules engine](08-rules-engine.md)).
5. **Run the loop** — per-unit agent conversation with the built-in
   toolset over [multi-protocol LLM clients](04-llm-client.md)
   ([tool system](05-tool-system.md)).
6. **Resolve comment lines** — deterministic match of `ExistingCode`
   against hunks; LLM re-location on miss ([diff parser](07-diff-parser.md)).
7. **Post-filter** — bounded review-filter pass trims weak comments
   (skippable with `--no-filter`).
8. **Emit** — text/JSON/SARIF; session JSONL written throughout
   ([session management](06-session-management.md)).

## Cross-cutting concerns

- **Concurrency:** semaphore-bounded git subprocesses
  (`--max-git-procs`, default 16); bounded subtask fan-out
  (`--concurrency`, default 8); async comment post-processing pool.
- **Budgets:** per-group prompt-token ceiling (`--max-tokens`) and whole-
  run cap (`--max-tokens-budget`) stop dispatch early and report skipped
  items as `failed(budget)`.
- **Observability:** [OpenTelemetry](../05-cli/05-config-command.md)
  traces + metrics; structured session records double as an audit trail.
- **Security:** every boundary enforced in code — see the
  [trust boundaries](../07-security/03-trust-boundaries.md) and
  [assurance case](../07-security/01-security-assurance-case.md).

## Related

- [Review engine](02-review-engine.md)
- [Agent orchestration](03-agent-orchestration.md)
- [LLM client](04-llm-client.md)
- [Tool system](05-tool-system.md)
- [Session management](06-session-management.md)
- [Diff parser](07-diff-parser.md)
- [Rules engine](08-rules-engine.md)
- [ADR index](../03-adr/)