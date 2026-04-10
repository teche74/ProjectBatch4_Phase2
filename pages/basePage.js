class BasePage {
  constructor(page) {
    this.page = page;
  }

 async click(locator) {
  await locator.waitFor({ state: 'visible' });
  await locator.click();
}

  async fill(locator, value) {
    await locator.fill(value);
  }

  async waitFor(locator) {
    await locator.waitFor();
  }
}

module.exports = BasePage;