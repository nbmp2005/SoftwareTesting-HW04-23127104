---
name: playwright-script-writer
description: Convert danh sách test case (JSON) đã duyệt thành script Playwright data-driven TypeScript, dùng selector từ fr-context.md, ≥3 loại assertion, không hardcode data. Dùng SAU testcase-generator khi người dùng đã xác nhận bộ TC. Output gồm file .spec.ts hoàn chỉnh và Self-review checklist.
---

# Playwright Script Writer

Skill này nhận đầu vào là file JSON test case đã duyệt + file context (selectors), rồi sinh ra file `.spec.ts` Playwright TypeScript **data-driven** theo đúng các yêu cầu của HW04.

> ⚠️ **Human Review Gate bắt buộc:** Skill DỪNG sau khi sinh xong, xuất Self-review checklist, và **chờ người dùng review + xác nhận** trước khi file được coi là hoàn tất.

---

## Điều kiện tiên quyết

Trước khi chạy skill này, phải có đủ:
- [ ] File `automation/data/fr{XX}-testcases-draft.json` — từ `testcase-generator`, **đã được người dùng duyệt**
- [ ] File `docs/fr-context/fr{XX}-context.md` — từ `fr-context-explorer`, để lấy selector thực tế
- [ ] `playwright.config.ts` đã cấu hình `baseURL` đúng (ví dụ `http://localhost:3000`)
- [ ] MSSV của người dùng (để chèn vào tên test / metadata)

Nếu thiếu bất kỳ mục nào, **dừng lại và hỏi** — không tự giả định.

---

## Input bắt buộc từ người dùng

| Field | Nguồn lấy | Bắt buộc? |
|---|---|---|
| Mã FR | Người dùng cung cấp (VD: `FR-03`) | ✅ |
| File JSON test case | `automation/data/fr{XX}-testcases-draft.json` | ✅ |
| File context (selectors) | `docs/fr-context/fr{XX}-context.md` | ✅ |
| Base URL của SUT | `playwright.config.ts` hoặc người dùng cho biết | ✅ |
| MSSV | Người dùng cung cấp (VD: `23127104`) | ✅ |
| Tên output file | Mặc định: `automation/tests/fr{XX}-[tên-feature].spec.ts` | ✅ |

---

## Quy tắc viết script (BẮT BUỘC, không được vi phạm)

### R1 — Không hardcode data
- **KHÔNG** đặt bất kỳ giá trị test (email, password, tên, số tiền...) trực tiếp trong file `.spec.ts`
- Import 100% từ file JSON: `import testData from '../data/fr{XX}-testcases-draft.json'`
- Nếu có case cần tài khoản thật (admin/user), đọc từ biến môi trường: `process.env.TEST_EMAIL`

### R2 — Ít nhất 3 loại assertion khác nhau
Phải sử dụng đủ 3 kiểu trong **toàn bộ** file spec:

| Loại | Ví dụ sử dụng |
|---|---|
| **Visibility/State** | `await expect(locator).toBeVisible()` / `toBeEnabled()` / `toBeDisabled()` |
| **Text/Content** | `await expect(locator).toHaveText('Lỗi nguyên văn từ context')` / `toContainText()` |
| **URL/Navigation** | `await expect(page).toHaveURL('/login')` / `toHaveURL(/reset/)` |
| **Count** (nếu cần) | `await expect(locator).toHaveCount(3)` |
| **Value** (nếu cần) | `await expect(input).toHaveValue('...')` |

Assertion text **phải dùng nguyên văn** từ mục 4/5 của `fr-context.md`, KHÔNG tự nghĩ ra.

### R3 — Cấu trúc test bắt buộc
```typescript
import { test, expect } from '@playwright/test';
import testData from '../data/fr{XX}-testcases-draft.json';

test.describe('FR-{XX}: [Tên FR đầy đủ] | Run by: {MSSV}', () => {
  
  // Dùng beforeEach nếu tất cả test cần login hoặc navigate đến cùng 1 URL
  test.beforeEach(async ({ page }) => {
    await page.goto('/[url-feature]');
  });

  for (const tc of testData) {
    if (!tc.automate) continue; // Bỏ qua case không automate
    
    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      // Thực hiện steps từ tc.steps
      // Assert từ tc.expected
    });
  }
});
```

### R4 — Ưu tiên selector theo thứ tự

```
data-testid  >  role/label  >  placeholder  >  css id (#id)  >  css class  >  text match
```

- Selector phải lấy **trực tiếp từ mục 2 của `fr-context.md`**, không tự đặt
- Nếu SUT không có `data-testid`: dùng `page.getByRole()` hoặc `page.getByLabel()` thay thế, **ghi chú lại trong Self-review checklist**
- **KHÔNG dùng XPath** trừ khi không còn cách nào khác

