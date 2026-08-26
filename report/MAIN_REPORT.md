# HW04 – Automation Testing – Main Report

**Họ tên:** Nguyễn Bình Minh Phương
**MSSV:** 23127104
**Lớp:** 23KTPM4
**SUT:** EShop — https://github.com/ttbhanh/eshop-sut
**GitHub repo bài làm:** https://github.com/nbmp2005/SoftwareTesting-HW04-23127104

---

## 0. AI Policy Declaration

I use AI tools for the following tasks: requirement analysis, test design, data-driven Playwright generation, script review, documentation scaffolding, and gap analysis. All final scripts, expected results, executions, reports, bug conclusions, and submission artifacts were reviewed by me.

---

## 1. Feature Selection

| Pool | FR | Tên chức năng |
|---|---|---|
| A | FR-03 | Quên mật khẩu & Đặt lại mật khẩu (2 bước) |
| B | (User) Order History | Xem lịch sử đơn hàng (User) |
| C | FR-17 | Quản lý Mã Giảm Giá (Coupon CRUD) |


---

## 2. Feature A — FR-03: Quên mật khẩu & Đặt lại mật khẩu

### 2.1. Mô tả chức năng
- **Bước 1 — Lấy mã OTP:** người dùng nhập email đã đăng ký → hệ thống sinh OTP và hiển thị trực tiếp trên màn hình demo.
- **Bước 2 — Đặt lại mật khẩu:** nhập OTP + mật khẩu mới rồi bấm `Đặt lại mật khẩu`. UI hiện tại không có trường xác nhận mật khẩu. Mật khẩu mới phải theo điều kiện FR-01 và OTP chỉ hợp lệ cho đúng email đã yêu cầu.

### 2.2. Quy trình dùng AI (AI-first, từng bước)


| Bước | Việc làm | Công cụ/Skill dùng | Ghi chú |
|---|---|---|---|
| 1 | Khám phá business rule từ source code SUT | `fr-context-explorer` | ... |
| 2 | Sinh danh sách test case (≥12) | `testcase-generator` | ... |
| 3 | Review, chọn/sửa test case | Thủ công | ... |
| 4 | Convert test case → script Playwright | `playwright-script-writer` | ... |
| 5 | Tách dữ liệu test ra file riêng | ... | `data/fr03-reset-password.json` |
| 6 | Cấu hình chạy multi-browser + report | `multibrowser-runner-report` | ... |
| 7 | Review & fix script AI sinh | Thủ công | xem mục 2.5 |

### 2.3. Danh sách Test Case (≥12)

