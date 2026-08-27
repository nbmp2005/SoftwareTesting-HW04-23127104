# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104 >> TC10 - [RULE-16 + mục 7.4 đã xác nhận] Admin không được chuyển canceled sang delivered
- Location: automation\tests\fr11-order-history.spec.ts:142:9

# Error details

```
Error: expect(locator).toHaveCount(expected) failed

Locator:  locator('table').getByRole('row').filter({ hasText: '#3' }).getByRole('button', { name: 'Đánh dấu Đã giao', exact: true })
Expected: 0
Received: 1
Timeout:  10000ms

Call log:
  - Expect "toHaveCount" with timeout 10000ms
  - waiting for locator('table').getByRole('row').filter({ hasText: '#3' }).getByRole('button', { name: 'Đánh dấu Đã giao', exact: true })
    23 × locator resolved to 1 element
       - unexpected value "1"

```

# Page snapshot

```yaml
- generic [ref=f1e3]:
  - generic [ref=f1e4]:
    - heading "EShop Admin" [level=1] [ref=f1e5]
    - list [ref=f1e6]:
      - listitem [ref=f1e7] [cursor=pointer]: Dashboard
      - listitem [ref=f1e8] [cursor=pointer]: Danh mục
      - listitem [ref=f1e9] [cursor=pointer]: Sản phẩm
      - listitem [ref=f1e10] [cursor=pointer]: Mã Giảm Giá
      - listitem [ref=f1e11] [cursor=pointer]: Đơn hàng
      - listitem [ref=f1e12] [cursor=pointer]: Người dùng
      - listitem [ref=f1e13] [cursor=pointer]: Đăng xuất
  - generic [ref=f1e15]:
    - heading "Quản lý Đơn hàng" [level=2] [ref=f1e16]
    - table [ref=f1e17]:
      - rowgroup [ref=f1e18]:
        - row [ref=f1e19]:
          - columnheader "ID" [ref=f1e20]
          - columnheader "Người đặt" [ref=f1e21]
          - columnheader "Tổng tiền" [ref=f1e22]
          - columnheader "Địa chỉ" [ref=f1e23]
          - columnheader "Trạng thái" [ref=f1e24]
          - columnheader "Hành động" [ref=f1e25]
      - rowgroup [ref=f1e26]:
        - row [ref=f1e27]:
          - cell "#5" [ref=f1e28]
          - cell "Test User" [ref=f1e29]
          - cell "58,000,000 ₫" [ref=f1e30]
          - cell "Chưa cập nhật" [ref=f1e31]
          - cell "Đã giao" [ref=f1e32]
          - cell [ref=f1e33]
        - row [ref=f1e34]:
          - cell "#4" [ref=f1e35]
          - cell "Test User" [ref=f1e36]
          - cell "30,000,000 ₫" [ref=f1e37]
          - cell "Chưa cập nhật" [ref=f1e38]
          - cell "Đang giao" [ref=f1e39]
          - cell [ref=f1e40]:
            - button "Hoàn thành" [ref=f1e42] [cursor=pointer]
        - row [ref=f1e43]:
          - cell "#3" [ref=f1e44]
          - cell "Test User" [ref=f1e45]
          - cell "30,000,000 ₫" [ref=f1e46]
          - cell "Chưa cập nhật" [ref=f1e47]
          - cell "Đã hủy" [ref=f1e48]
          - cell [ref=f1e49]:
            - button "Đánh dấu Đã giao" [ref=f1e51] [cursor=pointer]
        - row [ref=f1e52]:
          - cell "#2" [ref=f1e53]
          - cell "Test User" [ref=f1e54]
          - cell "73,000,000 ₫" [ref=f1e55]
          - cell "Chưa cập nhật" [ref=f1e56]
          - cell "Chờ xác nhận" [ref=f1e57]
          - cell [ref=f1e58]:
            - generic [ref=f1e59]:
              - button "Xác nhận" [ref=f1e60] [cursor=pointer]
              - button "Hủy" [ref=f1e61] [cursor=pointer]
        - row [ref=f1e62]:
          - cell "#1" [ref=f1e63]
          - cell "Admin User" [ref=f1e64]
          - cell "45,000,000 ₫" [ref=f1e65]
          - cell "Chưa cập nhật" [ref=f1e66]
          - cell "Chờ xác nhận" [ref=f1e67]
          - cell [ref=f1e68]:
            - generic [ref=f1e69]:
              - button "Xác nhận" [ref=f1e70] [cursor=pointer]
              - button "Hủy" [ref=f1e71] [cursor=pointer]
```

# Test source

```ts
  105 |   await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
  106 | }
  107 | 
  108 | async function openAdminOrders(page: Page, tc: TestCase): Promise<Locator> {
  109 |   await loginAdmin(page, requireEnv('FR11_ADMIN_PASSWORD'));
  110 |   await page.getByText('Đơn hàng', { exact: true }).click();
  111 | 
  112 |   const headingName = accessibleNameFromHint(tc, 'admin_heading');
  113 |   await expect(page.getByRole('heading', { name: headingName, exact: true })).toBeVisible();
  114 |   return page.locator('table');
  115 | }
  116 | 
  117 | function orderLabel(orderId: string): string {
  118 |   return orderId.startsWith('#') ? orderId : `#${orderId}`;
  119 | }
  120 | 
  121 | function rowForOrder(table: Locator, orderId: string): Locator {
  122 |   return table.getByRole('row').filter({ hasText: orderLabel(orderId) });
  123 | }
  124 | 
  125 | function cssColorToHex(color: string): string {
  126 |   const channels = color.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  127 |   if (!channels || channels.length !== 3) {
  128 |     throw new Error(`Không đổi được CSS color sang hex: ${color}`);
  129 |   }
  130 |   return `#${channels.map(channel => Math.round(channel).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
  131 | }
  132 | 
  133 | test.describe('FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104', () => {
  134 |   test.beforeEach(async ({ page }) => {
  135 |     await page.goto(USER_BASE_URL);
  136 |     await expect(page).toHaveURL(new URL('/', USER_BASE_URL).toString());
  137 |   });
  138 | 
  139 |   for (const tc of typedData) {
  140 |     if (!tc.automate) continue;
  141 | 
  142 |     test(`${tc.id} - ${tc.description}`, async ({ page }) => {
  143 |       switch (tc.id) {
  144 |         case 'TC01': {
  145 |           const table = await openUserOrderHistory(page, tc);
  146 |           const heading = page.getByRole('heading', {
  147 |             name: expectedString(tc, 'heading'),
  148 |             exact: true,
  149 |           });
  150 |           await expect(heading).toBeVisible();
  151 | 
  152 |           for (const header of expectedStrings(tc, 'headers')) {
  153 |             await expect(table.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
  154 |           }
  155 |           await expect(table.getByRole('columnheader')).toHaveCount(expectedStrings(tc, 'headers').length);
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
> 205 |           await expect(row.getByRole('button', { name: forbiddenButton, exact: true })).toHaveCount(0);
      |                                                                                         ^ Error: expect(locator).toHaveCount(expected) failed
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
  256 |             await expect(badge).toBeVisible();
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