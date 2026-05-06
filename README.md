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

- [CLAUDE.md](CLAUDE.md) — project-level rules for Claude Code (single source of truth).
- [PROJECT_CONTROL.md](PROJECT_CONTROL.md) — lifecycle phases, change control, risk register.
- [PROJECT_STATUS.md](PROJECT_STATUS.md) — current state and next-session handoff.
- [TASKS.md](TASKS.md) — task board and backlog.
- [CONTEXT.md](CONTEXT.md) — compact onboarding snapshot.
- [DECISIONS.md](DECISIONS.md) — decision log.
- [DEMO_DEVELOPMENT_GUIDE.md](DEMO_DEVELOPMENT_GUIDE.md) — v0 demo specification.
- [PRODUCT_OVERVIEW.md](PRODUCT_OVERVIEW.md) — 中文产品总览（面向非技术读者）。
- [docs/archive/](docs/archive/) — 原始战略文档存档。

## Repository Layout

```text
src/          React frontend demo shell
src-tauri/    Tauri v2 Rust app shell
docs/         Long-form docs and archive
dist/         Ignored build output
node_modules/ Ignored dependencies
```

> Claude / Codex skills live under `~/.claude/skills/` (or each agent's equivalent), not in this repo. `.gitignore` keeps `skills/` excluded as a defensive entry.

## Working Rule

Before adding a feature, state which step of the v0 demo loop it serves. If it does not serve the v0 loop, defer it.
