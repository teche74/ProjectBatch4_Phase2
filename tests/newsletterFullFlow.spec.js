const { test, expect } = require('../fixtures/baseTest');

const NewsletterSubscribersPage = require('../pages/newsletterSubscribersPage');
const NewsletterListPage = require('../pages/newsletterListPage');
const NewsletterDetailsPage = require('../pages/newsletterDetailsPage');

test('Newsletter Full Flow - End to End', async ({ page , loginPage}) => {

  const nav = new NewsletterSubscribersPage(page);
  const list = new NewsletterListPage(page);
  const details = new NewsletterDetailsPage(page);

  await loginPage.login('admin@yourstore.com', 'admin');
  // await page.pause();

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



