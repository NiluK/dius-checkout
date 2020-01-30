import Checkout from './index';
import pricingRules from '../data/pricingRules';

const threeForOneTestCases = [
  { quantity: 1, free: 0 },
  { quantity: 2, free: 0 },
  { quantity: 3, free: 1 },
  { quantity: 4, free: 1 },
  { quantity: 5, free: 1 },
  { quantity: 6, free: 2 },
  { quantity: 9, free: 3 },
  { quantity: 10, free: 3 },
  { quantity: 12, free: 4 },
  { quantity: 1442, free: 480 },
  { quantity: 6543145, free: 2181048 },
];

const atvPrice = 109.5;
const vgaPrice = 30.0;

describe('Get X for Y offer, 3 for 1', () => {
  let co: Checkout;
  beforeEach(() => {
    co = new Checkout(pricingRules);
  });

  it('Cart starts empty and total price starts at 0', () => {
    expect(co.cart.length).toEqual(0);
    expect(co.total()).toEqual(0);
  });

  for (const testCase of threeForOneTestCases) {
    it(`When customer purchases ${testCase.quantity} Apple TVs, they should recieve ${testCase.free} free.`, () => {
      const expectedTotal =
        atvPrice * testCase.quantity - atvPrice * testCase.free + vgaPrice;

      for (let i = 0; i < testCase.quantity; i++) {
        co.scan('atv');
      }
      co.scan('vga');
      const total = co.total();

      expect(total).toEqual(expectedTotal);
    });
  }
});
