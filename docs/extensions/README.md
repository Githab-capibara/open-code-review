# Extensions

This directory contains IDE extension documentation.

## Available Extensions

| Extension | IDE | Description |
|-----------|-----|-------------|
| [VSCode Extension](../../extensions/vscode/) | Visual Studio Code | In-editor code review with GitHub integration |

## VSCode Extension

### Features

- In-editor code review
- GitHub Pull Request integration
- Line-by-line review comments
- Session history browsing
- Multi-language support

### Installation

```bash
# Install from VSCode Marketplace
# Search for "OpenCodeReview" in Extensions

# Or install from .vsix file
code --install-extension opencodereview-x.y.z.vsix
```

### Usage

1. Open a repository in VSCode
2. Make changes and stage them
3. Run "OpenCodeReview: Review Changes" command
4. Review comments appear inline
5. Apply fixes or dismiss comments

### Configuration

```json
{
  "opencodereview.ocrPath": "/path/to/ocr",
  "opencodereview.autoReview": false,
  "opencodereview.reviewOnSave": true
}
```

## Development

### Building the VSCode Extension

```bash
cd extensions/vscode
npm install
npm run compile
npm run package
```

### Testing

```bash
npm test
npm run integration-test
```

## Roadmap

Planned extensions:

- **JetBrains plugin** — IntelliJ IDEA, GoLand, PyCharm support (H2 2026)

## Support

- [Extension Issues](https://github.com/alibaba/open-code-review/issues)
- [VSCode Marketplace](https://marketplace.visualstudio.com/items?itemName=open-code-review.opencodereview)
- [Integration Documentation](../integration/README.md)