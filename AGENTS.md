# Agent Instructions

**Project**: `code4deepseek`  
**Last updated**: 2026-05-05  
**Applies to**: all AI agents, subagents, and parallel workers operating in this repository.  

This file is the project-level operating contract. Read it before changing code, docs, configuration, or project state.

## 1. Non-Negotiable Product Rules

- This project is **Deepseek-only**. Do not add model switchers, generic provider abstractions, MiMo support, model marketplaces, or multi-model routing.
- v0 exists to prove one loop: choose workspace, show files, read file, request Deepseek Search & Replace proposal, validate, preview diff, confirm write, snapshot, undo latest edit.
- No file write may happen without validation, diff preview, and explicit user confirmation.
- Do not use destructive Git operations as an app rollback mechanism.
- Do not add terminal execution, RAG, multimodal features, or Skill UI to v0 unless the project control docs are explicitly revised.
- Every feature must identify which v0 demo-loop step it serves. If it cannot, defer it.

## 2. Required Reading Order

At the start of every session, read only what is needed, in this order:

1. `AGENTS.md` for operating rules.
2. `PROJECT_STATUS.md` for current state and handoff.
3. `TASKS.md` for active task IDs and backlog.
4. `PROJECT_CONTROL.md` for lifecycle, gates, and workflow.
5. `DEMO_DEVELOPMENT_GUIDE.md` for v0 behavior, architecture, design, and acceptance criteria.
6. `CONTEXT.md` for compact agent onboarding.
7. `DECISIONS.md` when changing product, architecture, workflow, safety, or design direction.
8. `国产大模型桌面 AI 编程工具——项目决策文档.md` only as historical strategy archive.

Do not bulk-load every document by default. Read deeper only when the task requires it.

## 3. Skill Usage

- Use `skills/anthropic-brand-style` for visual design, UI polish, screenshot review, and Claude-like styling decisions.
- Use `skills/grill-me` when stress-testing a plan, resolving design branches, or when the user says "grill me".
- If a question can be answered by reading project docs or code, inspect locally instead of asking the user.

## 4. Single-Agent Workflow

Before edits:

1. Run `git status --short`.
2. Pick one task ID from `TASKS.md`, or create one if the user request is new.
3. State which v0 demo-loop step the work serves.
4. Identify likely files/modules to touch.

During edits:

1. Keep changes scoped to the task.
2. Follow existing project patterns before adding abstractions.
3. Do not modify unrelated files.
4. Update docs if status, tasks, or decisions changed.

After edits:

1. Run the relevant verification gate.
2. Update `TASKS.md` task status if appropriate.
3. Update `PROJECT_STATUS.md` with handoff-impacting changes.
4. Add to `DECISIONS.md` for durable product/architecture/workflow decisions.
5. Commit and push only when requested or at a session boundary.

## 5. Parallel-Agent Workflow

Parallel work requires one coordinator. The coordinator owns task decomposition, shared docs, integration, verification, and final push.

### Coordinator Rules

- Assign each worker exactly one task ID.
- Give each worker a disjoint write scope.
- Record task ownership in `TASKS.md` before or immediately after dispatch.
- Do not let multiple workers edit the same file unless one is explicitly designated as integrator.
- Keep `AGENTS.md`, `PROJECT_CONTROL.md`, `PROJECT_STATUS.md`, `TASKS.md`, and `DECISIONS.md` under coordinator ownership.
- Integrate worker changes only after reviewing changed files and verification notes.

### Worker Rules

Each worker must receive:

- Task ID.
- Goal.
- Acceptance criteria.
- Allowed write paths.
- Forbidden write paths.
- Required verification command.

Each worker must return:

- Files changed.
- Verification performed.
- Open questions or blockers.
- Any behavior or docs that the coordinator must update.

Workers must not:

- Revert or overwrite changes outside their scope.
- Modify project-control docs unless assigned.
- Add dependencies without coordinator approval.
- Commit, push, or change remotes unless assigned.
- Introduce multi-model support or out-of-v0 features.

### Recommended Parallel Slices

Good parallel splits:

- Frontend visual polish: `src/App.tsx`, `src/styles.css`
- Rust workspace commands: `src-tauri/src/*`
- Type contracts and mock data: `src/types.ts`, `src/mockWorkspace.ts`
- Documentation/control updates: root Markdown files
- Skill updates: `skills/*`

Bad parallel splits:

- Two agents editing `src/App.tsx` at the same time.
- One agent changing data contracts while another implements backend consumers without coordination.
- Any worker editing task/status docs while another worker uses them as source of truth.

## 6. Design Constraints

Use Claude / Anthropic-like visual language without copying logos or protected brand assets.

Required visual direction:

- warm off-white background
- near-black primary text
- clay orange accents
- quiet warm gray borders
- restrained shadows
- workbench-first layout
- panels/cards at 8px radius or less for tool surfaces
- lucide icons for controls where applicable

Avoid:

- purple-blue gradients
- cold dark-blue dashboards
- glassmorphism
- decorative orbs, bokeh, neon, or glossy effects
- landing-page-first layouts for the app

## 7. Code Boundaries

Current stack:

- React + TypeScript frontend in `src/`
- Tauri v2 / Rust backend in `src-tauri/`
- Vite build
- lucide-react icons

Current implementation state:

- `src/App.tsx` is a static mock workbench.
- `src/mockWorkspace.ts` holds mock files and proposal.
- `src/styles.css` holds the current visual system.
- `src-tauri/` is a shell with no real workspace commands yet.

Do not create large agent-core abstractions before the v0 loop works.

## 8. Verification Gates

Docs-only change:

```bash
git status --short
```

Frontend or TypeScript change:

```bash
npm run build
```

Visual UI check:

```bash
npm run dev
```

Then inspect `http://127.0.0.1:1420`.

Tauri/Rust behavior change:

```bash
npm run tauri:dev
```

If a verification command cannot run, record the reason in `PROJECT_STATUS.md`.

## 9. Git and Filesystem Rules

- Main branch is `main`.
- Never force-push unless the user explicitly approves.
- Do not commit `node_modules/`, `dist/`, `.DS_Store`, `.env*`, `.qilin/`, or local snapshots.
- Do not commit API keys or user project contents.
- Do not run destructive commands such as `git reset --hard` unless explicitly requested.
- Preserve unrelated user changes.

## 10. End-of-Session Handoff

Before ending substantial work:

1. Update `PROJECT_STATUS.md`.
2. Update `TASKS.md`.
3. Update `DECISIONS.md` if a durable decision changed.
4. Run the relevant verification gate.
5. Commit and push if the session produced stable changes.

Final response should include:

- What changed.
- Verification performed.
- Current task status.
- Next recommended task.

