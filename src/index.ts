class Checkout {
  cartTotal: number;
  offers: Array<Offer>;
  cart: any | null;
  products: Array<Product>;

  constructor(pricingRules: PricingRules) {
    this.offers = pricingRules.offers;
    this.products = pricingRules.products;

    this.cartTotal = 0;
    this.cart = [];
  }

  scan = (item: string): null => {
    const product = this.products.find(
      (product: Product) => product.sku === item,
    );
    this.cart.push(product);
    return null;
  };

  updateCart = (cart: Array<Product>): void => {
    this.cart = cart;
  };

  applyOffers = () => {
    this.offers.forEach(offer => offer.apply(this.cart, this.updateCart));
  };

  calculateTotal = () => {
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
