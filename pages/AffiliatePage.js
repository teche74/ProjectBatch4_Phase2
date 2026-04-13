class AffiliatePage {
  constructor(page) {
    this.page = page;

                this.email = page.locator("#Email");
                this.password = page.locator('#Password');
                this.loginButton = page.locator("//button[@class= 'button-1 login-button']");
                this.promotionMenu = page.locator("//p[contains(text(),'Promotions')]");
                this.affiliatesMenu = page.locator("//p[contains(text(),'Affiliates')]");
                this.addNewBtn = page.locator("a[href='/Admin/Affiliate/Create']");
    //            this.addNewBtn = page.locator("//a[@class='btn btn-primary']");
                this.activeBtn = page.locator("#Active");
                this.firstNameInput = page.locator("#Address_FirstName");
                this.lastNameInput = page.locator("#Address_LastName");
                this.emailInput = page.locator("#Address_Email");
                this.companyName = page.locator("#Address_Company");
                this.countryName = page.locator("#Address_CountryId");
                this.provinceName = page.locator("#Address_StateProvinceId");
                this.regionName = page.locator("#Address_County");
                this.cityName = page.locator("#Address_City");
                this.addressName = page.locator("#Address_Address1");
                this.zipCode = page.locator("#Address_ZipPostalCode");
                this.phnNo = page.locator("#Address_PhoneNumber");
                this.saveBtn = page.locator("//button[@name='save']");
                this.saveEditBtn = page.locator("//button[@name='save-continue']");
                this.expandBtn = page.locator("//i[@class='fa toggle-icon fa-plus']");
                this.minimizeBtn = page.locator("//i[@class='fa toggle-icon fa-minus']");

    //            this.tableRows = page.locator("table tbody tr");

                this.tableRows = page.locator("//table//tbody/tr");
                this.editBtn = page.locator("//a[@class='btn btn-default']");
                this.deleteBtn = page.locator("#affiliate-delete");
                this.confirmDelete = page.locator("//button[@class='btn btn-danger float-right']");
  }

  async clickEditByRow(index) {
    await this.page
              .locator('#affiliates-grid tbody tr')
              .nth(index)
              .getByRole('link', { name: 'Edit' })
              .click();
    await this.page.waitForURL(/\/Admin\/Affiliate\/Edit\/\d+/);
  }

  async navigateToAffiliates() {
      await this.page.waitForURL(/\/Admin/);
      await this.promotionMenu.click();
      await this.affiliatesMenu.click();
    }
    async getPageTitle() {
      return await this.page.title();
    }

    async getRowsCount() {
      return await this.tableRows.count();
    }


    async addAffiliate() {
      await this.addNewBtn.click();

      await this.page.waitForURL(/\/Admin\/Affiliate\/Create/);

      if (await this.expandBtn.count() > 0) {
          await this.expandBtn.first().click();
      }


      await this.firstNameInput.fill("QA");
      await this.lastNameInput.fill("Tester");
      await this.emailInput.fill("test@gmail.com");
      await this.companyName.fill("Test Company");

      await this.countryName.selectOption("237");
      await this.provinceName.selectOption("1792");
      await this.regionName.fill("XYZ");
      await this.cityName.fill("ABC");
      await this.addressName.fill("XYZ street");
      await this.zipCode.fill("560018");
      await this.phnNo.fill("1234567890");
      await this.saveEditBtn.click();
      await this.saveBtn.click();
      }

    async updateAffiliate() {
      await this.firstNameInput.fill('Updated');
      await this.saveBtn.click();
      await this.page.waitForURL(/\/Admin\/Affiliate\/List/);
    }

    async deleteAffiliate() {
      await this.deleteBtn.click();
      await this.confirmDelete.click();
      await this.page.waitForURL(/\/Admin\/Affiliate\/List/);

    }
  }

  module.exports = AffiliatePage;
