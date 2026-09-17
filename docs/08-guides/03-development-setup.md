# 03. Development Setup

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Audience:** contributors, maintainers

## Prerequisites

| Tool | Why |
|------|-----|
| Go 1.25.5+ | the CLI and everything in `internal/` (`go.mod`) |
| Git 2.41+ | the CLI requires it at runtime; tests shell out to git |
| Node.js 18+ | npm wrapper, Action helpers, docs site, VS Code extension |
| Yarn | `extensions/vscode/` ships a `yarn.lock` |
| Make | task entry points on every platform |

## First build

```bash
git clone https://github.com/alibaba/open-code-review.git
cd open-code-review
make build            # -> dist/opencodereview (LD_FLAGS stamp version/commit)
./dist/opencodereview version
```

## Monorepo layout (what you'll touch)

| Path | Module / toolchain | Contents |
|------|--------------------|----------|
| `cmd/opencodereview/` | Go | cobra CLI entry points |
| `internal/` | Go | engine: `agent`, `llm`, `llmloop`, `tool`, `diff`, `session`, `config`, `mcp`, `viewer`, `scan`, `delegate`… |
| `scripts/` | Node | npm install/update helpers + GitHub Action scripts |
| `scripts/github-actions/` | Node | PR-comment poster, translation-sync checker, contract checkers |
| `pages/` | Node + own `go.mod` | docs/marketing website (`pages/src/content/docs/<locale>/…`) |
| `extensions/vscode/` | Node (Yarn) | VS Code extension |
| `action.yml` | composite Action | the PR-review GitHub Action |
| `plugins/`, `skills/` | manifests | agent integrations |

`pages/` deliberately has its **own Go module** so `go list ./...`
never walks `node_modules` — don't remove it.

## Everyday commands (root `Makefile`)

```bash
make build        # build the CLI into dist/
make test         # go test -v -race -count=1 over all packages
make coverage     # coverage report, fails below the 90% threshold
make fmt          # gofmt -s -w .
make vet          # go vet
make check        # license-check + english-check + go mod tidy + gofmt + vet
make dist         # cross-compiled archives for all six targets + sha256
```

CI additionally runs `govulncheck ./...` (see
`.github/workflows/ci.yml`) — run it before opening a PR that adds
dependencies.

## Node-side tests

```bash
npm run test:github-actions   # poster, translation-sync, action + plugin contract tests
npm run test:update           # npm updater version test
```

## Docs website

```bash
cd pages
npm install && npm run dev    # webpack dev server
npm run build / typecheck / lint / test
```

Docs content lives in `pages/src/content/docs/{en,zh,ja,ko,ru}/` and is
hand-synced across locales — `cmd/opencodereview/cli_reference_compare_docs_test.go`
pins cross-locale consistency.

## VS Code extension

```bash
cd extensions/vscode
yarn install && yarn build    # see extensions/vscode/README.md
```

## House rules that CI enforces

- Every Go file carries the Apache-2.0 SPDX header (`make license-add`
  if you added files; `make license-check` verifies).
- Go source and user-visible strings are English-only
  (`make english-check`; exceptions need `// allow-non-english:`).
- Tests must pass with `-race`; total coverage stays ≥ 90%.

## Related

- [Contributing guide](01-contributing.md) — workflow, branching, commit style
- [AI contributor policy](04-ai-contributor-policy.md)
- [Architecture overview](../02-architecture/01-overview.md)