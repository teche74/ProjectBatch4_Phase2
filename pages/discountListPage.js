const BasePage = require('./basePage');

class DiscountListPage extends BasePage {
    constructor(page) {
        super(page);
        this.addNewBtn = page.locator('a.btn-primary:has-text("Add new")');
        this.searchNameInput = page.locator('#SearchDiscountName');
        this.searchBtn = page.locator('#search-discounts');
        this.editBtn = page.locator('a.btn-default:has-text("Edit")');
    }

    async clickAddNew() {
        await this.addNewBtn.click();
    }

    async searchDiscount(name) {
        await this.searchNameInput.fill(name);
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }
}
module.exports = DiscountListPage;
