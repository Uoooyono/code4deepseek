# Tasks

**Last updated**: 2026-05-05  
**Current phase**: Phase 1, Visual Shell  

Task status values:

- `TODO`: not started.
- `DOING`: actively being worked.
- `BLOCKED`: cannot proceed without input or dependency.
- `DONE`: completed and verified.
- `DEFERRED`: intentionally postponed.

## Active Queue

| ID | Status | Priority | Task | Acceptance |
| --- | --- | --- | --- | --- |
| TASK-001 | TODO | P0 | Run Vite dev server and visually QA mock workbench | UI loads at `127.0.0.1:1420`; no blank screen, broken panels, or obvious overflow |
| TASK-002 | TODO | P0 | Implement workspace picker shell | User can trigger folder selection from UI; selected root appears in state |
| TASK-003 | TODO | P0 | Add Rust workspace path model and safety checks | Backend rejects paths outside workspace |
| TASK-004 | TODO | P0 | Replace mock file tree with real recursive listing | File tree renders real workspace files with basic ignores |
| TASK-005 | TODO | P0 | Read selected text file from workspace | Clicking a file displays real UTF-8 content |
| TASK-006 | TODO | P1 | Add binary/large-file guards | Unsupported files show a clear non-destructive state |

## Completed Control Tasks

| ID | Status | Task | Verification |
| --- | --- | --- | --- |
| TASK-C001 | DONE | Create project-level `AGENTS.md` for future agents and parallel work | `npm run build`; docs linked from README/control/context |
| TASK-C002 | DONE | Create `grill-me` Codex skill | Skill files created under `skills/grill-me` |

## Phase 1: Visual Shell

| ID | Status | Task |
| --- | --- | --- |
| TASK-001 | TODO | Browser visual QA for existing mock workbench |
| TASK-007 | TODO | Review design against `anthropic-brand-style` skill |
| TASK-008 | TODO | Adjust responsive constraints for narrower desktop widths |
| TASK-009 | TODO | Add clear empty state for no workspace selected |

## Phase 2: Local Workspace

| ID | Status | Task |
| --- | --- | --- |
| TASK-002 | TODO | Workspace picker shell |
| TASK-003 | TODO | Workspace path safety model |
| TASK-004 | TODO | Recursive file listing |
| TASK-005 | TODO | Text file reading |
| TASK-006 | TODO | Binary and size guards |

## Phase 3: Search & Replace Engine

| ID | Status | Task |
| --- | --- | --- |
| TASK-010 | TODO | Define Rust/TypeScript `EditProposal` contract |
| TASK-011 | TODO | Implement unique `oldStr` match validation |
| TASK-012 | TODO | Generate diff preview from proposal |
| TASK-013 | TODO | Save snapshot before write |
| TASK-014 | TODO | Apply write only after user confirmation |
| TASK-015 | TODO | Undo latest applied edit |

## Phase 4: Mock Deepseek Harness

| ID | Status | Task |
| --- | --- | --- |
| TASK-016 | TODO | Replace hardcoded proposal with mock harness function |
| TASK-017 | TODO | Add invalid proposal demo states |
| TASK-018 | TODO | Connect user request input to proposal flow |

## Phase 5: Real Deepseek Harness

| ID | Status | Task |
| --- | --- | --- |
| TASK-019 | TODO | Add API key configuration path without committing secrets |
| TASK-020 | TODO | Implement Deepseek request command |
| TASK-021 | TODO | Parse JSON proposal response |
| TASK-022 | TODO | Retry after invalid JSON |
| TASK-023 | TODO | Retry after failed `oldStr` validation |

## Deferred

| ID | Status | Task | Reason |
| --- | --- | --- | --- |
| TASK-D001 | DEFERRED | Terminal command execution | Not required for v0 safe edit loop |
| TASK-D002 | DEFERRED | RAG / embedding index | Not required before basic workspace reading |
| TASK-D003 | DEFERRED | Skill runtime UI | Skill system is not v0 core |
| TASK-D004 | DEFERRED | Multi-model support | Project is Deepseek-only |
| TASK-D005 | DEFERRED | Multimodal features | Outside current demo |

## Completion Rule

Move a task to `DONE` only after:

1. Acceptance criteria are met.
2. Relevant verification command or manual check is recorded.
3. Any changed behavior is reflected in docs when needed.
