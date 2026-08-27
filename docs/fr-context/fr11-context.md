# FR Context: FR-11 — Xem lịch sử đơn hàng (User)

**Khám phá bởi:** fr-context-explorer skill  
**Ngày khám phá:** 2026-08-26T10:22:00+07:00  
**Base URL (User):** http://localhost:5173  
**Base URL (Admin):** http://localhost:5174  
**Phương pháp:** Black-box UI exploration via Playwright MCP  

---

## 1. Danh sách URL & màn hình liên quan

| URL | Mô tả màn hình | Screenshot |
|---|---|---|
| `/profile` (user) | Trang hồ sơ — chứa bảng "Lịch sử đơn hàng" | fr11-profile-orders.png |
| `/profile` (user, pending) | Bảng hiển thị đơn "Chờ xác nhận" với nút "Hủy đơn" | fr11-user-profile-pending-order.png |
| `/profile` (user, confirmed) | Bảng hiển thị đơn "Đã xác nhận" với nút "Hủy đơn" | fr11-user-profile-confirmed-order.png |
| `/profile` (user, shipping) | Bảng hiển thị đơn "Đang giao" với nút "Hủy đơn" | fr11-user-profile-shipping-order.png |
| `/profile` (user, canceled) | Bảng hiển thị đơn "Đã hủy" — không có nút thao tác | fr11-user-profile-canceled-order.png |
| `/` (admin) → Đơn hàng | Trang quản lý đơn hàng admin — xem và thay đổi trạng thái | fr11-admin-orders-list.png |
| Admin orders (all states) | Hiển thị các trạng thái: pending/confirmed/shipping/canceled/delivered | fr11-admin-orders-all-states.png |

---

## 2. Form Fields & Selectors

### Form đăng nhập User — `http://localhost:5173/login`

| Field / Element | Selector | Mô tả |
|---|---|---|
| Form đăng nhập | `form` | Form chứa hai input đăng nhập |
| Username | `form input` thứ 1 (`nth(0)`) | `type="text"`, required, không có id/name/placeholder và label không liên kết bằng `for` |
| Mật khẩu | `form input` thứ 2 (`nth(1)`) | `type="text"`, required, không có id/name/placeholder và label không liên kết bằng `for` |
| Nút đăng nhập | `button "Sign In"` | `type="submit"` |

### Form đăng nhập và điều hướng Admin — `http://localhost:5174/login`

| Field / Element | Selector | Mô tả |
|---|---|---|
| Email admin | `input[placeholder="Email"]` | Input email đăng nhập admin |
| Mật khẩu admin | `input[placeholder="Password"]` | `type="password"` |
| Nút đăng nhập | `button "Login"` | Submit form đăng nhập admin |
| Mục điều hướng đơn hàng | `li` có text chính xác `"Đơn hàng"` | Click để mở bảng Quản lý Đơn hàng |
| Heading dashboard sau login | heading `"Dashboard"` | Xác nhận admin login thành công |

### Bảng "Lịch sử đơn hàng" — `/profile` (User)

| Field / Element | Selector (ref DOM) | Mô tả |
|---|---|---|
| Section heading | `h2` "Lịch sử đơn hàng" | Tiêu đề phần lịch sử đơn hàng |
| Table | `table` | Bảng chứa danh sách đơn hàng |
| Header: Mã ĐH | `columnheader "Mã ĐH"` | Cột mã đơn hàng |
| Header: Ngày đặt | `columnheader "Ngày đặt"` | Cột ngày đặt hàng |
| Header: Tổng tiền | `columnheader "Tổng tiền"` | Cột tổng tiền |
| Header: Trạng thái | `columnheader "Trạng thái"` | Cột trạng thái |
| Header: Thao tác | `columnheader "Thao tác"` | Cột nút hành động |
| Nút hủy đơn | `button "Hủy đơn"` | Hiện khi đơn chưa bị giao/hủy |

### Bảng "Quản lý Đơn hàng" — Admin (`http://localhost:5174`)

