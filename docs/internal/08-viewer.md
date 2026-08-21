# Viewer Package

The `internal/viewer` package serves a local web UI for browsing and replaying review sessions (`ocr viewer`).

## Server

```go
func StartServer(addr string) error
func DisplayAddr(addr string) string
```

- `StartServer(addr string) error` — starts the viewer HTTP server bound to `addr`.
- `DisplayAddr(addr string) string` — returns the user-facing URL for the bound address (expands `:port` to a clickable `localhost` URL).

## Handlers

- `handleRepos` — lists repositories under the sessions root.
- `handleSessions` — lists sessions for the current working directory's repo.
- `handleSession` — renders a single session (conversation, comments, tool calls).

These read from `session.ListSessions` / `session.LoadSummary` / `session.LoadDetail` (see [07-session.md](07-session.md)).

## Host-Header Security (DNS-rebinding defense)

- `hostGuard` — middleware that rejects requests whose `Host` header is not in the allowed set.
- `buildAllowedHosts` — builds the allowlist, including bracketed IPv6 handling.
- `resolveAllowedHostsFromEnv` — reads `OCR_VIEWER_ALLOWED_HOSTS` (comma-separated) to permit external hosts.
- `isLoopbackHost`, `hostOnly`, `splitBindHost` — helpers that parse the bind address and classify hosts as loopback vs. external.

By default the viewer binds to loopback only and rejects non-allowed `Host` headers, which blocks DNS-rebinding and host-header injection.

## Response Hardening

- `securityHeaders` — sets strict security headers (CSP, HSTS where applicable). Tests assert the CSP is strict and HSTS is omitted on plain HTTP.

## Templates

- `CommentFileGroup`, `SeverityCount`, `CategoryCount` — view-model types for aggregating comments.
- Embedded HTML templates render the repos / sessions / session pages; secondary sections collapse by default and empty sections are hidden.

## Dependencies / Related

- `internal/session` — data source for all pages.
- Environment: `OCR_VIEWER_ALLOWED_HOSTS` controls cross-host access.

## Links

- [Session Package](07-session.md)
- [Security Policy](../security/01-security-policy.md)
