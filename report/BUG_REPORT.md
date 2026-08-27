# Bug Report

> Chỉ ghi product bug sau khi đã loại trừ test/environment issue và có screenshot thật. GitHub Issue là tùy chọn; ghi `Chưa tạo` nếu chưa có.

## Summary

| Bug ID | Title | Feature/test ID | Severity | Reproducibility | GitHub Issue | Status |
|---|---|---|---|---|---|---|
| BUG-001 | Hệ thống sinh OTP 4 chữ số thay vì 6 chữ số | FR-03 / TC04 | Major / High | 3/3 browser projects | Chưa tạo | Confirmed locally |
| BUG-002 | User vẫn có thể hủy đơn đang giao | FR-11 / TC07 | Major / High | 2/3 browser projects có screenshot xác nhận; Firefox bị loại do lỗi session/login | Chưa tạo | Confirmed locally |
| BUG-003 | Admin có thể đánh dấu đã giao cho đơn đã hủy | FR-11 / TC10 | Major / High | 3/3 browser projects | Chưa tạo | Confirmed locally |
| BUG-009 | Không hoàn tất đặt lại mật khẩu với OTP hiển thị và mật khẩu hợp lệ | FR-03 / TC02 | Major / High | 3/3 browser projects | Chưa tạo | Confirmed locally |

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
| Test repo commit | `b334843ae4cbfec9b91a59cb485bbea97f0b063e` (working tree dirty/uncommitted tại thời điểm triage) |
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

Hệ thống chỉ sinh OTP 4 chữ số trên cả ba trình duyệt trong lần chạy mới nhất: Chromium hiển thị `6782`, Firefox hiển thị `4709`, WebKit hiển thị `4625`. Giao diện đồng thời ghi nhãn **Mã OTP (4 số)**.

### Evidence

- Screenshot: `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-chromium-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-firefox-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-1149d-OTP-được-sinh-đúng-6-chữ-số-webkit-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`
- HTML report: `playwright-report/index.html` (artifact cập nhật lúc `2026-08-27T10:58:56+07:00`)
- Trace/video/log: ba file `error-context.md` nằm cùng thư mục với các screenshot nêu trên; lần chạy này không tạo trace hoặc video.
- ISO reproduction time: `2026-08-27T03:58:12.611Z`

### Triage notes

TC04 lấy chính chuỗi OTP mà UI hiển thị, xác nhận chuỗi chỉ chứa số rồi so độ dài với `expected_otp_length = 6` trong dữ liệu test. Vì vậy failure không bắt nguồn từ selector, dữ liệu nhập hay assertion sai. RULE-03 trong `docs/fr-context/fr03-context.md` cũng xác nhận yêu cầu OTP 6 chữ số. Cùng một sai lệch xuất hiện với ba giá trị ngẫu nhiên khác nhau trên Chromium, Firefox và WebKit, nên đã loại trừ nguyên nhân riêng của trình duyệt. TC02 trong cùng lần chạy dùng đúng OTP 4 chữ số mà SUT hiển thị và vẫn không hoàn tất đặt lại mật khẩu; triệu chứng đó được ghi riêng ở BUG-009.

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

## Summary Addendum - FR-17

| Bug ID | Title | Feature/test ID | Severity | Reproducibility | GitHub Issue | Status |
|---|---|---|---|---|---|---|
| BUG-004 | Hệ thống chấp nhận discount_value không dương | FR-17 / TC10, TC11 | Major / High | 2 observed failures in latest run; confirmed by FR17 context exploration | Chưa tạo | Confirmed locally |
| BUG-005 | Hệ thống chấp nhận min_order_amount âm | FR-17 / TC12 | Major / High | 1 observed browser failure in latest run; confirmed by FR17 context exploration | Chưa tạo | Confirmed locally |
| BUG-006 | Hệ thống chấp nhận coupon percent lớn hơn 100% | FR-17 / TC16 | Major / High | 1 observed browser failure in latest run | Chưa tạo | Confirmed locally |
| BUG-007 | Hệ thống chấp nhận ngày hết hạn trong quá khứ | FR-17 / TC17 | Major / High | 2 observed browser failures in latest run; confirmed by FR17 context exploration | Chưa tạo | Confirmed locally |
| BUG-008 | Xóa coupon không có confirm dialog | FR-17 / TC19 | Major / Medium | 3/3 browser projects in latest run | Chưa tạo | Confirmed locally |

