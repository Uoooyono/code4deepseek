# Project Control

**Last updated**: 2026-05-05  
**Project mode**: Slow, controlled demo development  
**Execution strategy**: Deepseek-only  

This document defines how the project is controlled across the full lifecycle: planning, design, implementation, validation, release, review, and continuation across coding sessions.

## 1. Source of Truth

Use these documents in this order:

1. `PROJECT_STATUS.md` for current state and next-session handoff.
2. `TASKS.md` for active work and backlog.
3. `DEMO_DEVELOPMENT_GUIDE.md` for v0 product, architecture, design, and acceptance criteria.
4. `CONTEXT.md` for AI-agent onboarding.
5. `DECISIONS.md` for historical decisions and rationale.
6. `国产大模型桌面 AI 编程工具——项目决策文档.md` only as strategy archive.

When documents conflict, the newer control documents override the original strategy archive.

## 2. Lifecycle

### Phase 0: Foundation

Goal: make the project controllable and runnable.

Exit criteria:

- Git repository initialized and pushed.
- npm dependencies installed and locked.
- Static Vite build passes.
- Project control documents exist.
- Design skill exists and is available.

Status: completed on 2026-05-05.

### Phase 1: Visual Shell

Goal: make the first screen usable and visually aligned with the Claude-like direction.

Exit criteria:

- `npm run dev` opens the workbench UI.
- Browser screenshot confirms no blank screen, broken layout, or obvious overflow.
- Main panels are visible: file tree, current file, diff preview, Deepseek proposal.
- Design uses the approved warm neutral palette.

Status: next.

### Phase 2: Local Workspace

Goal: replace mock file data with real local workspace data.

Exit criteria:

- User can choose a workspace directory.
- App lists files inside the workspace.
- User can select and read a text file.
- Path traversal outside the workspace is blocked.

### Phase 3: Search & Replace Engine

Goal: validate, preview, apply, and undo a file edit without the real model.

Exit criteria:

- `oldStr` exact unique-match validation works.
- Diff preview is generated before write.
- File snapshot is saved before write.
- Apply writes only after explicit confirmation.
- Undo restores the exact previous content.

### Phase 4: Mock Deepseek Harness

Goal: connect the chat/proposal flow without depending on the network API.

Exit criteria:

- Mock harness returns structured edit proposals.
- Invalid proposals are blocked.
- The full offline demo loop works.

### Phase 5: Real Deepseek Harness

Goal: call Deepseek and turn responses into safe edit proposals.

Exit criteria:

- API key configuration exists without committing secrets.
- Deepseek returns parseable JSON proposals for simple tasks.
- Validation failures trigger repair/retry.
- Invalid model output cannot write files.

### Phase 6: Demo Stabilization

Goal: make the demo reliable enough to show.

Exit criteria:

- Fresh clone setup works from README.
- `npm run build` passes.
- Demo script succeeds on a sample project.
- Known limitations are documented.

## 3. Daily Operating Loop

Start of session:

1. Read `PROJECT_STATUS.md`.
2. Read the top of `TASKS.md`.
3. Run `git status --short`.
4. If dependencies changed, run `npm install`.
5. Run the smallest relevant verification command before changing behavior.

During session:

1. Work from one task ID in `TASKS.md`.
2. Keep changes scoped to that task.
3. Update docs when a decision or status changes.
4. Run verification before committing.

End of session:

1. Update `PROJECT_STATUS.md`.
2. Update `TASKS.md`.
3. Add a decision to `DECISIONS.md` if product, architecture, security, design, or workflow changed.
4. Run relevant verification.
5. Commit and push.

## 4. Change Control

Every feature must answer:

- Which v0 demo-loop step does it serve?
- Which files/modules does it touch?
- What is the acceptance criterion?
- What command or manual check verifies it?

If the feature cannot answer these questions, defer it.

## 5. Quality Gates

Minimum gate for docs-only changes:

```bash
git status --short
```

Minimum gate for frontend/code changes:

```bash
npm run build
```

Minimum gate before showing UI:

```bash
npm run dev
```

Then inspect the page visually in a browser.

Minimum gate before Tauri-specific changes:

```bash
npm run tauri:dev
```

If a command cannot run, record the reason in `PROJECT_STATUS.md`.

## 6. Git Workflow

- Main branch: `main`.
- Commit small, coherent changes.
- Do not commit `node_modules/`, `dist/`, `.DS_Store`, `.env*`, or local snapshots.
- Push at the end of each completed session.
- Do not force-push unless explicitly approved.

## 7. Design Control

Use `skills/anthropic-brand-style` for Claude-like visual work.

Rules:

- Preserve the warm neutral palette.
- Keep the app workbench-first, not landing-page-first.
- Do not copy Claude logos or protected brand assets.
- Keep panels, controls, and text dense but calm.
- Avoid purple-blue gradients, glassmorphism, bokeh, neon, and decorative orbs.

## 8. Risk Register

| Risk | Impact | Control |
| --- | --- | --- |
| Scope expands into full coding agent | Demo stalls | Every task maps to v0 loop |
| Deepseek output is unstable | Unsafe edits | Validate JSON and `oldStr`; no write without preview |
| Tauri/Rust slows iteration | Slow progress | Build mock UI and pure editing engine first |
| Visual direction drifts | Weak product identity | Use `anthropic-brand-style` skill and visual QA |
| Secrets leak into repo | Security issue | `.env*` ignored; no API keys in docs or code |

