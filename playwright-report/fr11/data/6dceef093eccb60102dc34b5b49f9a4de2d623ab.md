# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104 >> TC16 - [RULE-03 + mục 7.1 đã xác nhận] Badge trạng thái có màu phân biệt
- Location: automation\tests\fr11-order-history.spec.ts:142:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('table').getByText('Đã xác nhận', { exact: true }).first()
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('table').getByText('Đã xác nhận', { exact: true }).first()

```

```yaml
- banner:
  - link "EShop":
    - /url: /
  - navigation:
    - link "Giỏ hàng":
      - /url: /cart
    - link "Chào, Test User":
      - /url: /profile
    - button "Thoát"
- main:
  - heading "Hồ sơ của bạn" [level=2]
  - text: Email (Không đổi)
  - textbox [disabled]: test@eshop.com
  - text: Họ Tên
  - textbox: Test User
  - text: Số điện thoại
  - 'textbox "VD: 0912345678"'
  - text: Địa chỉ giao hàng
  - textbox "Nhập địa chỉ của bạn"
  - button "Cập nhật"
  - heading "Lịch sử đơn hàng" [level=2]
  - table:
    - rowgroup:
      - row "Mã ĐH Ngày đặt Tổng tiền Trạng thái Thao tác":
        - columnheader "Mã ĐH"
        - columnheader "Ngày đặt"
        - columnheader "Tổng tiền"
        - columnheader "Trạng thái"
        - columnheader "Thao tác"
    - rowgroup:
      - row "#5 8/27/2026 58,000,000 ₫ Đã giao":
        - cell "#5"
        - cell "8/27/2026"
        - cell "58,000,000 ₫"
        - cell "Đã giao"
        - cell
      - row "#4 8/27/2026 30,000,000 ₫ Đang giao Hủy đơn":
        - cell "#4"
        - cell "8/27/2026"
        - cell "30,000,000 ₫"
        - cell "Đang giao"
        - cell "Hủy đơn":
          - button "Hủy đơn"
      - row "#3 8/27/2026 30,000,000 ₫ Đã hủy":
        - cell "#3"
        - cell "8/27/2026"
        - cell "30,000,000 ₫"
        - cell "Đã hủy"
        - cell
      - row "#2 8/27/2026 73,000,000 ₫ Chờ xác nhận Hủy đơn":
        - cell "#2"
        - cell "8/27/2026"
        - cell "73,000,000 ₫"
        - cell "Chờ xác nhận"
        - cell "Hủy đơn":
          - button "Hủy đơn"
