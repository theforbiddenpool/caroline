import { rest } from 'msw';
import { all as foods } from '../../fixtures/food';

export const base = rest.get('/api/foods', (req, res, ctx) => res(ctx.json(foods)));

const handlers = [
  base,
];

export default handlers;
