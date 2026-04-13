const { test, expect } = require('../fixtures/baseTest');

const NewsletterSubscribersPage = require('../pages/newsletterSubscribersPage');
const NewsletterListPage = require('../pages/newsletterListPage');
const NewsletterDetailsPage = require('../pages/newsletterDetailsPage');

test('Newsletter Full Flow - End to End', async ({ page , loginPage}) => {

  const newsletterSubscribersPage = new NewsletterSubscribersPage(page);
  const newsletterListPage = new NewsletterListPage(page);
  const newsletterDetailsPage = new NewsletterDetailsPage(page);

  await loginPage.login('admin@yourstore.com', 'admin');
  // await page.pause();

  await newsletterSubscribersPage.navigateToSubscribers();
  expect(newsletterSubscribersPage.isPageLoaded()).toBeTruthy();

  await newsletterListPage.clickAddNew();

  const email = `test${Date.now()}@mail.com`;

  await newsletterDetailsPage.enterEmail(email);
  await newsletterDetailsPage.clickSave();

  expect(await newsletterDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();

  await newsletterSubscribersPage.navigateToSubscribers();
  await newsletterListPage.search(email);

  expect(await newsletterListPage.isGridVisible()).toBeTruthy();

  await newsletterListPage.clickEdit();


  const isActive = await newsletterDetailsPage.isActiveRadioChecked();

  console.log("Current Active State:", isActive);

  await newsletterDetailsPage.setActiveRadio(!isActive);

  await newsletterDetailsPage.clickSave();

  expect(await newsletterDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();

  await newsletterSubscribersPage.navigateToSubscribers();
  await newsletterListPage.search(email);
  await newsletterListPage.clickEdit();

  await newsletterDetailsPage.deleteSubscriber();

  expect(await newsletterDetailsPage.isSuccessMessageDisplayed()).toBeTruthy();

  await newsletterSubscribersPage.navigateToSubscribers();

  await newsletterListPage.importCSV('test-data/newsletter.csv');

  expect(await newsletterListPage.isSuccessMessageDisplayed()).toBeTruthy();

  await newsletterListPage.exportCSV();

});



