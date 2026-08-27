# Test Case Catalog

> Copy the table section for each selected feature. Maintain one row per case and at least 12 rows per feature.

## Feature [TODO: FR-XX]

| ID | Requirement | Technique/type | Priority | Preconditions | Test data key | Steps summary | Expected result/oracle | Cleanup | Automated spec/title | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| FR03-01 | FR-03 (Bước 1) | Positive / EP | High | App running, user exists | TC01 | Vào /forgot-password, Nhập email, Submit | OTP displayed, redirect to Step2 | None | TC01 - Nhập email hợp lệ ở Bước 1 | Planned |
| FR03-02 | FR-03 (Bước 2) | Positive | High | App running, user exists, has OTP | TC02 | Vào Bước 2, Nhập OTP, Nhập pass, Submit | Password updated, redirect to Login | None | TC02 - Nhập đúng OTP + mật khẩu mới hợp lệ | Planned |
| FR03-03 | FR-03 (Bước 1) | Positive | Medium | App running | TC03 | Vào /forgot-password, Click Back | Redirect to /login | None | TC03 - Bấm Quay lại đăng nhập | Planned |
| FR03-04 | FR-03 (Bước 2) | Positive / BVA | High | App running, user exists | TC04 | Yêu cầu OTP, đọc OTP hiển thị, kiểm tra định dạng và độ dài | OTP gồm đúng 6 chữ số | None | TC04 - OTP được sinh đúng 6 chữ số | Planned |
| FR03-05 | FR-03 (Bước 1) | Negative / EP | High | App running | TC05 | Submit empty email | Error: Email không được để trống | None | TC05 - Email không được để trống | Planned |
| FR03-06 | FR-03 (Bước 1) | Negative / EP | High | App running | TC06 | Submit invalid email format | Remain at Step1; OTP is not generated | None | TC06 - Email sai định dạng | Planned |
| FR03-07 | FR-03 (Bước 2) | Negative | High | App running, user exists | TC07 | Submit a different OTP with the generated OTP's length | Remain at Step2; no success | None | TC07 - OTP sai | Planned |
| FR03-08 | FR-03 (Bước 2) | Negative | High | App running, user exists | TC08 | Không thực hiện được: UI không có trường xác nhận mật khẩu | Not applicable to current UI | None | Không tự động hóa | Manual / N/A |
| FR03-09 | FR-03 (Bước 1) | Negative | High | App running | TC09 | Submit unregistered email | Remain at Step1; OTP is not generated | None | TC09 - Email không tồn tại (chưa đăng ký) | Planned |
| FR03-10 | FR-03 (Bước 2) | Edge / BVA | High | App running, user exists | TC10 | Submit weak password | Remain at Step2; no success | None | TC10 - Mật khẩu mới quá yếu (vi phạm FR-01) | Planned |
| FR03-11 | FR-03 (Bước 2) | Edge | Low | 2 active users | TC11 | Use OTP of User A for User B | Error: `Sai otp` | None | Không tự động hóa | Planned |
| FR03-12 | FR-03 (Bước 2) | Edge | Low | User requested OTP | TC12 | Wait 30m, submit OTP | Error: `OTP hết hạn` | None | Không tự động hóa | Planned |
| FR03-13 | FR-03 (Bước 2) | Edge | Medium | App running, user exists | TC13 | Input alphabetic characters in OTP, submit | Reject input, remain at Step2, no success | None | TC13 - Nhập OTP không phải số | Planned |

## Feature FR-11 — Xem lịch sử đơn hàng (User)

