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

## Coverage review

- [ ] Unique IDs and external data row for every automated case.
- [ ] Positive, negative, edge/boundary coverage justified.
- [ ] Requirement/oracle source recorded.
- [ ] At least three assertion patterns implemented.
- [ ] Isolation and cleanup verified.
- [ ] Unautomated cases have technical reason, attempt, risk, next action.
