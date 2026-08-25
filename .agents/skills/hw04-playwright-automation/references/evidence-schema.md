# Evidence schema

## Run record

Record `run_id`, `student_id`, `started_at`, `finished_at`, `commit_sha`, `feature_id`, `browser_project`, `command`, `base_url`, `environment`, `total`, `passed`, `failed`, `skipped`, `report_path`, and `notes`.

## AI interaction

Record tool/model, ISO date-time with timezone, purpose, exact prompt, material output or link to saved output, human review, accepted or rejected changes, and affected files. Large raw outputs may be kept in a linked artifact, but the audit must remain navigable.

## Defect

Record defect ID/title, linked test ID, environment/build/commit, preconditions, exact reproduction steps, expected result, actual result, severity/priority rationale, reproducibility, screenshot path, trace/report path, and GitHub Issue URL.

## Unautomated case

Record case ID, reason, attempted approach, evidence, risk, and recommended next action. Lack of time alone is not a technical explanation.
