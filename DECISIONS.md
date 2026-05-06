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

## 2026-05-05: AGENTS.md as Project-Level Agent Contract

Decision: Use `AGENTS.md` as the mandatory project-level instruction file for all future agents, including parallel workers.

Rationale:

- Future work will likely span multiple agents and sessions.
- The repository needs one obvious entry point for agent behavior that is more operational than README.
- Parallel work needs explicit ownership, write-scope, verification, and integration rules.

Consequences:

- All agents read `AGENTS.md` first.
- The coordinator owns project-control docs during parallel work.
- Workers receive task ID, write scope, forbidden paths, and verification command.
- No worker modifies shared docs, commits, pushes, or changes dependencies unless assigned.

## 2026-05-05: Grill Me Skill

Decision: Add `skills/grill-me` as a Codex skill for interrogating plans and designs one decision at a time.

Rationale:

- The original project decision process used a Grill Me style.
- Future product and architecture decisions need a repeatable method for resolving branches.

Consequences:

- Use `grill-me` when the user asks to stress-test a plan or says "grill me".
- The agent should inspect local docs/code before asking questions.
- Resolved decisions should be written to the relevant project control artifact.

## 2026-05-06: Single-Developer + Two-Machine Sync Model

Decision: This project is developed by one person across two machines (work + home), synchronized via Git/GitHub. There is no parallel-worker model.

Rationale:

- Earlier AGENTS.md drafts described coordinator/worker rules for parallel agents — that complexity does not match how the project is actually being built.
- One developer alternating between two machines needs clear pull-before-work and push-at-session-end rules, not multi-agent dispatch rules.

Consequences:

- AGENTS.md no longer contains parallel-work, coordinator, or worker sections.
- Git Rules emphasize `git pull` at session start and push at session end so the other machine can pick up work.
- Working Protocol is framed as "Claude Code executes; the developer reviews and decides".

## 2026-05-06: Single Source of Truth for Project Rules

Decision: All operating rules (startup routine, working protocol, verification gates, Git rules, design system, prohibitions) live only in `AGENTS.md`. Other documents reference it instead of duplicating.

Rationale:

- The 2026-05-06 audit found "Deepseek-only" repeated in 4 files, design palette in 3 files, and reading order in 2 files. Duplication burns agent context and creates drift when one copy is updated and another is not.

Consequences:

- `PROJECT_CONTROL.md` now covers only lifecycle, change control, and risk register; the duplicated sections were removed.
- `CONTEXT.md` is now a factual snapshot of current state plus key file pointers; no rule duplication.
- `README.md` keeps a brief product summary, the doc map, and the "feature must serve v0 loop" working rule — all framed as orientation, not authoritative rules.

## 2026-05-06: Local-only Skills Directory

Decision: `skills/` is a local-only directory for coding-tool configurations (Claude / Codex skill files). It is not committed.

Rationale:

- Audit §五 confirmed skill files are local tool configs, not project artifacts. They differ per developer and per coding agent.
- Native Claude skills live in `~/.claude/skills/` and are auto-loaded by the harness; they do not need to be vendored into the project.

Consequences:

- `skills/` added to `.gitignore`.
- Previously tracked files under `skills/anthropic-brand-style/` and `skills/grill-me/` were untracked via `git rm -r --cached skills/`. Subsequently the project `skills/` directory was removed entirely, and native equivalents were installed system-wide: `~/.claude/skills/brand-guidelines/` (from [anthropics/skills](https://github.com/anthropics/skills)) and `~/.claude/skills/grill-me/`.
- AGENTS.md no longer references `skills/` paths.

## 2026-05-06: EditProposal Array Contract

Decision: The `EditProposal` TypeScript type uses the array shape `{ summary, edits: EditOperation[], notes: string[] }`, matching the model output schema in `DEMO_DEVELOPMENT_GUIDE.md §5`.

Rationale:

- Audit §2.2 found the prior flat single-edit shape diverged from the documented model contract. Continuing on the wrong shape would force a rewrite later when multi-edit support is needed.
- Aligning the TypeScript contract with the documented schema removes ambiguity and matches the eventual Rust Serde mirror.

Consequences:

- `src/types.ts` defines `EditProposal`, `EditOperation`, `DiffLine`, `DiffLineKind`.
- `src/mockWorkspace.ts` and `src/App.tsx` consume `proposal.edits[0]` as the v0 single-edit case.
- `npx tsc --noEmit` passes.
- v0 still only ships single-file single-edit; the array shape is forward-compatible.

## 2026-05-06: Commit Frequency at Task Boundaries

Decision: Commits happen at task acceptance boundaries, not after every edit. Push happens at session end.

Rationale:

- Audit §七 noted the prior default of committing after every change produced fragmented history that obscured task-level reasoning.
- Two-machine sync is cleaner when each push represents a coherent, accepted unit.

Consequences:

- AGENTS.md §Git Rules codifies "Commit at TASK boundaries only".
- In-progress states are not pushed.
- Session end means: verify → commit → push, so the other machine can `git pull` cleanly.

## 2026-05-06: Chinese Product Overview Document

Decision: Add `PRODUCT_OVERVIEW.md` as a Chinese, non-technical product summary for human reading.

Rationale:

- Audit §2.3 found all existing docs are 100% AI/dev-focused. There is no document explaining the product to non-technical readers in plain Chinese.
- The double-track strategy (English for LLMs, Chinese for human review) called out in Audit §六 needs an explicit anchor document.

Consequences:

- `PRODUCT_OVERVIEW.md` exists and is linked from `README.md`.
- Future product/strategy explanation in Chinese has a canonical location.

## 2026-05-06: Rename AGENTS.md → CLAUDE.md

Decision: The project-level agent contract file is renamed from `AGENTS.md` to `CLAUDE.md`.

Rationale:

- `AGENTS.md` is the Codex naming convention. `CLAUDE.md` is the convention Claude Code auto-loads at session start in the working directory.
- This project's primary execution agent is Claude Code, so the file should match the Claude Code convention.
- Earlier 2026-05-05 decisions referred to the file as `AGENTS.md`; those entries are preserved as historical record.

Consequences:

- File is now `CLAUDE.md`. All non-historical references in `README.md`, `CONTEXT.md`, `PROJECT_CONTROL.md`, `PROJECT_STATUS.md`, `TASKS.md`, `PRODUCT_OVERVIEW.md`, `DEMO_DEVELOPMENT_GUIDE.md`, and `CLAUDE.md` itself are updated.
- 2026-05-05 historical decision entries continue to reference `AGENTS.md` to preserve the truthful evolution record.
- If Codex compatibility is needed later, add a symlink `AGENTS.md → CLAUDE.md` (deferred until needed).

## 2026-05-06: Sandbox-Mode Permissions (Local-Only)

Decision: Constrain Claude Code to operate only inside the project root via `.claude/settings.local.json`. The sandbox configuration is **per-machine**, not committed.

Rationale:

- Recent sessions occasionally touched files outside the project (e.g., `~/.claude/skills/`). The default should be confinement to the project directory.
- The sandbox file lives at `.claude/settings.local.json` because each machine may need different escape paths (Node version installers, local toolchains, etc.). Committing one machine's sandbox would overwrite the other's.

Consequences:

- `.claude/settings.local.json` exists per-machine with `permissions.deny` rules and `sandbox.enabled: true` (macOS Seatbelt) blocking writes/edits outside the project tree.
- `.gitignore` covers `.claude/settings.local.json` and `.claude/scheduled_tasks.json`. `.claude/settings.json` (team-wide settings) is reserved for shared config later if needed.
- The other machine must replicate the sandbox setup independently — see this entry for the template.
- One-off escapes (e.g., installing a system-wide skill) require explicit approval or temporary relax, not silent bypass.

### Sandbox config template

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "permissions": {
    "deny": [
      "Edit(/Users/<your-home>/**)",
      "Write(/Users/<your-home>/**)",
      "Edit(/etc/**)", "Write(/etc/**)",
      "Edit(/usr/**)", "Write(/usr/**)",
      "Edit(/System/**)", "Write(/System/**)",
      "Edit(/Library/**)", "Write(/Library/**)"
    ]
  },
  "sandbox": {
    "enabled": true,
    "failIfUnavailable": false,
    "filesystem": {
      "denyWrite": [
        "/Users/<your-home>/**",
        "/etc/**", "/usr/**", "/System/**", "/Library/**"
      ]
    }
  }
}
```
