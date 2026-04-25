const { chromium } = require('@playwright/test');
const { LoginPage } = require('./pages/LoginPage');
const config = require('./playwright.config');
require('dotenv').config(); //reads .env file

module.exports = async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    const loginPage = new LoginPage(page);

    await page.goto(`${config.use.baseURL}/web/index.php/auth/login`);
    await loginPage.login(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);
    await page.waitForURL('**/dashboard**', { timeout: 10000 });

    await page.context().storageState({ path: '.auth/user.json' });
  } catch (error) {
    throw new Error(`Global setup failed during login: ${error.message}`);
  } finally {
    await browser.close();
  }
};