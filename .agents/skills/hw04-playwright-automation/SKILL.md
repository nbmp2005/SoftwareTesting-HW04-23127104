---
name: hw04-playwright-automation
description: Build, review, execute, and document data-driven multi-browser Playwright tests for the EShop HW04 assignment. Use when working on an HW04 feature, test-data file, Playwright spec, execution evidence, AI audit, or automation gap analysis; do not invent runtime evidence or replace student review.
---

# HW04 Playwright Automation

Turn one selected EShop web feature into reviewable test artifacts and attributable execution evidence.

## Required inputs

Before changing tests, identify the student ID, selected FR, acceptance rules or HW02 cases, SUT start command/base URL, test accounts, and current artifact paths. If a missing value affects only documentation, retain an explicit `[TODO]`. If it would make a test unsafe or semantically wrong, ask for it.

## Workflow

Read [references/workflow.md](references/workflow.md) for generation, review, execution, and documentation steps. Read [references/review-checklist.md](references/review-checklist.md) whenever reviewing or changing a spec. Read [references/evidence-schema.md](references/evidence-schema.md) when producing reports, bug records, run summaries, or AI audit entries.

Preserve these invariants:

- Keep test inputs in external `.json` or `.csv` files; do not hide datasets in spec files.
- Automate at least 12 meaningful cases per selected feature and use at least three distinct assertion patterns across the feature.
- Run every feature on Chromium, Firefox, and WebKit unless the student explicitly selects an allowed alternative browser matrix.
- Prefer role, label, placeholder, text, and `data-testid` locators over CSS structure or XPath.
- Use web-first assertions and event/state-based waits; never add fixed sleeps as a stability fix.
- Keep tests independent and make setup/cleanup explicit.
- Preserve traceability from test ID to dataset row, automated test, result, and defect.
- Put `Run by: {StudentID}` and an ISO-8601 timestamp into genuine report metadata or visible report content.
- Record observed output precisely. Never claim a run, pass, failure, screenshot, issue, commit, or video exists without inspecting the artifact.
- Do not silently reinterpret a failing product assertion as a flaky test. Classify the failure using evidence.

## Human-review gate

Stop before declaring a feature complete. Present generated files, assumptions, unresolved gaps, and review findings to the student. Require the student to inspect business expectations and real execution evidence. The student owns the final judgment and submission.

## Output

For each feature, aim to leave a data file, Playwright spec and justified helpers, run commands, genuine HTML report paths, result counts, gap analysis, AI audit entry, and bug evidence for confirmed defects.
