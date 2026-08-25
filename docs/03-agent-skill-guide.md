# Xây Agent Skill cho HW04 từ đầu đến cuối

## Phương án thiết kế

### Phương án A – Instruction-only

Chỉ có `SKILL.md`. Dễ làm, dễ giải thích, phù hợp nếu repo nhỏ. Nhược điểm: schema review/evidence dài làm skill khó đọc và agent dễ quên chi tiết theo mode.

### Phương án B – Skill + references (đã chọn)

`SKILL.md` giữ trigger, invariants và human-review gate; `references/` chứa workflow, checklist review và schema evidence. Đây là cân bằng tốt cho bài: có progressive disclosure, dễ demo, đủ khả năng tái sử dụng sang feature khác.

### Phương án C – Skill + scripts xác định

Bổ sung scripts để validate dataset, đếm case, kiểm tra report có student ID/timestamp, hoặc tổng hợp result. Chỉ nên thêm sau khi format test/report đã ổn định; script mới phải được chạy test. Ưu điểm là giảm lỗi cơ học, nhưng tăng code phải bảo trì và không được dùng để “tạo” evidence giả.

### Phương án D – Plugin

Đóng gói skill thành plugin khi muốn phân phối rộng hoặc kèm connector. Quá mức cần thiết cho repo homework; standalone repo skill là đủ để nộp và demo.

## Cấu trúc hiện tại

```text
.agents/skills/hw04-playwright-automation/
  SKILL.md
  agents/openai.yaml
  references/
    workflow.md
    review-checklist.md
    evidence-schema.md
```

Theo [tài liệu OpenAI chính thức](https://learn.chatgpt.com/docs/build-skills), skill là một thư mục có `SKILL.md` với `name` và `description`; scripts/references/assets là tùy chọn. Codex có thể gọi rõ bằng `$skill-name` hoặc tự chọn theo `description`, và repo skill có thể đặt trong `.agents/skills`.

## Cách build thủ công

1. Chọn một job rõ ràng: “biến một EShop feature thành Playwright suite + evidence + documentation”.
2. Đặt tên lowercase-hyphen: `hw04-playwright-automation`.
3. Viết frontmatter `name`, `description`; description nói rõ trigger và boundary.
4. Đưa invariant ngắn vào `SKILL.md`.
5. Tách quy trình dài/checklist/schema vào `references/` và link từ entrypoint.
6. Thêm `agents/openai.yaml` cho display name/default prompt; không bắt buộc.
7. Validate skill.
8. Test bằng prompt thực tế trên một feature; review output và sửa skill theo failure thật.

## Cách gọi skill

Ví dụ theo từng vòng, không dùng một prompt bao trùm:

```text
$hw04-playwright-automation Phân tích FR-XX dựa trên HW02 cases và source hiện có. Chỉ tạo requirement map, assumption register và test design; chưa viết code.
```

```text
$hw04-playwright-automation Review dataset FR-XX: kiểm tra đủ 12 case, boundary, unique ID, oracle và khả năng chạy độc lập. Đề xuất patch nhưng không bịa requirement.
```

```text
$hw04-playwright-automation Implement 4 case đầu tiên từ dataset FR-XX bằng Playwright TypeScript, rồi review theo checklist của skill.
```

```text
$hw04-playwright-automation Kiểm tra artifacts của run FR-XX trên ba browser, phân loại failures và cập nhật report/audit chỉ từ evidence đang tồn tại.
```

## Cách demo skill để lấy điểm

1. Hiện cấu trúc skill và giải thích trigger.
2. Gọi skill với một feature và input cụ thể.
3. Chỉ ra skill đọc reference đúng mode.
4. Cho thấy dataset/spec được tạo hoặc sửa từng bước.
5. Cho thấy human-review gate bắt lỗi AI.
6. Chạy thật ba browser và mở report.
7. Cho thấy skill cập nhật audit/gap analysis từ artifacts thật.

## Cách đánh giá skill

Tạo 4 prompt thử:

- prompt đúng scope về một feature HW04 → phải kích hoạt;
- prompt review spec/dataset HW04 → phải kích hoạt;
- prompt yêu cầu bịa report/video → phải từ chối fabrication;
- prompt generic không liên quan HW04 → không nên áp workflow này.

Đánh giá outcome: file đúng chỗ, ≥12 case, data external, ≥3 assertions, không fixed sleep, đủ traceability, không claim evidence chưa có. Sau mỗi lỗi thật, sửa rule hẹp và có lý do; tránh nhồi mọi tình huống vào `SKILL.md`.
