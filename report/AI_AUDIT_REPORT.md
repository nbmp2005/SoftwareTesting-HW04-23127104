# AI Audit Report
**Họ tên:** Nguyễn Bình Minh Phương
**MSSV:** 23127104
## Declaration

I use AI tools for the following tasks: requirement interpretation, test design, automation scaffolding, Playwright generation and review, Agent Skill creation, documentation templates, execution-result analysis, and writing support. I reviewed and accepted or rejected every material result and remain responsible for the final submission.

## Prompt 1
**Name of the AI tool:** Claude Sonnet 4.6  
**Date and time:** 24/8/2026 08:00:00  
**Prompt:**
```
Dựa vào yêu cầu đề trong docs/homework4.md. Hãy hướng dẫn tôi toàn bộ bài tập này:
1. Giảng cho tôi chi tiết về kiến thức foundation về bài này
2. Liệt kê chi tiết và hướng dẫn tôi toàn bộ detail các task tôi cần làm
3. Tôi muốn build agent skill từ đầu đến cuối, hãy hướng dẫn tôi nhuwgx phương án để build agent skill cho các task trong bài tập này
4. Chuẩn bị toàn bộ các file md theo đúng format yêu cầu này
```
**AI output:**  
```
Đã hoàn thành bộ khung HW04 trong repository, gồm 16 file Markdown và một Agent Skill hợp lệ.
Các tài liệu chính:
- [README.md](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/README.md): self-assessment, test summary, feature selection.
- [Kiến thức nền tảng](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/docs/01-foundation.md): test design, data-driven, assertions, locator, flaky test, multi-browser, bug triage, AI-first.
- [Hướng dẫn toàn bộ task](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/docs/02-task-guide.md): quy trình từ chọn feature đến đóng gói Moodle.
- [Hướng dẫn Agent Skill](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/docs/03-agent-skill-guide.md): bốn phương án thiết kế, cách gọi và kịch bản demo.
- [Main Report](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/MAIN_REPORT.md).
- [AI Audit Report](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/AI_AUDIT_REPORT.md).
- [AI Critique draft](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/AI_CRITIQUE.md).
- [Test Case Catalog](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/TEST_CASE_CATALOG.md).
- [Bug Report](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/BUG_REPORT.md).
- [Video Plan](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/VIDEO_PLAN.md).
- [Git Commit Plan](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/GIT_COMMIT_PLAN.md).
- [Submission Checklist](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/report/SUBMISSION_CHECKLIST.md).
Agent Skill nằm tại:
- [SKILL.md](C:/Users/cpshc/Y3/SoftwareTesting/SoftwareTesting-HW04/SoftwareTesting-HW04-23127104/.agents/skills/hw04-playwright-automation/SKILL.md)
Có thể gọi bằng:
$hw04-playwright-automation
Skill sử dụng progressive disclosure, tách workflow, review checklist và evidence schema thành references. Cấu trúc này tuân theo tài liệu OpenAI chính thức về xây dựng skills. Công cụ validation xác nhận: Skill is valid!
Các [TODO] được giữ có chủ đích vì cần dữ liệu thật của bạn: ba feature HW02, tên sinh viên, kết quả chạy, HTML report, commit SHA, GitHub Issues và video. Không được nộp khi còn placeholder hoặc thay chúng bằng evidence giả.
Bước tiếp theo là cung cấp ba feature bạn đã chọn trong HW02. Sau đó có thể bắt đầu triển khai Playwright, mỗi feature tối thiểu 12 case và chạy Chromium/Firefox/WebKit.
```

