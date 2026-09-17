# 06. Viewer Command Reference

- **Authors:** @Githab-capibara

- **Command:** `ocr viewer`
- **Audience:** users

## Overview

Starts an embedded, **read-only** HTTP server that reads
`~/.opencodereview/sessions/…` and renders past review sessions in a
browser UI at `localhost:5483` by default. Nothing is mutated; the
viewer never calls an LLM.

## Flags

| Flag | Default | Purpose |
|------|---------|---------|
| `--addr <address>` | `localhost:5483` | Listen address (e.g. `:3000` binds all interfaces) |
| `--open <mode>` | `auto` | Browser launch: `auto` \| `always` \| `never` |

`--open=auto` skips the browser when stdout is not a terminal, when
`SSH_CONNECTION` is set without display forwarding, or when Linux has
neither `DISPLAY` nor `WAYLAND_DISPLAY` — the reason prints next to the
URL. Use `--open=always` when auto declines but a browser is reachable.

## Examples

```bash
ocr viewer                  # start and open the browser
ocr viewer --addr :3000     # bind all interfaces on port 3000
ocr viewer --open=never     # just print the URL
```

## Security note

Binding to a non-localhost address exposes session logs — which can
contain source snippets — on the network. Prefer an SSH tunnel
(`ssh -L 5483:localhost:5483 host`) over `--addr :5483`. See
[trust boundaries](../07-security/03-trust-boundaries.md).

## Related

- [Session command](04-session-command.md) — CLI-side inspection
- [Session management architecture](../02-architecture/06-session-management.md)
- Website: `pages/src/content/docs/en/viewer.md`