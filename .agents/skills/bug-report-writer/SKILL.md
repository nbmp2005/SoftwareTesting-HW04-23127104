---
name: bug-report-writer
description: Triage a failed test or manually observed defect, verify real evidence, and append a complete HW04 product-bug entry to report/BUG_REPORT.md. Use only when a potential SUT defect needs formal reporting; do not use for unverified failures, test-script defects, or environment/configuration errors.
---

# Bug Report Writer

Create an evidence-backed product bug report without inventing execution facts.

## Gate before writing

Do not append a bug merely because an automated test failed. First establish that:

- The observed behavior contradicts a requirement-based oracle.
- An isolated rerun or manual reproduction confirms the behavior.
- Test data, selectors, assertions, browser setup, services, and environment have been checked.
- A real screenshot exists and visibly supports the reported defect.

Treat selector/assertion mistakes, stale test data, missing services, timeouts without a demonstrated SUT defect, and Playwright configuration failures as test or environment issues. Explain those findings instead of writing a product bug.

## Evidence rules

- Verify that the screenshot file exists and inspect it before citing it. Never generate, alter, or fabricate evidence.
- Use the actual HTML report, trace, video, or log paths when available.
- Record the reproduction timestamp from the real run or artifact. Do not substitute the current time unless the reproduction is happening now and the user confirms it.
- Record reproducibility only from observed attempts, such as `3/3`. Never infer it from a single failure.
- Use real SUT and test-repository commits obtained from the relevant repositories. Do not guess hashes.
- Require a public GitHub Issue URL for a completed report. Creating an issue is an external action and requires explicit user authorization. If it is unavailable, keep the report as a clearly identified draft only when the user asks for a draft.

If the screenshot or product-defect triage is missing, pause and request the missing evidence instead of appending an entry.

## Write workflow

1. Read `report/BUG_REPORT.md` and preserve all existing content.
2. Find the highest existing concrete heading matching `BUG-[0-9][0-9][0-9]`; ignore the template heading `BUG-[NNN]`. Assign the next zero-padded ID.
3. Derive a concise title from the exact defect, not from the failed assertion.
4. Ground Expected result in the FR or another documented oracle. Record Actual result exactly as observed.
5. Explain triage: isolated rerun, manual confirmation, cross-browser comparison when performed, and why script/data/environment causes were excluded.
6. Replace the placeholder Summary row if it is still present, or append a new Summary row for the bug.
7. Append the detailed section at the end of `report/BUG_REPORT.md` using the exact structure below.
8. Re-read the appended entry and verify that every factual value is supported by evidence. Do not mark TODO fields as complete.

## Required format

```markdown
## BUG-[NNN] – [Concise title]

| Field | Value |
|---|---|
| Feature / test ID | [TODO] |
| SUT build/commit | [TODO] |
| Test repo commit | [TODO] |
| Environment/browser | [TODO] |
| Severity / priority | [TODO + rationale] |
| Reproducibility | [e.g. 3/3; do not guess] |
| GitHub Issue | [TODO: public URL] |

### Preconditions

[TODO]

### Steps to reproduce

1. [TODO]
2. [TODO]
3. [TODO]

### Expected result

[TODO: requirement-based oracle]

### Actual result

[TODO: exact observation]

### Evidence

- Screenshot: [TODO: path/URL]
- HTML report: [TODO]
- Trace/video/log: [TODO]
- ISO reproduction time: [TODO]

### Triage notes

[TODO: isolated rerun, cross-browser comparison, data/environment checks, why this is a product defect.]

### Workaround/impact

[TODO]
```

For a final report, replace every TODO with verified information. A draft must be labeled `Draft — evidence incomplete` and must never be presented as a confirmed bug.
