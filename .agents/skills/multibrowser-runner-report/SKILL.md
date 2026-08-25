---
name: multibrowser-runner-report
description: Cấu hình Playwright chạy trên 3 trình duyệt (Chromium/Firefox/WebKit) và xuất HTML report có dòng "Run by: {StudentID} - {ISO timestamp}". Dùng sau playwright-script-writer, khi cần thiết lập multi-browser run và report cho HW04. KHÔNG tự chạy test — bước chạy thực tế là nhiệm vụ của người dùng.
---

# Multi-browser Runner & Report

Skill này sinh/patch file `playwright.config.ts` và hướng dẫn chính xác các lệnh chạy để đảm bảo:
- Test chạy trên **3 browser**: Chromium, Firefox, WebKit
- HTML report có dòng **"Run by: {StudentID}"** và **ISO timestamp** rõ ràng

> ⚠️ **Anti-cheat constraint:** Skill này **KHÔNG tự chạy test**, **KHÔNG giả lập report**, **KHÔNG bịa kết quả**. Toàn bộ việc chạy phải do người dùng thực hiện trên máy thật — đây là yêu cầu bắt buộc của đề bài để xác minh tính xác thực.

---

## Ghi kết quả vào Report (bắt buộc)

Sau khi người dùng **tự chạy test thực tế** và có HTML report thật, cập nhật **5 nơi**:

### 1. `report/MAIN_REPORT.md` — Kết quả chạy multi-browser

| FR | Mục cần cập nhật |
|---|---|
| FR-03 (Feature A) | **Mục 2.6. Kết quả chạy multi-browser** — điền số TC, Pass, Fail, link report |
| FR-11 (Feature B) | **Mục 3.6** (hoặc 3.4–3.9 tuỳ cấu trúc) |
| FR-17 (Feature C) | **Mục 4.6** (hoặc 4.4–4.9 tuỳ cấu trúc) |
| Tất cả | **Mục 5. Tổng kết tự động hóa (Test Summary)** — điền bảng tổng hợp cuối |

Format bảng kết quả (mục X.6):
```markdown
| Browser | Số TC chạy | Pass | Fail | Link HTML report |
|---|---|---|---|---|
| Chromium | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
| Firefox  | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
| WebKit   | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
```
> ⚠️ Các số liệu phải lấy từ HTML report thật — KHÔNG được AI điền thay.

### 2. `report/TEST_CASE_CATALOG.md` — Cập nhật cột Status

Sau khi chạy xong, cập nhật cột **`Status`** của từng TC:
- `Scripted` → `Passed` (nếu test xanh)
- `Scripted` → `Failed` (nếu test đỏ do script hoặc do bug)

### 3. `report/BUG_REPORT.md` — Nếu test FAIL do SUT có bug thật

Nếu test fail và đã xác nhận là **product bug** (không phải script sai), ghi đầy đủ vào `report/BUG_REPORT.md`:
```markdown
## BUG-[NNN] – [Tiêu ngắn mô tả lỗi]
| Field | Value |
|---|---|
| Feature / test ID | FR-{XX} / TC{YY} |
| SUT build/commit | [commit hash của eshop-sut] |
| Environment/browser | [Chromium/Firefox/WebKit] |
| Severity | [Critical / Major / Minor + lý do] |
| Reproducibility | [x/3 lần thử] |
| GitHub Issue | [URL public GitHub Issue sau khi tạo] |
```
Kèm: Steps to reproduce, Expected vs Actual, Evidence (screenshot path, trace/video).

> ⚠️ Phải tạo GitHub Issue public trên repo bài làm, đính kèm screenshot thật.
> ⚠️ KHÔNG được AI bịa bug. Chỉ ghi sau khi người dùng xác nhận bằng tay.

### 4. `report/MAIN_REPORT.md` — Gap Analysis (mục 2.7 / 3.7 / 4.7)

Sau khi review script + kết quả chạy, điền bảng Gap Analysis:
```markdown
| Vấn đề AI mắc phải | Mô tả cụ thể | Bạn đã sửa như thế nào | Vì sao AI mắc lỗi này |
|---|---|---|---|
| Selector giòn | ... | ... | ... |
| Assertion yếu | ... | ... | ... |
```

### 5. `report/SUBMISSION_CHECKLIST.md` — Tick xác nhận

Sau khi hoàn thành toàn bộ cho 1 FR, vào `SUBMISSION_CHECKLIST.md` và tick các mục liên quan:
- `[x] Every feature executed on three browsers (≥9 feature-browser runs).`
- `[x] Every submitted HTML report visibly shows Run by: 23127104 and ISO timestamp.`
- `[x] Test data stored in separate JSON/CSV files, not inline arrays/objects.`

