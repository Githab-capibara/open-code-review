# NPM Package Assets

This directory contains platform-specific binary assets for the OpenCodeReview npm package.

## Directory Structure

```
npm/
├── darwin-arm64/    # macOS ARM64 (Apple Silicon)
├── darwin-x64/      # macOS Intel x64
├── linux-arm64/     # Linux ARM64
├── linux-x64/       # Linux x64
├── win32-arm64/     # Windows ARM64
└── win32-x64/       # Windows x64
```

## Contents

Each platform directory contains:

- Pre-built `ocr` binary for that platform
- Platform-specific dependencies (if any)

## How It Works

When you install `@alibaba-group/open-code-review` via npm:

1. npm detects your platform (OS + architecture)
2. The post-install script (`scripts/install.js`) downloads the matching binary from GitHub Releases
3. The binary is placed in the package's `dist/` directory
4. The `bin/ocr.js` script wraps the binary

## Manual Installation

If automatic download fails:

```bash
# Download the binary for your platform from GitHub Releases
# Extract to node_modules/@alibaba-group/open-code-review/dist/
```

## Supported Platforms

| Platform | Directory | Binary Name |
|----------|-----------|-------------|
| macOS ARM64 | `darwin-arm64/` | `ocr-darwin-arm64` |
| macOS x64 | `darwin-x64/` | `ocr-darwin-x64` |
| Linux ARM64 | `linux-arm64/` | `ocr-linux-arm64` |
| Linux x64 | `linux-x64/` | `ocr-linux-x64` |
| Windows ARM64 | `win32-arm64/` | `ocr-win32-arm64.exe` |
| Windows x64 | `win32-x64/` | `ocr-win32-x64.exe` |

## Links

- [Installation Guide](../user-guide/02-installation.md)
- [Supported Platforms](../user-guide/02-installation.md#supported-platforms)
