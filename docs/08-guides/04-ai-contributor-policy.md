# 04. AI Contributor Policy (Zero AI-Slop)

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Audience:** contributors, AI agents operating in this repo
- **Related:** [contributing](01-contributing.md),
  [ADR-06](../03-adr/06-zero-ai-slop-policy.md),
  [security policy](../07-security/02-security-policy.md),
  [agent operating principles](../13-agents-config/01-agent-operating-principles.md)

## Context

OCR is an AI tool, and we welcome AI-assisted contributions. What we do
not accept is unreviewed model output — redundant comments,
plausible-but-wrong code, `AI generated -> fixed -> fixed` churn —
going into a commit. There is one quality bar (100%) no matter who or
what typed the change. This policy is the operational form of
[ADR-06](../03-adr/06-zero-ai-slop-policy.md).

## The rules

If AI/LLM played any part in your work:

1. **Disclose it** in the initial issue or PR — that you used
   AI/LLM, and which tools/models.
2. **Understand every line** the AI wrote; know what it did.
3. **Answer reviewers yourself.** The substance of your answers to
   maintainer questions must come from your own understanding; AI may
   translate or polish wording, never generate the answer for you.
4. **No repeated fix-cycles.** A history like
   `AI generated -> fixed -> fixed -> fixed` signals you let the model
   patch itself instead of reading its output.
5. **Self-review first.** Review all AI-generated code and text
   yourself before requesting a review from anyone.
6. **No AI attribution.** No "Assisted-by" / "Co-developed-by" or
   similar trailers — the submitter owns the code fully.
7. **Keep commit messages short.** Important context belongs in the PR
   description, not collapsed commit bodies.
8. If you cannot meet all of the above, **close the issue or PR**.

## What CI enforces mechanically

| Check | Where |
|-------|-------|
| English-only source/strings | `make english-check` (exceptions need `// allow-non-english:`) |
| SPDX license headers on every file | `make license-check` |
| Vulnerability scan | `govulncheck ./...` in CI |
| `go vet`, `gofmt -s`, race tests, ≥90% coverage | `make check` / `make test` / `make coverage` |

The mechanical subset catches structural slop; judgment-level slop is
the submitter's responsibility per the rules above.

## For agents operating in this repo

The repo's own `AGENTS.md` (mirrored in
[13-agents-config](../13-agents-config/01-agent-operating-principles.md))
binds automated maintainers to the same bar: recon before action,
update docs and tests with every change, verify nothing broke.

## Related

- [Security policy AI clause](../07-security/02-security-policy.md)
- [Governance](../09-governance/01-governance.md)