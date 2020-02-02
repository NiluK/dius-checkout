import Checkout from '../../index';
import pricingRules from '../../pricingRules';

describe('Get free product offer', () => {
  let co: Checkout;
  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('Cart starts empty and total price starts at 0', () => {
    expect(co.cart.length).toEqual(0);
    expect(co.total()).toEqual(0);
  });

  it('Generates free products for Macs properly', () => {
    co.scan('mbp');
    co.scan('ipd');
    co.scan('vga');
    expect(co.total()).toEqual(1949.98);
  });
  it('If new free product is scanned,  price of new product is not zero', () => {
    co.scan('mbp');
    co.scan('ipd');
    co.scan('vga');
    co.scan('vga');

    expect(co.total()).toEqual(1979.98);
  });
  it('If paid product is scanned, free product is added to cart', () => {
    co.scan('mbp');
    co.scan('mbp');
    co.scan('ipd');
    co.scan('vga');

    expect(co.total()).toEqual(3349.97);
    expect(co.cart.length).toEqual(5);
  });
});
