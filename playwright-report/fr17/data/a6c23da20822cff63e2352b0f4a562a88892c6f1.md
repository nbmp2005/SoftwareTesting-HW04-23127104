# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr17-coupon-crud.spec.ts >> FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104 >> TC09 - [RULE-10/Error] max_uses_per_user = 0 bị chặn
- Location: automation\tests\fr17-coupon-crud.spec.ts:117:9

# Error details

```
Error: expect(locator).toHaveJSProperty(expected) failed

Locator:  getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' })
Expected: "Value must be greater than or equal to 1."
Received: "Please select a value that is no less than 1."
Timeout:  10000ms

Call log:
  - Expect "toHaveJSProperty" with timeout 10000ms
  - waiting for getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' })
    23 × locator resolved to <input min="1" value="0" type="number" class="border p-2 rounded" placeholder="Số lần dùng tối đa/người"/>
       - unexpected value "Please select a value that is no less than 1."

```

```yaml
- spinbutton "Số lần dùng tối đa/người": "0"
```

# Test source

```ts
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
  129 |             await expect(table.getByRole('columnheader')).toHaveCount(expectedStrings(tc, 'headers').length);
  130 |             break;
  131 |           }
  132 | 
  133 |           case 'TC02':
  134 |           case 'TC03':
  135 |           case 'TC04':
  136 |           case 'TC13':
  137 |           case 'TC14':
  138 |           case 'TC15': {
  139 |             await fillCouponForm(page, tc);
  140 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  141 |             const row = rowForCode(page, code!);
  142 |             await expect(row).toHaveCount(1);
  143 |             await expect(row).toBeVisible();
  144 |             for (const value of expectedStrings(tc, 'rowContains')) {
  145 |               await expect(row).toContainText(value);
  146 |             }
  147 |             break;
  148 |           }
  149 | 
  150 |           case 'TC05':
  151 |           case 'TC06':
  152 |           case 'TC07': {
  153 |             await fillCouponForm(page, tc);
  154 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  155 |             const field = tc.id === 'TC05'
  156 |               ? page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' })
  157 |               : tc.id === 'TC06'
  158 |                 ? page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' })
  159 |                 : page.getByPlaceholder('Ngày hết hạn');
  160 |             await expect(field).toBeVisible();
  161 |             await expect(field).toHaveValue(tc.id === 'TC05' ? '' : tc.id === 'TC06' ? '' : '');
  162 |             await expect(field).toHaveJSProperty('validationMessage', expectedString(tc, 'errorMessage'));
  163 |             break;
  164 |           }
  165 | 
  166 |           case 'TC08':
  167 |           case 'TC18': {
  168 |             await fillCouponForm(page, tc);
  169 |             const dialogPromise = page.waitForEvent('dialog');
  170 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  171 |             const dialog = await dialogPromise;
  172 |             expect(dialog.type()).toBe('alert');
  173 |             expect(dialog.message()).toBe(expectedString(tc, 'alertMessage'));
  174 |             await dialog.dismiss();
  175 |             break;
  176 |           }
  177 | 
  178 |           case 'TC09': {
  179 |             await fillCouponForm(page, tc);
  180 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  181 |             const field = page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' });
  182 |             await expect(field).toHaveValue('0');
> 183 |             await expect(field).toHaveJSProperty('validationMessage', expectedString(tc, 'errorMessage'));
      |                                 ^ Error: expect(locator).toHaveJSProperty(expected) failed
  184 |             break;
  185 |           }
  186 | 
  187 |           case 'TC10':
  188 |           case 'TC11':
  189 |           case 'TC12':
  190 |           case 'TC16':
  191 |           case 'TC17': {
  192 |             await fillCouponForm(page, tc);
  193 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  194 |             await expect(rowForCode(page, code!)).toHaveCount(0);
  195 |             break;
  196 |           }
  197 | 
  198 |           case 'TC19': {
  199 |             await fillCouponForm(page, tc);
  200 |             await page.getByRole('button', { name: 'Tạo mã' }).click();
  201 |             const row = rowForCode(page, code!);
  202 |             await expect(row).toBeVisible();
  203 |             const dialogPromise = page.waitForEvent('dialog');
  204 |             await row.getByRole('button', { name: 'Xóa' }).click();
  205 |             const dialog = await dialogPromise;
  206 |             expect(dialog.type()).toBe('confirm');
  207 |             await dialog.dismiss();
  208 |             await expect(row).toBeVisible();
  209 |             break;
  210 |           }
  211 | 
  212 |           default:
  213 |             throw new Error(`Unimplemented automated case ${tc.id}`);
  214 |         }
  215 |       } finally {
  216 |         if (code && !['TC08', 'TC18'].includes(tc.id)) {
  217 |           await deleteIfPresent(page, code);
  218 |         }
  219 |       }
  220 |     });
  221 |   }
  222 | });
  223 | 
```