---
name: fr-context-explorer
description: Tự động khám phá UI, business rule, form field, validation rule, và error message của 1 Functional Requirement (FR) bằng cách điều khiển browser qua Playwright MCP trên ứng dụng EShop đang chạy ở localhost. Dùng TRƯỚC testcase-generator khi người dùng chỉ cung cấp mã FR (VD "FR-02") mà chưa mô tả chi tiết. Không đọc source code backend — hoạt động theo nguyên tắc Black-box.
---

# FR Context Explorer

Skill này dùng **Playwright MCP** để điều khiển browser thực tế, khám phá UI của một FR trên EShop SUT đang chạy ở local, và tổng hợp thành file `docs/fr-context/fr{XX}-context.md`.

> ⚠️ **Nguyên tắc Black-box bắt buộc:** Skill này KHÔNG đọc source code backend/database để suy luận logic. Mọi business rule, selector, và message lỗi phải được xác nhận bằng tương tác UI thực tế qua browser.

---

## Input bắt buộc từ người dùng

| Field | Ví dụ | Bắt buộc? |
|---|---|---|
| Mã FR | `FR-03` | ✅ |
| Đặc tả Yêu cầu Hệ thống (Mô tả FR) | `"Nhập email hợp lệ -> hệ thống gửi OTP..."` | ✅ (Để AI biết rule nào cần kiểm chứng) |
| Base URL của app đang chạy | `http://localhost:3000` | ✅ |
| Tài khoản test (user thường) | `user@test.com / 123456` | ✅ (nếu FR cần đăng nhập) |
| Tài khoản admin | `admin@test.com / admin123` | ✅ (nếu FR thuộc Pool C) |

Nếu thiếu Base URL hoặc tài khoản cần thiết, **dừng lại và hỏi người dùng** — không tự đoán.

---

## FR → URL Mapping (EShop SUT)

| FR | Mô tả | URL khởi đầu | Cần login? |
|---|---|---|---|
| FR-01 | Đăng ký tài khoản | `/register` | Không |
| FR-02 | Đăng nhập & khoá tài khoản | `/login` | Không |
| FR-03 | Quên mật khẩu & đặt lại | `/forgot-password` | Không |
| FR-04 | Quản lý hồ sơ cá nhân | `/profile` | User |
| FR-05 | Danh sách & tìm kiếm sản phẩm | `/products` | Không |
| FR-06 | Chi tiết sản phẩm | `/products/{id}` | Không |
| FR-07 | Giỏ hàng | `/cart` | User |
| FR-08 | Thanh toán | `/checkout` | User |
| FR-09 | Mã giảm giá | `/checkout` | User |
| FR-10 | Order state machine | `/orders` | User + Admin |
| FR-11 | Lịch sử đơn hàng (User) | `/orders` | User |
| FR-12 | Kiểm soát truy cập Admin | `/admin` | Admin |
| FR-13 | Dashboard Admin | `/admin/dashboard` | Admin |
| FR-14 | Quản lý danh mục | `/admin/categories` | Admin |
| FR-15 | Quản lý sản phẩm | `/admin/products` | Admin |
| FR-16 | Import sản phẩm CSV | `/admin/products/import` | Admin |
| FR-17 | Quản lý mã giảm giá | `/admin/coupons` | Admin |
| FR-18 | Quản lý đơn hàng (Admin) | `/admin/orders` | Admin |
| FR-19 | Quản lý người dùng (Admin) | `/admin/users` | Admin |

---

## Quy trình thực thi (dùng Playwright MCP)

### Bước A — Khởi động & điều hướng

1. Dùng `browser_navigate` để mở Base URL (ví dụ: `http://localhost:3000`)
2. Xác nhận app đang chạy: chụp screenshot ban đầu bằng `browser_take_screenshot`
3. Nếu FR cần đăng nhập: thực hiện login qua UI với tài khoản được cung cấp
4. Điều hướng đến URL tương ứng với FR (xem bảng mapping ở trên)

### Bước B — Thu thập cấu trúc form & selectors

Với MỖI form/UI element có trên trang, thực hiện:

