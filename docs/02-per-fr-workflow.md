# Quy trình làm việc chi tiết cho từng FR (HW04)

> Tài liệu này mô tả **từng bước cụ thể** bạn phải thực hiện cho mỗi Functional Requirement trong HW04.  
> Áp dụng cho cả 3 feature: **FR-03**, **Order History (FR-11)**, **FR-17**.

---

## Tổng quan quy trình (Pipeline)

```
[Bước 0] Chuẩn bị môi trường
      ↓
[Bước 1] Khám phá UI thực tế (fr-context-explorer / Playwright inspect)
      ↓
[Bước 2] Sinh test case (testcase-generator)
      ↓
[Bước 3] Review & xác nhận test case (Human review)
      ↓
[Bước 4] Tạo test data file (.json / .csv)
      ↓
[Bước 5] Sinh Playwright script (playwright-script-writer)
      ↓
[Bước 6] Cấu hình multi-browser + HTML reporter (multibrowser-runner-report)
      ↓
[Bước 7] Chạy test thực tế & thu thập kết quả
      ↓
[Bước 8] Review & fix script AI sinh (Human review)
      ↓
[Bước 9] Ghi bug report (nếu có)
      ↓
[Bước 10] Commit & push lên GitHub
      ↓
[Bước 11] Ghi AI Audit log (ai-audit-logger)
```

---

## Bước 0 — Chuẩn bị môi trường

**Mục tiêu:** Có ứng dụng EShop chạy được ở local và môi trường test sẵn sàng.

### Input
- Máy tính đã cài: Node.js (≥18), npm, Git

### Thao tác

```bash
# 1. Clone SUT
git clone https://github.com/ttbhanh/eshop-sut.git
cd eshop-sut

# 2. Khởi chạy ứng dụng (đọc README của SUT để biết lệnh chính xác)
# Ví dụ:
npm install
npm run dev
# Hoặc dùng Docker nếu có docker-compose.yml

# 3. Xác nhận app đang chạy tại localhost (ví dụ: http://localhost:3000)
# Mở browser vào URL đó, kiểm tra trang chủ load được

# 4. Init Playwright cho repo bài làm
cd ../SoftwareTesting-HW04-23127104
npm init playwright@latest
# Chọn TypeScript, thư mục tests là automation/
```

### Output
- ✅ App EShop chạy tại `http://localhost:3000` (hoặc port tương ứng)
- ✅ Playwright đã init, chạy được `npx playwright test --list`
- ✅ File `playwright.config.ts` đã tồn tại trong repo bài làm

### Checklist
- [ ] `npm run dev` không lỗi
- [ ] Truy cập localhost, trang login/home load được
- [ ] `npx playwright test --list` chạy không lỗi

---

## Bước 1 — Khám phá UI thực tế

**Mục tiêu:** Lấy đúng locators (selectors) thực tế của form/button trên giao diện — **KHÔNG đọc source code backend** (Black-box testing).

> ⚠️ **Nguyên tắc Black-box:** Bạn tương tác với UI đang chạy, không đọc code backend/database để đoán logic. Mọi selector phải được lấy bằng cách inspect DOM thực tế.

### Input
- URL của feature cần test (ví dụ: `http://localhost:3000/forgot-password` cho FR-03)
- Mã FR cần khám phá

### Thao tác

**Cách 1 — Dùng Agent (playwright MCP / chrome-devtools MCP):**
```
Prompt cho AI:
"Truy cập http://localhost:3000/forgot-password. 
Liệt kê tất cả các form field (input, button, label) trên trang này:
- name/id/data-testid của mỗi element
- Placeholder text
- Loại input (text, email, password, submit...)
- Các thông báo lỗi có thể xuất hiện (inspect DOM sau khi submit form rỗng)
Ghi ra file docs/fr-context/fr03-context.md"
```

**Cách 2 — Tự inspect thủ công (DevTools):**
1. Mở Chrome DevTools (F12) → Elements
2. Hover từng field, ghi lại `id`, `name`, `data-testid`, hoặc các CSS selector ổn định
3. Submit form rỗng / form sai để xem thông báo lỗi thực tế
4. Ghi lại nguyên văn text lỗi (vì Playwright sẽ dùng `toHaveText` để assert)

### Output
- File `docs/fr-context/fr{XX}-context.md` gồm:
  - Danh sách tất cả field + selector thực tế
  - Các thông báo lỗi (nguyên văn, không diễn giải)
  - Luồng UI: bước 1 → bước 2 → ... (nếu có nhiều bước)
  - Các điểm không chắc chắn cần xác minh thêm

### Checklist
- [ ] Có selector cho TẤT CẢ input field cần dùng trong test
- [ ] Có selector cho nút Submit / CTA button
- [ ] Có text lỗi thực tế (không phỏng đoán)
- [ ] Review lại file context trước khi sang Bước 2

