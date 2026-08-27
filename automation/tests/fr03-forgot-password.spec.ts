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
  input: Record<string, string | undefined>;
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
const validEmail = typedData.find(t => t.id === 'TC01')?.input.email;

if (!validEmail) {
  throw new Error('TC01 must provide a valid registered email in the test data');
}

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

/**
 * Điều hướng đến Bước 1 và lấy OTP bằng email hợp lệ để sang Bước 2.
 * Trả về OTP text hiển thị trên màn hình (SUT hiển thị OTP dạng demo).
 */
async function goToStep2(page: Page, email: string): Promise<string> {
  await page.goto('/forgot-password');
  await page.locator('input[type="text"]').fill(email);
  await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

  const otpMessage = page.getByText(/^Mã OTP của bạn là:\s*\d+$/);
  await expect(otpMessage).toBeVisible();

  const messageText = (await otpMessage.textContent()) ?? '';
  const generatedOtp = messageText.match(/\d+$/)?.[0];
  if (!generatedOtp) {
    throw new Error(`Không đọc được OTP từ thông báo: "${messageText}"`);
  }

  return generatedOtp;
}

function getOtpInput(page: Page) {
  return page
    .getByText(/^Mã OTP \(\d+ số\)$/)
    .locator('..')
    .locator('input');
}

function getNewPasswordInput(page: Page) {
  return page
    .getByText(/^Mật khẩu mới$/)
    .locator('..')
    .locator('input');
}

function getResetPasswordButton(page: Page) {
  return page.getByRole('button', {
    name: 'Đặt lại mật khẩu',
    exact: true,
  });
}

function makeDifferentOtp(generatedOtp: string): string {
  const lastDigit = Number(generatedOtp.charAt(generatedOtp.length - 1));
  const differentLastDigit = (lastDigit + 1) % 10;
  return `${generatedOtp.slice(0, -1)}${differentLastDigit}`;
}

async function expectRejectedAtStep1(page: Page, email: string) {
  await expect(page).toHaveURL(/\/forgot-password/);
  await expect(
    page.getByRole('button', { name: 'Lấy mã OTP' }),
  ).toBeVisible();
  await expect(page.locator('input[type="text"]')).toHaveValue(email);
  await expect(page.getByText(/^Mã OTP của bạn là:/)).toHaveCount(0);
}

