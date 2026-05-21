const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

  await page.goto('http://localhost:8080/analytics');
  
  // Wait for the splash screen to finish
  await new Promise(r => setTimeout(r, 4000));
  
  // Enter district
  const inputSelector = 'input[placeholder*="district"]';
  await page.waitForSelector(inputSelector);
  await page.type(inputSelector, 'Muzaffarnagar');
  
  // Upload image
  const fileInputSelector = 'input[type="file"]';
  await page.waitForSelector(fileInputSelector, { hidden: true });
  
  // Create a dummy image
  const buffer = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==', 'base64');
  fs.writeFileSync('dummy.png', buffer);
  
  const fileInput = await page.$(fileInputSelector);
  await fileInput.uploadFile('dummy.png');
  
  // Wait a bit to see if it blanks
  await new Promise(r => setTimeout(r, 1000));
  
  // Click analyze
  const analyzeBtn = await page.$$("::-p-xpath(//button[contains(., 'Analyze') or contains(., 'विश्लेषण')])");
  if (analyzeBtn.length > 0) {
    await analyzeBtn[0].click();
  } else {
    console.log("Analyze button not found");
  }
  
  // Wait for analysis to complete or crash
  await new Promise(r => setTimeout(r, 3000));
  
  await page.screenshot({ path: 'debug_screenshot.png' });
  console.log("Screenshot saved.");
  
  await browser.close();
})();
