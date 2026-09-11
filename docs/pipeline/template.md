# NN. Pipeline Title in Present-Tense Imperative

**Status:** Active | Proposed | Deprecated | Superseded by [NN](NN-other-pipeline.md)
**Last Updated:** YYYY-MM-DD
**Maintainer:** @GitHub-handle

## Purpose

What this pipeline does. One to three short paragraphs. Link to related
documents rather than restating background already covered elsewhere.

## Scope

- What inputs the pipeline accepts
- What outputs the pipeline produces
- What the pipeline does **not** cover

## Configuration

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `name` | string | — | Pipeline name |
| `enabled` | bool | `true` | Whether the pipeline runs by default |

## Usage

```bash
# Example invocation
ocr pipeline run <name> --config <path>
```

## Triggers

| Event | Description |
|-------|-------------|
| `push` | Runs on every push to matched branches |
| `pull_request` | Runs when a PR is opened or updated |
| `schedule` | Runs on a cron schedule |

## Steps

Describe the sequential or parallel steps in the pipeline. For each step:

1. **Step name** — What it does
   - Input: what data it receives
   - Action: what it does
   - Output: what it produces

## Error Handling

How the pipeline handles failures:

- Retry policies
- Fallback behavior
- Alerting mechanisms

## See Also

- [Pipeline Overview](01-pipeline-overview.md)
- [Related Pipeline](NN-other-pipeline.md)
