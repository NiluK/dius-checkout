export const priceRuleXforY = (
  variables,
  cart: Product[],
  updateCart: (cart: Product[]) => void,
): void => {
  const { sku, threshold, quantityToPayFor } = variables;
  const newCart: Product[] = cart;
  const affectedSKUs = cart?.filter(product => product.sku === sku);
  const loopRequirements = Math.floor(affectedSKUs.length / threshold);
  const quantityGivenForFree = threshold - quantityToPayFor;
  for (let i = 0; i < loopRequirements; i++) {
    for (let j = 0; j < quantityGivenForFree; j++) {
      newCart.push({
        name: `Buy ${threshold} ${sku} for ${quantityToPayFor}`,
        sku: `offer-${sku}`,
        price: affectedSKUs[j].price * -1,
      });
    }
  }
  updateCart(newCart);
};
