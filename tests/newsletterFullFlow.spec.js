const { test, expect } = require('@playwright/test');

const LoginPage = require('../pages/loginPage');
const NewsletterSubscribersPage = require('../pages/newsletterSubscribersPage');
const NewsletterListPage = require('../pages/newsletterListPage');
const NewsletterDetailsPage = require('../pages/newsletterDetailsPage');

test('Newsletter Full Flow - End to End', async ({ page }) => {

  const login = new LoginPage(page);
  const nav = new NewsletterSubscribersPage(page);
  const list = new NewsletterListPage(page);
  const details = new NewsletterDetailsPage(page);


  await login.goto();
  await login.login('admin@yourstore.com', 'admin');

  await nav.navigateToSubscribers();
  expect(nav.isPageLoaded()).toBeTruthy();

  await list.clickAddNew();

  const email = `test${Date.now()}@mail.com`;

  await details.enterEmail(email);
  await details.clickSave();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();

  await nav.navigateToSubscribers();
  await list.search(email);

  expect(await list.isGridVisible()).toBeTruthy();

  await list.clickEdit();


  const isActive = await details.isActiveRadioChecked();

  console.log("Current Active State:", isActive);

  await details.setActiveRadio(!isActive);

  await details.clickSave();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();

  await nav.navigateToSubscribers();
  await list.search(email);
  await list.clickEdit();

  await details.deleteSubscriber();

  expect(await details.isSuccessMessageDisplayed()).toBeTruthy();

  await nav.navigateToSubscribers();

  await list.importCSV('test-data/newsletter.csv');

  expect(await list.isSuccessMessageDisplayed()).toBeTruthy();

  await list.exportCSV();

});