1. **Chụp snapshot DOM** bằng `browser_snapshot` để có cây HTML đầy đủ
2. **Ghi lại từng input field:**
   - `id`, `name`, `data-testid` (ưu tiên theo thứ tự này)
   - `type` (text, email, password, number, select, checkbox...)
   - `placeholder` text (nguyên văn)
   - Có `required` không?
   - `min`, `max`, `maxlength`, `pattern` (nếu có trong DOM)
3. **Ghi lại các nút bấm (buttons/CTAs):**
   - Text hiển thị (nguyên văn)
   - `id`, `data-testid`, `type`

### Bước C — Kích hoạt validation & ghi lại error messages

Đây là bước quan trọng nhất để xác nhận rule thực tế:

1. **Submit form rỗng:** click nút submit khi tất cả field trống → chụp screenshot, ghi lại MỌI message lỗi xuất hiện (nguyên văn, không diễn giải)
2. **Thử từng field với giá trị biên:**
   - Giá trị quá ngắn / quá dài
   - Định dạng sai (email không có @, số âm, ký tự đặc biệt...)
   - Ghi lại message lỗi thực tế từ UI
3. **Thử luồng happy path:** nhập dữ liệu hợp lệ hoàn toàn → ghi lại message thành công
4. **Với FR nhiều bước (FR-02, FR-03...):** test từng bước riêng, ghi lại behavior chuyển bước

Với mỗi lần submit/tương tác, dùng `browser_take_screenshot` để lưu bằng chứng.

### Bước D — Khám phá các luồng đặc biệt

Tùy theo FR, thực hiện thêm các bước sau:

- **FR-02 (Lockout):** Thử đăng nhập sai nhiều lần liên tiếp, ghi lại số lần trước khi bị khoá và thông báo khoá
- **FR-03 (OTP):** Ghi lại cách OTP hiển thị (trên màn hình hay email?), thử dùng OTP sai/hết hạn
- **FR-07/08 (Cart/Checkout):** Thử thêm sản phẩm, xóa, thay đổi số lượng, điều hướng checkout
- **FR-17 (Coupon CRUD):** Thử tạo, xem danh sách, xóa coupon — ghi lại từng message xác nhận

### Bước E — Tổng hợp & tạo file output

Tạo file `docs/fr-context/fr{XX}-context.md` với cấu trúc bắt buộc sau:

---

## Output — Cấu trúc file `fr{XX}-context.md`

```markdown
# FR Context: [Tên FR]

**Khám phá bởi:** fr-context-explorer skill  
**Ngày khám phá:** [ISO timestamp]  
**Base URL:** [URL đã dùng]  
**Phương pháp:** Black-box UI exploration via Playwright MCP  

---

## 1. Danh sách URL & màn hình liên quan

| URL | Mô tả màn hình | Screenshot |
|---|---|---|
| `/forgot-password` | Form nhập email bước 1 | screenshot-step1.png |
| `/reset-password` | Form nhập OTP + mật khẩu mới | screenshot-step2.png |

---

## 2. Form Fields & Selectors

### Form: [Tên form, ví dụ: "Forgot Password — Step 1"]

| Field | id / data-testid | type | placeholder | required | Constraint phát hiện |
|---|---|---|---|---|---|
| Email | `#email` hoặc `[data-testid="email-input"]` | email | `Nhập email của bạn` | ✅ | Phải có @ |
| Submit | `[data-testid="submit-btn"]` | submit | — | — | — |

*(Lặp lại cho mỗi form trên trang)*

---

## 3. Business Rules phát hiện (từ UI behavior)

| Rule ID | Mô tả rule | Bằng chứng (URL + hành động thực hiện) | Mức độ chắc chắn |
|---|---|---|---|
| RULE-01 | Email phải tồn tại trong hệ thống | Submit email lạ → thấy lỗi "..." | ✅ Xác nhận |
| RULE-02 | OTP chỉ dùng được 1 lần | Submit OTP đã dùng → thấy lỗi "..." | ✅ Xác nhận |
| RULE-03 | Thời gian hết hạn OTP | — | ⚠️ Chưa xác định |

---

## 4. Error Messages (nguyên văn từ UI)

