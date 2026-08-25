---
name: testcase-generator
description: Sinh test case có cấu trúc (ID, loại, bước, kết quả mong đợi) từ file fr-context.md và mô tả FR. Dùng SAU fr-context-explorer, TRƯỚC playwright-script-writer. Output gồm bảng Markdown cho MAIN_REPORT.md và file JSON draft làm data cho automation.
---

# Testcase Generator

Skill này nhận đầu vào là file `docs/fr-context/fr{XX}-context.md` (từ `fr-context-explorer`) và đặc tả FR, rồi sinh ra bộ test case đầy đủ theo yêu cầu HW04: **≥12 case, ≥4 Positive / ≥4 Negative / ≥4 Edge**, xuất ra cả bảng Markdown lẫn file JSON.

> ⚠️ **Human Review Gate bắt buộc:** Skill DỪNG lại sau khi sinh xong, trình bày kết quả, và **chờ người dùng xác nhận** trước khi chuyển sang `playwright-script-writer`.

---

## Điều kiện tiên quyết

Trước khi chạy skill này, phải đảm bảo đã có:
- [ ] File `docs/fr-context/fr{XX}-context.md` đã được tạo bởi `fr-context-explorer` và **người dùng đã xác nhận**
- [ ] Mô tả FR trong `docs/homework4.md` (hoặc người dùng paste trực tiếp)

Nếu chưa có file context, **dừng lại và nhắc người dùng chạy `fr-context-explorer` trước**.

---

## Input bắt buộc từ người dùng

| Field | Nguồn lấy | Bắt buộc? |
|---|---|---|
| Mã FR | Người dùng cung cấp (VD: `FR-03`) | ✅ |
| File `fr{XX}-context.md` | Đọc từ `docs/fr-context/` | ✅ |
| Đặc tả FR (mô tả yêu cầu hệ thống) | Đọc từ `docs/homework4.md` hoặc người dùng paste | ✅ |
| Số TC tối thiểu cần sinh | Mặc định: **12** (theo đề bài HW04) | ✅ |

---

## Quy trình bắt buộc (KHÔNG được bỏ qua bước nào)

### Bước 1 — Đọc & phân tích input

1. Đọc file `docs/fr-context/fr{XX}-context.md`:
   - Trích xuất tất cả **Business Rules** đã xác nhận (mục 3 trong context file)
   - Trích xuất tất cả **Error Messages** nguyên văn (mục 4)
   - Ghi nhận các **điểm KHÔNG CHẮC CHẮN** (mục 6) — đây sẽ là case "cần verify tay"
2. Đọc đặc tả FR từ `docs/homework4.md` để hiểu:
   - Luồng chính (happy path)
   - Các ràng buộc nghiệp vụ được đề cập tường minh
3. **Nếu còn điểm mơ hồ** (rule không rõ ràng, không thấy trong context file và đặc tả), hỏi người dùng trước khi tiếp tục — KHÔNG tự suy đoán.

### Bước 2 — Sinh test case theo phân loại

Sinh test case theo 3 nhóm, đảm bảo mỗi nhóm **≥4 case**:

#### Positive Cases (Happy Path) — ≥4 case
- Tất cả input hợp lệ, đúng format, đúng rule → hệ thống thực hiện thành công
- Mỗi luồng chính phải có ít nhất 1 positive case
- Ví dụ cho FR-03: Nhập email đúng → nhận OTP → nhập OTP đúng + pass mới hợp lệ → đổi mật khẩu thành công

#### Negative Cases (Unhappy Path) — ≥4 case
- Input sai format, sai rule, thiếu field bắt buộc → hệ thống từ chối và hiển thị lỗi
- Mỗi **Error Message** trong mục 4 của context file phải được cover bởi ít nhất 1 negative case
- Ví dụ cho FR-03: Email không tồn tại → lỗi; OTP sai → lỗi; mật khẩu không khớp → lỗi

#### Edge Cases (Boundary/Corner) — ≥4 case
- Giá trị tại đúng biên (boundary): min length, max length, giá trị = 0, giá trị = 1
- Trường hợp góc: field rỗng, ký tự đặc biệt, khoảng trắng đầu/cuối, input quá dài
- Các rule đặc thù của FR: khoá tài khoản sau N lần sai, OTP dùng 1 lần, coupon code trùng...
- Các điểm KHÔNG CHẮC CHẮN từ context file → đánh dấu là "cần verify tay", **không automate**

### Bước 3 — Đánh dấu khả năng tự động hoá

Với mỗi test case, đánh dấu **Automate?** theo tiêu chí:

