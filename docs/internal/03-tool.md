# 03. Tool Package

The `internal/tool` package provides the agent's local tool providers, a registry to register/discover them, and a `FileReader` that backs file- and search-based tools.

Package doc: *"provides code-review tools used by the review agent."*

## Provider Interface

Every tool implements the `Provider` interface. The `Execute` method returns the tool's textual output plus an error:

```go
type Provider interface {
    Name() string
    Description() string
    Execute(ctx context.Context, args map[string]any) (string, error)
}
```

Constructors return a concrete `*XxxProvider`:
- `NewCodeSearch(fr *FileReader) *CodeSearchProvider`
- `NewFileRead(fr *FileReader) *FileReadProvider`
- `NewFileFind(fr *FileReader) *FileFindProvider`
- `NewFileReadDiff(dm DiffMap) *FileReadDiffProvider`

## Providers

| Provider | Purpose |
|----------|---------|
| `CodeSearchProvider` | Runs `git grep`/`rg`-style search over the repo; guards against traversal via `hasTraversalPathComponent` and detects non-repo errors via `isNotGitRepoError`. |
| `FileReadProvider` | Reads a file's contents through `FileReader`. |
| `FileFindProvider` | Finds files matching a pattern. |
| `FileReadDiffProvider` | Reads a diff hunk for a given file via `DiffMap`. |
| `CodeCommentProvider` | Parses a model's comment output. `ParseComments(args map[string]any) ([]model.LlmComment, string)` normalizes the result; `normalizeCodeCommentCategory` / `normalizeCodeCommentSeverity` coerce labels. |
| `StubProvider` / `BuiltinToolProvider` | Internal test/registration helpers implementing `Provider`. |

## Registry

```go
type Registry struct { /* ... */ }

func (r *Registry) Register(p Provider)
func (r *Registry) Get(name string) (Provider, bool)
func (r *Registry) Freeze()
```

`Registry` is the central catalog the agent consults when a model requests a tool call by name. `Freeze` makes the set immutable after registration. `mcp.RegisterAll` registers MCP-backed tools into the same `Registry` type (see [09-mcp.md](09-mcp.md)).

## Tool Descriptor

`type Tool struct` (definitions.go) describes a registered tool's name, description, and JSON-schema parameters used to advertise it to the model.

## FileReader

`FileReader` (filereader.go) is the dependency injected into `CodeSearchProvider`, `FileReadProvider`, and `FileFindProvider`. It enforces read-only, repository-scoped access (path validation, symlink handling, size limits).

## Supported File Types

The package ships parsers used by the comment collector (`comment_collector.go`, `response_message.go`) and a `stub.go` placeholder provider. Tool output is always returned as a string the agent feeds back into the model loop.

## Dependencies / Related

- `internal/model` — `model.LlmComment` is the parsed output of `tool.ParseComments`.
- `internal/diff` — `DiffMap` is the input to `NewFileReadDiff`.
- `internal/mcp` — registers remote tools into the `tool.Registry`.

## Links

- [Agent Package](01-agent.md)
- [Diff Package](05-diff.md)
- [Path Utility Package](06-pathutil.md)
- [MCP Package](09-mcp.md)
