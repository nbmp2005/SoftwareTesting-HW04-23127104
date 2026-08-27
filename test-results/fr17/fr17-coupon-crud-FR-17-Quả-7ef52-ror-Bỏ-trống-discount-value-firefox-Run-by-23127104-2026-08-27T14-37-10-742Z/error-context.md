# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr17-coupon-crud.spec.ts >> FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104 >> TC06 - [RULE-04/Error] Bỏ trống discount_value
- Location: automation\tests\fr17-coupon-crud.spec.ts:117:9

# Error details

```
Error: TC06.input.discount_value must be a number
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]:
    - heading "EShop Admin" [level=1] [ref=e5]
    - list [ref=e6]:
      - listitem [ref=e7] [cursor=pointer]: Dashboard
      - listitem [ref=e8] [cursor=pointer]: Danh mục
      - listitem [ref=e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=e12] [cursor=pointer]: Người dùng
      - listitem [ref=e13] [cursor=pointer]: Đăng xuất
  - generic [ref=e15]:
    - heading "Quản lý Mã Giảm Giá" [level=2] [ref=e16]
    - generic [ref=e17]:
      - heading "Tạo mã giảm giá mới" [level=3] [ref=e18]
      - generic [ref=e19]:
        - 'textbox "Mã coupon (VD: SAVE10)" [active] [ref=e20]': FR17NODISC
        - combobox [ref=e21]:
          - option "Phần trăm (%)" [selected]
          - option "Số tiền cố định (₫)"
        - 'spinbutton "Giá trị % (VD: 10)" [ref=e22]'
        - spinbutton "Đơn tối thiểu (₫)" [ref=e23]: "0"
        - textbox [ref=e24]:
          - /placeholder: Ngày hết hạn
        - spinbutton "Số lần dùng tối đa/người" [ref=e25]: "1"
      - button "Tạo mã" [ref=e26] [cursor=pointer]
    - table [ref=e27]:
      - rowgroup [ref=e28]:
        - row [ref=e29]:
          - columnheader "Mã" [ref=e30]
          - columnheader "Loại" [ref=e31]
          - columnheader "Giá trị" [ref=e32]
          - columnheader "Đơn tối thiểu" [ref=e33]
          - columnheader "Hết hạn" [ref=e34]
          - columnheader "Giới hạn/người" [ref=e35]
          - columnheader "Hành động" [ref=e36]
      - rowgroup [ref=e37]:
        - row [ref=e38]:
          - cell "SAVE10" [ref=e39]
          - cell "Phần trăm" [ref=e40]
          - cell "10%" [ref=e41]
          - cell "300,000 ₫" [ref=e42]
          - cell "2099-12-31" [ref=e43]
          - cell "1 lần" [ref=e44]
          - cell [ref=e45]:
            - button "Xóa" [ref=e46] [cursor=pointer]
        - row [ref=e47]:
          - cell "BIGBUY" [ref=e48]
          - cell "Cố định" [ref=e49]
          - cell "50,000 ₫" [ref=e50]
          - cell "500,000 ₫" [ref=e51]
          - cell "2099-12-31" [ref=e52]
          - cell "1 lần" [ref=e53]
          - cell [ref=e54]:
            - button "Xóa" [ref=e55] [cursor=pointer]
        - row [ref=e56]:
          - cell "VIP100" [ref=e57]
          - cell "Cố định" [ref=e58]
          - cell "100,000 ₫" [ref=e59]
          - cell "300,000 ₫" [ref=e60]
          - cell "2099-12-31" [ref=e61]
          - cell "2 lần" [ref=e62]
          - cell [ref=e63]:
            - button "Xóa" [ref=e64] [cursor=pointer]
        - row [ref=e65]:
          - cell "EXPIRED" [ref=e66]
          - cell "Phần trăm" [ref=e67]
          - cell "20%" [ref=e68]
          - cell "100,000 ₫" [ref=e69]
          - cell "Hết hạn" [ref=e70]
          - cell "1 lần" [ref=e71]
          - cell [ref=e72]:
            - button "Xóa" [ref=e73] [cursor=pointer]
        - row [ref=e74]:
          - cell "FR17ZERO" [ref=e75]
          - cell "Phần trăm" [ref=e76]
          - cell "0%" [ref=e77]
          - cell "0 ₫" [ref=e78]
          - cell "2099-12-30" [ref=e79]
          - cell "1 lần" [ref=e80]
          - cell [ref=e81]:
            - button "Xóa" [ref=e82] [cursor=pointer]
        - row [ref=e83]:
          - cell "FR17NEGDISC" [ref=e84]
          - cell "Phần trăm" [ref=e85]
          - cell "-10%" [ref=e86]
          - cell "0 ₫" [ref=e87]
          - cell "2099-12-30" [ref=e88]
          - cell "1 lần" [ref=e89]
          - cell [ref=e90]:
            - button "Xóa" [ref=e91] [cursor=pointer]
        - row [ref=e92]:
          - cell "FR17NEGMIN" [ref=e93]
          - cell "Phần trăm" [ref=e94]
          - cell "10%" [ref=e95]
          - cell "-1 ₫" [ref=e96]
          - cell "2099-12-30" [ref=e97]
          - cell "1 lần" [ref=e98]
          - cell [ref=e99]:
            - button "Xóa" [ref=e100] [cursor=pointer]
        - row [ref=e101]:
          - cell "FR17P101" [ref=e102]
          - cell "Phần trăm" [ref=e103]
          - cell "101%" [ref=e104]
          - cell "0 ₫" [ref=e105]
          - cell "2099-12-30" [ref=e106]
          - cell "1 lần" [ref=e107]
          - cell [ref=e108]:
            - button "Xóa" [ref=e109] [cursor=pointer]
        - row [ref=e110]:
          - cell "FR17PAST" [ref=e111]
          - cell "Phần trăm" [ref=e112]
          - cell "10%" [ref=e113]
          - cell "0 ₫" [ref=e114]
          - cell "Hết hạn" [ref=e115]
          - cell "1 lần" [ref=e116]
          - cell [ref=e117]:
            - button "Xóa" [ref=e118] [cursor=pointer]
        - row [ref=e119]:
          - cell "SAVE10" [ref=e120]
          - cell "Phần trăm" [ref=e121]
          - cell "10%" [ref=e122]
          - cell "0 ₫" [ref=e123]
          - cell "2099-12-30" [ref=e124]
          - cell "1 lần" [ref=e125]
          - cell [ref=e126]:
            - button "Xóa" [ref=e127] [cursor=pointer]
```

