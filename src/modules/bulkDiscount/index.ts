export const priceRuleBulkDiscount = (
  variables,
  cart: Product[],
  updateCart: (cart: Product[]) => void,
): void => {
  const { sku, threshold, newPrice } = variables;
  let newCart: Product[] = cart;
  const affectedSKUs = cart?.filter(product => product.sku === sku);
  const unaffectedSKUs = cart?.filter(product => product.sku !== sku);

  if (affectedSKUs.length > threshold) {
    const newSKUs = affectedSKUs.map(sku =>
      Object.assign({}, sku, { price: newPrice }),
    );
    newCart = [...unaffectedSKUs, ...newSKUs];
    updateCart(newCart);
  }
};
