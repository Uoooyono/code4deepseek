# Agent Context

**Use this file when starting a new Codex / Claude Code / Deepseek session.**

First read `AGENTS.md`. It is the mandatory project-level instruction file for all agents and parallel workers.

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

- Tauri v2
- React
- TypeScript
- Rust
- Vite
- lucide-react icons

## Current State

The app currently has:

- static React workbench shell
- mock file tree
- mock file content
- mock edit proposal
- mock apply/undo state
- Tauri project shell
- working npm build

The app does not yet have:

- real folder picker wiring
- real file listing
- real file reading
- Search & Replace engine
- internal snapshots
- Deepseek API calls

## Critical Product Rules

- Deepseek-only. Do not add model selection UI or generic provider abstractions.
- No file write without validation, diff preview, and explicit confirmation.
- No destructive Git rollback.
- No terminal execution in v0.
- No RAG, multimodal, Skill UI, or multi-model features in v0.
- Every feature must map to the v0 demo loop.

## Design Rules

Use the `anthropic-brand-style` skill for UI design work.

Key visual rules:

- warm off-white background
- near-black primary text and primary button
- clay orange accent
- quiet warm gray borders
- restrained shadows
- 8px-or-less panel radius
- workbench-first layout, not landing page
- no purple-blue gradients, glassmorphism, bokeh, neon, or decorative orbs

## Useful Commands

```bash
npm install
npm run dev
npm run build
npm run tauri:dev
git status --short
```

## Key Files

- `README.md`: human entry point.
- `AGENTS.md`: mandatory project-level agent instructions.
- `PROJECT_CONTROL.md`: project operating system.
- `PROJECT_STATUS.md`: current state and handoff.
- `TASKS.md`: task board.
- `DEMO_DEVELOPMENT_GUIDE.md`: v0 demo spec.
- `DECISIONS.md`: decision log.
- `src/App.tsx`: current mock workbench.
- `src/styles.css`: current visual system.
- `src-tauri/`: Tauri shell.
- `skills/anthropic-brand-style/`: Codex design skill.
- `skills/grill-me/`: Codex skill for plan/design interrogation.

## Tomorrow's Recommended First Move

Run:

```bash
git status --short
npm run dev
```

Open `http://127.0.0.1:1420`, inspect the UI, then start `TASK-001`.
