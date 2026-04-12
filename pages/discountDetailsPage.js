const BasePage = require('./basePage');

class DiscountDetailsPage extends BasePage {
    constructor(page) {
        super(page);
        this.nameInput = page.locator('#Name');
        this.usePercentageCheckbox = page.locator('#UsePercentage');
        this.discountPercentage = page.locator('#DiscountPercentage');
        this.saveBtn = page.locator('button[name="save"]');
        this.deleteBtn = page.locator('#discount-delete');
        this.confirmDeleteBtn = page.locator('button.btn-danger[type="submit"]');
        this.successAlert = page.locator('.alert-success');
    }

    async fillDiscountDetails(name, percentage) {
        await this.nameInput.fill(name);
        const isChecked = await this.usePercentageCheckbox.isChecked();
        if (!isChecked) await this.usePercentageCheckbox.check();
        await this.discountPercentage.fill(percentage.toString());
    }

    async save() {
        await this.saveBtn.click();
    }

    async delete() {
        await this.deleteBtn.click();
        await this.confirmDeleteBtn.click();
    }
}
module.exports = DiscountDetailsPage;
