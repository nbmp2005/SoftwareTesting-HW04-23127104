# HW04 – AI Automation Testing Report

## Document control

| Field | Value |
|---|---|
| Exercise | HW04-AI |
| Student ID | 23127104 |
| Student name | [TODO] |
| Class | [TODO] |
| Repository | [TODO: public URL] |
| SUT repository/version | `https://github.com/ttbhanh/eshop-sut` / [TODO commit SHA] |
| Report version/date | [TODO: version and ISO date] |

## 1. Declaration and scope

I use AI tools for the following tasks: requirement analysis, test design, data-driven Playwright generation, script review, documentation scaffolding, and gap analysis. All final scripts, expected results, executions, reports, bug conclusions, and submission artifacts were reviewed by me.

This report covers three EShop web features, one from each Pool A, B, and C. Pool D is out of scope.

## 2. Feature selection

| Pool | Selected feature | HW02 mapping | Reason/notes |
|---|---|---|---|
| A | [TODO: FR-XX and name] | [TODO: HW02 case IDs/link] | [TODO] |
| B | [TODO] | [TODO] | [TODO] |
| C | [TODO] | [TODO] | [TODO] |

[TODO: If HW02 was unavailable, explicitly state why and self-declare the selections here. Otherwise delete this note.]

## 3. Environment and tools

| Item | Version/configuration |
|---|---|
| OS | [TODO] |
| Node.js | [TODO] |
| Playwright/Selenium | [TODO] |
| Browsers | [TODO: versions for Chromium, Firefox, WebKit or allowed alternative] |
| Reporter | [TODO] |
| AI tool/model | [TODO] |
| Base URL | [TODO] |
| Test database/seed | [TODO] |
| Test commit SHA | [TODO] |

Secrets are provided through ignored environment configuration. No real credentials are committed.

## 4. Overall strategy

The workflow was requirement modelling → test design → external dataset → incremental automation → human review → three-browser execution → failure triage → documentation. Traceability is maintained as:

`FR → test case ID → data row → automated test → browser result → defect (if confirmed)`

The suite uses at least three assertion families: [TODO: list actual patterns and examples]. Test isolation/setup/cleanup strategy: [TODO].

## 5. Feature A – [TODO]

### 5.1 Business rules and risks

[TODO: concise rules, roles, preconditions, high-risk partitions/states. Cite source/HW02 artifacts.]

### 5.2 Test design and data

- Dataset: [TODO: relative path]
- Automated spec: [TODO]
- Number of designed/automated cases: [TODO; ≥12]
- Techniques used: [TODO: EP/BVA/decision table/state transition/etc.]

| Test ID | Type/technique | Scenario | Oracle | Automated |
|---|---|---|---|---|
| [TODO] | [TODO] | [TODO] | [TODO] | Yes/No |

### 5.3 Implementation and assertions

[TODO: explain fixture/page-object/data loader, locator policy, three actual assertion patterns and why they prove the feature.]

### 5.4 Human review of AI output

| AI issue | Risk | Human correction | Verification | Root cause |
|---|---|---|---|---|
| [TODO] | [TODO] | [TODO] | [TODO] | [prompt/model/SUT characteristic] |

### 5.5 Multi-browser results

| Browser | ISO run time | Total | Pass | Fail | Skip | HTML report |
|---|---|---:|---:|---:|---:|---|
| Chromium | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| Firefox | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |
| WebKit | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] | [TODO] |

### 5.6 Gaps and defects

[TODO: unautomated cases with technical reason/attempt/risk; confirmed bugs with GitHub Issue + screenshot links; otherwise state “No confirmed product defect” only after triage.]

## 6. Feature B – [TODO]

Use the same subsections as Feature A: business rules/risks; test design/data; implementation/assertions; human review; three-browser results; gaps/defects.

### 6.1 Test cases

| Test ID | Type/technique | Scenario | Oracle | Automated |
|---|---|---|---|---|
| [TODO: add ≥12] | | | | |

### 6.2 Multi-browser results

| Browser | ISO run time | Total | Pass | Fail | Skip | HTML report |
|---|---|---:|---:|---:|---:|---|
| Chromium | [TODO] | | | | | |
| Firefox | [TODO] | | | | | |
| WebKit | [TODO] | | | | | |

### 6.3 AI review and gaps

[TODO]

## 7. Feature C – [TODO]

Use the same subsections as Feature A. Explicitly document admin role/setup and access-control risks if relevant.

### 7.1 Test cases

| Test ID | Type/technique | Scenario | Oracle | Automated |
|---|---|---|---|---|
| [TODO: add ≥12] | | | | |