| Trigger | Error Message (nguyên văn) | Element selector chứa message |
|---|---|---|
| Submit email rỗng | `"Email không được để trống"` | `.error-message` hoặc `[data-testid="error-msg"]` |
| Email không đúng định dạng | `"Email không hợp lệ"` | — |
| Email không tồn tại | `"Email không tồn tại trong hệ thống"` | — |

---

## 5. Success Messages (nguyên văn từ UI)

| Trigger | Success Message (nguyên văn) | Hành vi sau đó |
|---|---|---|
| Submit email hợp lệ | `"OTP đã được gửi"` | Chuyển sang Step 2 |

---

## 6. Điểm KHÔNG CHẮC CHẮN — cần người dùng xác nhận tay

| # | Điểm chưa rõ | Cách xác minh đề xuất |
|---|---|---|
| 1 | Thời gian hết hạn OTP (có giới hạn không?) | Chờ 30 phút rồi thử dùng lại OTP cũ |
| 2 | OTP có thể dùng cho email khác không? | Yêu cầu OTP cho email A, dùng cho email B |

---

## 7. Gợi ý test case từ khám phá

*(Danh sách thô — dùng làm input cho testcase-generator)*

- TC: Submit email hợp lệ → có OTP
- TC: Submit email không tồn tại → lỗi
- TC: Submit email rỗng → lỗi bắt buộc
- TC: Submit email sai định dạng → lỗi format
- TC: Submit OTP đúng + pass mới hợp lệ → thành công
- TC: Submit OTP sai → lỗi
- TC: Mật khẩu mới không khớp → lỗi
- ...
```

---

## Nguyên tắc bắt buộc

1. **KHÔNG suy đoán** — Nếu không tương tác UI xác nhận được, ghi vào mục "Không chắc chắn", KHÔNG được tự điền vào bảng rules hay messages.
2. **Luôn có bằng chứng** — Mỗi rule trong mục 3 phải có cột "Bằng chứng" ghi rõ URL và thao tác đã thực hiện.
3. **Nguyên văn tuyệt đối** — Message lỗi/thành công phải copy nguyên văn từ UI, không paraphrase.
4. **Dừng và hỏi** nếu:
   - App không khởi động được (lỗi 5xx hoặc không kết nối được localhost)
   - Cần tài khoản đặc biệt (admin) nhưng người dùng chưa cung cấp
   - Gặp CAPTCHA hoặc 2FA thực sự (không phải OTP demo)
5. **Sau khi tạo file,** trình bày tóm tắt cho người dùng và **chờ xác nhận** trước khi chuyển sang `testcase-generator`.

---

## Ghi kết quả vào Report (bắt buộc)

Sau khi tạo file context và người dùng xác nhận, cập nhật **`report/MAIN_REPORT.md`** tại mục tương ứng với FR:

| FR | Mục cần cập nhật trong MAIN_REPORT.md |
|---|---|
| FR-03 (Feature A) | Mục **2.1. Mô tả chức năng** — điền mô tả luồng UI thực tế phát hiện được |
| FR-11 (Feature B) | Mục **3.1. Mô tả chức năng** — điền mô tả luồng UI thực tế phát hiện được |
| FR-17 (Feature C) | Mục **4.1. Mô tả chức năng** — điền mô tả luồng UI thực tế phát hiện được |

Ngoài ra, tạo file context riêng tại:
- `docs/fr-context/fr{XX}-context.md` — file đầy đủ 7 mục dùng cho các skill tiếp theo

---

## Handoff sang testcase-generator

Sau khi người dùng xác nhận file context, gợi ý prompt mẫu cho bước tiếp theo:

```
Dựa vào file docs/fr-context/fr{XX}-context.md vừa được tạo,
hãy sinh danh sách test case cho FR-{XX} theo yêu cầu:
- Tối thiểu 12 test case, gồm ≥4 Positive, ≥4 Negative, ≥4 Edge
- Format bảng: | ID | Loại | Mô tả | Bước | Dữ liệu vào | Kết quả mong đợi | Automate? |
- Ưu tiên test case dựa trên các rule đã xác nhận trong mục 3 của context file
- Các điểm "Không chắc chắn" trong mục 6 nên được đánh dấu là "cần verify tay" thay vì automate
```
