# 01. Agent Operating Principles (AGENTS.md)

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Audience:** AI agents and automation working in this repository

## Overview

This repo is maintained with AI agents in the loop, so it ships its own
agent configuration:

| File | Role |
|------|------|
| [`AGENTS.md`](../../AGENTS.md) | The canonical operating principles every agent must follow (source of truth) |

The principles themselves live only in `AGENTS.md`; this document is
descriptive documentation, not a second copy. Update `AGENTS.md` first
when principles change.

## The principles, in brief

1. **Don't be lazy — work at maximum.**
2. **Recon first, then act.** Investigate before touching anything.
3/4. **Change or add a feature → update the documentation.**
5/6. **Change or add a feature → update or write tests.**
7. **After any change, verify nothing broke.**
8. **Be maximally careful when working with the system.**
9. **Use `gh` for GitHub work** (pre-configured).
10. **Commits are authored by the human owner**, never attributed to AI
    (consistent with [ADR-06](../03-adr/06-zero-ai-slop-policy.md)).
11/12. **Documentation style is fixed**: Michael Nygard ADR format,
    design-doc headers, table-style folder READMEs, badge-style root
    README — and if you see docs in the wrong style, fix them.

## How the rules land mechanically

| Principle | Reinforcement |
|-----------|---------------|
| Docs/tests with every change | PR review; repo templates |
| Verify nothing broke | `make check`, `make test`, CI (see [development setup](../08-guides/03-development-setup.md)) |
| No AI commit attribution | [AI contributor policy](../08-guides/04-ai-contributor-policy.md) rule 6 |
| Doc style | the folder `template.md` files + ADR format in [03-adr](../03-adr/README.md) |

## Related

- [AI contributor policy](../08-guides/04-ai-contributor-policy.md)
- [ADR-06: zero AI-slop policy](../03-adr/06-zero-ai-slop-policy.md)
- [Governance](../09-governance/01-governance.md)