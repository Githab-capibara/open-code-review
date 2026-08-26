# 01. Pages overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** [pages/](../../pages/), [Website README](README.md)

## Context

OpenCodeReview needs a public website (open-codereview.ai) serving landing
page, documentation, and blog content in multiple languages, built from the
same repository as the CLI.

## Decision

Maintain the website source under [`pages/`](../../pages/) as a React 18
single-page application bundled with webpack:

| Aspect | Choice |
|--------|--------|
| Framework | React 18 + react-router-dom SPA |
| Bundler | webpack (`dev`: webpack-dev-server, `build`: production mode) |
| Markdown rendering | `marked` + `mermaid` for diagrams + `dompurify` sanitization |
| Visuals | three.js scenes, custom icon set |
| Language / typing | TypeScript |
| Testing | Vitest (+ React Testing Kit tests such as `App.test.tsx`) |
| Budget | size-limit gate of 150 kB per bundle |

Key source directories:

```
pages/src/
├── components/       # UI components (+ icons/)
├── pages/            # Route pages
├── content/
│   ├── docs/         # Documentation markdown per locale
│   └── blog/         # Blog posts per locale
├── i18n/             # UI translations
├── hooks/, utils/, styles/, assets/
```

Locales served: English (`en`), Chinese (`zh`), Japanese (`ja`), Russian
(`ru`). Documentation content in `src/content/docs/en/` is mirrored to the
repository-root `docs/user-guide/` copies; translation consistency is
enforced by
[`scripts/github-actions/check-translation-sync.js`](../../scripts/github-actions/check-translation-sync.js)
and the `translation-sync.yml` workflow. Deployment runs through
`deploy-pages.yml` (GitHub Pages); CI gates builds via `pages-ci.yml`.

## Consequences

- **Easier:** one repo ships CLI + website; docs and product evolve
  together; locale drift is caught in CI.
- **Harder:** a hand-rolled webpack SPA carries more setup than a static
  site generator would.
- **Given up:** static-site-generator conveniences (build-time markdown
  routing) — markdown is rendered client-side.
- **Migration:** content changes are plain markdown edits; framework changes
  require updating this document and `pages-ci.yml`.

## Alternatives considered

- **Astro / Next.js SSG:** rejected at project start; client-side markdown
  rendering keeps the build trivially simple and avoids server-side tooling.
- **Separate website repository:** rejected because docs must be versioned
  with the code they describe.