| Field / Element | Selector | Mô tả |
|---|---|---|
| Section heading | `h2` "Quản lý Đơn hàng" | Tiêu đề trang admin |
| Table | `table` | Bảng chứa danh sách đơn hàng toàn hệ thống |
| Header: ID | `columnheader "ID"` | Mã đơn hàng |
| Header: Người đặt | `columnheader "Người đặt"` | Tên người đặt hàng |
| Header: Tổng tiền | `columnheader "Tổng tiền"` | Tổng tiền đơn hàng |
| Header: Địa chỉ | `columnheader "Địa chỉ"` | Địa chỉ giao hàng |
| Header: Trạng thái | `columnheader "Trạng thái"` | Trạng thái đơn hàng |
| Header: Hành động | `columnheader "Hành động"` | Nút hành động admin |
| Nút Xác nhận | `button "Xác nhận"` | Chỉ hiện khi status=pending |
| Nút Giao hàng | `button "Giao hàng"` | Chỉ hiện khi status=confirmed |
| Nút Hoàn thành | `button "Hoàn thành"` | Chỉ hiện khi status=shipping |
| Nút Hủy (admin) | `button "Hủy"` | Hiện khi status=pending hoặc confirmed |
| Nút Đánh dấu Đã giao | `button "Đánh dấu Đã giao"` | Xuất hiện khi status=canceled (xem mục 6) |

---

## 3. Business Rules phát hiện (từ UI behavior)

| Rule ID | Mô tả rule | Bằng chứng (URL + hành động thực hiện) | Mức độ chắc chắn |
|---|---|---|---|
| RULE-01 | User chỉ thấy đơn hàng của chính mình | `/profile` Test User chỉ thấy đơn của mình, không thấy đơn #3 của Admin User | ✅ Xác nhận |
| RULE-02 | Bảng hiển thị đúng 5 cột: Mã ĐH, Ngày đặt, Tổng tiền, Trạng thái, Thao tác | Quan sát table headers trên `/profile` | ✅ Xác nhận |
| RULE-03 | Trạng thái hiển thị tiếng Việt với màu sắc phân biệt | Quan sát: "Chờ xác nhận"(vàng), "Đã xác nhận"(xanh nhạt), "Đang giao"(xanh lá nhạt), "Đã giao"(xanh lá), "Đã hủy"(đỏ) | ✅ Xác nhận |
| RULE-04 | Nút "Hủy đơn" hiện khi status = pending | Đơn #4 (pending) có nút "Hủy đơn" | ✅ Xác nhận |
| RULE-05 | Nút "Hủy đơn" hiện khi status = confirmed | Đơn #5 (confirmed) có nút "Hủy đơn" | ✅ Xác nhận |
| RULE-06 | Nút "Hủy đơn" CŨNG hiện khi status = shipping | Đơn #6 (shipping) có nút "Hủy đơn" — khác spec (spec nói chỉ Admin hủy được) | ⚠️ Cần xác nhận |
| RULE-07 | Không có nút thao tác khi status = delivered | Đơn #1, #2 (delivered) → cell thao tác trống | ✅ Xác nhận |
| RULE-08 | Không có nút thao tác khi status = canceled | Đơn sau khi hủy → cell thao tác trống | ✅ Xác nhận |
| RULE-09 | Cancel thành công → alert "Hủy đơn thành công!" | Click "Hủy đơn" đơn #4 pending → alert native browser | ✅ Xác nhận |
| RULE-10 | Sau cancel → trạng thái chuyển "Đã hủy" ngay lập tức | Dismiss dialog → row cập nhật ngay | ✅ Xác nhận |
| RULE-11 | Đơn hàng sắp xếp mới nhất trước (giảm dần theo ID) | Profile: #6, #5, #4, #2, #1 | ✅ Xác nhận |
| RULE-12 | Admin: pending → buttons "Xác nhận" + "Hủy" | Admin orders list quan sát trực tiếp | ✅ Xác nhận |
| RULE-13 | Admin: confirmed → buttons "Giao hàng" + "Hủy" | Admin orders list quan sát trực tiếp | ✅ Xác nhận |
| RULE-14 | Admin: shipping → chỉ có button "Hoàn thành" (không có Hủy) | Admin orders list quan sát trực tiếp | ✅ Xác nhận |
| RULE-15 | Admin: delivered → không có nút hành động | Admin orders list quan sát trực tiếp | ✅ Xác nhận |
| RULE-16 | Admin: canceled → có nút "Đánh dấu Đã giao" | Admin orders list → đơn #4, #5 "Đã hủy" có nút này — khác spec | ⚠️ Có thể là bug |