## BUG-004 – Hệ thống chấp nhận discount_value không dương

| Field | Value |
|---|---|
| Feature / test ID | FR-17 / TC10, TC11 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `402816fc2586a54be7442f6ff2c4b91e10c6a8c2` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; latest direct evidence from Firefox; context exploration also reproduced by Playwright MCP |
| Severity / priority | Major / High - coupon giảm giá có giá trị 0 hoặc âm làm sai nghiệp vụ khuyến mãi |
| Reproducibility | Latest run observed failures for TC10 and TC11; FR17 context exploration also recorded `discount_value = 0` and `discount_value = -10` being accepted |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Mở màn hình `Mã Giảm Giá`.

### Steps to reproduce

1. Chọn type `percent`.
2. Nhập coupon với `discount_value = 0` hoặc `discount_value = -10`, ngày hết hạn tương lai và `max_uses_per_user = 1`.
3. Bấm `Tạo mã` và quan sát bảng coupon.

### Expected result

Theo FR-17, `discount_value` phải là số dương; coupon có `discount_value <= 0` phải bị từ chối và không xuất hiện trong bảng.

### Actual result

SUT tạo coupon dù `discount_value` không dương. Artifact mới nhất ghi nhận row `FR17ZERO`/`FR17NEGDISC` được tìm thấy thay vì bị từ chối; screenshot Firefox hiển thị row `FR17NEGDISC` với giá trị `-10%`.

### Evidence

- Screenshot: `test-results/fr17-coupon-crud-FR-17-Quả-b6646-nt-value-âm-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`; `test-results/fr17-coupon-crud-FR-17-Quả-be834-unt-value-0-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`
- HTML report: `playwright-report/index.html`
- Trace/video/log: `error-context.md` trong các thư mục screenshot nêu trên; không thấy trace/video riêng trong artifact.
- ISO reproduction time: `2026-08-27T03:26:32.884Z`

### Triage notes

Selector login/menu coupon đã qua được trong latest run, page snapshot ở đúng màn hình `Quản lý Mã Giảm Giá`. Assertion chỉ kiểm tra row theo mã coupon duy nhất phải có count `0`, nhưng thực tế locator resolve được `1` row. Context FR17 cũng đã ghi nhận cùng hành vi khi khám phá black-box, nên đây không phải lỗi selector hoặc dữ liệu test.

### Workaround/impact

Admin phải tự tránh nhập giá trị 0 hoặc âm. Nếu không, hệ thống có thể lưu coupon vô nghĩa hoặc coupon âm làm sai tính toán giảm giá.

## BUG-005 – Hệ thống chấp nhận min_order_amount âm

| Field | Value |
|---|---|
| Feature / test ID | FR-17 / TC12 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `402816fc2586a54be7442f6ff2c4b91e10c6a8c2` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; latest direct evidence from Firefox; context exploration also reproduced by Playwright MCP |
| Severity / priority | Major / High - điều kiện đơn tối thiểu âm làm sai rule áp dụng coupon |
| Reproducibility | 1 observed browser failure in latest run; FR17 context exploration also recorded `min_order_amount = -1` being accepted |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Mở màn hình `Mã Giảm Giá`.

### Steps to reproduce

1. Tạo coupon percent với `discount_value = 10`.
2. Nhập `min_order_amount = -1`, ngày hết hạn tương lai và `max_uses_per_user = 1`.
3. Bấm `Tạo mã` và quan sát bảng coupon.

### Expected result

Theo FR-17, `min_order_amount` phải `>= 0`; coupon có đơn tối thiểu âm phải bị từ chối và không xuất hiện trong bảng.

### Actual result

