# FR Context: FR-03 (Quên mật khẩu & Đặt lại mật khẩu)

**Khám phá bởi:** fr-context-explorer skill  
**Ngày khám phá:** 2026-08-26T09:04:21+07:00
**Base URL:** http://localhost:5173  
**Phương pháp:** UI exploration & User Specification (đã xử lý graceful fallback do Playwright driver error)

---

## 1. Danh sách URL & màn hình liên quan

| URL | Mô tả màn hình |
|---|---|
| `/forgot-password` | Form nhập email bước 1 (Lấy mã OTP) |
| `/forgot-password` | Form nhập OTP + mật khẩu mới (Bước 2) | 

---

## 2. Form Fields & Selectors

### Form: Lấy mã OTP (Bước 1)

| Field | id / data-testid / role | type | placeholder | required | Constraint phát hiện |
|---|---|---|---|---|---|
| Email | `getByPlaceholder('Nhập Email của bạn')` | email/text | `Nhập Email của bạn` | ✅ | Định dạng email hợp lệ |
| Submit | `getByRole('button', { name: 'Lấy mã OTP' })` | submit | — | — | — |

> ⚠️ Ghi chú: Không có nút "Quay lại đăng nhập" hay Step Indicator trên giao diện thực tế (đã xác nhận bởi người dùng).

### Form: Đặt lại mật khẩu (Bước 2)

| Field | id / data-testid / role | type | placeholder | required | Constraint phát hiện |
|---|---|---|---|---|---|
| OTP hiển thị | `getByText(/^Mã OTP của bạn là:\s*\d+$/)` | text | — | — | Dùng để đọc OTP thực tế cho các testcase không kiểm tra độ dài OTP |
| OTP | `getByText(/Mã OTP \(\d+ số\)/).locator('..').locator('input')` | text | — | ✅ | Nghiệp vụ yêu cầu 6 chữ số; UI hiện quan sát thấy 4 chữ số (potential bug riêng) |
| Mật khẩu mới | `getByText(/^Mật khẩu mới$/).locator('..').locator('input')` | password | — | ✅ | Input không có placeholder; tuân thủ FR-01 |
| Submit | `getByRole('button', { name: 'Đặt lại mật khẩu', exact: true })` | submit | — | — | — |

---

## 3. Business Rules phát hiện (từ UI behavior & Đặc tả của User)

| Rule ID | Mô tả rule | Bằng chứng (URL + hành động thực hiện) | Mức độ chắc chắn |
|---|---|---|---|
| RULE-01 | Email lấy OTP phải là email đã đăng ký trong hệ thống | User provided | ✅ Xác nhận |
| RULE-02 | ~~Giao diện phải hiển thị chỉ báo bước (VD: "Bước 1 / 2")~~ | Người dùng xác nhận: UI thực tế KHÔNG hiển thị step indicator | ❌ Không xác nhận |
| RULE-03 | Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên và hiển thị trên màn hình demo | User provided | ✅ Xác nhận |
| RULE-04 | UI thực tế chỉ có trường Mật khẩu mới, không có trường xác nhận mật khẩu | UI screenshot và Playwright artifact | ✅ Xác nhận |
| RULE-05 | OTP chỉ hợp lệ cho email đã yêu cầu | User provided | ✅ Xác nhận |
| RULE-06 | Mật khẩu mới phải tuân thủ điều kiện FR-01 | User provided | ✅ Xác nhận |

---

## 4. Error / rejection behavior

| Trigger | Error Message (nguyên văn) | Element selector chứa message |
|---|---|---|
| Submit email rỗng | HTML5 validation hoặc `Email không được để trống` | Native validity hoặc `getByText('Email không được để trống', { exact: true })` |
| Email sai định dạng | Từ chối submit, vẫn ở Bước 1 và không sinh OTP | URL `/forgot-password` + nút `Lấy mã OTP` vẫn visible |
| Email chưa đăng ký | Từ chối submit, vẫn ở Bước 1 và không sinh OTP | URL `/forgot-password` + nút `Lấy mã OTP` vẫn visible |
| OTP sai | Từ chối submit, vẫn ở Bước 2 và không báo thành công | OTP display + nút `Đặt lại mật khẩu` vẫn visible |
| Mật khẩu yếu | Từ chối submit, vẫn ở Bước 2 và không báo thành công | OTP display + nút `Đặt lại mật khẩu` vẫn visible |
| OTP chứa chữ cái | Từ chối submit, vẫn ở Bước 2 và không báo thành công | URL `/forgot-password` + OTP display vẫn visible |

*(Lưu ý: Các câu thông báo lỗi cần xác minh nguyên văn lại khi chạy automation; selector ưu tiên nội dung/role thay vì CSS class đoán.)*

---

## 5. Success Messages (Cần verify tay)

| Trigger | Success Message (nguyên văn) | Hành vi sau đó |
|---|---|---|
| Lấy OTP thành công | `Gửi OTP thành công` (hoặc OTP xuất hiện trên UI) | Chuyển sang Form Bước 2 |
| Đặt lại pass thành công | `Cập nhật mật khẩu thành công` | Chuyển về màn hình Login |

---

## 6. Điểm KHÔNG CHẮC CHẮN — cần người dùng xác nhận tay

| # | Điểm chưa rõ | Cách xác minh đề xuất |
|---|---|---|
| 1 | Các message lỗi/thành công chính xác (nguyên văn) là gì? | Thử thao tác tay trên UI SUT và điền nguyên văn báo lỗi vào file test case / json test data. |
| 2 | Điều kiện mật khẩu FR-01 cụ thể là gì? | Xác nhận lại rule FR-01 (số lượng ký tự, ký tự đặc biệt). |

---

## 7. Gợi ý test case từ khám phá

- TC: Nhập email hợp lệ → hiển thị OTP và chuyển sang Bước 2
- TC: OTP được sinh phải gồm đúng 6 chữ số (test riêng cho RULE-03)
- TC: Nhập email sai định dạng (VD "abc") → báo lỗi
- TC: Để trống email → báo lỗi yêu cầu nhập
- TC: Đặt lại pass thành công với OTP đúng và pass hợp lệ
- TC: Nhập sai OTP ở Bước 2 → báo lỗi OTP sai
- TC: Bấm "Quay lại đăng nhập" → điều hướng về trang `/login`
- TC: Nhập password mới yếu (vi phạm FR-01) → báo lỗi
- TC: Dùng OTP sinh ra cho email A để reset pass cho email B → báo lỗi
