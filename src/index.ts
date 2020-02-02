class Checkout {
  cartTotal: number;
  offers: Offer[];
  cart: Product[];
  products: Product[];

  constructor(pricingRules: PricingRules) {
    this.offers = pricingRules.offers;
    this.products = pricingRules.products;

    this.cartTotal = 0;
    this.cart = [];
  }

  scan = (item: string): void => {
    const product = this.products.find(
      (product: Product) => product.sku === item,
    );
    if (product) {
      this.cart.push(product);
    }
  };

  updateCart = (cart: Product[]): void => {
    this.cart = cart;
  };

  applyOffers = (): void => {
    this.offers.forEach(offer =>
      offer.apply(offer.variables, this.cart, this.updateCart),
    );
  };

  calculateTotal = (): void => {
    /* js is a bit idiosyncratic when comes to numbers so we're rounding to 2dp
    so that results are somewhat consistent */

    this.cartTotal =
      Math.round(
        this.cart.reduce((aggregate: number, item: Product) => {
          return aggregate + item.price;
        }, 0) * 100,
      ) / 100;
  };

  total = (): number => {
    this.applyOffers();
    this.calculateTotal();

    return this.cartTotal;
  };
}

export default Checkout;
