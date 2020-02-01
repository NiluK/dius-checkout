class Checkout {
  cartTotal: number;
  offers: Array<Offer>;
  cart: Array<Product>;
  products: Array<Product>;

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

  updateCart = (cart: Array<Product>): void => {
    this.cart = cart;
  };

  applyOffers = (): void => {
    this.offers.forEach(offer => offer.apply(this.cart, this.updateCart));
  };

  calculateTotal = (): void => {
    this.cartTotal = this.cart.reduce((aggregate: number, item: Product) => {
      return aggregate + item.price;
    }, 0);
  };

  total = (): number => {
    this.applyOffers();
    this.calculateTotal();

    return this.cartTotal;
  };
}

export default Checkout;
