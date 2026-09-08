# 26-package-json.md

- **Status:** Active
- **Date:** 2026-08-27
- **Owner:** @alibaba-open-code-review
- **Related:** [Rules Overview](../rules/README.md)

## Overview

This document contains review rules for Package.json files.

## Details

- Avoid introducing dependencies with a version of `latest` or `*`; use specific version numbers instead. Note: ignore this rule when the version number is not on a newly added line of code
- Dependency conflicts or duplicate declarations: the same dependency exists in both `dependencies` and `devDependencies`
- Required tool dependencies not declared: tool names such as eslint, jest, or prettier appear in `scripts` but are not listed in `devDependencies`

## References

- [Rules Overview](../rules/README.md)

