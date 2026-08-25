# Hướng dẫn thực hiện toàn bộ HW04

## Pha 0 – Chốt đầu vào

1. Điền tên, MSSV, lớp.
2. Chọn đúng ba feature đã dùng trong HW02: một Pool A, một Pool B, một Pool C.
3. Nếu không có HW02, ghi rõ lý do và tự tuyên bố ba feature trong report.
4. Kiểm tra không trùng feature với thành viên cùng group.
5. Clone/chạy EShop, ghi commit/version SUT, URL, seed data và tài khoản test.

**Definition of done:** ba feature có ID, nguồn requirement, role/account và môi trường chạy.

## Pha 1 – Thiết kế test và prompt theo từng bước

Cho mỗi feature, thực hiện các interaction AI riêng:

1. Yêu cầu AI tóm tắt business rules và liệt kê câu hỏi/giả định; con người sửa.
2. Yêu cầu áp dụng EP/BVA/decision table/state transition phù hợp.
3. Review để đủ ít nhất 12 case có positive, negative, edge hợp lý.
4. Yêu cầu chuyển case sang schema JSON/CSV ngoài script.
5. Yêu cầu lập mapping case → oracle → assertion pattern.

Không prompt “write all automation scripts”. Lưu từng prompt/output vào AI Audit ngay khi làm.

## Pha 2 – Scaffold Playwright

Khuyến nghị TypeScript + Playwright Test. Cấu trúc tham khảo:

```text
tests/
  data/
    feature-a.json
    feature-b.json
    feature-c.json
  pages/
  fixtures/
  feature-a.spec.ts
  feature-b.spec.ts
  feature-c.spec.ts
playwright.config.ts
reports/
```

Cấu hình ba project: Chromium, Firefox, WebKit; bật HTML reporter, screenshot/trace khi fail. Cấu hình student ID và timestamp từ biến môi trường hoặc script chạy sao cho report thật hiển thị chúng. Không commit `.env` chứa secret.

## Pha 3 – Implement theo lát mỏng

Cho mỗi feature:

1. Implement 1 happy path.
2. Chạy riêng trên Chromium, sửa selector/setup/assertion.
3. Commit thay đổi `.spec.ts` với message có nghĩa.
4. Thêm một nhóm negative/boundary case từ dataset.
5. Chạy lại và commit.
6. Mở rộng đến ≥12 case.
7. Chạy ba browser và review artifacts.

Để đạt ≥8 commit hợp lệ, lên kế hoạch ít nhất 3 commit cho Feature A, 3 cho Feature B, 2 cho Feature C; mỗi commit bắt buộc thay đổi `.spec.ts`/`.spec.js` hoặc tương đương. Không tạo commit giả chỉ đổi whitespace.

## Pha 4 – Human review và gap analysis

Lập bảng cho từng vấn đề AI:

| AI output | Vấn đề/rủi ro | Sửa của con người | Cách verify | Vì sao AI sai |
|---|---|---|---|---|
| [TODO] | [fragile selector/weak assertion/...] | [TODO] | [run/report] | [thiếu context/prompt/model/SUT] |

Kiểm tra locator, waits, isolation, oracle, assertion strength, edge cases và cross-browser. Ghi case không automate được cùng lý do kỹ thuật, attempt và risk.

## Pha 5 – Chạy và lưu evidence

Ma trận bắt buộc:

| Feature | Chromium | Firefox | WebKit |
|---|---|---|---|
| A | [TODO report] | [TODO report] | [TODO report] |
| B | [TODO report] | [TODO report] | [TODO report] |
| C | [TODO report] | [TODO report] | [TODO report] |

Mỗi record cần command, ISO start/end, commit SHA, browser, total/pass/fail/skip và report path. Mở report để kiểm tra bằng mắt `Run by: 23127104` + ISO timestamp. Không chỉ dựa vào terminal log.

## Pha 6 – Failure và bug

1. Re-run case fail độc lập.
2. Xem screenshot/trace và đối chiếu expected behavior.
3. Kiểm tra test data/environment.
4. Nếu product bug: tạo GitHub Issue public, attach screenshot thật, link report/commit.
5. Nếu test/environment issue: sửa hoặc ghi limitation; không ghi thành product bug.

## Pha 7 – Demo video

Video ≥5 phút, unlisted YouTube, thuyết minh tiếng Việt. Quay một luồng end-to-end gồm: giới thiệu feature/dataset/spec, chạy `whoami` và `hostname` hoặc face-cam, chạy multi-browser, mở HTML report và chỉ student ID/timestamp, giải thích ít nhất một correction đối với AI output. Dùng `report/VIDEO_PLAN.md` làm kịch bản.

## Pha 8 – Agent Skill

Quay end-to-end cách gọi `$hw04-playwright-automation` cho một feature hoàn chỉnh: input → case/data → code/review → run/report → documentation. Nộp nguyên thư mục `.agents/skills/hw04-playwright-automation`. Skill hỗ trợ workflow; nó không thay thế evidence thực thi.

## Pha 9 – Báo cáo và đóng gói

1. Hoàn thiện `report/MAIN_REPORT.md`.
2. Hoàn thiện `report/AI_AUDIT_REPORT.md` từ log thật.
3. Viết lại `report/AI_CRITIQUE.md` bằng trải nghiệm thật, giữ 200–300 từ.
4. Cập nhật README summary/self-assessment.
5. Xuất Main Report và AI Audit/Critique sang PDF.
6. Xuất `git log` ra text file và kiểm tra ≥8 commit test-script.
7. Chạy submission checklist.
8. Đóng gói tên `23127104_HW04_AI_Automation_<GRADE>.zip` với grade ba chữ số.

## Kế hoạch 10 giờ gợi ý

| Thời lượng | Công việc |
|---:|---|
| 0.5h | Chốt feature, môi trường, evidence plan |
| 1.5h | Thiết kế 36+ case và datasets |
| 4.0h | Implement/review ba feature |
| 1.0h | Multi-browser execution và triage |
| 1.0h | Report, audit, critique, bug issues |
| 1.0h | Quay/upload video |
| 1.0h | PDF, commit log, checklist, zip |

Thời gian này chỉ là ngân sách; ưu tiên evidence đúng hơn số lượng case hời hợt.
