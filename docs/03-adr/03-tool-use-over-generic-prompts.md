# 03. Equip the review agent with a purpose-built toolset

- **Authors:** @Githab-capibara

- **Status:** Accepted
- **Date:** 2026-09-16
- **Deciders:** @lizhengfeng101
- **Related:** [tool system](../02-architecture/05-tool-system.md), [diff parser](../02-architecture/07-diff-parser.md), [ADR 01](01-deterministic-agent-hybrid.md)

## Context

A general agent toolkit (bash, editor, browser, generic file I/O) is
attractive for "review any repo" but counterproductive for code review.
Analysis of tool-call traces from large-scale production review showed
stable distributions: a handful of tools dominate (read the diff's
context, search for a symbol, confirm a cross-file hypothesis, emit a
comment), repetition per tool is high, and adding broad tools (e.g. a
general shell) changes the whole call chain in unpredictable ways while
adding attack surface. Line anchoring is the other hard problem:
comments that drift off their lines are the top complaint against LLM
review.

## Decision

We ship exactly six tools — `task_done`, `code_comment`, `code_search`,
`file_read`, `file_read_diff`, `file_find` — each parameterized for the
review loop, with enum-enforced `category`/`severity` on every
`code_comment`. Line anchoring is **not** a tool the model can get
wrong: `code_comment` takes a verbatim `existing_code` snippet that the
deterministic resolver matches against hunks (then the full file), and
only on a miss does a bounded LLM re-location pass run. MCP servers may
add tools, but the built-in six are the contract the prompts assume.

## Consequences

- **Easier:** predictable call chains to debug; small attack surface
  (file paths go through `WithinBase()`, searches are `git grep`
  argument vectors); line accuracy is measured and improvable
  independently of model choice.
- **Harder:** reviewers occasionally want context the six tools do not
  fetch (addressed via MCP rather than by growing the core set).
- **Given up:** arbitrary shell access for the review agent; free-form
  file writing.
- **Migration:** none; tool definitions are embedded in the binary and
  overridable via `--tools`.

## Alternatives considered

- **Generic agent toolset (bash/editor):** rejected — unpredictability
  and prompt-injection blast radius on semi-trusted diffs (see [trust
  boundaries](../07-security/03-trust-boundaries.md)).
- **No tools, single-shot prompt on the diff:** rejected — no cross-file
  confirmation means either missed defects or speculative comments.
- **Model returns JSON line numbers directly:** rejected — models drift;
  anchoring on quoted code text matched deterministically is stable and
  testable.