SUT tạo coupon `FR17NEGMIN`; screenshot Firefox hiển thị row này với `Đơn tối thiểu = -1 đ`.

### Evidence

- Screenshot: `test-results/fr17-coupon-crud-FR-17-Quả-3ffb5-r-amount-âm-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`
- HTML report: `playwright-report/index.html`
- Trace/video/log: `test-results/fr17-coupon-crud-FR-17-Quả-3ffb5-r-amount-âm-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/error-context.md`
- ISO reproduction time: `2026-08-27T03:26:32.884Z`

### Triage notes

Page snapshot ở đúng màn coupon và form chứa `FR17NEGMIN`, `discount_value = 10`, `min_order_amount = -1`. Test expected row count `0`, nhưng locator theo code `FR17NEGMIN` nhận `1` row. Context FR17 đã ghi nhận cùng hành vi bằng black-box exploration.

### Workaround/impact

Admin phải tự không nhập giá trị âm. Coupon với đơn tối thiểu âm có thể được áp dụng ngoài điều kiện nghiệp vụ mong muốn.

## BUG-006 – Hệ thống chấp nhận coupon percent lớn hơn 100%

| Field | Value |
|---|---|
| Feature / test ID | FR-17 / TC16 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `402816fc2586a54be7442f6ff2c4b91e10c6a8c2` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; latest direct evidence from Firefox |
| Severity / priority | Major / High - discount percent trên 100% có thể làm tổng giảm giá vượt giá trị đơn hàng |
| Reproducibility | 1 observed browser failure in latest run |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Mở màn hình `Mã Giảm Giá`.

### Steps to reproduce

1. Chọn type `percent`.
2. Nhập `discount_value = 101`, `min_order_amount = 0`, ngày hết hạn tương lai và `max_uses_per_user = 1`.
3. Bấm `Tạo mã` và quan sát bảng coupon.

### Expected result

Theo xác nhận rule trong `docs/fr-context/fr17-context.md`, coupon percent không được vượt quá 100%; giá trị 101% phải bị từ chối.

### Actual result

SUT tạo coupon `FR17P101`; screenshot Firefox hiển thị row `FR17P101` với giá trị `101%`.

### Evidence

- Screenshot: `test-results/fr17-coupon-crud-FR-17-Quả-cca03-percent-100-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`
- HTML report: `playwright-report/index.html`
- Trace/video/log: `test-results/fr17-coupon-crud-FR-17-Quả-cca03-percent-100-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/error-context.md`
- ISO reproduction time: `2026-08-27T03:26:32.884Z`

### Triage notes

Failure là assertion row count: expected `0`, received `1`. Snapshot cho thấy màn coupon đã load đúng, row `FR17P101` tồn tại. Đây không phải lỗi selector vì row được định danh bằng chính mã coupon test.

### Workaround/impact

Admin phải tự giới hạn percent không quá 100. Nếu lưu 101%, hệ thống có thể giảm vượt giá trị đơn hàng.

## BUG-007 – Hệ thống chấp nhận ngày hết hạn trong quá khứ

| Field | Value |
|---|---|
| Feature / test ID | FR-17 / TC17 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `402816fc2586a54be7442f6ff2c4b91e10c6a8c2` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; Firefox and WebKit |
| Severity / priority | Major / High - coupon mới tạo đã hết hạn là dữ liệu sai nghiệp vụ |
| Reproducibility | 2 observed browser failures in latest run; FR17 context exploration also recorded past-date coupon being accepted |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Mở màn hình `Mã Giảm Giá`.

### Steps to reproduce

1. Tạo coupon percent hợp lệ nhưng nhập `expired_at = 2020-01-01`.
2. Bấm `Tạo mã`.
3. Quan sát bảng coupon.

### Expected result

Theo xác nhận nghiệp vụ trong `docs/fr-context/fr17-context.md`, ngày hết hạn bắt buộc phải là ngày tương lai; coupon có ngày trong quá khứ phải bị từ chối.

### Actual result

SUT tạo coupon `FR17PAST`; screenshot hiển thị row `FR17PAST` với trạng thái `Hết hạn`.