| Nhãn | Điều kiện |
|---|---|
| ✅ Automate | Có thể thực hiện hoàn toàn qua UI Playwright (input → assert) |
| ⬜ Manual | Cần tương tác ngoài UI (email thật, chờ thời gian, thiết bị vật lý) |
| ⚠️ Verify tay | Thuộc nhóm "Không chắc chắn" trong context file — cần người dùng xác minh trước |

**Ghi rõ lý do** cho mọi case không automate được (cột riêng hoặc ghi chú bên dưới bảng).

### Bước 4 — Xuất kết quả theo 2 định dạng

#### 4a. Bảng Markdown → ghi vào `report/MAIN_REPORT.md`

Ghi vào mục tương ứng trong MAIN_REPORT.md (mục 2.3 cho Feature A, 3.3 cho Feature B, 4.3 cho Feature C):

```markdown
| ID | Loại | Mô tả | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Automate? |
|---|---|---|---|---|---|---|
| TC01 | Positive | Nhập email hợp lệ ở Bước 1 | 1. Vào /forgot-password; 2. Nhập email hợp lệ; 3. Click "Gửi OTP" | email: user@valid.com | Hiện thông báo "OTP đã được gửi", chuyển sang Bước 2 | ✅ |
| TC02 | Positive | Nhập đúng OTP + mật khẩu mới hợp lệ | 1. Nhập OTP đúng; 2. Nhập pass mới ≥8 ký tự; 3. Xác nhận pass; 4. Click Submit | otp: [OTP từ màn hình], password: Abc@12345 | Thông báo thành công, redirect về /login | ✅ |
| TC03 | Negative | Email không tồn tại | 1. Vào /forgot-password; 2. Nhập email không đăng ký; 3. Click "Gửi OTP" | email: noone@fake.com | Lỗi: "[nguyên văn error message từ context]" | ✅ |
...
```

#### 4b. File JSON draft → lưu vào `automation/data/fr{XX}-testcases-draft.json`

```json
[
  {
    "id": "TC01",
    "type": "positive",
    "description": "Nhập email hợp lệ ở Bước 1",
    "steps": [
      "Vào /forgot-password",
      "Nhập email hợp lệ vào field email",
      "Click nút Gửi OTP"
    ],
    "input": {
      "email": "user@valid.com"
    },
    "expected": {
      "message": "OTP đã được gửi",
      "behavior": "Chuyển sang Step 2"
    },
    "automate": true,
    "selector_hints": {
      "email_field": "#email",
      "submit_btn": "[data-testid='submit-btn']"
    }
  },
  {
    "id": "TC03",
    "type": "negative",
    "description": "Email không tồn tại trong hệ thống",
    "steps": [
      "Vào /forgot-password",
      "Nhập email không tồn tại",
      "Click nút Gửi OTP"
    ],
    "input": {
      "email": "noone@fake.com"
    },
    "expected": {
      "errorMessage": "[nguyên văn từ context file mục 4]"
    },
    "automate": true,
    "selector_hints": {
      "email_field": "#email",
      "error_msg": ".error-message"
    }
  },
  {
    "id": "TC09",
    "type": "edge",
    "description": "OTP hết hạn (chưa xác minh được rule)",
    "steps": ["Chờ thời gian đủ dài, thử dùng OTP cũ"],
    "input": {},
    "expected": {
      "note": "Chưa xác định — cần verify tay"
    },
    "automate": false,
    "manual_reason": "Phụ thuộc vào cơ chế thời gian thực, không thể simulate qua UI"
  }
]
```

> **Lưu ý quan trọng về JSON:** Trường `selector_hints` phải lấy **trực tiếp từ mục 2 của context file** — không được tự đặt tên selector dựa trên phỏng đoán.

---

## Nguyên tắc bắt buộc

1. **Traceability** — Mỗi test case phải truy nguyên được về ít nhất 1 Business Rule trong context file. Ghi rõ rule nào trong cột mô tả hoặc ghi chú.
2. **Coverage** — Mọi Error Message trong mục 4 của context file phải có ít nhất 1 negative case tương ứng.
3. **Không bịa selector** — `selector_hints` trong JSON phải lấy từ context file, KHÔNG được tự đặt tên dựa trên đoán mò.
4. **Không bịa expected result** — Expected message phải là nguyên văn từ context file (mục 4 hoặc 5). Nếu chưa có, để là `"[cần verify tay]"`.
5. **Không hardcode data thật** vào file JSON — Dùng giá trị đại diện có ý nghĩa (ví dụ `user@valid.com`) thay vì tài khoản thật của người dùng.

---

## Checklist sau khi sinh xong