---

## 4. Error Messages (nguyên văn từ UI)

| Trigger | Error/Alert Message (nguyên văn) | Element selector chứa message |
|---|---|---|
| Admin login sai mật khẩu | `"Đăng nhập thất bại"` | Browser native alert dialog |
| *(Chưa test)* User truy cập `/profile` khi chưa đăng nhập | — | — |

---

## 5. Success Messages (nguyên văn từ UI)

| Trigger | Success Message (nguyên văn) | Hành vi sau đó |
|---|---|---|
| User click "Hủy đơn" (status=pending) | `"Hủy đơn thành công!"` | Dismiss → trạng thái chuyển "Đã hủy", nút biến mất |
| User click "Hủy đơn" (status=confirmed) | `"Hủy đơn thành công!"` | Dismiss → trạng thái chuyển "Đã hủy" |
| User click "Hủy đơn" (status=shipping) | `"Hủy đơn thành công!"` | Dismiss → trạng thái chuyển "Đã hủy" ⚠️ |

---

## 6. Bảng trạng thái đơn hàng (State Machine thực tế từ UI)

### Hiển thị tiếng Việt

| Trạng thái (API value) | Hiển thị (tiếng Việt) | Màu badge (quan sát từ ảnh) |
|---|---|---|
| `pending` | Chờ xác nhận | Vàng/cam nhạt |
| `confirmed` | Đã xác nhận | Xanh dương nhạt |
| `shipping` | Đang giao | Xanh lá nhạt |
| `delivered` | Đã giao | Xanh lá |
| `canceled` | Đã hủy | Đỏ/cam nhạt |

### Chuyển trạng thái Admin (confirmed từ UI)

| Từ trạng thái | Nút Admin | Sang trạng thái |
|---|---|---|
| pending | "Xác nhận" | confirmed |
| pending | "Hủy" | canceled |
| confirmed | "Giao hàng" | shipping |
| confirmed | "Hủy" | canceled |
| shipping | "Hoàn thành" | delivered |
| canceled | "Đánh dấu Đã giao" | delivered (⚠️ Có thể bug) |

### Nút "Hủy đơn" phía User (thực tế từ UI)

| Trạng thái | Nút "Hủy đơn" hiện? | Kết quả khi click |
|---|---|---|
| pending | ✅ Có | Hủy thành công — "Hủy đơn thành công!" |
| confirmed | ✅ Có | Hủy thành công — "Hủy đơn thành công!" |
| shipping | ✅ Có (⚠️ khác spec) | Hủy thành công — "Hủy đơn thành công!" |
| delivered | ❌ Không | — |
| canceled | ❌ Không | — |

---

## 7. Điểm KHÔNG CHẮC CHẮN — cần người dùng xác nhận tay

| # | Điểm chưa rõ | Cách xác minh đề xuất |
|---|---|---|
| 1 | CSS class/màu chính xác của các badge trạng thái | Inspect element trên browser DevTools |
Người dùng xác nhận: 
- Trạng thái đã hủy: span.px-2.py-1.rounded.text-sm.bg-red-100 text-red-800 14px ui-sans-serif, system-ui, sans-serif, " ...
#FEE2E2
4px 8px
59.38 × 26.31
#991B1B
- Trạng thái đã giao: span.px-2.py-1.rounded.text-sm.bg-green-100.text-green-800
14px ui-sans-serif, system-ui, sans-serif, " ...
#DCFCE7
4px 8px
63.72 x 26.31
#166534
- Trạng thái chờ xác nhận: span.px-2.py-1.rounded.text-sm.bg-yellow-100.text-yellow-80 99.51 x 26.310
14px ui-sans-serif, system-ui, sans-serif, " ...
#854D0E
#FEF9C3
4px 8px
- Trạng thái Đã xác nhận: span.px-2.py-1.rounded.text-sm.
bg-indigo-100.text-indigo-800
14px ui-sans-serif, system-ui, sans-serif, " ...
91.5 x 26.31
#3730A3
#EOE7FF
4px 8px

