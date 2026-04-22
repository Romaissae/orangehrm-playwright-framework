const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');

module.exports = async () => {
  
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login('Admin', 'admin123');

  await page.waitForURL('**/dashboard**');

  await page.context().storageState({
    path: '.auth/user.json',
  });
  await browser.close();
};