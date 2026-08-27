# FR Context: FR-17 — Quản lý Mã Giảm Giá (Coupon CRUD)

**Khám phá bởi:** fr-context-explorer skill  
**Ngày khám phá:** 2026-08-26T21:21:23.1785987+07:00  
**Base URL:** http://localhost:5174/  
**Phương pháp:** Black-box UI exploration via Playwright MCP  

---

## 1. Danh sách URL & màn hình liên quan

| URL / điều hướng | Mô tả màn hình | Screenshot |
|---|---|---|
| `/` khi chưa đăng nhập | Form "Admin Login" | `docs/fr-context/fr17-login.png` |
| `/` → đăng nhập → chọn "Mã Giảm Giá" | Form tạo coupon và bảng danh sách coupon; SPA giữ nguyên URL `/` | `docs/fr-context/fr17-coupon-list-initial.png` |
| Form rỗng → "Tạo mã" | HTML native validation tại field bắt buộc đầu tiên | `docs/fr-context/fr17-empty-required-validation.png` |
| Tạo percent hợp lệ | Row percent mới xuất hiện trong bảng | `docs/fr-context/fr17-valid-percent-created.png` |
| Tạo fixed hợp lệ | Row fixed mới xuất hiện trong bảng | `docs/fr-context/fr17-valid-fixed-created.png` |
| Xóa coupon vừa tạo | Row biến mất ngay, không có confirm/success message | `docs/fr-context/fr17-valid-fixed-deleted.png` |

---

## 2. Form Fields & Selectors

### Form đăng nhập Admin — `/`

| Field / Element | Selector thực tế | type | placeholder | required | Constraint phát hiện |
|---|---|---|---|---|---|
| Email | `getByRole('textbox', { name: 'Email' })` | text | `Email` | ❌ | Không có id/name/data-testid |
| Password | `getByRole('textbox', { name: 'Password' })` | password | `Password` | ❌ | Không có id/name/data-testid |
| Login | `getByRole('button', { name: 'Login' })` | button | — | — | — |
| Điều hướng coupon | `getByText('Mã Giảm Giá', { exact: true })` | `li` | — | — | SPA không đổi URL |

### Form "Tạo mã giảm giá mới"

| Field / Element | Selector thực tế | type | placeholder / option | required | Constraint phát hiện |
|---|---|---|---|---|---|
| `code` | `getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' })` | text | `Mã coupon (VD: SAVE10)` | ✅ | Không có maxlength/pattern; uniqueness kiểm tra khi submit |
| `type` | `getByRole('combobox')` | select | `percent` = "Phần trăm (%)"; `fixed` = "Số tiền cố định (₫)" | ❌ | Mặc định `percent`; UI chỉ có 2 option |
| `discount_value` khi percent | `getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' })` | number | `Giá trị % (VD: 10)` | ✅ | Không có `min`, `max`, `step` |
| `discount_value` khi fixed | `getByRole('spinbutton', { name: 'Số tiền (VD: 50000)' })` | number | `Số tiền (VD: 50000)` | ✅ | Placeholder đổi theo type; không có `min`, `max`, `step` |
| `min_order_amount` | `getByRole('spinbutton', { name: 'Đơn tối thiểu (₫)' })` | number | `Đơn tối thiểu (₫)` | ❌ | Mặc định `0`; không có `min` |
| `expired_at` | `getByPlaceholder('Ngày hết hạn')` | date | `Ngày hết hạn` | ✅ | Không có `min`; nhận ngày quá khứ |
| `max_uses_per_user` | `getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' })` | number | `Số lần dùng tối đa/người` | ❌ | Mặc định `1`; DOM có `min="1"` |
| Submit | `getByRole('button', { name: 'Tạo mã' })` | button | — | — | — |

### Bảng danh sách coupon

| Element | Selector thực tế | Ghi chú |
|---|---|---|
| Heading | `getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })` | Heading cấp 2 |
| Table | `getByRole('table')` | Bảng coupon hiện có |
| Headers | `getByRole('columnheader', { name: ... })` | `Mã`, `Loại`, `Giá trị`, `Đơn tối thiểu`, `Hết hạn`, `Giới hạn/người`, `Hành động` |
| Row theo code | `getByRole('row').filter({ hasText: code })` | Dùng code duy nhất để cô lập row |
| Xóa trong row | `row.getByRole('button', { name: 'Xóa' })` | Xóa ngay, không có dialog xác nhận |

> Các element FR-17 không có `id`, `name` hoặc `data-testid`; selector ưu tiên role/placeholder và row chứa coupon code.

---