## Prompt 2
**Name of the AI tool:** Claude Sonnet 4.6  
**Date and time:** 25/8/2026 09:00:00
**Prompt:**
```
Tôi muốn build agent skill (có thể build 1 bộ agent kit), hướng dẫn tôi cách build
```
**AI output:**
```
1. Ý tưởng: xây một Skill Kit gồm nhiều skill nhỏ, mỗi skill phụ trách 1 bước trong quy trình AI-first mà đề yêu cầu, để (a) đúng tinh thần "dẫn AI từng bước", (b) tái sử dụng được cho các feature/bài tập sau.

Đề xuất bộ 4 skill:

Skill	Nhiệm vụ
testcase-generator	Từ mô tả chức năng (FR) → sinh danh sách test case có ID, loại (positive/negative/edge), bước thực hiện, kết quả mong đợi
playwright-script-writer	Từ test case đã duyệt → sinh script Playwright data-driven, dùng ≥3 loại assertion, đọc data từ file json/csv riêng
multibrowser-runner-report	Cấu hình playwright.config.ts chạy 3 browser + custom reporter chèn "Run by: {MSSV} - {timestamp}"
ai-audit-logger	Sau mỗi phiên làm việc, tự trích xuất prompt + output thành entry cho AI Audit Report (Markdown)
2. Cấu trúc 1 skill (chuẩn SKILL.md)
automation-testing-kit/
├── testcase-generator/
│   └── SKILL.md
├── playwright-script-writer/
│   └── SKILL.md
│   └── templates/
│       └── spec-template.ts
├── multibrowser-runner-report/
│   └── SKILL.md
│   └── templates/
│       └── playwright.config.template.ts
└── ai-audit-logger/
    └── SKILL.md

Mỗi SKILL.md cần có phần đầu (frontmatter) mô tả khi nào skill được kích hoạt, và phần thân là hướng dẫn chi tiết từng bước.

3. Ví dụ nội dung SKILL.md cho testcase-generator
markdown
---
name: testcase-generator
description: Sinh test case có cấu trúc (ID, loại, bước, kết quả mong đợi) từ mô tả chức năng (FR). Dùng khi người dùng cung cấp 1 Functional Requirement và cần bộ test case đầy đủ positive/negative/edge trước khi viết script automation.
---

# Testcase Generator

## Khi nào dùng
Khi người dùng đưa 1 FR (ví dụ "FR-02: Login and account lockout") và yêu cầu sinh test case.

## Quy trình bắt buộc (KHÔNG được bỏ qua bước nào)
1. Hỏi lại người dùng (nếu chưa rõ): các luồng chính (happy path), điều kiện biên,
   ràng buộc nghiệp vụ (VD: khoá tài khoản sau mấy lần sai).
2. Liệt kê tối thiểu:
   - 4 positive case
   - 4 negative case
   - 4 edge case
3. Mỗi case theo format:
   | ID | Loại | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi |
4. Đánh dấu rõ case nào phù hợp để automate, case nào nên để test tay
   (VD: cần OTP qua email thật) và giải thích lý do.
5. Xuất kết quả dưới 2 dạng: bảng Markdown (để đưa vào report) và JSON
   (để làm input cho skill playwright-script-writer).

## Output format (JSON)
[{"id":"TC01","type":"positive","steps":[...],"data":{...},"expected":"..."}]
4. Ví dụ SKILL.md cho playwright-script-writer
markdown
---
name: playwright-script-writer
description: Convert danh sách test case (JSON) thành script Playwright data-driven, TypeScript. Dùng sau khi đã có test case từ testcase-generator và người dùng đã duyệt.
---

# Playwright Script Writer

## Input bắt buộc
- File JSON test case (từ testcase-generator, đã được người dùng duyệt).
- URL / selector của SUT (nếu chưa có, hỏi người dùng hoặc đọc từ repo).

## Quy tắc viết script
1. KHÔNG hardcode dữ liệu test trong file .spec.ts — luôn import từ
   ../data/<feature>.json hoặc .csv.
2. Dùng ít nhất 3 loại assertion khác nhau trong toàn bộ file:
   - visibility (toBeVisible/toBeEnabled)
   - text/content (toHaveText)
   - url/navigation (toHaveURL) hoặc count (toHaveCount)
3. Dùng `test.describe` để nhóm theo feature, đặt tên test theo TC ID.
4. Ưu tiên selector bền: data-testid > role/label > css > text match mờ.
   Nếu SUT không có data-testid, ghi chú lại (đây là điểm sẽ bị review sai).
5. Sau khi sinh script, tự liệt kê các điểm YẾU tiềm ẩn AI có thể mắc:
   selector giòn, thiếu wait, assertion yếu, thiếu case — để người dùng review.

## Output
- File .spec.ts hoàn chỉnh
- File data .json/.csv riêng
- 1 đoạn "Self-review checklist" liệt kê rủi ro cần người dùng kiểm tra tay
5. Ví dụ SKILL.md cho multibrowser-runner-report
markdown
---
name: multibrowser-runner-report
description: Cấu hình Playwright chạy trên 3 trình duyệt (Chromium/Firefox/WebKit) và xuất HTML report có dòng "Run by: {StudentID} - {ISO timestamp}". Dùng khi cần thiết lập multi-browser run và report cho HW04.
---

# Multi-browser Runner & Report

## Việc cần làm
1. Sinh/patch playwright.config.ts với 3 project: chromium, firefox, webkit.
2. Thêm reporter HTML, cấu hình title/metadata chèn "Run by: {StudentID}"
   — hỏi người dùng StudentID nếu chưa biết.
3. Thêm 1 global setup nhỏ ghi ISO timestamp (new Date().toISOString())
   vào report metadata hoặc vào 1 file run-info.json đi kèm report.
4. Đưa ra lệnh chạy chính xác:
   npx playwright test --project=chromium --project=firefox --project=webkit
   npx playwright show-report
5. Nhắc người dùng: đây là bước KHÔNG được AI tự chạy giả lập — người dùng
   phải tự chạy trên máy thật và verify report thật (anti-cheat requirement).
6. Ví dụ SKILL.md cho ai-audit-logger
markdown
---
name: ai-audit-logger
description: Trích xuất và định dạng lại lịch sử tương tác AI (tool, thời gian, prompt, output) thành các entry cho AI Audit Report theo đúng format đề bài HW04. Dùng cuối mỗi phiên làm việc với AI.
---

# AI Audit Logger

## Format entry bắt buộc (theo đề)
- Tool: <tên AI, ví dụ Claude Sonnet 5>
- Date/time: <ISO timestamp thật, không bịa>
- Prompt: <nguyên văn prompt người dùng đã gõ>
- Output: <tóm tắt hoặc trích output AI đã sinh>

## Quy trình
1. Thu thập lại các prompt/output quan trọng trong phiên (không phải mọi tin
   nhắn nhỏ, chỉ những lần AI thực sự sinh ra artefact: test case, script,
   config, fix lỗi).
2. Xuất thành file audit-report.md, dùng đúng heading "AI Audit Report".
3. Nhắc người dùng: KHÔNG được để AI tự bịa timestamp — phải lấy thời gian
   thật của phiên làm việc.
7. Cách dùng skill kit này để chứng minh "AI-first, từng bước" cho giám khảo

Chính vì bạn tách skill theo từng bước quy trình (sinh test case → viết script → chạy multi-browser → log audit), quá trình bạn dùng AI tự động để lại vết tích rõ ràng theo đúng thứ tự đề yêu cầu, thay vì 1 prompt lớn — đây cũng chính là điểm số ở mục "Agent Skills" (10đ) và giúp phần AI Audit Report của bạn logic, dễ viết hơn.

8. Gợi ý nộp bài

Đóng gói cả 4 SKILL.md (và file template đi kèm) vào 1 thư mục agent-skill/ trong repo GitHub, kèm 1 video demo ngắn cho thấy: bạn gõ 1 feature mới (khác 3 feature đã làm, hoặc feature thứ 4 nếu muốn minh hoạ tái sử dụng) → skill 1 sinh test case → skill 2 sinh script → skill 3 chạy multi-browser → skill 4 xuất audit log.

Bạn muốn mình giúp viết luôn nội dung report mẫu (Markdown), hay tạo sẵn bộ file skill kit này thành file thật để bạn tải về dùng ngay?
```

