class BasePage {
  constructor(page) {
    this.page = page;
  }

  async click(locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  async fill(locator, value) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill(value);
  }

  async waitForVisible(locator) {
    await locator.waitFor({ state: 'visible' });
  }
}

module.exports = BasePage;