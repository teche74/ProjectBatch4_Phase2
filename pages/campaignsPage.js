const BasePage = require('./basePage');

class CampaignsPage extends BasePage {
  constructor(page) {
    super(page);


    this.sideBarToggle = page.locator('#nopSideBarPusher');

    this.promotionsMenu = page.locator("//p[normalize-space()='Promotions']/ancestor::a");
    this.campaignsSection = page.locator("//p[normalize-space()='Campaigns']/ancestor::a");

    this.pageTitle = page.getByText('Campaigns', { exact: true }).first();
    this.addNewButton = page.locator("//a[normalize-space()='Add new']");

    this.nameInput = page.locator('#Name');
    this.subjectInput = page.locator('#Subject');
    this.bodyInput = page.locator('#Body');
    this.saveButton = page.locator("//button[@name='save']");
    this.paginationInfo = page.locator('#campaigns-grid_info');


    this.rows = page.locator("//table[@id='campaigns-grid']//tbody//tr");


    this.deleteButton = page.locator("//span[normalize-space()='Delete']");
    this.confirmDeleteButton = page.locator("//button[normalize-space()='Delete']");
  }

  async navigateToCampaigns() {
    await this.click(this.promotionsMenu);
    
    if (await this.campaignsSection.isVisible().catch(() => false)) {
      await this.campaignsSection.click();
    } else {
      await this.page.goto('https://admin-demo.nopcommerce.com/Admin/Campaign/List');
    }

    // await expect(this.pageTitle).toBeVisible();
  }

  async isPageLoaded() {
    return await this.pageTitle.isVisible();
  }

  async getCampaignCount() {
        await this.paginationInfo.waitFor({ state: 'visible' });
        const infoText = await this.paginationInfo.textContent();
        const match = infoText.match(/of\s+(\d+)\s+items/);
        return match ? parseInt(match[1], 10) : await this.rows.count();
  }

  async addCampaign(name, subject, body) {
    await this.click(this.addNewButton);

    await this.fill(this.nameInput, name);
    await this.fill(this.subjectInput, subject);
    await this.fill(this.bodyInput, body);

    await this.click(this.saveButton);

    await this.page.waitForLoadState('networkidle');
  }

  async deleteLastCampaign() {
    const count = await this.rows.count();
    if (count === 0) return;

    const lastRow = this.rows.nth(count - 1);
    const editBtn = lastRow.locator('a[href*="Edit"]');

    await this.click(editBtn);
    await this.click(this.deleteButton);
    await this.click(this.confirmDeleteButton);

    await this.waitForVisible(this.pageTitle);
  }

  async deleteByName(name) {
    const row = this.rows.filter({ hasText: name }).first();

    if (await row.count() === 0) return;

    const editBtn = row.locator("a:has-text('Edit')");
    await this.click(editBtn);

    await this.click(this.deleteButton);
    await this.click(this.confirmDeleteButton);

    await this.waitForVisible(this.pageTitle);
  }
}

module.exports = CampaignsPage;