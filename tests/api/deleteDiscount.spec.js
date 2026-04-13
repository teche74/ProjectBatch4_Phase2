const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Delete Discount API', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/Discount/List');

  const discountId = 1; 

  const res = await authApi.post(`/Admin/Discount/Delete/${discountId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/Discount/List'
    },
    form: {
      __RequestVerificationToken: token
    },
    maxRedirects: 0
  });

  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toContain('/Admin/Discount/List');
});