# Test source

```ts
  1   | import { test, expect, Page, Locator } from '@playwright/test';
  2   | import testData from '../data/fr17-testcases-draft.json';
  3   | 
  4   | type TestValue = string | number | boolean | string[] | number[] | Record<string, string>;
  5   | 
  6   | interface TestCase {
  7   |   id: string;
  8   |   type: 'positive' | 'negative' | 'edge';
  9   |   description: string;
  10  |   steps: string[];
  11  |   input: Record<string, TestValue>;
  12  |   expected: Record<string, TestValue | null>;
  13  |   automate: boolean;
  14  |   selector_hints?: Record<string, string>;
  15  |   cleanup?: string;
  16  | }
  17  | 
  18  | const typedData = testData as TestCase[];
  19  | 
  20  | function inputString(tc: TestCase, key: string): string {
  21  |   const value = tc.input[key];
  22  |   if (typeof value !== 'string') throw new Error(`${tc.id}.input.${key} must be a string`);
  23  |   return value;
  24  | }
  25  | 
  26  | function inputNumber(tc: TestCase, key: string): number {
  27  |   const value = tc.input[key];
> 28  |   if (typeof value !== 'number') throw new Error(`${tc.id}.input.${key} must be a number`);
      |                                        ^ Error: TC06.input.discount_value must be a number
  29  |   return value;
  30  | }
  31  | 
  32  | function expectedString(tc: TestCase, key: string): string {
  33  |   const value = tc.expected[key];
  34  |   if (typeof value !== 'string') throw new Error(`${tc.id}.expected.${key} must be a string`);
  35  |   return value;
  36  | }
  37  | 
  38  | function expectedStrings(tc: TestCase, key: string): string[] {
  39  |   const value = tc.expected[key];
  40  |   if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
  41  |     throw new Error(`${tc.id}.expected.${key} must be a string[]`);
  42  |   }
  43  |   return value as string[];
  44  | }
  45  | 
  46  | function selectorHint(tc: TestCase, key: string): string {
  47  |   const hint = tc.selector_hints?.[key];
  48  |   if (!hint) throw new Error(`${tc.id} is missing selector_hints.${key}`);
  49  |   return hint;
  50  | }
  51  | 
  52  | function adminCredentials(): { email: string; password: string } {
  53  |   const loginCase = typedData.find(tc => tc.id === 'TC01');
  54  |   if (!loginCase) throw new Error('TC01 is required for data-driven admin credentials');
  55  |   return {
  56  |     email: process.env.FR17_ADMIN_EMAIL ?? process.env.FR11_ADMIN_EMAIL ?? inputString(loginCase, 'admin_email'),
  57  |     password: process.env.FR17_ADMIN_PASSWORD ?? process.env.FR11_ADMIN_PASSWORD ?? inputString(loginCase, 'admin_password'),
  58  |   };
  59  | }
  60  | 
  61  | async function loginAndOpenCoupons(page: Page): Promise<void> {
  62  |   const credentials = adminCredentials();
  63  |   await page.goto('/');
  64  |   await expect(page).toHaveURL(/\/$/);
  65  |   await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
  66  |   await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
  67  |   await page.getByRole('button', { name: 'Login' }).click();
  68  |   await page.getByText('Mã Giảm Giá', { exact: true }).click();
  69  |   await expect(page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })).toBeVisible();
  70  | }
  71  | 
  72  | function rowForCode(page: Page, code: string): Locator {
  73  |   return page.getByRole('row').filter({ hasText: code });
  74  | }
  75  | 
  76  | async function fillCouponForm(page: Page, tc: TestCase): Promise<void> {
  77  |   const input = tc.input;
  78  |   if ('code' in input) {
  79  |     await page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' }).fill(inputString(tc, 'code'));
  80  |   }
  81  |   if ('type' in input) {
  82  |     await page.getByRole('combobox').selectOption(inputString(tc, 'type'));
  83  |   }
  84  |   if ('discount_value' in input) {
  85  |     const discount = input.type === 'fixed'
  86  |       ? page.getByRole('spinbutton', { name: 'Số tiền (VD: 50000)' })
  87  |       : page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' });
  88  |     await discount.fill(String(inputNumber(tc, 'discount_value')));
  89  |   }
  90  |   if ('min_order_amount' in input) {
  91  |     await page.getByRole('spinbutton', { name: 'Đơn tối thiểu (₫)' }).fill(String(inputNumber(tc, 'min_order_amount')));
  92  |   }
  93  |   if ('expired_at' in input) {
  94  |     await page.getByPlaceholder('Ngày hết hạn').fill(inputString(tc, 'expired_at'));
  95  |   }
  96  |   if ('max_uses_per_user' in input) {
  97  |     await page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' }).fill(String(inputNumber(tc, 'max_uses_per_user')));
  98  |   }
  99  | }
  100 | 
  101 | async function deleteIfPresent(page: Page, code: string): Promise<void> {
  102 |   const row = rowForCode(page, code);
  103 |   if (await row.count()) {
  104 |     await row.getByRole('button', { name: 'Xóa' }).click();
  105 |     await expect(row).toHaveCount(0);
  106 |   }
  107 | }
  108 | 
  109 | test.describe('FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104', () => {
  110 |   test.beforeEach(async ({ page }) => {
  111 |     await loginAndOpenCoupons(page);
  112 |   });
  113 | 
  114 |   for (const tc of typedData) {
  115 |     if (!tc.automate) continue;
  116 | 
  117 |     test(`${tc.id} - ${tc.description}`, async ({ page }) => {
  118 |       const code = typeof tc.input.code === 'string' ? tc.input.code.trim() : undefined;
  119 | 
  120 |       try {
  121 |         switch (tc.id) {
  122 |           case 'TC01': {
  123 |             const table = page.getByRole('table');
  124 |             await expect(table).toBeVisible();
  125 |             await expect(page.getByRole('heading', { name: expectedString(tc, 'heading') })).toBeVisible();
  126 |             for (const header of expectedStrings(tc, 'headers')) {
  127 |               await expect(table.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
  128 |             }
```