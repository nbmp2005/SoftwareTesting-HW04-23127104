import { test, expect, Page, Locator } from '@playwright/test';
import testData from '../data/fr17-testcases-draft.json';

type TestValue = string | number | boolean | string[] | number[] | Record<string, string>;

interface TestCase {
  id: string;
  type: 'positive' | 'negative' | 'edge';
  description: string;
  steps: string[];
  input: Record<string, TestValue>;
  expected: Record<string, TestValue | null>;
  automate: boolean;
  selector_hints?: Record<string, string>;
  cleanup?: string;
}

const typedData = testData as TestCase[];

function inputString(tc: TestCase, key: string): string {
  const value = tc.input[key];
  if (typeof value !== 'string') throw new Error(`${tc.id}.input.${key} must be a string`);
  return value;
}

function inputNumber(tc: TestCase, key: string): number {
  const value = tc.input[key];
  if (typeof value !== 'number') throw new Error(`${tc.id}.input.${key} must be a number`);
  return value;
}

function expectedString(tc: TestCase, key: string): string {
  const value = tc.expected[key];
  if (typeof value !== 'string') throw new Error(`${tc.id}.expected.${key} must be a string`);
  return value;
}

function expectedStrings(tc: TestCase, key: string): string[] {
  const value = tc.expected[key];
  if (!Array.isArray(value) || value.some(item => typeof item !== 'string')) {
    throw new Error(`${tc.id}.expected.${key} must be a string[]`);
  }
  return value as string[];
}

function selectorHint(tc: TestCase, key: string): string {
  const hint = tc.selector_hints?.[key];
  if (!hint) throw new Error(`${tc.id} is missing selector_hints.${key}`);
  return hint;
}

function adminCredentials(): { email: string; password: string } {
  const loginCase = typedData.find(tc => tc.id === 'TC01');
  if (!loginCase) throw new Error('TC01 is required for data-driven admin credentials');
  return {
    email: inputString(loginCase, 'admin_email'),
    password: inputString(loginCase, 'admin_password'),
  };
}

async function loginAndOpenCoupons(page: Page): Promise<void> {
  const credentials = adminCredentials();
  await page.goto('/');
  await expect(page).toHaveURL(/\/$/);
  await page.getByRole('textbox', { name: 'Email' }).fill(credentials.email);
  await page.getByRole('textbox', { name: 'Password' }).fill(credentials.password);
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Mã Giảm Giá', { exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Quản lý Mã Giảm Giá' })).toBeVisible();
}

function rowForCode(page: Page, code: string): Locator {
  return page.getByRole('row').filter({ hasText: code });
}

async function fillCouponForm(page: Page, tc: TestCase): Promise<void> {
  const input = tc.input;
  if ('code' in input) {
    await page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' }).fill(inputString(tc, 'code'));
  }
  if ('type' in input) {
    await page.getByRole('combobox').selectOption(inputString(tc, 'type'));
  }
  if ('discount_value' in input) {
    const discount = input.type === 'fixed'
      ? page.getByRole('spinbutton', { name: 'Số tiền (VD: 50000)' })
      : page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' });
    await discount.fill(String(inputNumber(tc, 'discount_value')));
  }
  if ('min_order_amount' in input) {
    await page.getByRole('spinbutton', { name: 'Đơn tối thiểu (₫)' }).fill(String(inputNumber(tc, 'min_order_amount')));
  }
  if ('expired_at' in input) {
    await page.getByPlaceholder('Ngày hết hạn').fill(inputString(tc, 'expired_at'));
  }
  if ('max_uses_per_user' in input) {
    await page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' }).fill(String(inputNumber(tc, 'max_uses_per_user')));
  }
}

async function deleteIfPresent(page: Page, code: string): Promise<void> {
  const row = rowForCode(page, code);
  if (await row.count()) {
    await row.getByRole('button', { name: 'Xóa' }).click();
    await expect(row).toHaveCount(0);
  }
}

test.describe('FR-17: Quản lý Mã Giảm Giá (Coupon CRUD) | Run by: 23127104', () => {
  test.beforeEach(async ({ page }) => {
    await loginAndOpenCoupons(page);
  });

  for (const tc of typedData) {
    if (!tc.automate) continue;

    test(`${tc.id} - ${tc.description}`, async ({ page }) => {
      const code = typeof tc.input.code === 'string' ? tc.input.code.trim() : undefined;

      try {
        switch (tc.id) {
          case 'TC01': {
            const table = page.getByRole('table');
            await expect(table).toBeVisible();
            await expect(page.getByRole('heading', { name: expectedString(tc, 'heading') })).toBeVisible();
            for (const header of expectedStrings(tc, 'headers')) {
              await expect(table.getByRole('columnheader', { name: header, exact: true })).toBeVisible();
            }
            await expect(table.getByRole('columnheader')).toHaveCount(expectedStrings(tc, 'headers').length);
            break;
          }

          case 'TC02':
          case 'TC03':
          case 'TC04':
          case 'TC13':
          case 'TC14':
          case 'TC15': {
            await fillCouponForm(page, tc);
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            const row = rowForCode(page, code!);
            await expect(row).toHaveCount(1);
            await expect(row).toBeVisible();
            for (const value of expectedStrings(tc, 'rowContains')) {
              await expect(row).toContainText(value);
            }
            break;
          }

          case 'TC05':
          case 'TC06':
          case 'TC07': {
            await fillCouponForm(page, tc);
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            const field = tc.id === 'TC05'
              ? page.getByRole('textbox', { name: 'Mã coupon (VD: SAVE10)' })
              : tc.id === 'TC06'
                ? page.getByRole('spinbutton', { name: 'Giá trị % (VD: 10)' })
                : page.getByPlaceholder('Ngày hết hạn');
            await expect(field).toBeVisible();
            await expect(field).toHaveValue(tc.id === 'TC05' ? '' : tc.id === 'TC06' ? '' : '');
            await expect(field).toHaveJSProperty('validationMessage', expectedString(tc, 'errorMessage'));
            break;
          }

          case 'TC08':
          case 'TC18': {
            await fillCouponForm(page, tc);
            const dialogPromise = page.waitForEvent('dialog');
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            const dialog = await dialogPromise;
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBe(expectedString(tc, 'alertMessage'));
            await dialog.dismiss();
            break;
          }

          case 'TC09': {
            await fillCouponForm(page, tc);
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            const field = page.getByRole('spinbutton', { name: 'Số lần dùng tối đa/người' });
            await expect(field).toHaveValue('0');
            await expect(field).toHaveJSProperty('validationMessage', expectedString(tc, 'errorMessage'));
            break;
          }

          case 'TC10':
          case 'TC11':
          case 'TC12':
          case 'TC16':
          case 'TC17': {
            await fillCouponForm(page, tc);
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            await expect(rowForCode(page, code!)).toHaveCount(0);
            break;
          }

          case 'TC19': {
            await fillCouponForm(page, tc);
            await page.getByRole('button', { name: 'Tạo mã' }).click();
            const row = rowForCode(page, code!);
            await expect(row).toBeVisible();
            const dialogPromise = page.waitForEvent('dialog');
            await row.getByRole('button', { name: 'Xóa' }).click();
            const dialog = await dialogPromise;
            expect(dialog.type()).toBe('confirm');
            await dialog.dismiss();
            await expect(row).toBeVisible();
            break;
          }

          default:
            throw new Error(`Unimplemented automated case ${tc.id}`);
        }
      } finally {
        if (code && !['TC08', 'TC18'].includes(tc.id)) {
          await deleteIfPresent(page, code);
        }
      }
    });
  }
});
