# Agent Context

Compact onboarding for a new Claude Code session. Read [CLAUDE.md](CLAUDE.md) first — it owns all project rules. This file only summarizes the **current factual state** of the codebase.

## Project Identity

`code4deepseek` is a Deepseek-only desktop AI coding workbench. It is not a general multi-model coding agent. The first demo validates a safe local file editing loop:

1. choose workspace
2. show file tree
3. read selected file
4. ask Deepseek for Search & Replace proposal
5. validate exact unique `oldStr`
6. preview diff
7. confirm write
8. snapshot before write
9. undo latest edit

## Current Stack

- Tauri v2 / Rust backend
- React 19 + TypeScript / Vite 7
- lucide-react icons
- Hand-written CSS

## Current State (as of 2026-05-06)

The app currently has:

- static React workbench shell
- mock file tree
- mock file content
- mock edit proposal (now in array shape per DEMO_DEVELOPMENT_GUIDE §5)
- mock apply/undo state
- Tauri project shell

The app does not yet have:

- real folder picker wiring
- real file listing
- real file reading
- Search & Replace engine
- internal snapshots
- Deepseek API calls

## Key Files

- `README.md` — human entry point.
- `CLAUDE.md` — mandatory project-level agent rules.
- `PROJECT_CONTROL.md` — lifecycle phases, change control, risk register.
- `PROJECT_STATUS.md` — last-session handoff.
- `TASKS.md` — task board.
- `DEMO_DEVELOPMENT_GUIDE.md` — v0 demo spec.
- `DECISIONS.md` — decision log.
- `PRODUCT_OVERVIEW.md` — Chinese product overview for non-technical reading.
- `src/types.ts` — TypeScript type contracts.
- `src/App.tsx` — current mock workbench.
- `src/styles.css` — current visual system.
- `src-tauri/` — Tauri shell.

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run tauri:dev
git status --short
```

## First Move

```bash
git status --short
git pull
```

Then read `PROJECT_STATUS.md` and pick a task from `TASKS.md`.
