# Plugin System

This directory contains plugin documentation for OpenCodeReview.

## Available Plugins

| Plugin | Description |
|--------|-------------|
| [Claude Code](../../plugins/open-code-review/claude-code/) | Plugin with slash commands for Claude Code |
| [Cursor](../../plugins/open-code-review/README.md#cursor) | Plugin with portable skills for Cursor |
| [Codex](../../plugins/open-code-review/README.md#codex) | Plugin with callable skills for Codex |
| [OpenCode](../../plugins/open-code-review/opencode/) | Native tools and slash commands for OpenCode |
| [QCA Forward](../../plugins/open-code-review/qca/) | Delegation mode template for QCA |
| [Skills](../../plugins/open-code-review/skills/) | Portable agent skill format |

## Plugin Formats

### Claude Code Plugin

- **Format:** Claude Code plugin with slash commands
- **Installation:** See [../../plugins/open-code-review/claude-code/](../../plugins/open-code-review/claude-code/)
- **Commands:** `/ocr-review`, `/ocr-scan`, `/ocr-config`

### Cursor Plugin

- **Format:** Cursor portable skills
- **Installation:** Copy skills to Cursor skills directory
- **Skills:** Review, scan, configuration

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

1. Choose your target platform (Claude Code, Cursor, etc.)
2. Follow platform-specific plugin format
3. Test with the target platform
4. Submit to [plugins/open-code-review/](../../plugins/open-code-review/)

### Testing Plugins

```bash
# Test Claude Code plugin
cd plugins/open-code-review/claude-code
npm install
npm test

# Test portable skills
ocr skills test
```

## Support

- [Plugin Issues](https://github.com/alibaba/open-code-review/issues)
- [Integration Documentation](../integration/README.md)
- [Agent Skills Documentation](../integration/02-agent-skill.md)