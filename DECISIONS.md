# Decisions

This file records durable project decisions. Add new entries when product, architecture, design, workflow, or safety strategy changes.

## 2026-05-05: Deepseek-only Strategy

Decision: The project is Deepseek-only.

Rationale:

- The core product thesis is a dedicated harness for Deepseek, not a general provider framework.
- Multi-model abstractions would slow down the first demo.
- UI and behavior can be simpler and sharper when there is only one target model.

Consequences:

- No MiMo work.
- No model switcher.
- No provider marketplace.
- Use `DeepseekHarness` language instead of generic `ModelAdapter`.

## 2026-05-05: Claude-like Visual Direction

Decision: The UI should follow a Claude / Anthropic-like visual style.

Rationale:

- The desired product feel is warm, calm, editorial, and tool-focused.
- Claude's visual language is a good reference for trustworthy AI work surfaces.

Consequences:

- Use warm off-white background, near-black text, clay orange accents, quiet borders.
- Do not copy Claude logos or protected brand assets.
- Use `skills/anthropic-brand-style` for design work and review.

## 2026-05-05: Search & Replace as v0 Edit Format

Decision: v0 file edits use Search & Replace.

Rationale:

- Easier for Deepseek to produce than patch format.
- Simple to validate with exact unique-match checks.
- Works without relying on Git.

Consequences:

- Every `oldStr` must match exactly once.
- Invalid proposals cannot reach the write path.
- Multi-file and richer edit formats are deferred.

## 2026-05-05: Internal Snapshot Instead of Git Reset

Decision: v0 undo uses internal snapshots, not destructive Git operations.

Rationale:

- User projects may not be Git repositories.
- `git reset` can destroy unrelated user work.
- The first demo only needs latest-edit undo.

Consequences:

- Snapshot design must store original content before write.
- Undo restores latest applied edit only in v0.

## 2026-05-05: Project Control Documents

Decision: Manage the project through explicit control documents.

Rationale:

- Work is expected to continue across multiple AI coding sessions.
- The project needs handoff memory, task control, and decision traceability.

Consequences:

- `PROJECT_STATUS.md` is updated at session end.
- `TASKS.md` is the active backlog.
- `PROJECT_CONTROL.md` defines workflow and gates.

