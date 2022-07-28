import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../db/prisma';

export const loadFoods = async () => {
  const foods = await prisma.food.findMany({
    orderBy: { order_weight: 'asc' },
  });

  return foods;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const foods = await loadFoods();

        res.status(200).json(foods);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