## 3. Business Rules phát hiện (từ UI behavior)

| Rule ID | Mô tả rule | Bằng chứng (URL + hành động thực hiện) | Mức độ chắc chắn |
|---|---|---|---|
| RULE-01 | Chưa đăng nhập chỉ thấy form "Admin Login"; đăng nhập đúng mới thấy dashboard và mục "Mã Giảm Giá" | Mở `http://localhost:5174/`, đăng nhập qua UI bằng admin được cung cấp | ✅ Xác nhận |
| RULE-02 | Admin xem được bảng coupon với 7 cột: Mã, Loại, Giá trị, Đơn tối thiểu, Hết hạn, Giới hạn/người, Hành động | Chọn "Mã Giảm Giá" sau login | ✅ Xác nhận |
| RULE-03 | `type` chỉ chọn được `percent` hoặc `fixed`; placeholder discount thay đổi theo type | Chuyển combobox từ percent sang fixed | ✅ Xác nhận |
| RULE-04 | `code`, `discount_value`, `expired_at` là HTML-required | Submit form rỗng; cả 3 field có `required` và `validationMessage = "Please fill in this field."` | ✅ Xác nhận |
| RULE-05 | `min_order_amount` mặc định `0`; `max_uses_per_user` mặc định `1` | Snapshot DOM của form mới | ✅ Xác nhận |
| RULE-06 | Coupon code trùng bị từ chối | Submit code `SAVE10` đã tồn tại → alert lỗi UNIQUE constraint; không có row mới | ✅ Xác nhận |
| RULE-07 | Tạo coupon percent hợp lệ làm row xuất hiện và định dạng giá trị dạng `%` | Tạo `FR17OKP826`, 15%, min 100000, expiry 2099-12-30, max uses 2 | ✅ Xác nhận |
| RULE-08 | Tạo coupon fixed hợp lệ làm row xuất hiện và định dạng tiền có dấu phân cách + `₫` | Tạo `FR17OKF826`, fixed 50000, min 200000, expiry 2099-12-30, max uses 3 | ✅ Xác nhận |
| RULE-09 | Click "Xóa" làm row biến mất ngay; không có confirm dialog hay success message | Xóa các coupon tạm sau mỗi phép thử | ✅ Xác nhận |
| RULE-10 | `max_uses_per_user = 0` bị HTML native validation chặn bởi `min="1"` | Submit giá trị 0 → `rangeUnderflow`, message "Value must be greater than or equal to 1." | ✅ Xác nhận |
| RULE-11 | Ngày hết hạn trong quá khứ vẫn được tạo và bảng hiển thị "Hết hạn" | Tạo `FR17PAST826` với `2020-01-01`, sau đó cleanup | ✅ Xác nhận behavior; ⚠️ đặc tả chưa nói phải là ngày tương lai |
| RULE-12 | SUT chấp nhận `discount_value = 0`, trái yêu cầu `discount_value` phải dương | Tạo `FR17ZERO826`; row hiển thị `0%`; screenshot `fr17-zero-discount-accepted.png`; đã cleanup | ✅ Xác nhận — potential product bug |
| RULE-13 | SUT chấp nhận `discount_value = -10`, trái yêu cầu `discount_value` phải dương | Tạo `FR17NEGDISC826`; row hiển thị `-10%`; screenshot `fr17-negative-discount-accepted.png`; đã cleanup | ✅ Xác nhận — potential product bug |
| RULE-14 | SUT chấp nhận `min_order_amount = -1`, trái yêu cầu `min_order_amount >= 0` | Tạo `FR17NEGMIN826`; row hiển thị `-1 ₫`; screenshot `fr17-negative-min-order-accepted.png`; đã cleanup | ✅ Xác nhận — potential product bug |

---

## 4. Error Messages (nguyên văn từ UI)

| Trigger | Error/validation message nguyên văn | Element chứa message |
|---|---|---|
| Bỏ trống `code` rồi submit | `"Please fill in this field."` | HTML native validation của input `Mã coupon (VD: SAVE10)` |
| Bỏ trống `discount_value` rồi submit | `"Please fill in this field."` | HTML native validation của input discount đang hiển thị |
| Bỏ trống `expired_at` rồi submit | `"Please fill in this field."` | HTML native validation của input `Ngày hết hạn` |
| `max_uses_per_user = 0` | `"Value must be greater than or equal to 1."` | HTML native validation của input `Số lần dùng tối đa/người` |
| Submit coupon code trùng `SAVE10` | `"Lỗi: SQLITE_CONSTRAINT: UNIQUE constraint failed: coupons.code"` | Browser native alert dialog |
| `discount_value = 0` | Không có lỗi; coupon được tạo | — |
| `discount_value = -10` | Không có lỗi; coupon được tạo | — |
| `min_order_amount = -1` | Không có lỗi; coupon được tạo | — |

