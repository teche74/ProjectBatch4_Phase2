const BasePage = require('./basePage');

class DiscountDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    this.nameField = page.locator('#Name');
    this.usePercentageCheckbox = page.locator('#UsePercentage');
    this.discountPercentage = page.locator('#DiscountPercentage');

    this.saveBtn = page.locator('button[name="save"]');

    this.deleteBtn = page.locator('#discount-delete');
    this.confirmDeleteBtn = page.locator('.modal-dialog .btn-danger');

    this.successMessage = page.locator('.alert-success');
  }

  async enterName(name) {
    await this.fill(this.nameField, name);
  }

  async setPercentage(value) {
    const isChecked = await this.usePercentageCheckbox.isChecked();

    if (!isChecked) {
      await this.usePercentageCheckbox.check();
    }

    await this.fill(this.discountPercentage, value.toString());
  }

  async clickSave() {
    await this.click(this.saveBtn);
  }

  async deleteDiscount() {
    await this.click(this.deleteBtn);

    await this.confirmDeleteBtn.waitFor({ state: 'visible' });
    await this.click(this.confirmDeleteBtn);
  }

  async isSuccessMessageDisplayed() {
    return await this.successMessage.isVisible();
  }
}

module.exports = DiscountDetailsPage;
