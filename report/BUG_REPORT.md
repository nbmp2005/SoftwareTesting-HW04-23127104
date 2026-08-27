# Bug Report

> Chỉ ghi product bug sau khi đã loại trừ test/environment issue và có screenshot thật. GitHub Issue là tùy chọn; ghi `Chưa tạo` nếu chưa có.

## Summary

| Bug ID | Title | Feature/test ID | Severity | Reproducibility | GitHub Issue | Status |
|---|---|---|---|---|---|---|
| BUG-001 | Hệ thống sinh OTP 4 chữ số thay vì 6 chữ số | FR-03 / TC04 | Major / High | 3/3 browser projects | Chưa tạo | Confirmed locally |
| BUG-002 | User vẫn có thể hủy đơn đang giao | FR-11 / TC07 | Major / High | 2/3 browser projects có screenshot xác nhận; Firefox bị loại do lỗi session/login | Chưa tạo | Confirmed locally |
| BUG-003 | Admin có thể đánh dấu đã giao cho đơn đã hủy | FR-11 / TC10 | Major / High | 3/3 browser projects | Chưa tạo | Confirmed locally |

## BUG-[NNN] – [Concise title]

| Field | Value |
|---|---|
| Feature / test ID | [TODO] |
| SUT build/commit | [TODO] |
| Test repo commit | [TODO] |
| Environment/browser | [TODO] |
| Severity / priority | [TODO + rationale] |
| Reproducibility | [e.g. 3/3; do not guess] |
| GitHub Issue | [TODO: public URL] |

### Preconditions

[TODO]

### Steps to reproduce

1. [TODO]
2. [TODO]
3. [TODO]

### Expected result

[TODO: requirement-based oracle]

### Actual result

[TODO: exact observation]

### Evidence

- Screenshot: [TODO: path/URL]
- HTML report: [TODO]
- Trace/video/log: [TODO]
- ISO reproduction time: [TODO]

### Triage notes

[TODO: isolated rerun, cross-browser comparison, data/environment checks, why this is a product defect.]

### Workaround/impact

[TODO]

## BUG-001 – Hệ thống sinh OTP 4 chữ số thay vì 6 chữ số

| Field | Value |
|---|---|
| Feature / test ID | FR-03 / TC04 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5173` công khai trong artifact |
| Test repo commit | `074beed7b1c4940e1f7f2e54bd53f6bf907e6c7e` |
| Environment/browser | Microsoft Windows NT 10.0.26200.0; Playwright 1.62.1; Chromium, Firefox và WebKit; base URL `http://localhost:5173` |
| Severity / priority | Major / High — vi phạm trực tiếp quy tắc OTP 6 chữ số của luồng đặt lại mật khẩu và xuất hiện trên cả ba trình duyệt |
| Reproducibility | 3/3 browser projects trong lần chạy mới nhất: Chromium, Firefox và WebKit |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT đang chạy tại `http://localhost:5173`.
- Tài khoản đã đăng ký `admin@eshop.com` có thể đi từ bước nhập email sang bước nhập OTP.

### Steps to reproduce

1. Mở trang `/forgot-password`.
2. Nhập `admin@eshop.com` và bấm **Lấy mã OTP**.
3. Quan sát mã OTP được hệ thống hiển thị và nhãn của trường nhập OTP.

### Expected result

Theo RULE-03 của FR-03 và oracle của TC04, hệ thống phải sinh và hiển thị OTP gồm đúng 6 chữ số.

### Actual result

Hệ thống chỉ sinh OTP 4 chữ số trên cả ba trình duyệt: Chromium hiển thị `6235`, Firefox hiển thị `3977`, WebKit hiển thị `1186`. Giao diện đồng thời ghi nhãn **Mã OTP (4 số)**.

### Evidence

