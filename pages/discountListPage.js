const BasePage = require('./basePage');

class DiscountListPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchNameField = page.locator('#SearchDiscountName');
    this.searchBtn = page.locator('#search-discounts');

    this.addNewBtn = page.locator('a.btn-primary');

    this.grid = page.locator('#discounts-grid');

    this.successMessage = page.locator('.alert-success');
  }

  async search(name) {
    await this.fill(this.searchNameField, name);
    await this.click(this.searchBtn);

    await this.grid.waitFor({ state: 'visible' });
  }

  async clickAddNew() {
    await this.addNewBtn.waitFor({ state: 'visible', timeout: 10000 });
    await this.click(this.addNewBtn);
  }

  async clickEdit() {
    const editBtn = this.page.locator('#discounts-grid tbody tr td a:has-text("Edit")').first();

    await editBtn.waitFor({ state: 'visible', timeout: 10000 });
    await editBtn.click();
  }

  async isGridVisible() {
    return await this.grid.isVisible();
  }

  async isSuccessMessageDisplayed() {
    return await this.successMessage.isVisible();
  }
}

module.exports = DiscountListPage;
