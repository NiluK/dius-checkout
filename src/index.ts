class Checkout {
  cartTotal: number;
  pricingRules: PricingRules;

  constructor(pricingRules: PricingRules) {
    this.pricingRules = pricingRules;
    this.cartTotal = 0;
  }

  scan(): null {
    return null;
  }

  total(): number {
    return this.cartTotal;
  }
}

export default Checkout;