---

## 5. Success Messages (nguyên văn từ UI)

| Trigger | Success Message | Hành vi sau đó |
|---|---|---|
| Tạo coupon percent hợp lệ | Không có message | Row mới xuất hiện với loại "Phần trăm" và giá trị dạng `%` |
| Tạo coupon fixed hợp lệ | Không có message | Row mới xuất hiện với loại "Cố định" và giá trị tiền dạng `#,### ₫` |
| Xóa coupon | Không có message hoặc confirm dialog | Row biến mất ngay khỏi bảng |

---

## 6. Điểm KHÔNG CHẮC CHẮN — cần người dùng xác nhận tay

| # | Điểm chưa rõ | Cách xác minh đề xuất |
|---|---|---|
| 1 | `expired_at` có bắt buộc phải là ngày tương lai không? Đặc tả chỉ nói field bắt buộc; UI cho tạo ngày quá khứ và đánh dấu "Hết hạn" | Xác nhận với product owner trước khi viết expected result negative |
Người dùng xác nhận: Bắt buộc theo nghiệp vụ là ngày tương lai
| 2 | Coupon type percent có giới hạn tối đa 100% không? DOM và đặc tả hiện chỉ nói giá trị dương | Xác nhận rule rồi thử biên 100 và 101 |
Người dùng xác nhận: Percent không được vượt quá 100%
| 3 | `code` có phân biệt hoa/thường và có trim khoảng trắng không? | Thử `SAVE10`, `save10`, ` SAVE10 ` với dữ liệu cleanup được |
Người dùng xác nhận: Coupon code không phân biệt hoa/thường và sẽ trim khoảng trắng
| 4 | Xóa ngay không có confirm dialog có đúng UX mong muốn không? | Xác nhận với product owner |
Người dùng xác nhận: Phải có confirm dialog trước khi xóa, nếu không có thì đây là lỗi
| 5 | `min_order_amount` và `max_uses_per_user` được coi là bắt buộc nhờ default 0/1 hay phải có thuộc tính `required`? | Xác nhận cách hiểu đặc tả |
Người dùng xác nhận: Không bắt buộc, nhưng nên có để tránh lỗi database
| 6 | Không có giới hạn độ dài/pattern cho `code` | Xác nhận tập ký tự và độ dài tối đa mong muốn |
Người dùng xác nhận: Không có giới hạn độ dài/pattern cho `code`, nhưng nên có để tránh lỗi database

---

## 7. Gợi ý test case từ khám phá

**Positive:**

- Tạo coupon `percent` với dữ liệu hợp lệ → row mới hiển thị đúng code, loại, `%`, min order, expiry, giới hạn.
- Tạo coupon `fixed` với dữ liệu hợp lệ → row hiển thị đúng tiền `₫`.
- Xem danh sách → đủ 7 cột và dữ liệu coupon hiện có.
- Xóa coupon vừa tạo → row biến mất.
- `min_order_amount = 0` và `max_uses_per_user = 1` → chấp nhận đúng biên.

**Negative:**

- Bỏ trống lần lượt `code`, `discount_value`, `expired_at` → native required validation.
- Code trùng → alert nguyên văn lỗi UNIQUE constraint.
- `discount_value = 0` → phải bị từ chối theo đặc tả; UI hiện tạo thành công.
- `discount_value < 0` → phải bị từ chối theo đặc tả; UI hiện tạo thành công.
- `min_order_amount < 0` → phải bị từ chối theo đặc tả; UI hiện tạo thành công.
- `max_uses_per_user = 0` → native min validation.

**Edge / cần xác nhận:**

- `expired_at` là ngày quá khứ → UI tạo và hiển thị "Hết hạn"; oracle phụ thuộc xác nhận mục 6.1.
- Percent = 100 và 101 → cần xác nhận giới hạn phần trăm.
- Code khác hoa/thường hoặc có khoảng trắng → cần xác nhận uniqueness normalization.
- Code rất dài/ký tự đặc biệt → cần xác nhận constraint.

---

## 8. Cleanup đã thực hiện

Các coupon tạm `FR17ZERO826`, `FR17NEGDISC826`, `FR17NEGMIN826`, `FR17PAST826`, `FR17OKP826`, `FR17OKF826` đều đã được xóa qua nút "Xóa" sau khi lưu screenshot. Các coupon có sẵn `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED` không bị thay đổi.
