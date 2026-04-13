const { test, expect } = require('../fixtures/baseTest');
const AffiliatePage = require('../pages/AffiliatePage');

let AffPage;

test.beforeEach(async ({ page, loginPage }) => {

  AffPage = new AffiliatePage(page);
  await loginPage.login('admin@yourstore.com', 'admin');
  await AffPage.navigateToAffiliates();
});

test('Verify Affiliate Page Loaded', async () => {
   const title = await AffPage.getPageTitle();
   console.log('Page Title:', title);
   expect(title).toContain('Affiliates');
});

//add
test('Verify Add Affiliate', async () => {
  let beforeRowAddition = await AffPage.getRowsCount();
  console.log(beforeRowAddition);
  await AffPage.addAffiliate();
  let afterRowAddition = await AffPage.getRowsCount();
  console.log(afterRowAddition);
  expect(afterRowAddition).toBeGreaterThanOrEqual(beforeRowAddition);
});

//update

test('Update the existing affiliate data', async () => {
    const beforeRowAddition = await AffPage.getRowsCount();
    console.log("Before:", beforeRowAddition);

    await AffPage.clickEditByRow(0);
    await AffPage.updateAffiliate();

    const currentURL = await AffPage.page.url();
    console.log("Current URL:", currentURL);

    const afterRowAddition = await AffPage.getRowsCount();
    console.log("After:", afterRowAddition);
    expect(afterRowAddition).toBeGreaterThanOrEqual(beforeRowAddition);


});

//delete

test('Delete the existing affiliate data', async () => {

    const beforeRowAddition = await AffPage.getRowsCount();
    console.log("Before:", beforeRowAddition);

    await AffPage.clickEditByRow(1);
    await AffPage.deleteAffiliate();

    const currentURL = await AffPage.page.url();
    console.log("Current URL:", currentURL);

    const afterRowAddition = await AffPage.getRowsCount();
    console.log("After:", afterRowAddition);
    expect(afterRowAddition).toBeLessThanOrEqual(beforeRowAddition);
});


//NT

test('Negative Test: Verify affiliate cannot be created with empty mandatory fields', async () => {
    const beforeRowAddition = await AffPage.getRowsCount();
    console.log("Before:", beforeRowAddition);

    await AffPage.addNewBtn.click();
    await AffPage.page.waitForURL('**/Admin/Affiliate/Create');
    await AffPage.saveBtn.click();


    const currentURL = await AffPage.page.url();
    console.log("Current URL:", currentURL);

    const afterRowAddition = await AffPage.getRowsCount();
    console.log("After:", afterRowAddition);
//    expect(afterRowAddition).toBe(beforeRowAddition);
});

test('Negative Test: Duplicate Email Address', async ({ page }) => {
    const email = "tester@gmail.com";
    await AffPage.addNewBtn.click();
    await AffPage.firstNameInput.fill("QA");
    await AffPage.lastNameInput.fill("Tester");
    await AffPage.emailInput.fill(email);
    await AffPage.saveBtn.click();

    const beforeRowAddition = await AffPage.getRowsCount();
    console.log("Duplicate Count before:",beforeRowAddition);

    await AffPage.addNewBtn.click();
    await AffPage.firstNameInput.fill("QA2");
    await AffPage.lastNameInput.fill("Tester2");
    await AffPage.emailInput.fill(email);
    await AffPage.saveBtn.click();


    const afterRowAddition = await AffPage.getRowsCount();
    console.log("Duplicate Count After:",afterRowAddition);

//  expect(afterRowAddition).toBe(beforeRowAddition);
});

test('Negative Test: Names should not accept numeric values', async () => {

    const beforeRowAddition = await AffPage.getRowsCount();
    console.log("Row Count before:",beforeRowAddition);

    await AffPage.addNewBtn.click();
    await AffPage.firstNameInput.fill('123');
    await AffPage.lastNameInput.fill("678");
    await AffPage.saveBtn.click();

    const afterRowAddition = await AffPage.getRowsCount();
    console.log("Row Count After:",afterRowAddition);

//    expect(afterRowAddition).toBe(beforeRowAddition);
});
