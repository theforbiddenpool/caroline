import { rest } from 'msw';
import servings from '../../fixtures/servings';

export const baseGet = rest.get('/api/servings', (req, res, ctx) => res(ctx.json(servings.all)));

export const basePut = rest.put('/api/servings', async (req, res, ctx) => {
  const json = await req.json();

  if (json.foodId === 'berries2') {
    if (json.quantity === '0.5') {
      return res(ctx.json(servings.berriesZeroServingsUpdated));
    } if (json.quantity === '0') {
      return res(ctx.json(servings.berriesZeroServings));
    }
  }

  if (json.quantity.endsWith('.')) {
    return res(ctx.json(servings.beansTwoServings));
  }

  if (json.foodId === 'beans1') {
    return res(ctx.json(servings.beansThreeServings));
  }

  return res(ctx.status(400));
});

const handlers = [
  baseGet,
  basePut,
];

export default handlers;
