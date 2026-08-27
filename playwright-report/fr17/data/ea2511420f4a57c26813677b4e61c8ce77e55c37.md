# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr17-coupon-crud.spec.ts >> FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104 >> TC17 - [RULE-11/Mục 6 xác nhận] expired_at trong quá khứ phải bị từ chối
- Location: automation\tests\fr17-coupon-crud.spec.ts:117:9

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByRole('row').filter({ hasText: 'FR17PAST' })
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for getByRole('row').filter({ hasText: 'FR17PAST' })
    23 × locator resolved to 1 element
       - unexpected value "1"

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
        - 'textbox "Mã coupon (VD: SAVE10)" [ref=e20]'
        - combobox [ref=e21]:
          - option "Phần trăm (%)" [selected]
          - option "Số tiền cố định (₫)"
        - 'spinbutton "Giá trị % (VD: 10)" [ref=e22]'
        - spinbutton "Đơn tối thiểu (₫)" [ref=e23]: "0"
        - textbox "Ngày hết hạn" [ref=e24]
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
          - cell "SAVE10" [ref=e75]
          - cell "Phần trăm" [ref=e76]
          - cell "10%" [ref=e77]
          - cell "0 ₫" [ref=e78]
          - cell "2099-12-30" [ref=e79]
          - cell "1 lần" [ref=e80]
          - cell [ref=e81]:
            - button "Xóa" [ref=e82] [cursor=pointer]
        - row [ref=e83]:
          - cell "FR17ZERO" [ref=e84]
          - cell "Phần trăm" [ref=e85]
          - cell "0%" [ref=e86]
          - cell "0 ₫" [ref=e87]
          - cell "2099-12-30" [ref=e88]
          - cell "1 lần" [ref=e89]
          - cell [ref=e90]:
            - button "Xóa" [ref=e91] [cursor=pointer]
        - row [ref=e92]:
          - cell "FR17NEGDISC" [ref=e93]
          - cell "Phần trăm" [ref=e94]
          - cell "-10%" [ref=e95]
          - cell "0 ₫" [ref=e96]
          - cell "2099-12-30" [ref=e97]
          - cell "1 lần" [ref=e98]
          - cell [ref=e99]:
            - button "Xóa" [ref=e100] [cursor=pointer]
        - row [ref=e101]:
          - cell "FR17NEGMIN" [ref=e102]
          - cell "Phần trăm" [ref=e103]
          - cell "10%" [ref=e104]
          - cell "-1 ₫" [ref=e105]
          - cell "2099-12-30" [ref=e106]
          - cell "1 lần" [ref=e107]
          - cell [ref=e108]:
            - button "Xóa" [ref=e109] [cursor=pointer]
        - row [ref=e110]:
          - cell "FR17P101" [ref=e111]
          - cell "Phần trăm" [ref=e112]
          - cell "101%" [ref=e113]
          - cell "0 ₫" [ref=e114]
          - cell "2099-12-30" [ref=e115]
          - cell "1 lần" [ref=e116]
          - cell [ref=e117]:
            - button "Xóa" [ref=e118] [cursor=pointer]
```

# Test source

```ts
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
  183 |             await expect(field).toHaveJSProperty('validationMessage', expectedString(tc, 'errorMessage'));
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
> 194 |             await expect(rowForCode(page, code!)).toHaveCount(0);
      |                                                   ^ Error: expect(locator).toHaveCount(expected) failed
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