const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  use: {
    headless: true,
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    viewport: { width: 1280, height: 720 },
    storageState: '.auth/user.json',
  },

  globalSetup: require.resolve('./global-setup'),

});