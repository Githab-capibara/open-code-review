# 06. Enforce a zero-AI-slop quality bar on contributions

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [contributing](../08-guides/01-contributing.md), [AI contributor policy](../08-guides/04-ai-contributor-policy.md), [AI policy in security](../07-security/02-security-policy.md)

## Context

This project is itself an AI tool, and contributors naturally use AI to
write code and docs. Unreviewed model output landing in commits —
redundant comments, plausible-but-wrong code, churn from repeated
"AI generated → fixed → fixed → fixed" cycles, oversized commit
messages — slows review and erodes trust. Automated maintainers (AI
agents) also operate in this repo and need the same bar. The tension is
real: we must welcome AI-assisted contribution without accepting
lowest-common-denominator output.

## Decision

We hold a single 100%-quality bar regardless of who or what wrote the
change. Contributors who use AI must disclose tools/models, understand
every line, answer reviewer questions from their own understanding
(AI only for wording), avoid repeated fix-cycles that signal unread
output, self-review before requesting review, and **not** attribute
commits to AI (no "Assisted-by"/"Co-developed-by" trailers). The same
expectations govern security reports and the repo's own agent
configuration ([agents config](../13-agents-config/01-agent-operating-principles.md)).
CI reinforces the bar mechanically: English-only enforcement, license
headers, `govulncheck`, `go vet`, race tests, and coverage thresholds.

## Consequences

- **Easier:** reviewers trust the diff matches its description; commit
  history stays a clean human-owned record; the project practices the
  same standard it promotes.
- **Harder:** first-time contributors may be surprised by the AI
  disclosure and no-AI-attribution rules; they are stated explicitly in
  the contributing guide to soften this.
- **Given up:** "AI wrote[it] so it's not my responsibility" — the human
  submitter owns everything they send.
- **Migration:** none — a policy, documented, with a machine-enforced
  subset in CI.

## Alternatives considered

- **Ban AI contributions outright:** rejected — this is an AI tool and
  we want AI-assisted help, just not unreviewed output.
- **Require AI attribution trailers:** rejected — attribution implies the
  human is disclaiming the code; the submitter owns it fully instead.