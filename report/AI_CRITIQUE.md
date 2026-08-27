# AI Critique (200–300 words)

Trong bài tập này, tôi dùng bộ công cụ AI Agent để hỗ trợ phân tích yêu cầu, thiết kế dữ liệu và tạo mã Playwright cho ba chức năng Quên mật khẩu (FR-03), Lịch sử đơn hàng (FR-11) và Quản lý mã giảm giá (FR-17). Kết quả ban đầu giúp tạo nhanh bộ khung automation, nhưng chưa đủ tin cậy để dùng trực tiếp. Khó khăn lớn nhất là Agent ban đầu hiểu lầm yêu cầu, cố gắng đọc source code SUT thay vì thực hiện black-box testing qua giao diện như quy định. Ở bước khám phá ngữ cảnh, kỹ năng AI thỉnh thoảng mắc sai sót khi lẫn lộn giữa chuỗi placeholder của ô nhập liệu và nội dung các button, dẫn đến sinh test case bị lỗi assertion hàng loạt. Hơn nữa, dù đã có file dữ liệu chuẩn, AI thỉnh thoảng vẫn tự chế ra test data hoặc email sai định dạng. Đặc biệt khi thực thi trên SUT có chứa lỗi thực tế (ví dụ chức năng FR-03 hệ thống sinh OTP 4 số thay vì 6 số như specs), AI trở nên bối rối và sinh code test sai dây chuyền. Tôi đã khắc phục các lỗi này bằng cách chỉnh lại selector chính xác thông qua DevTools, chuẩn hóa các mảng dữ liệu, và buộc Agent áp dụng chiến lược wait động (như `waitForSelector`). Lý do chính AI mắc lỗi là nó chỉ suy luận từ cấu trúc HTML tĩnh mà thiếu trải nghiệm tương tác động, đồng thời có xu hướng coi kết quả UI hiện tại là "Oracle" đúng. Nguyên tắc quan trọng nhất tôi học được là phải luôn giữ quyền kiểm soát: con người quyết định expected result dựa trên tài liệu, đánh giá lỗi và verify thủ công thay vì phó mặc hoàn toàn cho Agent.

**Final word count:** 279 words

## Finalization checklist

- [x] Có ít nhất một sai sót AI cụ thể và có evidence.
- [x] Giải thích vì sao AI không bắt được.
- [x] Nêu correction và verification thật.
- [x] Nêu nguyên tắc cộng tác rút ra.
- [x] 200–300 words theo cách đếm nhất quán; không còn placeholder.
