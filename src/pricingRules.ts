import products from '../data/products.json';
import offers from '../data/offers.json';
import * as modules from './modules';

const appliedOffers = offers.map(offer => ({
  name: offer.name,
  variables: offer.data,
  apply: modules[offer.rule],
}));

export default {
  products,
  offers: appliedOffers,
};
