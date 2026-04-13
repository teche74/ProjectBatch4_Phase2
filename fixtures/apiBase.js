const { test: base, expect, request } = require('@playwright/test');
const cheerio = require('cheerio');

const test = base.extend({

  authApi: async ({}, use) => {

    const api = await request.newContext({
      baseURL: 'https://admin-demo.nopcommerce.com'
    });

    const loginPage = await api.get('/login?returnurl=%2Fadmin%2F', {
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
            "Connection": "keep-alive",
            "Upgrade-Insecure-Requests" : "1",

          }
        });
    const html = await loginPage.text();

    const $ = cheerio.load(html);
    const token = $('input[name="__RequestVerificationToken"]').val();

    await api.post('/login?returnurl=%2Fadmin%2F', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      form: {
        Email: 'admin@yourstore.com',
        Password: 'admin',
        RememberMe : false,
        __RequestVerificationToken: token,
        returnurl : "/admin/"
      }
    });

    await use(api);
    await api.dispose();
  },

});

module.exports = { test, expect, cheerio };