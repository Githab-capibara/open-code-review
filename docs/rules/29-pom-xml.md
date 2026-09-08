# 29-pom-xml.md

- **Status:** Active
- **Date:** 2026-08-27
- **Owner:** @alibaba-open-code-review
- **Related:** [Rules Overview](../rules/README.md)

## Overview

This document contains review rules for POM XML files.

## Details

In newly added code, the version must not contain the snapshot qualifier; any other version is allowed. Note: when no version is declared in the code, it is because the version is managed in the parent POM. Ignore this rule when the version number is not on a newly added line of code.

## References

- [Rules Overview](../rules/README.md)

