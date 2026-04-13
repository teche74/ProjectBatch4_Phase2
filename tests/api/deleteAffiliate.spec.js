const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Delete Affiliate', async ({ authApi }) => {
  const affiliateId = '1';

  const token = await getToken(
    authApi,
    `/Admin/Affiliate/Edit/${affiliateId}`
  );
  console.log('Token:', token);

  const res = await authApi.post(
    `/Admin/Affiliate/Edit/${affiliateId}`,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://admin-demo.nopcommerce.com',
        'Referer': `https://admin-demo.nopcommerce.com/Admin/Affiliate/Edit/${affiliateId}`
      },
      form: {
        Id: affiliateId,
        delete: '',
        __RequestVerificationToken: token
      },
      maxRedirects: 0
    }
  );

  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toContain(
    '/Admin/Affiliate/List'
  );

  console.log(
    `Affiliate Deleted Successfully: ID = ${affiliateId}`
  );
});
