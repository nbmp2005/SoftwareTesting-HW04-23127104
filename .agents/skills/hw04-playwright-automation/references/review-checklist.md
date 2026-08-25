# Automation review checklist

## Test meaning

- Each automated case maps to a declared requirement or oracle.
- Positive, negative, boundary, authorization, persistence, and state-transition risks are considered where relevant.
- Assertions verify the intended outcome, not only absence of errors.
- Every case can fail for the product behavior it claims to test.

## Reliability

- Tests use stable user-facing locators or agreed test IDs.
- No `waitForTimeout` or arbitrary sleep is used.
- Actions wait on observable readiness and assertions use Playwright auto-waiting.
- Tests do not depend on execution order or leaked account, cart, or order state.
- Setup and cleanup are bounded and failures preserve diagnostics.

## Data and security

- Dataset is external JSON/CSV and schema errors fail clearly.
- Case IDs are unique.
- Credentials and tokens come from ignored environment files.
- Generated identifiers avoid collisions during parallel runs.

## Cross-browser and evidence

- All three projects actually execute the feature.
- Browser-specific failures are not masked with broad skips or retries.
- Reports visibly contain student ID and ISO timestamp.
- Counts are derived from reports, not estimates.
- Screenshots, traces, and videos follow the configured retention policy.

## AI critique notes

For each correction, capture: AI output, defect, risk, human change, verification, and likely cause (missing context, ambiguous prompt, model limitation, or SUT characteristic).