- contentinfo: © 2026 EShop SUT. Dành cho mục đích kiểm thử.
```

# Test source

```ts
  156 |           break;
  157 |         }
  158 | 
  159 |         case 'TC04': {
  160 |           const table = await openUserOrderHistory(page, tc);
  161 |           const statusMap = expectedRecord(tc, 'statusMap');
  162 |           for (const statusText of Object.values(statusMap)) {
  163 |             await expect(table).toContainText(statusText);
  164 |           }
  165 |           break;
  166 |         }
  167 | 
  168 |         case 'TC05': {
  169 |           const table = await openUserOrderHistory(page, tc);
  170 |           const foreignOrderId = requireEnv(inputString(tc, 'foreignOrderIdEnv'));
  171 |           await expect(table).not.toContainText(orderLabel(foreignOrderId));
  172 |           break;
  173 |         }
  174 | 
  175 |         case 'TC06': {
  176 |           await page.goto(`${USER_BASE_URL}/profile`);
  177 |           await expect(page).toHaveURL(`${USER_BASE_URL}/profile`);
  178 |           await expect(page.getByText(expectedString(tc, 'message'), { exact: true })).toBeVisible();
  179 |           await expect(page.getByRole('heading', { name: 'Lịch sử đơn hàng', exact: true })).toHaveCount(0);
  180 |           break;
  181 |         }
  182 | 
  183 |         case 'TC07':
  184 |         case 'TC08':
  185 |         case 'TC09': {
  186 |           const table = await openUserOrderHistory(page, tc);
  187 |           const orderId = requireEnv(inputString(tc, 'orderIdEnv'));
  188 |           const row = rowForOrder(table, orderId);
  189 |           await expect(row).toBeVisible();
  190 |           await expect(row).toContainText(expectedString(tc, 'statusText'));
  191 | 
  192 |           const cancelName = accessibleNameFromHint(tc, 'cancel_button');
  193 |           await expect(row.getByRole('button', { name: cancelName, exact: true })).toHaveCount(0);
  194 |           break;
  195 |         }
  196 | 
  197 |         case 'TC10': {
  198 |           const table = await openAdminOrders(page, tc);
  199 |           const orderId = requireEnv(inputString(tc, 'orderIdEnv'));
  200 |           const row = rowForOrder(table, orderId);
  201 |           await expect(row).toBeVisible();
  202 |           await expect(row).toContainText(expectedString(tc, 'statusText'));
  203 | 
  204 |           const forbiddenButton = accessibleNameFromHint(tc, 'mark_delivered_button');
  205 |           await expect(row.getByRole('button', { name: forbiddenButton, exact: true })).toHaveCount(0);
  206 |           break;
  207 |         }
  208 | 
  209 |         case 'TC11': {
  210 |           await page.goto(`${ADMIN_BASE_URL}/login`);
  211 |           await page.getByPlaceholder('Email').fill(requireEnv('FR11_ADMIN_EMAIL'));
  212 |           await page.getByPlaceholder('Password').fill(requireEnv('FR11_ADMIN_WRONG_PASSWORD'));
  213 | 
  214 |           const dialogPromise = page.waitForEvent('dialog');
  215 |           await page.getByRole('button', { name: 'Login', exact: true }).click();
  216 |           const dialog = await dialogPromise;
  217 |           expect(dialog.message()).toBe(expectedString(tc, 'message'));
  218 |           await dialog.dismiss();
  219 | 
  220 |           const adminHeading = accessibleNameFromHint(tc, 'admin_heading');
  221 |           await expect(page.getByRole('heading', { name: adminHeading, exact: true })).toHaveCount(0);
  222 |           break;
  223 |         }
  224 | 
  225 |         case 'TC12': {
  226 |           const table = await openUserOrderHistory(page, tc);
  227 |           const labels = await table.locator('tbody tr td:first-child').allTextContents();
  228 |           const ids = labels.map(label => Number(label.replace(/\D/g, '')));
  229 |           expect(ids.length).toBeGreaterThanOrEqual(2);
  230 |           expect(expectedString(tc, 'sortDirection')).toBe('descending');
  231 |           expect(ids).toEqual([...ids].sort((left, right) => right - left));
  232 |           break;
  233 |         }
  234 | 
  235 |         case 'TC14': {
  236 |           const table = await openUserOrderHistory(page, tc);
  237 |           const totalText = expectedString(tc, 'totalText');
  238 |           await expect(table.getByText(totalText, { exact: true }).first()).toBeVisible();
  239 |           await expect(table).toContainText(totalText);
  240 |           break;
  241 |         }
  242 | 
  243 |         case 'TC16': {
  244 |           const table = await openUserOrderHistory(page, tc);
  245 |           const statusCase = typedData.find(item => item.id === 'TC04');
  246 |           if (!statusCase) throw new Error('Thiếu TC04 để lấy statusMap data-driven');
  247 |           const statusMap = expectedRecord(statusCase, 'statusMap');
  248 | 
  249 |           const pending = table.getByText(statusMap.pending, { exact: true }).first();
  250 |           const confirmed = table.getByText(statusMap.confirmed, { exact: true }).first();
  251 |           const shipping = table.getByText(statusMap.shipping, { exact: true }).first();
  252 |           const delivered = table.getByText(statusMap.delivered, { exact: true }).first();
  253 |           const canceled = table.getByText(statusMap.canceled, { exact: true }).first();
  254 | 
  255 |           for (const badge of [pending, confirmed, shipping, delivered, canceled]) {
> 256 |             await expect(badge).toBeVisible();
      |                                 ^ Error: expect(locator).toBeVisible() failed
  257 |           }
  258 |           for (const token of expectedStrings(tc, 'confirmedClassTokens')) {
  259 |             await expect(confirmed).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
  260 |           }
  261 |           for (const token of expectedStrings(tc, 'deliveredClassTokens')) {
  262 |             await expect(delivered).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
  263 |           }
  264 |           for (const token of expectedStrings(tc, 'canceledClassTokens')) {
  265 |             await expect(canceled).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
  266 |           }
  267 | 
  268 |           const pendingColors = await pending.evaluate(element => {
  269 |             const style = getComputedStyle(element);
  270 |             return { background: style.backgroundColor, foreground: style.color };
  271 |           });
  272 |           expect(cssColorToHex(pendingColors.background)).toBe(expectedString(tc, 'pendingBackground'));
  273 |           expect(cssColorToHex(pendingColors.foreground)).toBe(expectedString(tc, 'pendingForeground'));
  274 | 
  275 |           const comparedBackgrounds = await Promise.all(
  276 |             [shipping, pending, confirmed, canceled].map(locator =>
  277 |               locator.evaluate(element => getComputedStyle(element).backgroundColor),
  278 |             ),
  279 |           );
  280 |           expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[1]);
  281 |           expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[2]);
  282 |           expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[3]);
  283 |           break;
  284 |         }
  285 | 
  286 |         default:
  287 |           throw new Error(`Chưa triển khai automated case ${tc.id}`);
  288 |       }
  289 |     });
  290 |   }
  291 | });
  292 | 
```