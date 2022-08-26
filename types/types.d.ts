import type { DefaultUser } from 'next-auth';

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient | undefined;
}
declare module 'next-auth' {
  interface Session {
    user?: DefaultUser;
  }
}