---

## Input bắt buộc từ người dùng

Hỏi người dùng nếu chưa có:

| Field | Ví dụ | Bắt buộc? |
|---|---|---|
| Student ID (MSSV) | `23127104` | ✅ |
| Base URL của SUT đang chạy | `http://localhost:3000` | ✅ |
| Thư mục chứa file test | `automation/tests` | ✅ (mặc định) |
| Thư mục output report | `playwright-report` | ✅ (mặc định) |
| Timeout mỗi test (ms) | `30000` | Tuỳ chọn (mặc định 30s) |
| Có dùng trace không? | `on-first-retry` | Tuỳ chọn |

---

## Việc cần làm

### Bước 1 — Sinh/patch `playwright.config.ts`

Tạo hoặc cập nhật file `playwright.config.ts` ở root của repo bài làm với nội dung sau:

```typescript
import { defineConfig, devices } from '@playwright/test';

// ✅ "Run by" metadata — chèn vào title để hiển thị trong HTML report
const RUN_BY = 'Run by: 23127104'; // ← Thay bằng MSSV thực tế
const RUN_TIMESTAMP = new Date().toISOString();

export default defineConfig({
  testDir: './automation/tests',
  
  // Timeout mỗi test action (ms)
  timeout: 30_000,
  
  // Timeout cho toàn bộ 1 test
  expect: {
    timeout: 10_000,
  },

  // Chạy test song song (để tăng tốc)
  fullyParallel: true,
  
  // Không cho phép test.only trong CI
  forbidOnly: !!process.env.CI,
  
  // Retry khi fail (chỉ trong CI)
  retries: process.env.CI ? 2 : 0,

  reporter: [
    // HTML report — mở file index.html sau khi chạy
    ['html', {
      outputFolder: 'playwright-report',
      open: 'never',
    }],
    // Line reporter — hiển thị tiến trình khi chạy
    ['line'],
  ],

  use: {
    baseURL: 'http://localhost:3000',
    
    // Lưu trace khi retry lần đầu — dùng để debug
    trace: 'on-first-retry',
    
    // Screenshot khi fail
    screenshot: 'only-on-failure',
    
    // Video khi fail (tuỳ chọn — có thể tắt để tiết kiệm disk)
    video: 'on-first-retry',
  },

  projects: [
    {
      name: `chromium | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: `firefox | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: `webkit | ${RUN_BY} | ${RUN_TIMESTAMP}`,
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
```

> 💡 **Tại sao đặt "Run by" trong `name` của project?** Playwright HTML reporter hiển thị tên project rõ ràng trên từng row của report. Đây là cách đơn giản nhất để "Run by: {MSSV}" xuất hiện **thực sự** trong report mà không cần custom reporter phức tạp.

### Bước 2 — Tạo file `run-info.json` (tuỳ chọn nhưng khuyến nghị)

Tạo script `automation/global-setup.ts` để ghi metadata lúc chạy:

```typescript
// automation/global-setup.ts
import fs from 'fs';
import path from 'path';

async function globalSetup() {
  const runInfo = {
    studentId: '23127104',
    runBy: 'Run by: 23127104',
    timestamp: new Date().toISOString(),
    sut: 'http://localhost:3000',
    browsers: ['chromium', 'firefox', 'webkit'],
  };

  // Ghi vào file để reference trong report sau
  fs.writeFileSync(
    path.join(process.cwd(), 'playwright-report', 'run-info.json'),
    JSON.stringify(runInfo, null, 2)
  );
  
  console.log(`\n🚀 Test run started`);
  console.log(`   Run by: ${runInfo.studentId}`);
  console.log(`   Timestamp: ${runInfo.timestamp}\n`);
}

export default globalSetup;
```

Nếu dùng global setup, thêm vào `playwright.config.ts`:
```typescript
globalSetup: './automation/global-setup.ts',
```

### Bước 3 — Kiểm tra package.json có đủ script

Thêm vào `package.json` các script tiện dụng:

```json
{
  "scripts": {
    "test": "npx playwright test",
    "test:chromium": "npx playwright test --project='chromium | Run by: 23127104 | *'",
    "test:firefox": "npx playwright test --project='firefox | Run by: 23127104 | *'",
    "test:webkit": "npx playwright test --project='webkit | Run by: 23127104 | *'",
    "test:fr03": "npx playwright test automation/tests/fr03-reset-password.spec.ts",
    "test:fr11": "npx playwright test automation/tests/fr11-order-history.spec.ts",
    "test:fr17": "npx playwright test automation/tests/fr17-coupon-crud.spec.ts",
    "report": "npx playwright show-report"
  }
}
```

