const { test: base, expect } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const test = base.extend({

  loginPage: async ({ page }, use) => {
    const login = new LoginPage(page);
    await page.goto('https://admin-demo.nopcommerce.com/Admin');
    await use(login);
  },

});

module.exports = { test, expect };