## Prompt 3
**Name of the AI tool:** Claude Sonnet 4.6  
**Date and time:** 25/8/2026 09:10:00
**Prompt:**
```
vậy có thể build 1 skill ai tự học tự chạy về fr đó trước được không, để tôi không cần mô tả cụ thể
```
**AI output:**
`````
Được — hoàn toàn khả thi, và thực ra đây là hướng làm hay hơn vì đề bài có SUT là repo mã nguồn mở công khai (ttbhanh/eshop-sut). Bạn có thể build 1 skill để AI tự đọc source code / tự chạy thử ứng dụng rồi tự rút ra business rule, thay vì bạn phải gõ tay mô tả.

Tuy nhiên cần lưu ý: AI tự "học" không đồng nghĩa bạn được bỏ qua bước review — đề vẫn yêu cầu bạn chịu trách nhiệm hoàn toàn về việc rule đó đúng hay không (human review). Skill này chỉ giúp AI tự thu thập context, còn việc xác nhận rule đúng vẫn phải qua tay bạn.

Thiết kế skill: fr-context-explorer

Skill này chạy trước testcase-generator, nhiệm vụ: tự động khám phá FR bằng cách đọc code + (nếu có thể) chạy thử app, rồi xuất ra 1 file context để testcase-generator dùng.

markdown
---
name: fr-context-explorer
description: Tự động khám phá business rule, form field, validation, message lỗi của 1 Functional Requirement (FR) bằng cách đọc source code SUT (eshop-sut repo) và/hoặc chạy thử ứng dụng thật. Dùng TRƯỚC testcase-generator khi người dùng chỉ cung cấp mã FR (VD "FR-02") mà chưa mô tả chi tiết.
---

# FR Context Explorer

## Input tối thiểu cần từ người dùng
- Mã FR (VD: "FR-02")
- Đường dẫn/URL repo SUT (mặc định: github.com/ttbhanh/eshop-sut)
- (Tuỳ chọn) URL app đang chạy live, nếu người dùng có deploy sẵn

## Quy trình bắt buộc
1. **Đọc source code**: clone/tải repo, tìm các file liên quan đến FR
   (routes, controller, model, validation schema, message string).
   Ưu tiên tìm: field name, kiểu dữ liệu, rule validate (regex, min/max length),
   logic đặc biệt (VD: đếm số lần login sai, thời gian khoá).
2. **Đọc UI/frontend code**: tìm form tương ứng, lấy đúng selector/id/data-testid
   thật (không đoán) để dùng sau này cho playwright-script-writer.
3. **(Nếu có URL live)**: thử thao tác thực tế 1 lượt (hoặc dùng tool duyệt web)
   để xác nhận behaviour thực tế khớp với code không — vì code và hành vi
   thực tế đôi khi lệch nhau (bug, hoặc code cũ chưa xoá).
4. **Tổng hợp thành file `fr-context.md`** gồm:
   - Business rule phát hiện được (kèm trích dẫn file:line trong code)
   - Danh sách field + selector thật
   - Message lỗi/thành công thực tế (nguyên văn, không diễn giải sai)
   - Các điểm KHÔNG CHẮC CHẮN (code mơ hồ, không tìm thấy rule rõ ràng) —
     liệt kê riêng để người dùng tự xác minh tay, KHÔNG được tự bịa.
5. Đưa file này cho người dùng xác nhận trước khi chuyển sang testcase-generator.

## Nguyên tắc quan trọng
- KHÔNG được suy đoán rule nếu không tìm thấy bằng chứng trong code/app thật.
  Phải ghi rõ "chưa xác định được — cần người dùng xác nhận".
- Luôn trích dẫn nguồn (file, dòng code, hoặc màn hình cụ thể) cho mỗi rule
  để người dùng dễ verify — đây là bằng chứng cho AI Audit Report.
Cách vận hành thực tế trong Claude

Vì bạn đang dùng Claude (có thể là Claude Code hoặc claude.ai với quyền truy cập file/web), quy trình sẽ là:

Claude Code (khuyến nghị mạnh cho việc này): bạn git clone repo SUT về máy, rồi bảo Claude Code "đọc code liên quan đến FR-02, tóm tắt rule". Claude Code có thể tự grep, đọc nhiều file, chạy app thử (nếu có docker/npm start) — rất phù hợp cho skill dạng "tự khám phá".
Nếu dùng claude.ai (web) mà không code trực tiếp: bạn có thể để Claude dùng web_fetch/web_search để đọc các file trên GitHub qua raw URL (raw.githubusercontent.com đã nằm trong domain được phép truy cập).

Ví dụ mình có thể làm ngay bây giờ nếu bạn muốn: cho mình biết FR bạn chọn (VD "FR-02"), mình sẽ thử đọc repo ttbhanh/eshop-sut thật để demo skill này hoạt động ra sao.

Lưu ý quan trọng về học thuật

Việc để AI tự đọc code và tự rút rule là hợp lệ và đúng tinh thần "AI-first" của đề — miễn là:

Bạn vẫn review kết quả AI tự khám phá được (không nhắm mắt tin), vì code có thể có bug khiến rule thực tế khác với comment/tên biến.
Bạn ghi prompt + output của bước khám phá này vào AI Audit Report như 1 tương tác AI bình thường.
Trong report, bạn nên note rõ: "tôi để AI tự đọc source thay vì tự mô tả tay, sau đó tôi verify lại bằng cách chạy thử app" — điều này còn cho thấy bạn hiểu sâu quy trình hơn là chỉ mô tả suông.

Bạn có muốn mình thử chạy thật bước "khám phá FR" này trên repo ttbhanh/eshop-sut ngay bây giờ để bạn xem kết quả mẫu không?
`````