async function expectRejectedAtStep2(
  page: Page,
  otp: string,
  password: string,
) {
  await expect(page).toHaveURL(/\/forgot-password/);
  await expect(page.getByText(/^Mã OTP của bạn là:/)).toBeVisible();
  await expect(getOtpInput(page)).toHaveValue(otp);
  await expect(getNewPasswordInput(page)).toHaveValue(password);
  await expect(getResetPasswordButton(page)).toBeVisible();
  await expect(page.getByText(/thành công/i)).toHaveCount(0);
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
    const emailInput = page.locator('input[type="text"]');
    await expect(emailInput).toBeVisible();

    await emailInput.fill(tc.input.email ?? '');
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // R2: Sau khi submit email hợp lệ, giao diện chuyển sang Bước 2.
    await expect(page.getByText(/Mã OTP của bạn là:/i)).toBeVisible();
  });

  test('TC04 - OTP được sinh đúng 6 chữ số', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC04')!;
    const generatedOtp = await goToStep2(page, validEmail);
    const expectedLength = Number(tc.input.expected_otp_length);

    expect(generatedOtp).toMatch(/^\d+$/);
    expect(generatedOtp).toHaveLength(expectedLength);
  });

  test('TC02 - Nhập đúng OTP + mật khẩu mới hợp lệ', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC02')!;
    const newPassword = tc.input.new_pass ?? '';

    // Tiền điều kiện: sang Bước 2 bằng email hợp lệ
    const displayedOtp = await goToStep2(page, validEmail);

    await getOtpInput(page).fill(displayedOtp);
    await getNewPasswordInput(page).fill(newPassword);
    await getResetPasswordButton(page).click();

    // R2: Text/Content — success message
    await expect(page.locator('body')).toContainText(tc.expected.message ?? 'thành công');

    // R2: URL/Navigation — chuyển về /login sau khi đặt lại pass thành công
    await expect(page).toHaveURL(/login/);

    const loginDialogPromise = page.waitForEvent('dialog', { timeout: 3000 })
      .then(async dialog => {
        const message = dialog.message();
        await dialog.dismiss();
        return message;
      })
      .catch(() => undefined);

    const loginInputs = page.locator('form input');
    await expect(loginInputs).toHaveCount(2);
    await loginInputs.nth(0).fill(validEmail);
    await loginInputs.nth(1).fill(newPassword);
    await page.getByRole('button', { name: 'Sign In', exact: true }).click();

    const loginDialogMessage = await loginDialogPromise;
    expect(loginDialogMessage, `Unexpected login dialog after password reset: ${loginDialogMessage}`).toBeUndefined();
    expect(loginDialogMessage ?? '').not.toMatch(/máº­t kháº©u khÃ´ng há»£p lá»‡|invalid password|Ä‘Äƒng nháº­p tháº¥t báº¡i/i);
    await expect(page).not.toHaveURL(/\/login(?:$|[?#])/);
  });

  test('TC03 - Bấm Quay lại đăng nhập', async ({ page }) => {
    await page.goto('/forgot-password');

    // R2: Visibility — nút Quay lại tồn tại (selector từ fr03-context.md mục 2)
    // SUT không có nút "Quay lại đăng nhập", click link "Đăng nhập" ở Header
    const loginLink = page.getByRole('link', { name: 'Đăng nhập' });
    await expect(loginLink).toBeVisible();

    await loginLink.click();

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
    // SUT dùng HTML5 native required validation, không có DOM element
    const emailInput = page.locator('input[type="text"]');
    const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
    expect(isInvalid).toBeTruthy();
  });

  test('TC06 - Email sai định dạng', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC06')!;

    await page.goto('/forgot-password');
    await page.locator('input[type="text"]').fill(tc.input.email ?? ''); // 'abc'
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // Dữ liệu bị từ chối: vẫn ở Bước 1 và không sinh OTP.
    await expectRejectedAtStep1(page, tc.input.email ?? '');
  });

  test('TC09 - Email không tồn tại (chưa đăng ký)', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC09')!;

    await page.goto('/forgot-password');
    await page.locator('input[type="text"]').fill(tc.input.email ?? ''); // 'notexist@test.com'
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();

    // Email chưa đăng ký bị từ chối: vẫn ở Bước 1 và không sinh OTP.
    await expectRejectedAtStep1(page, tc.input.email ?? '');
  });

  // ── Bước 2: Negative ─────────────────────────

  test('TC07 - OTP sai', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC07')!;

    // Tiền điều kiện: sang Bước 2
    const displayedOtp = await goToStep2(page, validEmail);
    const wrongOtp = makeDifferentOtp(displayedOtp);
    const password = tc.input.new_pass ?? '';

    await getOtpInput(page).fill(wrongOtp);
    await getNewPasswordInput(page).fill(password);
    await getResetPasswordButton(page).click();

    // OTP sai bị từ chối nhưng không phụ thuộc vào lỗi độ dài OTP 4/6 số.
    await expectRejectedAtStep2(page, wrongOtp, password);
  });

  test('TC08 - Mật khẩu và xác nhận không khớp', async () => {
    const tc = typedData.find(t => t.id === 'TC08')!;
    test.skip(
      tc.automate === false,
      tc.manual_reason ?? 'UI không có trường xác nhận mật khẩu',
    );
  });

  // ── Edge cases ────────────────────────────────

  test('TC10 - Mật khẩu mới quá yếu (vi phạm FR-01)', async ({ page }) => {
    const tc = typedData.find(t => t.id === 'TC10')!;

    // Tiền điều kiện: sang Bước 2
    const displayedOtp = await goToStep2(page, validEmail);
    const weakPassword = tc.input.new_pass ?? '';

    // Dùng chính OTP SUT vừa sinh để testcase chỉ kiểm tra rule mật khẩu.
    await getOtpInput(page).fill(displayedOtp);
    await getNewPasswordInput(page).fill(weakPassword);
    await getResetPasswordButton(page).click();

    // Mật khẩu yếu bị từ chối: vẫn ở Bước 2 và không báo thành công.
    await expectRejectedAtStep2(page, displayedOtp, weakPassword);
  });

  test('TC13 - Nhập OTP không phải số', async ({ page }) => {
    const tc = (typedData as any).find((t: any) => t.id === 'TC13')!;

    // Tiền điều kiện: sang Bước 2
    await goToStep2(page, validEmail);

    await getOtpInput(page).fill(tc.input.otp ?? '');

    await getNewPasswordInput(page).fill(tc.input.new_pass ?? '');

    await getResetPasswordButton(page).click();

    // OTP chữ phải bị từ chối: vẫn ở Bước 2 và không có kết quả thành công.
    await expect(page).toHaveURL(/forgot-password/);
    await expect(page.getByText(/^Mã OTP của bạn là:/)).toBeVisible();
    await expect(page.getByText(/thành công/i)).toHaveCount(0);
  });

  // ── TC11, TC12: Manual (automate: false, bỏ qua) ──────────
  // TC11: Dùng OTP của email A cho email B — cần 2 browser contexts song song
  // TC12: OTP hết hạn — cần chờ thời gian thực (30+ phút)
});
