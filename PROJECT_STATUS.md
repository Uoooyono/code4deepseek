# Project Status

**Date**: 2026-05-06
**Branch**: `main`
**Remote**: `git@github.com:Uoooyono/code4deepseek.git`

## Summary

Today completed **Phase 0.5: Foundation Cleanup** — a refactor session that addressed redundancy and contract drift identified in the 2026-05-06 audit report. Key results: CLAUDE.md is now the single source of truth for project rules, the `EditProposal` type matches the model output schema, `skills/` is untracked, and a Chinese product overview was added for non-technical reading.

## Completed Today (2026-05-06)

- **CLAUDE.md** rewritten for single-developer + Claude Code workflow. Removed dual-agent (Codex / 于野) framing. Removed parallel-worker rules (single dev only). Removed `skills/` from File Map. Tightened Working Protocol around the two-machine sync model.
- **`.gitignore`** now includes `skills/`. The directory was untracked via `git rm -r --cached skills/`; local files preserved.
- **`src/types.ts`** refactored: `EditProposal` is now `{ summary, edits: EditOperation[], notes: string[] }` matching `DEMO_DEVELOPMENT_GUIDE.md §5`. New types: `EditOperation`, `DiffLine`, `DiffLineKind`.
- **`src/mockWorkspace.ts`** and **`src/App.tsx`** updated to consume the new array-shaped proposal via `proposal.edits[0]` (named `primaryEdit`).
- **PROJECT_CONTROL.md** trimmed: removed sections that duplicated CLAUDE.md (source-of-truth list, daily loop, quality gates, git rules, design control). Kept lifecycle phases, change control, risk register. Added Phase 0.5.
- **CONTEXT.md** trimmed to a factual snapshot: identity, stack, current state, key files, useful commands. Removed duplicated product/design rules.
- **README.md** doc map updated; removed `skills/` repository-layout entries; linked `PRODUCT_OVERVIEW.md` and `docs/archive/`.
- **DEMO_DEVELOPMENT_GUIDE.md §4** fixed: `Tailwind CSS` → `手写 CSS` (matches reality).
- **`国产大模型桌面 AI 编程工具——项目决策文档.md`** moved to `docs/archive/` via `git mv`.
- **PRODUCT_OVERVIEW.md** created (Chinese, non-technical product overview).
- **TASKS.md** logged Phase 0.5 cleanup tasks (TASK-F001 through TASK-F007) as DONE.

## Verification Performed

```bash
git status --short
npx tsc --noEmit          # PASSED
npm run build             # FAILED — environment issue (see below)
```

### Build environment note

The current development environment runs Node.js v16.15.1, but Vite 7 requires Node.js ≥20.19. `tsc --noEmit` passes cleanly, validating that the type contract refactor is correct. `npm run build` (which chains `tsc && vite build`) fails at the `vite build` step due to Node version mismatch, **not** due to project code. The same failure mode would occur on this environment regardless of today's changes.

Recommended action on the actual dev machine: run `node --version` first; if <20, install via nvm before running `npm run build`.

## Current Working State

Phase 0.5 changes pushed to `origin/main` as commit `e5b302e` on 2026-05-06.

- New: `PRODUCT_OVERVIEW.md`, `.mcp.json` (GitHub MCP server config; reads PAT from `$GITHUB_PERSONAL_ACCESS_TOKEN`)
- Renamed: `AGENTS.md` → `CLAUDE.md`; `国产大模型...项目决策文档.md` → `docs/archive/`
- Modified: `CLAUDE.md` (was AGENTS.md), `CONTEXT.md`, `DEMO_DEVELOPMENT_GUIDE.md`, `PROJECT_CONTROL.md`, `README.md`, `TASKS.md`, `.gitignore`, `src/types.ts`, `src/mockWorkspace.ts`, `src/App.tsx`, `DECISIONS.md`
- Project `skills/` directory removed; native versions installed system-wide at `~/.claude/skills/brand-guidelines/` (from anthropics/skills) and `~/.claude/skills/grill-me/`
- Local-only: `.claude/settings.local.json` (sandbox permissions, gitignored)

## GitHub Auth & MCP

- HTTPS PAT stored in macOS Keychain via `git config --global credential.helper osxkeychain` — `git push origin main` works without prompting
- `$GITHUB_PERSONAL_ACCESS_TOKEN` exported in `~/.zshrc` — consumed by `.mcp.json` for the hosted GitHub MCP at `https://api.githubcopilot.com/mcp/`
- PAT was created on 2026-05-06 with fine-grained scope: Contents/Issues/PRs RW on `Uoooyono/code4deepseek` only
- ⚠️ The original PAT was exposed in the Claude Code conversation log; rotate via https://github.com/settings/tokens before sharing the conversation

## Open Items

- UI not yet visually inspected in a browser (requires Node 20+ environment).
- Tauri dev shell not yet launched.
- Rust backend has no real Tauri commands.
- File tree still uses mock data.
- Apply/undo are mock state changes only.
- Deepseek harness not implemented.

## Tomorrow Start Plan

1. Run `git pull` (sync with the other machine if it pushed first).
2. Run `git status --short`.
3. Read `CLAUDE.md`.
4. Confirm Node ≥20: `node --version`.
5. Run `npm run dev`.
6. Open `http://127.0.0.1:1420` and visually inspect the workbench (TASK-001).
7. After visual QA, start TASK-002 (workspace picker shell).
