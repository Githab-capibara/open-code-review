# 02. LLM Package

The `internal/llm` package provides LLM client interfaces supporting multiple protocols, endpoint resolution, token counting, retry reporting, and session-key expansion.

## Overview

`internal/llm` is the abstraction layer between the review engine and the model endpoint. It:

- Defines the `LLMClient` interface and concrete clients for OpenAI (`chat/completions`) and Anthropic (`messages`) protocols, plus an OpenAI Responses protocol client.
- Resolves a `ResolvedEndpoint` from config files, environment variables, Claude Code env, or shell RC.
- Counts tokens (BPE via an embedded loader) for budget enforcement.
- Reports retry attempts and classifies stream/boundary errors for observability.

Package doc: *"provides LLM client interfaces supporting multiple protocols."*

## Clients

| Type | Created via | Protocol |
|------|-------------|----------|
| `LLMClient` (interface) | `NewLLMClient(ep ResolvedEndpoint, collector *RetryCollector) LLMClient` | dispatches to a concrete client |
| `OpenAIClient` | `NewOpenAIClient(cfg ClientConfig) *OpenAIClient` | OpenAI `chat/completions` |
| `AnthropicClient` | `NewAnthropicClient(cfg ClientConfig) *AnthropicClient` | Anthropic `messages` |
| `OpenAIResponsesClient` | `NewOpenAIResponsesClient(cfg ClientConfig) *OpenAIResponsesClient` | OpenAI Responses API |

`ClientConfig` carries URL, auth header, model, extra headers/body, timeout, and retry codes. `ChatRequest` is the OpenAI request shape.

## Messages and Tools

- `Message`, `ContentBlock` — conversation message types.
- Constructors: `NewTextMessage(role, content string)`, `NewToolCallMessage(content string, toolCalls []ToolCall)`, `NewToolResultMessage(toolCallID, result string)`.
- Response types: `ChatResponse`, `Choice`, `ResponseMessage`, `ToolCall`, `FunctionCall`.
- Tool definitions: `ToolDef`, `FunctionDef`; `buildToolInputSchema(params map[string]any)` builds the Anthropic schema.

## Endpoint Resolution

- `ResolveEndpoint(configPath string) (ResolvedEndpoint, error)`
- `ResolveEndpointWithModelOverride(configPath, modelOverride string) (ResolvedEndpoint, error)`
- `ResolveEndpointWithOptions(configPath string, opts ResolveOptions) (ResolvedEndpoint, error)`
- `ResolvedEndpoint` is the normalized target; `ResolveOptions` allows explicit provider/model overrides.
- `Provider` presets via `LookupProvider(name string) (Provider, bool)` and `ListProviders() []Provider`.
- Protocol helpers: `NormalizeProtocol(raw string) string`, `ValidateProtocol(p string) error`.

## Token Counting

- `CountTokens(text string) int` and `CountTokensForModel(text string, modelName string) int` — BPE-based.
- `encodingForModel(modelName string) string` maps a model to its encoding.
- `InitEmbeddedLoader()` (embedded_loader.go) loads the embedded BPE vocabulary; `parseBpeData` parses it.

## Retry and Error Reporting

- `RetryCollector` / `NewRetryCollector()` aggregates attempts into a `RetryReport` (`ErrorClass`, `FailurePhase`, `Outcome`, `AttemptRecord`, `RequestReport`).
- `retryCodesMiddleware(codes []int)` injects configurable retry status codes.
- `classifyBoundaryError` / `classifyStreamError` classify failures; `reviseAttempt` / `finalizeRequest` finalize a request's retry decision.
- `RequestMeta` (`WithRequestMeta` / `RequestMetaFromContext`) tags requests for correlation.

## Session Keys

- `NewSessionKey() string` generates a key; `ContextWithSessionKey` / `SessionKeyFromContext` thread it through a context.
- `SessionTaskKey(sessionKey, taskType, scope string) string` builds a task-scoped key.
- `expandSessionKeyInHeaders` / `expandSessionKeyInBody` substitute a `{{SESSION_KEY}}`-style placeholder in outgoing requests (used for prompt-cache keys).

## Usage Resolution

- `UsageInfo` and `resolveUsage(raw []byte)` extract token usage (including cached token fields) from provider responses.

## Dependencies / Related

- `internal/agent` consumes `LLMClient` via `NewLLMClient`.
- `internal/config` supplies endpoint config paths consumed by `ResolveEndpoint`.

## Notes for Auditors

- The client interface intentionally hides concrete transport behind `LLMClient`; new protocols are added by implementing that interface and branching in `NewLLMClient`.
- Retry semantics live in `retry_boundary.go` + `retry_observer.go`; the `RetryCollector` is the single source of truth for retry reporting (see `retry_report.go` validation).
- `stripThinkTags(s string)` strips `<think:6124c78e>...</think:6124c78e>` reasoning wrappers from responses.

## Links

- [Agent Package](01-agent.md)
- [LLM Loop Package](13-llmloop.md)
- [Tools Config](../internal/04-config.md)