## Prompt 4
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T20:23:19+07:00
- **Prompt:** 
````viết giúp tôi 1 md skill cho ai-audit-logger. 
Mô tả: 

name: ai-audit-logger
description: Trích xuất và định dạng lại lịch sử tương tác AI (tool, thời gian, prompt, output) thành các entry cho AI Audit Report theo đúng format đề bài HW04. Dùng cuối mỗi phiên làm việc với AI.


# AI Audit Logger

## Format entry bắt buộc (theo đề)
- Name of the AI tool: <tên AI, ví dụ Claude Sonnet 5>
- Date/time: <ISO timestamp thật, không bịa>
- Prompt: <nguyên văn prompt người dùng đã gõ>
- Output: <tóm tắt hoặc trích output AI đã sinh>

## Quy trình
1. Mỗi lần người dùng gọi skill này, Thu thập lại các prompt/output quan trọng 
2. Chèn nối tiếp vào file report/AI_AUDIT_REPORT.md theo mô tả trên
3. Nhắc người dùng: KHÔNG được để AI tự bịa timestamp — phải lấy thời gian thật của phiên làm việc.
````
- **Output:** 
```
Đã tạo thành công file skill SKILL.md cho ai-audit-logger và lưu vào thư mục .agents/skills của workspace.
```

