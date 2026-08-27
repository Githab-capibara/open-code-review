# 04. Config Package

The `internal/config` directory is **not a single package** — it is a collection of focused sub-packages, each loading one kind of configuration. Every sub-package is versioned under `internal/config/<name>`.

| Sub-package | Import path | Purpose |
|------------|-------------|---------|
| `testconnection` | `internal/config/testconnection` | Loads the LLM test-connection task config used by `ocr config provider` connectivity checks. |
| `allowlist` | `internal/config/allowlist` (package name `allowedext`) | File-level filtering for review: which extensions are allowed and which paths are excluded. |
| `toolsconfig` | `internal/config/toolsconfig` | Loads tool definitions from JSON config files. |
| `template` | `internal/config/template` | Loads and validates the prompt templates that drive the review/scan agent. |
| `rules` | `internal/config/rules` | Resolves review rules (system + project) and builds a file filter. |

## testconnection

Package doc: *"loads the LLM test connection task configuration."*

- `TestTask` — the resolved test task.
- `LlmConversation`, `ChatMessage` — the prompt/response conversation shape used to probe a provider.
- `LoadDefault() (*LlmConversation, error)` — loads the built-in test conversation.
- `resolveLang(lang string) string` — normalizes a language hint (e.g. `zh` → `zh-CN`).

## allowlist (package `allowedext`)

- `IsAllowedExt(ext string) bool` — true if a file extension may be reviewed.
- `IsExcludedPath(path string) bool` — true if a path is excluded by the built-in exclusion list (build artifacts, VCS dirs, etc.).

These two functions are the file-selection gate used before any file enters the review pipeline.

## toolsconfig

Package doc: *"loads tool definitions from JSON config files."*

- `ToolConfigEntry` — one tool entry from a JSON config (`name`, params/description).
- `Load(path string) ([]ToolConfigEntry, error)` — reads and parses a tool-config JSON file.

## template

Package doc: *"loads and validates task prompt templates for the code review agent."*

- `Template` — the review-agent prompt template (conversation + manifest).
- `ScanTemplate` — the full-file scan variant of the template.
- `LoadDefault() (*Template, error)` — loads the built-in review template.
- `LoadScanDefault() (*ScanTemplate, error)` — loads the built-in scan template.
- `applyLanguage` — localizes template text for a target language.

## rules

Package doc: *"resolves review rules (system + project) for a repository."*

- `Resolver` (interface) — resolves the applicable rule set for a given path.
- `PathRule`, `SystemRule`, `ProjectRule`, `ProjectRuleEntry` — rule data types.
- `RuleDetail`, `DetailResolver` — structured rule detail and its resolver.
- `FileFilter` — precomputed path filter derived from rules.
- `LoadDefault() (*SystemRule, error)` — loads the built-in system rules.
- `NewResolver(repoDir, customRulePath string) (Resolver, *FileFilter, error)` — builds a resolver (and file filter) from the repo + optional custom rule file.
- `buildFileFilter` — internal: compiles a `FileFilter` from resolved rules.

## Dependencies / Related

- `internal/delegate` calls `rules.Resolver` via `GroupRules` to render the delegation "spec" (see [11-delegate.md](11-delegate.md)).
- `internal/scan` consumes `template.ScanTemplate` (see [16-scan.md](16-scan.md)).
- `internal/agent` and `internal/llm` are configured through these sub-packages.

## Links

- [Tool Package](03-tool.md)
- [LLM Package](02-llm.md)
- [Delegate Package](11-delegate.md)
- [Scan Package](16-scan.md)
