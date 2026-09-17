# 04. LLM Client

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/llm` — the multi-protocol provider abstraction

## Overview

`internal/llm` hides provider differences behind one interface so the
review loop never knows which vendor it is talking to:

```go
type LLMClient interface {
    CompletionsWithCtx(ctx, request) (response, error)
}
```

Four wire protocols are implemented ([ADR
02](../03-adr/02-multi-protocol-llm-client.md)):

| Protocol constant | Wire API | Typical providers |
|-------------------|----------|-------------------|
| `anthropic` | Anthropic Messages API | Anthropic (direct) |
| `openai` | Chat Completions | OpenAI, DeepSeek, Qwen, GLM, Kimi, Moonshot, Groq, Together, local servers (vLLM, LM Studio, …) |
| `openai-responses` | Responses API | OpenAI models that require it |
| `anthropic-bedrock` | Anthropic via AWS SigV4 | Amazon Bedrock |

The registry of built-in providers (20+) lives in `providers.go`;
`ocr llm providers` prints the list, and the interactive TUI
(`ocr config provider`) walks a user through any of them.

## Endpoint resolution (`resolver.go`)

Configuration is resolved from multiple sources, in precedence order
(env wins over files):

1. Environment variables — `OCR_LLM_URL`, `OCR_LLM_TOKEN`,
   `OCR_LLM_MODEL`, `OCR_USE_ANTHROPIC`, `OCR_LLM_AUTH_HEADER`,
   `OCR_LLM_EXTRA_HEADERS`, `OCR_LLM_TIMEOUT`.
2. `ocr config set llm.*` values.
3. Provider-specific config — OS keyring, shell RC exports, Claude
   Code's own config (`ANTHROPIC_*`).
4. A **key command** (`llm.auth_token_cmd`) executed to fetch the key at
   run time — the key never has to be stored anywhere.

## Keys never touch disk

API keys are read from the environment or key command only, excluded
from every log line and telemetry event, and sent only to the single
configured endpoint over TLS 1.2+ with full verification
([assurance case](../07-security/01-security-assurance-case.md),
[trust boundary 2](../07-security/03-trust-boundaries.md)).

## Token counting

Prompt token ceilings need counts before a request goes out.
`internal/llm` embeds BPE data (`embedded_loader.go`, `bpe_data/`) for
tiktoken-style counting, used by selection's size gate and the loop's
compression trigger.

## Session keys & caching

`sessionkey.go` derives a stable per-run routing key so providers that
support prompt-cache affinity can hit their cache across a run's
requests — the largest single cost lever on multi-round reviews.

## Retry & resilience

- Bounded retries with provider-aware status handling
  (`retry_boundary.go`, `retry_metadata.go`, `retry_observer.go`); a
  retry report renders into the run output for transparency.
- Per-request timeout from `OCR_LLM_TIMEOUT` (default 300s).
- `extra_body` JSON injection lets providers receive vendor-specific
  fields (e.g. `reasoning_effort`, `thinking`) without OCR growing a
  flag per knob.

## Verifying a setup

```bash
ocr llm test        # sends the embedded test conversation
ocr llm providers   # lists built-in provider registry
```

## Related

- [Agent orchestration](03-agent-orchestration.md)
- [Configuration guide](../05-cli/05-config-command.md)
- [ADR 02](../03-adr/02-multi-protocol-llm-client.md)
- [Security policy scope note](../07-security/02-security-policy.md)