### 7.2 Multi-browser results

| Browser | ISO run time | Total | Pass | Fail | Skip | HTML report |
|---|---|---:|---:|---:|---:|---|
| Chromium | [TODO] | | | | | |
| Firefox | [TODO] | | | | | |
| WebKit | [TODO] | | | | | |

### 7.3 AI review and gaps

[TODO]

## 8. Consolidated execution summary

| Metric | Value | Evidence source |
|---|---:|---|
| Features | 3 | This report |
| Designed cases | [TODO] | Case catalog |
| Automated cases | [TODO] | Specs/data |
| Total browser test executions | [TODO] | HTML reports |
| Passed | [TODO] | HTML reports |
| Failed | [TODO] | HTML reports |
| Skipped | [TODO] | HTML reports |
| Feature-browser runs | [TODO; ≥9] | Run records |
| Confirmed defects | [TODO] | GitHub Issues |

Report identity check: every submitted HTML report visibly contains `Run by: 23127104` and an ISO-8601 timestamp. [TODO: confirm after visual inspection.]

## 9. Critical review and gap analysis

### What AI got wrong or missed

[TODO: give concrete examples of fragile selectors, weak/missing assertions, wrong assumptions, missing edge cases, flaky waits, data collisions or browser differences.]

### Why it happened

[TODO: distinguish incomplete prompt/context, model limitation, ambiguous requirement, dynamic UI, hidden state, or environment characteristic.]

### Human changes and residual risk

[TODO: link changes/commits and explain remaining limitations.]

## 10. Bug report summary

| Bug ID/title | Feature/test | Severity | GitHub Issue | Screenshot | Status |
|---|---|---|---|---|---|
| [TODO or “None after triage”] | | | | | |

Full records: `report/BUG_REPORT.md`.

## 11. Demo video

- Unlisted YouTube URL: [TODO]
- Duration: [TODO; ≥5 minutes]
- Language: Vietnamese
- Authorship evidence: [TODO: face-cam or timestamps showing `whoami` and `hostname`]
- Demonstrated feature: [TODO]
- AI correction narrated: [TODO]
- Multi-browser run/report timestamp: [TODO]

## 12. Agent Skill

The repo-scoped skill is located at `.agents/skills/hw04-playwright-automation`. It standardizes feature discovery, test modelling, external data, Playwright implementation, review, evidence capture, and documentation while enforcing a human-review gate.

- Skill demo URL: [TODO]
- Demonstrated feature: [TODO]
- Observed benefit: [TODO]
- Limitation/improvement after trial: [TODO]

## 13. AI Critique

See `report/AI_CRITIQUE.md` (mandatory 200–300 words).

## 14. AI Audit Report

See `report/AI_AUDIT_REPORT.md` for tool, date-time, exact prompts, outputs, and human decisions.

## 15. Git history

- Public repository: [TODO]
- Commit-log file: [TODO: `.txt` path]
- Count of qualifying commits that change test scripts: [TODO; ≥8]
- Verification method: [TODO: command and review]

## 16. Self-assessment

| Criterion | Maximum | Self-assessed | Evidence/rationale |
|---|---:|---:|---|
| Feature A | 25 | [TODO] | [TODO] |
| Feature B | 25 | [TODO] | [TODO] |
| Feature C | 25 | [TODO] | [TODO] |
| Demo video | 15 | [TODO] | [TODO] |
| Agent Skill | 10 | [TODO] | [TODO] |
| **Total** | **100** | **[TODO]** | |

## 17. References

- ISTQB Foundation Level Syllabus, latest edition used: [TODO version/link].
- Playwright documentation: [TODO exact pages used].
- EShop SUT repository: <https://github.com/ttbhanh/eshop-sut>.
- OpenAI, “Build skills”: <https://learn.chatgpt.com/docs/build-skills>.
- Course lectures and HW02 artifacts: [TODO].

## Appendix A – Artifact index

| Artifact | Path/URL | Verified |
|---|---|---|
| Main report Markdown/PDF | [TODO] | [ ] |
| AI Audit Markdown/PDF | [TODO] | [ ] |
| AI Critique Markdown/PDF | [TODO] | [ ] |
| Three data files/spec groups | [TODO] | [ ] |
| Nine browser-run reports | [TODO] | [ ] |
| GitHub Issues/screenshots | [TODO] | [ ] |
| Demo video | [TODO] | [ ] |
| Skill + skill demo | [TODO] | [ ] |
| Git commit log text | [TODO] | [ ] |
