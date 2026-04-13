const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Delete Subscription', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/NewsLetterSubscriptionType/List');

  const res = await authApi.post('/Admin/NewsLetterSubscriptionType/Delete/11', {
    form: {
      __RequestVerificationToken: token
    },
    maxRedirects: 0
  });

  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toBe('/Admin/NewsLetterSubscriptionType/List')
});