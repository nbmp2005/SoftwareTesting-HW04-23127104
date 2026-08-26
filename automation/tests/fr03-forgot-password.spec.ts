import { test, expect, Page } from '@playwright/test';
import testData from '../data/fr03-testcases-draft.json';

// ──────────────────────────────────────────────
// Types — khớp với cấu trúc fr03-testcases-draft.json
// ──────────────────────────────────────────────
interface TestCase {
  id: string;
  type: 'positive' | 'negative' | 'edge';
  description: string;
  steps: string[];
  input: Record<string, string>;
  expected: {
    message?: string;
    errorMessage?: string;
    behavior?: string;
  };
  automate: boolean;
  selector_hints?: Record<string, string>;
  manual_reason?: string;
}

const typedData = testData as TestCase[];

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/**
 * Điều hướng đến Bước 1 và lấy OTP bằng email hợp lệ để sang Bước 2.
 * Trả về OTP text hiển thị trên màn hình (SUT hiển thị OTP dạng demo).
 */
async function goToStep2(page: Page, email: string): Promise<string> {
  await page.goto('/forgot-password');
  await page.getByPlaceholder('Nhập Email của bạn').fill(email);
  await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

  // Chờ chuyển sang Bước 2 — SUT hiển thị OTP trực tiếp trên màn hình (demo mode)
  // Assertion: URL vẫn ở /forgot-password HOẶC có element Bước 2 xuất hiện
  // TODO: Sau khi verify tay, thay locator chính xác cho OTP text display
  const otpDisplayLocator = page.locator('[data-testid="otp-display"], .otp-display, .otp-code').first();
  try {
    await otpDisplayLocator.waitFor({ timeout: 5000 });
    return (await otpDisplayLocator.textContent()) ?? '';
  } catch {
    // Nếu không có element riêng cho OTP display, trả về chuỗi rỗng
    // → Test case TC02/TC07/TC08/TC10/TC13 cần được verify tay để cập nhật selector
    return '';
  }
}

// ──────────────────────────────────────────────
// Test Suite
// ──────────────────────────────────────────────

