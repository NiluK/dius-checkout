interface PricingRules {
  products: Array<{
    sku: string;
    price: number;
    name: string;
  }>;
}
