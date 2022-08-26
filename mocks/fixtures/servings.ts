import { Servings as PrismaServings } from '@prisma/client';
import { john } from './user';
import foods from './food';

interface Servings extends Omit<PrismaServings, 'date'> {
  date: string;
}

export const beansTwoServings: Servings = {
  id: 'cl76eqkra4887pqm0ah5p2se2',
  userId: john.user.id,
  foodId: foods.beans.id,
  date: '2022-08-25T14:10:55.156Z',
  quantity: 2,
};

export const beansTwoServingsUpdated: Servings = {
  id: 'cl76eqkra4887pqm0ah5p2se2',
  userId: john.user.id,
  foodId: foods.beans.id,
  date: '2022-08-25T14:10:55.156Z',
  quantity: 1.5,
};

export const berriesZeroServings: Servings = {
  id: 'cl76bmxtw4599pqm0q7xobbod',
  userId: john.user.id,
  foodId: foods.berries.id,
  date: '2022-08-25T14:10:55.156Z',
  quantity: 0,
};

export const berriesZeroServingsUpdated: Servings = {
  id: 'cl76eqkra4887pqm0ah5p2se2',
  userId: john.user.id,
  foodId: foods.beans.id,
  date: '2022-08-25T14:10:55.156Z',
  quantity: 0.5,
};

export const all: Servings[] = [
  beansTwoServings,
  berriesZeroServings,
];

export default {
  beansTwoServings, beansTwoServingsUpdated, berriesZeroServings, berriesZeroServingsUpdated, all,
};
