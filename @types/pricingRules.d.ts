interface Product {
  sku: string;
  price: number;
  name: string;
  quantity?: number;
}

interface Offer {
  variables: Record<string, any>;
  apply(
    cart?: Array<Product>,
    updateCart?: (cart: Array<Product>) => void,
  ): void;
}

interface PricingRules {
  products: Array<Product>;
  offers: Array<Offer>;
}
