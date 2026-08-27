# HW04 – AI Automation Testing

**Student ID:** 23127104  
**Student name:** Nguyễn Bình Minh Phương  
**Class:** 23KTPM4  
**Public repository:** https://github.com/nbmp2005/SoftwareTesting-HW04-23127104  
**Demo video:** https://youtu.be/jvRyudnSumI  
**Skill demo video:** https://youtu.be/4YA5ceIhLCg

## Selected features

| Pool | Feature | Selection basis |
|---|---|---|
| A | FR-03: Quên mật khẩu & Đặt lại mật khẩu | Cùng feature đã chọn ở HW02 |
| B | FR-11: Xem lịch sử đơn hàng (User) | Cùng feature đã chọn ở HW02 |
| C | FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Cùng feature đã chọn ở HW02 |

## Test summary

| Metric | Result |
|---|---:|
| Features selected | 3 |
| Test cases designed | 48 |
| Test cases automated | 41 |
| Playwright executions across browsers | 126 |
| Passed | 83 |
| Failed | 40 |
| Skipped | 3 |
| Browser runs | 9 |
| Confirmed product bugs | 9 |

### Latest multi-browser breakdown

| Feature | Browser | Executed | Pass | Fail | Notes |
|---|---|---:|---:|---:|---|
| FR-03 | Chromium | 11 | 8 | 2 | 1 skipped (`TC08`) |
| FR-03 | Firefox | 11 | 8 | 2 | 1 skipped (`TC08`) |
| FR-03 | WebKit | 11 | 8 | 2 | 1 skipped (`TC08`) |
| FR-11 | Chromium | 12 | 8 | 4 | No skipped |
| FR-11 | Firefox | 12 | 7 | 5 | No skipped |
| FR-11 | WebKit | 12 | 8 | 4 | No skipped |
| FR-17 | Chromium | 19 | 14 | 5 | No skipped |
| FR-17 | Firefox | 19 | 9 | 10 | No skipped |
| FR-17 | WebKit | 19 | 13 | 6 | No skipped |

## Self-assessment

| No. | Criterion | Maximum | Self-assessed |
|---:|---|---:|---:|
| 1 | Task 1 – Feature A | 25 | 25 |
| 2 | Task 1 – Feature B | 25 | 25 |
| 3 | Task 1 – Feature C | 25 | 25 |
| 4 | Task 2 – Demo video | 15 | 15 |
| 5 | Agent Skill | 10 | 10 |
| | **Total** | **100** | **100** |

## Repository map

- `automation/data/`: dữ liệu test data-driven cho FR-03, FR-11, FR-17.
- `automation/tests/`: Playwright specs cho ba feature đã chọn.
- `docs/fr-context/`: context black-box, ảnh chụp và oracle đã khám phá theo từng FR.
- `playwright-report/fr03`, `playwright-report/fr11`, `playwright-report/fr17`: HTML reports đa trình duyệt.
- `report/`: `MAIN_REPORT.md`, `TEST_CASE_CATALOG.md`, `BUG_REPORT.md`, `AI_AUDIT_REPORT.md`, `AI_CRITIQUE.md`, `SUBMISSION_CHECKLIST.md`, `commit-log.txt`.
- `.agents/skills/`: bộ skill dùng trong quy trình AI-first của bài.

## Quick start

1. Cài dependency bằng `npm install`.
2. Chạy từng suite bằng `npm run test:fr03`, `npm run test:fr11`, `npm run test:fr17`.
3. Mở HTML report bằng `npm run report` hoặc mở trực tiếp từng file `playwright-report/<fr>/index.html`.
4. Đối chiếu bug thật với `report/BUG_REPORT.md` và screenshot trong `test-results/`.
5. Rà lại `report/SUBMISSION_CHECKLIST.md` trước khi export PDF và đóng gói.