---

## Bước 2 — Sinh Test Case

**Mục tiêu:** Tạo danh sách ≥12 test case đầy đủ 3 loại: Positive / Negative / Edge.

### Input
- File `docs/fr-context/fr{XX}-context.md` (từ Bước 1)
- Mô tả FR (từ `docs/homework4.md`)

### Prompt mẫu cho AI (skill `testcase-generator`)

```
Dựa vào file context sau: [paste nội dung fr-context.md]
Và mô tả FR: [paste mô tả FR từ homework4.md]

Hãy sinh danh sách test case cho FR này theo yêu cầu:
1. Tối thiểu 12 test case, gồm: ≥4 Positive, ≥4 Negative, ≥4 Edge
2. Mỗi case theo format bảng:
   | ID | Loại | Mô tả | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Automate? |
3. Với mỗi case, ghi rõ: automate được hay không, nếu không thì lý do
4. Xuất thêm dạng JSON array để dùng làm test data
```

### Output
- Bảng test case trong `report/MAIN_REPORT.md` (mục tương ứng của feature)
- File JSON tạm: `automation/data/fr{XX}-testcases-draft.json`

### Checklist
- [ ] ≥12 test case, đủ 3 loại
- [ ] Mỗi case có đủ: ID, loại, bước, data, expected result
- [ ] Có ghi chú case nào không automate được và lý do
- [ ] Đã review và chỉnh sửa (không dùng thô output AI)

---

## Bước 3 — Review & Xác nhận Test Case (Human Review ⚠️)

**Mục tiêu:** Đảm bảo test case phản ánh đúng behavior thực tế của SUT.

### Thao tác
1. **Thử tay từng test case quan trọng** trên app đang chạy:
   - Nhập data vào UI theo từng case
   - Xem kết quả thực tế khớp với expected result không
2. **Sửa lại** expected result nếu AI đoán sai
3. **Bổ sung** các case AI bỏ sót
4. **Đánh dấu** các case không thể automate + giải thích lý do

### Output
- Bảng test case đã finalize trong `MAIN_REPORT.md`
- Ghi chú vào report: "AI đã sai/thiếu gì, bạn đã sửa như thế nào"

### Checklist
- [ ] Đã thử tay ít nhất các case Positive và case Edge quan trọng
- [ ] Expected result phản ánh đúng SUT thực tế
- [ ] Có mục "Review & Gap Analysis" trong report

---

## Bước 4 — Tạo Test Data File

**Mục tiêu:** Tách dữ liệu test ra file riêng (`.json` hoặc `.csv`) — không hardcode trong script.

### Input
- Danh sách test case đã finalize (Bước 3)

### Cấu trúc file JSON (mẫu)

```json
[
  {
    "id": "TC01",
    "type": "positive",
    "description": "Nhập email hợp lệ đã đăng ký",
    "input": {
      "email": "valid@example.com"
    },
    "expected": {
      "message": "OTP đã được gửi",
      "nextStep": true
    }
  },
  {
    "id": "TC03",
    "type": "negative",
    "description": "Nhập email không tồn tại",
    "input": {
      "email": "notexist@example.com"
    },
    "expected": {
      "errorMessage": "Email không tồn tại trong hệ thống"
    }
  }
]
```

### Vị trí file
```
automation/
  data/
    fr03-reset-password.json
    fr11-order-history.json
    fr17-coupon-crud.json
```

### Checklist
- [ ] File JSON/CSV chứa đủ data cho tất cả test case
- [ ] Không có data nào hardcode trong file `.spec.ts`
- [ ] Kiểm tra JSON hợp lệ (không bị lỗi syntax)

---

## Bước 5 — Sinh Playwright Script

**Mục tiêu:** Tạo file `.spec.ts` data-driven, dùng ≥3 loại assertion.

### Input
- File context (Bước 1) — để lấy đúng locators
- File test data JSON (Bước 4)
- Danh sách test case đã duyệt (Bước 3)

### Prompt mẫu cho AI (skill `playwright-script-writer`)

```
Viết Playwright test script (TypeScript) cho [tên FR] với các yêu cầu:

**Locators thực tế (từ fr-context.md):**
[paste danh sách selector]

**Test data file:** automation/data/fr{XX}-xxx.json
Cấu trúc: [paste interface JSON]

**Test case cần automate:** [paste danh sách TC]

**Yêu cầu bắt buộc:**
1. KHÔNG hardcode data — import 100% từ file JSON
2. Dùng ít nhất 3 loại assertion: visibility, toHaveText, toHaveURL (hoặc toHaveCount)
3. Dùng test.describe để nhóm, đặt tên test theo TC ID
4. Ưu tiên selector: data-testid > role/label > css > text
5. Dùng waitForSelector hoặc expect().toBeVisible() thay vì waitForTimeout cố định
6. Sau khi viết xong, liệt kê "Self-review checklist": những điểm yếu tiềm ẩn trong script mà tôi cần kiểm tra tay

**Base URL:** http://localhost:3000
**Output file:** automation/tests/fr{XX}-xxx.spec.ts
```