- Screenshot: `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-chromium-Run-by-23127104-2026-08-26T10-03-55-607Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-firefox-Run-by-23127104-2026-08-26T10-03-55-607Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-webkit-Run-by-23127104-2026-08-26T10-03-55-607Z/test-failed-1.png`
- HTML report: `playwright-report/index.html` (artifact cập nhật lúc `2026-08-26T10:04:33.4448897Z`)
- Trace/video/log: ba file `error-context.md` nằm cùng thư mục với các screenshot nêu trên; lần chạy này không tạo trace hoặc video.
- ISO reproduction time: `2026-08-26T10:03:55.607Z`

### Triage notes

TC04 lấy chính chuỗi OTP mà UI hiển thị, xác nhận chuỗi chỉ chứa số rồi so độ dài với `expected_otp_length = 6` trong dữ liệu test. Vì vậy failure không bắt nguồn từ selector, dữ liệu nhập hay assertion sai. RULE-03 trong `docs/fr-context/fr03-context.md` cũng xác nhận yêu cầu OTP 6 chữ số. Cùng một sai lệch xuất hiện với ba giá trị ngẫu nhiên khác nhau trên Chromium, Firefox và WebKit, nên đã loại trừ nguyên nhân riêng của trình duyệt. TC02 cũng dừng ở bước 2 trên cả ba trình duyệt sau khi dùng OTP 4 chữ số được UI sinh ra; hiện chỉ ghi nhận đây là triệu chứng có thể liên quan, chưa tách thành bug khác khi chưa cô lập được nguyên nhân.

### Workaround/impact

Không có workaround đáng tin cậy trên UI vì người dùng không kiểm soát được OTP do hệ thống sinh. Lỗi làm sai quy tắc bảo mật của chức năng quên mật khẩu và có thể cản trở việc hoàn tất đặt lại mật khẩu.

## BUG-002 – User vẫn có thể hủy đơn đang giao

| Field | Value |
|---|---|
| Feature / test ID | FR-11 / TC07 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5173` công khai trong artifact |
| Test repo commit | `074beed7b1c4940e1f7f2e54bd53f6bf907e6c7e` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; user app `http://localhost:5173`; Chromium và WebKit có screenshot xác nhận defect |
| Severity / priority | Major / High — vi phạm state machine FR-11, cho phép user thao tác hủy khi đơn đã sang trạng thái đang giao |
| Reproducibility | 2/3 browser projects có evidence trực tiếp: Chromium và WebKit. Firefox failure cùng TC bị loại khỏi reproducibility vì screenshot chỉ hiển thị màn hình "Vui lòng đăng nhập" |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT user app đang chạy tại `http://localhost:5173`.
- Đăng nhập bằng `test@eshop.com`.
- Có đơn hàng của user ở trạng thái `shipping / Đang giao`; trong lần chạy này là đơn `#3`.

### Steps to reproduce

1. Mở trang user app và đăng nhập bằng tài khoản test.
2. Vào trang hồ sơ/lịch sử đơn hàng.
3. Quan sát dòng đơn hàng `#3` có trạng thái `Đang giao`.

### Expected result

Theo FR-11 state machine đã xác nhận cho TC07, user không được hủy đơn ở trạng thái `shipping / Đang giao`; ô thao tác của dòng này không được có nút `Hủy đơn`.

### Actual result

Dòng đơn `#3` trạng thái `Đang giao` vẫn hiển thị nút `Hủy đơn` trên UI user.

### Evidence

- Screenshot: `test-results/fr11-order-history-FR-11-X-64dc6-không-được-hủy-đơn-shipping-chromium-Run-by-23127104-2026-08-27T02-44-10-270Z/test-failed-1.png`; `test-results/fr11-order-history-FR-11-X-64dc6-không-được-hủy-đơn-shipping-webkit-Run-by-23127104-2026-08-27T02-44-10-270Z/test-failed-1.png`
- HTML report: `playwright-report/index.html` (artifact cập nhật lúc `2026-08-27T02:45:06.9436332Z`)
- Trace/video/log: `error-context.md` trong hai thư mục screenshot nêu trên; lần chạy này không thấy trace/video riêng trong artifact.
- ISO reproduction time: `2026-08-27T02:44:10.270Z`

### Triage notes

