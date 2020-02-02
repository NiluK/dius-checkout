import Checkout from '../../index';
import pricingRules from '../../pricingRules';

describe('Get Bulk Discount offer', () => {
  let co: Checkout;
  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('Cart starts empty and total price starts at 0', () => {
    expect(co.cart.length).toEqual(0);
    expect(co.total()).toEqual(0);
  });

  it('Generates discounts for iPads properly', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');

    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');

    expect(co.total()).toEqual(2718.95);
  });
});