### Output
- File `automation/tests/fr{XX}-xxx.spec.ts`
- Self-review checklist từ AI (dùng cho Bước 8)

### Checklist
- [ ] Script import data từ file JSON (không hardcode)
- [ ] Có ít nhất 3 loại assertion khác nhau
- [ ] Tên test theo format: `TC01 - [mô tả ngắn]`
- [ ] Có `test.describe('[tên FR]', ...)`

---

## Bước 6 — Cấu hình Multi-browser + HTML Reporter

**Mục tiêu:** Chạy được trên 3 browser, report có dòng "Run by: {MSSV}".

### Prompt mẫu cho AI (skill `multibrowser-runner-report`)

```
Cập nhật playwright.config.ts để:
1. Chạy trên 3 project: chromium, firefox, webkit
2. HTML reporter tự động tạo report sau mỗi run
3. Tên/title report chứa "Run by: 23127104"
4. Thêm metadata ISO timestamp vào report (dùng new Date().toISOString())

MSSV của tôi: 23127104
```

### Output — playwright.config.ts mẫu

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './automation/tests',
  timeout: 30_000,
  reporter: [
    ['html', { 
      outputFolder: 'playwright-report',
      open: 'never'
    }]
  ],
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
```

> ⚠️ **Quan trọng:** Phần "Run by: {MSSV}" phải xuất hiện **thực sự** trong HTML report. Kiểm tra bằng cách mở `playwright-report/index.html` sau khi chạy và xác nhận bằng mắt.

### Lệnh chạy

```bash
# Chạy tất cả feature trên 3 browser
npx playwright test

# Hoặc chạy từng feature
npx playwright test automation/tests/fr03-reset-password.spec.ts

# Xem report
npx playwright show-report
```

### Checklist
- [ ] `playwright.config.ts` có 3 project: chromium, firefox, webkit
- [ ] HTML report sinh ra sau khi chạy
- [ ] Report hiển thị "Run by: 23127104"
- [ ] Có ISO timestamp trong report

---

## Bước 7 — Chạy Test Thực Tế & Thu Thập Kết Quả

> ⚠️ **KHÔNG được AI giả lập bước này.** Bạn phải tự chạy trên máy thật.

### Thao tác

```bash
# Đảm bảo app đang chạy ở localhost trước
npm run dev  # (ở terminal khác, trong thư mục eshop-sut)

# Chạy test suite
npx playwright test

