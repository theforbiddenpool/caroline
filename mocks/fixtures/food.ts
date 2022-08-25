import { Food } from '@prisma/client';

export const beans: Food = {
  id: 'cl6xqxw8v0005o9m0f7do4q5x',
  name: 'beans',
  quantity: 3,
  order_weight: 1,
};

export const berries: Food = {
  id: 'cl6xqxw8v0004o9m0nei0s0t1',
  name: 'berries',
  quantity: 1,
  order_weight: 2,
};

export const nutsAndSeeds: Food = {
  id: 'cl6xqxw8v0018o9m0aawyvnr9',
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
