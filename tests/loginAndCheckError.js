const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));

  await page.goto('http://localhost:5173/login');
  
  await page.type('#email', 'neflahela@gmail.com');
  await page.type('#password', '1234');
  await page.click('button[type="submit"]');

  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  
  console.log("On page: ", page.url());
  
  // wait another second for js
  await new Promise(r => setTimeout(r, 1000));
  
  await browser.close();
})();
