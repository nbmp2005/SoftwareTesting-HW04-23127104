# AI Critique (200–300 words)

> The paragraph below is a structured draft, not final evidence. Replace every bracket with an observation from your actual automation work, then count words and keep the final version between 200 and 300 words.

Trong bài tập này, tôi dùng [tên công cụ AI] để hỗ trợ phân tích yêu cầu, thiết kế dữ liệu và tạo mã Playwright cho ba chức năng [FR-A], [FR-B] và [FR-C]. Kết quả ban đầu hữu ích vì AI tạo nhanh cấu trúc test và gợi ý nhiều trường hợp âm, nhưng chưa đủ tin cậy để dùng trực tiếp. Sai sót rõ nhất là [mô tả một lỗi thật], khiến test [rủi ro hoặc biểu hiện]. AI cũng dùng [selector/wait/assertion sai hoặc yếu] và bỏ sót [edge case thật]. Tôi sửa bằng cách [thay đổi cụ thể], sau đó kiểm chứng trên [ba browser/report hoặc case cụ thể]. AI không phát hiện vấn đề này vì prompt ban đầu thiếu [business rule/DOM/runtime data], trong khi mô hình chỉ suy luận từ ngữ cảnh được cung cấp và không tự biết trạng thái thật của EShop. Ngoài ra, giao diện [động/khác browser/phụ thuộc seed data] làm giả định của AI không còn đúng khi chạy thực tế. Tôi nhận ra AI có xu hướng ưu tiên đoạn mã trông hoàn chỉnh hơn là chứng minh oracle nghiệp vụ; vì vậy một test có thể chạy ổn nhưng assertion vẫn quá yếu. Nguyên tắc quan trọng nhất tôi học được là cộng tác với AI theo vòng lặp nhỏ: cung cấp requirement và một nhóm case, yêu cầu giải thích lựa chọn, chạy thật, phân loại failure, rồi phản hồi bằng evidence trước khi mở rộng. Con người phải quyết định expected result, đánh giá defect và chịu trách nhiệm cuối cùng. AI phù hợp với vai trò trợ lý tạo phương án và reviewer bổ sung, nhưng không thể thay thế việc kiểm tra requirement, quan sát report và xác nhận bằng chứng thực thi.

**Final word count:** [TODO: 200–300]

## Finalization checklist

- [ ] Có ít nhất một sai sót AI cụ thể và có evidence.
- [ ] Giải thích vì sao AI không bắt được.
- [ ] Nêu correction và verification thật.
- [ ] Nêu nguyên tắc cộng tác rút ra.
- [ ] 200–300 words theo cách đếm nhất quán; không còn placeholder.

- Phần agent ban đầu hiểu sai đọc src code thay vì là blackbox testing
- Dù đã cho sẵn data nhưng test script vẫn tự chế, sai data email
- Vì web sai nhiều (mô tả nghiệp vụ trong readme và tự học trên màn hình) nên test script khá confuse, dẫn đến test script viết sai nhiều nơi
- Có nhiều chỗ box cần verify lại