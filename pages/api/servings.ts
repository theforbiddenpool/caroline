import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import prisma from '../../db/prisma';
import { authOptions } from './auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET': {
      const session = await unstable_getServerSession(req, res, authOptions);

      if (!session) {
        res.status(401).json({ error: 'You must be logged in.' });
      }

      if (!session?.user) {
        throw new Error('User is missing');
      }

      try {
        const date = req.query.date && new Date(String(req.query.date));

        const servings = await prisma.servings.findMany({
          where: {
            userId: session.user.id,
            ...(date && { date }),
          },
        });

        res.status(200).json(servings);
      } catch (err) {
        res.status(500).json({ error: err });
      }
      break;
    }
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
