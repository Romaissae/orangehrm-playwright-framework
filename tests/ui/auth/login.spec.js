const { test, expect } = require('@playwright/test');

test('dashboard is visible for logged user', async ({ page }) => {
  await page.goto('web/index.php/dashboard/index');

  await expect(
    page.locator('.oxd-topbar-header-title')
  ).toContainText('Dashboard');
});