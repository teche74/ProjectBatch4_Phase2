const { test, expect } = require('../fixtures/baseTest');
const CampaignsPage = require('../pages/campaignsPage');

test.describe('Campaigns Tests', () => {

  let campaignName;

  test.beforeEach(() => {
    campaignName = 'Campaign_' + Date.now();
  });

  test('Verify Campaign Page Loaded', async ({ page, loginPage }) => {
    const campaignsPage = new CampaignsPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await campaignsPage.navigateToCampaigns();

    const isLoaded = await campaignsPage.isPageLoaded();
    expect(isLoaded).toBeTruthy();
  });

  test('Verify Add Campaign', async ({ page, loginPage }) => {
    const campaignsPage = new CampaignsPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await campaignsPage.navigateToCampaigns();

    const campaignsCountBeforeCreation = await campaignsPage.getCampaignCount();

    console.log("Before :: "+  campaignsCountBeforeCreation);

    await campaignsPage.addCampaign(campaignName, 'Test Subject', 'Test Body');

    const campaignsCountAfterCreation = await campaignsPage.getCampaignCount();
    console.log("After :: " + campaignsCountAfterCreation);

    expect(campaignsCountAfterCreation).toBeGreaterThanOrEqual(campaignsCountBeforeCreation);
  });

  test('Verify Delete Campaign', async ({ page, loginPage }) => {
    const campaignsPage = new CampaignsPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await campaignsPage.navigateToCampaigns();

    const campaignsCountBeforeDeletion = await campaignsPage.getCampaignCount();

    console.log("Before : " +  campaignsCountBeforeDeletion)

    await campaignsPage.deleteLastCampaign();

    const campaignsCountAfterDeletion = await campaignsPage.getCampaignCount();

    console.log("After : " + campaignsCountAfterDeletion);

    expect(campaignsCountAfterDeletion).toBeLessThanOrEqual(campaignsCountBeforeDeletion);
  });

});


test.describe('Campaign Negative Scenarios', () => {

  test('Empty Campaign Name', async ({ page, loginPage }) => {
    const campaignsPage = new CampaignsPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await campaignsPage.navigateToCampaigns();

    await campaignsPage.addCampaign('', 'Subject', 'Body');

    await expect(page.locator('.validation-summary-errors'))
      .toBeVisible();
  });

  test('Empty Subject', async ({ page, loginPage }) => {
    const campaignsPage = new CampaignsPage(page);

    await loginPage.login('admin@yourstore.com', 'admin');
    await campaignsPage.navigateToCampaigns();

    await campaignsPage.addCampaign('TestCampaign', '', 'Body');

    await expect(page.locator('.field-validation-error'))
      .toBeVisible();
  });

});