const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');
const { request }  = require('@playwright/test');

test('Create Subscription', async ({ authApi }) => {

    const token = await getToken(authApi, '/Admin/Affiliate/Create');
    console.log("Token : " + token);

    const name = 'API_Sub_' + Date.now();

  const res = await authApi.post('/Admin/Affiliate/Create', {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://admin-demo.nopcommerce.com',
        'Referer': 'https://admin-demo.nopcommerce.com/Admin/Affiliate/Create'
    },
    form: {
      Id: 0,
      'Address.FirstName': 'John',
      'Address.LastName': 'Smith',
      'Address.Email': 'admin@yourstore.com',
      'Address.Company': 'Test Company',
      'Address.CountryId': '237',
      'Address.StateProvinceId': '1791',
      'Address.County': 'Albama',
      'Address.City': 'NY',
      'Address.Address1': 'Street 34',
      Active: 'true',
      __RequestVerificationToken: token,
      save: ''
    },
    maxRedirects: 0
  });

  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toContain('/Admin/Affiliate/List');
});
