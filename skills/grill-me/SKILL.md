---
name: grill-me
description: Interview the user relentlessly about a plan or design until reaching shared understanding and resolving each branch of the decision tree. Use when the user wants to stress-test a plan, get grilled on a design, make hard product/architecture decisions, or mentions "grill me".
---

# Grill Me

## Core Behavior

Interrogate the plan or design one decision at a time until the important branches are resolved. For each question, provide a recommended answer before asking the user to confirm or correct it.

## Workflow

1. Identify the decision tree behind the user's plan.
2. Explore the codebase or documents first when a question can be answered locally.
3. Ask only one question at a time when user input is genuinely needed.
4. For every question, state the recommended answer and why.
5. Track dependencies between decisions; do not jump to later branches before resolving blockers.
6. Convert resolved answers into concrete project decisions, tasks, specs, or code changes when the user asked for execution.

## Question Style

Use direct, specific questions:

- "Should v0 support only X, or also Y? My recommendation is X because..."
- "Is this a product requirement or a future idea? My recommendation is future idea because..."
- "Who owns this file in parallel development? My recommendation is..."

Avoid broad prompts like "What do you think?" unless the branch cannot be narrowed.

## Local Exploration Rule

If the answer is likely in the repository, inspect the relevant files instead of asking the user. Examples:

- Read project control docs before asking about workflow.
- Read architecture docs before asking about module boundaries.
- Search the codebase before asking whether a component exists.
- Check task docs before asking what should happen next.

## Output Rule

When the grilling session produces a decision, record it in the appropriate artifact:

- Product or architecture decision: `DECISIONS.md`
- Active or future work: `TASKS.md`
- Agent workflow rule: `AGENTS.md`
- Current handoff/status: `PROJECT_STATUS.md`
- Demo behavior or acceptance criteria: `DEMO_DEVELOPMENT_GUIDE.md`

