interface Product {
  sku: string;
  price: number;
  name: string;
  quantity?: number;
}

interface Offer {
  variables: Record<string, unknown>;
  apply(
    variables: Record<string, unknown>,
    cart?: Product[],
    updateCart?: (cart: Product[]) => void,
  ): void;
}

interface PricingRules {
  products: Product[];
  offers: Offer[];
}
