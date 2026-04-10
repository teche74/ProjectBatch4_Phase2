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

  //Assert
  await expect(page).toHaveURL(/admin/i);

 
  await nav.navigateToSubscribers();
  await expect(nav.pageTitle).toBeVisible();
  await expect(nav.pageTitle).toHaveText(/Newsletter subscribers/i);

  // NEGATIVE CASE: Empty Email
  await list.clickAddNew();
  await details.clickSave();

  const errorMsg = page.locator('.field-validation-error');

  await expect(errorMsg).toBeVisible();
  await expect(errorMsg).toContainText(/required/i);

  
  await nav.navigateToSubscribers();

  await list.clickAddNew();

  const email = `test${Date.now()}@mail.com`;

  await details.enterEmail(email);
  await details.setActiveRadio(true);
  await details.clickSave();

 
  await expect(details.successMessage).toBeVisible();
  await expect(details.successMessage).toContainText(/success/i);


  await nav.navigateToSubscribers();
  await list.search(email);

  await expect(list.grid).toBeVisible();
  await expect(list.grid).toContainText(email);

  
  await list.clickEdit();

  const isActive = await details.isActiveRadioChecked();

  await details.setActiveRadio(!isActive);
  await details.clickSave();

  
  await expect(details.successMessage).toBeVisible();
  await expect(details.successMessage).toContainText(/updated|success/i);

  await nav.navigateToSubscribers();
  await list.search(email);
  await list.clickEdit();

  await details.deleteSubscriber();


  await expect(details.successMessage).toBeVisible();
  await expect(details.successMessage).toContainText(/deleted|success/i);

  
  await nav.navigateToSubscribers();

  const path = require('path');
  const filePath = path.join(__dirname, '../test-data/newsletter.csv');

  await list.importCSV(filePath);

 
  await expect(list.successMessage).toBeVisible();
  await expect(list.successMessage).toContainText(/imported|success/i);

  
  await list.exportCSV();

});