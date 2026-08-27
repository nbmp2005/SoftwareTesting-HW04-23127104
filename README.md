# HW04 – AI Automation Testing

**Student ID:** 23127104  
**Student name:** Nguyễn Bình Minh Phương  
**Class:** 23KTPM4  
**Public repository:** https://github.com/nbmp2005/SoftwareTesting-HW04-23127104  
**Demo video:** Chưa gắn link YouTube unlisted  
**Skill demo video:** Chưa gắn link video demo skill

> Status: Đã có source automation, data-driven tests, bug report và Playwright HTML artifact. Trước khi nộp cần gắn link video/skill demo và xuất PDF.

## Selected features

| Pool | Feature | Selection basis |
|---|---|---|
| A | FR-03: Quên mật khẩu & Đặt lại mật khẩu | Đã có trong pool HW02 |
| B | FR-11: Xem lịch sử đơn hàng (User) | Đã có trong pool HW02 |
| C | FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Đã có trong pool HW02 |

## Test summary

| Metric | Result |
|---|---:|
| Features selected | 3 |
| Test cases designed | 48 |
| Test cases automated | 41 |
| Test executions across browsers | 126 listed Playwright tests across 3 browsers |
| Passed | Latest local artifact: FR-03 has 23 passed |
| Failed | Latest local artifact: FR-03 has 7 failed product-defect/evidence checks |
| Skipped/not automated | 7 |
| Browser runs | 9 |
| Confirmed product bugs | 9 |

## Self-assessment

| No. | Criterion | Maximum | Self-assessed |
|---:|---|---:|---:|
| 1 | Task 1 – Feature A | 25 | 25 |
| 2 | Task 1 – Feature B | 25 | 25 |
| 3 | Task 1 – Feature C | 25 | 25 |
| 4 | Task 2 – Demo video | 15 | Chưa chấm nếu chưa gắn video |
| 5 | Agent Skill | 10 | Chưa chấm nếu chưa gắn skill demo |
| | **Total** | **100** | **75 + phần video/skill sau khi gắn link** |

## Repository map

- `docs/01-foundation.md`: kiến thức nền tảng cần hiểu.
- `docs/02-per-fr-workflow.md`: quy trình thực hiện theo từng FR.
- `report/`: template báo cáo, audit, critique, bug, video và checklist.
- `.agents/skills/`: Các Agent Skill được dùng trong bài.
- `automation/tests/`, `playwright.config.ts`, `playwright-report/`: Chứa mã nguồn automation và cấu hình.

## Quick start

1. Điền thông tin cá nhân và ba feature đã chọn.
2. Đọc `docs/01-foundation.md`, rồi làm theo `docs/02-task-guide.md`.
3. Gọi `$hw04-playwright-automation` cho từng feature.
4. Chỉ điền số liệu/report/bug/video sau khi đã tạo evidence thật.
5. Dùng `report/SUBMISSION_CHECKLIST.md` trước khi đóng gói.
