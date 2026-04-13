const { test, expect } = require('../fixtures/baseTest');
const SubscriptionPage = require('../pages/subscriptionPage');

test.describe('Subscription Types Tests', () => {

  let testName;

  test.beforeEach(() => {
    testName = 'TestUser_' + Date.now();
  });

  test('Verify Page Loads', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    const isLoaded = await subscriptionPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('Verify Add Subscription Type', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    const countBeforeAddingSubscription = await subscriptionPage.getRowCount();

    await subscriptionPage.addEntry(testName, "5");

    const countAfterAddingSubscription = await subscriptionPage.getRowCount();

    expect(countAfterAddingSubscription).toBeGreaterThan(countBeforeAddingSubscription);
  });

  test('Verify Delete Subscription Type', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    const countBeforeDeletingSubscription = await subscriptionPage.getRowCount();

    await subscriptionPage.deleteLastEntry();
    console.log("Before :: " +countBeforeDeletingSubscription)

    const countAfterDeletingSubscription = await subscriptionPage.getRowCount();
    console.log("After :: " +countAfterDeletingSubscription)


    expect(countAfterDeletingSubscription).toBeLessThan(countBeforeDeletingSubscription);
  });

});


test.describe('Negative Scenarios', () => {

  test('Empty Name', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    await subscriptionPage.addEntry('', '5');

    await expect(page.locator('.validation-summary-errors'))
      .toBeVisible();
  });

  test('Invalid Display Order', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    await subscriptionPage.addEntry('InvalidTest', 'abc');

    await expect(page.locator('.field-validation-error'))
      .toBeVisible();
  });

  test('Duplicate Name', async ({ page, loginPage }) => {
    const subscriptionPage = new SubscriptionPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await subscriptionPage.navigateToSubscriptionTypes();

    const name = 'DuplicateTest';

    await subscriptionPage.addEntry(name, '5');
    await subscriptionPage.addEntry(name, '5');

    await expect(page.locator('body'))
      .toContainText('already exists');
  });

});
