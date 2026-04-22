const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  
  use: {
    headless: true,
    baseURL: 'https://demo.realworld.io',
    viewport: { width: 1280, height: 720 }
  },

  globalSetup: require.resolve('./global-setup'),

  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    storageState: '.auth/user.json',
  }

});