TC07 dùng selector theo row thật của đơn `#3` và assertion `toHaveCount(0)` cho button `Hủy đơn`. Screenshot Chromium và WebKit đều cho thấy bảng lịch sử đơn hàng đã tải đúng, user `test@eshop.com` đã đăng nhập, dòng `#3` có trạng thái `Đang giao`, và nút `Hủy đơn` xuất hiện. Do đó lỗi không đến từ selector hoặc assertion. Failure Firefox cùng TC07 không được dùng làm evidence vì screenshot cho thấy session/login không hợp lệ, nên được phân loại là vấn đề môi trường/session của run.

### Workaround/impact

Không có workaround ổn định từ phía user ngoài việc không bấm nút. Lỗi có thể làm sai quy trình xử lý đơn vì user vẫn được hủy đơn sau khi đơn đã chuyển sang giai đoạn giao hàng.

## BUG-003 – Admin có thể đánh dấu đã giao cho đơn đã hủy

| Field | Value |
|---|---|
| Feature / test ID | FR-11 / TC10 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `074beed7b1c4940e1f7f2e54bd53f6bf907e6c7e` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; Chromium, Firefox và WebKit |
| Severity / priority | Major / High — vi phạm trạng thái kết thúc `canceled`, cho phép admin chuyển đơn đã hủy sang `delivered` |
| Reproducibility | 3/3 browser projects trong lần chạy mới nhất: Chromium, Firefox và WebKit |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Có đơn hàng trạng thái `canceled / Đã hủy`; trong lần chạy này là đơn `#2`.

### Steps to reproduce

1. Mở admin app và đăng nhập bằng tài khoản admin.
2. Vào màn hình `Đơn hàng`.
3. Quan sát dòng đơn hàng `#2` có trạng thái `Đã hủy`.

### Expected result

Theo FR-11 state machine và TC10, `canceled / Đã hủy` là trạng thái kết thúc; admin không được có hành động chuyển đơn đã hủy sang `delivered / Đã giao`.

### Actual result

Dòng đơn `#2` trạng thái `Đã hủy` vẫn hiển thị nút `Đánh dấu Đã giao` trong cột hành động.

### Evidence

- Screenshot: `test-results/fr11-order-history-FR-11-X-d9665-yển-canceled-sang-delivered-chromium-Run-by-23127104-2026-08-27T02-44-10-270Z/test-failed-1.png`; `test-results/fr11-order-history-FR-11-X-d9665-yển-canceled-sang-delivered-firefox-Run-by-23127104-2026-08-27T02-44-10-270Z/test-failed-1.png`; `test-results/fr11-order-history-FR-11-X-d9665-yển-canceled-sang-delivered-webkit-Run-by-23127104-2026-08-27T02-44-10-270Z/test-failed-1.png`
- HTML report: `playwright-report/index.html` (artifact cập nhật lúc `2026-08-27T02:45:06.9436332Z`)
- Trace/video/log: `error-context.md` trong ba thư mục screenshot nêu trên; lần chạy này không thấy trace/video riêng trong artifact.
- ISO reproduction time: `2026-08-27T02:44:10.270Z`

### Triage notes

TC10 đăng nhập admin, vào bảng `Quản lý Đơn hàng`, lọc dòng theo order id từ `FR11_CANCELED_ORDER_ID=2`, xác nhận row có text `Đã hủy`, rồi kiểm tra không được có button `Đánh dấu Đã giao`. Cả ba screenshot Chromium, Firefox và WebKit đều hiển thị dòng `#2` với trạng thái `Đã hủy` và button `Đánh dấu Đã giao`. Vì row và status đều khớp dữ liệu fixture, failure không phải do stale ID, selector sai, hoặc assertion sai; hành vi UI trái trực tiếp với state machine đã xác nhận.

### Workaround/impact

Admin phải tự tránh bấm nhầm nút này. Nếu thao tác được thực thi, hệ thống có thể hồi sinh đơn đã hủy thành đã giao, làm sai lịch sử đơn hàng và báo cáo trạng thái.
