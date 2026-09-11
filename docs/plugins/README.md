# Plugin System

This directory contains plugin documentation for OpenCodeReview.

## Index

| # | Title | Status |
|---|---|---|
| [01](01-plugins-overview.md) | Plugins Overview | Accepted |
| [02](02-open-code-review.md) | Open Code Review | Active |
| [03](03-opencode.md) | OpenCode | Active |
| [04](04-qca.md) | QCA Forward Integration | Active |
| [05](05-qca-system-prompt.md) | QCA System Prompt | Active |

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [Codex](../../plugins/open-code-review/README.md#codex) | Plugin with callable skills for Codex |
| [OpenCode](../../plugins/open-code-review/opencode/) | Native tools and slash commands for OpenCode |
| [QCA Forward](../../plugins/open-code-review/qca/) | Delegation mode template for QCA |
| [Skills](../../plugins/open-code-review/skills/) | Portable agent skill format |

## Plugin Formats

### Codex Plugin

- **Format:** Codex callable skills
- **Installation:** See [Codex guide](../../plugins/open-code-review/README.md#codex)
- **Skills:** Start review, apply fixes

### OpenCode Native

- **Format:** Native tools and commands
- **Installation:** See [../../plugins/open-code-review/opencode/README.md](../../plugins/open-code-review/opencode/README.md)
- **Features:** Built-in tools, slash commands

## Development

### Creating a New Plugin

1. Choose your target platform (Codex, OpenCode, QCA Forward, etc.)
2. Follow platform-specific plugin format
3. Test with the target platform
4. Submit to [plugins/open-code-review/](../../plugins/open-code-review/)

### Testing Plugins

```bash
# Test portable skills
ocr skills test
```

## Support

- [Plugin Issues](https://github.com/alibaba/open-code-review/issues)
- [Integration Documentation](../integration/README.md)
- [Agent Skills Documentation](../integration/02-agent-skill.md)

## Links

- [Skills Documentation](../skills/README.md)
- [CI/CD Integration](../ci-cd/README.md)
- [User Guide](../user-guide/README.md)