### Evidence

- Screenshot: `test-results/fr17-coupon-crud-FR-17-Quả-b62fd-ong-quá-khứ-phải-bị-từ-chối-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`; `test-results/fr17-coupon-crud-FR-17-Quả-b62fd-ong-quá-khứ-phải-bị-từ-chối-webkit-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`
- HTML report: `playwright-report/index.html`
- Trace/video/log: `error-context.md` trong hai thư mục screenshot nêu trên
- ISO reproduction time: `2026-08-27T03:26:32.884Z`

### Triage notes

Latest run vào đúng màn coupon và test chỉ kiểm tra coupon `FR17PAST` không được tạo. Thực tế locator theo row nhận `1` element. Context FR17 cũng đã ghi nhận UI tạo coupon quá hạn và đánh dấu `Hết hạn`.

### Workaround/impact

Admin phải tự kiểm tra ngày trước khi tạo coupon. Hệ thống có thể lưu coupon mới ở trạng thái hết hạn ngay khi tạo, gây dữ liệu rác và nhầm lẫn vận hành.

## BUG-008 – Xóa coupon không có confirm dialog

| Field | Value |
|---|---|
| Feature / test ID | FR-17 / TC19 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5174` công khai trong artifact |
| Test repo commit | `402816fc2586a54be7442f6ff2c4b91e10c6a8c2` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; admin app `http://localhost:5174`; Chromium, Firefox and WebKit |
| Severity / priority | Major / Medium - thao tác destructive không có xác nhận, dễ xóa nhầm coupon |
| Reproducibility | 3/3 browser projects in latest run |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT admin app đang chạy tại `http://localhost:5174`.
- Đăng nhập admin bằng `admin@eshop.com`.
- Mở màn hình `Mã Giảm Giá`.
- Có ít nhất một coupon trong bảng.

### Steps to reproduce

1. Tạo hoặc chọn một coupon trong bảng.
2. Click nút `Xóa` của row coupon.
3. Quan sát browser có hiển thị confirm dialog trước khi xóa hay không.

### Expected result

Theo xác nhận nghiệp vụ trong `docs/fr-context/fr17-context.md`, xóa coupon phải có confirm dialog trước khi thực hiện.

### Actual result

Không có confirm dialog. Playwright chờ event `dialog` đến timeout trên Chromium/Firefox/WebKit; context FR17 cũng ghi nhận click `Xóa` làm row biến mất ngay.

### Evidence

- Screenshot: `test-results/fr17-coupon-crud-FR-17-Quả-dd0b8-upon-phải-có-confirm-dialog-chromium-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`; `test-results/fr17-coupon-crud-FR-17-Quả-dd0b8-upon-phải-có-confirm-dialog-firefox-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`; `test-results/fr17-coupon-crud-FR-17-Quả-dd0b8-upon-phải-có-confirm-dialog-webkit-Run-by-23127104-2026-08-27T03-26-32-884Z/test-failed-1.png`
- HTML report: `playwright-report/index.html`
- Trace/video/log: `error-context.md` trong ba thư mục screenshot nêu trên
- ISO reproduction time: `2026-08-27T03:26:32.884Z`

### Triage notes

Failure xảy ra tại `page.waitForEvent('dialog')` sau khi click `Xóa`, không phải tại selector row. Vì cả ba browser đều timeout khi chờ dialog và context FR17 đã xác nhận xóa ngay không có dialog, đây là product defect về luồng xác nhận thao tác destructive.

### Workaround/impact

Admin phải tự cẩn thận khi bấm `Xóa`; không có cơ chế hủy thao tác nếu click nhầm.
## BUG-009 – Không hoàn tất đặt lại mật khẩu với OTP hiển thị và mật khẩu hợp lệ

