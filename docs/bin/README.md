# Binary Scripts

This directory contains executable entry points for the OpenCodeReview CLI.

## Contents

| File | Purpose |
|------|---------|
| [ocr.js](../../bin/ocr.js) | Node.js entry point for the `ocr` command |

## ocr.js

The `ocr.js` script is the npm binary entry point that bootstraps the Go binary or runs the Node.js wrapper.

### Usage

```bash
# After npm install -g @alibaba-group/open-code-review
ocr review
```

### How It Works

1. Checks for the Go binary in the package `dist/` directory
2. If found, executes it with passed arguments
3. If not found, falls back to Node.js implementation (if available)

## Links

- [Installation Guide](../user-guide/02-installation.md)
- [CLI Reference](../user-guide/04-cli-reference.md)