### R5 — Wait đúng cách (không dùng sleep cứng)
```typescript
// ✅ ĐÚNG — Web-first assertion, tự retry
await expect(page.locator('.error-message')).toBeVisible();
await expect(page.locator('.error-message')).toHaveText('Email không hợp lệ');

// ✅ ĐÚNG — Chờ navigation
await page.waitForURL('/login');

// ❌ SAI — Cứng 3 giây, không được dùng
await page.waitForTimeout(3000);
```

### R6 — Test độc lập
- Mỗi `test()` phải tự hoàn chỉnh: không phụ thuộc vào state của test trước
- Nếu cần tạo dữ liệu trước (VD: tạo coupon để test xóa), làm trong `beforeEach` hoặc `test.step()`
- Nếu test tạo ra side effect (thêm user, tạo order...), phải cleanup trong `afterEach`

---

## Template spec file mẫu (FR-03 Reset Password)

```typescript
import { test, expect } from '@playwright/test';
import testData from '../data/fr03-reset-password.json';

// Interface khớp với cấu trúc JSON
interface TestCase {
  id: string;
  type: 'positive' | 'negative' | 'edge';
  description: string;
  input: Record<string, string>;
  expected: {
    message?: string;
    errorMessage?: string;
    behavior?: string;
    url?: string;
  };
  automate: boolean;
  selector_hints: Record<string, string>;
}

const typedData = testData as TestCase[];

test.describe('FR-03: Quên mật khẩu & Đặt lại mật khẩu | Run by: 23127104', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/forgot-password');
    // Xác nhận trang đã load — assertion R2/Visibility
    await expect(page.locator('#email')).toBeVisible();
  });

  for (const tc of typedData) {
    if (!tc.automate) continue;

    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      // ── STEP 1: Fill form ──
      if (tc.input.email) {
        await page.locator('#email').fill(tc.input.email);
      }
      await page.locator('[data-testid="submit-btn"]').click();

      // ── ASSERT theo loại case ──
      if (tc.expected.errorMessage) {
        // R2: Text assertion
        await expect(page.locator('.error-message')).toHaveText(tc.expected.errorMessage);
        // R2: Visibility assertion
        await expect(page.locator('.error-message')).toBeVisible();
      }

      if (tc.expected.message) {
        await expect(page.locator('.success-message')).toContainText(tc.expected.message);
      }

      if (tc.expected.url) {
        // R2: URL/Navigation assertion
        await expect(page).toHaveURL(tc.expected.url);
      }
    });
  }
});
```

---

## Output bắt buộc

### 1. File spec TypeScript
**Vị trí:** `automation/tests/fr{XX}-[tên-feature].spec.ts`

File phải:
- [ ] Import data từ JSON (không hardcode)
- [ ] Có `test.describe` với "Run by: {MSSV}" trong tên
- [ ] Có ít nhất 3 loại assertion
- [ ] Có `beforeEach` xử lý navigation và điều kiện khởi đầu
- [ ] Loop qua `testData`, bỏ qua case `automate: false`
- [ ] Tên test theo format: `${tc.id} - ${tc.description}`

### 2. Cập nhật file data JSON (nếu cần)
Nếu phát hiện JSON thiếu field cần thiết cho script, bổ sung thêm field và cập nhật lại `automation/data/fr{XX}-testcases-draft.json`.

### 3. Self-review Checklist (bắt buộc xuất ra sau khi sinh script)

Sau khi sinh xong script, **bắt buộc** liệt kê các điểm yếu tiềm ẩn theo mẫu:

```
## ⚠️ Self-review Checklist — Những điểm cần bạn kiểm tra tay

### Rủi ro về Selector (kiểm tra bằng browser DevTools)
- [ ] Selector `#email` — xác nhận đúng với DOM thực tế chưa?
      → Nếu sai: thay bằng page.getByLabel('Email') hoặc [data-testid='email']
- [ ] Selector `.error-message` — có thể bị thay đổi sau SUT update
      → Nếu sai: inspect DOM khi có lỗi thật để lấy đúng class/id

### Rủi ro về Assertion text
- [ ] TC03: toHaveText("Email không tồn tại trong hệ thống")
      → Xác nhận nguyên văn này đúng 100% với UI chưa? (kể cả dấu câu, in hoa/thường)
- [ ] TC07: expected.message chưa xác nhận — ghi là "[cần verify tay]"

### Rủi ro về Logic & State
- [ ] TC02 (Positive full flow): Test này 2 bước — nếu Bước 1 thất bại, Bước 2 sẽ bị skip
      → Nên tách thành 2 test độc lập hoặc dùng test.step()
- [ ] Chưa có cleanup sau test tạo side effect

### Case không automate được
- [ ] TC09 (OTP hết hạn) — cần chờ thời gian thực, không automate được
- [ ] TC11 (email thật) — cần email server thật

