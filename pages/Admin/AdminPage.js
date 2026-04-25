const { expect } = require('@playwright/test');

class AdminPage {
  constructor(page) {
    this.page = page;

    this.adminMenu = page.getByRole('link', { name: 'Admin' });
    this.header = page.locator('.oxd-topbar-header-breadcrumb');
  }

  async open() {
    await this.page.goto('/web/index.php/dashboard/index');
    await this.adminMenu.click();
    await this.page.waitForURL('**/admin/**');
  }

  async expectLoaded() {
    await expect(this.header).toBeVisible();
  }
}

module.exports = { AdminPage };