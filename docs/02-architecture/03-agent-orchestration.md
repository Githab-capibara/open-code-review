# 03. Agent Orchestration

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/agent` and `internal/llmloop` — the per-subtask agent loop

## Overview

Agent orchestration has two layers: the **dispatcher** (`internal/agent`)
decides *what* gets reviewed and launches subtasks; the **loop**
(`internal/llmloop`) runs one subtask's tool-use conversation with the
LLM. The loop is shared by `ocr review` (diff units) and `ocr scan`
(full-file batches).

## Dispatcher (`internal/agent/agent.go`)

`Agent.Run()` orchestrates one review:

1. Build prompts from the task template
   (`internal/config/template`) — MAIN_TASK, PLAN_TASK, GROUPING_TASK,
   MEMORY_COMPRESSION_TASK, RE_LOCATION_TASK, REVIEW_FILTER_TASK.
2. Resolve review rules per bundle ([rules engine](08-rules-engine.md)).
3. Dispatch bundles concurrently through a bounded worker pool
   (`--concurrency`, default 8) with a per-task timeout
   (`--timeout`, minutes, default 15).
4. Collect results; run post-filter and reflection passes.
5. Seal the coverage manifest into the session.

Dispatch decisions that depend on runtime state (budget exhaustion,
provider failures) are *execution outcomes* — deliberately not part of
selection.

## The loop (`internal/llmloop/loop.go`)

`Runner.RunMainTask()` runs one subtask conversation:

```
send messages → LLM → tool calls? ── no → done / budget → emit comments
                     │
                     yes
                     ▼
        execute tools (internal/tool registry)
                     ▼
        append results, maybe compress memory → next round
```

- **Tool rounds** are capped (`--max-tools`, template default, min 50)
  and review rounds by the effort preset
  ([review engine](02-review-engine.md)).
- **Memory compression** (`compression.go`) keeps the conversation
  inside the prompt-token ceiling using a three-zone strategy: frozen
  head (system + task), compressible middle (older rounds summarized by
  MEMORY_COMPRESSION_TASK), preserved tail (recent rounds verbatim).
- **Argument repair** (`tool_args_json.go`) fixes malformed JSON the
  model emits in tool calls before it can crash the round.
- **Failure streaks** (`tool_failure_streak.go`) abort a runaway loop
  when the same tool fails repeatedly.
- **Budget accounting** tracks prompt+completion tokens against the
  per-group ceiling (`--max-tokens`) and the run-wide cap
  (`--max-tokens-budget`).

## Comment post-processing (`internal/llmloop/pool.go`)

`CommentWorkerPool` processes submitted comments off the critical path:
line-range resolution ([diff parser](07-diff-parser.md)), reflection
validation, and final categorization. Comments are only published after
the pool drains, so output ordering stays deterministic.

## Tools the loop can call

Six built-ins plus optional MCP-imported tools — see
[tool system](05-tool-system.md): `task_done`, `code_comment`,
`code_search`, `file_read`, `file_read_diff`, `file_find`.

## Failure model

Every per-bundle outcome lands in the coverage manifest
(`ocr.run-manifest/v1`, [sessions](06-session-management.md)):
completed, failed(reason), skipped(reason), or failed(budget). A
partial review publishes partial results — review never silently drops
a file.

## Related

- [Review engine](02-review-engine.md)
- [Tool system](05-tool-system.md)
- [LLM client](04-llm-client.md)
- [ADR 01](../03-adr/01-deterministic-agent-hybrid.md)
- [ADR 03](../03-adr/03-tool-use-over-generic-prompts.md)