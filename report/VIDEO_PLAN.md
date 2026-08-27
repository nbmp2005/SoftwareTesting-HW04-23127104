# Demo Video Plan

## Required metadata

- Video URL: Chưa gắn link YouTube unlisted
- Duration: Chưa quay; yêu cầu tối thiểu 5 phút
- Narration: Vietnamese
- Demonstrated feature: FR-03 - Quên mật khẩu & Đặt lại mật khẩu
- Authorship evidence: Terminal chạy `whoami` và `hostname`

## Suggested timeline (6–8 minutes)

| Time | Screen/action | Vietnamese narration goal |
|---|---|---|
| 00:00–00:30 | Title, repo, student ID | Giới thiệu MSSV, feature, mục tiêu video |
| 00:30–00:50 | Terminal: `whoami`, `hostname` | Chứng minh authorship; không che output |
| 00:50–01:40 | Dataset and case IDs | Giải thích data-driven, ≥12 case, oracle |
| 01:40–02:40 | Spec/config | Chỉ ba assertion patterns, locator, three projects |
| 02:40–03:30 | AI original vs human fix | Kể ít nhất một lỗi AI thật, correction và lý do |
| 03:30–05:30 | Run multi-browser | Chạy thật; giải thích Chromium/Firefox/WebKit |
| 05:30–06:30 | Open HTML report | Chỉ project results, `Run by: 23127104`, ISO timestamp |
| 06:30–07:00 | Summary/bug or gaps | Kết quả thật, limitation, link artifacts |

## Recording checklist

- [ ] Font terminal đủ lớn; student ID và command nhìn rõ.
- [ ] Không lộ password/token/.env.
- [ ] Không cắt ghép làm mất tính liên tục của evidence chính.
- [ ] Multi-browser run và report thuộc cùng commit/run.
- [ ] Có tiếng Việt và ≥5 phút sau khi upload.
- [ ] Video đặt Unlisted, link mở được ở cửa sổ ẩn danh.
- [ ] Nếu dùng video này cho skill demo, có gọi skill và cho thấy end-to-end output.

## Narration notes

### AI correction

- AI originally produced: Test TC02 phụ thuộc vào giả định OTP 6 chữ số và không cô lập được lỗi reset mật khẩu.
- Why it was wrong/fragile: SUT thực tế sinh OTP 4 chữ số, làm happy path reset bị che bởi lỗi OTP length.
- My correction: Đọc OTP đang hiển thị trên UI, nhập đúng OTP đó, rồi kiểm tra riêng message thành công, redirect `/login`, và đăng nhập bằng mật khẩu mới.
- Evidence that correction works: Lần chạy FR-03 mới nhất tạo BUG-009 với screenshot trên cả Chromium/Firefox/WebKit, chứng minh lỗi reset password độc lập với BUG-001.

### Run summary

- Command: `npm run test:fr03`
- Commit SHA: `38028e7` hoặc commit cuối cùng sau khi hoàn tất tài liệu
- Run timestamp: Lấy từ tên project trong HTML report sau khi quay video
- Actual pass/fail/skip: FR-03 artifact gần nhất: 23 pass, 7 fail, 3 skip trên 3 browser