---

## Lệnh chạy chính xác

### Chạy toàn bộ suite trên 3 browser (mặc định)
```bash
# Đảm bảo SUT đang chạy trước!
npx playwright test
```

### Chạy từng feature riêng lẻ
```bash
# Feature A — FR-03
npx playwright test automation/tests/fr03-reset-password.spec.ts

# Feature B — FR-11 (Order History)
npx playwright test automation/tests/fr11-order-history.spec.ts

# Feature C — FR-17 (Coupon CRUD)
npx playwright test automation/tests/fr17-coupon-crud.spec.ts
```

### Chạy chỉ 1 browser cụ thể (để debug nhanh)
```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### Chạy ở chế độ headed (xem browser chạy)
```bash
npx playwright test --headed
```

### Xem report sau khi chạy
```bash
npx playwright show-report
# Hoặc mở thủ công: playwright-report/index.html
```

---

## Xác nhận "Run by" hiển thị đúng trong report

Sau khi chạy xong, **người dùng phải tự xác nhận** các điểm sau:

1. Mở `playwright-report/index.html` trong browser
2. Kiểm tra tên project hiển thị: phải có dạng `chromium | Run by: 23127104 | 2026-...`
3. Chụp màn hình report để lưu làm evidence
4. Ghi kết quả vào bảng trong `MAIN_REPORT.md`:

```markdown
| Browser | Số TC chạy | Pass | Fail | Link HTML report |
|---|---|---|---|---|
| Chromium | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
| Firefox  | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
| WebKit   | ?? | ?? | ?? | [playwright-report/index.html](./playwright-report/index.html) |
```

---

## Cấu trúc thư mục sau khi chạy

```
automation/
├── tests/
│   ├── fr03-reset-password.spec.ts
│   ├── fr11-order-history.spec.ts
│   └── fr17-coupon-crud.spec.ts
├── data/
│   ├── fr03-reset-password.json
│   ├── fr11-order-history.json
│   └── fr17-coupon-crud.json
└── global-setup.ts           ← (tuỳ chọn)

playwright.config.ts
playwright-report/             ← Tự sinh sau khi chạy
├── index.html                 ← Report chính (phải có "Run by: {MSSV}")
├── run-info.json              ← (nếu có global-setup)
└── data/                      ← Artifacts (screenshots, traces, videos)
```

---

## Troubleshooting thường gặp

| Lỗi | Nguyên nhân | Cách fix |
|---|---|---|
| `browserType.launch: Executable doesn't exist` | Chưa install browsers | Chạy `npx playwright install` |
| `Error: connect ECONNREFUSED localhost:3000` | SUT chưa chạy | Start app EShop trước: `npm run dev` |
| `Timeout 30000ms exceeded` | Selector không tìm thấy hoặc app chậm | Tăng timeout hoặc kiểm tra selector |
| `Test failed: toHaveText expected "X" received "Y"` | Assertion text sai | Kiểm tra lại nguyên văn từ UI thực tế |
| WebKit test fail nhưng Chromium OK | Browser-specific behavior | Dùng `test.skip(browserName === 'webkit', 'reason')` nếu có lý do |
| Report không có "Run by" | Dùng tên project sai | Kiểm tra lại tên trong `projects[]` của config |

---

## Checklist hoàn thành

- [ ] `playwright.config.ts` có 3 project với tên chứa "Run by: {MSSV}"
- [ ] `npx playwright install` đã chạy — cả 3 browser đã install
- [ ] SUT đang chạy ở `http://localhost:3000` (hoặc port đúng)
- [ ] Đã chạy `npx playwright test` thực tế trên máy thật
- [ ] HTML report tồn tại trong thư mục `playwright-report/`
- [ ] Mở `playwright-report/index.html` — xác nhận có "Run by: {MSSV}" trong tên project
- [ ] Đã chụp màn hình report làm evidence
- [ ] Đã ghi kết quả (pass/fail/total) vào bảng `MAIN_REPORT.md`
- [ ] Đã ghi AI Audit log cho phiên này (`/ai-audit-logger`)

---

## Nhắc nhở Anti-cheat

> ⚠️ **BẮT BUỘC:** Các mục sau **KHÔNG ĐƯỢC AI tạo ra hay giả lập**:
> - File `playwright-report/index.html` và nội dung bên trong
> - Số lượng test pass/fail
> - ISO timestamp trong report
> - Screenshot trong report khi test fail
>
> TAs sẽ kiểm tra report thật. Nộp report giả = 0 điểm toàn bộ bài.
