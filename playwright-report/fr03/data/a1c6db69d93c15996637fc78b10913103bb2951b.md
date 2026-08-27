# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr03-forgot-password.spec.ts >> FR-03: Quên mật khẩu & Đặt lại mật khẩu | Run by: 23127104 >> TC04 - OTP được sinh đúng 6 chữ số
- Location: automation\tests\fr03-forgot-password.spec.ts:128:7

# Error details

```
Error: expect(received).toHaveLength(expected)

Expected length: 6
Received length: 4
Received string: "1651"
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - banner [ref=e4]:
    - link "EShop" [ref=e5]:
      - /url: /
    - navigation [ref=e6]:
      - link "Giỏ hàng" [ref=e7]:
        - /url: /cart
      - link "Đăng nhập" [ref=e8]:
        - /url: /login
      - link "Đăng ký" [ref=e9]:
        - /url: /register
  - main [ref=e10]:
    - generic [ref=e11]:
      - heading "Quên Mật Khẩu" [level=2] [ref=e12]
      - generic [ref=e13]:
        - generic [ref=e14]: "Mã OTP của bạn là: 1651"
        - generic [ref=e15]:
          - generic [ref=e16]: Mã OTP (4 số)
          - textbox [ref=e17]
        - generic [ref=e18]:
          - generic [ref=e19]: Mật khẩu mới
          - textbox [ref=e20]
        - button "Đặt lại mật khẩu" [ref=e21] [cursor=pointer]
        - button "← Quay lại" [ref=e22] [cursor=pointer]
  - contentinfo [ref=e23]: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  34  | /**
  35  |  * Điều hướng đến Bước 1 và lấy OTP bằng email hợp lệ để sang Bước 2.
  36  |  * Trả về OTP text hiển thị trên màn hình (SUT hiển thị OTP dạng demo).
  37  |  */
  38  | async function goToStep2(page: Page, email: string): Promise<string> {
  39  |   await page.goto('/forgot-password');
  40  |   await page.locator('input[type="text"]').fill(email);
  41  |   await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  42  | 
  43  |   const otpMessage = page.getByText(/^Mã OTP của bạn là:\s*\d+$/);
  44  |   await expect(otpMessage).toBeVisible();
  45  | 
  46  |   const messageText = (await otpMessage.textContent()) ?? '';
  47  |   const generatedOtp = messageText.match(/\d+$/)?.[0];
  48  |   if (!generatedOtp) {
  49  |     throw new Error(`Không đọc được OTP từ thông báo: "${messageText}"`);
  50  |   }
  51  | 
  52  |   return generatedOtp;
  53  | }
  54  | 
  55  | function getOtpInput(page: Page) {
  56  |   return page
  57  |     .getByText(/^Mã OTP \(\d+ số\)$/)
  58  |     .locator('..')
  59  |     .locator('input');
  60  | }
  61  | 
  62  | function getNewPasswordInput(page: Page) {
  63  |   return page
  64  |     .getByText(/^Mật khẩu mới$/)
  65  |     .locator('..')
  66  |     .locator('input');
  67  | }
  68  | 
  69  | function getResetPasswordButton(page: Page) {
  70  |   return page.getByRole('button', {
  71  |     name: 'Đặt lại mật khẩu',
  72  |     exact: true,
  73  |   });
  74  | }
  75  | 
  76  | function makeDifferentOtp(generatedOtp: string): string {
  77  |   const lastDigit = Number(generatedOtp.charAt(generatedOtp.length - 1));
  78  |   const differentLastDigit = (lastDigit + 1) % 10;
  79  |   return `${generatedOtp.slice(0, -1)}${differentLastDigit}`;
  80  | }
  81  | 
  82  | async function expectRejectedAtStep1(page: Page, email: string) {
  83  |   await expect(page).toHaveURL(/\/forgot-password/);
  84  |   await expect(
  85  |     page.getByRole('button', { name: 'Lấy mã OTP' }),
  86  |   ).toBeVisible();
  87  |   await expect(page.locator('input[type="text"]')).toHaveValue(email);
  88  |   await expect(page.getByText(/^Mã OTP của bạn là:/)).toHaveCount(0);
  89  | }
  90  | 
  91  | async function expectRejectedAtStep2(
  92  |   page: Page,
  93  |   otp: string,
  94  |   password: string,
  95  | ) {
  96  |   await expect(page).toHaveURL(/\/forgot-password/);
  97  |   await expect(page.getByText(/^Mã OTP của bạn là:/)).toBeVisible();
  98  |   await expect(getOtpInput(page)).toHaveValue(otp);
  99  |   await expect(getNewPasswordInput(page)).toHaveValue(password);
  100 |   await expect(getResetPasswordButton(page)).toBeVisible();
  101 |   await expect(page.getByText(/thành công/i)).toHaveCount(0);
  102 | }
  103 | 
  104 | // ──────────────────────────────────────────────
  105 | // Test Suite
  106 | // ──────────────────────────────────────────────
  107 | 
  108 | test.describe('FR-03: Quên mật khẩu & Đặt lại mật khẩu | Run by: 23127104', () => {
  109 | 
  110 |   // ── Bước 1: Nhập email để lấy OTP ────────────
  111 | 
  112 |   test('TC01 - Nhập email hợp lệ ở Bước 1', async ({ page }) => {
  113 |     const tc = typedData.find(t => t.id === 'TC01')!;
  114 | 
  115 |     await page.goto('/forgot-password');
  116 | 
  117 |     // R2: Visibility — Form Bước 1 đã load
  118 |     const emailInput = page.locator('input[type="text"]');
  119 |     await expect(emailInput).toBeVisible();
  120 | 
  121 |     await emailInput.fill(tc.input.email ?? '');
  122 |     await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  123 | 
  124 |     // R2: Sau khi submit email hợp lệ, giao diện chuyển sang Bước 2.
  125 |     await expect(page.getByText(/Mã OTP của bạn là:/i)).toBeVisible();
  126 |   });
  127 | 
  128 |   test('TC04 - OTP được sinh đúng 6 chữ số', async ({ page }) => {
  129 |     const tc = typedData.find(t => t.id === 'TC04')!;
  130 |     const generatedOtp = await goToStep2(page, validEmail);
  131 |     const expectedLength = Number(tc.input.expected_otp_length);
  132 | 
  133 |     expect(generatedOtp).toMatch(/^\d+$/);
> 134 |     expect(generatedOtp).toHaveLength(expectedLength);
      |                          ^ Error: expect(received).toHaveLength(expected)
  135 |   });
  136 | 
  137 |   test('TC02 - Nhập đúng OTP + mật khẩu mới hợp lệ', async ({ page }) => {
  138 |     const tc = typedData.find(t => t.id === 'TC02')!;
  139 |     const newPassword = tc.input.new_pass ?? '';
  140 | 
  141 |     // Tiền điều kiện: sang Bước 2 bằng email hợp lệ
  142 |     const displayedOtp = await goToStep2(page, validEmail);
  143 | 
  144 |     await getOtpInput(page).fill(displayedOtp);
  145 |     await getNewPasswordInput(page).fill(newPassword);
  146 |     await getResetPasswordButton(page).click();
  147 | 
  148 |     // R2: Text/Content — success message
  149 |     await expect(page.locator('body')).toContainText(tc.expected.message ?? 'thành công');
  150 | 
  151 |     // R2: URL/Navigation — chuyển về /login sau khi đặt lại pass thành công
  152 |     await expect(page).toHaveURL(/login/);
  153 | 
  154 |     const loginDialogPromise = page.waitForEvent('dialog', { timeout: 3000 })
  155 |       .then(async dialog => {
  156 |         const message = dialog.message();
  157 |         await dialog.dismiss();
  158 |         return message;
  159 |       })
  160 |       .catch(() => undefined);
  161 | 
  162 |     const loginInputs = page.locator('form input');
  163 |     await expect(loginInputs).toHaveCount(2);
  164 |     await loginInputs.nth(0).fill(validEmail);
  165 |     await loginInputs.nth(1).fill(newPassword);
  166 |     await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  167 | 
  168 |     const loginDialogMessage = await loginDialogPromise;
  169 |     expect(loginDialogMessage, `Unexpected login dialog after password reset: ${loginDialogMessage}`).toBeUndefined();
  170 |     expect(loginDialogMessage ?? '').not.toMatch(/máº­t kháº©u khÃ´ng há»£p lá»‡|invalid password|Ä‘Äƒng nháº­p tháº¥t báº¡i/i);
  171 |     await expect(page).not.toHaveURL(/\/login(?:$|[?#])/);
  172 |   });
  173 | 
  174 |   test('TC03 - Bấm Quay lại đăng nhập', async ({ page }) => {
  175 |     await page.goto('/forgot-password');
  176 | 
  177 |     // R2: Visibility — nút Quay lại tồn tại (selector từ fr03-context.md mục 2)
  178 |     // SUT không có nút "Quay lại đăng nhập", click link "Đăng nhập" ở Header
  179 |     const loginLink = page.getByRole('link', { name: 'Đăng nhập' });
  180 |     await expect(loginLink).toBeVisible();
  181 | 
  182 |     await loginLink.click();
  183 | 
  184 |     // R2: URL/Navigation — phải về /login
  185 |     await expect(page).toHaveURL(/login/);
  186 |   });
  187 | 
  188 |   // ── Bước 1: Negative ─────────────────────────
  189 | 
  190 |   test('TC05 - Email không được để trống', async ({ page }) => {
  191 |     const tc = typedData.find(t => t.id === 'TC05')!;
  192 | 
  193 |     await page.goto('/forgot-password');
  194 | 
  195 |     // Để trống email (không fill gì)
  196 |     await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  197 | 
  198 |     // R2: Visibility — error message phải hiện ra
  199 |     // SUT dùng HTML5 native required validation, không có DOM element
  200 |     const emailInput = page.locator('input[type="text"]');
  201 |     const isInvalid = await emailInput.evaluate((el: HTMLInputElement) => !el.validity.valid);
  202 |     expect(isInvalid).toBeTruthy();
  203 |   });
  204 | 
  205 |   test('TC06 - Email sai định dạng', async ({ page }) => {
  206 |     const tc = typedData.find(t => t.id === 'TC06')!;
  207 | 
  208 |     await page.goto('/forgot-password');
  209 |     await page.locator('input[type="text"]').fill(tc.input.email ?? ''); // 'abc'
  210 |     await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  211 | 
  212 |     // Dữ liệu bị từ chối: vẫn ở Bước 1 và không sinh OTP.
  213 |     await expectRejectedAtStep1(page, tc.input.email ?? '');
  214 |   });
  215 | 
  216 |   test('TC09 - Email không tồn tại (chưa đăng ký)', async ({ page }) => {
  217 |     const tc = typedData.find(t => t.id === 'TC09')!;
  218 | 
  219 |     await page.goto('/forgot-password');
  220 |     await page.locator('input[type="text"]').fill(tc.input.email ?? ''); // 'notexist@test.com'
  221 |     await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
  222 | 
  223 |     // Email chưa đăng ký bị từ chối: vẫn ở Bước 1 và không sinh OTP.
  224 |     await expectRejectedAtStep1(page, tc.input.email ?? '');
  225 |   });
  226 | 
  227 |   // ── Bước 2: Negative ─────────────────────────
  228 | 
  229 |   test('TC07 - OTP sai', async ({ page }) => {
  230 |     const tc = typedData.find(t => t.id === 'TC07')!;
  231 | 
  232 |     // Tiền điều kiện: sang Bước 2
  233 |     const displayedOtp = await goToStep2(page, validEmail);
  234 |     const wrongOtp = makeDifferentOtp(displayedOtp);
```