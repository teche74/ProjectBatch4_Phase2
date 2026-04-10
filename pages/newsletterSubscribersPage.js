const BasePage = require('./basePage');
const { expect } = require('@playwright/test');

class NewsletterSubscribersPage extends BasePage {
  constructor(page) {
    super(page);

    this.promotionsMenu = this.page.locator('a.nav-link:has-text("Promotions")');
    this.newsletterSection = this.page.locator('a.nav-link[href*="NewsLetterSubscription"]');
    this.pageTitle = this.page.locator('h1:has-text("Newsletter subscribers")');
  }

  async navigateToSubscribers() {
    await this.promotionsMenu.click();


    if (await this.newsletterSection.isVisible().catch(() => false)) {
      await this.newsletterSection.click();
    } else {
      await this.page.goto('https://admin-demo.nopcommerce.com/Admin/NewsLetterSubscription/List');
    }

    await expect(this.pageTitle).toBeVisible();
  }

  async isPageLoaded() {
    await expect(this.pageTitle).toBeVisible();
  }
}

module.exports = NewsletterSubscribersPage;