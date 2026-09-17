# 02. Abstract providers behind a multi-protocol LLM client

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [LLM client](../02-architecture/04-llm-client.md), [configuration](../05-cli/05-config-command.md)

## Context

Users run OCR against very different backends: the Anthropic Messages
API, OpenAI Chat Completions, the OpenAI Responses API, Amazon Bedrock
(Anthropic models via SigV4), and roughly 20 additional providers that
expose some dialect of the OpenAI-compatible API (DeepSeek, Qwen, GLM,
Kimi, Azure, Gemini, local vLLM/LM Studio servers, ...). The review
loop is long-running, concurrent, and budget-sensitive, so vendor
quirks leaking into `internal/llmloop` would multiply every retry,
streaming, and token-counting concern by the number of providers.

## Decision

We define one `LLMClient` interface with a single method
(`CompletionsWithCtx`) and provide four protocol implementations
(`anthropic`, `openai`, `openai-responses`, `anthropic-bedrock`) plus a
provider registry that maps provider presets (base URL, protocol, auth
header defaults) onto them. Vendor-specific request fields travel in a
generic `extra_body` JSON blob rather than per-vendor flags, and
endpoint resolution merges config keys, environment variables, OS
keyrings, shell RC exports, and key commands behind one resolver.

## Consequences

- **Easier:** adding a provider is a registry entry, not a code change;
  the loop sees one interface; `extra_body` reaches new vendor knobs
  without releasing a CLI flag for each.
- **Harder:** `extra_body` pushes some validation to runtime; protocol
  differences (e.g. Anthropic rejecting unknown fields) must be checked
  at call sites like the GitHub Action.
- **Given up:** per-provider typed option structs; provider-specific
  features are exposed only when they are universal (e.g. thinking
  toggles) or ride `extra_body`.
- **Migration:** none for users; older `llm.*` config keys keep working
  through the resolver.

## Alternatives considered

- **Require OpenAI-compatible endpoints only:** rejected — Anthropic and
  Bedrock are first-class users of this tool; a shim server would add a
  runtime dependency.
- **One typed option struct per provider:** rejected because the option
  surface changes monthly per vendor and would pin releases to vendor
  roadmaps.