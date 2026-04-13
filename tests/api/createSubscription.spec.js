const { test, expect, cheerio } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Create Subscription', async ({ authApi }) => {

    const token = await getToken(authApi, '/Admin/NewsLetterSubscriptionType/Create');
    console.log("Token : " + token);

    const name = 'API_Sub_' + Date.now();

    const res = await authApi.post('/Admin/NewsLetterSubscriptionType/Create', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://admin-demo.nopcommerce.com',
            'Referer': 'https://admin-demo.nopcommerce.com/Admin/NewsLetterSubscriptionType/Create'
        },
        form: {
            Id : 0,
            Name: name,
            DisplayOrder: '2',
            SelectedStoreIds: '1',
            TickedByDefault: 'true',
            __RequestVerificationToken: token
        },
         maxRedirects: 0
    });

    expect(res.status()).toBe(302);
    expect(res.headers()['location']).toBe('/Admin/NewsLetterSubscriptionType/List');
});


test('Empty Name Case', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/NewsLetterSubscriptionType/Create');

  const res = await authApi.post('/Admin/NewsLetterSubscriptionType/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/NewsLetterSubscriptionType/Create'
    },
    form: {
      Id: 0,
      Name: '', 
      DisplayOrder: '2',
      SelectedStoreIds: '1',
      TickedByDefault: 'true',
      __RequestVerificationToken: token
    }
  });

  const html = await res.text();

  expect(res.status()).toBe(200);

  const $ = cheerio.load(html);
  const error = $('.field-validation-error').text();

  expect(error).not.toBe('');
});


test('Invalid DisplayOrder', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/NewsLetterSubscriptionType/Create');

  const res = await authApi.post('/Admin/NewsLetterSubscriptionType/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      Id: 0,
      Name: 'InvalidDisplay',
      DisplayOrder: 'abc', 
      SelectedStoreIds: '1',
      TickedByDefault: 'true',
      __RequestVerificationToken: token
    }
  });

  const html = await res.text();

  expect(res.status()).toBe(200);
  expect(html).toContain('Display order'); 
});