export default {
  products: [
    {
      sku: 'ipd',
      name: 'Super Ipad',
      price: 549.99,
    },
    {
      sku: 'mbp',
      name: 'Macbook Pro',
      price: 1399.99,
    },
    {
      sku: 'atv',
      name: 'Apple Tv',
      price: 109.5,
    },
    {
      sku: 'vga',
      name: 'VGA Adapter',
      price: 30.0,
    },
  ],
  offers: [
    {
      name: 'Buy X for Y',
      variables: {
        sku: 'atv',
        threshold: 3,
        quantityToPayFor: 2,
      },
      apply(cart: Product[], updateCart: (cart: Product[]) => void): void {
        const { sku, threshold, quantityToPayFor } = this.variables;
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
      },
    },
    {
      name: 'Bulk Discount',
      variables: {
        sku: 'ipd',
        threshold: 4,
        newPrice: 499.99,
      },
      apply(cart: Product[], updateCart: (cart: Product[]) => void): void {
        const { sku, threshold, newPrice } = this.variables;
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
      },
    },
    {
      name: 'Free X Product for Every Y Product',
      variables: {
        purchasedProductSKU: 'mbp',
        freeProductSKU: 'vga',
      },
      apply(cart: Product[], updateCart: (cart: Product[]) => void): void {
        const { purchasedProductSKU, freeProductSKU } = this.variables;
        let newCart: Product[] = cart;
        const purchasedProducts = cart?.filter(
          product => product.sku === purchasedProductSKU,
        );
        const freeProducts = cart?.filter(
          product => product.sku === freeProductSKU,
        );
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
      },
    },
  ],
};
