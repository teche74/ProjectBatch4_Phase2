const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.loginBtn = page.locator('button[type="submit"]');
    this.errorMessage = page.locator('.message-error.validation-summary-errors');
    this.dashboardHeader = page.getByRole('heading', { name: 'Dashboard' });
  }

  async login(email, password) {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.click(this.loginBtn);
  }
}

module.exports = LoginPage;