| Field | Value |
|---|---|
| Feature / test ID | FR-03 / TC02 |
| SUT build/commit | Không được SUT black-box tại `http://localhost:5173` công khai trong artifact |
| Test repo commit | `b334843ae4cbfec9b91a59cb485bbea97f0b063e` (working tree dirty/uncommitted tại thời điểm triage) |
| Environment/browser | Playwright multi-browser run; user app `http://localhost:5173`; Chromium, Firefox và WebKit |
| Severity / priority | Major / High — happy path quên mật khẩu không hoàn tất dù người dùng nhập OTP hiển thị và mật khẩu mới hợp lệ |
| Reproducibility | 3/3 browser projects trong lần chạy mới nhất: Chromium, Firefox và WebKit |
| GitHub Issue | Chưa tạo |

### Preconditions

- SUT user app đang chạy tại `http://localhost:5173`.
- Tài khoản `admin@eshop.com` tồn tại và đi được từ bước nhập email sang bước nhập OTP.
- TC02 dùng mật khẩu mới hợp lệ `Abc@12345`.

### Steps to reproduce

1. Mở trang `/forgot-password`.
2. Nhập `admin@eshop.com` và bấm **Lấy mã OTP**.
3. Nhập đúng OTP đang hiển thị trên UI vào ô **Mã OTP (4 số)**.
4. Nhập mật khẩu mới hợp lệ `Abc@12345`.
5. Bấm **Đặt lại mật khẩu**.

### Expected result

Theo FR-03 và oracle TC02, khi nhập OTP đúng và mật khẩu mới hợp lệ, hệ thống phải cập nhật mật khẩu thành công, hiển thị thông báo `Cập nhật mật khẩu thành công`, sau đó chuyển về màn hình `/login`.

### Actual result

SUT vẫn đứng ở màn hình đặt lại mật khẩu và không hiển thị thông báo thành công. Artifact ghi nhận cả ba browser đều đã nhập đúng OTP đang hiển thị và mật khẩu mới hợp lệ: Chromium dùng OTP `7122`, Firefox dùng OTP `8292`, WebKit dùng OTP `6165`; cả ba đều vẫn ở form `Quên Mật Khẩu` sau khi bấm **Đặt lại mật khẩu**.

### Evidence

- Screenshot: `test-results/fr03-forgot-password-FR-03-aa19f-úng-OTP-mật-khẩu-mới-hợp-lệ-chromium-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-aa19f-úng-OTP-mật-khẩu-mới-hợp-lệ-firefox-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`; `test-results/fr03-forgot-password-FR-03-aa19f-úng-OTP-mật-khẩu-mới-hợp-lệ-webkit-Run-by-23127104-2026-08-27T03-58-12-611Z/test-failed-1.png`
- HTML report: `playwright-report/index.html` (artifact cập nhật lúc `2026-08-27T10:58:56+07:00`)
- Trace/video/log: `error-context.md` trong ba thư mục screenshot nêu trên; lần chạy này không thấy trace/video riêng trong artifact.
- ISO reproduction time: `2026-08-27T03:58:12.611Z`

### Triage notes

TC02 sau khi được sửa đã nhập chính OTP mà SUT hiển thị, không còn padding lên 6 số. Screenshot và `error-context.md` cho thấy OTP input khớp với OTP display trên cả ba browser (`7122`, `8292`, `6165`) và password input đã nhận `Abc@12345`. Assertion fail ở bước chờ message `Cập nhật mật khẩu thành công`, trong khi snapshot vẫn ở màn hình `/forgot-password`, nên đây không phải lỗi login assertion phía sau. Selector không phải nguyên nhân chính vì test đã tìm đúng OTP display, đúng OTP input, đúng password input và đúng button submit; dữ liệu test khớp TC02 trong `automation/data/fr03-testcases-draft.json`. TC07 Firefox trong cùng run bị loại khỏi bug report riêng vì failure là timeout locator đọc OTP dù screenshot có OTP hiển thị, chỉ xảy ra 1 browser và chưa chứng minh thêm product defect mới.

### Workaround/impact

Người dùng không có workaround đáng tin cậy để hoàn tất reset password qua UI. Lỗi chặn happy path quên mật khẩu, khiến tài khoản không thể đặt lại mật khẩu dù nhập OTP hiển thị và mật khẩu mới hợp lệ.
