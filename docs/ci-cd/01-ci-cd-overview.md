# 01. CI/CD overview

- **Status:** Accepted
- **Date:** 2026-08-23
- **Deciders:** @Githab-capibara
- **Related:** docs/integration/04-ci.md

## Context

CI/CD integration guides document how to use OpenCodeReview in pipelines.

## Decision

Maintain CI/CD integration documentation in this folder, with runnable
pipelines per platform in [`examples/`](../../examples/) and the user-facing
guide at [integration/04-ci.md](../integration/04-ci.md).

## Consequences

- **Easier:** Clear integration examples.
- **Harder:** Documentation maintenance.
- **Given up:** None.

## Alternatives considered

- **Inline CI setup into the website docs only:** rejected because
  contributors need copy-paste pipelines next to the code they exercise.
- **One universal pipeline template:** rejected because host pipeline
  syntaxes (Actions, GitLab CI, Jenkinsfile, Bitbucket) are incompatible.
