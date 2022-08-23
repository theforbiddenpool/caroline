import { Servings as PrismaServings } from '@prisma/client';

export type Servings = Omit<PrismaServings, 'userId'>;
