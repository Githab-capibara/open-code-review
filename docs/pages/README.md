# Website Source

This directory contains the source code for the OpenCodeReview website ([open-codereview.ai](https://open-codereview.ai)).

## Technology Stack

- **Framework:** Astro / Vite (static site)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Testing:** Vitest

## Directory Structure

```
pages/
├── src/
│   ├── content/docs/    # Documentation markdown files
│   ├── i18n/            # UI translations
│   ├── components/      # Reusable UI components
│   └── layouts/         # Page layouts
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
