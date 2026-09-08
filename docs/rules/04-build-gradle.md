# 04-build-gradle.md

- **Status:** Active
- **Date:** 2026-08-27
- **Owner:** @alibaba-open-code-review
- **Related:** [Rules Overview](../rules/README.md)

## Overview

This document contains review rules for Build Gradle files.

## Details

Avoid introducing snapshot version dependencies in production environments; use specific version numbers instead. Note: ignore this rule when the version number is not on a newly added line of code.

## References

- [Rules Overview](../rules/README.md)

