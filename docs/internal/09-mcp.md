# 09. MCP Package

The `internal/mcp` package connects OpenCodeReview to Model Context Protocol servers: it launches/connects to MCP servers, calls their tools, and registers those tools into the review agent's `tool.Registry`.

## Client

```go
type Client struct { /* ... */ }

func NewClient(ctx context.Context, name, command string, args, env []string, dir, version string) (*Client, error)
func NewRemoteClient(ctx context.Context, name, url string, headers map[string]string, version string) (*Client, error)

func (c *Client) Name() string
func (c *Client) Tools() []*mcp.Tool
func (c *Client) CallTool(ctx context.Context, name string, args map[string]any) (string, error)
func (c *Client) Close() error
```

- `NewClient` — launches a **local** MCP server over stdio (command + args + env + working dir).
- `NewRemoteClient` — connects to a **remote** MCP server over HTTP; `headers` support env-var expansion (`${VAR}`), expanding to empty when unset.
- `CallTool` — invokes a remote tool and returns its text result. `contentToText` extracts text from MCP content blocks (single/multiple text supported; non-text types are rejected).

## Provider (agent-side bridge)

```go
type Provider struct { /* implements tool.Provider */ }

func (p *Provider) Tool() tool.Tool
func (p *Provider) Execute(ctx context.Context, args map[string]any) (string, error)

func RegisterAll(reg *tool.Registry, c *Client, allowedTools []string)
func ToToolDef(t *mcp.Tool) llm.ToolDef
func CollectToolDefs(clients []*Client, reg *tool.Registry) []llm.ToolDef
```

- `Provider` wraps an MCP `Client` so that an MCP tool looks like a native `tool.Provider` to the agent.
- `RegisterAll(reg, c, allowedTools)` — registers the client's tools into the agent `tool.Registry`, honoring an `allowedTools` allowlist, skipping reserved tool names, skipping duplicates, and warning on unmatched allowed entries.
- `ToToolDef` / `CollectToolDefs` — convert MCP tool schemas into `llm.ToolDef` for the model, filtering reserved and unregistered tools and de-duplicating.

## How it fits

The agent [01-agent.md](01-agent.md) builds tool definitions via `CollectToolDefs` (over MCP clients) merged with the built-in providers, then dispatches model tool-calls through the `tool.Registry`. This is how external MCP servers extend the review agent's capabilities.

## Dependencies / Related

- `internal/tool` — `tool.Registry`, `tool.Provider`, `tool.Tool`.
- `internal/llm` — `llm.ToolDef`.

## Links

- [Tool Package](03-tool.md)
- [LLM Package](02-llm.md)
- [Agent Package](01-agent.md)
