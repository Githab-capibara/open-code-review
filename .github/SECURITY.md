- **Authors:** @Githab-capibara

# Security Policy

The full security policy is maintained in
[docs/07-security/02-security-policy.md](../docs/07-security/02-security-policy.md).

**Please do NOT report security vulnerabilities through public GitHub
issues.** Use **GitHub Private Vulnerability Reporting** — go to the
[Security Advisories](https://github.com/alibaba/open-code-review/security/advisories/new)
page and submit a new advisory.

Supported versions: only the latest released version receives security
updates.

Release binaries are signed with GitHub Artifact Attestations (Sigstore);
verify with:

```bash
gh attestation verify opencodereview-linux-amd64 --repo alibaba/open-code-review
```