| ID | Requirement | Technique/type | Priority | Preconditions | Test data key | Steps summary | Expected result/oracle | Cleanup | Automated spec/title | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| FR11-01 | FR-11 / RULE-02 | Positive / UI structure | High | User có ít nhất một đơn | TC01 in `fr11-testcases-draft.json` | Login; mở `/profile`; kiểm tra heading/table/headers | Đúng 5 cột theo FR-11 | Logout | TC01 - Hiển thị bảng lịch sử với đúng 5 cột | Planned |
| FR11-02 | FR-11 / RULE-04/09/10 | Positive / State transition | High | User có đơn pending | TC02 in `fr11-testcases-draft.json` | Click Hủy đơn pending; accept alert | "Hủy đơn thành công!"; thành Đã hủy | Không có UI cleanup | Không tự động hóa | Manual / N/A |
| FR11-03 | FR-11 / RULE-05/09/10 | Positive / State transition | High | User có đơn confirmed | TC03 in `fr11-testcases-draft.json` | Click Hủy đơn confirmed; accept alert | "Hủy đơn thành công!"; thành Đã hủy | Không có UI cleanup | Không tự động hóa | Manual / N/A |
| FR11-04 | FR-11 / RULE-03 | Positive / EP | High | Có đủ đơn ở 5 trạng thái | TC04 in `fr11-testcases-draft.json` | Mở profile; đối chiếu status text | Đúng 5 bản dịch trạng thái | Logout | TC04 - Dịch đúng toàn bộ trạng thái | Planned |
| FR11-05 | FR-11 / RULE-01 | Negative / Authorization | Critical | User A và User B; User B có đơn nhận diện | TC05 in `fr11-testcases-draft.json` | Login User A; tìm đơn User B | Không thấy đơn của User B | Logout | TC05 - Không lộ đơn của user khác | Planned |
| FR11-06 | FR-11 access | Negative / Authentication | High | Không có session | TC06 in `fr11-testcases-draft.json` | Truy cập `/profile` trực tiếp | Hiện "Vui lòng đăng nhập"; không lộ lịch sử | Clear storage | TC06 - Chưa đăng nhập truy cập profile | Planned |
| FR11-07 | FR-11 state machine / RULE-06 | Negative / Invalid transition | High | User có đơn shipping | TC07 in `fr11-testcases-draft.json` | Kiểm tra dòng Đang giao | Không có Hủy đơn; không chuyển sang canceled | Logout | TC07 - Không cho user hủy đơn shipping | Planned |
| FR11-08 | FR-11 / RULE-07 | Negative / Terminal state | High | User có đơn delivered | TC08 in `fr11-testcases-draft.json` | Kiểm tra dòng Đã giao | Ô thao tác trống | Logout | TC08 - Không thao tác đơn delivered | Planned |
| FR11-09 | FR-11 / RULE-08 | Negative / Terminal state | High | User có đơn canceled | TC09 in `fr11-testcases-draft.json` | Kiểm tra dòng Đã hủy | Ô thao tác trống | Logout | TC09 - Không thao tác đơn canceled | Planned |
| FR11-10 | FR-11 state support / RULE-16 | Negative / Invalid transition | High | Admin hợp lệ; có đơn canceled | TC10 in `fr11-testcases-draft.json` | Admin kiểm tra hành động đơn Đã hủy | Không có nút Đánh dấu Đã giao | Logout admin | TC10 - Admin không hồi sinh đơn canceled | Planned |
| FR11-11 | FR-11 setup / Error mục 4 | Negative / Authentication | Medium | Admin account fixture | TC11 in `fr11-testcases-draft.json` | Login admin bằng mật khẩu sai | Alert "Đăng nhập thất bại" | Clear storage | TC11 - Admin đăng nhập sai khi chuẩn bị trạng thái | Planned |
| FR11-12 | FR-11 / RULE-11 | Edge / Ordering | Medium | User có nhiều đơn không liên tiếp | TC12 in `fr11-testcases-draft.json` | Đọc ID theo thứ tự bảng | ID giảm dần, mới nhất trước | Logout | TC12 - Sắp xếp nhiều đơn mới nhất trước | Planned |
| FR11-13 | FR-11 / Confirmed point 7.5 | Edge / Volume | Medium | User có 11 đơn tạo qua UI | TC13 in `fr11-testcases-draft.json` | Đếm row và kiểm tra pagination | Đủ 11 row; không pagination | Không có UI cleanup | Không tự động hóa | Manual / N/A |
| FR11-14 | FR-11 / RULE-02 | Edge / Formatting | Medium | Có đơn tổng 73.000.000 | TC14 in `fr11-testcases-draft.json` | Đọc cột Tổng tiền | `73,000,000 ₫` | Logout | TC14 - Định dạng tổng tiền lớn | Planned |
| FR11-15 | FR-11 / RULE-02 / Confirmed point 7.6 | Edge / Data integrity | High | User, cart và sản phẩm giá > 0 | TC15 in `fr11-testcases-draft.json` | Checkout; mở profile; so tổng tiền | Tổng > 0 và bằng checkout | Không có UI cleanup | Không tự động hóa | Manual / N/A |
| FR11-16 | FR-11 / RULE-03 / Confirmed point 7.1 | Edge / Visual oracle | Medium | Có đủ 5 trạng thái | TC16 in `fr11-testcases-draft.json` | Đọc class/computed color badges | Màu đúng dữ liệu xác nhận và phân biệt | Logout | TC16 - Màu badge trạng thái phân biệt | Planned |

