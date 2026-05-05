# Project Status

**Date**: 2026-05-05  
**Branch**: `main`  
**Remote**: `git@github.com:Uoooyono/code4deepseek.git`  
**Latest pushed code commit before project-control docs**: `cffd834 Add npm lockfile and React types`  

## Summary

Today converted the project from a strategy memo into a controlled Git project with a runnable React/Tauri demo shell, a Deepseek-only product direction, Claude-like design requirements, and project-management documents for continuing work tomorrow. The final control-doc commit should be checked with `git log --oneline -1`.

## Completed Today

- Read and reorganized the original project decision memo.
- Created `DEMO_DEVELOPMENT_GUIDE.md` as the v0 demo specification.
- Translated the demo guide into Chinese.
- Changed strategy from multi-model / MiMo-aware planning to **Deepseek-only**.
- Added Claude / Anthropic-like visual design requirements.
- Created a reusable Codex skill: `skills/anthropic-brand-style`.
- Copied that skill to `/Users/yuye/.codex/skills/anthropic-brand-style`.
- Created a reusable Codex skill: `skills/grill-me`.
- Added `AGENTS.md` as the project-level instruction file for future agents and parallel workers.
- Created a Vite + React + Tauri v2 app shell.
- Implemented static mock workbench UI:
  - file tree panel
  - selected file preview
  - diff preview
  - Deepseek proposal panel
  - apply/undo mock controls
- Installed npm dependencies.
- Added `package-lock.json`.
- Fixed React TypeScript declarations.
- Verified `npm run build` passes.
- Initialized Git repository.
- Merged remote initial `README.md` commit without force-push.
- Pushed project to GitHub.

## Current Working State

The project is currently a static frontend demo shell. It does not yet read real files or call Deepseek.

Known working commands:

```bash
npm install
npm run build
```

Expected next command:

```bash
npm run dev
```

Then inspect `http://127.0.0.1:1420`.

## Current Git State

At handoff, the tracked working tree was clean. Ignored local artifacts may exist:

- `.DS_Store`
- `dist/`
- `node_modules/`

These are expected and should not be committed.

## Blockers Resolved

- Previous approval failures were caused by the automatic approval reviewer calling a model not allowed by the API key.
- Git permissions were corrected.
- GitHub HTTPS auth failed, but SSH auth worked.
- Remote already had a README commit; it was merged normally rather than force-pushed.
- npm registry became reachable after permission changes.

## Open Issues

- UI has not yet been visually inspected in a browser after successful npm install.
- Tauri dev shell has not yet been launched.
- Rust backend has no real commands yet.
- File tree uses mock data.
- Apply/undo are mock state changes only.
- Deepseek harness is not implemented.

## Tomorrow Start Plan

1. Run `git status --short`.
2. Read `AGENTS.md`.
3. Run `npm run dev`.
4. Open `http://127.0.0.1:1420` and visually inspect the mock workbench.
5. Fix layout issues before adding backend behavior.
6. Start `TASK-001`: visual QA and shell stabilization.
7. Then start `TASK-002`: workspace picker and real file listing.

## Verification Log

2026-05-05:

```bash
npm ls --depth=0
npm run build
git status --short --ignored
git push
```

Results:

- npm dependencies installed.
- Build passed.
- Ignored artifacts stayed ignored.
- Push to GitHub succeeded.
