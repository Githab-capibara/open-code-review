# Development Documentation

This directory contains development-related documentation.

## Documents

| File | Purpose |
|------|---------|
| [01-claude.md](01-claude.md) | See Agents Guidelines |
| [02-contributing.md](02-contributing.md) | Contribution workflow and coding guidelines |
| [03-claude-code-environment.md](03-claude-code-environment.md) | Claude Code environment setup |

## Getting Started

### Prerequisites

- [Go 1.25+](https://go.dev/dl/)
- [Git](https://git-scm.com/)
- [Make](https://www.gnu.org/software/make/)

### Setup

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/open-code-review.git
cd open-code-review

# 2. Add upstream remote
git remote add upstream https://github.com/alibaba/open-code-review.git

# 3. Build and test
make build
make test
```

## Development Workflow

1. Create a branch for your change
2. Make your changes following [coding guidelines](02-contributing.md)
3. Run `make check` to format and validate
4. Run `make test` to verify tests pass
5. Commit with clear English commit messages
6. Push and open a Pull Request
7. Address review feedback
8. Merge once approved

## Quality Standards

- **Code style:** Run `make check` before committing
- **Language:** Source files in English only (comments, identifiers, strings)
- **Tests:** Maintain 90%+ code coverage
- **License:** All source files need SPDX headers (run `make license-add`)
- **Commit messages:** Must be in English

## Code Review

Before committing changes, conduct a code review:

```bash
ocr review --audience agent --background "briefly summarize the background requirements"
```

## Links

- [Governance](../governance/03-governance.md)
- [Security Policy](../security/01-security-policy.md)
- [Architecture](../architecture/01-overview.md)