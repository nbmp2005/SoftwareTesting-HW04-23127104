# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr03-forgot-password.spec.ts >> FR-03: Quên mật khẩu & Đặt lại mật khẩu | Run by: 23127104 >> TC02 - Nhập đúng OTP + mật khẩu mới hợp lệ
- Location: automation\tests\fr03-forgot-password.spec.ts:137:7

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('body')
Timeout: 10000ms
- Expected substring  - 1
+ Received string     + 6

- Cập nhật mật khẩu thành công
+
+     EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuMã OTP của bạn là: 1331Mã OTP (4 số)Mật khẩu mớiĐặt lại mật khẩu← Quay lại© 2026 EShop SUT. Dành cho mục đích kiểm thử.
+     
+   
+
+

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('body')
    23 × locator resolved to <body>…</body>
       - unexpected value "
    EShopGiỏ hàngĐăng nhậpĐăng kýQuên Mật KhẩuMã OTP của bạn là: 1331Mã OTP (4 số)Mật khẩu mớiĐặt lại mật khẩu← Quay lại© 2026 EShop SUT. Dành cho mục đích kiểm thử.
    
  

"

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Đăng nhập":
      - /url: /login
    - link "Đăng ký":
      - /url: /register
- main:
  - heading "Quên Mật Khẩu" [level=2]
  - text: "Mã OTP của bạn là: 1331 Mã OTP (4 số)"
  - textbox: "1331"
  - text: Mật khẩu mới
  - textbox: Abc@12345
  - button "Đặt lại mật khẩu"
  - button "← Quay lại"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
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
  134 |     expect(generatedOtp).toHaveLength(expectedLength);
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
> 149 |     await expect(page.locator('body')).toContainText(tc.expected.message ?? 'thành công');
      |                                        ^ Error: expect(locator).toContainText(expected) failed
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
  235 |     const password = tc.input.new_pass ?? '';
  236 | 
  237 |     await getOtpInput(page).fill(wrongOtp);
  238 |     await getNewPasswordInput(page).fill(password);
  239 |     await getResetPasswordButton(page).click();
  240 | 
  241 |     // OTP sai bị từ chối nhưng không phụ thuộc vào lỗi độ dài OTP 4/6 số.
  242 |     await expectRejectedAtStep2(page, wrongOtp, password);
  243 |   });
  244 | 
  245 |   test('TC08 - Mật khẩu và xác nhận không khớp', async () => {
  246 |     const tc = typedData.find(t => t.id === 'TC08')!;
  247 |     test.skip(
  248 |       tc.automate === false,
  249 |       tc.manual_reason ?? 'UI không có trường xác nhận mật khẩu',
```