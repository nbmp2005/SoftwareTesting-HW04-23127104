# Kiến thức nền tảng cho HW04

## 1. Automation testing thực sự là gì?

Automation không chỉ là “dùng tool click thay người”. Một automated test tốt gồm: trạng thái đầu vào có kiểm soát, hành động có thể lặp lại, oracle rõ ràng, assertion có ý nghĩa, cleanup phù hợp và evidence chẩn đoán được khi fail. Script chạy được nhưng không phát hiện sai lệch nghiệp vụ chỉ là automation thao tác, chưa phải kiểm thử mạnh.

Nên phân biệt bốn loại kết quả:

- **Pass:** hành vi quan sát khớp oracle.
- **Product failure:** SUT không khớp yêu cầu, tái hiện được.
- **Test failure:** selector, dữ liệu, setup hoặc assertion sai.
- **Environment/inconclusive:** service, network, seed data hoặc browser hỏng; chưa đủ bằng chứng kết luận product bug.

## 2. Test pyramid và phạm vi E2E

Playwright trong bài chủ yếu kiểm thử web end-to-end qua UI. E2E cho độ tin cậy cao về luồng người dùng nhưng chậm, dễ phụ thuộc dữ liệu và môi trường hơn unit/API tests. Vì vậy chỉ tự động hóa các luồng có oracle rõ; dùng setup qua API/fixture nếu được phép, nhưng hành vi chính của feature vẫn cần chứng minh qua UI.

## 3. Thiết kế test case trước khi code

Mỗi feature tối thiểu 12 case, nhưng số lượng không thay thế chất lượng. Chọn kỹ thuật phù hợp:

- **Equivalence Partitioning:** chia đầu vào thành lớp hợp lệ/không hợp lệ, lấy đại diện.
- **Boundary Value Analysis:** kiểm tra sát min/max, rỗng, một ký tự, vượt giới hạn.
- **Decision Table:** phù hợp coupon, checkout, quyền truy cập có nhiều điều kiện.
- **State Transition:** phù hợp lockout, order status, reset password.
- **Use-case/path testing:** kiểm tra happy path và nhánh lỗi quan trọng.
- **Error guessing:** bổ sung double-click, refresh, back, Unicode tiếng Việt, dữ liệu trùng, race condition.

Mỗi case cần ID, mục tiêu, precondition, dữ liệu, steps, expected result, priority, cleanup và trạng thái automation. Oracle phải đến từ requirement, hành vi được giảng viên xác nhận, hoặc giả định được ghi rõ—không lấy “code hiện tại đang làm vậy” làm oracle mặc định.

## 4. Data-driven testing

Data-driven nghĩa là cấu trúc test tái sử dụng logic, còn input/expected output nằm trong file `.json` hoặc `.csv` riêng. Bài không chấp nhận array/object hardcode ngay trong spec.

Ví dụ schema JSON:

```json
[
  {
    "id": "FRXX-001",
    "description": "[mục tiêu case]",
    "input": {},
    "expected": {},
    "tags": ["positive"]
  }
]
```

Dữ liệu không nên chứa password thật. Secrets đi qua `.env` đã ignore. Case ID phải xuất hiện trong dataset, tên test và report để traceability không bị đứt.

## 5. Locator bền vững

Thứ tự ưu tiên thường dùng: `getByRole` → `getByLabel` → `getByPlaceholder`/`getByText` → `getByTestId` → CSS có ý nghĩa. Tránh XPath dài, `nth()` không có semantics, class CSS sinh động, và DOM chain. Locator tốt mô tả cách người dùng hoặc accessibility tree nhận biết element.

Ví dụ:

```ts
await page.getByRole('button', { name: 'Đăng nhập' }).click();
await page.getByLabel('Email').fill(email);
```

## 6. Đồng bộ và chống flaky

Playwright tự chờ actionability và web-first assertions tự retry. Không dùng `waitForTimeout(2000)` để “chữa” race. Hãy chờ trạng thái có ý nghĩa: URL đổi, response hoàn tất, spinner biến mất, toast xuất hiện, button enabled, row xuất hiện.

