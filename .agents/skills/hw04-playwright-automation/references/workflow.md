# Feature automation workflow

## 1. Discover

Inspect the SUT, existing tests, HW02 cases, configuration, seed data, routes, validation messages, and roles. Write an assumption register. Do not generate the final suite until expected behavior is traceable to a requirement or a clearly labelled exploratory oracle.

## 2. Model the feature

Create at least 12 cases using equivalence partitions, boundary values, decision rules, state transitions, and negative paths as relevant. Assign stable IDs such as `FR07-CART-001`. For every case record preconditions, input, steps, oracle, cleanup, priority, and automation status.

## 3. Externalize data

Store variable inputs and expected outputs in `tests/data/<feature>.json` or `.csv`. Include a case ID and description in every row. Keep secrets in environment variables; use synthetic accounts and never commit real credentials.

## 4. Implement incrementally

Build one thin happy path first, run it, then add negative and edge cases in small batches. Use accessible locators and reusable helpers only when repetition is real. Avoid abstractions that obscure the case ID or assertion.

Use at least three assertion families, for example:

- visibility/text: `toBeVisible`, `toContainText`;
- URL/navigation: `toHaveURL`;
- value/state/count: `toHaveValue`, `toBeDisabled`, `toHaveCount`;
- response/data invariant when appropriate.

## 5. Review

Apply `review-checklist.md`. Record each AI defect with original behavior, correction, rationale, and suspected cause. Add missing edge cases based on the feature model, not merely code coverage.

## 6. Execute

Run the selected feature on all three configured browser projects. Preserve command, start/end ISO timestamps, environment, student ID, commit SHA, browser/project, counts, report path, and failure evidence. Generate separate HTML report directories or an aggregated report whose browser projects are visibly distinguishable.

## 7. Triage

Reproduce a failure in isolation, then in the full relevant suite. Distinguish product defect, test defect, environment defect, and inconclusive result. File a GitHub Issue only for a supported product defect and attach a real screenshot.

## 8. Document

Update the main report, summary, gap analysis, AI audit, bug report, and submission checklist from inspected artifacts. Leave `[TODO: ...]` for evidence that only the student can create, such as narrated video and public URLs.
