const { test, expect } = require('./fixtures');
const DiscountListPage = require('../pages/discountListPage');
const DiscountDetailsPage = require('../pages/discountDetailsPage');

test('Discount Section - Full E2E Flow', async ({ discountPage }) => {
    const page = discountPage;
    const list = new DiscountListPage(page);
    const details = new DiscountDetailsPage(page);

    const discountName = `Batch4_Discount_${Date.now()}`;

    await list.clickAddNew();
    await details.fillDiscountDetails(discountName, 20);
    await details.save();
    await expect(details.successAlert).toBeVisible();

    await page.goto('https://admin-demo.nopcommerce.com/Admin/Discount/List');
    await list.searchDiscount(discountName);
    await list.editBtn.first().click();
    
    await details.delete();
    await expect(details.successAlert).toContainText('deleted');
});
