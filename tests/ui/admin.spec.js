const { test } = require('@playwright/test');
const { AdminPage } = require('../../pages/admin/AdminPage');

test('admin module loads correctly', async ({ page }) => {
  const admin = new AdminPage(page);

  await admin.open();
  await admin.expectLoaded();
});