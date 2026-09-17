# 07. LLM Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr llm`
- **Audience:** users, operators

## Overview

LLM utility commands — diagnostics for the endpoint resolution that
`ocr review`/`ocr scan` use internally. Two sub-commands: `test` and
`providers`.

## `ocr llm test`

```bash
ocr llm test
```

Resolves the endpoint exactly the way `ocr review` does (config →
`OCR_LLM_*` → Claude Code env → shell rc), sends one small canned chat
request, and prints which source won, the URL, the model, the model's
reply, and a success marker. Non-zero exit means the endpoint is not
fully configured or the request failed (network/auth/model error); the
message says which.

## `ocr llm providers`

```bash
ocr llm providers
```

Prints a `NAME / PROTOCOL / BASE URL` table of every built-in provider,
followed by a hint to configure one via `ocr config provider` or
`ocr config set provider <name>`.

## Examples

```bash
ocr llm providers                       # what can I pick?
ocr config set provider anthropic       # pick one
ocr llm test                            # prove it works before reviewing
```

## Related

- [Config command](05-config-command.md)
- [LLM client architecture](../02-architecture/04-llm-client.md)
- Website: `pages/src/content/docs/en/configuration.md`