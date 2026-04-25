const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../../pages/LoginPage');

// Clears the global auth
test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {

  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // Happy path
  test('should log-in successfully with valid credentials', async ({ page }) => {
    await loginPage.login(process.env.ADMIN_USER, process.env.ADMIN_PASSWORD);

    await page.waitForURL('**/dashboard**');

    await expect(
      page.getByRole('heading', { name: 'Dashboard' })
    ).toBeVisible();
  });

  //Error cases
  test('should show error with wrong password', async ({ page }) => {
    await loginPage.login(process.env.ADMIN_USER, 'wrongpassword');

    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should show error with wrong username', async ({ page }) => {
    await loginPage.login('wronguser', process.env.ADMIN_PASSWORD);

    await expect(loginPage.invalidCredentialsError).toBeVisible();
  });

  test('should show error with empty fields', async ({ page }) => {
    await loginPage.login('', '');

    await expect(loginPage.usernameError).toBeVisible();
    await expect(loginPage.passwordError).toBeVisible();
  });

  test('should show error with empty username only', async ({ page }) => {
    await loginPage.login('', process.env.ADMIN_PASSWORD);

    await expect(loginPage.usernameError).toBeVisible();
  });

  test('should show error with empty password only', async ({ page }) => {
    await loginPage.login(process.env.ADMIN_USER, '');

    await expect(loginPage.passwordError).toBeVisible();
  });

});