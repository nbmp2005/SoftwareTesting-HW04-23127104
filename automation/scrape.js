const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  console.log("Navigating to http://localhost:5173/forgot-password...");
  try {
    await page.goto('http://localhost:5173/forgot-password', { timeout: 10000 });
  } catch (e) {
    console.error("Failed to navigate:", e);
    await browser.close();
    process.exit(1);
  }

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

  console.log("Inputs found:", JSON.stringify(inputs, null, 2));
  console.log("Buttons found:", JSON.stringify(buttons, null, 2));

  // Try submitting empty
  const submitBtn = await page.$('button[type="submit"]');
  if (submitBtn) {
    await submitBtn.click();
    await page.waitForTimeout(1000);
  } else {
    // try to find by text
    const loginBtn = await page.getByText(/Gửi OTP/i);
    if (loginBtn) await loginBtn.click();
    await page.waitForTimeout(1000);
  }
  
  const texts = await page.$$eval('*', els => {
    return els.map(e => e.textContent?.trim()).filter(t => t && t.length > 0 && t.length < 50);
  });
  
  console.log("Texts on screen after empty submit:", [...new Set(texts)].join(" | "));

  await browser.close();
})();
