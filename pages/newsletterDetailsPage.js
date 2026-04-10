const BasePage = require('./basePage');

class NewsletterDetailsPage extends BasePage {
  constructor(page) {
    super(page);

    this.emailField = page.locator('#Email');
    this.saveBtn = page.locator('button[name="save"]');
    this.deleteBtn = page.locator('//span[contains(normalize-space(),"Delete")]');
    this.confirmDeleteBtn = page.locator('//div[@class="modal-footer"]//button');
    this.successMessage = page.locator('//div[contains(@class,"alert-success")]');
    this.activeRadio = page.locator('#Active');
  }

  async enterEmail(email) {
    await this.fill(this.emailField, email);
  }


  async isActiveRadioChecked(){
    await this.activeRadio.isVisible();
    return await this.activeRadio.isChecked();
  }

  async clickSave() {
    await this.click(this.saveBtn);
  }

  async setActiveRadio(state) {
    if (state) {
      if (!(await this.activeRadio.isChecked())) {
        await this.activeRadio.check();
      }
    } else {
      if (await this.activeRadio.isChecked()) {
        await this.activeRadio.uncheck();
      }
    }
  }

  async deleteSubscriber() {
    await this.click(this.deleteBtn);
    await this.click(this.confirmDeleteBtn);
  }

  async isSuccessMessageDisplayed() {
      return await this.successMessage.isVisible();
  }
}

module.exports = NewsletterDetailsPage;