| ID | Loại | Mô tả | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Tự động hóa? |
|---|---|---|---|---|---|---|
| TC01 | Positive | Nhập email hợp lệ ở Bước 1 | Vào /forgot-password; Nhập email; Bấm Lấy mã OTP | `admin@eshop.com` | Chuyển sang Bước 2 | ✅ |
| TC02 | Positive | Nhập đúng OTP + mật khẩu mới hợp lệ | Vào Bước 2; Nhập OTP; Nhập mật khẩu mới mạnh; Bấm Đặt lại mật khẩu | OTP đúng, pass: `Abc@12345` | Cập nhật mật khẩu thành công | ✅ |
| TC03 | Positive | Bấm Quay lại đăng nhập | Vào /forgot-password; Bấm Quay lại đăng nhập | - | Chuyển về /login | ✅ |
| TC04 | Positive / BVA | OTP được sinh đúng 6 chữ số | Nhập email hợp lệ; Bấm Lấy mã OTP; Đếm số chữ số của OTP hiển thị | Độ dài mong đợi: `6` | OTP hiển thị gồm đúng 6 chữ số | ✅ |
| TC05 | Negative | Email không được để trống | Để trống email; Bấm Lấy mã OTP | `""` | Lỗi: Email không được để trống | ✅ |
| TC06 | Negative | Email sai định dạng | Nhập "abc"; Bấm Lấy mã OTP | `"abc"` | Vẫn ở Bước 1 và không sinh OTP | ✅ |
| TC07 | Negative | OTP sai | Vào Bước 2; nhập OTP khác OTP thật nhưng cùng độ dài; Bấm Đặt lại mật khẩu | OTP được dẫn xuất động | Vẫn ở Bước 2 và không báo thành công | ✅ |
| TC08 | Negative | Mật khẩu và xác nhận không khớp | Không thực hiện được trên UI hiện tại | UI không có trường xác nhận mật khẩu | Không áp dụng với UI hiện tại | ⬜ (Không có trường xác nhận) |
| TC09 | Negative | Email không tồn tại (chưa đăng ký) | Nhập email lạ; Bấm Lấy mã OTP | `"notexist@test.com"` | Vẫn ở Bước 1 và không sinh OTP | ✅ |
| TC10 | Edge | Mật khẩu mới quá yếu (vi phạm FR-01) | Nhập pass "123" ở Bước 2 | `"123"` | Vẫn ở Bước 2 và không báo thành công | ✅ |
| TC11 | Edge | Dùng OTP của email A cho email B | Đảo OTP giữa 2 quá trình | - | Lỗi: `Sai otp` | ⬜ (Setup 2 luồng khó) |
| TC12 | Edge | OTP hết hạn | Chờ 30 phút rồi nhập OTP | - | Lỗi: `OTP hết hạn` | ⬜ (Chờ thời gian lâu) |
| TC13 | Edge | Nhập OTP không phải số | Nhập "abcdef"; Bấm Đặt lại mật khẩu | `"abcdef"` | Từ chối OTP chữ, vẫn ở Bước 2 và không báo thành công | ✅ |

### 2.4. Data-driven test data
- File: `automation/data/fr03-testcases-draft.json`
- Loại dữ liệu: email, OTP, mật khẩu mới, expected behavior/error/success messages
- Import trong spec: `import testData from '../data/fr03-testcases-draft.json'`

### 2.5. Assertion patterns sử dụng (≥3 loại)
| Loại assertion | Ví dụ dùng trong test |
|---|---|
| Visibility/state | `await expect(page.getByPlaceholder('Nhập Email của bạn')).toBeVisible()` |
| Text/content | `await expect(page.locator('body')).toContainText(tc.expected.message!)` |
| URL/navigation | `await expect(page).toHaveURL(/login/)` |

### 2.6. Kết quả chạy multi-browser

| Browser | Số TC chạy | Pass | Fail | Link HTML report |
|---|---|---|---|---|
| Chromium | | | | |
| Firefox | | | | |
| WebKit | | | | |

*(Mỗi report phải hiển thị "Run by: {MSSV}" + ISO timestamp.)*

### 2.7. Review & Gap Analysis (AI đã sai/thiếu gì)

| Vấn đề AI mắc phải | Mô tả cụ thể | Bạn đã sửa như thế nào | Vì sao AI mắc lỗi này |
|---|---|---|---|
| Selector giòn | ví dụ dùng CSS class thay vì data-testid | đổi sang locator ổn định | Prompt chưa cung cấp selector thật / model đoán theo pattern phổ biến |
| Assertion yếu | chỉ check `toBeVisible`, không check nội dung | thêm `toHaveText` | AI ưu tiên pattern generic |
| Thiếu edge case | thiếu case OTP chéo email | bổ sung TC07 | Prompt ban đầu chưa nêu rõ rule này |
| Wait không ổn định | dùng `waitForTimeout` cố định | đổi sang `waitForSelector`/`toBeVisible` auto-retry | Model chưa hiểu rõ cơ chế async của SUT |

