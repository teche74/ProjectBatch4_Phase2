const BasePage = require('./basePage');

class NewsletterListPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailField = page.locator('#SearchEmail');
    this.searchBtn = page.locator('//button[normalize-space()="Search"]');
    this.addNewBtn = page.locator('//a[contains(normalize-space(),"Add new")]');
    this.exportBtn = page.getByRole('button', { name: 'Export to CSV' });
    this.importBtn = page.getByRole('button', { name: 'Import from CSV' });
    this.grid = page.locator('#newsletter-subscriptions-grid');
    this.fileUpload = page.locator('//input[@type="file"]');
    this.importSubmitBtn = page.locator('//div[contains(@class,"modal-footer")]//button[contains(.,"Import")]');
    this.successMessage = page.locator('//div[contains(@class,"alert-success")]');
  }

  async search(email) {
    await this.fill(this.emailField, email);
    await this.click(this.searchBtn);

    await this.grid.waitFor();
  }

  async clickAddNew() {
    await this.click(this.addNewBtn);
  }

  async clickEdit() {
    const editBtn = this.page.locator('(//a[normalize-space()="Edit"])[1]');
    await editBtn.click();
  }

  async exportCSV() {
    await this.click(this.exportBtn);
  }

  async importCSV(filePath) {
    await this.click(this.importBtn);
    await this.fileUpload.setInputFiles(filePath);
    await this.click(this.importSubmitBtn);
  }

  async isGridVisible() {
    return await this.grid.isVisible();
  }

  async isSuccessMessageDisplayed() {
    return await this.successMessage.isVisible();
  }
}

module.exports = NewsletterListPage;