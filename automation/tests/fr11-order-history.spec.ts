import { test, expect, Page, Locator } from '@playwright/test';
import testData from '../data/fr11-testcases-draft.json';

type TestValue = string | number | boolean | string[] | number[] | Record<string, string>;

interface TestCase {
  id: string;
  type: 'positive' | 'negative' | 'edge';
  description: string;
  steps: string[];
  input: Record<string, TestValue>;
  expected: Record<string, TestValue>;
  automate: boolean;
  selector_hints?: Record<string, string>;
  manual_reason?: string;
}

const typedData = testData as TestCase[];
const USER_BASE_URL = process.env.FR11_USER_BASE_URL ?? 'http://localhost:5173';
const ADMIN_BASE_URL = process.env.FR11_ADMIN_BASE_URL ?? 'http://localhost:5174';

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Thiếu biến môi trường bắt buộc: ${name}`);
  }
  return value;
}

function inputString(tc: TestCase, key: string): string {
  const value = tc.input[key];
  if (typeof value !== 'string') {
    throw new Error(`${tc.id}.input.${key} phải là string`);
  }
  return value;
}

function expectedString(tc: TestCase, key: string): string {
  const value = tc.expected[key];
  if (typeof value !== 'string') {
    throw new Error(`${tc.id}.expected.${key} phải là string`);
  }
  return value;
}

function expectedStrings(tc: TestCase, key: string): string[] {
  const value = tc.expected[key];
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    throw new Error(`${tc.id}.expected.${key} phải là string[]`);
  }
  return value as string[];
}

function expectedRecord(tc: TestCase, key: string): Record<string, string> {
  const value = tc.expected[key];
  if (!value || Array.isArray(value) || typeof value !== 'object') {
    throw new Error(`${tc.id}.expected.${key} phải là object`);
  }
  return value as Record<string, string>;
}

function selectorHint(tc: TestCase, key: string): string {
  const hint = tc.selector_hints?.[key];
  if (!hint) {
    throw new Error(`${tc.id} thiếu selector_hints.${key}`);
  }
  return hint;
}

function accessibleNameFromHint(tc: TestCase, key: string): string {
  const hint = selectorHint(tc, key);
  const quotedName = hint.match(/"([^"]+)"$/)?.[1];
  if (!quotedName) {
    throw new Error(`Không đọc được accessible name từ selector hint: ${hint}`);
  }
  return quotedName;
}

async function loginUser(page: Page): Promise<void> {
  await page.goto(`${USER_BASE_URL}/login`);

  // Selector được khám phá black-box: form có đúng 2 input, không có id/name/placeholder.
  const inputs = page.locator('form input');
  await expect(inputs).toHaveCount(2);
  await inputs.nth(0).fill(requireEnv('FR11_USER_EMAIL'));
  await inputs.nth(1).fill(requireEnv('FR11_USER_PASSWORD'));
  await page.getByRole('button', { name: 'Sign In', exact: true }).click();
}

async function openUserOrderHistory(page: Page, tc: TestCase): Promise<Locator> {
  await loginUser(page);
  await page.goto(`${USER_BASE_URL}/profile`);
  await expect(page).toHaveURL(`${USER_BASE_URL}/profile`);

  const table = page.locator(selectorHint(tc, 'table'));
  await expect(table).toBeVisible();
  return table;
}

async function loginAdmin(page: Page, password: string): Promise<void> {
  await page.goto(`${ADMIN_BASE_URL}/login`);
  await page.getByPlaceholder('Email').fill(requireEnv('FR11_ADMIN_EMAIL'));
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Dashboard', exact: true })).toBeVisible();
}

async function openAdminOrders(page: Page, tc: TestCase): Promise<Locator> {
  await loginAdmin(page, requireEnv('FR11_ADMIN_PASSWORD'));
  await page.getByText('Đơn hàng', { exact: true }).click();

  const headingName = accessibleNameFromHint(tc, 'admin_heading');
  await expect(page.getByRole('heading', { name: headingName, exact: true })).toBeVisible();
  return page.locator('table');
}

function orderLabel(orderId: string): string {
  return orderId.startsWith('#') ? orderId : `#${orderId}`;
}

function rowForOrder(table: Locator, orderId: string): Locator {
  return table.getByRole('row').filter({ hasText: orderLabel(orderId) });
}

