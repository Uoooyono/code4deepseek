# Project Control

**Last updated**: 2026-05-06
**Project mode**: Slow, controlled demo development

This document defines the project **lifecycle**, **change control**, and **risk register**.
For operating rules (startup routine, working protocol, verification gates, Git rules, design system), see [CLAUDE.md](CLAUDE.md). Rules live in CLAUDE.md only — this file does not duplicate them.

## 1. Lifecycle

### Phase 0: Foundation

Goal: make the project controllable and runnable.

Exit criteria:

- Git repository initialized and pushed.
- npm dependencies installed and locked.
- Static Vite build passes.
- Project control documents exist.
- `CLAUDE.md` exists as project-level agent instruction.

Status: completed on 2026-05-05.

### Phase 0.5: Foundation Cleanup

Goal: remove redundancy, fix type-contract drift, untrack local-only files, add non-technical product overview.

Exit criteria:

- CLAUDE.md is the single source of truth for project rules.
- `EditProposal` type contract matches `DEMO_DEVELOPMENT_GUIDE.md` §5 (array shape).
- `skills/` is gitignored and untracked.
- `PRODUCT_OVERVIEW.md` exists in Chinese for non-technical reading.
- `tsc --noEmit` passes.

Status: in progress.

### Phase 1: Visual Shell

Goal: make the first screen usable and visually aligned with the warm editor-tool direction.

Exit criteria:

- `npm run dev` opens the workbench UI.
- Browser screenshot confirms no blank screen, broken layout, or obvious overflow.
- Main panels are visible: file tree, current file, diff preview, Deepseek proposal.
- Design uses the approved warm neutral palette (per CLAUDE.md §Design System).

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

## 2. Change Control

Every feature must answer:

- Which v0 demo-loop step does it serve?
- Which files/modules does it touch?
- What is the acceptance criterion?
- What command or manual check verifies it?

If the feature cannot answer these questions, defer it.

## 3. Risk Register

| Risk | Impact | Control |
| --- | --- | --- |
| Scope expands into full coding agent | Demo stalls | Every task maps to v0 loop |
| Deepseek output is unstable | Unsafe edits | Validate JSON and `oldStr`; no write without preview |
| Tauri/Rust slows iteration | Slow progress | Build mock UI and pure editing engine first |
| Visual direction drifts | Weak product identity | Visual QA each phase against CLAUDE.md §Design System |
| Secrets leak into repo | Security issue | `.env*` and `skills/` ignored; no API keys in docs or code |
| Doc duplication causes drift | Conflicting agent instructions | Rules live only in CLAUDE.md; other docs reference it |
