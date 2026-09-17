# 08. Rules Engine

- **Authors:** @Githab-capibara

- **Status:** Guide
- **Scope:** `internal/config/rules` — per-file review rule matching

## Overview

The rules engine decides *what review guidance* each file gets. Instead
of one mega-prompt telling the model "check everything everywhere"
(noise, cost, instability), OCR matches each file path to a focused,
language-specific rule document via glob patterns — deterministic
template-engine matching beats language-driven guidance on stability
and predictability.

## Data model

- **`system_rules.json`** (embedded) — an ordered map of doublestar
  glob patterns → rule document filenames, e.g. `**/*.go` → `go.md`,
  `.github/workflows/**/*.{yaml,yml}` → `github_workflows.md`,
  `**/*{mapper,dao}*.xml` → `mapper_dao_xml.md`. **First match wins**,
  and JSON key order is deliberately preserved during parsing.
- **`rule_docs/*.md`** (embedded, 60+ files) — the rule documents:
  concise, per-language checklists (Go, Java, Python, TS/JS, Rust,
  C/C++, Kotlin, Swift, PHP, Ruby, Terraform, Protobuf, GraphQL,
  Prisma, Bicep, Nix, Haskell, Nim, R, ...). A `default.md` covers
  everything unmatched.
- **`SystemRule`** — `{default_rule, path_rule_map}` loaded by
  `LoadDefault()`; the resolver interface is `Resolve(path) string`.

## Resolution layers

`NewResolver()` composes rule sources; later layers refine earlier
ones, with the embedded system set as the base:

1. **Built-in system rules** (embedded — the binary always has them).
2. **Project rules** — `<repo>/.opencodereview/rule.json` (see
   [the repo's own file](../../.opencodereview/rule.json) — a real
   working example).
3. **Custom rules** — `--rule <path>` for a one-off rules file.

A project rule can set `merge_system_rule: true` to **layer on top of**
the matched system rule instead of replacing it — the pattern this repo
uses for `internal/llm/providers.go` (style + doc-sync + test
requirements added on top of `go.md`).

## Content sniffing (`sniffer.go`)

Path globs cannot distinguish `.m` files (MATLAB vs Objective-C). The
sniffer inspects content for the ambiguous extension and resolves to
the right rule doc — deterministic matching stays accurate even when
paths are ambiguous.

## How rules reach the model

For every review bundle the resolved rule text is injected into the
task prompt alongside the diff, so the model's attention is focused on
the handful of checks that matter for *this* file. In
[delegate mode](../05-cli/03-delegate-command.md), `ocr delegate rule
<path...>` prints the same resolution — grouped, deduplicated rule text
— for a host coding agent to consume directly
([delegate mode ADR](../03-adr/07-delegate-mode-architecture.md)).

## Debugging rule resolution

```bash
ocr rules check src/foo.go          # show which rule doc matches and why
ocr delegate rule src/foo.go        # raw resolved rule text
```

## Writing rules

- Keep a rule doc short: checklists, not essays — every token competes
  with the diff.
- One rule doc per language/tech; name the file after the technology.
- Prefer `merge_system_rule: true` in project rules so generic guidance
  is not silently dropped.

## Related

- [Review engine](02-review-engine.md)
- [Agent orchestration](03-agent-orchestration.md)
- [Delegate command](../05-cli/03-delegate-command.md)
- [GitHub Action rule fingerprinting](../06-integrations/01-github-actions.md)