# Sau khi xong, xem report
npx playwright show-report
```

### Output cần lưu lại
- Screenshot/video của terminal khi chạy (bằng chứng chạy thật)
- HTML report trong thư mục `playwright-report/`
- Ghi kết quả vào bảng trong `MAIN_REPORT.md`:

| Browser | Số TC chạy | Pass | Fail | Link HTML report |
|---|---|---|---|---|
| Chromium | | | | |
| Firefox | | | | |
| WebKit | | | | |

### Checklist
- [ ] Đã chạy thực tế, không giả lập
- [ ] HTML report tồn tại (kiểm tra file thật trong `playwright-report/`)
- [ ] Report có "Run by: 23127104" + timestamp
- [ ] Đã chụp màn hình terminal / lưu evidence

---

## Bước 8 — Review & Fix Script AI Sinh (Human Review ⚠️)

**Mục tiêu:** Phân tích lỗi AI mắc, sửa lại, viết gap analysis.

### Các lỗi AI thường mắc phải

| Loại lỗi | Dấu hiệu | Cách fix |
|---|---|---|
| **Selector giòn** | Dùng CSS class như `.btn-primary`, `.form-control` | Đổi sang `data-testid`, `role`, hoặc `getByLabel` |
| **Assertion yếu** | Chỉ `toBeVisible()`, không check nội dung | Thêm `toHaveText('...')`, `toHaveURL('...')` |
| **Wait cứng** | `await page.waitForTimeout(3000)` | Đổi sang `await expect(locator).toBeVisible()` |
| **Thiếu edge case** | Bỏ sót các trường hợp biên | Bổ sung case dựa trên Bước 1 (context) |
| **Hardcode data** | Data nằm trong file `.spec.ts` | Chuyển toàn bộ ra file JSON |
| **Thiếu cleanup** | Test không reset state giữa các lần chạy | Thêm `beforeEach` / `afterEach` để logout, xóa data test |

### Output — Bảng Gap Analysis (ghi vào MAIN_REPORT.md)

| Vấn đề AI mắc | Mô tả cụ thể | Bạn đã sửa như thế nào | Lý do AI mắc lỗi |
|---|---|---|---|
| Selector giòn | | | |
| Assertion yếu | | | |
| Thiếu edge case | | | |
| Wait không ổn định | | | |

### Checklist
- [ ] Đã review 100% script so với checklist AI tự đề xuất
- [ ] Đã fix ít nhất 3 lỗi (selector / assertion / wait)
- [ ] Đã điền đầy đủ bảng Gap Analysis trong report

---

## Bước 9 — Ghi Bug Report (nếu phát hiện bug)

**Mục tiêu:** Log bug thật, không bịa.

### Điều kiện ghi bug
- Test **fail** do SUT có lỗi thật (không phải do script viết sai)
- Đã xác nhận lỗi bằng cách thử tay trên app

### Thao tác
1. **Ghi vào `report/BUG_REPORT.md`** theo format:
   ```
   | Bug ID | Mô tả | Steps to reproduce | Expected | Actual | Severity | Screenshot |
   ```
2. **Tạo GitHub Issue** trên repo bài làm:
   - Title: `[BUG-XX] [tên ngắn]`
   - Body: mô tả đầy đủ + bước tái hiện
   - Đính kèm screenshot
3. **Copy link Issue** vào Bug Report

### Checklist
- [ ] Bug đã verify tay (không chỉ từ test fail)
- [ ] Có screenshot đính kèm GitHub Issue
- [ ] Link GitHub Issue đã điền vào Bug Report

---

## Bước 10 — Commit & Push lên GitHub

**Mục tiêu:** Đảm bảo ≥8 commit chạm vào file test (`.spec.ts`).

### Quy ước commit message

```
feat(fr03): add reset-password test cases (TC01-TC06)
fix(fr03): fix OTP selector, use data-testid
data(fr03): add test data JSON for reset-password
feat(fr17): add coupon CRUD test cases
fix(fr17): fix assertion for duplicate code error
feat(fr11): add order history test cases
fix(fr11): fix state label assertions (Vietnamese text)
config: add multi-browser playwright config with HTML reporter
```

### Lệnh

```bash
git add automation/tests/fr03-reset-password.spec.ts automation/data/fr03-reset-password.json
git commit -m "feat(fr03): add reset-password data-driven test suite (TC01-TC12)"
git push origin main
```

### Checklist
- [ ] ≥8 commit chạm vào `.spec.ts` hoặc `.spec.js`
- [ ] Commit message có ý nghĩa, không phải "fix", "update"
- [ ] Đã push lên GitHub public repo
- [ ] Lưu commit log: `git log --oneline > report/commit-log.txt`

---

## Bước 11 — Ghi AI Audit Log

**Mục tiêu:** Log tất cả tương tác AI quan trọng của phiên làm việc vừa rồi.

### Thao tác
Gọi skill `ai-audit-logger` ở cuối mỗi phiên:

```
/ai-audit-logger
```

AI sẽ tự động tổng hợp các tương tác quan trọng và append vào `report/AI_AUDIT_REPORT.md`.

### Format entry (nhắc lại)

```markdown
## Prompt N
- Name of the AI tool: Gemini 3.1 Pro / Claude Sonnet 4.6
- Date/time: 2026-08-25T20:00:00+07:00
- Prompt:
```
[nguyên văn 100% prompt bạn đã gõ]
```
- AI Output:
```
[tóm tắt ngắn gọn output AI đã sinh]
```
```

> ⚠️ **CẢNH BÁO:** KHÔNG được để AI tự bịa timestamp. Thời gian phải là thời gian thật của phiên làm việc.

---

## Tóm tắt Checklist tổng thể cho 1 FR

```
□ Bước 0: App EShop chạy ở localhost
□ Bước 1: Có file fr-context.md với selector thực tế
□ Bước 2: Sinh ≥12 test case (AI-first)
□ Bước 3: Review & sửa test case (human review)
□ Bước 4: Tạo file JSON/CSV test data
□ Bước 5: Sinh Playwright script data-driven
□ Bước 6: Config multi-browser + reporter "Run by: 23127104"
□ Bước 7: Chạy test THỰC TẾ, lưu HTML report
□ Bước 8: Review & fix, ghi Gap Analysis
□ Bước 9: Ghi bug nếu có (Bug Report + GitHub Issue)
□ Bước 10: ≥8 commit test file, push GitHub
□ Bước 11: Ghi AI Audit log
```

---

*Tài liệu này được tạo bởi AI (Claude Sonnet 4.6) theo yêu cầu của người dùng, ngày 2026-08-25. Được review và chấp nhận bởi sinh viên 23127104.*
