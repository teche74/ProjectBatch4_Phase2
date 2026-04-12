const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');
const { request }  = require('@playwright/test');

test('Create Campaign', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/Campaign/Create');

  const campaignName = 'API_Campaign_' + Date.now();

  const res = await authApi.post('/Admin/Campaign/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/Campaign/Create'
    },
    form: {
      Id: 0,
      Name: campaignName,
      Subject: 'Test Subject',
      Body: '<p>Test Body</p>',
      DontSendBeforeDate: '',
      __RequestVerificationToken: token
    },
    maxRedirects: 0
  });


  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toContain('/Admin/Campaign/List');

});


test('Empty Name Validation', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/Campaign/Create');

  const res = await authApi.post('/Admin/Campaign/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/Campaign/Create'
    },
    form: {
      Id: 0,
      Name: '', 
      Subject: 'Test Subject',
      Body: '<p>Test Body</p>',
      __RequestVerificationToken: token
    }
  });

  const html = await res.text();

  expect(res.status()).toBe(200);
  expect(html).toContain('Campaign name is required');
});


test('Invalid Token', async ({ authApi }) => {

  const res = await authApi.post('/Admin/Campaign/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      Id: 0,
      Name: 'InvalidTokenTest',
      Subject: 'Test',
      Body: 'Test',
      __RequestVerificationToken: 'INVALID_TOKEN'
    }
  });

  expect(res.status()).toBe(400);
});

test('Without Login, we are trying to create Campaigns', async () => {

  const api = await request.newContext({
    baseURL: 'https://admin-demo.nopcommerce.com'
  });

  const res = await api.post('/Admin/Campaign/Create', {
    form: {
      Name: 'NoAuthTest'
    }
  });

  const html = await res.text();

  expect(html).toContain('Login');
});