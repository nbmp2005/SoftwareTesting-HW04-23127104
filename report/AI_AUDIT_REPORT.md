# AI Audit Report

## Declaration

I use AI tools for the following tasks: requirement interpretation, test design, automation scaffolding, Playwright generation and review, Agent Skill creation, documentation templates, execution-result analysis, and writing support. I reviewed and accepted or rejected every material result and remain responsible for the final submission.

## Logging rules

- Use ISO-8601 date-time with timezone.
- Preserve the exact prompt. If output is long, save it in a linked Markdown/text file and summarize only the decision here.
- Record rejected output as well as accepted output.
- Never claim execution evidence that was not produced and inspected.

## Interaction 001 – Assignment analysis and repository scaffold

| Field | Value |
|---|---|
| AI tool | OpenAI Codex |
| Model | [TODO: copy model name shown by the client, if available] |
| Date/time | `2026-08-18T21:59:41.8664104+07:00` |
| Purpose | Explain HW04, enumerate tasks, design an Agent Skill, and prepare required Markdown templates. |
| Exact user request | “Hãy hướng dẫn tôi toàn bộ bài tập này: (1) Giảng cho tôi chi tiết về kiến thức foundation về bài này; (2) Liệt kê chi tiết và hướng dẫn tôi toàn bộ detail các task tôi cần làm; (3) Tôi muốn build agent skill từ đầu đến cuối, hãy hướng dẫn tôi những phương án để build agent skill cho các task trong bài tập này; (4) Chuẩn bị toàn bộ các file md theo đúng format yêu cầu này.” The full HW04 brief was included immediately before this request in the same prompt. |
| AI output | Created a foundation guide, task guide, Agent Skill guide, report/audit/critique/bug/video/checklist templates, README, and a repo-scoped skill under `.agents/skills/hw04-playwright-automation`. |
| Human review | [TODO: record what you checked, changed, accepted, or rejected after reading the files.] |
| Affected files | `README.md`, `docs/**`, `report/**`, `.agents/skills/hw04-playwright-automation/**` |

> For strict verbatim auditability, export or paste the complete original prompt and complete assistant response into `report/audit-raw/interaction-001.md` before submission; the row above is an index, not a substitute for the raw transcript.

## Interaction template

Copy this section for every subsequent interaction.

### Interaction [NNN] – [Short title]

| Field | Value |
|---|---|
| AI tool | [TODO] |
| Model | [TODO] |
| Date/time | [TODO: ISO timestamp with timezone] |
| Purpose | [TODO] |
| Exact prompt | [TODO: paste verbatim or link raw transcript] |
| AI output | [TODO: paste material output or link full saved output] |
| Human review | [TODO: errors found, accepted/rejected parts, corrections] |
| Verification | [TODO: command/report/manual check] |
| Affected files | [TODO] |

## Interaction index

| ID | Date/time | Tool | Purpose | Outcome | Raw log |
|---|---|---|---|---|---|
| 001 | 2026-08-18T21:59:41.8664104+07:00 | Codex | Assignment/scaffold | Pending student review | [TODO] |

## Audit completeness check

- [ ] Every AI interaction that materially influenced submission is listed.
- [ ] Tool/model/date-time are present.
- [ ] Exact prompt and output are embedded or linked.
- [ ] Human review/corrections are explicit.
- [ ] Raw logs contain no secrets or personal credentials.
- [ ] Markdown and PDF versions are exported.