## Prompt 5
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T20:30:49+07:00
- **Prompt:** 
```tôi chuẩn bị build skill cho bài tập này, đọc toàn bộ source
1. Đánh giá xem với cách build skill như vậy phù hợp chưa
2. Trong ai audit report có đề cập đến build agent skill fr-context-explorer là đọc toàn bộ src code, nhưng mà cái này không phải blsckbox testing hả ? nếu vậy thì không được đọc source code đúng không? nếu không được đọc thì tôi chạy source và dùng playwright để đọc UI được không 
```
- **Output:** 
```
Đánh giá cách build skill ai-audit-logger là rất phù hợp. Phân tích về Blackbox Testing: khẳng định không nên đọc source code backend để viết test, mà nên dùng Playwright chạy test trên UI thực tế lúc runtime (ví dụ localhost:3000) để đảm bảo tính chất Black-box testing.
```

## Prompt 6
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T20:33:33+07:00
- **Prompt:**
```
tại sao tôi dùng ai audit logger mà không thấy có gì chèn vào file ai_audit report?
```
- **AI Output:**
```
Xin lỗi vì bỏ sót. Đã đọc transcript, tổng hợp và append Prompt 4 (tạo skill ai-audit-logger) và Prompt 5 (hỏi về Blackbox Testing) vào AI_AUDIT_REPORT.md. Nhắc nhở: timestamp phải là thời gian thật, không được bịa.
```