### Điểm khác
- [ ] Chưa test trên state đã login — nếu có redirect tự động, test có thể fail
- [ ] Chưa cover responsive / mobile view
```

---

## Nguyên tắc bắt buộc

1. **KHÔNG tự sinh selector** — mọi locator trong script phải có nguồn từ `fr-context.md` mục 2
2. **KHÔNG paraphrase assertion text** — copy nguyên văn từ `fr-context.md` mục 4/5
3. **KHÔNG dùng `waitForTimeout`** — thay bằng web-first assertion hoặc `waitForURL`
4. **Ghi chú mọi sai lệch** — nếu phải dùng selector không lý tưởng (CSS thay vì data-testid), ghi vào Self-review checklist để người dùng biết
5. **KHÔNG chạy test** — Skill chỉ sinh code, KHÔNG tự chạy. Việc chạy là nhiệm vụ của người dùng (bước 7 trong workflow)

---

## Ghi kết quả vào Report (bắt buộc)

Sau khi script được xác nhận OK, cập nhật **4 nơi**:

### 1. `report/MAIN_REPORT.md` — Data-driven & Assertions

| FR | Mục cần cập nhật |
|---|---|
| FR-03 (Feature A) | **Mục 2.2** (bảng AI-first quy trình) + **Mục 2.4** (data file) + **Mục 2.5** (assertion patterns) |
| FR-11 (Feature B) | Tương tự: mục 3.2, 3.4, 3.5 |
| FR-17 (Feature C) | Tương tự: mục 4.2, 4.4, 4.5 |

```markdown
### X.4. Data-driven test data
- File: `automation/data/fr{XX}-testcases-draft.json`
- Loại dữ liệu: [email, password, OTP, expected message...]

### X.5. Assertion patterns sử dụng (≥3 loại)
| Loại assertion | Ví dụ dùng trong test |
|---|---|
| Visibility/state | `await expect(locator).toBeVisible()` |
| Text/content | `await expect(locator).toHaveText('...')` |
| URL/navigation | `await expect(page).toHaveURL('/login')` |
```

### 2. `report/TEST_CASE_CATALOG.md` — Cập nhật cột Status

Sau khi script được xác nhận, cập nhật cột **`Status`** của từng TC từ `Planned` → `Scripted` và điền cột **`Automated spec/title`** bằng tên test thực tế trong file `.spec.ts`.

### 3. `report/BUG_REPORT.md` — Nếu phát hiện bug khi review script

Nếu trong quá trình viết script, phát hiện expected result trong context file mâu thuẫn với UI thực tế (potential bug), ghi vào `report/BUG_REPORT.md` theo format:
```markdown
## BUG-[NNN] – [Tiêu ngắn]
| Field | Value |
|---|---|
| Feature / test ID | FR-{XX} / TC{YY} |
| Severity | [Critical/Major/Minor] |
| GitHub Issue | [TODO: tạo sau khi confirm] |
...
```
> ⚠️ Chỉ ghi bug sau khi đã tự verify tay trên app. Không được AI tự điền bug nếu chưa confirm.

### 4. `automation/tests/fr{XX}-[tên-feature].spec.ts` — File chính

---

## Human Review Gate — Dừng ở đây!

Sau khi sinh xong, trình bày:

```
✅ Đã sinh script cho FR-{XX}:
   Output: automation/tests/fr{XX}-[tên].spec.ts
   
   Tổng quan:
   - Số test case tự động: [N] (bỏ qua [K] case manual)
   - Loại assertion đã dùng: toBeVisible ✅ | toHaveText ✅ | toHaveURL ✅
   - Selector nguồn: từ fr-context.md mục 2 ✅

⚠️ Self-review checklist đã xuất ở trên — vui lòng kiểm tra từng mục.

⏸️ Bước tiếp theo (do BẠN thực hiện, không phải AI):
   1. Mở file spec vừa tạo, đọc lướt toàn bộ
   2. Kiểm tra từng selector trong DevTools của app đang chạy
   3. Chạy thử 1 test: npx playwright test fr{XX}... --headed
   4. Nếu cần sửa, sửa thủ công hoặc yêu cầu AI fix cụ thể từng lỗi
   5. Sau khi OK, chạy full suite: npx playwright test
```

---

## Handoff sang multibrowser-runner-report

Sau khi người dùng xác nhận script OK, gợi ý bước tiếp:

```
Script fr{XX} đã ổn. Hãy cấu hình chạy multi-browser và xuất HTML report:

Yêu cầu:
- Chạy trên 3 browser: Chromium, Firefox, WebKit
- HTML report có dòng "Run by: 23127104" và ISO timestamp
- MSSV: 23127104
- Thư mục output report: playwright-report/fr{XX}/

Cập nhật playwright.config.ts và hướng dẫn lệnh chạy cụ thể.
```
