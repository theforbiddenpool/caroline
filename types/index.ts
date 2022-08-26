import type { Servings as PrismaServings } from '@prisma/client';

export type Serving = Omit<PrismaServings, 'userId' | 'quantity'> & {
  quantity: string
};