## Feature FR-17 — Quản lý Mã Giảm Giá (Coupon CRUD)

| ID | Requirement | Technique/type | Priority | Preconditions | Test data key | Steps summary | Expected result/oracle | Cleanup | Automated spec/title | Status |
|---|---|---|---|---|---|---|---|---|---|---|
| FR17-01 | FR-17 / RULE-01/02 | Positive / UI structure | High | App running, admin account exists | TC01 in `fr17-testcases-draft.json` | Login admin; mở Mã Giảm Giá; kiểm tra heading/table/headers | Hiện heading Quản lý Mã Giảm Giá và đủ 7 cột coupon | Clear session | TC01 - Admin đăng nhập và xem danh sách coupon | Planned |
| FR17-02 | FR-17 / RULE-03/07 | Positive / EP | High | Admin đã đăng nhập | TC02 in `fr17-testcases-draft.json` | Tạo coupon percent hợp lệ; kiểm tra row | Row hiển thị loại Phần trăm và giá trị dạng `%` | Xóa coupon `FR17P001` | TC02 - Tạo coupon percent hợp lệ | Planned |
| FR17-03 | FR-17 / RULE-03/08 | Positive / EP | High | Admin đã đăng nhập | TC03 in `fr17-testcases-draft.json` | Tạo coupon fixed hợp lệ; kiểm tra row | Row hiển thị loại Cố định và tiền dạng `#,### ₫` | Xóa coupon `FR17F001` | TC03 - Tạo coupon fixed hợp lệ | Planned |
| FR17-04 | FR-17 / RULE-05/07 | Positive / Defaults | Medium | Admin đã đăng nhập | TC04 in `fr17-testcases-draft.json` | Tạo coupon không sửa min/max mặc định | Row hiển thị min `0 ₫` và max uses `1` | Xóa coupon `FR17D001` | TC04 - Tạo coupon với default min/max hợp lệ | Planned |
| FR17-05 | FR-17 / RULE-04 / Error mục 4 | Negative / Required field | High | Admin đã đăng nhập | TC05 in `fr17-testcases-draft.json` | Submit khi code rỗng | Native validation "Please fill in this field." | None | TC05 - Bỏ trống code | Planned |
| FR17-06 | FR-17 / RULE-04 / Error mục 4 | Negative / Required field | High | Admin đã đăng nhập | TC06 in `fr17-testcases-draft.json` | Submit khi discount rỗng | Native validation "Please fill in this field." | None | TC06 - Bỏ trống discount_value | Planned |
| FR17-07 | FR-17 / RULE-04 / Error mục 4 | Negative / Required field | High | Admin đã đăng nhập | TC07 in `fr17-testcases-draft.json` | Submit khi expired_at rỗng | Native validation "Please fill in this field." | None | TC07 - Bỏ trống expired_at | Planned |
| FR17-08 | FR-17 / RULE-06 / Error mục 4 | Negative / Uniqueness | High | Admin đã đăng nhập, code `SAVE10` tồn tại | TC08 in `fr17-testcases-draft.json` | Submit coupon code trùng `SAVE10` | Alert "Lỗi: SQLITE_CONSTRAINT: UNIQUE constraint failed: coupons.code"; không tạo row mới | None | TC08 - Code trùng bị từ chối | Planned |
| FR17-09 | FR-17 / RULE-10 / Error mục 4 | Negative / BVA | High | Admin đã đăng nhập | TC09 in `fr17-testcases-draft.json` | Submit max_uses_per_user = 0 | Native validation "Value must be greater than or equal to 1." | None | TC09 - max_uses_per_user = 0 bị chặn | Planned |
| FR17-10 | FR-17 / RULE-12 / Spec | Negative / BVA | High | Admin đã đăng nhập | TC10 in `fr17-testcases-draft.json` | Submit discount_value = 0 | Phải từ chối vì discount_value phải dương; hiện tại có thể fail do bug | Xóa `FR17ZERO` nếu SUT tạo row | TC10 - discount_value = 0 phải bị từ chối | Planned |
| FR17-11 | FR-17 / RULE-13 / Spec | Negative / BVA | High | Admin đã đăng nhập | TC11 in `fr17-testcases-draft.json` | Submit discount_value âm | Phải từ chối vì discount_value phải dương; hiện tại có thể fail do bug | Xóa `FR17NEGDISC` nếu SUT tạo row | TC11 - discount_value âm phải bị từ chối | Planned |
| FR17-12 | FR-17 / RULE-14 / Spec | Negative / BVA | High | Admin đã đăng nhập | TC12 in `fr17-testcases-draft.json` | Submit min_order_amount âm | Phải từ chối vì min_order_amount >= 0; hiện tại có thể fail do bug | Xóa `FR17NEGMIN` nếu SUT tạo row | TC12 - min_order_amount âm phải bị từ chối | Planned |
| FR17-13 | FR-17 / RULE-05 | Edge / BVA | Medium | Admin đã đăng nhập | TC13 in `fr17-testcases-draft.json` | Tạo coupon với min_order_amount = 0 | Row hiển thị `0 ₫` | Xóa coupon `FR17MIN0` | TC13 - min_order_amount = 0 là biên hợp lệ | Planned |
| FR17-14 | FR-17 / RULE-10 | Edge / BVA | Medium | Admin đã đăng nhập | TC14 in `fr17-testcases-draft.json` | Tạo coupon với max_uses_per_user = 1 | Row hiển thị giới hạn/người `1` | Xóa coupon `FR17MAX1` | TC14 - max_uses_per_user = 1 là biên hợp lệ | Planned |
| FR17-15 | FR-17 / Confirmed point 6.2 | Edge / BVA | Medium | Admin đã đăng nhập | TC15 in `fr17-testcases-draft.json` | Tạo coupon percent = 100 | Row hiển thị `100%` | Xóa coupon `FR17P100` | TC15 - percent = 100 là biên hợp lệ | Planned |
| FR17-16 | FR-17 / Confirmed point 6.2 | Edge / BVA | High | Admin đã đăng nhập | TC16 in `fr17-testcases-draft.json` | Submit coupon percent = 101 | Phải từ chối vì percent không vượt quá 100% | Xóa `FR17P101` nếu SUT tạo row | TC16 - percent > 100 phải bị từ chối | Planned |
| FR17-17 | FR-17 / RULE-11 / Confirmed point 6.1 | Edge / Date boundary | High | Admin đã đăng nhập | TC17 in `fr17-testcases-draft.json` | Submit expired_at = 2020-01-01 | Phải từ chối vì ngày hết hạn phải là tương lai; hiện tại có thể fail do bug | Xóa `FR17PAST` nếu SUT tạo row | TC17 - expired_at trong quá khứ phải bị từ chối | Planned |
| FR17-18 | FR-17 / Confirmed point 6.3 | Edge / Normalization | High | Admin đã đăng nhập, code `SAVE10` tồn tại | TC18 in `fr17-testcases-draft.json` | Submit code ` save10 ` | Phải trim, so trùng không phân biệt hoa/thường và báo lỗi trùng | Xóa row nếu SUT tạo code mới do bug | TC18 - Code được trim và không phân biệt hoa/thường | Planned |
| FR17-19 | FR-17 / RULE-09 / Confirmed point 6.4 | Negative / UX confirmation | High | Admin đã đăng nhập, có coupon tạm | TC19 in `fr17-testcases-draft.json` | Click Xóa trong row coupon | Phải có confirm dialog trước khi xóa; hiện tại xóa ngay là bug | Xóa `FR17DEL` nếu còn tồn tại | TC19 - Xóa coupon phải có confirm dialog | Planned |

## Coverage review

- [ ] Unique IDs and external data row for every automated case.
- [ ] Positive, negative, edge/boundary coverage justified.
- [ ] Requirement/oracle source recorded.
- [ ] At least three assertion patterns implemented.
- [ ] Isolation and cleanup verified.
- [ ] Unautomated cases have technical reason, attempt, risk, next action.