### 2.8. Test case không automate được
| TC | Lý do |
|---|---|
| TC08 | UI hiện tại không có trường xác nhận mật khẩu nên testcase mật khẩu không khớp không áp dụng. |
| TC11 | Cần hai tài khoản và hai luồng OTP độc lập để kiểm tra OTP chéo email. |
| TC12 | Phụ thuộc thời gian hết hạn OTP thực tế, không phù hợp chạy tự động trong suite hiện tại. |

### 2.9. Bug phát hiện (nếu có)
| Bug ID | Mô tả | Steps to reproduce | Ảnh hưởng | GitHub Issue link | Screenshot |
|---|---|---|---|---|---|
| BUG-01 | | | | | |

---

## 3. Feature B — Xem lịch sử đơn hàng (User)

### 3.1. Mô tả chức năng
- Người dùng chỉ xem được đơn hàng của chính mình.
- Hiển thị: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái hiện tại.
- Sơ đồ trạng thái đơn hàng (Order State Machine):

```
pending --[Admin xác nhận]--> confirmed --[Admin giao hàng]--> shipping --[Admin hoàn tất]--> delivered
   |                              |
   |--[User/Admin hủy]            |--[User/Admin hủy]
   v                              v
canceled                      canceled
```
- Trạng thái phải dịch tiếng Việt rõ ràng, phân biệt bằng màu sắc.

### 3.2. Quy trình dùng AI (AI-first, từng bước)
*(giống cấu trúc bảng ở mục 2.2)*

### 3.3. Danh sách Test Case (≥12)

| ID | Loại | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Tự động hóa? |
|---|---|---|---|---|---|
| TC01 | Positive | User A xem danh sách đơn hàng của mình | tài khoản có đơn hàng | Hiển thị đúng danh sách đơn của A | ✅ |
| TC02 | Positive | Kiểm tra hiển thị đủ 4 cột: Mã đơn, Ngày đặt, Tổng tiền, Trạng thái | - | Đủ thông tin | ✅ |
| TC03 | Negative | User A cố truy cập chi tiết đơn hàng của User B (qua URL/order id) | order id của B | Từ chối truy cập | ✅ |
| TC04 | Positive | Đơn ở trạng thái pending hiển thị đúng nhãn + màu tiếng Việt | - | "Chờ xác nhận" đúng màu | ✅ |
| TC05 | Positive | Đơn ở trạng thái confirmed hiển thị đúng nhãn + màu | - | "Đã xác nhận" đúng màu | ✅ |
| TC06 | Positive | Đơn ở trạng thái shipping hiển thị đúng nhãn + màu | - | "Đang giao" đúng màu | ✅ |
| TC07 | Positive | Đơn ở trạng thái delivered hiển thị đúng nhãn + màu | - | "Đã giao" đúng màu | ✅ |
| TC08 | Positive | Đơn ở trạng thái canceled hiển thị đúng nhãn + màu | - | "Đã hủy" đúng màu | ✅ |
| TC09 | Edge | Danh sách rỗng (chưa từng đặt đơn) | tài khoản mới | Hiển thị thông báo "chưa có đơn hàng" | ✅ |
| TC10 | Edge | User hủy đơn ở trạng thái pending | đơn pending | Chuyển sang canceled | ✅ |
| TC11 | Negative | User hủy đơn ở trạng thái shipping (nếu không cho phép) | đơn shipping | Từ chối / không cho hủy | ✅ |
| TC12 | Edge | Sắp xếp danh sách đơn theo ngày đặt mới nhất | nhiều đơn | Thứ tự đúng | ✅ |

### 3.4–3.9. *(giữ nguyên cấu trúc mục 2.4 → 2.9, áp dụng cho Feature B)*

---

## 4. Feature C — FR-17: Quản lý Mã Giảm Giá (Coupon CRUD)

### 4.1. Mô tả chức năng
- Admin: Thêm / Xem / Xóa coupon.
- Các trường bắt buộc:
  - `code`: duy nhất
  - `type`: percent / fixed
  - `discount_value`: dương
  - `expired_at`
  - `min_order_amount`: >= 0
  - `max_uses_per_user`: >= 1

