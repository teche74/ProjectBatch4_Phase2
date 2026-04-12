const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Delete Campaign', async ({ authApi }) => {
  const token = await getToken(authApi, '/Admin/Campaign/List');

  const campaignId = 8; 
  const res = await authApi.post(`/Admin/Campaign/Delete/${campaignId}`, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/Campaign/List'
    },
    form: {
      __RequestVerificationToken: token
    },
    maxRedirects: 0
  });

  expect(res.status()).toBe(302);
});