const { test, expect } = require('../fixtures/baseTest');

const DiscountPage = require('../pages/discountPage');
const DiscountListPage = require('../pages/discountListPage');
const DiscountDetailsPage = require('../pages/discountDetailsPage');

test('Discount Full Flow - End to End', async ({ page , loginPage }) => {

  const discountPage = new DiscountPage(page);
  const discountListPage = new DiscountListPage(page);
  const discountDetailsPage = new DiscountDetailsPage(page);

  await loginPage.login('admin@yourstore.com', 'admin');

  await discountPage.navigateToDiscounts();
  expect(await discountPage.isPageLoaded()).toBeTruthy();

  await discountListPage.clickAddNew();

  const discountName = `discount_${Date.now()}`;

  await discountDetailsPage.enterName(discountName);
  await discountDetailsPage.setPercentage(10);
  await discountDetailsPage.clickSave();

  expect(await discountDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();

  await discountPage.navigateToDiscounts();
  await discountListPage.search(discountName);

  expect(await discountListPage.isGridVisible()).toBeTruthy();

  await discountListPage.clickEdit();

  const updatedName = discountName + '_updated';

  await discountDetailsPage.enterName(updatedName);
  await discountDetailsPage.setPercentage(20);
  await discountDetailsPage.clickSave();

  expect(await discountDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();

  await discountPage.navigateToDiscounts();
  await discountListPage.search(updatedName);
  await discountListPage.clickEdit();

  await discountDetailsPage.deleteDiscount();

  expect(await discountDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();
});
