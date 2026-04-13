const { test, expect } = require('../fixtures/baseTest');

test.describe('Login Functionality', () => {

  test('Login with valid Credentials', async ({ page, loginPage }) => {
    await loginPage.login('admin@yourstore.com', 'admin');
    await expect(page).toHaveURL(/Admin/);
    await expect(loginPage.dashboardHeader).toHaveText('Dashboard');
  });

  test('Login with Invalid Credentials', async ({ page, loginPage }) => {
    await loginPage.login('admin@yourstore.com', 'wrong');
    await expect(loginPage.errorMessage).toBeVisible();
  });

});