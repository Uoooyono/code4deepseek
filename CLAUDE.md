# code4deepseek

## Identity

A Tauri v2 desktop AI coding agent built exclusively for Deepseek.
GUI-first, safety-first. One model, done right.

Repo: github.com/Uoooyono/code4deepseek

## Startup Routine

Every time you begin a session, follow this sequence before writing any code:

1. Read this file (CLAUDE.md) completely
2. Read TASKS.md — current phase, active tasks, priorities
3. Read PROJECT_STATUS.md — what was done last session and what's blocked
4. Read src/types.ts — current type contracts

Read DECISIONS.md when about to change product direction, architecture, workflow, safety, or design.
Read DEMO_DEVELOPMENT_GUIDE.md when implementing a v0 slice that needs detailed spec.

If any file does not yet exist, skip and continue.

## Project File Map

- CLAUDE.md — this file. Behavioral rules. Single source of truth for project rules.
- TASKS.md — task list with statuses. Update when tasks complete.
- PROJECT_STATUS.md — current phase, last session summary, blockers. Update at session end.
- DECISIONS.md — confirmed design decisions with dates. Append-only.
- DEMO_DEVELOPMENT_GUIDE.md — v0 feature spec, model output schema, slice definitions. Reference doc.
- PRODUCT_OVERVIEW.md — Chinese product overview for non-technical reading.
- src/types.ts — TypeScript type contracts (single source of truth for data shapes).
- src-tauri/src/lib.rs — Rust backend logic and Tauri commands.

## Tech Stack

- Desktop shell: Tauri v2 (Rust backend)
- Frontend: React 19 + TypeScript + Vite 7
- Icons: lucide-react
- Styling: Hand-written CSS (CSS approach may evolve — check DECISIONS.md for current policy)
- Model: Deepseek-only (NO multi-model)
- Edit format: Search & Replace (exact match replacement)

## Architecture Rules

- Safety-first: preview before write, confirm before apply, snapshot before modify
- Frontend = display only. Zero file I/O, zero validation logic in frontend
- Rust backend = all file I/O, all validation, all snapshots, all path security
- Internal snapshots for undo. NEVER use git reset/revert
- v0 does NOT execute any shell/terminal commands within the app
- Type contracts defined in src/types.ts first, then mirrored as Rust Serde structs
- Rust types must exactly mirror TypeScript types

## Coding Standards

- TypeScript strict mode, no `any`, no `@ts-ignore`
- All shared types in src/types.ts, mirrored in Rust
- State management: useReducer + React Context only (no Redux, Zustand, etc.)
- CSS: hand-written, warm neutral palette per Design System below
- Rust: proper error handling with `Result<T, E>`, no `unwrap()` in production paths
- Functions and variables: descriptive English names
- Comments: English in code; Chinese acceptable in commit messages

## Design System

Warm, restrained, editor-tool aesthetic. Do not copy Anthropic/Claude logos or trademarks.

Core color tokens:

- `--color-bg`: `#faf9f5` (warm off-white)
- `--color-text`: `#141413` (near-black)
- `--color-accent`: `#d97757` (terracotta)
- `--color-border`: `#e8e6dc` (quiet warm gray)
- Surfaces: subtle borders, restrained shadows, ≤8px radius

Avoid: purple-blue gradients, glassmorphism, neon, decorative orbs, dark cold-blue dashboards, landing-page-first layouts.

Full color palette, typography, and component rules: see [DEMO_DEVELOPMENT_GUIDE.md §3](DEMO_DEVELOPMENT_GUIDE.md).

## Git Rules

- Single developer, two machines (work + home), synced via Git/GitHub
- Always `git pull` before starting work; commit + push at session end so the other machine has it
- Commit at TASK boundaries only, NOT after every edit
- A task must be completed and accepted before committing
- Commit messages: concise, imperative mood, reference TASK ID if applicable
- `.gitignore` must cover: `skills/`, `.qilin/`, `.env*`, `node_modules/`, `dist/`, `target/`, `.DS_Store`
- Never force-push without explicit confirmation
- Do not commit API keys, local snapshots, or end-user6fec59b5 project contents

## Working Protocol

You (Claude Code) execute, verify, and report. The developer reviews and decides.

When you receive instructions:

1. Run `git status --short` first
2. Read the specified file(s) carefully
3. Apply the described changes precisely
4. Run the relevant verification command (see below)
5. Report results honestly — success with output, or failure with full error
6. If you make ANY changes beyond the instructions (e.g., touched a file not listed, refactored adjacent code, added a dependency), document:
   - Which file(s) you changed
   - What you changed
   - Why you changed it

This keeps the developer aware of every change and prevents drift between the two machines.

## Verification Commands

```bash
npm run build          # Frontend build check (must pass after frontend/TS changes)
npm run dev            # Dev server at http://127.0.0.1:1420 (visual QA only)
npm run tauri:dev      # Launch Tauri desktop app (full-stack visual QA)
git status --short     # Docs-only change verification
```

Always run the appropriate verification after a change. Report the full output if it fails.

## Review & Wrap-up

This routine is triggered when:

- A major milestone or phase is completed — proactively suggest entering this routine
- The developer explicitly requests a review or wrap-up (e.g. `/neat`, "整理一下", "sync up", "tidy up")

Steps:

1. Update TASKS.md — mark completed tasks, note any new blockers
2. Update PROJECT_STATUS.md — summarize what was done, what's next
3. Redundancy check — scan project files (code, docs, configs) for:
   - Duplicate logic or dead code that can be safely removed
   - Outdated comments or docs that no longer reflect reality
   - Unnecessary dependencies or unused imports
   - Any bloat that does not serve project integrity

   Remove what is safe to remove. Keep the project lean.
4. If a task is fully accepted, commit with a clear message
5. Push only when changes are stable and accepted, so the other machine can pull cleanly

The `neat-freak` Claude skill (triggered via `/neat` or "整理一下") can drive this routine end-to-end when invoked.

## Prohibitions

- NO model other than Deepseek
- NO terminal/shell execution within the app (v0 scope)
- NO `git reset` / `git revert` for undo
- NO changing CSS approach without a recorded decision in DECISIONS.md
- NO external state management libraries (Redux, Zustand, etc.)
- NO committing without task acceptance
- NO modifying files outside the project workspace within the app
- NO auto-running code or commands without user confirmation in the app
- NO hardcoding project phase or status in this file — read TASKS.md and PROJECT_STATUS.md instead
- NO committing `skills/`, `.qilin/`, `.env*`, snapshots, API keys, or end-user6fec59b5 project contents
