# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104 >> TC04 - [RULE-03] Dịch đúng toàn bộ trạng thái đơn hàng sang tiếng Việt
- Location: automation\tests\fr11-order-history.spec.ts:142:9

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('table')
Expected substring: "Đã xác nhận"
Received string:    "Mã ĐHNgày đặtTổng tiềnTrạng tháiThao tác#58/27/202658,000,000 ₫Đã giao#48/27/202630,000,000 ₫Đang giaoHủy đơn#38/27/202630,000,000 ₫Đã hủy#28/27/202673,000,000 ₫Chờ xác nhậnHủy đơn"
Timeout: 10000ms

Call log:
  - Expect "toContainText" with timeout 10000ms
  - waiting for locator('table')
    23 × locator resolved to <table class="w-full text-left">…</table>
       - unexpected value "Mã ĐHNgày đặtTổng tiềnTrạng tháiThao tác#58/27/202658,000,000 ₫Đã giao#48/27/202630,000,000 ₫Đang giaoHủy đơn#38/27/202630,000,000 ₫Đã hủy#28/27/202673,000,000 ₫Chờ xác nhậnHủy đơn"

```

```yaml
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
```

# Test source

```ts
  63  |   const hint = tc.selector_hints?.[key];
  64  |   if (!hint) {
  65  |     throw new Error(`${tc.id} thiếu selector_hints.${key}`);
  66  |   }
  67  |   return hint;
  68  | }
  69  | 
  70  | function accessibleNameFromHint(tc: TestCase, key: string): string {
  71  |   const hint = selectorHint(tc, key);
  72  |   const quotedName = hint.match(/"([^"]+)"$/)?.[1];
  73  |   if (!quotedName) {
  74  |     throw new Error(`Không đọc được accessible name từ selector hint: ${hint}`);
  75  |   }
  76  |   return quotedName;
  77  | }
  78  | 
  79  | async function loginUser(page: Page): Promise<void> {
  80  |   await page.goto(`${USER_BASE_URL}/login`);
  81  | 
  82  |   // Selector được khám phá black-box: form có đúng 2 input, không có id/name/placeholder.
  83  |   const inputs = page.locator('form input');
  84  |   await expect(inputs).toHaveCount(2);
  85  |   await inputs.nth(0).fill(requireEnv('FR11_USER_EMAIL'));
  86  |   await inputs.nth(1).fill(requireEnv('FR11_USER_PASSWORD'));
  87  |   await page.getByRole('button', { name: 'Sign In', exact: true }).click();
  88  | }
  89  | 
  90  | async function openUserOrderHistory(page: Page, tc: TestCase): Promise<Locator> {
  91  |   await loginUser(page);
  92  |   await page.goto(`${USER_BASE_URL}/profile`);
  93  |   await expect(page).toHaveURL(`${USER_BASE_URL}/profile`);
  94  | 
  95  |   const table = page.locator(selectorHint(tc, 'table'));
  96  |   await expect(table).toBeVisible();
  97  |   return table;
  98  | }
  99  | 
  100 | async function loginAdmin(page: Page, password: string): Promise<void> {
  101 |   await page.goto(`${ADMIN_BASE_URL}/login`);
  102 |   await page.getByPlaceholder('Email').fill(requireEnv('FR11_ADMIN_EMAIL'));
  103 |   await page.getByPlaceholder('Password').fill(password);
  104 |   await page.getByRole('button', { name: 'Login', exact: true }).click();
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
> 163 |             await expect(table).toContainText(statusText);
      |                                 ^ Error: expect(locator).toContainText(expected) failed
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
  256 |             await expect(badge).toBeVisible();
  257 |           }
  258 |           for (const token of expectedStrings(tc, 'confirmedClassTokens')) {
  259 |             await expect(confirmed).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
  260 |           }
  261 |           for (const token of expectedStrings(tc, 'deliveredClassTokens')) {
  262 |             await expect(delivered).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
  263 |           }
```