### 4.2. Quy trình dùng AI (AI-first, từng bước)
*(giống cấu trúc bảng ở mục 2.2)*

### 4.3. Danh sách Test Case (≥12)

| ID | Loại | Bước thực hiện | Dữ liệu vào | Kết quả mong đợi | Tự động hóa? |
|---|---|---|---|---|---|
| TC01 | Positive | Tạo coupon type=percent hợp lệ | code, %, ngày hết hạn hợp lệ | Tạo thành công | ✅ |
| TC02 | Positive | Tạo coupon type=fixed hợp lệ | code, số tiền cố định | Tạo thành công | ✅ |
| TC03 | Negative | Tạo coupon với `code` trùng | code đã tồn tại | Báo lỗi trùng | ✅ |
| TC04 | Negative | `discount_value` âm | -10 | Báo lỗi validate | ✅ |
| TC05 | Negative | `discount_value` = 0 | 0 | Báo lỗi validate | ✅ |
| TC06 | Negative | `min_order_amount` âm | -1 | Báo lỗi validate | ✅ |
| TC07 | Edge | `min_order_amount` = 0 | 0 | Chấp nhận (biên hợp lệ) | ✅ |
| TC08 | Negative | `max_uses_per_user` = 0 | 0 | Báo lỗi (phải >=1) | ✅ |
| TC09 | Edge | `max_uses_per_user` = 1 | 1 | Chấp nhận (biên hợp lệ) | ✅ |
| TC10 | Negative | `expired_at` là ngày trong quá khứ | ngày cũ | Báo lỗi / không cho tạo | ✅ |
| TC11 | Positive | Xem danh sách coupon | - | Hiển thị đầy đủ, đúng dữ liệu | ✅ |
| TC12 | Positive | Xóa coupon | coupon tồn tại | Xóa thành công, biến mất khỏi danh sách | ✅ |
| TC13 | Negative | `code` để trống | "" | Báo lỗi bắt buộc | ✅ |
| TC14 | Negative | `type` không hợp lệ (không phải percent/fixed) | "abc" | Báo lỗi validate | ✅ |

### 4.4–4.9. *(giữ nguyên cấu trúc mục 2.4 → 2.9, áp dụng cho Feature C)*

---

## 5. Tổng kết tự động hóa (Test Summary)

| Chỉ số | Feature A (FR-03) | Feature B (Order History) | Feature C (FR-17) | Tổng |
|---|---|---|---|---|
| Số test case thiết kế | | | | |
| Số test case automate | | | | |
| Số lượt chạy browser | | | | ≥9 |
| Pass | | | | |
| Fail | | | | |
| Số bug phát hiện | | | | |

---

## 6. Danh sách tài liệu đính kèm

- [ ] `ai-audit-report.md` / `.pdf`
- [ ] `ai-critique.md` / `.pdf`
- [ ] `commit-log.txt`
- [ ] `playwright-report/` (3 browser x 3 feature)
- [ ] `bug-report.md` + screenshots trên GitHub Issues
- [ ] `README.md` (self-assessment + test summary)
- [ ] Link video demo YouTube (unlisted): ...........................................
- [ ] Link repo GitHub bài làm: ...........................................
- [ ] Agent Skill kit (thư mục `agent-skill/`) + video demo skill: ...........................................

---

## 7. Self-Assessment

| No. | Criteria | Max Grade | Self-Assessed Grade |
|---|---|---|---|
| 1 | Task 1 – Feature A (FR-03) | 25 | |
| 1 | Task 1 – Feature B (Order History) | 25 | |
| 1 | Task 1 – Feature C (FR-17) | 25 | |
| 2 | Task 2 – Demo video | 15 | |
| 3 | Agent Skills | 10 | |
| | **Total** | **100** | |
