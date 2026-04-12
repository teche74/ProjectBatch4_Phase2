const BasePage = require('./basePage');

class SubscriptionPage extends BasePage {
  constructor(page) {
    super(page);

    this.promotionsMenu = page.locator('a.nav-link:has-text(" Promotions ")');
    this.subscriptionTypesLink = page.locator('a.nav-link[href*="NewsLetterSubscriptionType"]');
    this.pageTitle = page.locator('h1:has-text("Subscription types")');

    this.addNewButton = page.locator("//a[normalize-space()='Add new']");
    this.saveButton = page.locator("//button[@name='save']");

    this.nameInput = page.locator('#Name');
    this.displayOrderInput = page.locator('#DisplayOrder');
    this.tickedCheckbox = page.locator('#TickedByDefault');


    this.storeDropdown = page.locator("//span[@role='combobox']");
    this.searchInput = page.locator("//input[@class='select2-search__field']");
    this.storeOption = page.locator("//li[contains(text(),'nopCommerce admin demo store')]");

    this.rows = page.locator("//table[@id='subscriptiontypes-grid']//tbody//tr");
    this.paginationInfo = page.locator('#subscriptiontypes-grid_info');


    this.deleteButton = page.locator("//span[normalize-space()='Delete']");

    this.confirmDeleteButton = page.locator("//button[normalize-space()='Delete']");
  }

  async navigateToSubscriptionTypes() {
    await this.promotionsMenu.click();

    if (await this.subscriptionTypesLink.isVisible().catch(() => false)) {
      await this.subscriptionTypesLink.click();
    } else {
      await this.page.goto('https://admin-demo.nopcommerce.com/Admin/NewsLetterSubscriptionType/List');
    }

    await this.page.waitForLoadState('networkidle');
  }

  async isPageLoaded() {
    return await this.pageTitle.isVisible();
  }

  async getRowCount() {
    await this.paginationInfo.waitFor({ state: 'visible' });
    const infoText = await this.paginationInfo.textContent();
    const match = infoText.match(/of\s+(\d+)\s+items/);
    return match ? parseInt(match[1], 10) : await this.rows.count();
  }

  async addEntry(name, displayOrder) {
    await this.click(this.addNewButton);

    await this.fill(this.nameInput, name);
    await this.selectStore();
    await this.fill(this.displayOrderInput, displayOrder);

    await this.click(this.tickedCheckbox);
    await this.click(this.saveButton);

    await this.page.waitForLoadState('networkidle');
  }

  async selectStore() {
    await this.click(this.storeDropdown);
    await this.fill(this.searchInput, "nopCommerce admin demo store");
    await this.click(this.storeOption);
  }

  async deleteLastEntry() {
    const count = await this.rows.count();

    if (count === 0) {
      console.log("No records to delete");
      return;
    }

    const lastRow = this.rows.nth(count - 1);
    const editBtn = lastRow.locator('a[href*="Edit"]');

    await this.click(editBtn);
    await this.click(this.deleteButton);
    await this.click(this.confirmDeleteButton);

    await this.page.waitForLoadState('networkidle');
  }

  async deleteByName(name) {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      const text = await row.textContent();

      if (text.includes(name)) {
        const editBtn = row.locator('a[href*="Edit"]');
        await this.click(editBtn);

        await this.click(this.deleteButton);
        await this.click(this.confirmDeleteButton);
        break;
      }
    }
  }

  async editByName(name, newName) {
    const count = await this.rows.count();

    for (let i = 0; i < count; i++) {
      const row = this.rows.nth(i);
      const text = await row.textContent();

      if (text.includes(name)) {
        const editBtn = row.locator('a[href*="Edit"]');
        await this.click(editBtn);

        await this.fill(this.nameInput, newName);
        await this.click(this.saveButton);
        break;
      }
    }
  }
}

module.exports = SubscriptionPage;