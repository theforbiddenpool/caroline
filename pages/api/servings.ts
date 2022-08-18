import { Servings } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import prisma from '../../db/prisma';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session || !session.user) {
        res.status(401).json({ error: 'You must be logged in.' });
        return;
      }

      try {
        const date = typeof req.query.date === 'string' ? new Date(req.query.date) : undefined;
        const dateMin = date && new Date(date.setUTCHours(0, 0, 0, 0));
        const dateMax = date && new Date(date.setUTCHours(23, 59, 59, 999));

        const servings = await prisma.servings.findMany({
          where: {
            userId: session.user.id,
            ...(date && {
              date: {
                lte: dateMax,
                gte: dateMin,
              },
            }),
          },
          select: {
            id: true,
            foodId: true,
            date: true,
            quantity: true,
          },
        });

        res.status(200).json(servings);
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
      }
      break;
    }
    case 'PUT': {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session || !session.user) {
        res.status(401).json({ error: 'You must be logged in.' });
        return;
      }

      try {
        const data: Omit<Servings, 'id'> = {
          userId: session.user.id,
          foodId: req.body.foodId,
          date: new Date(req.body.date),
          quantity: (req.body.quantity === '') ? null : parseFloat(req.body.quantity),
        };

        const serving = await prisma.servings.upsert({
          update: {
            quantity: data.quantity,
          },
          where: {
            userId_foodId_date: { userId: data.userId, foodId: data.foodId, date: data.date },
          },
          create: data,
        });

        res.status(200).json(serving);
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: err });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