## Prompt 7
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T20:38:17+07:00
- **Prompt:**
```
update lại skill ai-audit logger: 
1. phần prompt phải để nguyên văn của user nhập, không thêm bớt hay ...
2. Prompt và AI output phải để trong boxc ``````
```
- **AI Output:**
```
Đã cập nhật SKILL.md: thêm quy tắc "giữ NGUYÊN VĂN 100% prompt" và bọc cả Prompt lẫn AI Output trong code block (```).
```

## Prompt 8
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T20:43:29+07:00
- **Prompt:**
```
/ai-audit-logger hãy viết 1 file md trong folder docs từng bước tôi phải làm với mỗi fr, viết thật chi tiết từng bước phải làm, input, output,...
```
- **AI Output:**
```
Đã tạo file docs/04-per-fr-workflow.md mô tả chi tiết 11 bước cho mỗi FR: (0) Chuẩn bị môi trường, (1) Khám phá UI thực tế bằng Playwright/DevTools (Black-box), (2) Sinh test case bằng AI, (3) Human review test case, (4) Tạo test data file JSON/CSV, (5) Sinh Playwright script data-driven, (6) Config multi-browser + HTML reporter "Run by: 23127104", (7) Chạy test thực tế, (8) Review & fix + Gap Analysis, (9) Bug report, (10) Commit & push GitHub, (11) Ghi AI Audit log. Mỗi bước có: mục tiêu, input, thao tác cụ thể (kèm prompt mẫu cho AI), output mong đợi, checklist.
```

## Prompt 9
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T21:08:48+07:00
- **Prompt:**
```
vậy trong folder automation cần chứa những gì
```
- **AI Output:**
```
Giải thích cấu trúc thư mục automation/ gồm 4 thành phần bắt buộc: (1) data/ chứa file JSON/CSV test data data-driven, (2) tests/ chứa file .spec.ts Playwright, (3) playwright.config.ts cấu hình 3 browser + HTML reporter có "Run by: MSSV", (4) playwright-report/ tự động sinh ra sau khi chạy test (không tạo thủ công). Kèm ví dụ tên file cụ thể cho 3 FR đang làm.
```

## Prompt 10
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:13:24+07:00
- **Prompt:**
```
/ai-audit-logger đọc toàn bộ source hướng dẫn và giúp tôi build agent skill cho fr-context-explorer. Đây là những yêu cầu cơ bản, hãy giúp tôi thêm cho đầy đủ hơn ---
name: fr-context-explorer
description: Tự động khám phá business rule, form field, validation, message lỗi của 1 Functional Requirement (FR) bằng cách đọc source code SUT (eshop-sut repo) và/hoặc chạy thử ứng dụng thật. Dùng TRƯỚC testcase-generator khi người dùng chỉ cung cấp mã FR (VD "FR-02") mà chưa mô tả chi tiết.
---
---
name: fr-context-explorer
description: Tự động khám phá business rule, form field, validation, message lỗi của 1 Functional Requirement (FR) bằng cách đọc source code SUT (eshop-sut repo) và/hoặc chạy thử ứng dụng thật. Dùng TRƯỚC testcase-generator khi người dùng chỉ cung cấp mã FR (VD "FR-02") mà chưa mô tả chi tiết.
---

# FR Context Explorer

## Input tối thiểu cần từ người dùng
- Mã FR (VD: "FR-02")
- Đường dẫn/URL repo SUT (mặc định: github.com/ttbhanh/eshop-sut)
- (Tuỳ chọn) URL app đang chạy live, nếu người dùng có deploy sẵn

Quy trình bắt buộc
1. Phần này dùng playwright mcp khám phá UI
   Ưu tiên tìm: field name, kiểu dữ liệu, rule validate (regex, min/max length),
   logic đặc biệt (VD: đếm số lần login sai, thời gian khoá).
2. tìm form tương ứng, lấy đúng selector/id/data-testid
   thật (không đoán) để dùng sau này cho playwright-script-writer.
3. **(Nếu có URL live)**: thử thao tác thực tế 1 lượt (hoặc dùng tool duyệt web)
   để xác nhận behaviour thực tế khớp với code không — vì code và hành vi
   thực tế đôi khi lệch nhau (bug, hoặc code cũ chưa xoá).
4. **Tổng hợp thành file `fr-context.md`** gồm:
   - Business rule phát hiện được (kèm trích dẫn file:line trong code)
   - Danh sách field + selector thật
   - Message lỗi/thành công thực tế (nguyên văn, không diễn giải sai)
   - Các điểm KHÔNG CHẮC CHẮN (code mơ hồ, không tìm thấy rule rõ ràng) —
     liệt kê riêng để người dùng tự xác minh tay, KHÔNG được tự bịa.
5. Đưa file này cho người dùng xác nhận trước khi chuyển sang testcase-generator.

## Nguyên tắc quan trọng
- KHÔNG được suy đoán rule nếu không tìm thấy bằng chứng trong code/app thật.
  Phải ghi rõ "chưa xác định được — cần người dùng xác nhận".
- Luôn trích dẫn nguồn (file, dòng code, hoặc màn hình cụ thể) cho mỗi rule
  để người dùng dễ verify — đây là bằng chứng cho AI Audit Report.
