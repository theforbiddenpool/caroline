/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { foods } from './data';

const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.food.deleteMany();
    console.log('deleted records in foods table');

    await prisma.$queryRaw`UPDATE sqlite_sequence SET seq = 1 WHERE name = foods`;
    console.log('reset foods auto increment to 1');

    foods.map(async (food) => {
      await prisma.food.create({
        data: food,
      });
    });
    console.log('added food data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
