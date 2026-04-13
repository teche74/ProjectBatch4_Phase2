const BasePage = require('./basePage');

class DiscountPage extends BasePage {
  constructor(page) {
    super(page);

    this.pageTitle = page.locator('h1:has-text("Discounts")');
  }

  async navigateToDiscounts() {
    await this.page.goto('https://admin-demo.nopcommerce.com/Admin/Discount/List');

    await this.pageTitle.waitFor({ state: 'visible' });
  }

  async isPageLoaded() {
    return await this.pageTitle.isVisible();
  }
}

module.exports = DiscountPage;
