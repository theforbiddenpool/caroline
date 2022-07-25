import { PrismaClient } from '@prisma/client';

class PrismaClientSingleton {
  private static instance: PrismaClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static prisma(): PrismaClient {
    if (!PrismaClientSingleton.instance) {
      PrismaClientSingleton.instance = new PrismaClient();
    }

    return PrismaClientSingleton.instance;
  }
}

export default PrismaClientSingleton.prisma();
