import Checkout from './index';
import pricingRules from './pricingRules';

describe.only('Apply all offers', () => {
  let co: Checkout;
  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('Cart starts empty and total price starts at 0', () => {
    expect(co.cart.length).toEqual(0);
    expect(co.total()).toEqual(0);
  });

  it('Applies all offers when all conditions are met', () => {
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('atv');
    co.scan('atv');
    co.scan('atv');
    co.scan('mbp');
    co.scan('mbp');
    co.scan('atv');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('ipd');
    co.scan('vga');
    co.scan('vga');
    co.scan('vga');

    co.total();

    expect(co.total()).toEqual(5658.43);
  });
});