function cssColorToHex(color: string): string {
  const channels = color.match(/\d+(?:\.\d+)?/g)?.slice(0, 3).map(Number);
  if (!channels || channels.length !== 3) {
    throw new Error(`Không đổi được CSS color sang hex: ${color}`);
  }
  return `#${channels.map(channel => Math.round(channel).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

test.describe('FR-11: Xem lịch sử đơn hàng (User) | Run by: 23127104', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(USER_BASE_URL);
    await expect(page).toHaveURL(new URL('/', USER_BASE_URL).toString());
  });

  for (const tc of typedData) {
    if (!tc.automate) continue;

    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      switch (tc.id) {
        case 'TC01': {
          const table = await openUserOrderHistory(page, tc);
          const heading = page.getByRole('heading', {
            name: expectedString(tc, 'heading'),
            exact: true,
          });
          await expect(heading).toBeVisible();

          for (const header of expectedStrings(tc, 'headers')) {
            await expect(table.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
          }
          await expect(table.getByRole('columnheader')).toHaveCount(expectedStrings(tc, 'headers').length);
          break;
        }

        case 'TC04': {
          const table = await openUserOrderHistory(page, tc);
          const statusMap = expectedRecord(tc, 'statusMap');
          for (const statusText of Object.values(statusMap)) {
            await expect(table).toContainText(statusText);
          }
          break;
        }

        case 'TC05': {
          const table = await openUserOrderHistory(page, tc);
          const foreignOrderId = requireEnv(inputString(tc, 'foreignOrderIdEnv'));
          await expect(table).not.toContainText(orderLabel(foreignOrderId));
          break;
        }

        case 'TC06': {
          await page.goto(`${USER_BASE_URL}/profile`);
          await expect(page).toHaveURL(`${USER_BASE_URL}/profile`);
          await expect(page.getByText(expectedString(tc, 'message'), { exact: true })).toBeVisible();
          await expect(page.getByRole('heading', { name: 'Lịch sử đơn hàng', exact: true })).toHaveCount(0);
          break;
        }

        case 'TC07':
        case 'TC08':
        case 'TC09': {
          const table = await openUserOrderHistory(page, tc);
          const orderId = requireEnv(inputString(tc, 'orderIdEnv'));
          const row = rowForOrder(table, orderId);
          await expect(row).toBeVisible();
          await expect(row).toContainText(expectedString(tc, 'statusText'));

          const cancelName = accessibleNameFromHint(tc, 'cancel_button');
          await expect(row.getByRole('button', { name: cancelName, exact: true })).toHaveCount(0);
          break;
        }

        case 'TC10': {
          const table = await openAdminOrders(page, tc);
          const orderId = requireEnv(inputString(tc, 'orderIdEnv'));
          const row = rowForOrder(table, orderId);
          await expect(row).toBeVisible();
          await expect(row).toContainText(expectedString(tc, 'statusText'));

          const forbiddenButton = accessibleNameFromHint(tc, 'mark_delivered_button');
          await expect(row.getByRole('button', { name: forbiddenButton, exact: true })).toHaveCount(0);
          break;
        }

        case 'TC11': {
          await page.goto(`${ADMIN_BASE_URL}/login`);
          await page.getByPlaceholder('Email').fill(requireEnv('FR11_ADMIN_EMAIL'));
          await page.getByPlaceholder('Password').fill(requireEnv('FR11_ADMIN_WRONG_PASSWORD'));

          const dialogPromise = page.waitForEvent('dialog');
          await page.getByRole('button', { name: 'Login', exact: true }).click();
          const dialog = await dialogPromise;
          expect(dialog.message()).toBe(expectedString(tc, 'message'));
          await dialog.dismiss();

          const adminHeading = accessibleNameFromHint(tc, 'admin_heading');
          await expect(page.getByRole('heading', { name: adminHeading, exact: true })).toHaveCount(0);
          break;
        }

        case 'TC12': {
          const table = await openUserOrderHistory(page, tc);
          const labels = await table.locator('tbody tr td:first-child').allTextContents();
          const ids = labels.map(label => Number(label.replace(/\D/g, '')));
          expect(ids.length).toBeGreaterThanOrEqual(2);
          expect(expectedString(tc, 'sortDirection')).toBe('descending');
          expect(ids).toEqual([...ids].sort((left, right) => right - left));
          break;
        }

        case 'TC14': {
          const table = await openUserOrderHistory(page, tc);
          const totalText = expectedString(tc, 'totalText');
          await expect(table.getByText(totalText, { exact: true }).first()).toBeVisible();
          await expect(table).toContainText(totalText);
          break;
        }

        case 'TC16': {
          const table = await openUserOrderHistory(page, tc);
          const statusCase = typedData.find(item => item.id === 'TC04');
          if (!statusCase) throw new Error('Thiếu TC04 để lấy statusMap data-driven');
          const statusMap = expectedRecord(statusCase, 'statusMap');

          const pending = table.getByText(statusMap.pending, { exact: true }).first();
          const confirmed = table.getByText(statusMap.confirmed, { exact: true }).first();
          const shipping = table.getByText(statusMap.shipping, { exact: true }).first();
          const delivered = table.getByText(statusMap.delivered, { exact: true }).first();
          const canceled = table.getByText(statusMap.canceled, { exact: true }).first();

          for (const badge of [pending, confirmed, shipping, delivered, canceled]) {
            await expect(badge).toBeVisible();
          }
          for (const token of expectedStrings(tc, 'confirmedClassTokens')) {
            await expect(confirmed).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
          }
          for (const token of expectedStrings(tc, 'deliveredClassTokens')) {
            await expect(delivered).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
          }
          for (const token of expectedStrings(tc, 'canceledClassTokens')) {
            await expect(canceled).toHaveClass(new RegExp(`(?:^|\\s)${token}(?:\\s|$)`));
          }

          const pendingColors = await pending.evaluate(element => {
            const style = getComputedStyle(element);
            return { background: style.backgroundColor, foreground: style.color };
          });
          expect(cssColorToHex(pendingColors.background)).toBe(expectedString(tc, 'pendingBackground'));
          expect(cssColorToHex(pendingColors.foreground)).toBe(expectedString(tc, 'pendingForeground'));

          const comparedBackgrounds = await Promise.all(
            [shipping, pending, confirmed, canceled].map(locator =>
              locator.evaluate(element => getComputedStyle(element).backgroundColor),
            ),
          );
          expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[1]);
          expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[2]);
          expect(comparedBackgrounds[0]).not.toBe(comparedBackgrounds[3]);
          break;
        }

        default:
          throw new Error(`Chưa triển khai automated case ${tc.id}`);
      }
    });
  }
});
