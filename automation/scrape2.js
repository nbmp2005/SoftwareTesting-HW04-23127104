const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:5173/forgot-password');

  // Try invalid email
  await page.fill('input[type="text"]', 'invalid-email');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(500);

  let texts = await page.$$eval('*', els => els.map(e => e.textContent?.trim()).filter(t => t && t.length > 0 && t.length < 50));
  console.log("Texts after invalid email:", [...new Set(texts)].join(" | "));

  // Try valid email to go to step 2
  await page.fill('input[type="text"]', 'test@test.com');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000); // Wait for OTP to be sent

  texts = await page.$$eval('*', els => els.map(e => e.textContent?.trim()).filter(t => t && t.length > 0 && t.length < 50));
  console.log("Texts after valid email (Step 2?):", [...new Set(texts)].join(" | "));

  const inputs = await page.$$eval('input', elements => 
    elements.map(el => ({
      id: el.id,
      name: el.name,
      type: el.type,
      placeholder: el.placeholder,
      required: el.required
    }))
  );

  const buttons = await page.$$eval('button', elements => 
    elements.map(el => ({
      id: el.id,
      text: el.innerText.trim(),
      type: el.type
    }))
  );

  console.log("Inputs on Step 2:", JSON.stringify(inputs, null, 2));
  console.log("Buttons on Step 2:", JSON.stringify(buttons, null, 2));

  await browser.close();
})();