Flaky test thường đến từ shared state, dữ liệu trùng, selector mơ hồ, animation, network không kiểm soát, timezone, hoặc test phụ thuộc thứ tự. Retry chỉ giúp thu thập bằng chứng; không phải cách sửa gốc.

## 7. Assertion patterns

Bài yêu cầu ít nhất ba pattern khác nhau. Có thể dùng:

1. **Hiển thị/nội dung:** `toBeVisible()`, `toContainText()`.
2. **Điều hướng:** `toHaveURL()`.
3. **Giá trị/trạng thái:** `toHaveValue()`, `toBeDisabled()`, `toBeChecked()`.
4. **Số lượng:** `toHaveCount()`.
5. **Persistence/invariant:** reload hoặc vào lại trang rồi xác nhận dữ liệu vẫn đúng.

Assertion phải cụ thể. `expect(page).toBeTruthy()` hoặc chỉ kiểm tra HTTP 200 thường quá yếu cho nghiệp vụ UI.

## 8. Test isolation, fixtures và Page Object

Mỗi test phải tự tạo hoặc nhận precondition đáng tin cậy, không dựa vào test trước. Fixture phù hợp để khởi tạo account/context. Page Object hữu ích khi nhiều test lặp cùng thao tác/locator, nhưng không nên che assertions nghiệp vụ quá sâu. Tách “cách thao tác” khỏi “điều cần chứng minh”.

## 9. Multi-browser

Chromium, Firefox và WebKit khác engine; suite phải chạy feature trên cả ba. Một cấu hình có ba `projects` thường tạo một lần chạy tổng hợp, nhưng bài diễn đạt “ít nhất 9 browser runs”: phải báo cáo rõ ba feature × ba browser và để report hiển thị project/browser. Không chỉ mở ba browser bằng tay.

## 10. Report và traceability

HTML report phải được sinh từ chạy thật và nhìn thấy `Run by: 23127104` cùng ISO timestamp. Timestamp ISO ví dụ `2026-08-18T21:59:41+07:00`. Cần liên kết:

`Requirement → Test case ID → Dataset row → Spec/test title → Browser result → Screenshot/trace → Bug issue`

Không sửa tay report sau chạy để giả evidence. Nên đưa student ID/timestamp vào metadata/annotation hoặc reporter customization trước khi chạy.

## 11. Bug triage

Một assertion fail chưa đủ là bug. Hãy chạy lại case riêng, kiểm tra precondition, đối chiếu requirement, thử browser khác, xem screenshot/trace/network, rồi phân loại. Bug report tốt có exact steps, expected/actual, environment, commit SHA, severity, reproducibility và ảnh thật.

## 12. AI-first và human-in-the-loop

AI nên được điều khiển theo từng pha: phân tích requirement, thiết kế case, review dataset, sinh thin slice, review selectors/assertions, mở rộng edge cases, phân tích failure. Con người phải kiểm tra oracle, chạy thật và quyết định bug. Audit cần lưu prompt và output, kể cả output bị bác bỏ nếu nó ảnh hưởng quá trình.

Bloom-AI trong bài thể hiện như sau:

- **G9.2 Apply:** dùng AI/Playwright đúng kỹ thuật để hiện thực hóa test.
- **G9.3 Analyse:** tìm lỗi, gap, flaky risk và nguyên nhân AI sai.
- **G9.4 Collaborate:** chia vòng lặp thành prompt → output → review → correction → verification.

## 13. Những lỗi dễ mất điểm

- 12 case tổng cộng thay vì 12 case cho mỗi feature.
- Dữ liệu vẫn nằm trong spec.
- Có ba browser config nhưng không có evidence đã chạy đủ.
- Report thiếu student ID hoặc ISO timestamp.
- Chỉ assertion toast chung chung, không chứng minh dữ liệu/state.
- Gọi mọi failure là bug.
- AI Audit chỉ ghi tên tool mà thiếu prompt/output/date-time.
- Critique dưới 200 hoặc trên 300 từ.
- Video dưới 5 phút, thiếu tiếng Việt, thiếu `whoami`/`hostname` hoặc face-cam.
- Có 8 commit nhưng commit không thay đổi file test script.
- PDF/Markdown, public URL hoặc file bắt buộc bị thiếu.
