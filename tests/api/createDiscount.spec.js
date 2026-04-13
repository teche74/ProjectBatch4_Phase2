const { test, expect } = require('../../fixtures/apiBase');
const { getToken } = require('../../utils/tokenHelper');

test('Create Discount API', async ({ authApi }) => {

  const token = await getToken(authApi, '/Admin/Discount/Create');

  const discountName = 'API_Discount_' + Date.now();

  const res = await authApi.post('/Admin/Discount/Create', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Origin': 'https://admin-demo.nopcommerce.com',
      'Referer': 'https://admin-demo.nopcommerce.com/Admin/Discount/Create'
    },
    form: {
      Id: 0,
      Name: discountName,
      DiscountTypeId: 2,          
      UsePercentage: true,
      DiscountPercentage: 10,
      StartDateUtc: '',
      EndDateUtc: '',
      RequiresCouponCode: false,
      CouponCode: '',
      IsCumulative: false,
      DiscountLimitationId: 0,
      LimitationTimes: 0,
      IsActive: true,
      __RequestVerificationToken: token
    },
    maxRedirects: 0
  });

  expect(res.status()).toBe(302);
  expect(res.headers()['location']).toContain('/Admin/Discount/List');
});
