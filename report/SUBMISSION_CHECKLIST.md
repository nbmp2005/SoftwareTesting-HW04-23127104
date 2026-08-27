# HW04 Submission Checklist

## Content completeness

- [x] Exactly three selected web features: one Pool A, one Pool B, one Pool C.
- [x] Same features as HW02, or explicit reason/self-declaration if HW02 unavailable.
- [ ] At least 12 designed and automated cases per feature (≥36 total).
- [x] Test data stored in separate JSON/CSV files, not inline arrays/objects.
- [x] At least three distinct assertion patterns per feature/suite as documented.
- [x] Every feature executed on three browsers (≥9 feature-browser runs).
- [x] Every submitted HTML report visibly shows `Run by: 23127104` and ISO timestamp.
- [x] Human review explains concrete AI mistakes, corrections, causes, and verification.
- [x] Unautomated cases are documented with technical reason, attempt, risk, and next action.
- [x] Confirmed bugs have Markdown record + public GitHub Issue + real screenshot.

## Video and authorship

- [ ] Unlisted YouTube video is at least 5 minutes.
- [ ] Vietnamese narration.
- [ ] Demonstrates one script end-to-end, multi-browser execution, and HTML report.
- [ ] Narrates at least one real AI-script correction.
- [ ] Shows face-cam or terminal output of both `whoami` and `hostname`.
- [ ] Video URL works without repository-owner login.

## AI requirements

- [x] Declaration uses "I use AI tools for the following tasks" and enumerates tasks.
- [ ] AI Audit contains tool, date-time, exact prompt, AI output, and human review for every interaction.
- [x] AI Critique is 200-300 words and grounded in actual observations.
- [x] Agent Skill folder is included and validates successfully.
- [ ] Skill demo link shows a complete feature workflow end-to-end.

## Git/repository

- [ ] Public GitHub repository URL works in incognito.
- [x] At least 8 meaningful commits each change a test-script file.
- [x] Commit log exported to a text file.
- [x] Scripts, data, reports and documentation are present.
- [ ] No secret, token, password, private email, or `.env` is committed.

## Files and packaging

- [ ] Main report: Markdown + PDF.
- [ ] AI Audit Report: Markdown + PDF.
- [ ] AI Critique included in required document(s), with PDF copy as required by brief.
- [x] README has self-assessment and test summary.
- [x] Multi-browser HTML reports included and open locally.
- [x] Bug report/screenshots included if applicable.
- [x] Demo and skill-demo URLs included.
- [x] Git commit log `.txt` included.
- [ ] Artifact links use final public paths/URLs; no `[TODO]` remains.
- [ ] ZIP opens successfully after creation.
- [ ] Filename is `23127104_HW04_AI_Automation_<GRADE>.zip` with a three-digit grade from `000` to `100`.
- [ ] Moodle upload completed before the displayed deadline.

## Final evidence audit

Run a repository search for placeholders and fabricated-evidence risks:

```powershell
rg -n "\[TODO|PLACEHOLDER|example\.com|TBD" .
```

Then manually open every PDF, HTML report, screenshot and URL. A green test run does not validate submission packaging.
