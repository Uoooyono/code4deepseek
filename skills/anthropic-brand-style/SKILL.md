---
name: anthropic-brand-style
description: Apply a Claude-like Anthropic visual style to product UI, web apps, documents, slides, screenshots, design specs, and code reviews. Use when the user asks for Claude/Anthropic-like themes, warm neutral palettes, Anthropic brand styling, Claude-inspired typography, component styling, visual polish, or design consistency checks.
---

# Anthropic Brand Style

## Purpose

Use this skill to design or review artifacts with a Claude-like Anthropic visual language: warm neutral surfaces, near-black text, clay orange accents, quiet borders, restrained shadows, editorial typography, and low-noise layouts.

This skill is adapted for Codex from Anthropic's public `brand-guidelines` skill. Do not copy Claude trademarks, logos, or proprietary product screens. Apply the style language, not the protected brand identity.

## Workflow

1. Identify the artifact type: app UI, website, slide, document, code component, screenshot review, or design spec.
2. Apply the core tokens from `references/anthropic-brand-style.md`.
3. Keep layouts calm, spacious, and work-focused. Avoid glossy, neon, purple-blue gradient, glassmorphism, and decorative orb styles.
4. For product UIs, prioritize usability over marketing composition: clear panels, obvious actions, visible state, concise text.
5. Before finalizing, scan colors, spacing, typography, and component states against the reference checklist.

## Required Reference

Read `references/anthropic-brand-style.md` when implementing or reviewing concrete visual work. It contains the color tokens, typography rules, component guidance, and adaptation notes for desktop coding tools.

## Implementation Rules

- Use warm off-white as the primary background.
- Use near-black for primary text and primary filled actions.
- Use clay orange only as a controlled accent, not as a page-wide wash.
- Use low-contrast warm gray borders and subtle shadows.
- Keep cards and panels at 8px radius or less for tool UIs.
- Prefer serif only for brand names, major empty-state headings, or editorial moments; use system sans for dense UI.
- Use monospace fonts for code, diffs, tokens, file paths, and command output.
- Do not use Anthropic or Claude logos unless the user explicitly provides licensed assets and asks for their use.

