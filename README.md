# code4deepseek

Deepseek-only desktop AI coding workbench.

This project is a Tauri v2 + React + Rust desktop app that explores a dedicated coding harness for Deepseek. The first demo focuses on one safe loop: open a local workspace, read a file, ask Deepseek for a Search & Replace edit, preview the diff, confirm the write, and undo the latest change.

## Current Status

As of 2026-05-05:

- Product strategy is **Deepseek-only**.
- Visual direction is Claude / Anthropic-like: warm neutral surfaces, near-black text, clay orange accents, quiet borders, and workbench-first layout.
- Static React workbench shell exists.
- Tauri v2 project shell exists.
- npm dependencies are installed and locked.
- `npm run build` passes.
- Real workspace selection, file reading, edit validation, snapshots, and Deepseek API integration are not implemented yet.

## Quick Start

```bash
npm install
npm run dev
```

Build check:

```bash
npm run build
```

Tauri dev shell:

```bash
npm run tauri:dev
```

## Project Documents

- [AGENTS.md](AGENTS.md): project-level instructions for all future agents and parallel workers.
- [PROJECT_CONTROL.md](PROJECT_CONTROL.md): full-cycle project management rules.
- [PROJECT_STATUS.md](PROJECT_STATUS.md): current state, today's recap, and next-session handoff.
- [TASKS.md](TASKS.md): task board and backlog.
- [CONTEXT.md](CONTEXT.md): shared context for future Codex / Claude Code / Deepseek sessions.
- [DECISIONS.md](DECISIONS.md): decision log.
- [DEMO_DEVELOPMENT_GUIDE.md](DEMO_DEVELOPMENT_GUIDE.md): demo specification and design requirements.
- [国产大模型桌面 AI 编程工具——项目决策文档.md](国产大模型桌面%20AI%20编程工具——项目决策文档.md): original strategy archive with later revisions.

## Repository Layout

```text
src/                         React frontend demo shell
src-tauri/                   Tauri v2 Rust app shell
skills/anthropic-brand-style Codex skill for Claude-like visual style
skills/grill-me              Codex skill for plan/design interrogation
dist/                        Ignored build output
node_modules/                Ignored dependencies
```

## Working Rule

Before adding a feature, state which step of the v0 demo loop it serves. If it does not serve the v0 loop, defer it.
