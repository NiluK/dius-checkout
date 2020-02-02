export const priceRuleFreeProduct = (
  variables,
  cart: Product[],
  updateCart: (cart: Product[]) => void,
): void => {
  const { purchasedProductSKU, freeProductSKU } = variables;
  let newCart: Product[] = cart;
  const purchasedProducts = cart?.filter(
    product => product.sku === purchasedProductSKU,
  );
  const freeProducts = cart?.filter(product => product.sku === freeProductSKU);
  const notfreeProducts = cart?.filter(
    product => product.sku !== freeProductSKU,
  );
  for (const product in purchasedProducts) {
    if (freeProducts[product]) {
      freeProducts[product] = Object.assign({}, freeProducts[product], {
        price: 0,
      });
    }
  }
  newCart = [...freeProducts, ...notfreeProducts];
  if (freeProducts.length < purchasedProducts.length) {
    newCart.push({
      sku: freeProducts[0].sku,
      name: freeProducts[0].name,
      price: 0,
    });
  }
  updateCart(newCart);
};
