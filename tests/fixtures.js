const base = require('@playwright/test');

const LoginPage = require('../pages/loginPage');
const NewsletterSubscribersPage = require('../pages/newsletterSubscribersPage');

exports.test = base.test.extend({

  // 🔐 Login Fixture
  loggedInPage: async ({ page }, use) => {

    const login = new LoginPage(page);

    await login.goto();
    await login.login('admin@yourstore.com', 'admin');

    await use(page);
  },

  // 🧭 Navigation Fixture
  newsletterPage: async ({ loggedInPage }, use) => {

    const nav = new NewsletterSubscribersPage(loggedInPage);

    await nav.navigateToSubscribers();

    await use(loggedInPage);
  }

});

exports.expect = base.expect;