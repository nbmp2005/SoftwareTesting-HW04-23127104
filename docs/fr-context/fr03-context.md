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
| OTP | `getByPlaceholder(/OTP/i)` | text | — | ✅ | Độ dài 6 chữ số |
| Mật khẩu mới | `getByPlaceholder(/Mật khẩu mới/i)` | password | — | ✅ | Tuân thủ FR-01 |
| Xác nhận mật khẩu | `getByPlaceholder('Đặt lại mật khẩu')` | password | `Đặt lại mật khẩu` | ✅ | Phải khớp với Mật khẩu mới |
| Submit | `getByRole('button', { name: /Xác nhận|Lưu/i })` | submit | — | — | — |

---

## 3. Business Rules phát hiện (từ UI behavior & Đặc tả của User)

| Rule ID | Mô tả rule | Bằng chứng (URL + hành động thực hiện) | Mức độ chắc chắn |
|---|---|---|---|
| RULE-01 | Email lấy OTP phải là email đã đăng ký trong hệ thống | User provided | ✅ Xác nhận |
| RULE-02 | ~~Giao diện phải hiển thị chỉ báo bước (VD: "Bước 1 / 2")~~ | Người dùng xác nhận: UI thực tế KHÔNG hiển thị step indicator | ❌ Không xác nhận |
| RULE-03 | Hệ thống sinh mã OTP 6 chữ số ngẫu nhiên và hiển thị trên màn hình demo | User provided | ✅ Xác nhận |
| RULE-04 | Hai trường mật khẩu (mật khẩu mới và xác nhận) phải khớp nhau | User provided | ✅ Xác nhận |
| RULE-05 | OTP chỉ hợp lệ cho email đã yêu cầu | User provided | ✅ Xác nhận |
| RULE-06 | Mật khẩu mới phải tuân thủ điều kiện FR-01 | User provided | ✅ Xác nhận |

---

## 4. Error Messages (Cần verify tay trên SUT)

| Trigger | Error Message (nguyên văn) | Element selector chứa message |
|---|---|---|
| Submit email rỗng | HTML5 validation hoặc `Email không được để trống` | popup / `.error` |
| Email sai định dạng | `Email không hợp lệ` | `.error` |
| Pass mới và xác nhận không khớp | `Mật khẩu không khớp` | `.error` |
| OTP sai | `OTP không chính xác` | `.error` |

*(Lưu ý: Các câu thông báo lỗi trên cần xác minh nguyên văn lại khi chạy automation, vì quá trình Playwright MCP bị lỗi browser context chưa extract được text thực tế)*

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
- TC: Nhập email sai định dạng (VD "abc") → báo lỗi
- TC: Để trống email → báo lỗi yêu cầu nhập
- TC: Đặt lại pass thành công với OTP đúng và pass hợp lệ
- TC: Nhập sai OTP ở Bước 2 → báo lỗi OTP sai
- TC: Nhập 2 password không khớp → báo lỗi không khớp
- TC: Bấm "Quay lại đăng nhập" → điều hướng về trang `/login`
- TC: Nhập password mới yếu (vi phạm FR-01) → báo lỗi
- TC: Dùng OTP sinh ra cho email A để reset pass cho email B → báo lỗi