| 2 | User chưa đăng nhập truy cập `/profile` → behavior? | Logout → navigate `/profile` trực tiếp |
Người dùng xác nhận: Hiện 'Vui lòng đăng nhập'
| 3 | User hủy đơn "Đang giao" có đúng spec không? | Xác nhận với product owner (spec FR-11 nói "User/Admin hủy" cho pending+confirmed) |
Người dùng xác nhận: Không đúng spec
| 4 | Nút "Đánh dấu Đã giao" cho đơn "Đã hủy" — có phải bug? | Xác nhận với product owner |
Người dùng xác nhận: Có phải bug
| 5 | UI có phân trang khi user có nhiều đơn hàng không? | Tạo >10 đơn và kiểm tra |
Người dùng xác nhận: Không phân trang
| 6 | Tổng tiền "0 ₫" khi tạo qua API — đây có phải bug không? | Kiểm tra đơn tạo đúng qua UI checkout |
Người dùng xác nhận: Có phải bug

---

## 8. API Endpoints đã phát hiện

| Endpoint | Method | Auth | Mô tả |
|---|---|---|---|
| `GET /api/orders/my-orders` | GET | User JWT (Bearer) | Lấy danh sách đơn của user hiện tại |
| `GET /api/admin/orders` | GET | Admin JWT (Bearer) | Lấy tất cả đơn hàng |
| `POST /api/checkout` | POST | User JWT | Tạo đơn hàng mới |
| Cancel/status endpoints | — | — | Chưa capture được chính xác |

---

## 9. Gợi ý test case từ khám phá

*(Danh sách thô — dùng làm input cho testcase-generator)*

**Positive:**
- TC-P1: User đăng nhập → vào `/profile` → thấy bảng "Lịch sử đơn hàng" với đúng 5 cột
- TC-P2: Đơn pending → user click "Hủy đơn" → alert "Hủy đơn thành công!" → trạng thái = "Đã hủy"
- TC-P3: Đơn confirmed → user click "Hủy đơn" → hủy thành công
- TC-P4: User chỉ thấy đơn của mình (không thấy đơn user khác)
- TC-P5: Đơn delivered → không hiển thị nút "Hủy đơn"
- TC-P6: Đơn canceled → không hiển thị nút "Hủy đơn"
- TC-P7: Thứ tự hiển thị từ mới nhất đến cũ nhất
- TC-P8: Trạng thái hiển thị đúng tiếng Việt và phân biệt màu sắc
- TC-P9: Admin confirm pending → user thấy "Đã xác nhận" sau refresh

**Negative:**
- TC-N1: User chưa đăng nhập → truy cập `/profile` → redirect hoặc lỗi
- TC-N2: Gọi API cancel cho đơn delivered → trả về lỗi
- TC-N3: User A cố cancel đơn của User B → không thành công
- TC-N4: Cancel đơn không tồn tại → 404

**Edge:**
- TC-E1: User không có đơn hàng nào → bảng lịch sử hiển thị thế nào?
- TC-E2: Đơn shipping → user click "Hủy đơn" → behavior (spec vs thực tế)
- TC-E3: Admin "Đánh dấu Đã giao" cho đơn đã hủy → có thành công không?
- TC-E4: Nhiều đơn hàng (>10) → UI có phân trang?
- TC-E5: Đơn có tổng tiền rất lớn → hiển thị định dạng số đúng không?
