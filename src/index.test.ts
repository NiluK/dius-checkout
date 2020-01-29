import Checkout from './index';
import pricingRules from '../data/pricingRules.json';

describe('Checkout', () => {
  let co: Checkout;
  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('Starts at 0', () => {
    expect(co.total()).toEqual(0);
  });
});
