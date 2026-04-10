const { test: base } = require('@playwright/test');
const LoginPage = require('../pages/loginPage');

const test = base.extend({
  loggedInPage: async ({ page }, use) => {
    const login = new LoginPage(page);

    await page.goto('https://admin-demo.nopcommerce.com/Admin');
    await login.login('admin@yourstore.com', 'admin');

    await use(page);
  },
});

module.exports = { test };