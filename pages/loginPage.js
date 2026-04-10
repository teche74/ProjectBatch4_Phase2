const BasePage = require('./basePage');

class LoginPage extends BasePage {
  constructor(page) {
    super(page);

    this.email = page.locator('#Email');
    this.password = page.locator('#Password');
    this.loginBtn = page.locator('button[type="submit"]');
  }

  
  async goto() {
    await this.page.goto('https://admin-demo.nopcommerce.com/Admin');
  }

  async login(email, password) {
    await this.fill(this.email, email);
    await this.fill(this.password, password);
    await this.click(this.loginBtn);
  }
}

module.exports = LoginPage;