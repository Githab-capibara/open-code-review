# 05. Config Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr config`
- **Audience:** users, operators

## Overview

Persists settings to `~/.opencodereview/config.json` and offers
interactive setup TUIs. Four sub-commands:

| Sub-command | Purpose |
|-------------|---------|
| `ocr config set <key> <value>` | Write a single value non-interactively |
| `ocr config unset <key>` | Clear a saved key |
| `ocr config provider` | Interactive provider-setup TUI |
| `ocr config model` | Interactive model-selection TUI |

## set / unset

```bash
ocr config set provider anthropic
ocr config set model claude-opus-4-6
ocr config set providers.anthropic.api_key sk-ant-...
ocr config set custom_providers.my-gateway.url https://gateway.internal/v1
ocr config set custom_providers.my-gateway.protocol openai
ocr config set effort high
ocr config unset effort                    # back to default medium
ocr config unset custom_providers.my-gateway
```

Key families (full schema and examples live in the website
configuration reference, `pages/src/content/docs/en/configuration.md`):

| Key family | What it holds |
|------------|---------------|
| `provider`, `model` | Active provider name and model |
| `providers.<name>.*` | Built-in provider entries (`api_key`, `url`, `api_key_cmd`, …) |
| `custom_providers.<name>.*` | Custom endpoints (`url`, `protocol`, `model`, `api_key`, `retry_codes`, …) |
| `mcp_servers.<name>.*` | MCP server definitions |
| `llm.*` | Protocol-level options (`llm.protocol`, `llm.retry_codes`, …) |
| `max_tokens`, `effort` | Global review defaults; `unset` restores defaults |

`unset` supports `provider`, `max_tokens`, `effort`,
`custom_providers.<name>`, and `mcp_servers.<name>`. Deleting the
active provider also clears `provider`/`model` (re-pick with
`ocr config provider`). `effort` accepts `low` / `medium` / `high`.

## Environment overrides

Resolution order for a run: explicit `--provider` → saved config →
complete `OCR_LLM_*` environment → complete Claude Code environment →
shell rc files. Incomplete strategies fall through without being mixed.
`OCR_LLM_TIMEOUT` (seconds) overrides the request timeout everywhere.

## Examples

```bash
ocr config provider            # pick a provider interactively
ocr config model               # pick a model interactively
ocr config set providers.litellm.url https://gateway.internal:8000/v1
ocr llm test                   # verify what config resolved
```

## Related

- [LLM client architecture](../02-architecture/04-llm-client.md)
- [LLM command](07-llm-command.md) — connectivity test + provider list
- Website: `pages/src/content/docs/en/configuration.md`