- [ ] Tổng số TC ≥ 12
- [ ] Positive ≥ 4, Negative ≥ 4, Edge ≥ 4
- [ ] Mọi Error Message trong context file đều có TC negative tương ứng
- [ ] Mọi TC có đủ: ID, loại, mô tả, bước, dữ liệu vào, kết quả mong đợi, Automate?
- [ ] TC không automate đều có cột/ghi chú giải thích lý do
- [ ] JSON hợp lệ (không lỗi syntax), `selector_hints` lấy từ context file
- [ ] Bảng Markdown đã được ghi vào `MAIN_REPORT.md` đúng mục
- [ ] File JSON draft đã được lưu vào `automation/data/fr{XX}-testcases-draft.json`
- [ ] **Đã trình bày tóm tắt cho người dùng và chờ xác nhận** trước khi sang bước tiếp theo

---

## Ghi kết quả vào Report (bắt buộc)

Sau khi sinh xong và người dùng xác nhận, cập nhật **3 nơi**:

### 1. Bảng Markdown → `report/MAIN_REPORT.md`

| FR | Mục cần ghi trong MAIN_REPORT.md |
|---|---|
| FR-03 (Feature A) | **Mục 2.3. Danh sách Test Case (≥12)** — ghi đè toàn bộ bảng TC |
| FR-11 (Feature B) | **Mục 3.3. Danh sách Test Case (≥12)** — ghi đè toàn bộ bảng TC |
| FR-17 (Feature C) | **Mục 4.3. Danh sách Test Case (≥12)** — ghi đè toàn bộ bảng TC |

Format bảng trong MAIN_REPORT.md:
```markdown
| ID | Loại | Mô tả | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Tự động hóa? |
|---|---|---|---|---|---|---|
| TC01 | Positive | ... | ... | ... | ... | ✅ |
```

### 2. Catalog chi tiết → `report/TEST_CASE_CATALOG.md`

Copy bảng TC mởi vào TEST_CASE_CATALOG.md theo đúzng format của file này (có cột `Requirement`, `Technique/type`, `Test data key`, `Automated spec/title`, `Status`).

File này có nhiều cột hơn MAIN_REPORT.md — bảo đảm điền đủ **Preconditions**, **Cleanup**, **Test data key** (ID dòng trong file JSON), **Automated spec/title** (tên test trong file `.spec.ts`):
```markdown
| ID | Requirement | Technique/type | Priority | Preconditions | Test data key | Steps summary | Expected result/oracle | Cleanup | Automated spec/title | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| FR03-001 | FR-03 Step1 | Positive / EP | High | App running, user exists | TC01 in fr03-data.json | Navigate /forgot-password, fill email, click Submit | OTP displayed, redirect to Step2 | None | TC01 - Nhập email hợp lệ ở Bước 1 | Planned |
```

### 3. File JSON draft → `automation/data/fr{XX}-testcases-draft.json`

File này là input cho `playwright-script-writer` ở bước tiếp theo.

---

## Human Review Gate — Dừng ở đây!

Sau khi sinh xong, trình bày:

```
✅ Đã sinh [N] test case cho [Tên FR]:
   - Positive: [X] case (TC01–TCxx)
   - Negative: [Y] case (TCxx–TCxx)
   - Edge:     [Z] case (TCxx–TCxx)
   - Không automate: [K] case → lý do: [...]

📋 Các điểm cần người dùng xác nhận trước khi tiếp tục:
   1. Expected result của TC[xx] — chưa xác nhận được từ UI
   2. Rule [RULE-0X] trong context file có chính xác không?

⏸️ Đang chờ xác nhận của bạn. Sau khi bạn OK, skill sẽ gợi ý prompt
   để chuyển sang playwright-script-writer.
```

---

## Handoff sang playwright-script-writer

Sau khi người dùng xác nhận, gợi ý prompt:

```
Dựa vào:
- File test case đã duyệt: automation/data/fr{XX}-testcases-draft.json
- File context (selectors): docs/fr-context/fr{XX}-context.md

Hãy sinh Playwright test script (TypeScript) cho FR-{XX} theo yêu cầu:
1. Import data 100% từ automation/data/fr{XX}-testcases-draft.json
2. Dùng ≥3 loại assertion: toBeVisible(), toHaveText('...'), toHaveURL('...')
3. Nhóm test bằng test.describe('[Tên FR]')
4. Đặt tên test theo ID: "TC01 - [mô tả ngắn]"
5. Dùng selector từ file context (không tự đặt)
6. Sau khi viết xong, liệt kê "Self-review checklist" các rủi ro cần tôi kiểm tra
Output: automation/tests/fr{XX}-[tên-feature].spec.ts
```
