# 05. Tool System

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/tool` — the toolset the review agent can invoke

## Overview

The review agent does not free-form its way through the repository; it
calls a small, purpose-built toolset. The toolset was distilled from
analysis of tool-call traces at production scale — call-frequency
distributions, per-tool repetition rates, and the impact of adding a
tool on the whole call chain — because a generic agent toolkit is
*less* predictable for code review than a tailored one ([ADR
03](../03-adr/03-tool-use-over-generic-prompts.md)).

## The six built-in tools

Defined in `internal/config/toolsconfig/tools.json`, implemented in
`internal/tool/`:

| Tool | Available in | Purpose |
|------|--------------|---------|
| `task_done` | main task | terminate the subtask: `DONE` or `FAILED` |
| `code_comment` | main task | report an issue; the *only* way to emit review feedback |
| `code_search` | plan + main task | exact or regex text search across files (`git grep`) |
| `file_read` | main task | read a file's (modified-version) content, max 500 lines/request |
| `file_read_diff` | plan + main task | inspect the diff of *other* changed files for cross-file confirming |
| `file_find` | plan + main task | locate files by name/path keyword (`git ls-files`) |

### `code_comment` is the contract

Each comment carries: `content`, `existing_code` (a verbatim snippet of
added lines used for line anchoring — see [diff
parser](07-diff-parser.md)), optional `suggestion_code`, and **required**
`category` (`bug|security|performance|maintainability|test|style|documentation|other`)
and `severity` (`critical|high|medium|low`) plus `path`. Enum validation
happens in `code_comment.go`; comments that fail validation never
reach output.

## Registry & providers (`definitions.go`)

`Registry` maps tool name → `Provider` (each implementation embeds
`*tool.BaseTool`). The registry supports registration, freezing
(once dispatch starts the tool set is immutable), lookup, and a
`DynamicProvider` stub for tools imported from MCP
([MCP server](../06-integrations/05-mcp-server.md)).

## Security of file-touching tools

- `file_read` and any tool accepting a path run through
  `internal/tool/filereader.go`, which validates with
  `pathutil.WithinBase()` before **and after** symlink resolution, and
  reads according to the run's mode (workspace / commit / range) so the
  agent sees exactly the version the diff refers to.
- `code_search` and `file_find` execute `git grep` / `git ls-files` as
  argument vectors with `--end-of-options` — never through a shell.

Details: [trust boundary 3](../07-security/03-trust-boundaries.md).

## Failure handling

- Malformed tool-argument JSON is repaired heuristically before round
  execution (`comment_args_repair.go`, `internal/llmloop/tool_args_json.go`).
- Repeated failures of the same tool trip the failure-streak breaker and
  abort the runaway loop rather than burning the whole budget
  ([agent orchestration](03-agent-orchestration.md)).

## Related

- [Agent orchestration](03-agent-orchestration.md)
- [MCP integration](../06-integrations/05-mcp-server.md)
- [ADR 03](../03-adr/03-tool-use-over-generic-prompts.md)
- [Trust boundaries](../07-security/03-trust-boundaries.md)