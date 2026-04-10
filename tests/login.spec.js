const { test, expect } = require('./baseTest');
const LoginPage = require('../pages/loginPage');

test('Login Test - Verify Dashboard', async ({ page }) => {

  const login = new LoginPage(page);

  await page.goto('https://admin-demo.nopcommerce.com/Admin');
  await login.login('admin@yourstore.com', 'admin');

  await expect(page).toHaveURL(/dashboard/);
});