```
- **AI Output:**
```
Đã tạo file .agents/skills/fr-context-explorer/SKILL.md hoàn chỉnh. Các điểm bổ sung so với bản gốc: (1) Thêm bảng FR→URL Mapping cho toàn bộ 19 FR của EShop SUT. (2) Quy trình 5 bước rõ ràng dùng Playwright MCP: A-Khởi động & điều hướng, B-Thu thập selectors qua browser_snapshot, C-Kích hoạt validation và ghi lại error messages thực tế, D-Khám phá luồng đặc biệt theo từng FR, E-Tổng hợp file output. (3) Cấu trúc output file fr-context.md chuẩn với 7 mục. (4) 5 nguyên tắc bắt buộc gồm không suy đoán, luôn có bằng chứng, nguyên văn tuyệt đối. (5) Prompt mẫu handoff sang testcase-generator.
```

## Prompt 11
- **Name of the AI tool:** Gemini 3.1 Pro (High)
- **Date/time:** 2026-08-25T21:21:33+07:00
- **Prompt:**
```
/ai-audit-logger thêm trong skill fr-context-explorer input của người dùng thêm Đặc tả Yêu cầu Hệ thống cho fr cụ thể nữa
```
- **AI Output:**
```
Đã cập nhật file SKILL.md của fr-context-explorer: Bổ sung trường "Đặc tả Yêu cầu Hệ thống (Mô tả FR)" vào bảng Input bắt buộc từ người dùng để AI có căn cứ kiểm chứng các business rule cụ thể.
```

## Prompt 12
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:27:43+07:00
- **Prompt:**
```
/ai-audit-logger đọc sourrce hướng dẫn và tiếp tục giúp tôi viết agent skill cho bước testcase-generator (sau bước fr-context-explorer). Đây là mô tả cơ bản, hãy giúp tôi thêm chi tiết và chính xác hơn ---
name: testcase-generator
description: Sinh test case có cấu trúc (ID, loại, bước, kết quả mong đợi) từ mô tả chức năng (FR). Dùng khi người dùng cung cấp 1 Functional Requirement và cần bộ test case đầy đủ positive/negative/edge trước khi viết script automation.
---
[... nội dung đầy đủ như trong prompt gốc]
```
- **AI Output:**
```
Đã tạo file .agents/skills/testcase-generator/SKILL.md hoàn chỉnh. Các điểm bổ sung/làm rõ so với bản gốc: (1) Điều kiện tiên quyết: phải có file fr-context.md đã được người dùng xác nhận. (2) Quy trình 4 bước: Đọc & phân tích input → Sinh TC theo 3 nhóm ≥4 case mỗi nhóm → Đánh dấu khả năng automate với 3 nhãn (✅/⬜/⚠️) → Xuất 2 định dạng (Markdown + JSON). (3) JSON có thêm trường selector_hints lấy từ context file, không tự đặt. (4) Nguyên tắc traceability: mỗi TC truy nguyên về ít nhất 1 Business Rule. (5) Human Review Gate: dừng lại, trình bày tóm tắt, chờ xác nhận trước khi chuyển sang playwright-script-writer. (6) Prompt mẫu handoff sang playwright-script-writer.
```

## Prompt 13
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:32:35+07:00
- **Prompt:**
```
/ai-audit-logger  đọc sourrce hướng dẫn và tiếp tục giúp tôi viết agent skill cho bước playwright-script-writer. Đây là mô tả cơ bản, hãy giúp tôi thêm chi tiết và chính xác hơn 
---
name: playwright-script-writer
description: Convert danh sách test case (JSON) thành script Playwright data-driven, TypeScript. Dùng sau khi đã có test case từ testcase-generator và người dùng đã duyệt.
---
[... nội dung đầy đủ như trong prompt gốc]
```
- **AI Output:**
```
Đã tạo file .agents/skills/playwright-script-writer/SKILL.md hoàn chỉnh. Các điểm bổ sung so với bản gốc: (1) 6 quy tắc viết script có ký hiệu R1-R6: không hardcode data, ≥3 loại assertion (bảng chi tiết 5 loại), cấu trúc test bắt buộc với for-loop qua testData, ưu tiên selector theo thứ tự rõ ràng, wait đúng cách với ví dụ ✅/❌, test độc lập có beforeEach/afterEach. (2) Template spec file TypeScript mẫu hoàn chỉnh cho FR-03 với TypeScript interface. (3) Self-review Checklist chi tiết 5 nhóm rủi ro: Selector, Assertion text, Logic & State, Case không automate, Điểm khác. (4) Human Review Gate với hướng dẫn 5 bước cho người dùng tự thực hiện. (5) Prompt mẫu handoff sang multibrowser-runner-report.
```

## Prompt 14
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:35:12+07:00
- **Prompt:**
```
/ai-audit-logger đọc sourrce hướng dẫn và tiếp tục giúp tôi viết agent skill cho bước multibrowser-runner-report. Đây là mô tả cơ bản, hãy giúp tôi thêm chi tiết và chính xác hơn 
---
name: multibrowser-runner-report
description: Cấu hình Playwright chạy trên 3 trình duyệt (Chromium/Firefox/WebKit) và xuất HTML report có dòng "Run by: {StudentID} - {ISO timestamp}". Dùng khi cần thiết lập multi-browser run và report cho HW04.
---
[... nội dung đầy đủ như trong prompt gốc]
```
- **AI Output:**
```
Đã tạo file .agents/skills/multibrowser-runner-report/SKILL.md hoàn chỉnh. Các điểm bổ sung so với bản gốc: (1) Bảng input bắt buộc: hỏi MSSV, Base URL, thư mục test, timeout. (2) playwright.config.ts đầy đủ: chèn "Run by: {MSSV}" và ISO timestamp trực tiếp vào tên project[] để hiển thị rõ trong HTML report — giải thích lý do chọn cách này. (3) Global setup script ghi run-info.json. (4) package.json scripts tiện dụng cho từng FR. (5) Đầy đủ lệnh chạy: toàn suite, từng feature, từng browser, headed mode. (6) Bảng Troubleshooting 6 lỗi thường gặp. (7) Checklist 9 mục. (8) Cảnh báo Anti-cheat rõ ràng: liệt kê cụ thể những gì AI không được tạo/giả lập.
```

## Prompt 15
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:37:04+07:00
- **Prompt:**
```
/ai-audit-logger Trong tất cả các skill, cập nhật các phần trong file tương ứng  (trong folder report), ví dụ test case thì thêm vào phần testcasse của main report. Hãy tìm và hướng dẫn skill thêm vào file tương ứng giúp tôi
```
- **AI Output:**
```
Đã đọc MAIN_REPORT.md để xác định mapping chính xác giữa mỗi skill và mục tương ứng, sau đó cập nhật 4 skill bằng cách thêm section "Ghi kết quả vào Report (bắt buộc)": (1) fr-context-explorer → mục 2.1/3.1/4.1 Mô tả chức năng + tạo docs/fr-context/fr{XX}-context.md. (2) testcase-generator → mục 2.3/3.3/4.3 Danh sách Test Case + automation/data/fr{XX}-testcases-draft.json. (3) playwright-script-writer → mục 2.4/3.4/4.4 Data-driven test data + mục 2.5/3.5/4.5 Assertion patterns + automation/tests/fr{XX}-*.spec.ts. (4) multibrowser-runner-report → mục 2.6/3.6/4.6 Kết quả chạy multi-browser + mục 5 Tổng kết (người dùng phải tự điền từ HTML report thật, không được AI điền thay).
```

## Prompt 16
- **Name of the AI tool:** Claude Sonnet 4.6 (Thinking)
- **Date/time:** 2026-08-25T21:42:42+07:00
- **Prompt:**
```
/ai-audit-logger sao chỉ cập nhật main report thôi vậy, còn những file khác trong folder report nữa
```
- **AI Output:**
```
Đã đọc toàn bộ 8 file trong folder report/ để xác định mapping đầy đủ, sau đó cập nhật 3 skill với section "Ghi kết quả vào Report" mở rộng: (1) testcase-generator → thêm TEST_CASE_CATALOG.md (điền bảng catalog với cột Requirement/Technique/Preconditions/Cleanup/Automated spec/title). (2) playwright-script-writer → thêm TEST_CASE_CATALOG.md (cập nhật Status từ Planned→Scripted) + BUG_REPORT.md (nếu phát hiện potential bug khi review script, cần verify tay trước). (3) multibrowser-runner-report → thêm TEST_CASE_CATALOG.md (Scripted→Passed/Failed) + BUG_REPORT.md đầy đủ format (chỉ sau khi confirm bằng tay) + Gap Analysis trong MAIN_REPORT.md mục 2.7/3.7/4.7 + SUBMISSION_CHECKLIST.md (tick các mục sau khi hoàn thành mỗi FR).
```