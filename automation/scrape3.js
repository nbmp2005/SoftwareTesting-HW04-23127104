const { chromium } = require('playwright');

const testEmails = ['admin@example.com', 'test@test.com', 'user@test.com', 'admin@admin.com', 'customer@test.com'];

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  for (const email of testEmails) {
    const responses = [];
    const handler = async (resp) => {
      if (resp.url().includes(':3000')) {
        try { responses.push({ url: resp.url(), status: resp.status(), body: (await resp.text()).substring(0, 200) }); } catch {}
      }
    };
    page.on('response', handler);

    await page.goto('http://localhost:5173/forgot-password', { waitUntil: 'networkidle' });
    await page.locator('input[type="text"]').fill(email);
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
    await page.waitForTimeout(2000);

    page.off('response', handler);

    const bodyText = await page.evaluate(() => document.body.innerText);
    console.log(`\n--- Email: ${email} ---`);
    console.log('API:', JSON.stringify(responses));
    console.log('Body:', bodyText.replace(/\n/g, ' ').trim());
  }

  await browser.close();
})().catch(err => console.error(err.message));
