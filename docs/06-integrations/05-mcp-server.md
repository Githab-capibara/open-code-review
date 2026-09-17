# 05. MCP Server Integration (OCR as MCP Client)

- **Authors:** @Githab-capibara

- **Status:** Shipped (client) / Planned (exposing OCR as a server)
- **Audience:** users, platform integrators

## Overview

Two distinct directions — don't confuse them:

| Direction | Status | What it means |
|-----------|--------|---------------|
| OCR as **MCP client** | shipped | You point OCR at external MCP servers; their tools join the reviewer's toolbox alongside built-ins like `file_read` / `code_search` (`internal/mcp` — stdio + Streamable HTTP transports) |
| Exposing OCR as an **MCP server** | planned | Other agents drive OCR itself; tracked in the [roadmap](../10-roadmap/01-roadmap.md) |

Reach for a client server when the reviewer needs context from beyond
the checkout: issue/ticket lookup, internal docs/knowledge base, custom
analysis (linter, schema validator, dependency checker). Plain repo
reads are already covered by built-in tools.

## Configure a local (stdio) server

```bash
ocr config set mcp_servers.docs.command npx
ocr config set mcp_servers.docs.args '["-y", "@acme/docs-mcp-server"]'
ocr config set mcp_servers.docs.tools '["search_docs", "get_page"]'
ocr config set mcp_servers.docs.setup "npm install -g @acme/docs-mcp-server"
ocr config set mcp_servers.docs.env '["DOCS_TOKEN=secret", "DOCS_REGION=eu"]'
```

## Configure a remote (Streamable HTTP) server

Set `type` to `remote` and give a `url` — setting only `url` is not
enough because the default type is `stdio`. Use a fresh server name so
you do not overwrite an existing entry:

```bash
ocr config set mcp_servers.acme.type remote
ocr config set mcp_servers.acme.url https://mcp.acme.internal/mcp
```

`mcp_servers.<name>` entries are removed with
`ocr config unset mcp_servers.<name>`.

## Trust model

An MCP server is a third party: its tools execute locally and
its output enters the reviewer's prompt. The server's own credentials
are passed via `env`; treat that config like any other secret store.
See [trust boundaries](../07-security/03-trust-boundaries.md).

## Related

- [Tool system](../02-architecture/05-tool-system.md)
- Website: `pages/src/content/docs/en/mcp.md`