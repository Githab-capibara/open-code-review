# Internal Package Documentation Template

Document one Go package under `internal/`. Keep every symbol real — grep the source
before writing; never describe intended behavior that is not in the code.

## Title

`internal/<package>` Package

One-line package purpose (quote the package doc comment when present).

## Overview

What the package is responsible for.

## Exports

List the real exported symbols with signatures:

```go
func ExportedFn(args) ReturnType
type ExportedType struct { ... }
```

Only include symbols that exist in the source.

## How it fits

Where this package sits in the review/scan pipeline and which packages it depends on.

## Dependencies / Related

- [Agent Package](01-agent.md)
- other internal docs as relevant

## Links

Relative links to sibling docs (e.g. `../architecture/README.md`).
