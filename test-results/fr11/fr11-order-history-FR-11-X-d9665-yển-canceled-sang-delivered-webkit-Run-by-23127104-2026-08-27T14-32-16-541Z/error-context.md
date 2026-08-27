# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr11-order-history.spec.ts >> FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104 >> TC10 - [RULE-16 + mục 7.4 đã xác nhận] Admin không được chuyển canceled sang delivered
- Location: automation\tests\fr11-order-history.spec.ts:142:9

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Dashboard', exact: true })
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for getByRole('heading', { name: 'Dashboard', exact: true })

```

```yaml
- heading "Admin Login" [level=2]
- textbox "Email": admin@eshop.com
- textbox "Password": Admin123!
- button "Login"
```

# Test source

```ts
  5   | 
  6   | interface TestCase {
  7   |   id: string;
  8   |   type: 'positive' | 'negative' | 'edge';
  9   |   description: string;
  10  |   steps: string[];
  11  |   input: Record<string, TestValue>;
  12  |   expected: Record<string, TestValue>;
  13  |   automate: boolean;
  14  |   selector_hints?: Record<string, string>;
  15  |   manual_reason?: string;
  16  | }
  17  | 
  18  | const typedData = testData as TestCase[];
  19  | const USER_BASE_URL = process.env.FR11_USER_BASE_URL ?? 'http://localhost:5173';
  20  | const ADMIN_BASE_URL = process.env.FR11_ADMIN_BASE_URL ?? 'http://localhost:5174';
  21  | 
  22  | function requireEnv(name: string): string {
  23  |   const value = process.env[name];
  24  |   if (!value) {
  25  |     throw new Error(`Thiếu biến môi trường bắt buộc: ${name}`);
  26  |   }
  27  |   return value;
  28  | }
  29  | 
  30  | function inputString(tc: TestCase, key: string): string {
  31  |   const value = tc.input[key];
  32  |   if (typeof value !== 'string') {
  33  |     throw new Error(`${tc.id}.input.${key} phải là string`);
  34  |   }
  35  |   return value;
  36  | }
  37  | 
  38  | function expectedString(tc: TestCase, key: string): string {
  39  |   const value = tc.expected[key];
  40  |   if (typeof value !== 'string') {
  41  |     throw new Error(`${tc.id}.expected.${key} phải là string`);
  42  |   }
  43  |   return value;
  44  | }
  45  | 
  46  | function expectedStrings(tc: TestCase, key: string): string[] {
  47  |   const value = tc.expected[key];
  48  |   if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
  49  |     throw new Error(`${tc.id}.expected.${key} phải là string[]`);
  50  |   }
  51  |   return value as string[];
  52  | }
  53  | 
  54  | function expectedRecord(tc: TestCase, key: string): Record<string, string> {
  55  |   const value = tc.expected[key];
  56  |   if (!value || Array.isArray(value) || typeof value !== 'object') {
  57  |     throw new Error(`${tc.id}.expected.${key} phải là object`);
  58  |   }
  59  |   return value as Record<string, string>;
  60  | }
  61  | 
  62  | function selectorHint(tc: TestCase, key: string): string {
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
> 105 |   await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
      |                                                                               ^ Error: expect(locator).toBeVisible() failed
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
  205 |           await expect(row.getByRole('button', { name: forbiddenButton, exact: true })).toHaveCount(0);
```