test.describe('FR-03: Quên mật khẩu & Đặt lại mật khẩu | Run by: 23127104', () => {

  // ── Bước 1: Nhập email để lấy OTP ────────────

  test('TC01 - Nhập email hợp lệ ở Bước 1', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC01')!;

    await page.goto('/forgot-password');

    // R2: Visibility — Form Bước 1 đã load
    // Selector từ fr03-context.md mục 2: getByPlaceholder('Nhập Email của bạn')
    await expect(page.getByPlaceholder('Nhập Email của bạn')).toBeVisible();

    await page.getByPlaceholder('Nhập Email của bạn').fill(tc.input.email);
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // R2: Text/Content — success message từ context mục 5
    // ⚠️ Cần verify tay xem message chính xác là gì; hiện dùng containsText để linh hoạt hơn
    await expect(page.locator('body')).toContainText(tc.expected.message ?? 'OTP');

    // R2: Visibility — OTP field của Bước 2 phải xuất hiện sau khi submit email
    await expect(page.getByPlaceholder(/OTP/i)).toBeVisible();
  });

  test('TC02 - Nhập đúng OTP + mật khẩu mới hợp lệ', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC02')!;

    // Tiền điều kiện: sang Bước 2 bằng email hợp lệ
    const displayedOtp = await goToStep2(page, 'admin@test.com');
    // Dùng OTP từ màn hình demo nếu lấy được, ngược lại dùng OTP từ JSON (placeholder)
    const otpToUse = displayedOtp || tc.input.otp;

    await page.getByPlaceholder(/OTP/i).fill(otpToUse);
    await page.getByPlaceholder(/Mật khẩu mới/i).fill(tc.input.new_pass);
    await page.getByPlaceholder('Đặt lại mật khẩu').fill(tc.input.confirm_pass);
    await page.getByRole('button', { name: /Xác nhận|Lưu/i }).click();

    // R2: Text/Content — success message
    await expect(page.locator('body')).toContainText(tc.expected.message ?? 'thành công');

    // R2: URL/Navigation — chuyển về /login sau khi đặt lại pass thành công
    await expect(page).toHaveURL(/login/);
  });

  test('TC03 - Bấm Quay lại đăng nhập', async ({ page }) => {
    await page.goto('/forgot-password');

    // R2: Visibility — nút Quay lại tồn tại (selector từ fr03-context.md mục 2)
    const backBtn = page.getByRole('button', { name: /Quay lại/i });
    await expect(backBtn).toBeVisible();

    await backBtn.click();

    // R2: URL/Navigation — phải về /login
    await expect(page).toHaveURL(/login/);
  });

  // ── Bước 1: Negative ─────────────────────────

  test('TC05 - Email không được để trống', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC05')!;

    await page.goto('/forgot-password');

    // Để trống email (không fill gì)
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // R2: Visibility — error message phải hiện ra
    // ⚠️ Selector `.error` là gợi ý từ context — cần verify DOM thực tế
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // R2: Text/Content — nguyên văn từ fr03-context.md mục 4
    // ⚠️ Có thể là HTML5 native browser validation popup — xem checklist bên dưới
    await expect(page.locator('body')).toContainText(tc.expected.errorMessage ?? 'trống');
  });

  test('TC06 - Email sai định dạng', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC06')!;

    await page.goto('/forgot-password');
    await page.getByPlaceholder('Nhập Email của bạn').fill(tc.input.email); // 'abc'
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // R2: Visibility — error phải xuất hiện
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // R2: Text/Content — nguyên văn từ fr03-context.md mục 4
    await expect(page.locator('body')).toContainText(tc.expected.errorMessage ?? 'hợp lệ');
  });

  test('TC09 - Email không tồn tại (chưa đăng ký)', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC09')!;

    await page.goto('/forgot-password');
    await page.getByPlaceholder('Nhập Email của bạn').fill(tc.input.email); // 'notexist@test.com'
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // R2: Visibility — error phải hiện
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // ⚠️ expected.errorMessage = "[Cần verify tay]" — assertion text sẽ được update sau khi verify tay
    // Hiện tại chỉ kiểm tra sự tồn tại của error, không kiểm tra text chính xác
  });

  // ── Bước 2: Negative ─────────────────────────

  test('TC07 - OTP sai', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC07')!;

    // Tiền điều kiện: sang Bước 2
    await goToStep2(page, 'admin@test.com');

    await page.getByPlaceholder(/OTP/i).fill(tc.input.otp); // '000000'
    await page.getByPlaceholder(/Mật khẩu mới/i).fill(tc.input.new_pass);
    await page.getByPlaceholder(/Xác nhận/i).fill(tc.input.confirm_pass);
    await page.getByRole('button', { name: /Xác nhận|Lưu/i }).click();

    // R2: Visibility — error phải hiện
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // R2: Text/Content — nguyên văn từ fr03-context.md mục 4
    await expect(page.locator('body')).toContainText(tc.expected.errorMessage ?? 'OTP');
  });

  test('TC08 - Mật khẩu và xác nhận không khớp', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC08')!;

    // Tiền điều kiện: sang Bước 2
    await goToStep2(page, 'admin@test.com');

    await page.getByPlaceholder(/OTP/i).fill(tc.input.otp); // '123456'
    await page.getByPlaceholder(/Mật khẩu mới/i).fill(tc.input.new_pass);     // Abc@12345
    await page.getByPlaceholder('Đặt lại mật khẩu').fill(tc.input.confirm_pass);   // Def@54321
    await page.getByRole('button', { name: /Xác nhận|Lưu/i }).click();

    // R2: Visibility — error
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // R2: Text/Content — nguyên văn từ fr03-context.md mục 4
    await expect(page.locator('body')).toContainText(tc.expected.errorMessage ?? 'không khớp');
  });

  // ── Edge cases ────────────────────────────────

  test('TC10 - Mật khẩu mới quá yếu (vi phạm FR-01)', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC10')!;

    // Tiền điều kiện: sang Bước 2
    await goToStep2(page, 'admin@test.com');

    // Dùng OTP đúng (lấy từ màn hình) — placeholder: '123456'
    await page.getByPlaceholder(/OTP/i).fill(tc.input.otp);
    await page.getByPlaceholder(/Mật khẩu mới/i).fill(tc.input.new_pass); // '123'
    await page.getByPlaceholder('Đặt lại mật khẩu').fill(tc.input.confirm_pass);  // '123'
    await page.getByRole('button', { name: /Xác nhận|Lưu/i }).click();

    // R2: Visibility — error phải hiện (vi phạm rule mật khẩu)
    const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
    await expect(errorLocator).toBeVisible();

    // ⚠️ expected.errorMessage = "[Cần verify tay]" — cần xác nhận rule FR-01 rồi update text
  });

  test('TC13 - Nhập OTP không phải số', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC13')!;

    // Tiền điều kiện: sang Bước 2
    await goToStep2(page, 'admin@test.com');

    await page.getByPlaceholder(/OTP/i).fill(tc.input.otp); // 'abcdef'
    await page.getByRole('button', { name: /Xác nhận|Lưu/i }).click();

    // R2: Visibility — hoặc field bị block nhập (không có text 'abcdef'), hoặc hiện error
    // Kiểm tra: field không có value 'abcdef' NẾU SUT chặn input non-numeric
    const otpField = page.getByPlaceholder(/OTP/i);
    const fieldValue = await otpField.inputValue();

    if (fieldValue !== tc.input.otp) {
      // SUT chặn ký tự non-numeric → PASS
      expect(fieldValue).not.toBe('abcdef');
    } else {
      // SUT không chặn → phải có error khi submit
      const errorLocator = page.locator('.error, [class*="error"], [class*="Error"]').first();
      await expect(errorLocator).toBeVisible();
    }
  });

  // ── TC11, TC12: Manual (automate: false, bỏ qua) ──────────
  // TC11: Dùng OTP của email A cho email B — cần 2 browser contexts song song
  // TC12: OTP hết hạn — cần chờ thời gian thực (30+ phút)
});
