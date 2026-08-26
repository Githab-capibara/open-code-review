# Website Source

This directory contains the source code for the OpenCodeReview website ([open-codereview.ai](https://open-codereview.ai)).

## Technology Stack

- **Framework:** React 18 SPA + react-router-dom
- **Bundler:** webpack (dev server + production build)
- **Markdown rendering:** marked, mermaid (diagrams), dompurify (sanitization)
- **Visuals:** three.js scenes, custom icon set
- **Language:** TypeScript
- **Testing:** Vitest; bundle budget enforced by size-limit (150 kB)

## Directory Structure

```
pages/
├── src/
│   ├── components/      # UI components (+ icons)
│   ├── pages/           # Route pages
│   ├── content/docs/    # Documentation markdown files per locale
│   ├── content/blog/    # Blog posts per locale
│   ├── i18n/            # UI translations
│   ├── hooks/           # React hooks
│   ├── utils/           # Helpers
│   └── styles/          # Global styles
├── public/              # Static assets
└── README.md            # This file
```

## Documentation Source

The website documentation lives in `src/content/docs/en/` and is mirrored to `docs/` in the repository root for offline access.

### Languages

| Locale | Path |
|--------|------|
| English | `src/content/docs/en/` |
| Chinese | `src/content/docs/zh/` |
| Japanese | `src/content/docs/ja/` |
| Russian | `src/content/docs/ru/` |

## Development

```bash
cd pages
npm install
npm run dev
```

## Building

```bash
npm run build
```

Output is deployed to GitHub Pages.

## Links

- [Website](https://open-codereview.ai)
- [Documentation](../user-guide/README.md)
