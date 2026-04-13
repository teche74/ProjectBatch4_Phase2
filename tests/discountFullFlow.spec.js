const { test, expect } = require('../fixtures/baseTest');

const LoginPage = require('../pages/loginPage');
const DiscountPage = require('../pages/discountPage');
const DiscountListPage = require('../pages/discountListPage');
const DiscountDetailsPage = require('../pages/discountDetailsPage');

test('Discount Full Flow - End to End', async ({ page }) => {

  const login = new LoginPage(page);
  const nav = new DiscountPage(page);
  const list = new DiscountListPage(page);
  const details = new DiscountDetailsPage(page);

  await page.goto('https://admin-demo.nopcommerce.com/login');
  await login.login('admin@yourstore.com', 'admin');

  await nav.navigateToDiscounts();
  expect(await nav.isPageLoaded()).toBeTruthy();

  await list.clickAddNew();

  const discountName = `discount_${Date.now()}`;

  await details.enterName(discountName);
  await details.setPercentage(10);
  await details.clickSave();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();

  await nav.navigateToDiscounts();
  await list.search(discountName);

  expect(await list.isGridVisible()).toBeTruthy();

  await list.clickEdit();

  const updatedName = discountName + '_updated';

  await details.enterName(updatedName);
  await details.setPercentage(20);
  await details.clickSave();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();

  await nav.navigateToDiscounts();
  await list.search(updatedName);
  await list.clickEdit();

  await details.deleteDiscount();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();
});
