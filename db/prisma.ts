import { PrismaClient } from '@prisma/client';

function getPrismaClient(): PrismaClient {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }

  return global.prisma;
}

const prisma = (process.env.NODE_ENV === 'production')
  ? new PrismaClient()
  : getPrismaClient();

export default prisma;
