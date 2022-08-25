import { Food } from '@prisma/client';

export const beans: Food = {
  id: 'beans1',
  name: 'beans',
  quantity: 3,
  order_weight: 1,
};

export const berries: Food = {
  id: 'berries2',
  name: 'berries',
  quantity: 1,
  order_weight: 2,
};

export const nutsAndSeeds: Food = {
  id: 'nutsandseeds3',
  name: 'nuts and seeds',
  quantity: 1,
  order_weight: 3,
};

export const all: Food[] = [
  beans,
  berries,
  nutsAndSeeds,
];

export default {
  beans, berries, nutsAndSeeds, all,
};
