# Security Documentation

This directory contains security-related documentation for OpenCodeReview.

## Documents

| Guide | Purpose |
|-------|---------|
| [01-security-policy.md](01-security-policy.md) | Security policy, vulnerability reporting, and best practices |
| [02-assurance-case.md](02-assurance-case.md) | Security assurance case and threat model |

## Security Principles

OpenCodeReview follows these security principles:

- **Zero-trust external input** — All diffs, configs, and LLM responses are validated
- **Secure by default** — HTTPS-only, localhost binding, host allowlist
- **Least privilege** — No elevated permissions, minimal external process execution
- **Transparency** — All security decisions are documented

## Reporting Vulnerabilities

**Do NOT report security vulnerabilities through public GitHub issues.**

Use [GitHub Private Vulnerability Reporting](https://github.com/alibaba/open-code-review/security/advisories/new).

Include:
- Description of the vulnerability and its potential impact
- Step-by-step reproduction instructions
- Affected version(s)
- Suggested fix or mitigation (if available)

## Security Links

- [Security Policy](01-security-policy.md)
- [Assurance Case](02-assurance-case.md)
- [Code of Conduct](../governance/02-code-of-conduct.md)
- [Governance Model](../governance/03-governance.md)